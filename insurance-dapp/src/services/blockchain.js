import axios from "axios";

const OKTO_API_URL = "https://sandbox-api.okto.tech/api/v1";
const CONTRACT_ADDRESS = "0x037E960c64a5d37614a204fB6a27620Bc8076A4b"; // Replace with your smart contract address
let authToken = null; // Token will be set after login

// Set the Okto auth token
export const setAuthToken = (token) => {
  authToken = token;
};

// Create Wallet
export const createWallet = async () => {
  try {
    const response = await axios.post(
      `${OKTO_API_URL}/wallet`,
      null,
      { headers: { Authorization: `Bearer ${authToken}` } }
    );
    return response.data.data.wallets[0].address; // Return the wallet address
  } catch (error) {
    console.error("Error creating wallet:", error.response.data);
    throw error;
  }
};

// Store User Info on Smart Contract
export const storeUserInfo = async (walletAddress, name, age, income) => {
  try {
    const transaction = {
      from: walletAddress,
      to: CONTRACT_ADDRESS,
      data: `<compiled_storeUserInfo_function_with_encoded_arguments>`,
      value: "0x0", // No Ether required for storing info
    };

    const response = await axios.post(
      `${OKTO_API_URL}/rawtransaction/execute`,
      { network_name: "SEPOLIA", transaction },
      { headers: { Authorization: `Bearer ${authToken}` } }
    );
    return response.data.data.jobId; // Return transaction job ID
  } catch (error) {
    console.error("Error storing user info:", error.response.data);
    throw error;
  }
};

// Fetch Wallet Details
export const getWallets = async () => {
  try {
    const response = await axios.get(`${OKTO_API_URL}/wallet`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data.data.wallets;
  } catch (error) {
    console.error("Error fetching wallets:", error.response.data);
    throw error;
  }
};

// Purchase Policy
export const purchasePolicy = async (walletAddress, policyId, premium) => {
  try {
    const transaction = {
      from: walletAddress,
      to: CONTRACT_ADDRESS,
      data: `<compiled_purchasePolicy_function_with_encoded_arguments>`,
      value: premium, // Send premium amount in Wei
    };

    const response = await axios.post(
      `${OKTO_API_URL}/rawtransaction/execute`,
      { network_name: "SEPOLIA", transaction },
      { headers: { Authorization: `Bearer ${authToken}` } }
    );
    return response.data.data.jobId; // Return transaction job ID
  } catch (error) {
    console.error("Error purchasing policy:", error.response.data);
    throw error;
  }
};
