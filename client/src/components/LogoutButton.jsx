import React from 'react';
import './LogoutButton.css';

function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user session
    window.location.href = '/login'; // Redirect to login page
  };

  return <button className='logout-btn' onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;
