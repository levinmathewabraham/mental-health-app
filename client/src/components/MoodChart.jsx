import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale, // For 'category' scale
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale // Register 'category' scale
);

function MoodChart({ data }) {
  // Calculate summary statistics
  const averageMood = (
    data.reduce((acc, log) => acc + log.mood, 0) / data.length
  ).toFixed(1);

  const moodFrequency = data.reduce((acc, log) => {
    acc[log.mood] = (acc[log.mood] || 0) + 1;
    return acc;
  }, {});

  const mostFrequentMood = Object.entries(moodFrequency).reduce(
    (a, b) => (b[1] > a[1] ? b : a),
    ['', 0]
  )[0];

  const chartData = {
    labels: data.map((log) => new Date(log.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Mood Over Time',
        data: data.map((log) => log.mood),
        fill: false,
        borderColor: '#4CAF50',
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      {/* Add Summary Section */}
      <div className="summary">
        <h3>Summary</h3>
        <p>
          <strong>Average Mood: </strong>
          {averageMood}
        </p>
        <p>
          <strong>Most Frequent Mood: </strong>
          {mostFrequentMood}
        </p>
        <p>
          <strong>Total Entries Logged: </strong>
          {data.length}
        </p>
      </div>

      {/* Render the Line Chart */}
      <Line data={chartData} />
    </div>
  );
}

export default MoodChart;
