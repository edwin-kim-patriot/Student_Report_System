// ReportView.jsx
import React from 'react';
import './ReportView.css';

const ReportView = ({ report, position, totalStudents }) => {
  const getPerformanceColor = (level) => {
    const colors = {
      'BELOW EXPECTATION': '#e74c3c',
      'APPROACHING EXPECTATION': '#f39c12',
      'MEETING EXPECTATION': '#3498db',
      'EXCEEDING EXPECTATION': '#2ecc71'
    };
    return colors[level] || '#1a5276';
  };

  const getSubjectPerformanceLevel = (mark) => {
    const numericMark = parseFloat(mark);
    if (isNaN(numericMark)) return '-';
    if (numericMark < 40) return 'BELOW EXPECTATION';
    if (numericMark < 60) return 'APPROACHING EXPECTATION';
    if (numericMark < 80) return 'MEETING EXPECTATION';
    return 'EXCEEDING EXPECTATION';
  };

  const getSubjectPerformanceColor = (mark) => {
    const numericMark = parseFloat(mark);
    if (isNaN(numericMark)) return '#1a5276';
    if (numericMark < 40) return '#e74c3c';
    if (numericMark < 60) return '#f39c12';
    if (numericMark < 80) return '#3498db';
    return '#2ecc71';
  };

  const subjects = [
    { name: "ENGLISH", mark: report.english },
    { name: "KISWAHILI", mark: report.kiswahili },
    { name: "MATHEMATICS", mark: report.mathematics },
    { name: "INTEGRATED SCIENCE", mark: report.science },
    { name: "CRE", mark: report.cre },
    { name: "SOCIAL STUDIES", mark: report.socialStudies },
    { name: "AGRICULTURE & NUTRITION", mark: report.agriculture },
    { name: "PRE-TECHNICAL STUDIES", mark: report.preTech },
    { name: "CREATIVE ARTS", mark: report.arts }
  ];

  return (
    <div className="report-view">
      <div className="report-header">
        <div className="school-logo">
          <img src="/assets/school-logo.png" alt="School Logo" />
        </div>
        <h1 className="school-name">REHEMA JUNIOR SCHOOL</h1>
        <h2 className="report-title">ACADEMIC REPORT FORM</h2>
      </div>

      <div className="student-info">
        <h3>{report.studentName}</h3>
        <div className="info-grid">
          <div><strong>Term:</strong> {report.term}</div>
          <div><strong>Exam:</strong> {report.exam}</div>
          <div><strong>Year:</strong> {report.year}</div>
          <div><strong>Grade:</strong> {report.grade}</div>
          <div><strong>Position:</strong> {position} of {totalStudents}</div>
          <div><strong>Total Marks:</strong> {report.totalMarks} out of 900</div>
          <div>
            <strong>Performance:</strong> 
            <span style={{ color: getPerformanceColor(report.performance) }}>
              {report.performance}
            </span>
          </div>
        </div>
      </div>

      <table className="subjects-table">
        <thead>
          <tr>
            <th>SUBJECT</th>
            <th>MARKS %</th>
            <th>PERFORMANCE LEVEL</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, index) => (
            <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
              <td>{subject.name}</td>
              <td>{subject.mark}</td>
              <td style={{ 
                color: getSubjectPerformanceColor(subject.mark),
                fontWeight: 'bold',
                fontStyle: 'italic'
              }}>
                {getSubjectPerformanceLevel(subject.mark)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="report-footer">
        <div className="remarks-section">
          <div className="remarks-title">TEACHER'S REMARKS:</div>
          <div className="remarks-content">
            {report.remarks || 'No remarks provided.'}
          </div>
        </div>
        <div className="signature-section">
          <div className="signature-title">HEAD TEACHER'S SIGNATURE</div>
          <div className="signature-line"></div>
        </div>
      </div>
    </div>
  );
};

export default ReportView;