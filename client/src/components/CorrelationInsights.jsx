import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CorrelationInsights.css"; // Optional: Add custom styles here

const CorrelationInsights = ({ userId }) => {
  const [correlations, setCorrelations] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCorrelations = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/mood/correlation/${userId}`);
        setCorrelations(response.data);
      } catch (err) {
        setError("Failed to fetch correlation data.");
      }
    };

    fetchCorrelations();
  }, [userId]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!correlations) {
    return <div>Loading...</div>;
  }

  return (
    <div className="correlation-insights">
      <h3>Correlation Insights</h3>
      <ul>
        <li>
          <strong>Mood-Stress Correlation:</strong>{" "}
          {correlations.moodStressCorrelation.toFixed(2)}
        </li>
        <li>
          <strong>Mood-Energy Correlation:</strong>{" "}
          {correlations.moodEnergyCorrelation.toFixed(2)}
        </li>
        <li>
          <strong>Stress-Energy Correlation:</strong>{" "}
          {correlations.stressEnergyCorrelation.toFixed(2)}
        </li>
      </ul>
    </div>
  );
};

export default CorrelationInsights;
