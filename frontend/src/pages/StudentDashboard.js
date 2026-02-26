import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip, 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { complaintAPI } from '../utils/api';
import styles from '../styles/dashboard.module.css';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user, logout, token } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    category: 'Electricity',
    description: '',
    priority: 'Medium'
  });

  useEffect(() => {
    if (!user) navigate('/login');
    else fetchComplaints();
  }, [user, navigate, token]);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await complaintAPI.getMyComplaints(token);
      if (response.data.success) {
        setComplaints(response.data.data);
      }
    } catch (err) {
      setError('Failed to fetch complaints');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComplaint = async () => {
    if (!formData.description.trim()) {
      setError('Description is required');
      return;
    }

    try {
      const response = await complaintAPI.raiseComplaint(formData, token);
      if (response.data.success) {
        setSuccess('✅ Complaint raised successfully! A confirmation email has been sent.');
        setFormData({ category: 'Electricity', description: '', priority: 'Medium' });
        setOpenDialog(false);
        setError('');
        fetchComplaints();
      }
    } catch (err) {
      setError('Failed to raise complaint');
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Urgent': return 'error';
      case 'High': return 'warning';
      case 'Medium': return 'primary';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'default';
      case 'In Progress': return 'info';
      case 'Solved': return 'success';
      default: return 'default';
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const totalComplaints = complaints.length;
  const resolvedComplaints = complaints.filter(c => c.status === 'Solved').length;
  const pendingComplaints = complaints.filter(c => c.status === 'Pending').length;
  const inProgressComplaints = complaints.filter(c => c.status === 'In Progress').length;

  return (
    <div>
      <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, fontSize: '1.3rem' }}>
            👨‍🎓 Student Dashboard
          </Typography>
          <Typography variant="body2" sx={{ marginRight: 3, opacity: 0.9 }}>
            {user?.name}
          </Typography>
          <Button 
            variant="contained" 
            size="small"
            sx={{ marginRight: 1, backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
            onClick={() => setOpenDialog(true)}
          >
            ➕ New Complaint
          </Button>
          <Button 
            variant="outlined" 
            size="small"
            sx={{ borderColor: 'white', color: 'white' }}
            onClick={handleLogout}
          >
            🚪 Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" className={styles.container}>
        {error && (
          <Alert severity="error" onClose={() => setError('')} sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" onClose={() => setSuccess('')} sx={{ marginBottom: 2 }}>
            {success}
          </Alert>
        )}

        {/* Statistics Section */}
        <Box className={styles.header}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, marginBottom: 1 }}>
              My Complaints Management
            </Typography>
            <Typography variant="body1" sx={{ color: '#7f8c8d' }}>
              Room: <strong>{user?.roomNumber}</strong> | Total Complaints: <strong>{totalComplaints}</strong>
            </Typography>
          </Box>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} className={styles.statsContainer} sx={{ marginBottom: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card className={styles.statCard}>
              <CardContent>
                <Typography color="textSecondary" className={styles.statCardLabel}>
                  Total Complaints
                </Typography>
                <Typography className={styles.statCardValue}>
                  {totalComplaints}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className={styles.statCard} sx={{ borderLeftColor: '#3498db !important' }}>
              <CardContent>
                <Typography color="textSecondary" className={styles.statCardLabel}>
                  In Progress
                </Typography>
                <Typography className={styles.statCardValue} sx={{ color: '#3498db' }}>
                  {inProgressComplaints}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className={styles.statCard} sx={{ borderLeftColor: '#f39c12 !important' }}>
              <CardContent>
                <Typography color="textSecondary" className={styles.statCardLabel}>
                  Pending
                </Typography>
                <Typography className={styles.statCardValue} sx={{ color: '#f39c12' }}>
                  {pendingComplaints}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className={styles.statCard} sx={{ borderLeftColor: '#2ecc71 !important' }}>
              <CardContent>
                <Typography color="textSecondary" className={styles.statCardLabel}>
                  Resolved
                </Typography>
                <Typography className={styles.statCardValue} sx={{ color: '#2ecc71' }}>
                  {resolvedComplaints}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Complaints Table */}
        <TableContainer component={Paper} className={styles.tableWrapper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Admin Remarks</TableCell>
                <TableCell>Submitted Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {complaints.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ padding: '30px' }}>
                    <Typography variant="body2" color="textSecondary">
                      📋 No complaints yet. Submit one to get started!
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                complaints.map((complaint) => (
                  <TableRow key={complaint._id}>
                    <TableCell>
                      <strong>{complaint.category}</strong>
                    </TableCell>
                    <TableCell>{complaint.description.substring(0, 50)}{complaint.description.length > 50 ? '...' : ''}</TableCell>
                    <TableCell>
                      <Chip 
                        label={complaint.priority} 
                        color={getPriorityColor(complaint.priority)} 
                        size="small"
                        variant="filled"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={complaint.status} 
                        color={getStatusColor(complaint.status)} 
                        size="small"
                        variant="filled"
                      />
                    </TableCell>
                    <TableCell>
                      {complaint.adminRemarks ? (
                        <Typography variant="body2">{complaint.adminRemarks}</Typography>
                      ) : (
                        <Typography variant="body2" color="textSecondary">—</Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(complaint.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Raise Complaint Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontSize: '1.3rem', fontWeight: 700, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', margin: 0, padding: '15px' }}>
          📝 Raise New Complaint
        </DialogTitle>
        <DialogContent sx={{ pt: 3, pb: 3, px: 3, maxHeight: 'calc(100vh - 250px)', overflowY: 'auto' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="category-label" sx={{ color: '#7f8c8d' }}>
                Category
              </InputLabel>
              <Select
                labelId="category-label"
                id="category-select"
                value={formData.category}
                label="Category"
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
                      borderWidth: '2px',
                    },
                  },
                  '& .MuiInputBase-input': {
                    padding: '16px 14px',
                    fontSize: '0.95rem',
                  },
                }}
              >
                <MenuItem value="Electricity">⚡ Electricity</MenuItem>
                <MenuItem value="Water">💧 Water</MenuItem>
                <MenuItem value="WiFi">📡 WiFi</MenuItem>
                <MenuItem value="Cleanliness">🧹 Cleanliness</MenuItem>
                <MenuItem value="Maintenance">🔧 Maintenance</MenuItem>
                <MenuItem value="Other">📌 Other</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth variant="outlined">
              <InputLabel id="priority-label" sx={{ color: '#7f8c8d' }}>
                Priority Level
              </InputLabel>
              <Select
                labelId="priority-label"
                id="priority-select"
                value={formData.priority}
                label="Priority Level"
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
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
                      borderWidth: '2px',
                    },
                  },
                  '& .MuiInputBase-input': {
                    padding: '16px 14px',
                    fontSize: '0.95rem',
                  },
                }}
              >
                <MenuItem value="Low">🟢 Low</MenuItem>
                <MenuItem value="Medium">🟡 Medium</MenuItem>
                <MenuItem value="High">🔴 High</MenuItem>
                <MenuItem value="Urgent">⛔ Urgent</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              id="description-input"
              label="Description"
              multiline
              rows={5}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              variant="outlined"
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
                    borderWidth: '2px',
                  },
                },
                '& .MuiInputBase-input': {
                  padding: '16px 14px',
                  fontSize: '0.95rem',
                  lineHeight: '1.5',
                },
                '& .MuiInputLabel-root': {
                  color: '#7f8c8d',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#667eea',
                },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ padding: '20px', gap: 1 }}>
          <Button onClick={() => setOpenDialog(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSubmitComplaint} variant="contained" color="primary">
            Submit Complaint
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StudentDashboard;
