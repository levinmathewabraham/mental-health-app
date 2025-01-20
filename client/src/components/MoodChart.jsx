import React, { useEffect, useState} from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';

ChartJS.register( LineElement, PointElement, LinearScale, Title,Tooltip, Legend, CategoryScale );

function MoodChart({ data }) {
  const [correlations, setCorrelations] = useState({});
  const userId = JSON.parse(localStorage.getItem("user"))._id;

  useEffect(() => {
    const fetchCorrelations = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/mood/correlation/${userId}`);
        setCorrelations(response.data);
      } catch (error) {
        console.error("Error fetching correlations:", error);
      }
    };

    fetchCorrelations();
  }, [userId]);
  
  // Calculate summary statistics
  const averageMood = (
    data.reduce((acc, log) => acc + log.mood, 0) / data.length
  ).toFixed(1);
  const averageEnergy = (
    data.reduce((acc, log) => acc + log.energy, 0) / data.length
  ).toFixed(1);
  const averageStress = (
    data.reduce((acc, log) => acc + log.stress, 0) / data.length
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
      {
        label: 'Energy Levels Over Time',
        data: data.map((log) => log.energy),
        fill: false,
        borderColor: '#FFC107',
        tension: 0.1,
      },
      {
        label: 'Stress Levels Over Time',
        data: data.map((log) => log.stress),
        fill: false,
        borderColor: '#F44336',
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
          <strong>Average Energy: </strong>{averageEnergy}
        </p>
        <p>
          <strong>Average Stress: </strong>{averageStress}
        </p>
        <p>
          <strong>Most Frequent Mood: </strong>
          {mostFrequentMood}
        </p>
        <p>
          <strong>Total Entries Logged: </strong>
          {data.length}
        </p>
        <h3>Correlations</h3>
        <p><strong>Mood & Stress: </strong>{correlations.moodStressCorrelation?.toFixed(2)}</p>
        <p><strong>Mood & Energy: </strong>{correlations.moodEnergyCorrelation?.toFixed(2)}</p>
        <p><strong>Energy & Stress: </strong>{correlations.stressEnergyCorrelation?.toFixed(2)}</p>
      </div>

      {/* Render the Line Chart */}
      <Line data={chartData} />
    </div>
  );
}

export default MoodChart;
