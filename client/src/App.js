import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./components/LandingPage";
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/Admin/AdminDashboard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProtectedRoute from './components/ProtectedRoute';
import RealTimeNotification from "./components/RealTimeNotification";
import DepressionPrediction from './components/DepressionPrediction';
import Footer from './components/Footer';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import TermsOfService from './components/TermOfService';
import PrivacyPolicy from './components/PrivacyPolicy';
import ContactUs from './components/Contact';
import AboutUs from './components/About';
import ResourcesPage from './components/ResourcesPage';
import SelfCareStrategiesPage from './components/SelfCareStrategiesPage';
import SupportGroupsPage from './components/SupportGroupsPage';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content-wrapper">
          <RealTimeNotification /> {/* Enable real-time notifications */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/depression-assessment" element={<DepressionPrediction />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/policy" element={<PrivacyPolicy />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/self-care-strategies" element={<SelfCareStrategiesPage />} />
            <Route path="/support-groups" element={<SupportGroupsPage />} />
            <Route path="/" element={<Login />} /> {/* Default route */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
