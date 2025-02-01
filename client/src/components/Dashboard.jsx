import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MoodLogger from "../components/MoodLogger";
import MoodChart from "../components/MoodChart";
import Notifications from "../components/Notifications";
import RealTimeNotification from "../components/RealTimeNotification";
import QuickStats from "../components/QuickStats";
import CorrelationInsights from "./CorrelationInsights";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [moodData, setMoodData] = useState([]);
  const [username, setUsername] = useState("");
  const [correlations, setCorrelations] = useState(null);

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

        // Fetch correlations
        const correlationsResponse = await axios.get(
          `http://localhost:5000/api/mood/correlation/${parsedUser._id}`
        );
        setCorrelations(correlationsResponse.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchMoodData();
  }, [navigate]);

  return (
    <div className="dashboard">
      <Navbar />
      <RealTimeNotification />
      <div className="dashboard-layout">
        <Sidebar username={username} />
        <main className="dashboard-content">
          <div className="dashboard-header">
            <h1>Welcome, {username}</h1>
            <div className="quick-actions">
              <button 
                onClick={() => navigate('/depression-assessment')} 
                className="assessment-btn"
              >
                <i className="fas fa-brain"></i>
                Take Depression Risk Assessment
              </button>
            </div>
          </div>

          <div className="dashboard-sections">
            {/* Quick Stats Section */}
            <section className="dashboard-card">
              <h2>Overview</h2>
              <QuickStats 
                moodData={moodData} 
                correlations={correlations}
              />
            </section>

            {/* Mood Logger */}
            <section className="dashboard-card">
              <h2>Log Your Mood</h2>
              <MoodLogger />
            </section>

            {/* Mood Trends */}
            <section className="dashboard-card">
              <h2>Mood Trends</h2>
              <div className="chart-container">
                <MoodChart data={moodData} hideCorrelations={true} />
              </div>
            </section>

            {/* Correlations Card */}
            <section className="dashboard-card correlations-card">
              <h2>Pattern Analysis</h2>
              <CorrelationInsights correlations={correlations} />
            </section>

            {/* Notifications */}
            <section className="dashboard-card">
              <h2>Notifications</h2>
              <Notifications limit={5} />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
