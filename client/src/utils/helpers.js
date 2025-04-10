// client/src/utils/helpers.js
export const calculatePerformanceLevel = (score) => {
    const numericScore = parseFloat(score);
    if (isNaN(numericScore)) return 'NO DATA';
  
    if (numericScore >= 80) return 'EXCEEDING EXPECTATION';
    if (numericScore >= 60) return 'MEETING EXPECTATION';
    if (numericScore >= 40) return 'APPROACHING EXPECTATION';
    return 'BELOW EXPECTATION';
  };
  
  export const calculateGrade = (score) => {
    const numericScore = parseFloat(score);
    if (isNaN(numericScore)) return '-';
  
    if (numericScore >= 80) return 'A';
    if (numericScore >= 70) return 'B';
    if (numericScore >= 60) return 'C';
    if (numericScore >= 50) return 'D';
    return 'E';
  };
  
  export const getPerformanceColor = (level) => {
    const colors = {
      'BELOW EXPECTATION': '#e74c3c',
      'APPROACHING EXPECTATION': '#f39c12',
      'MEETING EXPECTATION': '#3498db',
      'EXCEEDING EXPECTATION': '#2ecc71'
    };
    return colors[level] || '#1a5276';
  };
  
  export const generateTeacherRemarks = (performanceLevel, studentName, grade) => {
    const remarks = {
      'BELOW EXPECTATION': [
        `${studentName} needs significant improvement in most subjects. We recommend extra tuition and parental support.`,
        `${studentName} is struggling with core concepts in grade ${grade}. Additional practice needed.`,
        `${studentName} requires more effort to catch up with the class.`
      ],
      'APPROACHING EXPECTATION': [
        `${studentName} is making progress but needs more consistent effort to meet expectations.`,
        `${studentName} shows potential in grade ${grade} but needs to work harder.`,
        `${studentName}'s performance is improving but needs more work.`
      ],
      'MEETING EXPECTATION': [
        `${studentName} is performing at expected level for grade ${grade}. Good work!`,
        `Solid performance across subjects in grade ${grade}.`,
        `${studentName} demonstrates good understanding of concepts.`
      ],
      'EXCEEDING EXPECTATION': [
        `Excellent work! ${studentName} is performing above grade ${grade} expectations.`,
        `Outstanding results! ${studentName} consistently exceeds expectations.`,
        `${studentName} shows exceptional performance in grade ${grade}.`
      ]
    };
  
    const possibleRemarks = remarks[performanceLevel] || 
      [`${studentName} is performing at a ${performanceLevel.toLowerCase()} level.`];
    
    return possibleRemarks[Math.floor(Math.random() * possibleRemarks.length)];
  };