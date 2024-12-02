const axios = require('axios');
const Web3 = require('web3');

// Connect to Nethermind
const web3 = new Web3('http://127.0.0.1:8545'); // Nethermind RPC endpoint

const contractABI = [ /* ABI from Remix */ ];
const contractAddress = '0x7D3dd01Fbbb3cDf333D0A8C59EF82dd097266a35';
const contract = new web3.eth.Contract(contractABI, contractAddress);

async function createPolicy(age, income, propertyValue) {
    try {
        // Call AI API for risk level prediction
        const response = await axios.post('http://127.0.0.1:5000/predict', {
            age: age,
            income: income,
            property_value: propertyValue
        });
        const riskLevel = response.data.risk_level;

        // Calculate premium and coverage based on risk level
        const premium = riskLevel === 'High' ? 1000 : riskLevel === 'Medium' ? 500 : 200;
        const coverageAmount = 10000;

        // Interact with smart contract to create a policy
        const accounts = await web3.eth.getAccounts();
        await contract.methods.createPolicy(premium, coverageAmount, riskLevel).send({
            from: accounts[0],
            gas: 3000000
        });

        console.log(`Policy created for risk level: ${riskLevel}`);
    } catch (error) {
        console.error('Error creating policy:', error.message);
    }
}

// Example usage
createPolicy(30, 50000, 200000);
