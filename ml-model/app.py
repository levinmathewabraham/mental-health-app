from fastapi import FastAPI
import pandas as pd
from sklearn.linear_model import LogisticRegression

app = FastAPI()

@app.get("/")
def root():
    return {"message": "ML Model API Running"}
