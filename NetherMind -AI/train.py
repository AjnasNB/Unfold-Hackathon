import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib

# Load the dataset
data = pd.read_csv('insurance_data.csv')

# Define features and target
X = data[['age', 'income', 'property_value']]
y = data['risk_level']

# Convert risk_level to numerical values for the model
risk_mapping = {'Low': 0, 'Medium': 1, 'High': 2}
y = y.map(risk_mapping)

# Split into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the Random Forest model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Save the trained model
joblib.dump(model, 'risk_prediction_model.pkl')
print("Model trained and saved as risk_prediction_model.pkl")
