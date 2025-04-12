// client/src/components/RecentReports/RecentReports.jsx

import './RecentReports.css';
import PropTypes from 'prop-types';

const RecentReports = ({ reports, students }) => {
  const getStudentName = (studentId) => {
    const student = students.find(s => s.id === studentId);
    return student ? student.name : 'Unknown';
  };

  const recentReports = [...reports]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  if (recentReports.length === 0) {
    return <div className="no-reports">No recent reports available</div>;
  }

  return (
    <div className="recent-reports-container">
      <table className="recent-reports-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Term</th>
            <th>Grade</th>
            <th>Total Marks</th>
            <th>Performance</th>
          </tr>
        </thead>
        <tbody>
          {recentReports.map(report => (
            <tr key={report.id}>
              <td>{getStudentName(report.student_id)}</td>
              <td>Term {report.term}</td>
              <td>Grade {report.grade}</td>
              <td>{report.total_marks}/900</td>
              <td>
                <span className={`performance-badge ${report.performance.toLowerCase().replace(' ', '-')}`}>
                  {report.performance}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
RecentReports.propTypes = {
  reports: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      student_id: PropTypes.number.isRequired,
      term: PropTypes.number.isRequired,
      grade: PropTypes.string.isRequired,
      total_marks: PropTypes.number.isRequired,
      performance: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
    })
  ).isRequired,
  students: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default RecentReports;
