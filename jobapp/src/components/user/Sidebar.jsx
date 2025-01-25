import { Button, Drawer, Box, Typography } from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom"

const Sidebar = () => {
  const navigate = useNavigate()

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: "260px",
        [`& .MuiDrawer-paper`]: {
          width: "260px",
          boxSizing: "border-box",
          backgroundColor: "#1E2A39",
          color: "#FFFFFF",
        },
      }}
    >
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          py: 3,
          fontWeight: "bold",
          borderBottom: "1px solid #2F3E4D",
          cursor: "pointer", 
        }}
        onClick={() => navigate("/user-dashboard")} 
      >
        User Dashboard
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 3,
          gap: 2,
          flex: 1,
        }}
      >
        <Button
          variant="text"
          fullWidth
          sx={{
            color: "#FFFFFF",
            fontWeight: "bold",
            justifyContent: "flex-start",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#2F3E4D",
            },
          }}
          onClick={() => navigate("/browse-jobs")}
        >
          Browse Jobs
        </Button>

        <Button
                  variant="text"
                  sx={{
                    color: "#FFFFFF",
                    justifyContent: "flex-start",
                    fontWeight: "bold",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#2F3E4D",
                    },
                  }}
                  onClick={() => navigate("/applied-jobs")}
                >
                  Applied Jobs
                </Button>
      </Box>

      <Box sx={{ p: 3 }}>
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#FF705A",
            color: "#FFFFFF",
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#FF866E",
            },
          }}
          onClick={() => {
            alert("Logged out successfully!")
            navigate("/")
          }}
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  )
}

export default Sidebar
