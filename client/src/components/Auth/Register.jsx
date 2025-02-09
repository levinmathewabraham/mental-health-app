import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../Navbar";
import './auth.css';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ 
        username: '', 
        email: '', 
        password: '',
        adminCode: '' 
    });
    const [showAdminField, setShowAdminField] = useState(false);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Only include adminCode if admin registration is selected
            const dataToSend = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                ...(showAdminField && { adminCode: formData.adminCode })
            };

            console.log('Sending registration data:', dataToSend); // Debug log

            await axios.post('http://localhost:5000/api/auth/register', dataToSend);
            setMessage('Registration successful! Please log in.');
            setIsSuccess(true);
            
            // Redirect to login page after successful registration
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            console.error('Registration error:', error.response?.data); // Debug log
            setMessage(error.response?.data?.error || 'Registration failed!');
            setIsSuccess(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="auth-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                    <div className="admin-toggle">
                        <label>
                            <input
                                type="checkbox"
                                checked={showAdminField}
                                onChange={() => {
                                    setShowAdminField(!showAdminField);
                                    if (!showAdminField) {
                                        setFormData(prev => ({ ...prev, adminCode: '' }));
                                    }
                                }}
                            />
                            Register as Admin
                        </label>
                    </div>
                    {showAdminField && (
                        <input
                            type="password"
                            name="adminCode"
                            placeholder="Admin Code"
                            value={formData.adminCode}
                            onChange={handleInputChange}
                            required={showAdminField}
                        />
                    )}
                    <button type="submit">Register</button>
                </form>
                {message && (
                    <p className={`auth-message ${isSuccess ? 'success' : 'error'}`}>
                        {message}
                    </p>
                )}
                <p>
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
