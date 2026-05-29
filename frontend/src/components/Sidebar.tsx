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
          <a href="https://www.linkedin.com/in/yulin-lin-0a05201ab/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com/YuLinSQ" target="_blank" rel="noreferrer">GitHub</a>
          <a href="mailto:2017yulin@gmail.com">2017yulin@gmail.com</a>
        </div>
      </div>
      
      <div style={{ marginTop: 'auto', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
        v1.0.0 (Local Dev)
      </div>
    </aside>
  );
}
