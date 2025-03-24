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
import { API_BASE_URL } from '../config';
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
          `${API_BASE_URL}/api/mood/${parsedUser._id}`
        );
        setMoodData(response.data);

        // Fetch correlations
        const correlationsResponse = await axios.get(
          `${API_BASE_URL}/api/mood/correlation/${parsedUser._id}`
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
        `${API_BASE_URL}/api/mood/${user._id}`
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
              <h1>Mental Health Resources</h1>
              <p>Welcome to the resources page! Here you will find a variety of tools, articles, and support options to help you on your mental health journey.</p>
              <section className="resource-section">
                <h2>Articles and Guides</h2>
                <ul>
                  <li>
                    <a href="https://www.mentalhealth.gov/basics/what-is-mental-health" target="_blank" rel="noopener noreferrer">
                      Understanding Mental Health
                    </a>
                    - A comprehensive guide on what mental health is and why it matters.
                  </li>
                  <li>
                    <a href="https://www.nami.org/Your-Journey/Identity-and-Cultural-Dimensions/Understanding-Diversity-and-Inclusion" target="_blank" rel="noopener noreferrer">
                      Understanding Diversity and Inclusion
                    </a>
                    - Insights into how diversity impacts mental health.
                  </li>
                  <li>
                    <a href="https://www.psychologytoday.com/us/basics/mental-health" target="_blank" rel="noopener noreferrer">
                      Mental Health Basics
                    </a>
                    - An overview of mental health, including common disorders and treatments.
                  </li>
                </ul>
              </section>
              <section className="resource-section">
                <h2>Hotlines and Support</h2>
                <p>If you or someone you know is in crisis, please reach out for help. Here are some resources available in India:</p>
                <ul>
                  <li>
                    <strong>Vandrevala Foundation Helpline:</strong> <a href="https://vandrevalafoundation.com/" target="_blank" rel="noopener noreferrer">1860 266 2345</a> - A 24/7 helpline for mental health support.
                  </li>
                  <li>
                    <strong>AASRA:</strong> <a href="http://www.aasra.info/" target="_blank" rel="noopener noreferrer">+91-9820466726</a> - A helpline for those in distress, available 24/7.
                  </li>
                  <li>
                    <strong>iCall:</strong> <a href="https://icallhelpline.org/" target="_blank" rel="noopener noreferrer">+91-9152987821</a> - A helpline providing mental health support and counseling.
                  </li>
                </ul>
              </section>

              <section className="resource-section">
                <h2>Self-Help Tools</h2>
                <p>Here are some self-help tools and apps that can assist you in managing your mental health:</p>
                <ul>
                  <li>
                    <a href="https://www.headspace.com/" target="_blank" rel="noopener noreferrer">
                      Headspace
                    </a>
                    - A meditation app that provides guided meditations and mindfulness practices.
                  </li>
                  <li>
                    <a href="https://www.calm.com/" target="_blank" rel="noopener noreferrer">
                      Calm
                    </a>
                    - An app for sleep, meditation, and relaxation.
                  </li>
                  <li>
                    <a href="https://www.moodfitapp.com/" target="_blank" rel="noopener noreferrer">
                      Moodfit
                    </a>
                    - A mental health app that helps you track your mood and provides tools for self-care.
                  </li>
                </ul>
              </section>

              <section className="resource-section">
                <h2>Books and Literature</h2>
                <p>Consider reading these books for deeper insights into mental health:</p>
                <ul>
                  <li>
                    <strong>The Body Keeps the Score</strong> by Bessel van der Kolk - A groundbreaking book on trauma and its effects on the body and mind.
                  </li>
                  <li>
                    <strong>Feeling Good: The New Mood Therapy</strong> by David D. Burns - A classic book on cognitive behavioral therapy techniques.
                  </li>
                  <li>
                    <strong>Lost Connections</strong> by Johann Hari - An exploration of the causes of depression and the ways to overcome it.
                  </li>
                  <li>
                    <strong>Mindfulness in Plain English</strong> by Bhante Henepola Gunaratana - A practical guide to mindfulness and meditation.
                  </li>
                </ul>
              </section>
            </section>
          </div>
        );

      case 'self-care':
        return (
          <div className="dashboard-sections">
            <section className="dashboard-card">
              <h2>Self-Care Strategies</h2>
              <p>Explore various self-care strategies to improve your mental well-being.</p>

              <section className="resource-section">
                <h2>Mindfulness and Meditation</h2>
                <p>Practicing mindfulness and meditation can help you stay present and reduce stress. Consider trying:</p>
                <ul>
                  <li>Guided meditation apps like Headspace or Calm.</li>
                  <li>Deep breathing exercises to calm your mind.</li>
                  <li>Mindful walking or yoga to connect with your body.</li>
                </ul>
              </section>

              <section className="resource-section">
                <h2>Physical Activity</h2>
                <p>Regular physical activity is essential for mental health. Aim for at least 30 minutes of exercise most days. Options include:</p>
                <ul>
                  <li>Walking, jogging, or cycling in nature.</li>
                  <li>Joining a local sports team or fitness class.</li>
                  <li>Practicing yoga or dance for both physical and mental benefits.</li>
                </ul>
              </section>

              <section className="resource-section">
                <h2>Healthy Eating</h2>
                <p>Nutrition plays a significant role in mental health. Focus on a balanced diet that includes:</p>
                <ul>
                  <li>Fruits and vegetables for essential vitamins and minerals.</li>
                  <li>Whole grains for sustained energy.</li>
                  <li>Lean proteins and healthy fats to support brain function.</li>
                </ul>
              </section>

              <section className="resource-section">
                <h2>Social Connections</h2>
                <p>Maintaining strong social connections can improve your mood and reduce feelings of isolation. Consider:</p>
                <ul>
                  <li>Reaching out to friends or family regularly.</li>
                  <li>Joining clubs or groups that share your interests.</li>
                  <li>Volunteering in your community to meet new people.</li>
                </ul>
              </section>

              <section className="resource-section">
                <h2>Sleep Hygiene</h2>
                <p>Quality sleep is crucial for mental health. Improve your sleep hygiene by:</p>
                <ul>
                  <li>Establishing a regular sleep schedule.</li>
                  <li>Creating a relaxing bedtime routine.</li>
                  <li>Avoiding screens and caffeine before bed.</li>
                </ul>
              </section>

              <section className="resource-section">
                <h2>Creative Outlets</h2>
                <p>Engaging in creative activities can be therapeutic. Try:</p>
                <ul>
                  <li>Journaling to express your thoughts and feelings.</li>
                  <li>Painting, drawing, or crafting to explore your creativity.</li>
                  <li>Playing a musical instrument or singing to lift your spirits.</li>
                </ul>
              </section>

              <section className="resource-section">
                <h2>Professional Help</h2>
                <p>Sometimes, self-care strategies may not be enough. Don't hesitate to seek professional help if needed. Consider:</p>
                <ul>
                  <li>Talking to a therapist or counselor.</li>
                  <li>Joining support groups for shared experiences.</li>
                  <li>Exploring online therapy options for convenience.</li>
                </ul>
              </section>

              <section className="resource-section">
                <h2>Setting Boundaries</h2>
                <p>Learning to say no and setting boundaries is essential for self-care. Practice:</p>
                <ul>
                  <li>Identifying your limits and communicating them clearly.</li>
                  <li>Prioritizing your needs and well-being over obligations.</li>
                  <li>Taking breaks when feeling overwhelmed.</li>
                </ul>
              </section>

              <section className="resource-section">
                <h2>Gratitude Practice</h2>
                <p>Practicing gratitude can shift your focus to the positive aspects of life. Try:</p>
                <ul>
                  <li>Keeping a gratitude journal to write down things you are thankful for.</li>
                  <li>Sharing your gratitude with others to strengthen relationships.</li>
                  <li>Reflecting on positive experiences at the end of each day.</li>
                </ul>
              </section>

              <section className="resource-section">
                <h2>Digital Detox</h2>
                <p>Taking breaks from screens can help reduce stress and anxiety. Consider:</p>
                <ul>
                  <li>Setting specific times to unplug from devices.</li>
                  <li>Engaging in offline activities like reading or hiking.</li>
                  <li>Limiting social media use to avoid comparison and negativity.</li>
                </ul>
              </section>
            </section>
          </div>
        );

      case 'support':
        return (
          <div className="dashboard-sections">
            <section className="dashboard-card">
              <h1>Support Groups</h1>
              <p>Find local and online support groups for mental health.</p>

              <section className="resource-section">
                <h2>What Are Support Groups?</h2>
                <p>Support groups are gatherings of individuals who share similar experiences or challenges. They provide a safe space for members to share their feelings, offer support, and learn from one another.</p>
              </section>

              <section className="resource-section">
                <h2>Benefits of Joining a Support Group</h2>
                <ul>
                  <li><strong>Emotional Support:</strong> Connect with others who understand your struggles.</li>
                  <li><strong>Shared Experiences:</strong> Gain insights from others who have faced similar challenges.</li>
                  <li><strong>Accountability:</strong> Stay motivated and committed to your mental health journey.</li>
                  <li><strong>Resource Sharing:</strong> Learn about helpful resources and coping strategies.</li>
                  <li><strong>Reduced Isolation:</strong> Combat feelings of loneliness and isolation.</li>
                </ul>
              </section>

              <section className="resource-section">
                <h2>Types of Support Groups</h2>
                <p>Support groups can vary widely in focus and format. Here are some common types:</p>
                <ul>
                  <li><strong>Peer Support Groups:</strong> Led by individuals with lived experience, these groups focus on sharing personal stories and coping strategies.</li>
                  <li><strong>Professional-Led Groups:</strong> Facilitated by mental health professionals, these groups may include structured activities and discussions.</li>
                  <li><strong>Online Support Groups:</strong> Virtual meetings that allow participants to connect from anywhere, often through video conferencing platforms.</li>
                  <li><strong>Topic-Specific Groups:</strong> Focused on specific issues such as anxiety, depression, grief, or addiction.</li>
                </ul>
              </section>

              <section className="resource-section">
                <h2>How to Find Support Groups</h2>
                <p>Finding the right support group can be a crucial step in your mental health journey. Here are some ways to locate groups:</p>
                <ul>
                  <li><strong>Online Directories:</strong> Websites like <a href="https://www.meetup.com" target="_blank" rel="noopener noreferrer">Meetup</a> and <a href="https://www.mentalhealth.gov" target="_blank" rel="noopener noreferrer">MentalHealth.gov</a> offer listings of local and online support groups.</li>
                  <li><strong>Community Centers:</strong> Check with local community centers, hospitals, or mental health clinics for group offerings.</li>
                  <li><strong>Social Media:</strong> Many support groups have a presence on platforms like Facebook, where you can join private groups for support.</li>
                  <li><strong>Therapist Recommendations:</strong> Ask your therapist or counselor for recommendations on support groups that may be beneficial for you.</li>
                </ul>
              </section>

              <section className="resource-section">
                <h2>What to Expect in a Support Group</h2>
                <p>Support groups can vary in structure, but here are some common elements you might encounter:</p>
                <ul>
                  <li><strong>Introductions:</strong> Members often introduce themselves and share their reasons for attending.</li>
                  <li><strong>Sharing Time:</strong> Participants take turns sharing their experiences and feelings.</li>
                  <li><strong>Facilitated Discussions:</strong> A facilitator may guide discussions and encourage participation.</li>
                  <li><strong>Confidentiality:</strong> Respect for privacy is crucial; what is shared in the group should stay in the group.</li>
                  <li><strong>Resources and Tools:</strong> Groups may provide handouts, worksheets, or recommendations for further reading.</li>
                </ul>
              </section>

              <section className="resource-section">
                <h2>Online Support Group Resources</h2>
                <p>Here are some reputable online platforms where you can find virtual support groups:</p>
                <ul>
                  <li><a href="https://www.7cups.com" target="_blank" rel="noopener noreferrer">7 Cups</a>: Offers free online chat with trained listeners and support groups.</li>
                  <li><a href="https://www.nami.org" target="_blank" rel="noopener noreferrer">NAMI (National Alliance on Mental Illness)</a>: Provides information on local and online support groups.</li>
                  <li><a href="https://www.supportgroups.com" target="_blank" rel="noopener noreferrer">SupportGroups.com</a>: A platform for various support groups covering different topics.</li>
                  <li><a href="https://www.reddit.com/r/mentalhealth" target="_blank" rel="noopener noreferrer">Reddit Mental Health Community</a>: An online community where users can share experiences and support each other.</li>
                </ul>
              </section>

              <section className="resource-section">
                <h2>Conclusion</h2>
                <p>Joining a support group can be a valuable step in your mental health journey. Whether you choose to participate in-person or online, the connections and support you find can make a significant difference in your well-being.</p>
              </section>
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
                  <section className="dashboard-card">
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
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Getting your wellness data...</p>
      </div>
    );
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