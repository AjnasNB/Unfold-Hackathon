const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Okto API Config
const OKTO_API_URL = "https://sandbox-api.okto.tech/api/v1";
const OKTO_API_KEY = "c2bde77f-b37f-49b7-a1cb-43d3cde726c4";
let authToken = null;

// Send Email OTP
app.post("/send-email-otp", async (req, res) => {
  const { email } = req.body;
  try {
    const response = await axios.post(
      `${OKTO_API_URL}/authenticate/email`,
      { email },
      {
        headers: { "X-Api-Key": OKTO_API_KEY, "Content-Type": "application/json" },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.response.data });
  }
});

// Verify Email OTP
app.post("/verify-email-otp", async (req, res) => {
  const { email, otp, token } = req.body;
  try {
    const response = await axios.post(
      `${OKTO_API_URL}/authenticate/email/verify`,
      { email, otp, token },
      {
        headers: { "X-Api-Key": OKTO_API_KEY, "Content-Type": "application/json" },
      }
    );
    authToken = response.data.data.auth_token;
    console.log(response)
    console.log(authToken)
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.response.data });
  }
});

// Create Wallet
// Modify your create-wallet endpoint to directly store and return wallet info
app.post("/create-wallet", async (req, res) => {
    try {
      // Validate that an auth token is available
      if (!authToken) {
        console.error("Auth token is not set or invalid");
        return res.status(401).json({ error: "User not authenticated. Please log in again." });
      }
  
      console.log("Auth token in create-wallet:", authToken);
  
      // Make the API request to create a wallet
      const response = await axios.post(`${OKTO_API_URL}/wallet`, null, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
  
      // Parse and validate the response from Okto
      if (response.status === 201 && response.data.status === "success") {
        const wallet = response.data.data.wallets[0];
  
        console.log("Wallet created successfully:", wallet);
  
        // Return the wallet details to the client
        res.status(201).json({
          status: "success",
          wallet_address: wallet.address,
          network: wallet.network_name,
        });
      } else {
        console.error("Unexpected response from Okto API:", response.data);
        res.status(400).json({ error: "Unexpected response from Okto API." });
      }
    } catch (error) {
      // Log the error details
      console.error("Error creating wallet:", error.response?.data || error.message);
  
      // Return a detailed error response
      res.status(400).json({
        error: error.response?.data || "Failed to create wallet. Please try again later.",
      });
    }
  });
  
  
  

// Fetch Wallets
app.get("/wallets", async (req, res) => {
  try {
    const response = await axios.get(`${OKTO_API_URL}/wallet`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.response.data });
  }
});

// Execute Raw Transaction
app.post("/execute-transaction", async (req, res) => {
  const { network_name, transaction } = req.body;
  try {
    const response = await axios.post(
      `${OKTO_API_URL}/rawtransaction/execute`,
      { network_name, transaction },
      {
        headers: { Authorization: `Bearer ${authToken}`, "Content-Type": "application/json" },
      }
    );
    res.status(201).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.response.data });
  }
});

// Transfer NFT
app.post("/transfer-nft", async (req, res) => {
  const { operation_type, network_name, collection_address, recipient_address, nft_address } = req.body;
  try {
    const response = await axios.post(
      `${OKTO_API_URL}/nft/transfer`,
      { operation_type, network_name, collection_address, recipient_address, nft_address },
      {
        headers: { Authorization: `Bearer ${authToken}`, "Content-Type": "application/json" },
      }
    );
    res.status(201).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.response.data });
  }
});

// Get Portfolio
app.get("/portfolio", async (req, res) => {
  try {
    const response = await axios.get(`${OKTO_API_URL}/portfolio`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.response.data });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
