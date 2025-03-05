const express = require('express');
const router = express.Router();
const User = require('../models/User');
const MoodLog = require('../models/MoodLog');
const nodemailer = require('nodemailer');

// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
  try {
    const userId = req.headers.userid;
    const user = await User.findById(userId);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: 'Access denied. Admin only.' });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all users
router.get('/users', isAdmin, async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get admin dashboard stats
router.get('/stats', isAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalMoodLogs = await MoodLog.countDocuments();
    // You can define your own criteria for high risk users
    const highRiskUsers = await MoodLog.countDocuments({ mood: { $lte: 3 } });

    res.json({
      totalUsers,
      totalMoodLogs,
      highRiskUsers
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Delete user
router.delete('/users/:userId', isAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    // Also delete associated mood logs
    await MoodLog.deleteMany({ userId: req.params.userId });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Get mood analytics
router.get('/mood-analytics', isAdmin, async (req, res) => {
  try {
    const { timeRange } = req.query;
    let dateFilter = {};
    
    // Set date filter based on time range
    const now = new Date();
    if (timeRange === 'week') {
      dateFilter = { date: { $gte: new Date(now - 7 * 24 * 60 * 60 * 1000) } };
    } else if (timeRange === 'month') {
      dateFilter = { date: { $gte: new Date(now - 30 * 24 * 60 * 60 * 1000) } };
    } else if (timeRange === 'year') {
      dateFilter = { date: { $gte: new Date(now - 365 * 24 * 60 * 60 * 1000) } };
    }

    // Get all mood logs within the time range
    const moodLogs = await MoodLog.find(dateFilter).populate('userId', 'username');

    // Calculate daily averages
    const dailyAverages = await MoodLog.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          average: { $avg: "$mood" }
        }
      },
      { $sort: { "_id": 1 } },
      {
        $project: {
          date: "$_id",
          average: 1,
          _id: 0
        }
      }
    ]);

    // Calculate mood distribution
    const moodDistribution = [0, 0, 0, 0, 0]; // For moods 1-5
    moodLogs.forEach(log => {
      moodDistribution[Math.floor(log.mood) - 1]++;
    });

    // Calculate user activity
    const userActivity = await MoodLog.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } },
      {
        $project: {
          date: "$_id",
          count: 1,
          _id: 0
        }
      }
    ]);

    // Get overall statistics
    const totalLogs = moodLogs.length;
    const overallAverage = moodLogs.reduce((acc, log) => acc + log.mood, 0) / totalLogs;
    const activeUsers = await MoodLog.distinct('userId', dateFilter).length;

    res.json({
      dailyAverages,
      moodDistribution,
      userActivity,
      totalLogs,
      overallAverage,
      activeUsers
    });

  } catch (error) {
    console.error('Error fetching mood analytics:', error);
    res.status(500).json({ error: 'Failed to fetch mood analytics' });
  }
});

// Send manual email notification to user
router.post('/send-notification', isAdmin, async (req, res) => {
  try {
    const { userId, subject, message } = req.body;
    
    // Find user email
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create transporter instance
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: user.email,
      subject: subject,
      text: message,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    
    res.json({ message: 'Notification sent successfully' });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ error: 'Failed to send notification' });
  }
});

module.exports = router; 