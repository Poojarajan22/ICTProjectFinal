import React, { useState, useEffect } from "react"
import Sidebar from "./Sidebar"
import { Box, Typography, Paper, CircularProgress, Alert, Grid, Card, CardContent, Button, } from "@mui/material"
import axios from "axios"
import { Link } from "react-router-dom"

const ViewUserApplications = () => {
  const [appliedJobs, setAppliedJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
        )
        setAppliedJobs(jobsWithDetails)
      } catch (error) {
        console.error("Error fetching applied jobs:", error)
        setError("Failed to fetch applied jobs.")
      } finally {
        setLoading(false)
      }
    }

    fetchAppliedJobs()
  }, [])

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Alert severity="error">{error}</Alert>
      </Box>
    )
  }

  return (
    <Box display="flex" height="100vh" sx={{ backgroundColor: "#F0F4F8", overflow: "hidden" }}>
      <Sidebar />
      <Box flex={1} display="flex" flexDirection="column" p={4} sx={{ overflowY: "auto", maxHeight: "100vh" }}>
        <Typography variant="h4" fontWeight="bold" color="#1E2A39" mb={4} sx={{ textAlign: "left" }}>
          View User Applications
        </Typography>
        <Grid container spacing={4}>
          {appliedJobs.length === 0 ? (
            <Typography variant="body1" color="#666" sx={{ textAlign: "center", width: "100%" }}>
              No applications found.
            </Typography>
          ) : (
            appliedJobs.map((application) => (
              <Grid item xs={12} sm={6} md={4} key={application._id}>
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
                    <Typography variant="h6" fontWeight="bold" color="#1E2A39">
                      {application.jobDetails ? application.jobDetails.title : "Job Title Not Found"}
                    </Typography>
                    <Typography variant="body2" color="#666" gutterBottom>
                      <strong>Description:</strong> {application.jobDetails ? application.jobDetails.description : "N/A"}
                    </Typography>
                    <Typography variant="body2" color="#666">
                      <strong>Email:</strong> {application.email}
                    </Typography>
                    <Typography variant="body2" color="#666">
                      <strong>LinkedIn:</strong> {application.linkedInUrl}
                    </Typography>
                    <Button variant="outlined" color="primary" startIcon={<Link />}
                      href={`http://localhost:3005/${application.cvUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        textTransform: "none",
                        fontWeight: "bold",
                        borderRadius: "8px",
                        mt: 2,
                        borderColor: "#1E2A39",
                        color: "#1E2A39",
                      }}
                    >View CV </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Box>
  )
}

export default ViewUserApplications
