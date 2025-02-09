import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import './AdminDashboard.css';
import MoodAnalytics from './MoodAnalytics';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalMoodLogs: 0,
    highRiskUsers: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <AdminNavbar />
      <div className="admin-dashboard">
        <h1>Admin Dashboard</h1>
        
        <div className="stats-cards">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p>{stats.totalUsers}</p>
          </div>
          <div className="stat-card">
            <h3>Total Mood Logs</h3>
            <p>{stats.totalMoodLogs}</p>
          </div>
          <div className="stat-card">
            <h3>High Risk Users</h3>
            <p>{stats.highRiskUsers}</p>
          </div>
        </div>

        <MoodAnalytics />

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
                      disabled={user.isAdmin} // Prevent deleting admin users
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 