const express = require('express');
const { raiseComplaint, getMyComplaints, getComplaintById } = require('../controllers/complaintController');
const verify = require('../middleware/verify');

const router = express.Router();

// All routes require authentication
router.use(verify);

router.post('/raise', raiseComplaint);
router.get('/', getMyComplaints);
router.get('/:id', getComplaintById);

module.exports = router;
