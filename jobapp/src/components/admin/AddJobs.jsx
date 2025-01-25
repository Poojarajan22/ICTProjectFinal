import React, { useEffect, useState } from "react"
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom"
import Sidebar from "./Sidebar"
import {
  Box,
  Typography,
  TextField,
  Button,
  AppBar,
  Toolbar,
} from "@mui/material"

const AddJobs = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    salary: "",
    jobType: "Full Time",
  });

  const navigate = useNavigate()
  const location = useLocation()
  const isUpdateMode = location.state && location.state.job
  useEffect(() => {
    if (isUpdateMode) {
      setForm(location.state.job)
    }
  }, [isUpdateMode, location.state])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  };

  const handleAddJob = async (e) => {
    e.preventDefault()
    try {
      let updatedJobData
      if (isUpdateMode) {
        const response = await axios.put(
          `http://localhost:3005/update/${location.state.job._id}`,
          form
        )
        updatedJobData = response.data;
        alert("Job updated successfully!")
      } else {
        const response = await axios.post("http://localhost:3005/add", form)
        updatedJobData = response.data
        alert("Job added successfully!")
      }

      navigate("/manage-jobs", {
        state: { jobData: updatedJobData },
      });
    } catch (error) {
      console.error("Error occurred while adding/updating job:", error)
      alert("There was an error while processing the job.")
    }
  }

  return (
    <Box display="flex" height="100vh" bgcolor="#F0F4F8">
      <Sidebar />
      <Box flex={1} display="flex" flexDirection="column">
        <AppBar
          position="static"
          sx={{ backgroundColor: "#1E2A39", boxShadow: "none" }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              fontWeight="bold"
              color="#FFFFFF"
              sx={{ flexGrow: 1 }}
            >
              {isUpdateMode ? "Update Job" : "Add Job"}{" "}
            </Typography>
          </Toolbar>
        </AppBar>

        <Box
          component="form"
          onSubmit={handleAddJob}
          sx={{
            flex: 1,
            overflowY: "auto", 
            p: 4,
            borderRadius: "12px",
            backgroundColor: "#FFFFFF",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            color="#2A2A2A"
            gutterBottom
          >
            {isUpdateMode ? "Update the Job" : "Add a New Job"}{" "}
          </Typography>

          <TextField
            label="Job Title"
            name="title"
            value={form.title}
            onChange={handleInputChange}
            fullWidth
            required
            sx={{ mb: 2 }}
            variant="outlined"
          />

          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleInputChange}
            fullWidth
            required
            multiline
            rows={3}
            sx={{ mb: 2 }}
            variant="outlined"
          />

          <TextField
            label="Requirements"
            name="requirements"
            value={form.requirements}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={3}
            sx={{ mb: 2 }}
            variant="outlined"
          />

          <TextField
            label="Location"
            name="location"
            value={form.location}
            onChange={handleInputChange}
            fullWidth
            required
            sx={{ mb: 2 }}
            variant="outlined"
          />

          <TextField
            label="Salary"
            name="salary"
            value={form.salary}
            onChange={handleInputChange}
            fullWidth
            type="number"
            sx={{ mb: 2 }}
            variant="outlined"
          />

          <Box sx={{ mb: 2 }}>
            <TextField
              label="Job Type"
              name="jobType"
              value={form.jobType}
              onChange={handleInputChange}
              fullWidth
              select
              variant="outlined"
              SelectProps={{
                native: true,
              }}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                sx: {
                  backgroundColor: "#FFFFFF",
                  borderRadius: "4px",
                },
              }}
            >
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </TextField>
          </Box>

          <Button
            type="submit"
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
          >
            {isUpdateMode ? "Update Job" : "Add Job"}{" "}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default AddJobs
