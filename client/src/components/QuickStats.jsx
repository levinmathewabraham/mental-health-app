import React from 'react';
import { FaSmile, FaChartLine, FaCalendar, FaCheckCircle } from 'react-icons/fa';
import './QuickStats.css';

const QuickStats = ({ moodData, correlations }) => {
  // Calculate statistics
  const calculateStats = () => {
    if (!moodData || moodData.length === 0) {
      return {
        averageMood: 0,
        totalEntries: 0,
        streak: 0,
        recentTrend: 'neutral'
      };
    }

    const average = moodData.reduce((acc, entry) => acc + entry.mood, 0) / moodData.length;
    
    // Calculate streak
    let streak = 0;
    const today = new Date().setHours(0, 0, 0, 0);
    const sortedData = [...moodData].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    for (let i = 0; i < sortedData.length; i++) {
      const entryDate = new Date(sortedData[i].date).setHours(0, 0, 0, 0);
      const expectedDate = new Date(today - (i * 24 * 60 * 60 * 1000));
      if (entryDate === expectedDate.setHours(0, 0, 0, 0)) {
        streak++;
      } else break;
    }

    // Calculate trend
    const recentEntries = sortedData.slice(0, 7);
    const trend = recentEntries.length > 1 
      ? recentEntries[0].mood > recentEntries[recentEntries.length - 1].mood
        ? 'improving'
        : 'declining'
      : 'neutral';

    return {
      averageMood: average.toFixed(1),
      totalEntries: moodData.length,
      streak,
      recentTrend: trend
    };
  };

  const stats = calculateStats();

  return (
    <div className="quick-stats-grid">
      <div className="stat-card average-mood">
        <div className="stat-icon">
          <FaSmile />
        </div>
        <div className="stat-info">
          <h3>Average Mood</h3>
          <p className="stat-value">{stats.averageMood}</p>
          <p className="stat-description">Your overall mood average</p>
        </div>
      </div>

      <div className="stat-card total-entries">
        <div className="stat-icon">
          <FaCalendar />
        </div>
        <div className="stat-info">
          <h3>Total Entries</h3>
          <p className="stat-value">{stats.totalEntries}</p>
          <p className="stat-description">Mood logs recorded</p>
        </div>
      </div>

      <div className="stat-card streak">
        <div className="stat-icon">
          <FaCheckCircle />
        </div>
        <div className="stat-info">
          <h3>Current Streak</h3>
          <p className="stat-value">{stats.streak} days</p>
          <p className="stat-description">Keep the momentum going!</p>
        </div>
      </div>

      <div className="stat-card trend">
        <div className="stat-icon">
          <FaChartLine />
        </div>
        <div className="stat-info">
          <h3>Recent Trend</h3>
          <p className={`stat-value trend-${stats.recentTrend}`}>
            {stats.recentTrend.charAt(0).toUpperCase() + stats.recentTrend.slice(1)}
          </p>
          <p className="stat-description">Based on last 7 days</p>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;
