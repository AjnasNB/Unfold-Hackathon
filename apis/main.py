from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import ollama  # Import the Ollama package

app = FastAPI()

# Add CORS middleware to handle preflight requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with your specific frontend origin if needed
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Allow all headers
)

class UserData(BaseModel):
    name: str
    age: int
    income: int

# New function to use Ollama for calculations
def use_ollama(prompt: str):
    response = ollama.chat(prompt)  # Call the Ollama chat model
    return response

# Endpoint to assess the best insurance policy
@app.post("/assess-insurance/")
def assess_insurance(user_data: UserData):
    # Call the second API to get insurance policies
    response = requests.get("http://127.0.0.1:8001/list-insurances/")
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Error fetching insurance data.")
    policies = response.json()["insurance_policies"]

    # Find eligible policies
    eligible_policies = []
    for policy in policies:
        age_condition = eval(policy["eligibility"]["age"].replace(">=", str(user_data.age)))
        income_condition = eval(policy["eligibility"]["income"].replace("<=", str(user_data.income)))
        if age_condition and income_condition:
            eligible_policies.append(policy)

    if not eligible_policies:
        raise HTTPException(status_code=404, detail="No suitable insurance found for the user.")

    # Use Ollama to identify the best policy suitable for the user in JSON format
    prompt = (
        f"Given the following user details: Name: {user_data.name}, Age: {user_data.age}, "
        f"Income: {user_data.income}, please provide the best suitable insurance policy in JSON format."
    )
    ollama_response = use_ollama(prompt)

    return {"user": user_data, "best_policy": ollama_response}  # Return the response from Ollama

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
