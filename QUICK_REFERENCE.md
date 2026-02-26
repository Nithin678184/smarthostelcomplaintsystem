# ⚡ Quick Reference Card

## 🚀 Quick Start (Copy & Paste)

### Terminal 1: MongoDB
```bash
mongod
```

### Terminal 2: Backend
```bash
cd backend
npm install
npm run dev
```

### Terminal 3: Frontend  
```bash
cd frontend
npm install
npm start
```

---

## 📋 Essential Commands

### Backend
```bash
cd backend                    # Enter backend
npm install                   # Install deps
npm run dev                   # Start (auto-reload)
npm start                     # Start (no reload)
```

### Frontend
```bash
cd frontend                   # Enter frontend
npm install                   # Install deps
npm start                     # Start dev server
npm build                     # Create build
```

### Database
```bash
mongod                        # Start MongoDB
mongosh                       # Connect to MongoDB
use hostel-mgmt         # Select database
db.users.find()              # View users
db.complaints.find()         # View complaints
db.users.deleteMany({})      # Clear users
```

---

## 🔐 .env Configuration

### Backend (.env)
```env
MONGO_URI=mongodb://localhost:27017/hostel-mgmt
JWT_SECRET=your_secret_key_here
NODE_ENV=development
PORT=5000
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx
CLIENT_URL=http://localhost:3000
```

### Frontend (.env) - Optional
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🧪 Test Accounts

### Student
```
Email: student@example.com
Pass: password123
Room: 101
```

### Admin
```
Email: admin@example.com
Pass: password123
Room: 001
```

---

## 🌐 URLs

```
Frontend:     http://localhost:3000
Backend API:  http://localhost:5000/api
MongoDB:      localhost:27017
```

---

## 📡 Key API Endpoints

### Auth
```
POST /api/auth/signup          Create account
POST /api/auth/login           Login
```

### Student
```
POST /api/complaints/raise     New complaint
GET /api/complaints            My complaints
GET /api/complaints/:id        One complaint
```

### Admin
```
GET /api/admin                 All complaints
PUT /api/admin/:id             Update status
GET /api/admin/stats/dashboard Stats
```

---

## 🎯 File Locations

### Backend Key Files
```
server.js                      Main file
routes/authRoutes.js           Auth endpoints
controllers/authController.js  Auth logic
models/Complaint.js            Complaint schema
```

### Frontend Key Files
```
src/App.js                     Main component
src/pages/Login.js             Login page
src/context/AuthContext.js     Auth context
src/utils/api.js               API calls
```

---

## 🔧 Troubleshooting Quick Fixes

| Issue | Fix |
|-------|-----|
| Port in use | `netstat -ano \| findstr :5000` then `taskkill /PID [PID] /F` |
| MongoDB error | Start `mongod` |
| Email not sending | Check Gmail app password |
| CORS error | Check backend is running |
| npm errors | `npm cache clean --force` |
| Stuck loading | Check browser console F12 |

---

## 📚 File Structure

```
backend/
  ├── models/        Schemas
  ├── routes/        Endpoints
  ├── controllers/   Logic
  ├── middleware/    Auth checks
  ├── utils/         Email
  └── server.js      Entry

frontend/
  ├── pages/         Full pages
  ├── components/    Reusable
  ├── context/       State
  ├── utils/         API calls
  ├── styles/        CSS Modules
  └── App.js         Router
```

---

## 💾 Important .env Variables

| Backend | Default | Example |
|---------|---------|---------|
| MONGO_URI | - | mongodb://localhost:27017/hostel-mgmt |
| JWT_SECRET | - | SuperSecretKey123 |
| PORT | 5000 | 5000 |
| EMAIL_USER | - | user@gmail.com |
| EMAIL_PASS | - | xxxx xxxx xxxx xxxx |

---

## 🔑 Key Features

✅ User authentication (JWT)
✅ Complaint management
✅ Admin dashboard
✅ Email notifications
✅ Role-based access
✅ MongoDB database
✅ Material UI design
✅ CSS Modules styling

---

## 🧠 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React + MUI + CSS Modules |
| Backend | Node + Express + MongoDB |
| Auth | JWT + bcryptjs |
| Email | Nodemailer |

---

## 📱 Responsive Breakpoints

MUI breakpoints:
- `xs`: 0px (mobile)
- `sm`: 600px (tablet)
- `md`: 960px (desktop)
- `lg`: 1280px (large)
- `xl`: 1920px (extra large)

---

## 🔒 Security Checklist

- ✅ Passwords hashed
- ✅ JWT signed
- ✅ CORS enabled
- ✅ Role-based routes
- ✅ Protected endpoints
- ✅ Environment secrets

---

## 📊 Database Collections

### users
```javascript
{
  name, email, password, 
  role, roomNumber, createdAt
}
```

### complaints
```javascript
{
  studentId, category, description,
  priority, status, adminRemarks,
  createdAt, updatedAt
}
```

---

## 🎨 MUI Chip Colors

| Component | Color |
|-----------|-------|
| Urgent | error (red) |
| High | warning (orange) |
| Medium | primary (blue) |
| Low | success (green) |

---

## 📞 Support

- **Frontend Issues**: Check browser console F12
- **Backend Issues**: Check terminal output
- **Database Issues**: Check mongosh connection
- **Email Issues**: Check .env credentials

---

## ⏱ Common Timings

| Task | Time |
|------|------|
| Setup | 15-20 min |
| npm install (backend) | 2-3 min |
| npm install (frontend) | 5-10 min |
| First test run | 5 min |
| Email delivery | <2 sec |

---

## 🚀 Deployment

Before deploying:
1. ✅ .env configured
2. ✅ Database ready
3. ✅ Email working
4. ✅ Build passes
5. ✅ All tests green

---

## 💡 Pro Tips

1. Always restart MongoDB when stuck
2. Use `npm run dev` for auto-reload
3. Check browser console first
4. Look at Network tab for API errors
5. Use `mongosh` to directly query DB
6. App passwords for Gmail (not regular password)
7. Hard refresh if styles not updating

---

## 🎯 Daily Workflow

1. Start MongoDB (`mongod`)
2. Start Backend (`npm run dev`)
3. Start Frontend (`npm start`)
4. Open browser to localhost:3000
5. Register/Login
6. Test features
7. Check console for errors
8. Commit progress

---

**Print this page for quick reference!** 📄

Last Updated: February 25, 2026
