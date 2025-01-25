import React, { useState, useEffect } from "react"
import SearchIcon from "@mui/icons-material/Search"
import axios from "axios"
import {Box,Typography,Paper,InputBase,Grid,Card,CardContent,Button,FormControl,Select } from "@mui/material"
import { useNavigate } from "react-router-dom"

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [locationFilter, setLocationFilter] = useState("")
  const [salaryFilter, setSalaryFilter] = useState("")
  const [jobTypeFilter, setJobTypeFilter] = useState("")
  const navigate = useNavigate()
  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:3005/view")
      setJobs(response.data)
    } catch (error) {
      console.error("Failed to fetch jobs", error)
    }
  };


  const handleNavigation = () => {
    navigate("/login")
  };

  useEffect(() => {
    fetchJobs()
  }, [])
  useEffect(() => {
    const filtered = jobs.filter((job) => {
      const matchesSearch = job.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      const matchesLocation = locationFilter
        ? job.location.toLowerCase().includes(locationFilter.toLowerCase())
        : true
      const matchesSalary = salaryFilter
        ? (() => {
            if (salaryFilter.includes("-")) {
              const [min, max] = salaryFilter.split("-").map(Number)
              return job.salary >= min && job.salary <= max
            } else if (salaryFilter === "above 40000") {
              return job.salary > 40000
            }
            return true
          })()
        : true
      const matchesJobType = jobTypeFilter
        ? job.jobType.toLowerCase() === jobTypeFilter.toLowerCase()
        : true

      return (
        matchesSearch && matchesLocation && matchesSalary && matchesJobType
      )
    })

    setFilteredJobs(filtered)
  }, [searchTerm, locationFilter, salaryFilter, jobTypeFilter, jobs])

  useEffect(() => {
    const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredJobs(filtered)
  }, [searchTerm, jobs])

 
  return (
    <Box
      display="flex"
      height="100vh"
      sx={{ backgroundColor: "#F0F4F8", overflow: "hidden" }}
    >
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        p={4}
        sx={{
          overflowY: "auto",
          maxHeight: "100vh",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          color="#1E2A39"
          mb={4}
          sx={{ textAlign: "left" }}
        >
          Browse Jobs
        </Typography>

        <Paper
          elevation={3}
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "8px 16px",
            borderRadius: "30px",
            maxWidth: "600px",
            width: "100%",
            backgroundColor: "#FFFFFF",
            mb: 4,
          }}
        >
          <SearchIcon sx={{ color: "#ff705a", mr: 2 }} />
          <InputBase
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              flex: 1,
              fontSize: "1rem",
              color: "#333",
              "&::placeholder": {
                color: "#999",
              },
            }}
          />
        </Paper>

        <Box display="flex" gap={2} mb={4}>
          <Typography variant="body1" fontWeight="bold" color="#1E2A39">Filter by Location</Typography>
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              width: "200px",
              backgroundColor: "#FFFFFF",
            }}
          >
            <option value="">all</option>
            <option value="kerala">kerala</option>
            <option value="TamilNadu">TamilNadu</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Rajasthan">Rajasthan</option>
          </select>
          <Typography variant="body1" fontWeight="bold" color="#1E2A39">Filter by Salary</Typography>
          <select
            value={salaryFilter}
            onChange={(e) => setSalaryFilter(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              width: "200px",
              backgroundColor: "#FFFFFF"
            }}
            
          >
            <option value="">all</option>
            <option value="10000-20000">10000-20000</option>
            <option value="20000-30000">20000-30000</option>
            <option value="30000-40000">30000-40000</option>
            <option value="above 40000">above 40000</option>
          </select>
          <Typography variant="body1" fontWeight="bold" color="#1E2A39">Filter by Job Type</Typography>
          <select
            value={jobTypeFilter}
            onChange={(e) => setJobTypeFilter(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              width: "200px",
              backgroundColor: "#FFFFFF",
            }}
          >
            <option value="">all</option>
            <option value="full time">Full Time</option>
            <option value="part time">Part Time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
        </Box>

        <Grid container spacing={4}>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
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
                    <Typography variant="h6" fontWeight="bold" color="#1E2A39">
                      {job.title}
                    </Typography>
                    <Typography variant="body2" color="#666">
                      <strong style={{ color: "#ff705a" }}>Description:</strong>{" "}
                      {job.description}
                    </Typography>
                    <Typography variant="body2" color="#666">
                      <strong style={{ color: "#ff705a" }}>
                        Requirements:
                      </strong>{" "}
                      {job.requirements}
                    </Typography>
                    <Typography variant="body2" color="#666">
                      <strong style={{ color: "#ff705a" }}>Location:</strong>{" "}
                      {job.location}
                    </Typography>
                    <Typography variant="body2" color="#666">
                      <strong style={{ color: "#ff705a" }}>Salary:</strong> $
                      {job.salary}
                    </Typography>
                    <Typography variant="body2" color="#666">
                      <strong style={{ color: "#ff705a" }}>Job Type:</strong>{" "}
                      {job.jobType}
                    </Typography>
                  </CardContent>
                  <Box display="flex" p={2} justifyContent="flex-end">
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#ff705a",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "#ff8873",
                        },
                      }}
                      onClick={handleNavigation}
                    >
                      Apply
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography color="#666">No jobs found</Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  )
}
export default Jobs







