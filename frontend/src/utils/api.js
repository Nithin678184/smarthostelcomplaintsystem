import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Auth APIs
export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data)
};

// Complaint APIs
export const complaintAPI = {
  raiseComplaint: (data, token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return api.post('/complaints/raise', data);
  },
  getMyComplaints: (token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return api.get('/complaints');
  },
  getComplaintById: (id, token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return api.get(`/complaints/${id}`);
  }
};

// Admin APIs
export const adminAPI = {
  getAllComplaints: (filters, token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    let url = '/admin';
    if (Object.keys(filters).length > 0) {
      const queryString = new URLSearchParams(filters).toString();
      url += `?${queryString}`;
    }
    return api.get(url);
  },
  updateComplaintStatus: (id, data, token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return api.put(`/admin/${id}`, data);
  },
  getStats: (token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return api.get('/admin/stats/dashboard');
  }
};

export default api;
