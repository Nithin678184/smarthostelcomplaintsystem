const express = require('express');
const { getAllComplaints, updateComplaintStatus, getComplaintStats } = require('../controllers/adminController');
const verify = require('../middleware/verify');
const roleCheck = require('../middleware/roleCheck');

const router = express.Router();

// All routes require authentication and admin role
router.use(verify);
router.use(roleCheck(['admin']));

router.get('/', getAllComplaints);
router.put('/:id', updateComplaintStatus);
router.get('/stats/dashboard', getComplaintStats);

module.exports = router;
