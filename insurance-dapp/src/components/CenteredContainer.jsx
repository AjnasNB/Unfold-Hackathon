import React from "react";

const CenteredContainer = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      {children}
    </div>
  );
};

export default CenteredContainer;
