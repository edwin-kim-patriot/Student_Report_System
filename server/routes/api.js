// server/routes/api.js
import express from 'express';
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent
} from '../controllers/students.js';

import {
  createReport,
  getAllReports,
  getReportById,
  getReportsByStudent,
  getReportsByGrade,
  updateReport,
  deleteReport,
  getGradeAnalysis,
  getReportsByAdmissionNumber
} from '../controllers/reports.js';

import { body } from 'express-validator';

const router = express.Router();

// Student Routes
router.post(
  '/students',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('admissionNumber').notEmpty().withMessage('Admission Number is required'),
    body('grade').notEmpty().withMessage('Grade is required'),
  ],
  createStudent
);

router.get('/students', getAllStudents);
router.get('/students/:id', getStudentById);
router.put(
  '/students/:id',
  [
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('admissionNumber').optional().notEmpty().withMessage('Admission Number cannot be empty'),
    body('grade').optional().notEmpty().withMessage('Grade cannot be empty'),
  ],
  updateStudent
);
router.delete('/students/:id', deleteStudent);

// Report Routes
router.post(
  '/reports',
  [
    body('studentId').notEmpty().withMessage('Student ID is required'),
    body('term').notEmpty().withMessage('Term is required'),
    body('year').notEmpty().withMessage('Year is required'),
    body('subjects').isArray().withMessage('Subjects must be an array'),
  ],
  createReport
);

router.get('/reports', getAllReports);
router.get('/reports/:id', getReportById);
router.get('/reports/student/:studentId', getReportsByStudent);
router.get('/reports/grade/:grade', getReportsByGrade);
router.get('/reports/admission/:admissionNumber', getReportsByAdmissionNumber);
router.get('/reports/analysis/:grade', getGradeAnalysis);
router.put(
  '/reports/:id',
  [
    body('term').optional().notEmpty(),
    body('year').optional().notEmpty(),
    body('subjects').optional().isArray(),
  ],
  updateReport
);
router.delete('/reports/:id', deleteReport);

export default router;
