import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles.css'; // Importing the CSS

const Dashboard = ({ authToken }) => {
  const [portfolio, setPortfolio] = useState(null);
  const [nftHash, setNftHash] = useState("");

  const fetchPortfolio = async () => {
    try {
      const response = await axios.get("http://localhost:3001/portfolio", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setPortfolio(response.data);
    } catch (error) {
      alert("Error fetching portfolio.");
    }
  };

  useEffect(() => {
    fetchPortfolio();
    const randomHash = `0x${Math.random().toString(16).slice(2, 18)}`;
    setNftHash(randomHash);
  }, []);

  return (
    <div className="container">
      <h1>User Dashboard</h1>
      {portfolio && (
        <div>
          <h2>Portfolio:</h2>
          <div className="portfolio-card">
            <h3>Elite Homeowner's Insurance</h3>
            <p><strong>Coverage:</strong> Property damage, liability, theft</p>
            <p><strong>Premium:</strong> 60 ether</p>
            <p><strong>Payout:</strong> 150000</p>
            <p><strong>Eligibility:</strong> Income  500000, Age = 20</p>
            <p><strong>Details:</strong> This policy covers various risks associated with homeownership.</p>
          </div>
          <pre>{JSON.stringify(portfolio, null, 2)}</pre>
        </div>
      )}
      <div className="nft-card">
        <h2>NFT Metadata:</h2>
        <p><strong>NFT Hash:</strong> {nftHash}</p>
      </div>
    </div>
  );
};

export default Dashboard;
