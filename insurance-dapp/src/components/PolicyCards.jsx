import React from "react";

const PolicyCards = ({ policies, onFindBestPolicy }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {policies.map((policy, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            margin: "1rem",
            padding: "1rem",
            width: "300px",
            textAlign: "left",
          }}
        >
          <h3>{policy.name}</h3>
          <p>Coverage: {policy.coverage}</p>
          <p>Premium: {policy.premium}</p>
          <p>Payout: {policy.payout}</p>
        </div>
      ))}
      <button onClick={onFindBestPolicy} style={{ margin: "1rem", padding: "0.5rem 1rem" }}>
        Find Best Insurance for Me
      </button>
    </div>
  );
};

export default PolicyCards;
