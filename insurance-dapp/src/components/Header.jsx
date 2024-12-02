import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import '../styles.css'; // Importing the CSS for consistent styling

const Header = () => {
  return (
    <AppBar position="fixed" style={{ width: '100%' }}> {/* Ensure full width */}
      <Toolbar style={{ minHeight: '64px' }}> {/* Set a consistent height */}
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          InsuranceNFT
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
        <Button color="inherit" component={Link} to="/create-wallet">
          Create Wallet
        </Button>
        <Button color="inherit" component={Link} to="/policies">
          Policies
        </Button>
        <Button color="inherit" component={Link} to="/dashboard">
          Dashboard
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
