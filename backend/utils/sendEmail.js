const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendComplaintConfirmation = async (email, complaintId, category) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Complaint Received - Hostel Management System',
      html: `
        <h2>Complaint Received</h2>
        <p>Your complaint has been successfully registered.</p>
        <p><strong>Complaint ID:</strong> ${complaintId}</p>
        <p><strong>Category:</strong> ${category}</p>
        <p>Our admin team will review your complaint shortly.</p>
        <p>Best regards,<br>Hostel Management</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent to', email);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const sendStatusUpdateEmail = async (email, complaintId, status, adminRemarks) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Complaint Status Update - Hostel Management System`,
      html: `
        <h2>Complaint Status Updated</h2>
        <p>Your complaint status has been updated.</p>
        <p><strong>Complaint ID:</strong> ${complaintId}</p>
        <p><strong>New Status:</strong> ${status}</p>
        <p><strong>Admin Remarks:</strong> ${adminRemarks || 'No remarks'}</p>
        <p>Best regards,<br>Hostel Management</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Status update email sent to', email);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = {
  sendComplaintConfirmation,
  sendStatusUpdateEmail
};
