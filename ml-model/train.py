import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import pickle  # For saving the model

# Load dataset
df = pd.read_csv('Student Depression Dataset.csv')

# Map categorical values to numerical equivalents
df['Gender'] = df['Gender'].map({'Male': 0, 'Female': 1})
df['Sleep Duration'] = df['Sleep Duration'].map({
    'Less than 5 hours': 1, '5-6 hours': 2, '7-8 hours': 3, 'More than 8 hours': 4
})
df['Dietary Habits'] = df['Dietary Habits'].map({'Healthy': 0, 'Moderate': 1, 'Unhealthy': 2})
df['Suicidal Thoughts'] = df['Have you ever had suicidal thoughts ?'].map({'Yes': 1, 'No': 0})
df['Family History'] = df['Family History of Mental Illness'].map({'Yes': 1, 'No': 0})

# Drop unnecessary columns like ID, City, Profession, etc.
columns_to_keep = [
    'Gender', 'Age', 'Academic Pressure', 'Work Pressure', 'CGPA',
    'Study Satisfaction', 'Job Satisfaction', 'Sleep Duration', 'Dietary Habits',
    'Suicidal Thoughts', 'Work/Study Hours', 'Financial Stress', 'Family History', 'Depression'
]
df = df[columns_to_keep]

# Handle missing values (if any)
df = df.dropna()

# Separate features and target variable
X = df.drop(columns=['Depression'])
y = df['Depression']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)

# Test model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy * 100:.2f}%")

# Save the trained model
with open('model.pkl', 'wb') as file:
    pickle.dump(model, file)
