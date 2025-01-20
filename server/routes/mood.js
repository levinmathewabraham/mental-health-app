const express = require('express');
const router = express.Router();
const MoodLog = require('../models/MoodLog');
const ss = require("simple-statistics");

// Add a new mood log
router.post('/add', async (req, res) => {
  try {
    const { userId, mood, energy, stress, date } = req.body;
    const newMoodLog = new MoodLog({ userId, mood, energy, stress, date });
    await newMoodLog.save();
    res.status(201).json({ message: 'Mood logged successfully!' });
  } catch (err) {
    console.error('Error logging mood:', err);
    res.status(500).json({ error: 'Failed to log mood.' });
  }
});

// Get mood logs for a user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const moodLogs = await MoodLog.find({ userId }).sort({ date: -1 });
    res.status(200).json(moodLogs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch mood logs.' });
  }
});

// Route to calculate correlations for mood logs
router.get("/correlation/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    // Fetch mood logs for the specified user
    const moodLogs = await MoodLog.find({ userId });
    // Check if there are sufficient mood logs
    if (moodLogs.length < 2) {
      return res
        .status(400)
        .json({ error: "Not enough data to calculate correlations." });
    }

    // Extract relevant fields from mood logs
    const moods = moodLogs.map((log) => log.mood);
    const stress = moodLogs.map((log) => log.stress);
    const energy = moodLogs.map((log) => log.energy);

    const normalizedMoods = moods.map((value) => (value - 1) / 2); // Scale to 0–1
    const normalizedStress = stress.map((value) => (value - 1) / 4); // Scale to 0–1
    const normalizedEnergy = energy.map((value) => (value - 1) / 4); // Scale to 0–1

    const moodStressCorrelation = ss.sampleCorrelation(normalizedMoods, normalizedStress);
    const moodEnergyCorrelation = ss.sampleCorrelation(normalizedMoods, normalizedEnergy);
    const stressEnergyCorrelation = ss.sampleCorrelation(normalizedStress, normalizedEnergy);


    // Return the results
    res.status(200).json({
      moodStressCorrelation,
      moodEnergyCorrelation,
      stressEnergyCorrelation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to calculate correlations." });
  }
});

module.exports = router;
