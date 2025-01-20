require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const User = require('./models/User'); // Ensure User model is available
const authRoutes = require('./routes/auth');
const moodRoutes = require('./routes/mood');
const recommendationRoutes = require('./routes/recommendation');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const Notification = require('./models/Notification');

const app = express();
const port = 5000;

// Create HTTP server for Socket.IO
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // React frontend origin
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection failed:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/mood', moodRoutes);

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

app.get('/api/notifications/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ userId, isRead: false });
    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).send('Failed to fetch notifications.');
  }
});

//Real-time notifications
io.on('connection', (socket) => {
  console.log('New client connected');

  io.emit("notification", "This is a test notification from the backend!");

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.use('/api/recommendations', recommendationRoutes);

// Start the server
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
