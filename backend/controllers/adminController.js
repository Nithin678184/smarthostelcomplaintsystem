const Complaint = require('../models/Complaint');
const User = require('../models/User');
const { sendStatusUpdateEmail } = require('../utils/sendEmail');

const getAllComplaints = async (req, res) => {
  try {
    const { status, category, priority } = req.query;

    // Build filter object
    let filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (priority) filter.priority = priority;

    // Fetch complaints sorted by priority and date
    const priorityOrder = { 'Urgent': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
    const complaints = await Complaint.find(filter)
      .populate('studentId', 'name email roomNumber')
      .lean();

    // Sort by priority (urgent first) then by date
    complaints.sort((a, b) => {
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    // Calculate dashboard stats
    const stats = {
      total: await Complaint.countDocuments(),
      pending: await Complaint.countDocuments({ status: 'Pending' }),
      inProgress: await Complaint.countDocuments({ status: 'In Progress' }),
      solved: await Complaint.countDocuments({ status: 'Solved' })
    };

    return res.status(200).json({
      success: true,
      message: 'Complaints fetched successfully',
      data: complaints,
      stats
    });
  } catch (error) {
    console.error('Get all complaints error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const updateComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminRemarks } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }

    // Find and update complaint
    const complaint = await Complaint.findByIdAndUpdate(
      id,
      { status, adminRemarks: adminRemarks || '', updatedAt: Date.now() },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({ success: false, message: 'Complaint not found' });
    }

    // Get student email and send notification
    const student = await User.findById(complaint.studentId);
    if (student) {
      await sendStatusUpdateEmail(student.email, complaint._id, status, adminRemarks);
    }

    return res.status(200).json({
      success: true,
      message: 'Complaint status updated successfully',
      data: complaint
    });
  } catch (error) {
    console.error('Update complaint error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const getComplaintStats = async (req, res) => {
  try {
    const stats = {
      total: await Complaint.countDocuments(),
      pending: await Complaint.countDocuments({ status: 'Pending' }),
      inProgress: await Complaint.countDocuments({ status: 'In Progress' }),
      solved: await Complaint.countDocuments({ status: 'Solved' })
    };

    return res.status(200).json({
      success: true,
      message: 'Stats fetched successfully',
      data: stats
    });
  } catch (error) {
    console.error('Get stats error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = { getAllComplaints, updateComplaintStatus, getComplaintStats };
