import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

export const sendEmailOTP = async (email) => {
  const response = await axios.post(`${API_BASE_URL}/send-email-otp`, { email });
  return response.data;
};

export const verifyEmailOTP = async (email, otp, token) => {
  const response = await axios.post(`${API_BASE_URL}/verify-email-otp`, {
    email,
    otp,
    token,
  });
  return response.data;
};

export const fetchWallets = async () => {
  const response = await axios.get(`${API_BASE_URL}/wallets`);
  return response.data;
};

export const createWallet = async () => {
  const response = await axios.post(`${API_BASE_URL}/create-wallet`);
  return response.data;
};
