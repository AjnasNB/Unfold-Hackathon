# Agoric Multi-Chain Backend

This project demonstrates a complete backend implementation for enabling multi-chain transactions using the Agoric SDK.

## Features
- Smart contract for cross-chain transactions.
- Backend for API interaction.
- Edge case handling and error management.

## Project Structure
- **contracts/**: Contains smart contract and deployment scripts.
- **backend/**: Express-based backend with routes, services, and utilities.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

### Run Instructions
1. Start the Agoric SDK:
   ```bash
   agoric start --reset
   ```
2. Deploy the smart contract:
   ```bash
   agoric deploy contracts/deploy.js
   ```
3. Start the backend server:
   ```bash
   node backend/index.js
   ```
4. Test the API using curl or Postman:
   ```bash
   curl -X POST http://localhost:8000/transaction/initiate \
     -H "Content-Type: application/json" \
     -d '{"chainId":"cosmoshub-4","recipient":"cosmos1xyz...","amount":1000,"token":"ATOM"}'
   ```

**Notes**
- Replace placeholders with actual values.
- Update `BASE_URL` in `contractService.js` with your Agoric backend URL.
