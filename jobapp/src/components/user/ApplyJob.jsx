import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, useLocation } from "react-router-dom"
import Sidebar from "./Sidebar"
import {
  Box,
  Typography,
  TextField,
  Button,
  AppBar,
  Toolbar,
} from "@mui/material"

const ApplyJob = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const jobId = location.state?.jobId || "" 


  const [formData, setFormData] = useState({
    jobId,
    email: "",
    linkedInUrl: "",
    cvUrl: null,
  })


  const handleChange = (e) => {
    const { name, value, type, files } = e.target
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formPayload = new FormData()
    Object.keys(formData).forEach(key => {
        formPayload.append(key, formData[key])
    });
    
    try {
        const response = await axios.post("http://localhost:3005/application", formPayload, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        alert("Application submitted successfully!");
        navigate("/browse-jobs");
    } catch (error) {
        alert("Failed to submit application. Please try again.");
        console.error(error);
    }
    
  }
  

  return (
    <Box display="flex" height="100vh" bgcolor="#F0F4F8">
      <Sidebar />
      <Box flex={1} display="flex" flexDirection="column">
        <AppBar position="fixed" sx={{ backgroundColor: "#1E2A39", boxShadow: "none" }}>
          <Toolbar>
            <Typography variant="h6" fontWeight="bold" color="#FFFFFF" sx={{ flexGrow: 1 }}>
              Apply for Job
            </Typography>
          </Toolbar>
        </AppBar>

        <Box display="flex" justifyContent="center" alignItems="center" flex={1} mt="64px" overflow="auto">
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "40px",
              borderRadius: "12px",
              backgroundColor: "#FFFFFF",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
              maxWidth: "600px",
              width: "90%",
            }}
          >
            <Typography variant="h4" fontWeight="bold" color="#2A2A2A" gutterBottom textAlign="center">
              Job Application
            </Typography>

            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              variant="outlined"
              fullWidth
              margin="normal"
              type="email"
            />

            <TextField
              label="LinkedIn Profile URL"
              name="linkedInUrl"
              value={formData.linkedInUrl}
              onChange={handleChange}
              required
              variant="outlined"
              fullWidth
              margin="normal"
            />

            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: "100%", mt: 3 }}>
              <TextField
                label="Upload CV"
                name="cv"
                type="file"
                onChange={handleChange}
                required
                variant="outlined"
                fullWidth
                InputLabelProps={{ shrink: true }}
                inputProps={{ accept: ".pdf, .doc, .docx, .jpg, .jpeg" }}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#FF705A",
                color: "#FFFFFF",
                textTransform: "none",
                fontWeight: "bold",
                mt: 4,
                "&:hover": {
                  backgroundColor: "#FF866E",
                },
              }}
            >
              Apply
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ApplyJob
