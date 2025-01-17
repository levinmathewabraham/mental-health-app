import React from 'react';

function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user session
    window.location.href = '/login'; // Redirect to login page
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;
