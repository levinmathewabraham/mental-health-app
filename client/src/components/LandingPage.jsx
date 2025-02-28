import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <div className="landing-container">
        <header className="hero-section">
          <h1>Your Mental Health, Simplified</h1>
          <p>Track your moods, gain insights, and improve your well-being with MoodSync.</p>
          <div className="hero-buttons">
            <Link to="/register" className="cta-button primary-button">Get Started</Link>
            <Link to="/features" className="secondary-button">Learn More</Link>
          </div>
        </header>
        
        <section id="features" className="features">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Mood Tracking</h3>
              <p>Log your daily moods and emotions with our intuitive interface.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Progress Insights</h3>
              <p>Visualize your mental health journey with detailed analytics.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🧠</div>
              <h3>AI Recommendations</h3>
              <p>Receive personalized suggestions based on your mood patterns.</p>
            </div>
          </div>
        </section>

        <section id="about" className="about-section">
          <h2>About MoodSync</h2>
          <p>
            MoodSync is a web application designed to help students improve their mental health.
            Track your mood trends, get personalized recommendations, and leverage machine learning
            to better understand your mental wellness.
          </p>
          <p>
            Our platform was developed by mental health professionals and technology experts
            to provide students with accessible tools for emotional well-being.
          </p>
        </section>

        <section className="testimonials">
          <h2>What Our Users Say</h2>
          <div className="features-grid">
            <div className="feature-card">
              <p>"MoodSync helped me identify patterns in my anxiety and develop better coping strategies."</p>
              <p><strong>- Jamie, College Junior</strong></p>
            </div>
            <div className="feature-card">
              <p>"The daily check-ins take just seconds but have made a huge difference in my awareness."</p>
              <p><strong>- Alex, Graduate Student</strong></p>
            </div>
          </div>
        </section>

        <section className="cta">
          <h2>Ready to Start Your Mental Health Journey?</h2>
          <p>Join thousands of students already improving their well-being with MoodSync.</p>
          <Link to="/register" className="cta-button">Sign Up Now - It's Free</Link>
        </section>

        <section id="contact" className="contact-section">
          <h2>Contact Us</h2>
          <p>Got questions? Reach out to our support team at <a href="mailto:support@moodsync.com">support@moodsync.com</a></p>
          <p>Follow us on social media for mental health tips and updates:</p>
          <div className="nav-links">
            <a href="#twitter" className="nav-link">Twitter</a>
            <a href="#instagram" className="nav-link">Instagram</a>
            <a href="#facebook" className="nav-link">Facebook</a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;