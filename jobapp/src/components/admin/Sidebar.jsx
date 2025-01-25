import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Typography, Button, Collapse, List, ListItemButton, ListItemText } from "@mui/material"

const Sidebar = () => {
  const navigate = useNavigate()
  const [openManageJobs, setOpenManageJobs] = useState(false) 

  const handleToggle = () => {
    setOpenManageJobs((prev) => !prev)
  }

  return (
    <Box
      sx={{
        width: "260px",
        backgroundColor: "#1E2A39",
        color: "#FFFFFF",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{
          textAlign: "center",
          color: "#FFFFFF",
          borderBottom: "1px solid #2F3E4D",
          paddingBottom: "10px",
          marginBottom: "30px",
        }}
        onClick={() => navigate("/admin-dashboard")}
      >
        Admin Dashboard
      </Typography>

      <Box display="flex" flexDirection="column" gap={2} flex={1}>
        <List component="nav">
          <ListItemButton
            onClick={handleToggle}
            sx={{
              color: "#FFFFFF",
              justifyContent: "flex-start",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#2F3E4D",
              },
            }}
          >
            <ListItemText
              primary="Manage Jobs"
              primaryTypographyProps={{
                fontWeight: "bold",
                fontSize: "16px",
                fontFamily: "Roboto, sans-serif",
              }}
            />
          </ListItemButton>
          <Collapse in={openManageJobs} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{
                  pl: 4, 
                  color: "#FFFFFF",
                  "&:hover": {
                    backgroundColor: "#2F3E4D",
                  },
                }}
                onClick={() => navigate("/add-jobs")}
              >
                <ListItemText
                  primary="Add New Job"
                  primaryTypographyProps={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    fontFamily: "Roboto, sans-serif",
                  }}
                />
              </ListItemButton>
              <ListItemButton
                sx={{
                  pl: 4, 
                  color: "#FFFFFF",
                  "&:hover": {
                    backgroundColor: "#2F3E4D",
                  },
                }}
                onClick={() => navigate("/manage-jobs")}
              >
                <ListItemText
                  primary="Update/Delete Job"
                  primaryTypographyProps={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    fontFamily: "Roboto, sans-serif",
                  }}
                />
              </ListItemButton>
            </List>
          </Collapse>
        </List>

        {/* View Applications Button */}
        <Button
          variant="text"
          sx={{
            color: "#FFFFFF",
            justifyContent: "flex-start",
            fontWeight: "bold",
            textTransform: "none",
            fontSize: "16px",
            fontFamily: "Roboto, sans-serif",
            "&:hover": {
              backgroundColor: "#2F3E4D",
            },
          }}
          onClick={() => navigate("/view-user-applications")}
        >
          View Applications
        </Button>
      </Box>

      <Button
        variant="contained"
        sx={{
          backgroundColor: "#FF705A",
          color: "#FFFFFF",
          textTransform: "none",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#FF866E",
          },
        }}
        onClick={() => navigate("/")}
      >
        Logout
      </Button>
    </Box>
  )
}

export default Sidebar
