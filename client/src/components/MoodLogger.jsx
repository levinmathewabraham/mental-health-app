import React, { useState } from "react";
import axios from "axios";
import "./MoodLogger.css";

function MoodLogger() {
  const [mood, setMood] = useState(2); // Default value at Neutral
  const [energy, setEnergy] = useState(1);
  const [stress, setStress] = useState(1);
  const userId = JSON.parse(localStorage.getItem("user"))._id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/mood/add", {
        userId,
        mood,
        energy,
        stress,
        date: new Date(),
      });
      alert("Mood logged successfully!");
    } catch (err) {
      console.error("Failed to log mood.", err);
    }
  };

  return (
    <form className="mood-logger-form" onSubmit={handleSubmit}>
      <div className="slider-group">
        <label htmlFor="mood-slider" className="slider-label">Mood:</label>
        <input
          id="mood-slider"
          type="range"
          min="1"
          max="3"
          value={mood}
          className="slider"
          onChange={(e) => setMood(Number(e.target.value))}
        />
        <div className="slider-scale">
          <span>😢 Sad</span>
          <span>😐 Neutral</span>
          <span>😊 Happy</span>
        </div>
      </div>

      <div className="slider-group">
        <label htmlFor="energy-slider" className="slider-label">
          Energy Level (1–5):
        </label>
        <input
          id="energy-slider"
          type="range"
          min="1"
          max="5"
          value={energy}
          className="slider"
          onChange={(e) => setEnergy(Number(e.target.value))}
        />
      </div>

      <div className="slider-group">
        <label htmlFor="stress-slider" className="slider-label">
          Stress Level (1–5):
        </label>
        <input
          id="stress-slider"
          type="range"
          min="1"
          max="5"
          value={stress}
          className="slider"
          onChange={(e) => setStress(Number(e.target.value))}
        />
      </div>

      <button type="submit" className="submit-btn">
        Log Mood
      </button>
    </form>
  );
}

export default MoodLogger;
