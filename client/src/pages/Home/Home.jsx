import { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import './Home.css';
import PropTypes from 'prop-types';

const Home = () => {
  const { students, reports, loading } = useContext(AppContext);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="home-container">
      <h1>Welcome to the Student Report System</h1>

      <div className="stats-container">
        <StatCard label="Total Students" value={students.length} />
        <StatCard label="Total Reports" value={reports.length} />
        <StatCard label="Grade" value="7, 8, 9" />
      </div>
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div className="stat-card">
    <h3>{label}</h3>
    <p>{value}</p>
  </div>
);
StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Home;

