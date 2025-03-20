require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const http = require('http');
const { Server } = require('socket.io');
const User = require('./models/User'); // Ensure User model is available
const authRoutes = require('./routes/auth');
const moodRoutes = require('./routes/mood');
const adminRoutes = require('./routes/admin');
const { PORT, CLIENT_URL } = require('./config');

const app = express();

// Create HTTP server for Socket.IO
const server = http.createServer(app);

// Configure CORS for both REST and Socket.IO
app.use(cors({
  origin: '*',
  credentials: true
}));

// Configure Socket.IO
const io = new Server(server, {
  cors: {
    origin: [ 'http://localhost:3000', CLIENT_URL ],
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection failed:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/mood', moodRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('Server connected successfully!');
});

const FLASK_API_URL =
  process.env.NODE_ENV === "production"
    ? "https://mental-health-app-hwsv.onrender.com"
    : "http://127.0.0.1:5000";

// Predict Route
app.post('/predict', async (req, res) => {
  try {
    const response = await axios.post(`${FLASK_API_URL}/predict`, req.body);
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// SMTP configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER, // Your email
    pass: process.env.SMTP_PASSWORD, // Your email password or app-specific password
  },
});

// Test route to send a test email
app.get('/test-email', async (req, res) => {
  try {
    const testEmail = process.env.SMTP_USER;
    const testMessage = 'This is a test email from the SMTP setup.';

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: testEmail,
      subject: 'SMTP Email Test',
      text: testMessage,
    };

    await transporter.sendMail(mailOptions);
    res.send('Test email sent successfully!');
  } catch (error) {
    console.error('Error sending test email:', error);
    res.status(500).send('Failed to send test email.');
  }
});

// Function to send an email
const sendNotificationEmail = (email, message) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'MoodSync – Test Email',
    text: message,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error sending email:', err);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

// Schedule the email to send daily at a specified time
cron.schedule('0 9 * * *', async () => {
  try {
    const users = await User.find();
    
    for (const user of users) {
      try {
        const testEmail = `
Hi ${user.username},

This is a test email for my main project called MoodSync. It is a web-based application designed to help students monitor and improve their mental well-being.

NO ACTION IS REQUIRED FROM YOUR SIDE. 

If this email was sent to you by mistake, or if you are not familiar with this system, I sincerely apologize. Please reply to this email requesting removal, and I will ensure that your email is removed from this system.

Thank you for your understanding.

- Levin Mathew Abraham
BCA (2022 - 2025)
        `;

        await sendNotificationEmail(user.email, testEmail);
        console.log(`Emails sent to ${user.email}`);
      } catch (userError) {
        console.error(`Error sending email to user ${user.email}:`, userError);
        // Continue with next user even if one fails
      }
    }
  } catch (error) {
    console.error('Error in email scheduling task:', error);
  }
});

// Array of motivational and wellness messages
const wellnessMessages = [
  "Remember to take a deep breath and stay present.",
  "Drinking water can improve your mood and energy levels!",
  "Take a moment to stretch and relax your muscles.",
  "Have you logged your mood today? It helps track your mental health journey.",
  "A short walk can boost your creativity and mood.",
  "Remember to practice gratitude - what are three things you're thankful for today?",
  "Mindfulness tip: Focus on one task at a time for better mental clarity.",
  "Self-care reminder: It's okay to take breaks when you need them.",
  "Social connections boost mental health. Consider reaching out to a friend today.",
  "Sleep is crucial for mental health. Aim for 7-9 hours tonight!",
  "Healthy eating tip: Include colorful fruits and vegetables in your next meal.",
  "Positive affirmation: You are capable and strong, even on difficult days.",
  "Try the 5-4-3-2-1 grounding technique if you're feeling anxious.",
  "Remember that your feelings are valid, whatever they may be today."
];

// Function to send a random notification
const sendRandomNotification = () => {
  const randomIndex = Math.floor(Math.random() * wellnessMessages.length);
  const message = wellnessMessages[randomIndex];
  const notificationId = Date.now();
  
  io.emit('notification', {
    id: notificationId,
    message: message
  });
  
  console.log(`Sent notification: ${message}`);
};

// Send a notification every 10 minutes (adjust as needed)
setInterval(sendRandomNotification, 10 * 60 * 1000);

// Also send one notification shortly after server start
setTimeout(sendRandomNotification, 10 * 1000);

// Add a route to manually trigger a notification (useful for testing)
app.post('/api/send-notification', (req, res) => {
  try {
    sendRandomNotification();
    res.status(200).json({ success: true, message: 'Notification sent successfully' });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ success: false, message: 'Failed to send notification' });
  }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  // Add error handling
  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });
});

// Make io accessible to your routes
app.set('io', io);

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
