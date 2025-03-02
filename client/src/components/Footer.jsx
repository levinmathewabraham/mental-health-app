import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>MoodSync</h3>
          <p>Your mental health companion for tracking and understanding your emotional well-being.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/policy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Emergency Contacts</h4>
          <ul>
            <li>National Crisis Line: 1056</li>
            <li>Emergency: 100</li>
            <li>1800-599-0019</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Connect With Us</h4>
          <div className="social-links">
            <a href="https://www.twitter.com"><i className="fab fa-twitter"></i></a>
            <a href="https://www.facebook.com"><i className="fab fa-facebook"></i></a>
            <a href="https://www.instagram.com"><i className="fab fa-instagram"></i></a>
            <a href="https://www.linkedin.com"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} MoodSync. All rights reserved.</p>
        <p>Disclaimer: This app is not a substitute for professional medical advice.</p>
      </div>
    </footer>
  );
};

export default Footer; 