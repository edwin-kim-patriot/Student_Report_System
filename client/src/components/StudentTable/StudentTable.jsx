// client/src/components/StudentTable/StudentTable.jsx
import React, { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import Button from '../common/Button/Button';
import './StudentTable.css';

const StudentTable = ({ students, onEdit }) => {
  const { deleteStudent } = useContext(AppContext);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      await deleteStudent(id);
    }
  };

  if (students.length === 0) {
    return <div className="no-data">No students found</div>;
  }

  return (
    <div className="table-container">
      <table className="student-table">
        <thead>
          <tr>
            <th>Admission No.</th>
            <th>Name</th>
            <th>Grade</th>
            <th>School</th>
            <th>Actions</th>
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
                  onClick={() => onEdit(student)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="small"
                  onClick={() => handleDelete(student.id)}
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

export default StudentTable;