import React from "react";
import Navbar from "./Navbar";

const ContactUs = () => {
    return (
        <div className="contact-us">
            <Navbar />
            <header className="hero-section">
                <section id="contact" className="contact-section">
                    <h1>Contact Us</h1>
                    <p>Got questions? Reach out to our support team at <a href="mailto:support@moodsync.com">support@moodsync.com</a></p>
                    <p>Follow us on social media for mental health tips and updates:</p>
                    <div className="nav-links">
                        <a href="#twitter" className="nav-link">Twitter</a>
                        <a href="#instagram" className="nav-link">Instagram</a>
                        <a href="#facebook" className="nav-link">Facebook</a>
                    </div>
                </section>
            </header>
            
        </div>
    );
};

export default ContactUs;