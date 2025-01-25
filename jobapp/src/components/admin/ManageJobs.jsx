import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Sidebar from "./Sidebar"
import {
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Card,
  CardContent,
  Grid,
} from "@mui/material"

const ManageJobs = () => {
  const [jobs, setJobs] = useState([])
  const navigate = useNavigate()

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:3005/view")
      setJobs(response.data)
    } catch (error) {
      console.error("Failed to fetch jobs", error)
    }
  };

  useEffect(() => {
    fetchJobs()
  }, [])

  const handleDeleteJob = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3005/remove/${id}`)
      alert(response.data.message)
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id))
    } catch (error) {
      console.error("Failed to delete job", error)
    }
  }

  const handleUpdateJob = (job) => {
    navigate("/add-jobs", { state: { job } })
  }

  return (
    <Box display="flex" height="100vh" sx={{ backgroundColor: "#F0F4F8" }}>
      <Sidebar />
      <Box flex={1} display="flex" flexDirection="column">
        <AppBar
          position="sticky" 
          sx={{
            backgroundColor: "#1E2A39",
            height: "64px",
            boxShadow: "none",
          }}
        >
          <Toolbar>
            <Typography variant="h6" fontWeight="bold" color="#FFFFFF">
            Available Jobs
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          flex={1}
          p={4}
          overflow="auto" 
          sx={{
            marginTop: "16px",
          }}
        >
          <Typography variant="h4" fontWeight="bold" color="#2A2A2A" mb={4}>
            
          </Typography>
          <Grid container spacing={4} alignItems="flex-start">
            {jobs.length === 0 ? (
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  style={{
                    textAlign: "center",
                    color: "#666666",
                  }}
                >
                  No jobs available.
                </Typography>
              </Grid>
            ) : (
              jobs.map((job) => (
                <Grid item xs={12} sm={6} md={4} key={job._id}>
                  <Card
                    sx={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: "8px",
                      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between", 
                      height: "100%", 
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" fontWeight="bold">
                        {job.title}
                      </Typography>
                      <Typography variant="body2" color="#666666" mb={2}>
                        {job.description}
                      </Typography>
                      <Typography variant="body2" color="#333333">
                        <strong>Requirements:</strong> {job.requirements}
                      </Typography>
                      <Typography variant="body2" color="#333333">
                        <strong>Location:</strong> {job.location}
                      </Typography>
                      <Typography variant="body2" color="#333333">
                        <strong>Salary:</strong> ${job.salary}
                      </Typography>
                      <Typography variant="body2" color="#333333" mb={2}>
                        <strong>Job Type:</strong> {job.jobType}
                      </Typography>
                    </CardContent>
                    <Box display="flex" justifyContent="space-between" p={2}>
                      <Button
                        onClick={() => handleUpdateJob(job)}
                        sx={{
                          backgroundColor: "#1E2A39",
                          color: "#fff",
                          fontSize: "14px",
                          padding: "6px 12px",
                          "&:hover": {
                            backgroundColor: "#2F3E4D",
                          },
                        }}
                      >
                        Update
                      </Button>
                      <Button
                        onClick={() => handleDeleteJob(job._id)}
                        sx={{
                          backgroundColor: "#FF5722",
                          color: "#fff",
                          fontSize: "14px",
                          padding: "6px 12px",
                          "&:hover": {
                            backgroundColor: "#FF8873",
                          },
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}

export default ManageJobs
