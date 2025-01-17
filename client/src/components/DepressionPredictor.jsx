import React, { useState } from "react";
import axios from "axios";
import "./DepressionPredictor.css";

function DepressionPredictor() {
  const [inputs, setInputs] = useState({
    gender: "",
    age: "",
    academic_pressure: "",
    work_pressure: "",
    cgpa: "",
    study_satisfaction: "",
    job_satisfaction: "",
    sleep_duration: "",
    dietary_habits: "",
    suicidal_thoughts: "",
    work_study_hours: "",
    financial_stress: "",
    family_history_mental_illness: "",
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/predict", {
        ...inputs,
        age: parseFloat(inputs.age), // Ensure numeric fields are parsed correctly
        academic_pressure: parseFloat(inputs.academic_pressure),
        work_pressure: parseFloat(inputs.work_pressure),
        cgpa: parseFloat(inputs.cgpa),
        study_satisfaction: parseFloat(inputs.study_satisfaction),
        job_satisfaction: parseFloat(inputs.job_satisfaction),
        sleep_duration: parseInt(inputs.sleep_duration, 10),
        dietary_habits: parseInt(inputs.dietary_habits, 10),
        suicidal_thoughts: parseInt(inputs.suicidal_thoughts, 10),
        work_study_hours: parseFloat(inputs.work_study_hours),
        financial_stress: parseFloat(inputs.financial_stress),
        family_history_mental_illness: parseInt(inputs.family_history_mental_illness, 10),
      });

      setPrediction(response.data.depression_risk);
    } catch (err) {
      console.error("Prediction failed:", err);
    }
  };

  return (
    <div className="depression-predictor">
      <h2 className="title">Depression Risk Predictor</h2>
      <form onSubmit={handleSubmit} className="predictor-form">
        <div className="form-group">
          <label>Gender</label>
          <input
            type="number"
            name="gender"
            placeholder="Gender (0 or 1)"
            value={inputs.gender}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={inputs.age}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Academic Pressure</label>
          <input
            type="number"
            step="0.1"
            name="academic_pressure"
            placeholder="Academic Pressure"
            value={inputs.academic_pressure}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Work Pressure</label>
          <input
            type="number"
            step="0.1"
            name="work_pressure"
            placeholder="Work Pressure"
            value={inputs.work_pressure}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>CGPA</label>
          <input
            type="number"
            step="0.1"
            name="cgpa"
            placeholder="CGPA"
            value={inputs.cgpa}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Study Satisfaction</label>
          <input
            type="number"
            step="0.1"
            name="study_satisfaction"
            placeholder="Study Satisfaction"
            value={inputs.study_satisfaction}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Job Satisfaction</label>
          <input
            type="number"
            step="0.1"
            name="job_satisfaction"
            placeholder="Job Satisfaction"
            value={inputs.job_satisfaction}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Sleep Duration</label>
          <input
            type="number"
            step="0.1"
            name="sleep_duration"
            placeholder="Sleep Duration (hours)"
            value={inputs.sleep_duration}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Dietary Habits</label>
          <input
            type="number"
            name="dietary_habits"
            placeholder="Dietary Habits"
            value={inputs.dietary_habits}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Suicidal Thoughts</label>
          <input
            type="number"
            name="suicidal_thoughts"
            placeholder="Suicidal Thoughts (0 or 1)"
            value={inputs.suicidal_thoughts}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Work/Study Hours</label>
          <input
            type="number"
            step="0.1"
            name="work_study_hours"
            placeholder="Work/Study Hours"
            value={inputs.work_study_hours}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Financial Stress</label>
          <input
            type="number"
            step="0.1"
            name="financial_stress"
            placeholder="Financial Stress"
            value={inputs.financial_stress}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Family History</label>
          <input
            type="number"
            name="family_history_mental_illness"
            placeholder="Family History (0 or 1)"
            value={inputs.family_history_mental_illness}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        {/* Add other fields following the same structure */}

        <button type="submit" className="form-button">Predict</button>
      </form>

      {prediction && (
        <div className="result">
          <h3>Depression Risk: <span className="result-highlight">{prediction}</span></h3>
        </div>
      )}
    </div>
  );
}

export default DepressionPredictor;
