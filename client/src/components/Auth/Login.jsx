import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Redirect after login
import Navbar from "../Navbar";
import './auth.css'; // Optional for custom styling
import { API_BASE_URL } from '../../config';

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
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`, 
        { email: formData.email, password: formData.password },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );
      
      // Save user data to localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setMessage('Login successful!');
      setIsSuccess(true);
      
      console.log('User data:', response.data.user); // Debug log
      
      // Check if user is admin and redirect accordingly
      if (response.data.user.isAdmin === true) {
        console.log('Redirecting to admin dashboard'); // Debug log
        navigate('/admin');
      } else {
        console.log('Redirecting to user dashboard'); // Debug log
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage(error.response?.data?.message || 'An error occurred during login');
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
