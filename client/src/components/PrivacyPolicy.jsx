import React from "react";
import Navbar from "./Navbar";
import "./Dashboard.css";

const PrivacyPolicy = () => {
    return (
        <div className="privacy-policy">
            <Navbar />
            <header className="hero-section">
                <h1>Privacy Policy</h1>
            </header>
            <section className="resource-section">
                <h2>1. Introduction</h2>
                <p>This Privacy Policy explains how MoodSync ("we", "our", or "us") collects, uses, discloses, and protects your information when you use our application. By using MoodSync, you agree to the collection and use of information in accordance with this policy.</p>

                <h2>2. Information We Collect</h2>
                <p>We collect several types of information for various purposes to provide and improve our service to you:</p>
                <ul>
                    <li><strong>Personal Data:</strong> While using our application, we may ask you to provide us with certain personally identifiable information, including but not limited to your username, email address, and password.</li>
                    <li><strong>Usage Data:</strong> We may also collect information on how the application is accessed and used. This usage data may include information such as your device's Internet Protocol address (e.g., IP address), browser type, browser version, the pages of our application that you visit, the time and date of your visit, the time spent on those pages, and other diagnostic data.</li>
                </ul>

                <h2>3. Use of Data</h2>
                <p>MoodSync uses the collected data for various purposes:</p>
                <ul>
                    <li>To provide and maintain our application.</li>
                    <li>To notify you about changes to our application.</li>
                    <li>To allow you to participate in interactive features of our application when you choose to do so.</li>
                    <li>To provide customer support.</li>
                    <li>To gather analysis or valuable information so that we can improve our application.</li>
                    <li>To monitor the usage of our application.</li>
                    <li>To detect, prevent, and address technical issues.</li>
                </ul>

                <h2>4. Disclosure of Data</h2>
                <p>We may disclose personal information that we collect, or you provide:</p>
                <ul>
                    <li><strong>Compliance with Laws:</strong> We may disclose your personal information in the good faith belief that such action is necessary to comply with a legal obligation.</li>
                    <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or asset sale, your personal information may be transferred. We will provide notice before your personal information is transferred and becomes subject to a different Privacy Policy.</li>
                </ul>

                <h2>5. Security of Data</h2>
                <p>The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.</p>

                <h2>6. Your Data Protection Rights</h2>
                <p>If you are a resident of the European Economic Area (EEA), you have certain data protection rights. MoodSync aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data. These rights include:</p>
                <ul>
                    <li>The right to access, update, or delete the information we have on you.</li>
                    <li>The right to rectification.</li>
                    <li>The right to object.</li>
                    <li>The right of restriction.</li>
                    <li>The right to data portability.</li>
                    <li>The right to withdraw consent.</li>
                </ul>

                <h2>7. Links to Other Sites</h2>
                <p>Our application may contain links to other sites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy and terms of service of any site you visit.</p>

                <h2>8. Changes to This Privacy Policy</h2>
                <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>

                <h2>9. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us:</p>
                <p>Email: <a href="mailto:support@moodsync.com">support@moodsync.com</a></p>
            </section>
        </div>
    );
};

export default PrivacyPolicy;