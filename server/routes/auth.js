const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
  const { username, email, password, adminCode } = req.body;

  // Check if required fields are present
  if (!username || !email || !password) {
    console.error("Missing fields in the request body.");
    return res.status(400).json({ error: 'Please provide all required fields.' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Verify admin code if provided
    let isAdmin = false;
    if (adminCode && adminCode.trim() === process.env.ADMIN_SECRET_CODE.trim()) {
      isAdmin = true;
      console.log("Admin code verified successfully"); // Debug log
    }

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin
    });

    await newUser.save();
    console.log("User saved with admin status:", isAdmin); // Debug log
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: 'Registration failed' });
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
