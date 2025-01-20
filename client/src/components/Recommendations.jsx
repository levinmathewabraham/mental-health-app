import React, { useEffect, useState } from "react";
import axios from "axios";

function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user"))._id;

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/recommendations/generate", {
          userId,
        });
        setRecommendations(response.data.recommendations);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendations();
  }, [userId]);

  return (
    <div>
      <h3>Personalized Recommendations</h3>
      <ul>
        {recommendations.map((recommendation, idx) => (
          <li key={idx}>{recommendation}</li>
        ))}
      </ul>
    </div>
  );
}

export default Recommendations;
