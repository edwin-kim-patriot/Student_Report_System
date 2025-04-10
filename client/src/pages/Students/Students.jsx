// client/src/pages/Students/Students.jsx
import React, { useState, useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import StudentTable from '../../components/StudentTable/StudentTable';
import StudentForm from '../../components/StudentForm/StudentForm';
import Button from '../../components/common/Button/Button';
import Modal from '../../components/common/Modal/Modal';
import './Students.css';

const Students = () => {
  const { students, loading, error } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);

  const handleEdit = (student) => {
    setCurrentStudent(student);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentStudent(null);
  };

  if (loading) return <div className="loading">Loading students...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="students-container">
      <div className="students-header">
        <h2>Student Management</h2>
        <Button
          variant="primary"
          onClick={() => setIsModalOpen(true)}
        >
          Add New Student
        </Button>
      </div>

      <StudentTable students={students} onEdit={handleEdit} />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={currentStudent ? 'Edit Student' : 'Add New Student'}
      >
        <StudentForm
          student={currentStudent}
          onClose={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default Students;