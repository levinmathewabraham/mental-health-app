import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBrain, FaBars, FaTimes, FaUserCircle, FaBook, FaUsers, FaHome, FaBell, FaCog } from "react-icons/fa";
import LogoutButton from "./LogoutButton";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const isLoggedIn = !!localStorage.getItem("user");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Account for sidebar in dashboard layout
  const isDashboard = location.pathname.includes('/dashboard');

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-content">
        <Link to="/" className="logo" onClick={closeMenu}>
          <FaBrain className="logo-icon" />
          <span className="logo-text">MoodSync</span>
        </Link>

        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          {!isDashboard && (
            <>
              <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={closeMenu}>
                <FaHome className="nav-icon" />
                <span>Home</span>
              </Link>
              
              <Link to="/resources" className={`nav-link ${location.pathname === '/resources' ? 'active' : ''}`} onClick={closeMenu}>
                <FaBook className="nav-icon" />
                <span>Resources</span>
              </Link>
              
              <Link to="/community" className={`nav-link ${location.pathname === '/community' ? 'active' : ''}`} onClick={closeMenu}>
                <FaUsers className="nav-icon" />
                <span>Community</span>
              </Link>
            </>
          )}

          {isLoggedIn && (
            <div className="user-actions">
              {isDashboard && (
                <div className="notification-bell">
                  <FaBell className="nav-icon" />
                  {notifications > 0 && <span className="notification-badge">{notifications}</span>}
                </div>
              )}
              
              {!isDashboard && (
                <Link to="/dashboard" className="nav-link dashboard-link" onClick={closeMenu}>
                  <FaUserCircle className="nav-icon" />
                  <span>Dashboard</span>
                </Link>
              )}
            </div>
          )}
          
          <div className="auth-buttons">
            {isLoggedIn ? (
              <>
                {isDashboard && (
                  <Link to="/settings" className="settings-link" onClick={closeMenu}>
                    <FaCog className="nav-icon" />
                  </Link>
                )}
                <LogoutButton onClick={closeMenu} className="auth-button logout-button" />
              </>
            ) : (
              <>
                <Link to="/login" className="auth-button login-button" onClick={closeMenu}>
                  Login
                </Link>
                <Link to="/register" className="auth-button signup-button" onClick={closeMenu}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;