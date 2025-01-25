import React, { useState, useEffect } from "react"
import SearchIcon from "@mui/icons-material/Search"
import Sidebar from "./Sidebar"
import {
  Box,
  Typography,
  Paper,
  InputBase,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const BrowseJobs = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [savedJobs, setSavedJobs] = useState([])
  const [showSavedJobs, setShowSavedJobs] = useState(false)
  const [locationFilter, setLocationFilter] = useState("")
  const [salaryFilter, setSalaryFilter] = useState("")
  const [jobTypeFilter, setJobTypeFilter] = useState("")

  const navigate = useNavigate()

  const handleJobAppn = (jobId) => {
    navigate("/apply-job",{state: { jobId }})
  }

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:3005/view")
      setJobs(response.data)
    } catch (error) {
      console.error("Failed to fetch jobs", error)
    }
  }

  useEffect(() => {
    fetchJobs()
    const saved = JSON.parse(localStorage.getItem("savedJobs")) || []
    setSavedJobs(saved)
  }, [])

  useEffect(() => {
    const filtered = jobs.filter((job) => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase())
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

      return matchesSearch && matchesLocation && matchesSalary && matchesJobType
    })

    setFilteredJobs(filtered)
  }, [searchTerm, locationFilter, salaryFilter, jobTypeFilter, jobs])

  const toggleSave = (jobId) => {
    setSavedJobs((prevSavedJobs) => {
      let updatedSavedJobs
      if (prevSavedJobs.includes(jobId)) {
        updatedSavedJobs = prevSavedJobs.filter((id) => id !== jobId)
      } else {
        updatedSavedJobs = [...prevSavedJobs, jobId]
      }
      localStorage.setItem("savedJobs", JSON.stringify(updatedSavedJobs))
      return updatedSavedJobs
    })
  }

  const handleDisplaySavedJobs = () => {
    setShowSavedJobs(!showSavedJobs)
  }

  const displayedJobs = showSavedJobs
    ? filteredJobs.filter((job) => savedJobs.includes(job._id))
    : filteredJobs

  return (
    <Box display="flex" height="100vh" sx={{ backgroundColor: "#F0F4F8" ,overflow: "hidden"}}>
      <Sidebar />


      <Box flex={1} display="flex" flexDirection="column" p={4}
      sx={{
          overflowY: "auto", 
          maxHeight: "100vh",
        }}>
        <Typography variant="h4" fontWeight="bold" color="#1E2A39" mb={4} sx={{ textAlign: "left" }}>
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
          <Button
            onClick={handleDisplaySavedJobs}
            variant="contained"
            sx={{
              backgroundColor: "#ff705a",
              color: "#000",
              borderRadius: "10px",
              marginLeft: "10px",
              "&:hover": {
                backgroundColor: "#ff8873",
              },
            }}
          >
            {showSavedJobs ? "Show All Jobs" : "Show Saved Jobs"}
          </Button>
        </Paper>


        <Box display="flex" gap={2} mb={4}>
         <Typography color="#1E2A39">Filter by Location</Typography>
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
          <Typography color="#1E2A39">Filter by Salary</Typography>
                    <select
            value={salaryFilter}
            onChange={(e) => setSalaryFilter(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              width: "200px",
              backgroundColor: "#FFFFFF",
            }}
          >
            <option value="">all</option>
            <option value="10000-20000">10000-20000</option>
            <option value="20000-30000">20000-30000</option>
            <option value="30000-40000">30000-40000</option>
            <option value="above 40000">above 40000</option>
          </select>
          <Typography color="#1E2A39">Filter by Job Type</Typography>
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
          {displayedJobs.length > 0 ? (
            displayedJobs.map((job) => (
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
                      <strong style={{ color: "#ff705a" }}>Description:</strong> {job.description}
                    </Typography>
                    <Typography variant="body2" color="#666">
                      <strong style={{ color: "#ff705a" }}>Requirements:</strong> {job.requirements}
                    </Typography>
                    <Typography variant="body2" color="#666">
                      <strong style={{ color: "#ff705a" }}>Location:</strong> {job.location}
                    </Typography>
                    <Typography variant="body2" color="#666">
                      <strong style={{ color: "#ff705a" }}>Salary:</strong> ${job.salary}
                    </Typography>
                    <Typography variant="body2" color="#666">
                      <strong style={{ color: "#ff705a" }}>Job Type:</strong> {job.jobType}
                    </Typography>
                  </CardContent>
                  <Box display="flex" justifyContent="space-between" p={2}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: savedJobs.includes(job._id) ? "#ff705a" : "#1E2A39",
                        color: "white",
                        "&:hover": {
                          backgroundColor: savedJobs.includes(job._id) ? "#ff8873" : "#2F3E4D",
                        },
                      }}
                      onClick={() => toggleSave(job._id)}
                    >
                      {savedJobs.includes(job._id) ? "Saved" : "Save"}
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#1E2A39",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "#2F3E4D",
                        },
                      }}
                      onClick={() => handleJobAppn(job._id)}
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

export default BrowseJobs