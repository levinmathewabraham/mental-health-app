import React, { useState } from 'react';
import axios from 'axios';
import './DepressionPrediction.css';

const DepressionPrediction = () => {
  const [formData, setFormData] = useState({
    Gender: '',
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
    FamilyHistory: '',
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
    <div className="depression-predictor">
      <h2>Depression Risk Predictor</h2>
      <form onSubmit={handleSubmit}>
        {[
          { name: 'Gender', placeholder: '0 for Male, 1 for Female' },
          { name: 'Age', placeholder: 'Enter your age' },
          { name: 'AcademicPressure', placeholder: '0 (low) - 5 (high)' },
          { name: 'WorkPressure', placeholder: '0 (low) - 5 (high)' },
          { name: 'CGPA', placeholder: 'Enter your CGPA (e.g., 7.5)' },
          { name: 'StudySatisfaction', placeholder: '0 (low) - 5 (high)' },
          { name: 'JobSatisfaction', placeholder: '0 (low) - 5 (high)' },
          { name: 'SleepDuration', placeholder: '1 (<5h), 2 (5-6h), 3 (7-8h), 4 (>8h)' },
          { name: 'DietaryHabits', placeholder: '1 (Healthy), 2 (Moderate), 3 (Healthy)' },
          { name: 'SuicidalThoughts', placeholder: '1 for Yes, 0 for No' },
          { name: 'WorkStudyHours', placeholder: 'Enter hours (1-12)' },
          { name: 'FinancialStress', placeholder: '1 (low) - 5 (high)' },
          { name: 'FamilyHistory', placeholder: '1 for Yes, 0 for No' },
        ].map((field) => (
          <div key={field.name} className="form-group">
            <label>{field.name.replace(/([A-Z])/g, ' $1')}</label>
            <input
              type="number"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              required
            />
          </div>
        ))}
        <button type="submit" className="form-button">Predict</button>
      </form>
      {prediction !== null && (
        <div className="result">
          <p>
            Depression Risk:{' '}
            <span className={`result-highlight ${prediction === 1 ? 'high-risk' : 'low-risk'}`}>
              {prediction === 1 ? 'High' : 'Low'}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default DepressionPrediction;
