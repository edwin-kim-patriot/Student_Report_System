import express from 'express';

import {
  createReport,
  getAllReports,
  getReportById,
  getReportsByStudent,
  getReportsByGrade,
  updateReport,
  deleteReport,
  getGradeAnalysis,
} from '../controllers/reports.js';

const router = express.Router();

// Student routes
router.post('/students', createStudent);
router.get('/students', getAllStudents);
router.get('/students/:id', getStudentById);
router.put('/students/:id', updateStudent);
router.delete('/students/:id', deleteStudent);

// Report routes
router.post('/reports', createReport);
router.get('/reports', getAllReports);
router.get('/reports/:id', getReportById);
router.get('/reports/student/:studentId', getReportsByStudent);
router.get('/reports/class/:grade', getReportsByGrade);
router.put('/reports/:id', updateReport);
router.delete('/reports/:id', deleteReport);

// Analysis routes
router.get('/analysis/grade/:grade', getGradeAnalysis);

export default router;;
