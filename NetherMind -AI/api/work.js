require("dotenv").config(); // Load environment variables
const express = require("express");
const axios = require("axios");
const Web3 = require("web3");
const fs = require("fs");

const app = express();
app.use(express.json());

// Load environment variables
const JSON_RPC_URL = process.env.JSON_RPC_URL || "http://127.0.0.1:8545";
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || "0xYourContractAddress";
const ABI_PATH = process.env.ABI_PATH || "./contractABI.json";
const FLASK_API_URL = process.env.FLASK_API_URL || "http://127.0.0.1:5000/predict";

// Load Contract ABI dynamically
let contractABI;
try {
    const abiFile = fs.readFileSync(ABI_PATH);
    contractABI = JSON.parse(abiFile);
} catch (error) {
    console.error("Error loading contract ABI:", error.message);
    process.exit(1);
}

// Connect to Web3
const web3 = new Web3(JSON_RPC_URL);
const contract = new web3.eth.Contract(contractABI, CONTRACT_ADDRESS);

// Route: Assess Risk
app.post("/assess-insurance", async (req, res) => {
    try {
        const userDetails = req.body;

        // Validate user input
        if (!userDetails.age || !userDetails.income || !userDetails.property_value) {
            return res.status(400).send("Invalid user details provided.");
        }

        // Call Flask API for risk assessment
        const response = await axios.post(FLASK_API_URL, userDetails);
        const riskLevel = response.data.risk_level;

        // Return best policy based on risk level
        const bestPolicy = {
            name: `Policy for ${riskLevel} Risk`,
            riskLevel,
            premium: riskLevel === "High" ? 1000 : riskLevel === "Medium" ? 500 : 200,
            coverage: riskLevel === "High" ? 10000 : 5000,
        };
        res.json({ best_policy: bestPolicy });
    } catch (error) {
        console.error("Error assessing risk:", error.message);
        res.status(500).send("Failed to assess insurance.");
    }
});

// Route: Execute Transaction (Policy Purchase)
app.post("/execute-transaction", async (req, res) => {
    try {
        const { transaction } = req.body;

        // Validate transaction data
        if (!transaction.premium || !transaction.coverage || !transaction.riskLevel) {
            return res.status(400).send("Invalid transaction details.");
        }

        // Execute transaction on the blockchain
        const accounts = await web3.eth.getAccounts();
        const receipt = await contract.methods
            .createPolicy(transaction.premium, transaction.coverage, transaction.riskLevel)
            .send({
                from: accounts[0],
                value: web3.utils.toWei("0.01", "ether"), // Example payment
                gas: 3000000,
            });

        res.json({
            message: "Policy purchased successfully!",
            transactionHash: receipt.transactionHash,
        });
    } catch (error) {
        console.error("Error purchasing policy:", error.message);
        res.status(500).send("Failed to purchase policy.");
    }
});

// Health Check Endpoint
app.get("/health", (req, res) => {
    res.send("Server is running and healthy!");
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
});
