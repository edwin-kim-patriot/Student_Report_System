// client/src/utils/validators.js

export const validateStudentForm = (formData) => {
  const errors = {};

  if (!formData.admission_number?.trim()) {
    errors.admission_number = 'Admission number is required';
  }

  if (!formData.name?.trim()) {
    errors.name = 'Student name is required';
  }

  if (!formData.grade) {
    errors.grade = 'Grade is required';
  }

  if (!formData.school) {
    errors.school = 'School is required';
  }

  return errors;
};

export const validateReportForm = (formData) => {
  const errors = {};

  if (!formData.studentId) {
    errors.studentId = 'Student is required';
  }

  if (!formData.term) {
    errors.term = 'Term is required';
  }

  if (!formData.year) {
    errors.year = 'Year is required';
  }

  const subjects = [
    'english',
    'kiswahili',
    'mathematics',
    'science',
    'cre',
    'socialStudies',
    'agriculture',
    'preTech',
    'arts'
  ];

  for (const subject of subjects) {
    const mark = parseFloat(formData[subject]);
    if (isNaN(mark) || mark < 0 || mark > 100) {
      errors[subject] = 'Must be between 0 and 100';
    }
  }

  return errors;
};
