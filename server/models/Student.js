// server/models/Student.js
import db from '../config/db.js';

const Student = {
  async create(data) {
    const { name, admissionNumber, grade } = data;
    const result = await db.query(
      'INSERT INTO students (name, admission_number, grade) VALUES ($1, $2, $3) RETURNING *',
      [name, admissionNumber, grade]
    );
    return result.rows[0];
  },

  async findAll() {
    const result = await db.query('SELECT * FROM students ORDER BY id');
    return result.rows;
  },

  async findById(id) {
    const result = await db.query('SELECT * FROM students WHERE id = $1', [id]);
    return result.rows[0];
  },

  async update(id, data) {
    const { name, admissionNumber, grade } = data;
    const result = await db.query(
      'UPDATE students SET name = $1, admission_number = $2, grade = $3 WHERE id = $4 RETURNING *',
      [name, admissionNumber, grade, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    const result = await db.query('DELETE FROM students WHERE id = $1', [id]);
    return result.rowCount > 0;
  }
};

export default Student;
