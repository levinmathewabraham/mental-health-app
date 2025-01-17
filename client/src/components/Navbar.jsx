// components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import "./Navbar.css"; // Add CSS for styling if needed

const Navbar = () => {
    const isLoggedIn = !!localStorage.getItem("user");

    return (
    <nav className="navbar">
        <div className="logo">MoodSync</div>
        <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            {isLoggedIn && <Link to="/dashboard" className="nav-link">Dashboard</Link>}
            <a href="#about" className="nav-link">About</a>
            <a href="#contact" className="nav-link">Contact</a>
            {isLoggedIn ? (
                <LogoutButton />
            ) : (
                <Link to="/login" className="nav-button">Login/Register</Link>
            )}
        </div>
    </nav>
    );
};

export default Navbar;
