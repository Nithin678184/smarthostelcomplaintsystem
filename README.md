# Smart Hostel Complaint Management System

A full-stack MERN application for managing hostel complaints with role-based access control (students and wardens).

---

## 📋 Features

### Student Features
- **User Registration & Login**: Secure JWT-based authentication
- **Raise Complaints**: Submit complaints with category, description, and priority
- **View Complaints**: Track all personal complaints with real-time status updates
- **Email Notifications**: Receive email confirmations and status update notifications

### Admin (Warden) Features
- **Dashboard Statistics**: View total, pending, in-progress, and solved complaints
- **View All Complaints**: Comprehensive list of all complaints from students
- **Filtering**: Filter by status, category, or priority
- **Update Status**: Change complaint status and add remarks
- **Auto Email**: System automatically notifies students of status changes

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js + Material UI (MUI v5) + Axios |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Authentication | JWT + bcryptjs |
| Email | Nodemailer (Gmail SMTP) |
| Styling | Material UI + CSS Modules |

---

## 📁 Folder Structure

```
hostel-complaint-system/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── ProtectedRoute.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   ├── StudentDashboard.js
│   │   │   └── AdminDashboard.js
│   │   ├── styles/
│   │   │   ├── index.css
│   │   │   ├── auth.module.css
│   │   │   └── dashboard.module.css
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Complaint.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── complaintRoutes.js
│   │   └── adminRoutes.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── complaintController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── verify.js
│   │   └── roleCheck.js
│   ├── utils/
│   │   └── sendEmail.js
│   ├── .env.example
│   ├── .gitignore
│   ├── server.js
│   └── package.json
└── README.md
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (local or MongoDB Atlas)
- Gmail account with App Password

### Backend Setup

1. **Navigate to backend folder**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```bash
   cp .env.example .env
   ```

4. **Configure `.env`**
   ```
   MONGO_URI=mongodb://localhost:27017/hostel-mgmt
   JWT_SECRET=your_super_secret_jwt_key_here
   NODE_ENV=development
   PORT=5000
   
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_gmail_app_password
   
   CLIENT_URL=http://localhost:3000
   ```

5. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

6. **Start the server**
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend folder** (in a new terminal)
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```bash
   cp .env.example .env
   ```

4. **Start the development server**
   ```bash
   npm start
   ```
   App will open on `http://localhost:3000`

---

## 📧 Email Setup (Gmail SMTP)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Select "App passwords"
   - Choose Mail and Windows Computer
   - Copy the generated 16-character password
3. **Add to `.env`**:
   ```
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=16_character_password_here
   ```

---

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Student Complaints
- `POST /api/complaints/raise` - Raise new complaint
- `GET /api/complaints` - Get my complaints
- `GET /api/complaints/:id` - Get complaint details

### Admin
- `GET /api/admin` - Get all complaints (with filters)
- `PUT /api/admin/:id` - Update complaint status
- `GET /api/admin/stats/dashboard` - Get dashboard statistics

---

## 🧪 Test Accounts

### Student Account
```
Email: student@example.com
Password: password123
Room: 101
```

### Admin Account
```
Email: admin@example.com
Password: password123
Room: 001
```

---

## 🎨 Styling Approach

- **Material UI (MUI v5)** for all UI components
- **CSS Modules** for page-level and custom styling
- No Tailwind CSS - pure MUI + custom CSS
- Responsive design that works on mobile, tablet, and desktop

---

## 📝 Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (student/admin),
  roomNumber: String,
  createdAt: Date
}
```

### Complaint
```javascript
{
  studentId: ObjectId (ref: User),
  category: String (Electricity/Water/WiFi/Cleanliness/Other),
  description: String,
  priority: String (Low/Medium/High/Urgent),
  status: String (Pending/In Progress/Solved),
  adminRemarks: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔄 Email Notifications

**When complaint is raised:**
- Student receives confirmation email with complaint ID

**When status is updated by admin:**
- Student receives email with new status and remarks
- Email includes action taken and next steps

---

## 💡 Key Features Implementation

### JWT Authentication
- Tokens stored in localStorage
- Automatic token refresh on login
- Protected routes with role-based access

### Real-time Status
- Students see live complaint status
- Dashboard reflects changes immediately
- Email triggers on every update

### Email Notifications
- Nodemailer configured for Gmail SMTP
- Async email sending (doesn't block requests)
- Error handling with logging

### Admin Dashboard
- Stats cards showing complaint metrics
- Advanced filtering options
- Sorted by priority (Urgent first) then by date
- Update dialog with remarks

---

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check MONGO_URI in `.env`
- Verify network access if using Atlas

### Email Not Sending
- Verify Gmail App Password is correct
- Check 2FA is enabled on Gmail
- Allow "Less secure apps" if not using App Password

### CORS Errors
- Ensure backend is running on port 5000
- Check `CLIENT_URL` in backend `.env`
- Frontend `proxy` in package.json points to backend

---

## 📦 Dependencies

### Backend
```json
{
  "express": "^4.18.2",
  "mongoose": "^7.0.0",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.0",
  "nodemailer": "^6.9.1",
  "cors": "^2.8.5",
  "dotenv": "^16.0.3"
}
```

### Frontend
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.8.0",
  "axios": "^1.3.0",
  "@mui/material": "^5.11.0",
  "@emotion/react": "^11.10.0"
}
```

---

## 📄 License

MIT License - Feel free to use this project!

---

## 👨‍💻 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📞 Support

For issues and questions, please create an issue in the GitHub repository.

**Happy coding! 🚀**
