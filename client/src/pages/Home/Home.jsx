//client/src/pages/Home/Home.jsx
import React, { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import './Home.css';

const Home = () => {
  const { students, reports, loading } = useContext(AppContext);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home-container">
      <h1>Welcome to Student Report System</h1>
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Students</h3>
          <p>{students.length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Reports</h3>
          <p>{reports.length}</p>
        </div>
        <div className="stat-card">
          <h3>Grades</h3>
          <p>7, 8, 9</p>
        </div>
      </div>
    </div>
  );
};

export default Home;