import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const navLinks = [
  { to: '/', label: 'Home', icon: 'icon-home', exact: true },
  { to: '/dashboard', label: 'Dashboard', icon: 'icon-dashboard' },
  { to: '/students', label: 'Students', icon: 'icon-students' },
  { to: '/reports', label: 'Reports', icon: 'icon-reports' },
  { to: '/settings', label: 'Settings', icon: 'icon-settings' }
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src="/assets/logo.png" alt="Rehema School Logo" className="logo" />
        <h2>Report System</h2>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {navLinks.map(({ to, label, icon, exact }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={exact}
                className={({ isActive }) => (isActive ? 'active' : '')}
                aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
              >
                <i className={icon}></i>
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <p>© {new Date().getFullYear()} Rehema Junior School</p>
      </div>
    </aside>
  );
};

export default Sidebar;
