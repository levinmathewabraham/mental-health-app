require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const http = require('http');
const { Server } = require('socket.io');
const authRoutes = require('./routes/auth');
const moodRoutes = require('./routes/mood');
const Notification = require('./models/Notification');
const User = require('./models/User'); // Ensure User model is available
const recommendationRoutes = require('./routes/recommendation');

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

app.get('/api/notifications', async (req, res) => {
  try {
      const notifications = await Notification.find({ userId: req.user._id });
      res.json(notifications);
  } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).send('Failed to fetch notifications.');
  }
});

// Real-Time Notification Logic
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Handle custom notification events here (if needed)
  socket.on('sendNotification', (data) => {
    console.log('Received notification event:', data);
  });

  // Cleanup on disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

app.use('/api/recommendations', recommendationRoutes);

// Scheduled Daily Reminders with Notifications
cron.schedule('0 8 * * *', async () => {
  try {
    const notifications = await Notification.find({ time: { $lte: new Date() } });
    notifications.forEach(async (notification) => {
      await sendNotification(notification.userId, notification.message);
      io.emit('notification', notification.message); // Send notification in real-time
    });
  } catch (error) {
    console.error('Error during scheduled notifications:', error);
  }
});

// Function to send email notifications
const sendNotification = async (userId, message) => {
  const user = await User.findById(userId);
  if (user && user.email) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your_email@gmail.com',
        pass: 'your_email_password',
      },
    });

    const mailOptions = {
      from: 'your_email@gmail.com',
      to: user.email,
      subject: 'MoodSync Reminder',
      text: message,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${user.email}: ${message}`);
  } else {
    console.log(`User with ID ${userId} does not have a valid email.`);
  }
};

// Start the server
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
