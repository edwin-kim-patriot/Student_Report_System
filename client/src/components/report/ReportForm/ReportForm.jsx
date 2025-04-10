// ReportForm.jsx
import React, { useState, useContext } from 'react';
import { AppContext } from '../../../contexts/AppContext';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import Select from '../../common/Select/Select';
import './ReportForm.css';

const ReportForm = ({ student, onSubmit }) => {
  const { schools, grades, terms } = useContext(AppContext);
  const [formData, setFormData] = useState({
    studentId: student?.id || '',
    term: student?.term || terms[0]?.value || '',
    exam: student?.exam || 'END-TERM',
    year: student?.year || new Date().getFullYear(),
    grade: student?.grade || grades[0]?.value || '9',
    school: student?.school || schools[0]?.value || '',
    english: student?.english || '',
    kiswahili: student?.kiswahili || '',
    mathematics: student?.mathematics || '',
    science: student?.science || '',
    cre: student?.cre || '',
    socialStudies: student?.socialStudies || '',
    agriculture: student?.agriculture || '',
    preTech: student?.preTech || '',
    arts: student?.arts || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateTotal = () => {
    const subjects = [
      formData.english, formData.kiswahili, formData.mathematics,
      formData.science, formData.cre, formData.socialStudies,
      formData.agriculture, formData.preTech, formData.arts
    ];
    return subjects.reduce((sum, mark) => sum + (parseFloat(mark) || 0), 0);
  };

  const calculatePerformance = (total) => {
    if (total >= 702) return 'EXCEEDING EXPECTATION';
    if (total >= 450) return 'MEETING EXPECTATION';
    if (total >= 234) return 'APPROACHING EXPECTATION';
    return 'BELOW EXPECTATION';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalMarks = calculateTotal();
    const performance = calculatePerformance(totalMarks);
    
    onSubmit({
      ...formData,
      totalMarks,
      performance
    });
  };

  return (
    <form className="report-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <h3>Student Information</h3>
        <div className="form-row">
          <Select
            label="Term"
            name="term"
            value={formData.term}
            onChange={handleChange}
            options={terms}
            required
          />
          <Select
            label="Exam"
            name="exam"
            value={formData.exam}
            onChange={handleChange}
            options={[
              { value: 'END-TERM', label: 'End Term' },
              { value: 'MID-TERM', label: 'Mid Term' }
            ]}
            required
          />
          <Input
            type="number"
            label="Year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <Select
            label="Grade"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            options={grades}
            required
          />
          <Select
            label="School"
            name="school"
            value={formData.school}
            onChange={handleChange}
            options={schools}
            required
          />
        </div>
      </div>

      <div className="form-section">
        <h3>Subject Marks</h3>
        <div className="form-row">
          <Input
            type="number"
            label="English"
            name="english"
            value={formData.english}
            onChange={handleChange}
            min="0"
            max="100"
            required
          />
          <Input
            type="number"
            label="Kiswahili"
            name="kiswahili"
            value={formData.kiswahili}
            onChange={handleChange}
            min="0"
            max="100"
            required
          />
          <Input
            type="number"
            label="Mathematics"
            name="mathematics"
            value={formData.mathematics}
            onChange={handleChange}
            min="0"
            max="100"
            required
          />
        </div>
        <div className="form-row">
          <Input
            type="number"
            label="Integrated Science"
            name="science"
            value={formData.science}
            onChange={handleChange}
            min="0"
            max="100"
            required
          />
          <Input
            type="number"
            label="CRE"
            name="cre"
            value={formData.cre}
            onChange={handleChange}
            min="0"
            max="100"
            required
          />
          <Input
            type="number"
            label="Social Studies"
            name="socialStudies"
            value={formData.socialStudies}
            onChange={handleChange}
            min="0"
            max="100"
            required
          />
        </div>
        <div className="form-row">
          <Input
            type="number"
            label="Agriculture & Nutrition"
            name="agriculture"
            value={formData.agriculture}
            onChange={handleChange}
            min="0"
            max="100"
            required
          />
          <Input
            type="number"
            label="Pre-Technical Studies"
            name="preTech"
            value={formData.preTech}
            onChange={handleChange}
            min="0"
            max="100"
            required
          />
          <Input
            type="number"
            label="Creative Arts"
            name="arts"
            value={formData.arts}
            onChange={handleChange}
            min="0"
            max="100"
            required
          />
        </div>
      </div>

      <div className="form-footer">
        <Button type="submit" variant="primary">
          {student ? 'Update Report' : 'Generate Report'}
        </Button>
      </div>
    </form>
  );
};

export default ReportForm;