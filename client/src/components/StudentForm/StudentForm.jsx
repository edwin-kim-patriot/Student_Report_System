import { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../../contexts/AppContext';
import Input from '../common/Input/Input';
import Select from '../common/Select/Select';
import Button from '../common/Button/Button';
import './StudentForm.css';

const StudentForm = ({ student, onClose }) => {
  const { addStudent, updateStudent, schools, grades } = useContext(AppContext);

  const [formData, setFormData] = useState({
    admission_number: '',
    name: '',
    grade: grades[0]?.value || '',
    school: schools[0]?.value || ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (student) {
      setFormData({
        admission_number: student.admission_number || '',
        name: student.name || '',
        grade: student.grade || grades[0]?.value || '',
        school: student.school || schools[0]?.value || ''
      });
    }
  }, [student, grades, schools]);

  const handleChange = ({ target: { name, value } }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.admission_number) newErrors.admission_number = 'Admission number is required';
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.grade) newErrors.grade = 'Grade is required';
    if (!formData.school) newErrors.school = 'School is required';
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
    <form onSubmit={handleSubmit} className="student-form" noValidate>
      <Input
        label="Admission Number"
        name="admission_number"
        value={formData.admission_number}
        onChange={handleChange}
        error={errors.admission_number}
        disabled={!!student || isSubmitting}
      />
      <Input
        label="Student Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        disabled={isSubmitting}
      />
      <Select
        label="Grade"
        name="grade"
        value={formData.grade}
        onChange={handleChange}
        options={grades}
        error={errors.grade}
        disabled={isSubmitting}
      />
      <Select
        label="School"
        name="school"
        value={formData.school}
        onChange={handleChange}
        options={schools}
        error={errors.school}
        disabled={isSubmitting}
      />
      <div className="form-actions">
        <Button type="button" variant="secondary" onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Student'}
        </Button>
      </div>
    </form>
  );
};

StudentForm.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.string,
    admission_number: PropTypes.string,
    name: PropTypes.string,
    grade: PropTypes.string,
    school: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};

export default StudentForm;
