// server/models/Report.js
import db from '../config/db.js';

const Report = {
  async create(data) {
    const { studentId, term, year, subjects } = data;
    const result = await db.query(
      'INSERT INTO reports (student_id, term, year, subjects) VALUES ($1, $2, $3, $4) RETURNING *',
      [studentId, term, year, JSON.stringify(subjects)]
    );
    return result.rows[0];
  },

  async findAll() {
    const result = await db.query('SELECT * FROM reports ORDER BY id');
    return result.rows;
  },

  async findById(id) {
    const result = await db.query('SELECT * FROM reports WHERE id = $1', [id]);
    return result.rows[0];
  },

  async findByStudent(studentId) {
    const result = await db.query('SELECT * FROM reports WHERE student_id = $1 ORDER BY year DESC', [studentId]);
    return result.rows;
  },

  async findByGrade(grade) {
    const result = await db.query(
      `SELECT r.* FROM reports r JOIN students s ON r.student_id = s.id WHERE s.grade = $1`,
      [grade]
    );
    return result.rows;
  },

  async findByAdmissionNumber(admissionNumber) {
    const result = await db.query(
      `SELECT r.* FROM reports r JOIN students s ON r.student_id = s.id WHERE s.admission_number = $1`,
      [admissionNumber]
    );
    return result.rows;
  },

  async update(id, data) {
    const { term, year, subjects } = data;
    const result = await db.query(
      'UPDATE reports SET term = $1, year = $2, subjects = $3 WHERE id = $4 RETURNING *',
      [term, year, JSON.stringify(subjects), id]
    );
    return result.rows[0];
  },

  async delete(id) {
    const result = await db.query('DELETE FROM reports WHERE id = $1', [id]);
    return result.rowCount > 0;
  },

  async getGradeAnalysis(grade) {
    const result = await db.query(
      `SELECT s.grade, r.term, r.year, r.subjects
       FROM reports r
       JOIN students s ON r.student_id = s.id
       WHERE s.grade = $1`,
      [grade]
    );
    return result.rows;
  }
};

export default Report;
