import React, { useState, useEffect } from 'react';
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
    const [showAdminOption, setShowAdminOption] = useState(false);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [keySequence, setKeySequence] = useState([]);
    const [showHint, setShowHint] = useState(false);

    // Secret key combination: 'admin' (press these letters in sequence)
    const SECRET_CODE = 'admin';
    
    useEffect(() => {
        const handleKeyPress = (e) => {
            const newSequence = [...keySequence, e.key].slice(-5);
            setKeySequence(newSequence);
            
            if (newSequence.join('') === SECRET_CODE) {
                setShowAdminOption(true);
                // Add animation class to form
                document.querySelector('.auth-container').classList.add('unlock-animation');
                // Remove animation class after animation completes
                setTimeout(() => {
                    document.querySelector('.auth-container').classList.remove('unlock-animation');
                }, 1000);
            }
        };

        window.addEventListener('keypress', handleKeyPress);
        return () => window.removeEventListener('keypress', handleKeyPress);
    }, [keySequence]);

    // Show hint after 30 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowHint(true);
        }, 30000);
        return () => clearTimeout(timer);
    }, []);

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
            const dataToSend = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                ...(showAdminField && { adminCode: formData.adminCode })
            };

            await axios.post('http://localhost:5000/api/auth/register', dataToSend);
            setMessage('Registration successful! Please log in.');
            setIsSuccess(true);
            
            // Add success animation
            document.querySelector('.auth-container').classList.add('success-animation');
            
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            setMessage(error.response?.data?.error || 'Registration failed!');
            setIsSuccess(false);
            // Add error shake animation
            document.querySelector('.auth-container').classList.add('error-animation');
            setTimeout(() => {
                document.querySelector('.auth-container').classList.remove('error-animation');
            }, 500);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="auth-container">
                <h1>Register</h1>
                {showHint && !showAdminOption && (
                    <div className="hint-text">
                        Hint: Type the word that grants special access...
                    </div>
                )}
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
                    
                    {showAdminOption && (
                        <div className="admin-toggle fade-in">
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
                                <span className="admin-label">Register as Admin</span>
                            </label>
                        </div>
                    )}
                    
                    {showAdminField && (
                        <input
                            type="password"
                            name="adminCode"
                            placeholder="Admin Code"
                            value={formData.adminCode}
                            onChange={handleInputChange}
                            required={showAdminField}
                            className="fade-in"
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
