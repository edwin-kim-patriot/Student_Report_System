import db from '../config/db';

class Student {
  static async create({ admission_number, name, grade, school }) {
    const queryText = `
      INSERT INTO students (admission_number, name, grade, school)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [admission_number, name, grade, school];
    const { rows } = await db.query(queryText, values);
    return rows[0];
  }

  static async findAll() {
    const { rows } = await db.query('SELECT * FROM students ORDER BY name');
    return rows;
  }

  static async findById(id) {
    const { rows } = await db.query('SELECT * FROM students WHERE id = $1', [id]);
    return rows[0];
  }

  static async update(id, { admission_number, name, grade, school }) {
    const queryText = `
      UPDATE students
      SET admission_number = $1, name = $2, grade = $3, school = $4, updated_at = NOW()
      WHERE id = $5
      RETURNING *;
    `;
    const values = [admission_number, name, grade, school, id];
    const { rows } = await db.query(queryText, values);
    return rows[0];
  }

  static async delete(id) {
    await db.query('DELETE FROM students WHERE id = $1', [id]);
    return true;
  }
}

export default Student;;