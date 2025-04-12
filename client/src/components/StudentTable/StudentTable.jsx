import { useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../../contexts/AppContext';
import Button from '../common/Button/Button';
import './StudentTable.css';

const StudentTable = ({ students = [], onEdit }) => {
  const { deleteStudent } = useContext(AppContext);

  const handleEdit = (student) => onEdit(student);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(id);
      } catch (err) {
        console.error('Failed to delete student:', err);
        alert('An error occurred while deleting the student.');
      }
    }
  };

  if (!Array.isArray(students) || students.length === 0) {
    return <div className="no-data">No students found</div>;
  }

  return (
    <div className="table-container">
      <table className="student-table">
        <thead>
          <tr>
            <th scope="col">Admission No.</th>
            <th scope="col">Name</th>
            <th scope="col">Grade</th>
            <th scope="col">School</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.admission_number}</td>
              <td>{student.name}</td>
              <td>Grade {student.grade}</td>
              <td>{student.school}</td>
              <td className="actions">
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => handleEdit(student)}
                  aria-label={`Edit student ${student.name}`}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="small"
                  onClick={() => handleDelete(student.id)}
                  aria-label={`Delete student ${student.name}`}
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

StudentTable.propTypes = {
  students: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      admission_number: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      grade: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      school: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default StudentTable;
