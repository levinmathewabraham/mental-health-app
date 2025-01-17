const express = require('express');
const router = express.Router();

// Helper function to generate recommendations
const generateRecommendations = (userData) => {
    const { sleep_duration, work_study_hours, academic_pressure, depression_risk } = userData;

    const recommendations = [];

    // Example Recommendations Logic
    if (sleep_duration < 6) recommendations.push("Try to maintain at least 6-8 hours of sleep for better productivity.");
    if (work_study_hours < 4) recommendations.push("Increase work-study hours by scheduling focused study blocks.");
    if (academic_pressure > 7) recommendations.push("Consider mindfulness exercises to manage academic pressure.");
    if (depression_risk === "High") recommendations.push("Reach out to mental health professionals or use relaxation techniques.");

    return recommendations;
};

// Route to get recommendations
router.post('/generate', async (req, res) => {
    try {
        const userData = req.body; // Send inputs like sleep_duration, etc.
        const recommendations = generateRecommendations(userData);
        res.status(200).json({ recommendations });
    } catch (err) {
        console.error("Error generating recommendations:", err);
        res.status(500).json({ error: "Failed to generate recommendations." });
    }
});

module.exports = router;
