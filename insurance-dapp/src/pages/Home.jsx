import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import '../styles.css'; // Importing the CSS
import { Carousel } from 'react-responsive-carousel'; // Importing a carousel component
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importing carousel styles

// Import images for the banner

import imageProduct4 from '../assets/image-product-4.jpg';

const Home = () => {
  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      {/* Full-Screen Scrolling Banner */}
      <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} style={{ height: '100%' }}>
        
        <div>
          <img src={imageProduct4} alt="Product 4" style={{ height: '100vh', objectFit: 'cover' }} />
        </div>
      </Carousel>

      {/* Overlay Content */}
      <Container maxWidth="md" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom style={{ color: 'white' }}>
          Welcome to InsuranceNFT
        </Typography>
        <Typography variant="h6" paragraph>
          Your decentralized solution for renters and homeowners insurance. Purchase policies securely and own them as NFTs.
        </Typography>
        <Box mt={4}>
          <Button
            variant="contained"
            className="primary-button"
            size="large"
            component={Link}
            to="/login"
            style={{ marginRight: "1rem" }}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            className="outline-button"
            size="large"
            component={Link}
            to="/policies"
          >
            View Policies
          </Button>
        </Box>
      </Container>

      {/* About Section */}
      <Box mt={4} component="footer" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '20px', color: 'black' }}>
        <Typography variant="h5" gutterBottom>
          About Our Application
        </Typography>
        <Typography variant="body1" paragraph>
          We aim to build a proof of concept for a system that combines artificial intelligence and blockchain technology to help users receive renters and homeowners insurance at reasonable rates. Our innovative approach utilizes AI to determine the optimal flat-fee rate for insurance seekers. 
          Additionally, our blockchain-based smart contracts facilitate quick and secure payment agreements. By leveraging blockchain technology, we can approve insurance claims and payouts within minutes, rather than days. 
          Users will receive an NFT token for a specified period, which can be used to claim insurance at a designated address.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Policies
        </Typography>
        <Typography variant="body2" paragraph>
          Please review our policies regarding data privacy, user agreements, and claims processing.
        </Typography>
      </Box>
    </div>
  );
};

export default Home;
