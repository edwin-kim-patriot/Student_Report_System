// server/controllers/students.js
import Student from '../models/Student.js';
import { validationResult } from 'express-validator';
import Report from '../models/Report.js';

export const createStudent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    next(err);
  }
};

export const getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.findAll();
    res.status(200).json(students);
  } catch (err) {
    next(err);
  }
};

export const getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (err) {
    next(err);
  }
};

export const updateStudent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updatedStudent = await Student.update(req.params.id, req.body);
    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(updatedStudent);
  } catch (err) {
    next(err);
  }
};

export const deleteStudent = async (req, res, next) => {
  try {
    const deleted = await Student.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (err) {
    next(err);
  }
};

export const getReportsByAdmissionNumber = async (req, res, next) => {
  try {
    const reports = await Report.findByAdmissionNumber(req.params.admissionNumber);

    if (!reports || reports.length === 0) {
      return res.status(404).json({ message: 'No reports found for this admission number' });
    }

    res.json(reports);
  } catch (error) {
    next(error);
  }
};
