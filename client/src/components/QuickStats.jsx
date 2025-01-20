import React from "react";
import "./QuickStats.css";

const QuickStats = ({ moodData }) => {
  // Basic stats
  const averageMood = moodData.reduce((sum, mood) => sum + mood.rating, 0) / moodData.length || 0;
  const moodCount = moodData.length;

  return (
    <div className="quick-stats">
      <div className="stats-card">
        <h3>Average Mood</h3>
        <p>{averageMood.toFixed(1)} / 5</p>
      </div>
      <div className="stats-card">
        <h3>Mood Logs</h3>
        <p>{moodCount}</p>
      </div>
    </div>
  );
};

export default QuickStats;
