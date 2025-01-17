const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  console.log("Incoming registration request:", req.body); // Debug log for incoming payload

  // Check if required fields are present
  if (!username || !email || !password) {
    console.error("Missing fields in the request body.");
    return res.status(400).json({ error: 'Please provide all required fields.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed successfully."); // Debug log for hashing step

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    console.log("Prepared newUser object:", newUser); // Debug log for User object
    
    await newUser.save();
    console.log("User saved to MongoDB."); // Debug log for successful save

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    console.error("Error during user registration:", err.message); // Log error details
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Email already exists.' }); // Handle duplicate email
    }
    res.status(500).json({ error: 'Registration failed.' });
  }
});

// Login User
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide both email and password.' });
    }
  
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
          return res.status(400).json({ error: 'Invalid credentials' });
        }
        res.json({ message: 'Login successful', user });
      } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
      }
});

module.exports = router;
