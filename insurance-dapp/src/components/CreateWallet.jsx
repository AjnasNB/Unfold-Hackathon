import React, { useState } from "react";
import axios from "axios";
import CenteredContainer from "./CenteredContainer";
import { storeUserInfo } from "../services/blockchain";

const CreateWallet = ({ setWalletId }) => {
  const [loading, setLoading] = useState(false);
  const [walletData, setWalletData] = useState(null);

  const handleWalletCreation = async () => {
    setLoading(true); // Start loading
    try {
      // Simulate loading for 15 seconds
      setTimeout(() => {
        // Manually set wallet data after 15 seconds
        setWalletData({
          status: "success",
          data: {
            wallets: [
              {
                network_name: "Polygon",
                address: "0xdca7F8E25091B927DB769337d7eFDedBf772bb9A",
                success: true,
              },
            ],
          },
        });
        setLoading(false); // Stop loading
      }, 15000);
    } catch (error) {
      console.error("Error creating wallet:", error.message);
      alert("Error creating wallet. Please try again.");
      setLoading(false); // Stop loading on error
    }
  };

  return (
    <CenteredContainer>
      <h1>Create Wallet</h1>
      <button
        onClick={handleWalletCreation}
        style={{
          margin: "0.5rem",
          padding: "0.7rem",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
        }}
      >
        {loading ? "Loading..." : "Create Wallet"}
      </button>
      {loading && <p>Please wait...</p>}
      {walletData && (
        <div>
          <h2>Wallet Created Successfully!</h2>
          <p>Network: {walletData.data.wallets[0].network_name}</p>
          <p>Address: {walletData.data.wallets[0].address}</p>
        </div>
      )}
    </CenteredContainer>
  );
};

export default CreateWallet;
