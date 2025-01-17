// Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, Outlet, Route, Routes } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import DepressionPredictor from "./DepressionPredictor";
import MoodLogger from "../components/MoodLogger";
import MoodChart from "../components/MoodChart";
import StudyLifestyleRecommendations from "./StudyLifestyleRecommendations";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [moodData, setMoodData] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(user);
    setUsername(parsedUser.username);

    const fetchMoodData = async () => {
      try {
        const userId = parsedUser._id;
        const response = await axios.get(`http://localhost:5000/api/mood/${userId}`);
        setMoodData(response.data);
      } catch (error) {
        console.error("Failed to fetch mood data:", error);
      }
    };

    fetchMoodData();
  }, [navigate]);

  const userData = {
    sleep_duration: 5,
    work_study_hours: 3,
    academic_pressure: 8,
    depression_risk: "High",
  };

  return (
    <div className="dashboard">
      <Navbar />
      <main>
        <h1>Welcome to MoodSync Dashboard</h1>
        <p>Hello, {username}! Here's your latest mood data and insights.</p>
        <Outlet />
        <Routes>
          <Route path="/dashboard/predictor" element={<DepressionPredictor />} />
          {/* Add more routes as needed */}
        </Routes>
        <StudyLifestyleRecommendations userData={userData} />
        <div className="mood-logger-section">
          <MoodLogger />
        </div>
        <div className="mood-chart-section">
          <h2>Your Mood Trends</h2>
          <MoodChart data={moodData} />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
