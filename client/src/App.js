import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./components/LandingPage";
import Dashboard from './components/Dashboard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProtectedRoute from './components/ProtectedRoute';
import RealTimeNotification from "./components/RealTimeNotification";
import DepressionPrediction from './components/DepressionPrediction';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <RealTimeNotification /> {/* Enable real-time notifications */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard/predictor" element={<DepressionPrediction />} />
          {/* Add other routes here, e.g., Dashboard */}
          <Route path="/" element={<Login />} /> {/* Default route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
