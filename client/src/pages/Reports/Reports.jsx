// client/src/pages/Reports/Reports.jsx
import React, { useState, useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import ReportTable from '../../components/ReportTable/ReportTable';
import ReportForm from '../../components/ReportForm/ReportForm';
import Button from '../../components/common/Button/Button';
import Modal from '../../components/common/Modal/Modal';
import './Reports.css';

const Reports = () => {
  const { reports, students, loading, error } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReport, setCurrentReport] = useState(null);

  const handleEdit = (report) => {
    setCurrentReport(report);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentReport(null);
  };

  if (loading) return <div className="loading">Loading reports...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="reports-container">
      <div className="reports-header">
        <h2>Report Management</h2>
        <Button
          variant="primary"
          onClick={() => setIsModalOpen(true)}
        >
          Generate New Report
        </Button>
      </div>

      <ReportTable reports={reports} students={students} onEdit={handleEdit} />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={currentReport ? 'Edit Report' : 'Create New Report'}
      >
        <ReportForm
          report={currentReport}
          students={students}
          onClose={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default Reports;