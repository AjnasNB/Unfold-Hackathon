import React, { useState, useEffect } from "react";
import { validatePolicy } from "../services/blockchain";
import { Container, Typography, List, ListItem, ListItemText } from "@mui/material";

const NFTDetails = () => {
  const [policies, setPolicies] = useState([]);
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchPolicies = async () => {
      if (!window.ethereum) {
        alert("MetaMask not detected!");
        return;
      }

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const userAddress = accounts[0];
      setAddress(userAddress);

      const isValid = await validatePolicy(userAddress);
      if (isValid) {
        // Assuming all NFTs represent policies owned by the user
        setPolicies([
          { name: "Basic Renter's Insurance", coverage: "Property damage", payout: "50000" },
          { name: "Premium Renter's Insurance", coverage: "Natural disasters", payout: "100000" },
        ]);
      }
    };

    fetchPolicies();
  }, []);

  return (
    <Container>
      <Typography variant="h4">My Policies</Typography>
      <Typography variant="subtitle1">Wallet: {address}</Typography>
      {policies.length > 0 ? (
        <List>
          {policies.map((policy, index) => (
            <ListItem key={index}>
              <ListItemText primary={policy.name} secondary={`Coverage: ${policy.coverage}, Payout: ${policy.payout}`} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No policies found or wallet not connected.</Typography>
      )}
    </Container>
  );
};

export default NFTDetails;
