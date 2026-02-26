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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { adminAPI } from '../utils/api';
import styles from '../styles/dashboard.module.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout, token } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, inProgress: 0, solved: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [filters, setFilters] = useState({ status: '', category: '', priority: '' });
  const [updateData, setUpdateData] = useState({ status: 'Pending', adminRemarks: '' });

  useEffect(() => {
    if (!user || user.role !== 'admin') navigate('/login');
    else fetchComplaints();
  }, [user, navigate, token, filters]);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getAllComplaints(filters, token);
      if (response.data.success) {
        setComplaints(response.data.data);
        setStats(response.data.stats);
      }
    } catch (err) {
      setError('Failed to fetch complaints');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (complaint) => {
    setSelectedComplaint(complaint);
    setUpdateData({ status: complaint.status, adminRemarks: complaint.adminRemarks });
    setOpenDialog(true);
  };

  const handleUpdateComplaint = async () => {
    try {
      const response = await adminAPI.updateComplaintStatus(selectedComplaint._id, updateData, token);
      if (response.data.success) {
        setSuccess('✅ Complaint updated successfully! Email notification sent to student.');
        setOpenDialog(false);
        setError('');
        fetchComplaints();
      }
    } catch (err) {
      setError('Failed to update complaint');
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

  return (
    <div>
      <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, fontSize: '1.3rem' }}>
            🔐 Admin Dashboard
          </Typography>
          <Typography variant="body2" sx={{ marginRight: 3, opacity: 0.9 }}>
            {user?.name}
          </Typography>
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

        {/* Header */}
        <Box className={styles.header}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Complaints Management System
          </Typography>
          <Typography variant="body1" sx={{ color: '#7f8c8d' }}>
            Manage and track all hostel complaints
          </Typography>
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
                  {stats.total}
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
                  {stats.pending}
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
                  {stats.inProgress}
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
                  {stats.solved}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Filters */}
        <Paper className={styles.filterBox}>
          <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 700 }}>
            🔍 Filter Complaints
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="filter-status-label" sx={{ color: '#7f8c8d' }}>Filter by Status</InputLabel>
                <Select
                  labelId="filter-status-label"
                  value={filters.status}
                  label="Filter by Status"
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
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
                      padding: '12px 14px',
                      fontSize: '0.95rem',
                    },
                  }}
                >
                  <MenuItem value="">All Status</MenuItem>
                  <MenuItem value="Pending">⏳ Pending</MenuItem>
                  <MenuItem value="In Progress">🔄 In Progress</MenuItem>
                  <MenuItem value="Solved">✅ Solved</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="filter-category-label" sx={{ color: '#7f8c8d' }}>Filter by Category</InputLabel>
                <Select
                  labelId="filter-category-label"
                  value={filters.category}
                  label="Filter by Category"
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
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
                      padding: '12px 14px',
                      fontSize: '0.95rem',
                    },
                  }}
                >
                  <MenuItem value="">All Categories</MenuItem>
                  <MenuItem value="Electricity">⚡ Electricity</MenuItem>
                  <MenuItem value="Water">💧 Water</MenuItem>
                  <MenuItem value="WiFi">📡 WiFi</MenuItem>
                  <MenuItem value="Cleanliness">🧹 Cleanliness</MenuItem>
                  <MenuItem value="Maintenance">🔧 Maintenance</MenuItem>
                  <MenuItem value="Other">📌 Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="filter-priority-label" sx={{ color: '#7f8c8d' }}>Filter by Priority</InputLabel>
                <Select
                  labelId="filter-priority-label"
                  value={filters.priority}
                  label="Filter by Priority"
                  onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
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
                      padding: '12px 14px',
                      fontSize: '0.95rem',
                    },
                  }}
                >
                  <MenuItem value="">All Priorities</MenuItem>
                  <MenuItem value="Low">🟢 Low</MenuItem>
                  <MenuItem value="Medium">🟡 Medium</MenuItem>
                  <MenuItem value="High">🔴 High</MenuItem>
                  <MenuItem value="Urgent">⛔ Urgent</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        {/* Complaints Table */}
        <TableContainer component={Paper} className={styles.tableWrapper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Student Name</strong></TableCell>
                <TableCell><strong>Room No.</strong></TableCell>
                <TableCell><strong>Category</strong></TableCell>
                <TableCell><strong>Description</strong></TableCell>
                <TableCell><strong>Priority</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell><strong>Action</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {complaints.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ padding: '30px' }}>
                    <Typography variant="body2" color="textSecondary">
                      📋 No complaints found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                complaints.map((complaint) => (
                  <TableRow key={complaint._id}>
                    <TableCell>
                      <strong>{complaint.studentId.name}</strong>
                    </TableCell>
                    <TableCell>{complaint.studentId.roomNumber}</TableCell>
                    <TableCell>{complaint.category}</TableCell>
                    <TableCell>
                      {complaint.description.substring(0, 40)}{complaint.description.length > 40 ? '...' : ''}
                    </TableCell>
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
                      {new Date(complaint.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="contained" 
                        size="small"
                        color="primary"
                        onClick={() => handleOpenDialog(complaint)}
                        sx={{ textTransform: 'none' }}
                      >
                        Update
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Update Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontSize: '1.3rem', fontWeight: 700, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', margin: 0, padding: '16px' }}>
          📝 Update Complaint Status
        </DialogTitle>
        <DialogContent sx={{ pt: 8, pb: 3, paddingX: 3, maxHeight: 'calc(100vh - 250px)', overflowY: 'auto' }}>
          {selectedComplaint && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Paper sx={{ p: 2, backgroundColor: '#f8f9fb', borderLeft: '4px solid #667eea' }}>
                <Typography variant="body2" sx={{ marginBottom: 1 }}>
                  <strong>👤 Student:</strong> {selectedComplaint.studentId.name}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 1 }}>
                  <strong>📧 Email:</strong> {selectedComplaint.studentId.email}
                </Typography>
                <Typography variant="body2">
                  <strong>📝 Room:</strong> {selectedComplaint.studentId.roomNumber}
                </Typography>
              </Paper>

              <Paper sx={{ p: 2, backgroundColor: '#f8f9fb' }}>
                <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                  <strong>Complaint Description:</strong>
                </Typography>
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  {selectedComplaint.description}
                </Typography>
              </Paper>

              <FormControl fullWidth variant="outlined">
                <InputLabel id="status-label" sx={{ color: '#7f8c8d' }}>
                  Update Status
                </InputLabel>
                <Select
                  labelId="status-label"
                  id="status-select"
                  value={updateData.status}
                  label="Update Status"
                  onChange={(e) => setUpdateData({ ...updateData, status: e.target.value })}
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
                  <MenuItem value="Pending">⏳ Pending</MenuItem>
                  <MenuItem value="In Progress">🔄 In Progress</MenuItem>
                  <MenuItem value="Solved">✅ Solved</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                id="remarks-input"
                label="Admin Remarks"
                multiline
                rows={4}
                value={updateData.adminRemarks}
                onChange={(e) => setUpdateData({ ...updateData, adminRemarks: e.target.value })}
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
          )}
        </DialogContent>
        <DialogActions sx={{ padding: '20px', gap: 1 }}>
          <Button onClick={() => setOpenDialog(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleUpdateComplaint} variant="contained" color="primary">
            Update & Notify Student
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
