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
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/depression-assessment" element={<DepressionPrediction />} />
            <Route path="/terms" element={<TermsOfService />} />
            {/* Add other routes here, e.g., Dashboard */}
            <Route path="/" element={<Login />} /> {/* Default route */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
