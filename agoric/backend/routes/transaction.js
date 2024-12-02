import express from 'express';
import { initiateTransaction } from '../services/contractService.js';

const router = express.Router();

router.post('/initiate', async (req, res) => {
  try {
    const { chainId, recipient, amount, token } = req.body;
    if (!chainId || !recipient || !amount || !token) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const result = await initiateTransaction({ chainId, recipient, amount, token });
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
