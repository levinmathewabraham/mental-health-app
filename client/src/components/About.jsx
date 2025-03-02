import React from "react";
import Navbar from "./Navbar";

const AboutUs = () => {
    return (
        <div className="contact-us">
            <Navbar />
            <header className="hero-section">
                <section id="about" className="about-section">
                    <h1>About MoodSync</h1>
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
            </header>
            
        </div>
    );
};

export default AboutUs;