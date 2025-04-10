// client/src/components/StudentForm/StudentForm.jsx
import React, { useState, useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import Input from '../common/Input/Input';
import Select from '../common/Select/Select';
import Button from '../common/Button/Button';
import './StudentForm.css';

const StudentForm = ({ student, onClose }) => {
  const { addStudent, updateStudent, schools, grades } = useContext(AppContext);
  const [formData, setFormData] = useState({
    admissionNumber: student?.admission_number || '',
    name: student?.name || '',
    grade: student?.grade || grades[0]?.value || '',
    school: student?.school || schools[0]?.value || ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.admissionNumber) newErrors.admissionNumber = 'Admission number is required';
    if (!formData.name) newErrors.name = 'Name is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      if (student) {
        await updateStudent(student.id, formData);
      } else {
        await addStudent(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving student:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <Input
        label="Admission Number"
        name="admissionNumber"
        value={formData.admissionNumber}
        onChange={handleChange}
        error={errors.admissionNumber}
        disabled={!!student}
      />
      <Input
        label="Student Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
      />
      <Select
        label="Grade"
        name="grade"
        value={formData.grade}
        onChange={handleChange}
        options={grades}
      />
      <Select
        label="School"
        name="school"
        value={formData.school}
        onChange={handleChange}
        options={schools}
      />
      <div className="form-actions">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Student'}
        </Button>
      </div>
    </form>
  );
};

export default StudentForm;