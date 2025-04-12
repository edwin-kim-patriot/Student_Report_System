// File: server/controllers/students.js
import Student from '../models/Student.js';
import { validationResult } from 'express-validator';

// Create student
export const createStudent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    console.error('Error creating student:', err.message);
    res.status(500).json({ error: 'Failed to create student' });
  }
};

// Get all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    res.status(200).json(students);
  } catch (err) {
    console.error('Error fetching students:', err.message);
    res.status(500).json({ error: 'Failed to retrieve students' });
  }
};

// Get student by ID
export const getStudentById = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (err) {
    console.error('Error fetching student:', err.message);
    res.status(500).json({ error: 'Failed to retrieve student' });
  }
};

// Update student
export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedStudent = await Student.update(id, req.body);
    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(updatedStudent);
  } catch (err) {
    console.error('Error updating student:', err.message);
    res.status(500).json({ error: 'Failed to update student' });
  }
};

// Delete student
export const deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Student.delete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (err) {
    console.error('Error deleting student:', err.message);
    res.status(500).json({ error: 'Failed to delete student' });
  }
};
