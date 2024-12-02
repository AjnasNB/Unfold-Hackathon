from flask import Flask, request, jsonify
import joblib

# Load the trained model
model = joblib.load('risk_prediction_model.pkl')

# Flask app
app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict_risk():
    # Get user data from the request
    data = request.get_json()
    age = data['age']
    income = data['income']
    property_value = data['property_value']
    
    # Make prediction
    prediction = model.predict([[age, income, property_value]])
    
    # Convert prediction back to risk level
    risk_mapping = {0: 'Low', 1: 'Medium', 2: 'High'}
    risk_level = risk_mapping[prediction[0]]
    
    return jsonify({'risk_level': risk_level})

if __name__ == '__main__':
    app.run(port=5000)
