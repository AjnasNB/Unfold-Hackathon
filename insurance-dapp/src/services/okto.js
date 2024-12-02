import axios from "axios";

const API_BASE_URL = "https://sandbox-api.okto.tech/api/v1";
const AUTH_TOKEN = "YOUR_OKTO_AUTH_TOKEN";

// Fetch wallets
export const fetchWallets = async () => {
  const response = await axios.get(`${API_BASE_URL}/wallet`, {
    headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
  });
  return response.data;
};

// Create wallet
export const createWallet = async () => {
  const response = await axios.post(`${API_BASE_URL}/wallet`, null, {
    headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
  });
  return response.data;
};
