import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaBook, FaHeart, FaUsers, FaBrain } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = ({ username, activeSection, setActiveSection }) => {
  return (
    <div className="sidebar expanded">
      <div className="sidebar-header">
        <div className="user-greeting">
          <div className="avatar">{username.charAt(0).toUpperCase()}</div>
          <h2 className="sidebar-title">Welcome, {username}</h2>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          <li className={activeSection === 'dashboard' ? 'active' : ''}>
            <button onClick={() => setActiveSection('dashboard')}>
              <span className="icon"><FaHome /></span>
              <span className="menu-text">Dashboard</span>
            </button>
          </li>
          <li className={activeSection === 'resources' ? 'active' : ''}>
            <button onClick={() => setActiveSection('resources')}>
              <span className="icon"><FaBook /></span>
              <span className="menu-text">Mental Health Resources</span>
            </button>
          </li>
          <li className={activeSection === 'self-care' ? 'active' : ''}>
            <button onClick={() => setActiveSection('self-care')}>
              <span className="icon"><FaHeart /></span>
              <span className="menu-text">Self-Care Strategies</span>
            </button>
          </li>
          <li className={activeSection === 'support' ? 'active' : ''}>
            <button onClick={() => setActiveSection('support')}>
              <span className="icon"><FaUsers /></span>
              <span className="menu-text">Support Groups</span>
            </button>
          </li>
          <li className={activeSection === 'assessment' ? 'active' : ''}>
            <Link to='/dashboard/depression-assessment'>
              <span className="icon"><FaBrain /></span>
              <span className="menu-text">Depression Predictor</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;