// AnalysisSection.jsx
import React from 'react';
import './AnalysisSection.css';

const AnalysisSection = ({ subjectResults, overallMean, performanceLevels, totalStudents }) => {
  const getPerformanceStyle = (score) => {
    const num = parseFloat(score);
    if (isNaN(num)) return {};
    if (num >= 80 || num >= 702) return { color: '#27ae60', fontWeight: 'bold' };
    if (num >= 60 || num >= 450) return { color: '#2980b9', fontWeight: 'bold' };
    if (num >= 40 || num >= 234) return { color: '#f39c12', fontWeight: 'bold' };
    return { color: '#e74c3c', fontWeight: 'bold' };
  };

  const performanceData = [
    { level: 'EXCEEDING EXPECTATION', count: performanceLevels['EXCEEDING EXPECTATION'] },
    { level: 'MEETING EXPECTATION', count: performanceLevels['MEETING EXPECTATION'] },
    { level: 'APPROACHING EXPECTATION', count: performanceLevels['APPROACHING EXPECTATION'] },
    { level: 'BELOW EXPECTATION', count: performanceLevels['BELOW EXPECTATION'] }
  ];

  const dateString = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="analysis-section">
      <h1 className="analysis-title">
        Grade {subjectResults[0]?.grade || '9'} Performance Analysis
      </h1>
      <p className="generation-date">Generated on {dateString}</p>

      <h2>Student Performance Distribution</h2>
      <table className="performance-table">
        <thead>
          <tr>
            <th>Performance Level</th>
            <th>Number of Students</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {performanceData.map((item, index) => (
            <tr key={index}>
              <td>{item.level}</td>
              <td>{item.count}</td>
              <td>{((item.count / totalStudents) * 100).toFixed(1)}%</td>
            </tr>
          ))}
          <tr className="total-row">
            <td><strong>TOTAL</strong></td>
            <td><strong>{totalStudents}</strong></td>
            <td><strong>100%</strong></td>
          </tr>
        </tbody>
      </table>

      <h2>Subject Performance</h2>
      <table className="subject-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Mean Score</th>
            <th>Performance Level</th>
          </tr>
        </thead>
        <tbody>
          {subjectResults.map((subject, index) => (
            <tr key={index}>
              <td>{subject.name}</td>
              <td>{subject.mean.toFixed(1)}%</td>
              <td style={getPerformanceStyle(subject.mean)}>
                {subject.performance}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="overall-performance">
        <h2>Overall Grade Performance</h2>
        <p><strong>Average Total Score:</strong> {overallMean.toFixed(1)}/900</p>
        <p><strong>Performance Level:</strong> 
          <span style={getPerformanceStyle(overallMean)}>
            {calculatePerformanceLevel(overallMean, 'overall')}
          </span>
        </p>
      </div>
    </div>
  );

  function calculatePerformanceLevel(score, type) {
    const num = parseFloat(score);
    if (isNaN(num)) return 'NO DATA';
    
    if (type === 'subject') {
      if (num >= 80) return 'EXCEEDING EXPECTATION';
      if (num >= 60) return 'MEETING EXPECTATION';
      if (num >= 40) return 'APPROACHING EXPECTATION';
      return 'BELOW EXPECTATION';
    } else {
      if (num >= 702) return 'E.E (Exceeding Expectation)';
      if (num >= 450) return 'M.E (Meeting Expectation)';
      if (num >= 234) return 'A.E (Approaching Expectation)';
      return 'B.E (Below Expectation)';
    }
  }
};

export default AnalysisSection;