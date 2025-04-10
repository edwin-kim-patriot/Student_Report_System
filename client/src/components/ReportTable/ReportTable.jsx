// client/src/components/ReportTable/ReportTable.jsx
import React, { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import Button from '../common/Button/Button';
import { generateStudentReportPDF } from '../../services/pdfService';
import './ReportTable.css';



const ReportTable = ({ reports, students, onEdit }) => {
  const { deleteReport } = useContext(AppContext);

  const getStudentName = (studentId) => {
    const student = students.find(s => s.id === studentId);
    return student ? student.name : 'Unknown';
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      await deleteReport(id);
    }
  };

  const handleGeneratePDF = async (report) => {
    const student = students.find(s => s.id === report.student_id);
    if (!student) return;

    const element = document.createElement('div');
    element.innerHTML = `
      <div class="report-view">
        <!-- ReportView content will be generated here -->
      </div>
    `;
    document.body.appendChild(element);

    try {
      await generateStudentReportPDF(
        element.querySelector('.report-view'),
        student.name
      );
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      document.body.removeChild(element);
    }
  };

  if (reports.length === 0) {
    return <div className="no-data">No reports found</div>;
  }

  return (
    <div className="table-container">
      <table className="report-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Term</th>
            <th>Exam</th>
            <th>Year</th>
            <th>Grade</th>
            <th>Total Marks</th>
            <th>Performance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(report => (
            <tr key={report.id}>
              <td>{getStudentName(report.student_id)}</td>
              <td>Term {report.term}</td>
              <td>{report.exam}</td>
              <td>{report.year}</td>
              <td>Grade {report.grade}</td>
              <td>{report.total_marks}/900</td>
              <td>
                <span className={`performance-badge ${report.performance.toLowerCase().replace(' ', '-')}`}>
                  {report.performance}
                </span>
              </td>
              <td className="actions">
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => onEdit(report)}
                >
                  Edit
                </Button>
                <Button
                  variant="info"
                  size="small"
                  onClick={() => handleGeneratePDF(report)}
                >
                  PDF
                </Button>
                <Button
                  variant="danger"
                  size="small"
                  onClick={() => handleDelete(report.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;