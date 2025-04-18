import { useState, useContext } from 'react';
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

  const openModal = (report = null) => {
    setCurrentReport(report);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentReport(null);
    setIsModalOpen(false);
  };

  if (loading) return <div className="loading">Loading reports...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="reports-container">
      <header className="reports-header">
        <h2>Report Management</h2>
        <Button variant="primary" onClick={() => openModal()}>
          Generate New Report
        </Button>
      </header>

      <ReportTable reports={reports} students={students} onEdit={openModal} />

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={currentReport ? 'Edit Report' : 'Create New Report'}
      >
        <ReportForm
          report={currentReport}
          students={students}
          onClose={closeModal}
        />
      </Modal>
    </div>
  );
};

export default Reports;
