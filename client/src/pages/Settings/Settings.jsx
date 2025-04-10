// client/src/pages/Settings/Settings.jsx
import React, { useContext, useState } from 'react';
import { AppContext } from '../../contexts/AppContext';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import './Settings.css';

const Settings = () => {
  const { schools, grades } = useContext(AppContext);
  const [formData, setFormData] = useState({
    schoolName: '',
    newGrade: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSchool = (e) => {
    e.preventDefault();
    // In a real app, this would call an API to add the school
    console.log('Adding school:', formData.schoolName);
    setFormData(prev => ({ ...prev, schoolName: '' }));
  };

  const handleAddGrade = (e) => {
    e.preventDefault();
    // In a real app, this would call an API to add the grade
    console.log('Adding grade:', formData.newGrade);
    setFormData(prev => ({ ...prev, newGrade: '' }));
  };

  return (
    <div className="settings-container">
      <h1>System Settings</h1>
      
      <div className="settings-section">
        <h2>Manage Schools</h2>
        <form onSubmit={handleAddSchool} className="settings-form">
          <Input
            label="Add New School"
            name="schoolName"
            value={formData.schoolName}
            onChange={handleChange}
            placeholder="Enter school name"
          />
          <Button type="submit" variant="primary">
            Add School
          </Button>
        </form>
        
        <div className="current-items">
          <h3>Current Schools</h3>
          <ul>
            {schools.map((school, index) => (
              <li key={index}>{school.label}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="settings-section">
        <h2>Manage Grades</h2>
        <form onSubmit={handleAddGrade} className="settings-form">
          <Input
            label="Add New Grade"
            name="newGrade"
            value={formData.newGrade}
            onChange={handleChange}
            placeholder="Enter grade (e.g., 10)"
          />
          <Button type="submit" variant="primary">
            Add Grade
          </Button>
        </form>
        
        <div className="current-items">
          <h3>Current Grades</h3>
          <ul>
            {grades.map((grade, index) => (
              <li key={index}>Grade {grade.label}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Settings;