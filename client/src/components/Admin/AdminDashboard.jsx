import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import './AdminDashboard.css';
import MoodAnalytics from './MoodAnalytics';
import AdminSidebar from './AdminSidebar';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalMoodLogs: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [activeSection, setActiveSection] = useState('dashboard');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.isAdmin) {
      navigate('/login');
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('user'));
      
      // Fetch users
      const usersResponse = await axios.get('http://localhost:5000/api/admin/users', {
        headers: { userId: user._id }
      });
      setUsers(usersResponse.data);
      
      // Fetch stats
      const statsResponse = await axios.get('http://localhost:5000/api/admin/stats', {
        headers: { userId: user._id }
      });
      setStats(statsResponse.data);
      
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
          headers: { userId: user._id }
        });
        fetchData(); // Refresh the data
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user. Please try again.');
      }
    }
  };

  const handleSendNotification = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      await axios.post('http://localhost:5000/api/admin/send-notification', {
        userId: selectedUser,
        subject: emailSubject,
        message: emailMessage
      }, {
        headers: { userId: user._id }
      });
      
      // Reset form
      setSelectedUser('');
      setEmailSubject('');
      setEmailMessage('');
      
      alert('Notification sent successfully!');
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Failed to send notification. Please try again.');
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'users':
        return (
          <div className="users-section">
            <h2>User Management</h2>
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Join Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDeleteUser(user._id)}
                        disabled={user.isAdmin}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'notifications':
        return (
          <div className="notification-section">
            <h2>Send Notification</h2>
            <form onSubmit={handleSendNotification} className="notification-form">
              <div className="form-group">
                <label>Select User:</label>
                <select 
                  value={selectedUser} 
                  onChange={(e) => setSelectedUser(e.target.value)}
                  required
                >
                  <option value="">Select a user</option>
                  {users.map(user => (
                    <option key={user._id} value={user._id}>
                      {user.username} ({user.email})
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Subject:</label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Message:</label>
                <textarea
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                  required
                  rows="4"
                />
              </div>
              <button type="submit" className="send-btn">Send Notification</button>
            </form>
          </div>
        );

      default:
        return (
          <>
            <div className="stats-cards">
              <div className="stat-card">
                <h3>Total Users</h3>
                <p>{stats.totalUsers}</p>
              </div>
              <div className="stat-card">
                <h3>Total Mood Logs</h3>
                <p>{stats.totalMoodLogs}</p>
              </div>
            </div>
            <MoodAnalytics />
          </>
        );
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <AdminNavbar />
      <div className="admin-dashboard-container">
        <AdminSidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
        />
        <div className="admin-dashboard-content">
          <h1>Admin Dashboard</h1>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 