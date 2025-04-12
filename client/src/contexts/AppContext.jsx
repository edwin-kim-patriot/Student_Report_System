import { createContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import api from '../services/api';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [reports, setReports] = useState([]);
  const [schools, setSchools] = useState([]);
  const [grades, setGrades] = useState([]);
  const [terms, setTerms] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Utility: Update or Remove Items
  const updateItem = (list, updatedItem) =>
    list.map(item => (item.id === updatedItem.id ? updatedItem : item));

  const removeItem = (list, id) =>
    list.filter(item => item.id !== id);

  // Load all initial data
  const fetchInitialData = useCallback(async () => {
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
      setError(err.message || 'Failed to fetch initial data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  // Student Operations
  const addStudent = async (student) => {
    const res = await api.post('/students', student);
    setStudents(prev => [...prev, res.data]);
    return res.data;
  };

  const updateStudent = async (id, student) => {
    const res = await api.put(`/students/${id}`, student);
    setStudents(prev => updateItem(prev, res.data));
    return res.data;
  };

  const deleteStudent = async (id) => {
    await api.delete(`/students/${id}`);
    setStudents(prev => removeItem(prev, id));
  };

  // Report Operations
  const addReport = async (report) => {
    const res = await api.post('/reports', report);
    setReports(prev => [...prev, res.data]);
    return res.data;
  };

  const updateReport = async (id, report) => {
    const res = await api.put(`/reports/${id}`, report);
    setReports(prev => updateItem(prev, res.data));
    return res.data;
  };

  const deleteReport = async (id) => {
    await api.delete(`/reports/${id}`);
    setReports(prev => removeItem(prev, id));
  };

  // Analysis
  const getGradeAnalysis = async (grade) => {
    const res = await api.get(`/analysis/grade/${grade}`);
    return res.data;
  };

  // Utility
  const refreshData = fetchInitialData;
  const clearError = () => setError(null);

  return (
    <AppContext.Provider
      value={{
        students,
        reports,
        schools,
        grades,
        terms,
        loading,
        error,
        addStudent,
        updateStudent,
        deleteStudent,
        addReport,
        updateReport,
        deleteReport,
        getGradeAnalysis,
        refreshData,
        clearError
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
