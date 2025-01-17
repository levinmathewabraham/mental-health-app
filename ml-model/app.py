from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
from sklearn.linear_model import LogisticRegression
import joblib

app = FastAPI()

# Load the model
model = joblib.load("model.pkl")

@app.get("/")
def root():
    return {"message": "ML Model API Running"}

# Define input data schema
class PredictionInput(BaseModel):
    gender: int
    age: float
    academic_pressure: float
    work_pressure: float
    cgpa:float
    study_satisfaction: float
    job_satisfaction: float
    sleep_duration: int
    dietary_habits: int
    suicidal_thoughts: int
    work_study_hours: float
    financial_stress: float
    family_history_mental_illness: int

@app.post("/predict")
def predict(input_data: PredictionInput):
    try:
        # Map user input to a list matching the order used during model training
        features = [
            input_data.gender,
            input_data.age,
            input_data.academic_pressure,
            input_data.work_pressure,
            input_data.cgpa,
            input_data.study_satisfaction,
            input_data.job_satisfaction,
            input_data.sleep_duration,
            input_data.dietary_habits,
            input_data.suicidal_thoughts,
            input_data.work_study_hours,
            input_data.financial_stress,
            input_data.family_history_mental_illness
        ]

        # Make a prediction
        prediction = model.predict([features])  # Reshape into a 2D array as needed
        depression_risk = "Yes" if prediction[0] == 1 else "No"

        return {"depression_risk": depression_risk}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    