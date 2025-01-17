import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Redirect after login
import Navbar from "../Navbar";
import './auth.css'; // Optional for custom styling

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  // Update form data as user types
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call to backend login route
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);

      // Save user session to localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setMessage('Login successful!');
      console.log(localStorage.getItem('user')); // Should contain logged-in user data
      setIsSuccess(true);
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (error) {
      // Display error message
      setMessage(error.response?.data.message || 'Login failed! Please try again.');
      setIsSuccess(false);
    }
  };

  // JSX for the Login component
  return (
    <div>
      <Navbar />
      <div className="auth-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Login</button>
        </form>
        {message && <p className={`auth-message ${isSuccess ? 'success' : 'error'}`}>{message}</p>}
        <p>
          Not registered? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
