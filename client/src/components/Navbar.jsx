import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBrain, FaBars, FaTimes, FaUserCircle, FaHome } from "react-icons/fa";
import LogoutButton from "./LogoutButton";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isLoggedIn = !!localStorage.getItem("user");
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

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

  // Get username and admin status from local storage
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUsername(parsedUser.username);
      setIsAdmin(parsedUser.isAdmin);
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleDashboardClick = () => {
    if (isAdmin) {
      navigate('/admin'); // Redirect to admin dashboard
    } else {
      navigate('/dashboard'); // Redirect to user dashboard
    }
    closeMenu();
  };

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
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={closeMenu}>
            <FaHome className="nav-icon" />
            <span>Home</span>
          </Link>

          {isLoggedIn && (
            <div className="user-actions">
              <button className="nav-link dashboard-link" onClick={handleDashboardClick}>
                <FaUserCircle className="nav-icon" />
                <span>Dashboard</span>
              </button>
            </div>
          )}
          
          <div className="auth-buttons">
            {isLoggedIn ? (
              <>
                <span className="username">{username}</span>
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