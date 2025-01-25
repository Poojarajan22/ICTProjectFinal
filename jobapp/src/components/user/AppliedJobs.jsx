import React, { useState, useEffect } from "react"
import axios from "axios";
import Sidebar from "./Sidebar"
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material"

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)


  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3005/removeApplied/${id}`)
      alert(response.data.message)
      setAppliedJobs((prevJobs) => prevJobs.filter((application) => application._id !== id))
    } catch (error) {
      console.error("Failed to delete job", error)
    }
  }


  const fetchJobDetails = async (jobId) => {
    try {
      const response = await axios.get(`http://localhost:3005/viewJobs/${jobId}`)
      return response.data
    } catch (error) {
      console.error("Error fetching job details:", error)
      return null
    }
  }

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get("http://localhost:3005/viewjobs")
        const jobsWithDetails = await Promise.all(
          response.data.map(async (application) => {
            const jobDetails = await fetchJobDetails(application.jobId)
            return { ...application, jobDetails }
          })
        );
        setAppliedJobs(jobsWithDetails)
      } catch (error) {
        console.error("Error fetching applied jobs:", error)
        setError("Failed to fetch applied jobs.")
      } finally {
        setLoading(false)
      }
    };

    fetchAppliedJobs()
  }, [])

  return (
    <Box display="flex" height="100vh" bgcolor="#F0F4F8">
      <Sidebar />
      <Box flex={1} display="flex" flexDirection="column">
        <AppBar
          position="fixed"
          sx={{ backgroundColor: "#1E2A39", boxShadow: "none" }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              fontWeight="bold"
              color="#FFFFFF"
              sx={{ flexGrow: 1 }}
            >
              Applied Jobs
            </Typography>
          </Toolbar>
        </AppBar>


        <Box
          flex={1}
          mt="64px"
          padding={4}
          display="flex"
          flexDirection="column"
          gap={4}
        >
          <Typography variant="h5" fontWeight="bold" color="#1E2A39">
            View Your Job Applications
          </Typography>
          <Typography variant="body1" color="#333">
            Below are the jobs you have applied for. Manage your applications by
            deleting unwanted ones.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flex={1}
            >
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <Box
              display="grid"
              gridTemplateColumns={{
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              }}
              gap={3}
            >
              {appliedJobs.length === 0 ? (
                <Typography variant="body1" color="#666">
                  No applications found.
                </Typography>
              ) : (
                appliedJobs.map((application) => (
                  <Paper
                    key={application._id}
                    elevation={3}
                    sx={{
                      padding: 2,
                      backgroundColor: "#FFFFFF",
                      borderRadius: 2,
                      color: "#1E2A39",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                      transition: "transform 0.3s",
                      "&:hover": {
                        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="#1E2A39"
                      sx={{ fontFamily: "Roboto, sans-serif" }}
                    >
                      {application.jobDetails ? application.jobDetails.title : "Job Title Not Found"}
                    </Typography>
                    <Typography variant="body2" color="#666"><strong style={{ color: "#ff705a" }}>Requirements:</strong> {application.jobDetails ? application.jobDetails.requirements : "N/A"}</Typography>
                    <Typography variant="body2" color="#666"><strong style={{ color: "#ff705a" }}>Description:</strong> {application.jobDetails ? application.jobDetails.description : "N/A"}</Typography>
                    <Typography variant="body2" color="#666"><strong style={{ color: "#ff705a" }}>Job Type:</strong> {application.jobDetails ? application.jobDetails.jobType : "N/A"}</Typography>
                    <Typography variant="body2" color="#666"><strong style={{ color: "#ff705a" }}>Location:</strong> {application.jobDetails ? application.jobDetails.location : "N/A"}</Typography>
                    <Typography variant="body2" color="#666"><strong style={{ color: "#ff705a" }}>Salary:</strong> {application.jobDetails ? application.jobDetails.salary : "N/A"}</Typography>

                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleDelete(application._id)}
                      sx={{
                        mt: 2,
                        backgroundColor: "#FF705A",
                        color: "#ffffff",
                        fontSize: "14px",
                        padding: "6px 12px",
                        "&:hover": {
                          backgroundColor: "#FF866E",
                        },
                      }}
                    >
                      Delete
                    </Button>
                  </Paper>
                ))
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AppliedJobs















