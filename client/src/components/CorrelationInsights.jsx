import React from "react";
import "./CorrelationInsights.css";

const CorrelationInsights = ({ correlations }) => {
  if (!correlations) {
    return <div>Loading correlation data...</div>;
  }

  return (
    <div className="correlations-content">
      <div className="correlation-item">
        <h3>Mood & Stress</h3>
        <div className="correlation-value">
          {correlations.moodStressCorrelation?.toFixed(2)}
        </div>
        <p className="correlation-description">
          {correlations.moodStressCorrelation < 0 
            ? "Your mood tends to decrease with stress"
            : "Your mood seems resilient to stress"}
        </p>
      </div>

      <div className="correlation-item">
        <h3>Mood & Energy</h3>
        <div className="correlation-value">
          {correlations.moodEnergyCorrelation?.toFixed(2)}
        </div>
        <p className="correlation-description">
          {correlations.moodEnergyCorrelation > 0.5 
            ? "Higher energy levels boost your mood"
            : "Your mood varies independently of energy"}
        </p>
      </div>

      <div className="correlation-item">
        <h3>Energy & Stress</h3>
        <div className="correlation-value">
          {correlations.stressEnergyCorrelation?.toFixed(2)}
        </div>
        <p className="correlation-description">
          {correlations.stressEnergyCorrelation < 0 
            ? "Stress tends to drain your energy"
            : "Your energy persists despite stress"}
        </p>
      </div>
    </div>
  );
};

export default CorrelationInsights;
