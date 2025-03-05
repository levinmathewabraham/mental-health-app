import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaBrain, FaCalendarCheck, FaChartLine, FaLightbulb } from "react-icons/fa";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MoodLogger from "./MoodLogger";
import MoodChart from "./MoodChart";
import RealTimeNotification from "./RealTimeNotification";
import QuickStats from "./QuickStats";
import CorrelationInsights from "./CorrelationInsights";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [moodData, setMoodData] = useState([]);
  const [username, setUsername] = useState("");
  const [correlations, setCorrelations] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [activeSidebarSection, setActiveSidebarSection] = useState(null);

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

  const renderSidebarContent = () => {
    switch (activeSidebarSection) {
      case 'resources':
        return (
          <div className="dashboard-sections">
            <section className="dashboard-card">
              <h2>Mental Health Resources</h2>
              <div className="resources-content">
                <h3>Online Resources</h3>
                <ul>
                  <li>National Mental Health Helpline: 1-800-XXX-XXXX</li>
                  <li>Crisis Text Line: Text HOME to 741741</li>
                  <li>Online Therapy Resources</li>
                  <li>Mental Health Apps and Tools</li>
                </ul>
                <h3>Educational Materials</h3>
                <ul>
                  <li>Understanding Mental Health</li>
                  <li>Coping with Anxiety and Depression</li>
                  <li>Stress Management Techniques</li>
                </ul>
              </div>
            </section>
          </div>
        );

      case 'self-care':
        return (
          <div className="dashboard-sections">
            <section className="dashboard-card">
              <h2>Self-Care Strategies</h2>
              <div className="self-care-content">
                <div className="strategy-item">
                  <h3>Physical Well-being</h3>
                  <ul>
                    <li>Regular exercise routines</li>
                    <li>Healthy eating habits</li>
                    <li>Sleep hygiene tips</li>
                  </ul>
                </div>
                <div className="strategy-item">
                  <h3>Mental Well-being</h3>
                  <ul>
                    <li>Meditation practices</li>
                    <li>Mindfulness exercises</li>
                    <li>Stress reduction techniques</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        );

      case 'support':
        return (
          <div className="dashboard-sections">
            <section className="dashboard-card">
              <h2>Support Groups</h2>
              <div className="support-content">
                <h3>Local Support Groups</h3>
                <ul>
                  <li>Community Mental Health Centers</li>
                  <li>Peer Support Meetings</li>
                  <li>Family Support Groups</li>
                </ul>
                <h3>Online Communities</h3>
                <ul>
                  <li>Mental Health Forums</li>
                  <li>Support Chat Rooms</li>
                  <li>Social Media Support Groups</li>
                </ul>
              </div>
            </section>
          </div>
        );

      default:
        return (
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
              <button 
                className={`tab-button ${activeTab === "lifestyle-tips" ? "active" : ""}`}
                onClick={() => setActiveTab("lifestyle-tips")}
              >
                <FaLightbulb /> Lifestyle Tips
              </button>
            </div>

            <div className="tab-content">
              {activeTab === "overview" && (
                <div className="dashboard-sections">
                  <section className="dashboard-card quick-stats-card">
                    <h2>Your Wellness Overview</h2>
                    <QuickStats moodData={moodData} correlations={correlations} />
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

              {activeTab === "lifestyle-tips" && (
                <div className="dashboard-sections">
                  <section className="dashboard-card">
                    <h2>Lifestyle Tips</h2>
                    <section className="correlations-card">
                      <div className="correlations-content">
                        <div className="correlation-item">
                          <p>Maintain a balanced diet rich in fruits, vegetables, and whole grains.</p>
                        </div>
                      </div>
                      <br />
                      <div className="correlations-content">
                        <div className="correlation-item">
                          <p>Engage in regular physical activity, aiming for at least 30 minutes a day.</p>
                        </div>
                      </div>
                      <br />
                      <div className="correlations-content">
                        <div className="correlation-item">
                          <p>Practice mindfulness or meditation to reduce stress and improve mental clarity</p>
                        </div>
                      </div>
                      <br />
                      <div className="correlations-content">
                        <div className="correlation-item">
                          <p>Ensure you get enough sleep, aiming for 7-9 hours per night.</p>
                        </div>
                      </div>
                      <br />
                      <div className="correlations-content">
                        <div className="correlation-item">
                          <p>Stay connected with friends and family to foster supportive relationships.</p>
                        </div>
                      </div>
                      <br />
                      <div className="correlations-content">
                        <div className="correlation-item">
                          <p>Limit screen time, especially before bed, to improve sleep quality.</p>
                        </div>
                      </div>
                      <br />
                      <div className="correlations-content">
                        <div className="correlation-item">
                          <p>Consider journaling to express your thoughts and feelings.</p>
                        </div>
                      </div>
                    </section>
                  </section>
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <Navbar />
      <RealTimeNotification />
      <div className="dashboard-layout">
        <Sidebar 
          username={username} 
          activeSection={activeSidebarSection}
          setActiveSection={setActiveSidebarSection}
        />
        <main className="dashboard-content">
          <div className="dashboard-header">
            <div className="welcome-section">
              <h1>Welcome back, {username}</h1>
              <p className="date-display">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <div className="quick-actions">
              <Link to="/dashboard/depression-assessment" className="assessment-btn">
                <FaBrain />
                Take Depression Risk Assessment
              </Link>
            </div>
          </div>
          {renderSidebarContent()}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;