import React, { useState } from 'react';
import axios from 'axios';
import "./StudyLifestyleRecommendations.css";

const StudyLifestyleRecommendations = ({ userData }) => {
  const [recommendations, setRecommendations] = useState([]);

  const fetchRecommendations = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/recommendations/generate', userData);
      setRecommendations(response.data.recommendations);
    } catch (err) {
      console.error('Failed to fetch recommendations:', err);
    }
  };

  return (
    <div className="recommendations">
      <h3>Personalized Study and Lifestyle Recommendations</h3>
      <button onClick={fetchRecommendations}>Get Recommendations</button>
      <ul>
        {recommendations.map((rec, index) => (
          <li key={index}>{rec}</li>
        ))}
      </ul>
    </div>
  );
};

export default StudyLifestyleRecommendations;
