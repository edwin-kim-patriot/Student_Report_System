

import { useContext, useMemo } from 'react';
import { AppContext } from '../../contexts/AppContext';
import PerformanceChart from '../../components/PerformanceChart/PerformanceChart';
import RecentReports from '../../components/RecentReports/RecentReports';
import './Dashboard.css';

const Dashboard = () => {
  const { reports, students, loading, error } = useContext(AppContext);

  const gradeCounts = useMemo(() => {
    const counts = { '7': 0, '8': 0, '9': 0 };
    students.forEach(student => {
      if (counts[student.grade]) counts[student.grade]++;
    });
    return counts;
  }, [students]);

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="dashboard-container">
      <h1>Dashboard Overview</h1>

      <div className="dashboard-grid">
        <div className="dashboard-card chart-card">
          <h2>Class Performance</h2>
          <PerformanceChart reports={reports} />
        </div>

        <div className="dashboard-card stats-card">
          <h2>Quick Stats</h2>
          <div className="stats-grid">
            <StatItem label="Total Students" value={students.length} />
            <StatItem label="Total Reports" value={reports.length} />
            <StatItem label="Grade 7 Students" value={gradeCounts['7']} />
            <StatItem label="Grade 8 Students" value={gradeCounts['8']} />
            <StatItem label="Grade 9 Students" value={gradeCounts['9']} />
          </div>
        </div>

        <div className="dashboard-card recent-reports">
          <h2>Recent Reports</h2>
          <RecentReports reports={reports} students={students} />
        </div>
      </div>
    </div>
  );
};

import PropTypes from 'prop-types';

const StatItem = ({ label, value }) => (
  <div className="stat-item">
    <h3>{label}</h3>
    <p>{value}</p>
  </div>
);

StatItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Dashboard;




/*// client/src/pages/Dashboard/Dashboard.jsx
import { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import PerformanceChart from '../../components/PerformanceChart/PerformanceChart';
// import RecentReports from '../../components/RecentReports/RecentReports';
import './Dashboard.css';


import RecentReports from '../../components/RecentReports/RecentReports';

const Dashboard = () => {
  const { reports, students, loading, error } = useContext(AppContext);

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="dashboard-container">
      <h1>Dashboard Overview</h1>
      
      <div className="dashboard-grid">
        <div className="dashboard-card chart-card">
          <h2>Class Performance</h2>
          <PerformanceChart reports={reports} />
        </div>
        
        <div className="dashboard-card stats-card">
          <h2>Quick Stats</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <h3>Total Students</h3>
              <p>{students.length}</p>
            </div>
            <div className="stat-item">
              <h3>Total Reports</h3>
              <p>{reports.length}</p>
            </div>
            <div className="stat-item">
              <h3>Grade 7 Students</h3>
              <p>{students.filter(s => s.grade === '7').length}</p>
            </div>
            <div className="stat-item">
              <h3>Grade 8 Students</h3>
              <p>{students.filter(s => s.grade === '8').length}</p>
            </div>
            <div className="stat-item">
              <h3>Grade 9 Students</h3>
              <p>{students.filter(s => s.grade === '9').length}</p>
            </div>
          </div>
        </div>
        
        <div className="dashboard-card recent-reports">
          <h2>Recent Reports</h2>
          <RecentReports reports={reports} students={students} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;*/