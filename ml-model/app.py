from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)

# Define column names as they were in training
COLUMN_NAMES = [
    'Gender', 'Age', 'Academic Pressure', 'Work Pressure', 'CGPA',
    'Study Satisfaction', 'Job Satisfaction', 'Sleep Duration', 'Dietary Habits',
    'Suicidal Thoughts', 'Work/Study Hours', 'Financial Stress', 'Family History'
]

# Load the saved model
with open('model.pkl', 'rb') as file:
    model = pickle.load(file)

@app.route('/')
def home():
    return "Flask server is running!"
    
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        # Map the incoming data to match training column names
        mapped_data = {
            'Gender': data['Gender'],
            'Age': data['Age'],
            'Academic Pressure': data['AcademicPressure'],
            'Work Pressure': data['WorkPressure'],
            'CGPA': data['CGPA'],
            'Study Satisfaction': data['StudySatisfaction'],
            'Job Satisfaction': data['JobSatisfaction'],
            'Sleep Duration': data['SleepDuration'],
            'Dietary Habits': data['DietaryHabits'],
            'Suicidal Thoughts': data['SuicidalThoughts'],
            'Work/Study Hours': data['WorkStudyHours'],
            'Financial Stress': data['FinancialStress'],
            'Family History': data['FamilyHistory']
        }
        
        # Create DataFrame with same column names as training data
        features_df = pd.DataFrame([mapped_data], columns=COLUMN_NAMES)
        
        prediction = model.predict(features_df)
        return jsonify({'DepressionRisk': int(prediction[0])})
    except Exception as e:
        print('Error making prediction:', str(e))  # Server-side logging
        return jsonify({'error': 'Failed to make prediction'}), 500

if __name__ == '__main__':
    app.run(debug=True)
