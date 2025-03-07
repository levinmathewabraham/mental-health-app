import React from "react";
import Navbar from "./Navbar";
import './Dashboard.css';

const TermsOfService = () => {
    return (
        <div className="terms-of-service">
            <Navbar />
            <header className="hero-section">
                <h1>Terms of Service</h1>
            </header>
            <section className="resource-section">
                <h2>1. Acceptance of Terms</h2>
                <p>By accessing or using the MoodSync application, you agree to comply with and be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use the application.</p>

                <h2>2. Changes to Terms</h2>
                <p>MoodSync reserves the right to modify these Terms of Service at any time. We will notify you of any changes by posting the new Terms on this page. Your continued use of the application after any changes constitutes your acceptance of the new Terms.</p>

                <h2>3. User Accounts</h2>
                <p>To access certain features of the application, you may be required to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</p>

                <h2>4. User Responsibilities</h2>
                <p>You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password.</p>

                <h2>5. Prohibited Activities</h2>
                <p>You agree not to engage in any of the following prohibited activities:</p>
                <ul>
                    <li>Using the application for any illegal or unauthorized purpose.</li>
                    <li>Interfering with or disrupting the security, integrity, or performance of the application.</li>
                    <li>Attempting to gain unauthorized access to the application or its related systems or networks.</li>
                    <li>Transmitting any viruses, malware, or harmful code.</li>
                </ul>

                <h2>6. Intellectual Property</h2>
                <p>The MoodSync application and its original content, features, and functionality are owned by MoodSync and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>

                <h2>7. Disclaimer of Warranties</h2>
                <p>The application is provided on an "as is" and "as available" basis. MoodSync makes no representations or warranties of any kind, express or implied, regarding the operation of the application or the information, content, materials, or products included in the application.</p>

                <h2>8. Limitation of Liability</h2>
                <p>In no event shall MoodSync, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:</p>
                <ul>
                    <li>Your access to or use of (or inability to access or use) the application.</li>
                    <li>Any conduct or content of any third party on the application.</li>
                    <li>Any content obtained from the application.</li>
                    <li>Unauthorized access, use, or alteration of your transmissions or content.</li>
                </ul>

                <h2>9. Governing Law</h2>
                <p>These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in which MoodSync operates, without regard to its conflict of law principles.</p>

                <h2>10. Contact Us</h2>
                <p>If you have any questions about these Terms of Service, please contact us at <a href="mailto:support@moodsync.com">support@moodsync.com</a>.</p>
            </section>
        </div>
    );
};

export default TermsOfService;