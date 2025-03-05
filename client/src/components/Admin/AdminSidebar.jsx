import React from 'react';
import './AdminSidebar.css';

const AdminSidebar = ({ activeSection, setActiveSection }) => {
  return (
    <div className="admin-sidebar">
      <div className="admin-sidebar-menu">
        <button 
          className={`sidebar-btn ${activeSection === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveSection('dashboard')}
        >
          Dashboard Overview
        </button>
        <button 
          className={`sidebar-btn ${activeSection === 'users' ? 'active' : ''}`}
          onClick={() => setActiveSection('users')}
        >
          User Management
        </button>
        <button 
          className={`sidebar-btn ${activeSection === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveSection('notifications')}
        >
          Send Notifications
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar; 