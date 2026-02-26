import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Stack
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/auth.module.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(formData.email, formData.password);
      if (result.success && result.data.user.role === role) {
        navigate(role === 'admin' ? '/admin-dashboard' : '/student-dashboard');
      } else {
        setError('Role mismatch. Please check your credentials.');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
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
            Efficient Resolution of Hostel Issues
          </Typography>
        </Box>

        <Paper elevation={3} className={styles.paper}>
          <Typography variant="h5" component="h3" gutterBottom className={styles.formTitle}>
            Welcome Back!
          </Typography>
          <Typography variant="body2" align="center" className={styles.formSubtitle}>
            Login to your account to manage complaints
          </Typography>

          {error && (
            <Alert severity="error" sx={{ marginBottom: '20px' }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="role-label">Select Your Role</InputLabel>
              <Select 
                labelId="role-label"
                id="role-select"
                value={role} 
                label="Select Your Role" 
                onChange={(e) => setRole(e.target.value)}
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
              label="Password"
              type="password"
              name="password"
              value={formData.password}
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
                  <span>Logging in...</span>
                </Stack>
              ) : (
                '🔓 Login'
              )}
            </Button>
          </form>

          <Box className={styles.signupLink}>
            <Typography variant="body2">
              Don't have an account? <Link to="/signup" style={{ fontWeight: 600 }}>Create one now</Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
