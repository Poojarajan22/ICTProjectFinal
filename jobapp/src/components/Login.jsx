import { Button, InputAdornment, TextField, Typography, Box, Paper, Alert } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleLogin = async () => {
    setError(null)
    try {
      const response = await fetch('http://localhost:3005/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const data = await response.json()

      if (response.ok) {
        if (credentials.email === 'admin@jobportal.com') {
          navigate('/admin-dashboard')
        } else {
          navigate('/user-dashboard')
        }
      } else {
        setError(data.message || 'invalid username or password')
      }
    } catch (error) {
      console.log('Error during login:', error)
      setError('Something went wrong!')
    }
  }


  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        background: `url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d') no-repeat center center/cover`,
        padding: '20px',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9))',
          zIndex: 1,
        }}
      ></Box>

      <Paper
        elevation={10}
        sx={{
          padding: '30px',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center',
          borderRadius: '15px',
          backgroundColor: '#ffffff',
          zIndex: 2,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#162c49',
            marginBottom: '20px',
          }}
        >
          Login
        </Typography>

        <TextField
          label="Email"
          name="email"
          fullWidth
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />

        {error && (
          <Alert severity="error" style={{ margin: '10px 0' }}>
            {error}
          </Alert>
        )}

        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          sx={{
            backgroundColor: '#FF705A',
            color: '#FFFFFF',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            marginTop: '20px',
            padding: '10px 15px',
            borderRadius: '10px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#FF866E',
            },
          }}
        >
          Login
        </Button>
      </Paper>
    </Box>
  )
}

export default Login












