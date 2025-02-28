import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaBrain, FaCalendarCheck, FaChartLine, FaLightbulb } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MoodLogger from "../components/MoodLogger";
import MoodChart from "../components/MoodChart";
import RealTimeNotification from "../components/RealTimeNotification";
import QuickStats from "../components/QuickStats";
import CorrelationInsights from "./CorrelationInsights";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [moodData, setMoodData] = useState([]);
  const [username, setUsername] = useState("");
  const [correlations, setCorrelations] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(user);
    setUsername(parsedUser.username);

    const fetchMoodData = async () => {
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchMoodData();
  }, [navigate]);

  const refreshData = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/mood/${user._id}`
      );
      setMoodData(response.data);
    } catch (error) {
      console.error("Failed to refresh data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <Navbar />
      <RealTimeNotification />
      <div className="dashboard-layout">
        <Sidebar username={username} activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="dashboard-content">
          <div className="dashboard-header">
            <div className="welcome-section">
              <h1>Welcome back, {username}</h1>
              <p className="date-display">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <div className="quick-actions">
              <button 
                onClick={() => navigate('/depression-assessment')} 
                className="assessment-btn"
              >
                <FaBrain />
                Take Depression Risk Assessment
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading your wellness data...</p>
            </div>
          ) : (
            <div className="dashboard-tabs">
              <div className="tab-navigation">
                <button 
                  className={`tab-button ${activeTab === "overview" ? "active" : ""}`}
                  onClick={() => setActiveTab("overview")}
                >
                  <FaChartLine /> Overview
                </button>
                <button 
                  className={`tab-button ${activeTab === "log" ? "active" : ""}`}
                  onClick={() => setActiveTab("log")}
                >
                  <FaCalendarCheck /> Log Mood
                </button>
                <button 
                  className={`tab-button ${activeTab === "insights" ? "active" : ""}`}
                  onClick={() => setActiveTab("insights")}
                >
                  <FaLightbulb /> Insights
                </button>
              </div>

              <div className="tab-content">
                {activeTab === "overview" && (
                  <div className="dashboard-sections">
                    <section className="dashboard-card quick-stats-card">
                      <h2>Your Wellness Overview</h2>
                      <QuickStats 
                        moodData={moodData} 
                        correlations={correlations}
                      />
                    </section>

                    <section className="dashboard-card">
                      <h2>Recent Mood Trends</h2>
                      <div className="chart-container">
                        <MoodChart data={moodData} hideCorrelations={true} />
                      </div>
                    </section>
                  </div>
                )}

                {activeTab === "log" && (
                  <div className="dashboard-sections single-column">
                    <section className="dashboard-card mood-logger-card">
                      <h2>How are you feeling today?</h2>
                      <p className="subtitle">Tracking your moods helps identify patterns and improve well-being</p>
                      <MoodLogger onMoodLogged={refreshData} />
                    </section>
                  </div>
                )}

                {activeTab === "insights" && (
                  <div className="dashboard-sections">
                    <section className="dashboard-card correlations-card">
                      <h2>Your Mood Patterns</h2>
                      <p className="subtitle">Our AI has analyzed your mood entries to identify these patterns</p>
                      <CorrelationInsights correlations={correlations} />
                    </section>
                    
                    <section className="dashboard-card">
                      <h2>Detailed Mood Analysis</h2>
                      <div className="chart-container expanded">
                        <MoodChart data={moodData} hideCorrelations={false} />
                      </div>
                    </section>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;