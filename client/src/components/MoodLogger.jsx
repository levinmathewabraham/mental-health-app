import React, { useState } from "react";
import axios from "axios";

function MoodLogger() {
  const [mood, setMood] = useState("Happy");
  const [energy, setEnergy] = useState(3);
  const [stress, setStress] = useState(2);
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
    <form onSubmit={handleSubmit}>
      <h2>Log Your Mood</h2>
      <label>Mood:</label>
      <select value={mood} onChange={(e) => setMood(e.target.value)}>
        <option value="Happy">😊 Happy</option>
        <option value="Neutral">😐 Neutral</option>
        <option value="Sad">😢 Sad</option>
      </select>
      <label>Energy Level (1–5):</label>
      <input
        type="range"
        min="1"
        max="5"
        value={energy}
        onChange={(e) => setEnergy(Number(e.target.value))}
      />
      <label>Stress Level (1–5):</label>
      <input
        type="range"
        min="1"
        max="5"
        value={stress}
        onChange={(e) => setStress(Number(e.target.value))}
      />
      <button type="submit">Log Mood</button>
    </form>
  );
}

export default MoodLogger;
