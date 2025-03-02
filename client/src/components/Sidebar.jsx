import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ username }) => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <div className={`sidebar ${expanded ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-header">
        <div className="user-greeting">
          <div className="avatar">{username.charAt(0).toUpperCase()}</div>
          {expanded && <h2 className="sidebar-title">Welcome, {username}</h2>}
        </div>
        <button 
          className="toggle-button" 
          onClick={() => setExpanded(!expanded)}
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {expanded ? '◀' : '▶'}
        </button>
      </div>
      
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          <li className={isActive('/dashboard') ? 'active' : ''}>
            <Link to="/dashboard">
              <span className="icon">🏠</span>
              {expanded && <span className="menu-text">Dashboard</span>}
            </Link>
          </li>
          <li className={isActive('/mental-health-resources') ? 'active' : ''}>
            <Link to="/resources">
              <span className="icon">📚</span>
              {expanded && <span className="menu-text">Mental Health Resources</span>}
            </Link>
          </li>
          <li className={isActive('/self-care-strategies') ? 'active' : ''}>
            <Link to="/self-care-strategies">
              <span className="icon">💆‍♂️</span>
              {expanded && <span className="menu-text">Self-Care Strategies</span>}
            </Link>
          </li>
          <li className={isActive('/support-groups') ? 'active' : ''}>
            <Link to="/support-groups">
              <span className="icon">🤝</span>
              {expanded && <span className="menu-text">Support Groups</span>}
            </Link>
          </li>
          <li className={isActive('/depression-assessment') ? 'active' : ''}>
            <Link to="/depression-assessment">
              <span className="icon">🩺</span>
              {expanded && <span className="menu-text">Depression Predictor</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;