// server/controllers/reports.js
const Report = require('../models/Report');
const { validationResult } = require('express-validator');

exports.createReport = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const report = await Report.create(req.body);
    res.status(201).json(report);
  } catch (error) {
    next(error);
  }
};

exports.getAllReports = async (req, res, next) => {
  try {
    const reports = await Report.findAll();
    res.json(reports);
  } catch (error) {
    next(error);
  }
};

exports.getReportById = async (req, res, next) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.json(report);
  } catch (error) {
    next(error);
  }
};

exports.getReportsByStudent = async (req, res, next) => {
  try {
    const reports = await Report.findByStudent(req.params.studentId);
    res.json(reports);
  } catch (error) {
    next(error);
  }
};

exports.getReportsByGrade = async (req, res, next) => {
  try {
    const reports = await Report.findByGrade(req.params.grade);
    res.json(reports);
  } catch (error) {
    next(error);
  }
};

exports.updateReport = async (req, res, next) => {
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
    next(error);
  }
};

exports.deleteReport = async (req, res, next) => {
  try {
    const deleted = await Report.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.getGradeAnalysis = async (req, res, next) => {
  try {
    const analysis = await Report.getGradeAnalysis(req.params.grade);
    if (!analysis) {
      return res.status(404).json({ message: 'No reports found for this grade' });
    }
    res.json(analysis);
  } catch (error) {
    next(error);
  }
};