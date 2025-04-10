// client/src/hooks/useStudents.js
import { useState, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

export const useStudents = () => {
  const { students, addStudent, updateStudent, deleteStudent } = useContext(AppContext);
  const [currentStudent, setCurrentStudent] = useState(null);

  const handleSaveStudent = async (studentData) => {
    if (currentStudent) {
      return await updateStudent(currentStudent.id, studentData);
    } else {
      return await addStudent(studentData);
    }
  };

  return {
    students,
    currentStudent,
    setCurrentStudent,
    handleSaveStudent,
    deleteStudent
  };
};