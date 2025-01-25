import React from "react"
import { useNavigate } from "react-router-dom"
import { Box, AppBar, Toolbar, Typography, Card, CardContent } from "@mui/material"
import Sidebar from "./Sidebar"
import WorkOutlineIcon from "@mui/icons-material/WorkOutline" 
import InsertChartIcon from "@mui/icons-material/InsertChart" 
import backgroundImage from "../../assets/dashboard.jpg"

const UserDashboard = () => {
    const navigate = useNavigate()
  return (
    <Box 
    display="flex" 
    height="100vh" 
    style={{
      backgroundColor: "#F0F4F8" 
    }}  
    >
 
      <Sidebar />

      <Box flex={1}>
        <AppBar position="static" sx={{ backgroundColor: "#1E2A39", boxShadow: "none" }}>
          <Toolbar>
            <Typography variant="h6" fontWeight="bold" color="#FFFFFF" sx={{ flexGrow: 1 }}>
              User Dashboard
            </Typography>
          </Toolbar>
        </AppBar>

        <Box p={4}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={4}
            mb={4}
            sx={{
              borderRadius: "12px",
              backgroundColor: "#FFFFFF",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)", 
            }}
          >
            <Box>
              <Typography variant="h4" fontWeight="bold" color="#2A2A2A" gutterBottom>
                Welcome Back!
              </Typography>
              <Typography variant="body1" color="#8A8A8A">
                Manage your job applications, track your stats, and explore exciting new opportunities.
              </Typography>
            </Box>
            <Box
              sx={{
                width: "150px",
                height: "150px",
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                borderRadius: "50%",
              }}
            />
          </Box>

         
          <Box display="flex" gap={4} flexWrap="wrap" justifyContent="space-around">
      
            <Card
               sx={{
                width: "300px",
                cursor: "pointer",
                backgroundColor: "#FFFFFF",
                boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
                borderRadius: "12px",
                "&:hover": {
                  transform: "translateY(-5px)",
                  transition: "0.3s",
                },
              }}
              onClick={() => navigate("/browse-jobs")}
            >
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <WorkOutlineIcon sx={{ fontSize: 40, color: "#4A90E2" }} />
                  <Typography variant="h6" fontWeight="bold" color="#2A2A2A">
                    Active Jobs
                  </Typography>
                </Box>
                <Typography variant="body2" color="#8A8A8A" mt={1}>
                  Explore over 120 new job openings.
                </Typography>
              </CardContent>
            </Card>

            <Card
              sx={{
                width: "300px",
                borderRadius: "12px",
                backgroundColor: "#FAFBFD",
                boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
                padding: "16px",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-5px)",
                  transition: "0.3s",
                  boxShadow: "0 12px 20px rgba(0, 0, 0, 0.2)", 
                },
              }}
              onClick={() => navigate("/applied-jobs")}
            >
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <InsertChartIcon sx={{ fontSize: 40, color: "#FF705A" }} />
                  <Typography variant="h6" fontWeight="bold" color="#2A2A2A">
                    Application Stats
                  </Typography>
                </Box>
                <Typography variant="body2" color="#8A8A8A" mt={1}>
                  View your job application success rate.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default UserDashboard
