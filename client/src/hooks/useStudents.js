// client/src/hooks/useStudents.js
import { useState, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

export const useStudents = () => {
  const { students, addStudent, updateStudent, deleteStudent } = useContext(AppContext);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSaveStudent = async (studentData) => {
    setLoading(true);
    setError(null);

    try {
      if (currentStudent) {
        const updated = await updateStudent(currentStudent.id, studentData);
        setCurrentStudent(null);
        return updated;
      } else {
        return await addStudent(studentData);
      }
    } catch (err) {
      console.error('Failed to save student:', err);
      setError(err.message || 'Error saving student');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStudent = async (id) => {
    setLoading(true);
    setError(null);

    try {
      await deleteStudent(id);
    } catch (err) {
      console.error('Failed to delete student:', err);
      setError(err.message || 'Error deleting student');
    } finally {
      setLoading(false);
    }
  };

  const resetCurrentStudent = () => setCurrentStudent(null);

  return {
    students,
    currentStudent,
    setCurrentStudent,
    resetCurrentStudent,
    handleSaveStudent,
    handleDeleteStudent,
    loading,
    error
  };
};
