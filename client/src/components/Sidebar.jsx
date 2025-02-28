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
          <li className={isActive('/dashboard/mood-logger') ? 'active' : ''}>
            <Link to="/dashboard/mood-logger">
              <span className="icon">📘</span>
              {expanded && <span className="menu-text">Log Mood</span>}
            </Link>
          </li>
          <li className={isActive('/dashboard/mood-trends') ? 'active' : ''}>
            <Link to="/dashboard/mood-trends">
              <span className="icon">📈</span>
              {expanded && <span className="menu-text">Mood Trends</span>}
            </Link>
          </li>
          <li className={isActive('/dashboard/predictor') ? 'active' : ''}>
            <Link to="/dashboard/predictor">
              <span className="icon">🩺</span>
              {expanded && <span className="menu-text">Depression Predictor</span>}
            </Link>
          </li>
          <li className={isActive('/dashboard/recommendations') ? 'active' : ''}>
            <Link to="/dashboard/recommendations">
              <span className="icon">💡</span>
              {expanded && <span className="menu-text">Lifestyle Tips</span>}
            </Link>
          </li>
        </ul>
      </nav>
      
      {expanded && (
        <div className="sidebar-footer">
          <Link to="/settings" className="settings-link">
            <span className="icon">⚙️</span>
            <span className="menu-text">Settings</span>
          </Link>
          <Link to="/help" className="help-link">
            <span className="icon">❓</span>
            <span className="menu-text">Help</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Sidebar;