import React, { useState } from 'react';
import axios from 'axios';

const DepressionPrediction = () => {
  const [formData, setFormData] = useState({
    Gender: 0,
    Age: '',
    AcademicPressure: '',
    WorkPressure: '',
    CGPA: '',
    StudySatisfaction: '',
    JobSatisfaction: '',
    SleepDuration: '',
    DietaryHabits: '',
    SuicidalThoughts: '',
    WorkStudyHours: '',
    FinancialStress: '',
    FamilyHistory: 0,
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', formData);
      setPrediction(response.data.DepressionRisk);
      console.log('Form Data Submitted:', formData);
    } catch (error) {
      console.error('Error making prediction:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Gender (0 for Male, 1 for Female):</label>
          <input
            type="number"
            name="Gender"
            value={formData.Gender}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="Age"
            value={formData.Age}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Academic Pressure:</label>
          <input
            type="number"
            name="AcademicPressure"
            value={formData.AcademicPressure}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>WorkPressure:</label>
          <input
            type="number"
            name="WorkPressure"
            value={formData.WorkPressure}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>CGPA:</label>
          <input
            type="number"
            name="CGPA"
            value={formData.CGPA}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Study Satisfaction:</label>
          <input
            type="number"
            name="StudySatisfaction"
            value={formData.StudySatisfaction}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Job Satisfaction:</label>
          <input
            type="number"
            name="JobSatisfaction"
            value={formData.JobSatisfaction}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Sleep Duration:</label>
          <input
            type="number"
            name="SleepDuration"
            value={formData.SleepDuration}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Dietary Habits:</label>
          <input
            type="number"
            name="DietaryHabits"
            value={formData.DietaryHabits}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Suicidal Thoughts:</label>
          <input
            type="number"
            name="SuicidalThoughts"
            value={formData.SuicidalThoughts}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Work/Study Hours:</label>
          <input
            type="number"
            name="WorkStudyHours"
            value={formData.WorkStudyHours}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Financial Stress:</label>
          <input
            type="number"
            name="FinancialStress"
            value={formData.FinancialStress}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Family History:</label>
          <input
            type="number"
            name="FamilyHistory"
            value={formData.FamilyHistory}
            onChange={handleChange}
            required
          />
        </div>
        {/* Add similar inputs for all other fields */}
        <button type="submit">Predict</button>
      </form>
      {prediction !== null && (
        <h2>Depression Risk: {prediction === 1 ? 'High' : 'Low'}</h2>
      )}
    </div>
  );
};

export default DepressionPrediction;
