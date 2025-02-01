import React, { useState } from 'react';
import axios from 'axios';
import './DepressionPrediction.css';

const DepressionPrediction = () => {
  const [step, setStep] = useState(1);
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
  const [loading, setLoading] = useState(false);

  const formFields = [
    // Step 1: Personal Information
    [
      { name: 'Gender', label: 'Gender', type: 'select', options: [
        { value: '', label: 'Select Gender' },
        { value: '0', label: 'Male' },
        { value: '1', label: 'Female' }
      ]},
      { name: 'Age', label: 'Age', type: 'number', min: 13, max: 100 },
    ],
    // Step 2: Academic/Work
    [
      { name: 'AcademicPressure', label: 'Academic Pressure', type: 'range', min: 0, max: 5 },
      { name: 'WorkPressure', label: 'Work Pressure', type: 'range', min: 0, max: 5 },
      { name: 'CGPA', label: 'CGPA', type: 'number', step: '0.1', min: 0, max: 10 },
      { name: 'StudySatisfaction', label: 'Study Satisfaction', type: 'range', min: 0, max: 5 },
      { name: 'JobSatisfaction', label: 'Job Satisfaction', type: 'range', min: 0, max: 5 },
    ],
    // Step 3: Lifestyle
    [
      { name: 'SleepDuration', label: 'Sleep Duration', type: 'select', options: [
        { value: '', label: 'Select Sleep Duration' },
        { value: '1', label: 'Less than 5 hours' },
        { value: '2', label: '5-6 hours' },
        { value: '3', label: '7-8 hours' },
        { value: '4', label: 'More than 8 hours' }
      ]},
      { name: 'DietaryHabits', label: 'Dietary Habits', type: 'select', options: [
        { value: '', label: 'Select Dietary Habits' },
        { value: '1', label: 'Healthy' },
        { value: '2', label: 'Moderate' },
        { value: '3', label: 'Unhealthy' }
      ]},
      { name: 'WorkStudyHours', label: 'Daily Work/Study Hours', type: 'number', min: 1, max: 12 },
    ],
    // Step 4: Mental Health History
    [
      { name: 'SuicidalThoughts', label: 'Have you experienced suicidal thoughts?', type: 'select', options: [
        { value: '', label: 'Select an option' },
        { value: '0', label: 'No' },
        { value: '1', label: 'Yes' }
      ]},
      { name: 'FinancialStress', label: 'Financial Stress Level', type: 'range', min: 1, max: 5 },
      { name: 'FamilyHistory', label: 'Family History of Depression', type: 'select', options: [
        { value: '', label: 'Select an option' },
        { value: '0', label: 'No' },
        { value: '1', label: 'Yes' }
      ]},
    ],
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Convert form values to numbers
    const formattedData = {
      Gender: Number(formData.Gender),
      Age: Number(formData.Age),
      AcademicPressure: Number(formData.AcademicPressure),
      WorkPressure: Number(formData.WorkPressure),
      CGPA: Number(formData.CGPA),
      StudySatisfaction: Number(formData.StudySatisfaction),
      JobSatisfaction: Number(formData.JobSatisfaction),
      SleepDuration: Number(formData.SleepDuration),
      DietaryHabits: Number(formData.DietaryHabits),
      SuicidalThoughts: Number(formData.SuicidalThoughts),
      WorkStudyHours: Number(formData.WorkStudyHours),
      FinancialStress: Number(formData.FinancialStress),
      FamilyHistory: Number(formData.FamilyHistory)
    };

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', formattedData);
      console.log('Response:', response.data); // Add this for debugging
      setPrediction(response.data.DepressionRisk);
    } catch (error) {
      console.error('Error making prediction:', error.response?.data || error.message);
      alert('Error making prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  return (
    <div className="depression-predictor">
      <div className="predictor-header">
        <h2>Depression Risk Assessment</h2>
        <p>This tool helps identify potential risk factors for depression. All information is confidential.</p>
      </div>

      <div className="step-indicator">
        {[1, 2, 3, 4].map(num => (
          <div key={num} className={`step ${step >= num ? 'active' : ''}`}>
            {num}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-step">
          {formFields[step - 1].map((field) => (
            <div key={field.name} className="form-group">
              <label>{field.label}</label>
              {field.type === 'select' ? (
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                >
                  {field.options.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.type === 'range' ? (
                <div className="range-input">
                  <input
                    type="range"
                    name={field.name}
                    min={field.min}
                    max={field.max}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                  />
                  <span className="range-value">{formData[field.name]}</span>
                </div>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  required
                />
              )}
            </div>
          ))}
        </div>

        <div className="form-navigation">
          {step > 1 && (
            <button type="button" onClick={prevStep} className="nav-button prev">
              Previous
            </button>
          )}
          {step < 4 ? (
            <button type="button" onClick={nextStep} className="nav-button next">
              Next
            </button>
          ) : (
            <button type="submit" className="nav-button submit" disabled={loading}>
              {loading ? 'Processing...' : 'Get Results'}
            </button>
          )}
        </div>
      </form>

      {prediction !== null && (
        <div className={`result ${prediction === 1 ? 'high-risk' : 'low-risk'}`}>
          <h3>Assessment Result</h3>
          <div className="risk-level">
            <span className="risk-label">Risk Level:</span>
            <span className="risk-value">{prediction === 1 ? 'High' : 'Low'}</span>
          </div>
          <div className="result-message">
            {prediction === 1 ? (
              <>
                <p>Based on your responses, you may be at higher risk for depression.</p>
                <p>We strongly recommend:</p>
                <ul>
                  <li>Consulting with a mental health professional</li>
                  <li>Talking to someone you trust about your feelings</li>
                  <li>Contacting a crisis helpline if you need immediate support</li>
                </ul>
              </>
            ) : (
              <>
                <p>Based on your responses, you appear to be at lower risk for depression.</p>
                <p>Remember to:</p>
                <ul>
                  <li>Continue maintaining healthy lifestyle habits</li>
                  <li>Stay connected with friends and family</li>
                  <li>Monitor your mental health regularly</li>
                </ul>
              </>
            )}
          </div>
          <div className="emergency-contacts">
            <p>24/7 Crisis Resources:</p>
            <p>National Crisis Line: 988</p>
            <p>Emergency: 911</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepressionPrediction;
