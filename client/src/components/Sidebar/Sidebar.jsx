// client/src/components/Sidebar/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src="/assets/logo.png" alt="School Logo" className="logo" />
        <h2>Report System</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/" exact activeClassName="active">
              <i className="icon-home"></i>
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard" activeClassName="active">
              <i className="icon-dashboard"></i>
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/students" activeClassName="active">
              <i className="icon-students"></i>
              <span>Students</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/reports" activeClassName="active">
              <i className="icon-reports"></i>
              <span>Reports</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" activeClassName="active">
              <i className="icon-settings"></i>
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <p>© {new Date().getFullYear()} School System</p>
      </div>
    </aside>
  );
};

export default Sidebar;