import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./components/Login";
import CreateWallet from "./components/CreateWallet";
import InsurancePage from "./pages/InsurancePages";
import PolicySelection from "./pages/PolicyPurchase";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const [authToken, setAuthToken] = useState(null);
  const [walletId, setWalletId] = useState(null);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setAuthToken={setAuthToken} />} />
        <Route
          path="/create-wallet"
          element={<CreateWallet authToken={authToken} setWalletId={setWalletId} />}
        />
        <Route
          path="/insurance"
          element={<InsurancePage walletId={walletId} />}
        />
        <Route
          path="/policies"
          element={<PolicySelection />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
      </Routes>
    </Router>
  );
};

export default App;
