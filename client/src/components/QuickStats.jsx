import React from "react";
import "./QuickStats.css";

const QuickStats = ({ moodData }) => {
  const calculateStats = () => {
    if (!moodData || moodData.length === 0) {
      return {
        averageMood: 0,
        lastMood: 0,
        totalEntries: 0,
        streakDays: 0
      };
    }

    const sortedData = [...moodData].sort((a, b) => new Date(b.date) - new Date(a.date));
    const moodValues = moodData.map(entry => entry.mood);
    const averageMood = moodValues.reduce((acc, val) => acc + val, 0) / moodValues.length;
    
    // Calculate streak
    let streak = 1;
    let currentDate = new Date(sortedData[0].date);
    
    for (let i = 1; i < sortedData.length; i++) {
      const prevDate = new Date(sortedData[i].date);
      const diffDays = Math.floor((currentDate - prevDate) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        streak++;
        currentDate = prevDate;
      } else {
        break;
      }
    }

    return {
      averageMood: averageMood.toFixed(1),
      lastMood: sortedData[0].mood,
      totalEntries: moodData.length,
      streakDays: streak
    };
  };

  const stats = calculateStats();

  return (
    <div className="quick-stats">
      <div className="stat-item">
        <h3>Average Mood</h3>
        <div className="stat-value">{stats.averageMood}</div>
        <p>out of 10</p>
      </div>
      
      <div className="stat-item">
        <h3>Latest Mood</h3>
        <div className="stat-value">{stats.lastMood}</div>
        <p>your last entry</p>
      </div>
      
      <div className="stat-item">
        <h3>Total Entries</h3>
        <div className="stat-value">{stats.totalEntries}</div>
        <p>logs recorded</p>
      </div>
      
      <div className="stat-item">
        <h3>Current Streak</h3>
        <div className="stat-value">{stats.streakDays}</div>
        <p>days in a row</p>
      </div>
    </div>
  );
};

export default QuickStats;
