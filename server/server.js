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

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: CLIENT_URL, // React frontend origin
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',                    // Local development
    'https://your-frontend-app.onrender.com',   // Replace with your actual frontend Render URL
    CLIENT_URL                                  // From config
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Make sure this comes BEFORE your route definitions
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

// Predict Route
app.post('/predict', async (req, res) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/predict', req.body);
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
    subject: 'MoodSync',
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

// Schedule the email to send daily at a specified time (e.g., 9 AM)
cron.schedule('0 9 * * *', async () => {
  try {
    const users = await User.find(); // Fetch all users from the database

    users.forEach(async (user) => {
      const notifications = await Notification.find({ userId: user._id, isRead: false });
      const message = 'Reminder: Log your mood today!';

      sendNotificationEmail(user.email, message); // Send email to the user
    });
  } catch (error) {
    console.error('Error scheduling emails:', error);
  }
});

//Real-time notifications
io.on('connection', (socket) => {
  console.log('New client connected');
  io.emit("notification", "Hope you have a great day!");

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
