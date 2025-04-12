import { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import Button from '../common/Button/Button';
import { generateStudentReportPDF } from '../../services/pdfService';
import ReportView from '../ReportView/ReportView';
import './ReportTable.css';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom/client';

const ReportTable = ({ reports, students, onEdit }) => {
  const { deleteReport } = useContext(AppContext);

  const getStudentName = (studentId) => {
    const student = students.find((s) => s.id === studentId);
    return student ? student.name : 'Unknown';
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      await deleteReport(id);
    }
  };

  const handleGeneratePDF = async (report) => {
    const student = students.find((s) => s.id === report.student_id);
    if (!student) return;

    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    document.body.appendChild(container);

    const root = ReactDOM.createRoot(container);
    const fullReport = {
      ...report,
      studentName: student.name,
      english: report.english,
      kiswahili: report.kiswahili,
      mathematics: report.mathematics,
      science: report.science,
      cre: report.cre,
      socialStudies: report.socialStudies,
      agriculture: report.agriculture,
      preTech: report.preTech,
      arts: report.arts,
      remarks: report.remarks
    };

    root.render(
      <ReportView
        report={fullReport}
        position={report.position || 1} // fallback
        totalStudents={report.totalStudents || 1}
      />
    );

    try {
      await generateStudentReportPDF(container, student.name);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      root.unmount();
      container.remove();
    }
  };

  if (!reports.length) {
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
          {reports.map((report) => (
            <tr key={report.id}>
              <td>{getStudentName(report.student_id)}</td>
              <td>Term {report.term}</td>
              <td>{report.exam}</td>
              <td>{report.year}</td>
              <td>Grade {report.grade}</td>
              <td>{report.total_marks}/900</td>
              <td>
                <span
                  className={`performance-badge ${
                    report.performance?.toLowerCase().replace(/\s+/g, '-') || 'unknown'
                  }`}
                >
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

ReportTable.propTypes = {
  reports: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      student_id: PropTypes.number.isRequired,
      term: PropTypes.number.isRequired,
      exam: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
      grade: PropTypes.string.isRequired,
      total_marks: PropTypes.number.isRequired,
      performance: PropTypes.string.isRequired,
      english: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      kiswahili: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      mathematics: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      science: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      cre: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      socialStudies: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      agriculture: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      preTech: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      arts: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      remarks: PropTypes.string,
      position: PropTypes.number,
      totalStudents: PropTypes.number,
    })
  ).isRequired,
  students: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default ReportTable;
