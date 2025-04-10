//client/src/contexts/AppContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AppContext = createContext();


export const AppProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [schools, setSchools] = useState([]);
  const [grades, setGrades] = useState([]);
  const [terms, setTerms] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [studentsRes, reportsRes, schoolsRes] = await Promise.all([
          api.get('/students'),
          api.get('/reports'),
          api.get('/schools')
        ]);
        setStudents(studentsRes.data);
        setReports(reportsRes.data);
        setSchools(schoolsRes.data);
        setGrades([
          { value: '7', label: 'Grade 7' },
          { value: '8', label: 'Grade 8' },
          { value: '9', label: 'Grade 9' }
        ]);
        setTerms([
          { value: '1', label: 'Term 1' },
          { value: '2', label: 'Term 2' },
          { value: '3', label: 'Term 3' }
        ]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const addStudent = async (student) => {
    try {
      const res = await api.post('/students', student);
      setStudents([...students, res.data]);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  const updateStudent = async (id, student) => {
    try {
      const res = await api.put(`/students/${id}`, student);
      setStudents(students.map(s => s.id === id ? res.data : s));
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  const deleteStudent = async (id) => {
    try {
      await api.delete(`/students/${id}`);
      setStudents(students.filter(s => s.id !== id));
    } catch (err) {
      throw err;
    }
  };

  const addReport = async (report) => {
    try {
      const res = await api.post('/reports', report);
      setReports([...reports, res.data]);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  const updateReport = async (id, report) => {
    try {
      const res = await api.put(`/reports/${id}`, report);
      setReports(reports.map(r => r.id === id ? res.data : r));
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  const deleteReport = async (id) => {
    try {
      await api.delete(`/reports/${id}`);
      setReports(reports.filter(r => r.id !== id));
    } catch (err) {
      throw err;
    }
  };

  const getGradeAnalysis = async (grade) => {
    try {
      const res = await api.get(`/analysis/grade/${grade}`);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  return (
    <AppContext.Provider
      value={{
        students,
        reports,
        loading,
        error,
        schools,
        grades,
        terms,
        addStudent,
        updateStudent,
        deleteStudent,
        addReport,
        updateReport,
        deleteReport,
        getGradeAnalysis
      }}
    >
      {children}
    </AppContext.Provider>
  );
};