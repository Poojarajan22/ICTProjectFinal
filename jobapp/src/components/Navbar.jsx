import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#1E2A39",
          padding: "10px 0",
          margin: 0,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              fontSize: "1.8rem",
              color: "#ffffff",
              letterSpacing: "1px",
            }}
          >
            <b>Job Portal</b>
          </Typography>

          <Link to="/" style={{ textDecoration: "none" }}>
            <Button
              variant="text"
              sx={{
                color: "#FFFFFF",
                borderRadius: "8px",
                padding: "10px 20px",
                margin: "0 10px",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#2F3E4D",
                },
              }}
            >
              Home
            </Button>
          </Link>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button
              variant="text"
              sx={{
                color: "#FFFFFF",
                borderRadius: "8px",
                padding: "10px 20px",
                margin: "0 10px",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#2F3E4D",
                },
              }}
            >
              Login
            </Button>
          </Link>
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <Button
              variant="text"
              sx={{
                color: "#FFFFFF",
                borderRadius: "8px",
                padding: "10px 20px",
                margin: "0 10px",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#2F3E4D",
                },
              }}
            >
              Signup
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
