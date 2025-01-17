const express = require('express');
const router = express.Router();
const MoodLog = require('../models/MoodLog');

// Add a new mood log
router.post('/add', async (req, res) => {
  try {
    const { userId, mood, energy, stress, date } = req.body; // Add energy and stress here
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

module.exports = router;
