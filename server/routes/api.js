// File: server/routes/api.js
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

import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getReportsByAdmissionNumber, // ✅ Make sure this is imported
} from '../controllers/students.js';

const router = express.Router();

// Student Routes
router.post('/students', createStudent);
router.get('/students', getAllStudents);
router.get('/students/:id', getStudentById);
router.put('/students/:id', updateStudent);
router.delete('/students/:id', deleteStudent);
router.get('/students/reports/:admissionNumber', getReportsByAdmissionNumber); // ✅ Added this missing route

// Report Routes
router.post('/reports', createReport);
router.get('/reports', getAllReports);
router.get('/reports/:id', getReportById);
router.get('/reports/student/:studentId', getReportsByStudent);
router.get('/reports/class/:grade', getReportsByGrade);
router.put('/reports/:id', updateReport);
router.delete('/reports/:id', deleteReport);

// Analysis Route
router.get('/analysis/grade/:grade', getGradeAnalysis);

export default router;



/*// File: server/routes/api.js   this lacked this route 'getReportsByAdmissionNumber)' but the above code is fully updated; // ✅ Added this missing route

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

import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from '../controllers/students.js';

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

export default router;*/
