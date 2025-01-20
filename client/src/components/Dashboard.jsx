import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MoodLogger from "../components/MoodLogger";
import MoodChart from "../components/MoodChart";
import DepressionPrediction from "../components/DepressionPrediction";
import Notifications from "../components/Notifications";
import Recommendations from "../components/Recommendations";
import QuickStats from "../components/QuickStats";
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
        const response = await axios.get(
          `http://localhost:5000/api/mood/${parsedUser._id}`
        );
        setMoodData(response.data);
      } catch (error) {
        console.error("Failed to fetch mood data:", error);
      }
    };

    fetchMoodData();
  }, [navigate]);

  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-layout">
        <Sidebar username={username} />
        <main className="dashboard-content">
          <div className="dashboard-header">
            <h1>Welcome, {username}</h1>
          </div>

          {/* Quick Stats Section */}
          <QuickStats moodData={moodData} />

          {/* Main Sections */}
          <div className="dashboard-sections">
            {/* Mood Logger */}
            <section className="dashboard-card">
              <h2>Log Your Mood</h2>
              <MoodLogger />
            </section>

            {/* Mood Trends */}
            <section className="dashboard-card">
              <h2>Mood Trends</h2>
              <MoodChart data={moodData} />
            </section>

            {/* Depression Prediction */}
            <section className="dashboard-card">
              <h2>Depression Risk Predictor</h2>
              <DepressionPrediction />
            </section>
          </div>

          {/* Recommendations & Notifications */}
          <div className="dashboard-sections">
            <section className="dashboard-card">
              <h2>Daily Recommendations</h2>
              <Recommendations />
            </section>
            <section className="dashboard-card">
              <h2>Notifications</h2>
              <Notifications />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
