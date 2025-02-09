import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminNavbar.css';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-left">
        <Link to="/admin" className="admin-brand">
          MoodSync Admin
        </Link>
      </div>
      
      <div className="admin-navbar-middle">
        <Link to="/admin" className="admin-nav-link">
          Dashboard
        </Link>
        <Link to="/admin/users" className="admin-nav-link">
          User Management
        </Link>
        <Link to="/admin/reports" className="admin-nav-link">
          Reports
        </Link>
        <Link to="/admin/settings" className="admin-nav-link">
          Settings
        </Link>
      </div>

      <div className="admin-navbar-right">
        <div className="admin-user-info">
          <span className="admin-badge">Admin</span>
          <button onClick={handleLogout} className="admin-logout-btn">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar; 