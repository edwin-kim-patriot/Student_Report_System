/**
 * Codemod to convert CommonJS to ESM using jscodeshift
 * Handles:
 * - const x = require('x') → import x from 'x'
 * - const { x } = require('x') → import { x } from 'x'
 * - module.exports = ... → export default ...
 * - exports.foo = ... → export const foo = ...
 */
export default function transformer(fileInfo, api) {
    const j = api.jscodeshift;
    const root = j(fileInfo.source);
  
    // Convert require() to import
    root.find(j.VariableDeclaration).forEach(path => {
      const declarations = path.node.declarations;
  
      declarations.forEach(decl => {
        const init = decl.init;
  
        if (
          init &&
          init.type === 'CallExpression' &&
          init.callee.name === 'require' &&
          init.arguments.length === 1 &&
          init.arguments[0].type === 'Literal'
        ) {
          const source = init.arguments[0].value;
  
          let importDecl;
  
          if (decl.id.type === 'Identifier') {
            // const x = require('x')
            importDecl = j.importDeclaration(
              [j.importDefaultSpecifier(j.identifier(decl.id.name))],
              j.literal(source)
            );
          } else if (decl.id.type === 'ObjectPattern') {
            // const { x, y } = require('x')
            const specifiers = decl.id.properties.map(prop =>
              j.importSpecifier(j.identifier(prop.key.name))
            );
            importDecl = j.importDeclaration(specifiers, j.literal(source));
          }
  
          if (importDecl) {
            j(path).replaceWith(importDecl);
          }
        }
      });
    });
  
    // Convert module.exports = ...
    root.find(j.AssignmentExpression, {
      left: {
        object: { name: 'module' },
        property: { name: 'exports' }
      }
    }).replaceWith(path =>
      j.exportDefaultDeclaration(path.value.right)
    );
  
    // Convert exports.xyz = ...
    root.find(j.AssignmentExpression).forEach(path => {
      const left = path.value.left;
      if (
        left.type === 'MemberExpression' &&
        left.object.name === 'exports' &&
        left.property.type === 'Identifier'
      ) {
        const exportName = left.property.name;
        const exportValue = path.value.right;
        const exportNamed = j.exportNamedDeclaration(
          j.variableDeclaration('const', [
            j.variableDeclarator(j.identifier(exportName), exportValue)
          ])
        );
        j(path).replaceWith(exportNamed);
      }
    });
  
    return root.toSource({ quote: 'single' });
  };;
  