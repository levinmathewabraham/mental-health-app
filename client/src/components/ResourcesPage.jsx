import React from 'react';
import Navbar from '../components/Navbar'; // Import the Navbar
import './ResourcesPage.css'; // Optional: Create a CSS file for styling

const ResourcesPage = () => {
  return (
    <div className="resources-container">
      <Navbar /> {/* Include the Navbar */}
      <h1>Mental Health Resources</h1>
      <p>Welcome to the resources page! Here you will find a variety of tools, articles, and support options to help you on your mental health journey.</p>

      <section className="resource-section">
        <h2>Articles and Guides</h2>
        <ul>
          <li>
            <a href="https://www.mentalhealth.gov/basics/what-is-mental-health" target="_blank" rel="noopener noreferrer">
              Understanding Mental Health
            </a>
            - A comprehensive guide on what mental health is and why it matters.
          </li>
          <li>
            <a href="https://www.nami.org/Your-Journey/Identity-and-Cultural-Dimensions/Understanding-Diversity-and-Inclusion" target="_blank" rel="noopener noreferrer">
              Understanding Diversity and Inclusion
            </a>
            - Insights into how diversity impacts mental health.
          </li>
          <li>
            <a href="https://www.psychologytoday.com/us/basics/mental-health" target="_blank" rel="noopener noreferrer">
              Mental Health Basics
            </a>
            - An overview of mental health, including common disorders and treatments.
          </li>
        </ul>
      </section>

      <section className="resource-section">
        <h2>Hotlines and Support</h2>
        <p>If you or someone you know is in crisis, please reach out for help. Here are some resources available in India:</p>
        <ul>
          <li>
            <strong>Vandrevala Foundation Helpline:</strong> <a href="https://vandrevalafoundation.com/" target="_blank" rel="noopener noreferrer">1860 266 2345</a> - A 24/7 helpline for mental health support.
          </li>
          <li>
            <strong>AASRA:</strong> <a href="http://www.aasra.info/" target="_blank" rel="noopener noreferrer">+91-9820466726</a> - A helpline for those in distress, available 24/7.
          </li>
          <li>
            <strong>iCall:</strong> <a href="https://icallhelpline.org/" target="_blank" rel="noopener noreferrer">+91-9152987821</a> - A helpline providing mental health support and counseling.
          </li>
        </ul>
      </section>

      <section className="resource-section">
        <h2>Self-Help Tools</h2>
        <p>Here are some self-help tools and apps that can assist you in managing your mental health:</p>
        <ul>
          <li>
            <a href="https://www.headspace.com/" target="_blank" rel="noopener noreferrer">
              Headspace
            </a>
            - A meditation app that provides guided meditations and mindfulness practices.
          </li>
          <li>
            <a href="https://www.calm.com/" target="_blank" rel="noopener noreferrer">
              Calm
            </a>
            - An app for sleep, meditation, and relaxation.
          </li>
          <li>
            <a href="https://www.moodfitapp.com/" target="_blank" rel="noopener noreferrer">
              Moodfit
            </a>
            - A mental health app that helps you track your mood and provides tools for self-care.
          </li>
        </ul>
      </section>

      <section className="resource-section">
        <h2>Books and Literature</h2>
        <p>Consider reading these books for deeper insights into mental health:</p>
        <ul>
          <li>
            <strong>The Body Keeps the Score</strong> by Bessel van der Kolk - A groundbreaking book on trauma and its effects on the body and mind.
          </li>
          <li>
            <strong>Feeling Good: The New Mood Therapy</strong> by David D. Burns - A classic book on cognitive behavioral therapy techniques.
          </li>
          <li>
            <strong>Lost Connections</strong> by Johann Hari - An exploration of the causes of depression and the ways to overcome it.
          </li>
          <li>
            <strong>Mindfulness in Plain English</strong> by Bhante Henepola Gunaratana - A practical guide to mindfulness and meditation.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ResourcesPage;
