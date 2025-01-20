from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

# Load the saved model
with open('model.pkl', 'rb') as file:
    model = pickle.load(file)

@app.route('/')
def home():
    return "Flask server is running! Use the '/predict' endpoint to make predictions."
    
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    features = np.array([
        data['Gender'], data['Age'], data['AcademicPressure'], data['WorkPressure'],
        data['CGPA'], data['StudySatisfaction'], data['JobSatisfaction'],
        data['SleepDuration'], data['DietaryHabits'], data['SuicidalThoughts'],
        data['WorkStudyHours'], data['FinancialStress'], data['FamilyHistory']
    ]).reshape(1, -1)

    prediction = model.predict(features)
    return jsonify({'DepressionRisk': int(prediction[0])})

if __name__ == '__main__':
    app.run(debug=True)
