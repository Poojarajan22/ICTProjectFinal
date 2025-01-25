import React from "react"
import { Container, Typography, Box, Button } from "@mui/material"
import './Home.css'

const Home = () => {
  return (
    <Box className="home-container">
      <Box className="overlay">
        <Container maxWidth="md" className="home-content">
          <Typography variant="h3" className="title">
            It's Easy to Find Your Dream Job
          </Typography>
          <Typography variant="body1" className="subtitle">
            The perfect job is just a step away. Let us help you find your match!
          </Typography>
          <Button
            variant="contained"
            className="cta-button"
            href="/jobs"
          >
            Get Started
          </Button>
        </Container>
      </Box>
    </Box>
  )
}

export default Home
