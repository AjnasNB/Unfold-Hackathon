import axios from 'axios';

const BASE_URL = 'http://localhost:8000'; // Replace with your Agoric backend URL

export const initiateTransaction = async ({ chainId, recipient, amount, token }) => {
  try {
    if (!chainId || !recipient || !amount || !token) {
      throw new Error('Missing required parameters');
    }
    const response = await axios.post(`${BASE_URL}/transaction/initiate`, {
      chainId,
      recipient,
      amount,
      token,
    });
    return response.data;
  } catch (error) {
    console.error('Contract Service Error:', error.message);
    throw error;
  }
};
