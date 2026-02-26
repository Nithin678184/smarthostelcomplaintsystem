import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  CircularProgress,
  Stack
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/auth.module.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    roomNumber: ''
  });
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      const result = await signup(
        formData.name,
        formData.email,
        formData.password,
        role,
        formData.roomNumber
      );

      if (result.success) {
        setError('');
        alert('Signup successful! Please login to continue.');
        navigate('/login');
      }
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <Container maxWidth="sm">
        {/* Header Section */}
        <Box className={styles.headerSection}>
          <Typography 
            variant="h2" 
            component="h1" 
            className={styles.mainTitle}
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              textAlign: 'center',
              width: '100%',
              margin: 0,
              padding: '0 10px'
            }}
          >
            🏢 Smart Hostel Complaint System
          </Typography>
          <Typography 
            variant="body1" 
            className={styles.tagline}
            sx={{
              textAlign: 'center',
              width: '100%',
              fontSize: { xs: '0.95rem', sm: '1.1rem' }
            }}
          >
            Join our community to report and track hostel issues
          </Typography>
        </Box>

        <Paper elevation={3} className={styles.paper}>
          <Typography variant="h5" component="h3" gutterBottom className={styles.formTitle}>
            Create Your Account
          </Typography>
          <Typography variant="body2" align="center" className={styles.formSubtitle}>
            Get started in just a few easy steps
          </Typography>

          {error && (
            <Alert severity="error" sx={{ marginBottom: '20px' }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              variant="outlined"
              disabled={loading}
              placeholder=""
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#e0e0e0',
                  },
                  '&:hover fieldset': {
                    borderColor: '#667eea',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#667eea',
                  },
                },
                '& .MuiInputBase-input': {
                  padding: '16px 14px',
                  fontSize: '0.95rem',
                },
                '& .MuiInputLabel-root': {
                  transform: 'translate(14px, -9px) scale(0.75)',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#667eea',
                },
              }}
            />

            <TextField
              fullWidth
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              variant="outlined"
              disabled={loading}
              placeholder=""
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#e0e0e0',
                  },
                  '&:hover fieldset': {
                    borderColor: '#667eea',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#667eea',
                  },
                },
                '& .MuiInputBase-input': {
                  padding: '16px 14px',
                  fontSize: '0.95rem',
                },
                '& .MuiInputLabel-root': {
                  transform: 'translate(14px, -9px) scale(0.75)',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#667eea',
                },
              }}
            />

            <TextField
              fullWidth
              label="Room Number"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleChange}
              required
              variant="outlined"
              disabled={loading}
              placeholder=""
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#e0e0e0',
                  },
                  '&:hover fieldset': {
                    borderColor: '#667eea',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#667eea',
                  },
                },
                '& .MuiInputBase-input': {
                  padding: '16px 14px',
                  fontSize: '0.95rem',
                },
                '& .MuiInputLabel-root': {
                  transform: 'translate(14px, -9px) scale(0.75)',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#667eea',
                },
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              variant="outlined"
              disabled={loading}
              placeholder=""
              helperText="At least 6 characters"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#e0e0e0',
                  },
                  '&:hover fieldset': {
                    borderColor: '#667eea',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#667eea',
                  },
                },
                '& .MuiInputBase-input': {
                  padding: '16px 14px',
                  fontSize: '0.95rem',
                },
                '& .MuiInputLabel-root': {
                  transform: 'translate(14px, -9px) scale(0.75)',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#667eea',
                },
              }}
            />

            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              variant="outlined"
              disabled={loading}
              placeholder=""
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#e0e0e0',
                  },
                  '&:hover fieldset': {
                    borderColor: '#667eea',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#667eea',
                  },
                },
                '& .MuiInputBase-input': {
                  padding: '16px 14px',
                  fontSize: '0.95rem',
                },
                '& .MuiInputLabel-root': {
                  transform: 'translate(14px, -9px) scale(0.75)',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#667eea',
                },
              }}
            />

            <FormControl fullWidth variant="outlined">
              <InputLabel id="role-label">Select Your Role</InputLabel>
              <Select 
                labelId="role-label"
                id="role-select"
                value={role} 
                label="Select Your Role" 
                onChange={(e) => setRole(e.target.value)}
                disabled={loading}
                sx={{
                  '& .MuiInputBase-input': {
                    padding: '16px 14px',
                  }
                }}
              >
                <MenuItem value="student">👨‍🎓 Student</MenuItem>
                <MenuItem value="admin">🔐 Admin (Warden)</MenuItem>
              </Select>
            </FormControl>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              disabled={loading}
              className={styles.submitBtn}
              sx={{ 
                height: '48px',
                fontSize: '1rem',
                fontWeight: 600
              }}
            >
              {loading ? (
                <Stack direction="row" spacing={1} alignItems="center">
                  <CircularProgress size={20} color="inherit" />
                  <span>Creating Account...</span>
                </Stack>
              ) : (
                '✨ Create Account'
              )}
            </Button>
          </form>

          <Box className={styles.signupLink}>
            <Typography variant="body2">
              Already have an account? <Link to="/login" style={{ fontWeight: 600 }}>Login here</Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default Signup;
