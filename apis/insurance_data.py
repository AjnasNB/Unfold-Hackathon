from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174"],  # Update this to your frontend's origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dummy insurance data
insurance_policies = [
    {
        "id": 1,
        "name": "Basic Renter's Insurance",
        "coverage": "Personal property, liability, additional living expenses",
        "premium": 20,
        "payout": 50000,
        "eligibility": {"income": "<=50000", "age": ">=18"},
    },
    {
        "id": 2,
        "name": "Premium Renter's Insurance",
        "coverage": "Personal property, liability, natural disasters",
        "premium": 40,
        "payout": 100000,
        "eligibility": {"income": "<=80000", "age": ">=21"},
    },
    {
        "id": 3,
        "name": "Standard Homeowner's Insurance",
        "coverage": "Property damage, liability, theft",
        "premium": 60,
        "payout": 150000,
        "eligibility": {"income": "<=100000", "age": ">=25"},
    },
    {
        "id": 4,
        "name": "Comprehensive Homeowner's Insurance",
        "coverage": "Property damage, liability, natural disasters",
        "premium": 80,
        "payout": 200000,
        "eligibility": {"income": "<=150000", "age": ">=30"},
    },
    {
        "id": 5,
        "name": "Elite Homeowner's Insurance",
        "coverage": "All-inclusive coverage",
        "premium": 120,
        "payout": 300000,
        "eligibility": {"income": "<=200000", "age": ">=35"},
    },
]

@app.get("/list-insurances/")
def list_insurances():
    return {"insurance_policies": insurance_policies}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("insurance_data:app", host="127.0.0.1", port=8001, reload=True)
