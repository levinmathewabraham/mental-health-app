import React, { useState, useEffect } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import axios from 'axios';
import './MoodAnalytics.css';
import { API_BASE_URL } from '../../config';  // adjust the path as needed

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const MoodAnalytics = () => {
  const [moodData, setMoodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('week'); // week, month, year

  useEffect(() => {
    const fetchMoodData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await axios.get(`${API_BASE_URL}/api/admin/mood-analytics`, {
          headers: { userId: user._id },
          params: { timeRange }
        });
        setMoodData(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch mood analytics');
        setLoading(false);
      }
    };

    fetchMoodData();
  }, [timeRange]);

  if (loading) return <div>Loading analytics...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!moodData) return <div>No data available</div>;

  const averageMoodChart = {
    labels: moodData?.dailyAverages?.map(d => d.date) || [],
    datasets: [{
      label: 'Average Mood',
      data: moodData?.dailyAverages?.map(d => d.average) || [],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  const moodDistributionChart = {
    labels: ['Sad', 'Neutral', 'Happy'],
    datasets: [{
      data: moodData?.moodDistribution || [],
      backgroundColor: [
        '#FF6384',
        '#FFCD56',
        '#4BC0C0'
      ]
    }]
  };

  const userActivityChart = {
    labels: moodData?.userActivity?.map(d => d.date) || [],
    datasets: [{
      label: 'Number of Mood Logs',
      data: moodData?.userActivity?.map(d => d.count) || [],
      backgroundColor: 'rgba(54, 162, 235, 0.5)'
    }]
  };

  const stats = {
    totalLogs: moodData?.totalLogs || 0,
    overallAverage: (moodData?.overallAverage || 0).toFixed(2),
    activeUsers: moodData?.activeUsers || 0
  };

  return (
    <div className="mood-analytics">
      <div className="analytics-header">
        <h2>Mood Analytics Dashboard</h2>
        <div className="time-range-selector">
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="chart-card">
          <h3>Average Mood Trends</h3>
          <Line 
            data={averageMoodChart}
            options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  max: 3,
                  ticks: {
                    stepSize: 0.5
                  }
                }
              }
            }}
          />
        </div>

        <div className="chart-card">
          <h3>Mood Distribution</h3>
          <Doughnut 
            data={moodDistributionChart}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom'
                },
                tooltip: {
                  callbacks: {
                    label: function(context) {
                      const label = context.label || '';
                      const value = context.raw || 0;
                      return `${label}: ${value} logs`;
                    }
                  }
                }
              }
            }}
          />
        </div>

        <div className="chart-card">
          <h3>User Activity</h3>
          <Bar 
            data={userActivityChart}
            options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }}
          />
        </div>

        <div className="stats-summary">
          <div className="stat-item">
            <h4>Total Logs</h4>
            <p>{stats.totalLogs}</p>
          </div>
          <div className="stat-item">
            <h4>Average Mood</h4>
            <p>{stats.overallAverage}</p>
          </div>
          <div className="stat-item">
            <h4>Active Users</h4>
            <p>{stats.activeUsers}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodAnalytics; 