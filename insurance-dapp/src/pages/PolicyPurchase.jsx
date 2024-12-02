import React, { useState, useEffect } from "react";
import axios from "axios";
import PolicyList from "../components/PolicyList";
import "../styles.css";

const PolicySelection = ({ authToken }) => {
  const [policies, setPolicies] = useState([]);
  const [bestPolicy, setBestPolicy] = useState(null);
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  // Fetch policies
  const fetchPolicies = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8001/list-insurances/");
      setPolicies(response.data.insurance_policies);
    } catch (error) {
      alert("Error fetching policies.");
    }
  };

  // Assess the best policy
  const assessBestPolicy = async (userDetails) => {
    try {
      const response = await axios.post("http://127.0.0.1:3001/assess-insurance", userDetails);
      setBestPolicy(response.data.best_policy);
    } catch (error) {
      alert("Error assessing best policy.");
    }
  };

  // Purchase the policy
  const purchasePolicy = async (policy) => {
    try {
      const transaction = {
        premium: policy.premium,
        coverage: policy.coverage,
        riskLevel: policy.riskLevel
      };
      await axios.post("http://127.0.0.1:3001/execute-transaction", { transaction }, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      alert("Policy purchased successfully!");
    } catch (error) {
      alert("Error purchasing policy.");
    }
  };

  const handleSelectPolicy = (policy) => {
    setSelectedPolicy(policy);
    assessBestPolicy({ name: "John", age: 30, income: 50000 });
  };

  return (
    <div className="container" style={{ padding: "2rem", backgroundColor: "#f5f5f5" }}>
      <h1 style={{ textAlign: "center" }}>Insurance Policy Selection</h1>
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <button className="primary-button" onClick={fetchPolicies}>Fetch Policies</button>
      </div>
      {policies.length > 0 && (
        <PolicyList policies={policies} onSelectPolicy={handleSelectPolicy} />
      )}
      {bestPolicy && (
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <h2>Best Policy: {bestPolicy.name}</h2>
          <p>Premium: ${bestPolicy.premium}</p>
          <p>Coverage: ${bestPolicy.coverage}</p>
          <p>Risk Level: {bestPolicy.riskLevel}</p>
          <button className="primary-button" onClick={() => purchasePolicy(bestPolicy)}>Purchase Policy</button>
        </div>
      )}
    </div>
  );
};

export default PolicySelection;
