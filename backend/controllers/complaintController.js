const Complaint = require('../models/Complaint');
const User = require('../models/User');
const { sendComplaintConfirmation } = require('../utils/sendEmail');

const raiseComplaint = async (req, res) => {
  try {
    const { category, description, priority } = req.body;
    const studentId = req.user.userId;

    // Validate input
    if (!category || !description) {
      return res.status(400).json({ success: false, message: 'Category and description are required' });
    }

    // Create new complaint
    const newComplaint = new Complaint({
      studentId,
      category,
      description,
      priority: priority || 'Medium'
    });

    await newComplaint.save();

    // Get student email for confirmation
    const student = await User.findById(studentId);
    if (student) {
      await sendComplaintConfirmation(student.email, newComplaint._id, category);
    }

    return res.status(201).json({
      success: true,
      message: 'Complaint raised successfully',
      data: newComplaint
    });
  } catch (error) {
    console.error('Raise complaint error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const getMyComplaints = async (req, res) => {
  try {
    const studentId = req.user.userId;

    const complaints = await Complaint.find({ studentId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: 'Complaints fetched successfully',
      data: complaints
    });
  } catch (error) {
    console.error('Get complaints error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const getComplaintById = async (req, res) => {
  try {
    const { id } = req.params;
    const studentId = req.user.userId;

    const complaint = await Complaint.findById(id);

    if (!complaint) {
      return res.status(404).json({ success: false, message: 'Complaint not found' });
    }

    // Check if student owns this complaint
    if (complaint.studentId.toString() !== studentId) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    return res.status(200).json({
      success: true,
      message: 'Complaint fetched successfully',
      data: complaint
    });
  } catch (error) {
    console.error('Get complaint error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = { raiseComplaint, getMyComplaints, getComplaintById };
