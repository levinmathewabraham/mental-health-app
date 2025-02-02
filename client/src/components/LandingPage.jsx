import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <div className="landing-container">
        <header className="hero-section">
          <h1>Your Mental Health, Simplified</h1>
          <p>Track your moods, gain insights, and improve your well-being with MoodSync.</p>
          <Link to="/register" className="cta-button">Get Started</Link>
        </header>

        <section id="about" className="about-section">
          <h2>About MoodSync</h2>
          <p>
            MoodSync is a web application designed to help students improve their mental health. 
            Track your mood trends, get personalized recommendations, and leverage machine learning 
            to better understand your mental wellness.
          </p>
        </section>

        <section id="contact" className="contact-section">
          <h2>Contact Us</h2>
          <p>Got questions? Reach out to our support team at <a href="mailto:support@moodsync.com">support@moodsync.com</a></p>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
