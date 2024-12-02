import React, { useState } from "react";
import axios from "axios";
import CenteredContainer from "./CenteredContainer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpToken, setOtpToken] = useState(null);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState("");

  const sendOTP = async () => {
    setError(""); // Clear previous errors
    try {
      const response = await axios.post("http://localhost:3001/send-email-otp", { email });
      setOtpToken(response.data.data.token); // Store OTP token
      setIsOtpSent(true); // Set flag to true after OTP is sent
      alert("OTP sent to your email.");
    } catch (error) {
      setError("Error sending OTP. Please check the email and try again.");
    }
  };

  const handleVerifyOtp = async () => {
    setError(""); // Clear previous errors
    try {
      const response = await axios.post("http://localhost:3001/verify-email-otp", {
        email,
        otp,
        token: otpToken, // Pass the stored OTP token
      });

      // Store the auth token in localStorage for global access
      localStorage.setItem("authToken", response.data.data.auth_token);

      alert("Login successful!");
      window.location.href = "/create-wallet"; // Redirect to the dashboard
    } catch (error) {
      setError("Error verifying OTP. Please try again.");
    }
  };

  return (
    <CenteredContainer>
      <h1>Login</h1>
      <div>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            margin: "0.5rem",
            padding: "0.5rem",
            width: "80%",
          }}
          disabled={isOtpSent} // Disable email input after OTP is sent
        />
        <br />
        {!isOtpSent ? (
          <button
            onClick={sendOTP}
            style={{
              margin: "0.5rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Send OTP
          </button>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={{
                margin: "0.5rem",
                padding: "0.5rem",
                width: "80%",
              }}
            />
            <br />
            <button
              onClick={handleVerifyOtp}
              style={{
                margin: "0.5rem",
                padding: "0.5rem 1rem",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Verify OTP
            </button>
          </>
        )}
        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      </div>
    </CenteredContainer>
  );
};

export default Login;
