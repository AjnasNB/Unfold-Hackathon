import React, { createContext, useState, useContext } from "react";

// Create AuthContext
const AuthContext = createContext();

// AuthContext Provider
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to Use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
