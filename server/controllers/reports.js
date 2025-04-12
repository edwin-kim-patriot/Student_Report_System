// server/controllers/reports.js
import Report from '../models/Report.js';
import { validationResult } from 'express-validator';

// Create report
export const createReport = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const report = await Report.create(req.body);
    res.status(201).json(report);
  } catch (error) {
    next(error); // Pass error to the error handler
  }
};

// Get all reports
export const getAllReports = async (req, res, next) => {
  try {
    const reports = await Report.findAll();
    res.json(reports);
  } catch (error) {
    next(error); // Pass error to the error handler
  }
};

// Get report by ID
export const getReportById = async (req, res, next) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.json(report);
  } catch (error) {
    next(error); // Pass error to the error handler
  }
};

// Get reports by student ID
export const getReportsByStudent = async (req, res, next) => {
  try {
    const reports = await Report.findByStudent(req.params.studentId);
    res.json(reports);
  } catch (error) {
    next(error); // Pass error to the error handler
  }
};

// Get reports by grade
export const getReportsByGrade = async (req, res, next) => {
  try {
    const reports = await Report.findByGrade(req.params.grade);
    res.json(reports);
  } catch (error) {
    next(error); // Pass error to the error handler
  }
};

// Update report
export const updateReport = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updatedReport = await Report.update(req.params.id, req.body);
    if (!updatedReport) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.json(updatedReport);
  } catch (error) {
    next(error); // Pass error to the error handler
  }
};

// Delete report
export const deleteReport = async (req, res, next) => {
  try {
    const deleted = await Report.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error); // Pass error to the error handler
  }
};

// Get grade analysis
export const getGradeAnalysis = async (req, res, next) => {
  try {
    const analysis = await Report.getGradeAnalysis(req.params.grade);
    if (!analysis) {
      return res.status(404).json({ message: 'No reports found for this grade' });
    }
    res.json(analysis);
  } catch (error) {
    next(error); // Pass error to the error handler
  }
};

// Get reports by admission number
export const getReportsByAdmissionNumber = async (req, res, next) => {
  try {
    const admissionNumber = req.params.admissionNumber;
    const reports = await Report.findByAdmissionNumber(admissionNumber);

    if (!reports || reports.length === 0) {
      return res.status(404).json({ message: 'No reports found for this admission number' });
    }

    res.json(reports);
  } catch (error) {
    next(error); // Pass error to the error handler
  }
};
