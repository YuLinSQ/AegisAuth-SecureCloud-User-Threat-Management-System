import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
          Dashboard
        </NavLink>
        <NavLink to="/users" className={({ isActive }) => isActive ? 'active' : ''}>
          User Management
        </NavLink>
      </nav>

      <div className="connect-section">
        <h3>Connect with us</h3>
        <div className="connect-links">
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
      
      <div style={{ marginTop: 'auto', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
        v1.0.0 (Local Dev)
      </div>
    </aside>
  );
}
