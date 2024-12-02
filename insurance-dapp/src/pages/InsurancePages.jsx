import React, { useState, useEffect } from "react";
import axios from "axios";
import PolicyCards from "../components/PolicyCards";

const InsurancePage = ({ walletId }) => {
  const [policies, setPolicies] = useState([]);
  const [bestPolicy, setBestPolicy] = useState(null);

  useEffect(() => {
    const fetchPolicies = async () => {
      const response = await axios.get("http://127.0.0.1:8001/list-insurances/");
      setPolicies(response.data.insurance_policies);
    };
    fetchPolicies();
  }, []);

  const findBestPolicy = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8001/assess-insurance/", {
        name: "User",
        age: 30,
        income: 50000,
      });
      setBestPolicy(response.data.best_policy);
    } catch (error) {
      alert("Error finding best policy.");
    }
  };

  return (
    <div>
      <PolicyCards policies={policies} onFindBestPolicy={findBestPolicy} />
      {bestPolicy && (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <h2>Best Policy: {bestPolicy.name}</h2>
        </div>
      )}
    </div>
  );
};

export default InsurancePage;
