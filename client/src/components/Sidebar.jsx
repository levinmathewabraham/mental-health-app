import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ username }) => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Hi, {username}</h2>
      <nav>
        <ul className="sidebar-menu">
          <li>
            <Link to="/dashboard">🏠 Dashboard</Link>
          </li>
          <li>
            <Link to="/dashboard/mood-logger">📘 Log Mood</Link>
          </li>
          <li>
            <Link to="/dashboard/mood-trends">📈 Mood Trends</Link>
          </li>
          <li>
            <Link to="/dashboard/predictor">🩺 Depression Predictor</Link>
          </li>
          <li>
            <Link to="/dashboard/recommendations">💡 Lifestyle Tips</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
