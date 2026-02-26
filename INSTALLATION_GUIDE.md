# 📚 Complete Installation & Configuration Guide

## Prerequisites
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (Local or Atlas) - [Download](https://www.mongodb.com/try/download/community)
- **Gmail Account** with 2FA enabled
- **Code Editor** (VS Code recommended)

---

## Step 1: MongoDB Setup

### Option A: Local MongoDB
1. Download MongoDB Community Edition
2. Follow installation for your OS
3. Start MongoDB:
   ```bash
   # Windows
   mongod
   
   # Mac
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create a cluster
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/hostel-complaints`

---

## Step 2: Gmail Setup for Email Notifications

1. **Enable 2-Factor Authentication**:
   - Go to [Google Account](https://myaccount.google.com)
   - Click "Security" in left sidebar
   - Enable "2-Step Verification"

2. **Generate App Password**:
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Windows Computer"
   - Google generates 16-character password
   - Copy and save this password

3. **Note**: Regular Gmail password won't work with Nodemailer!

---

## Step 3: Backend Setup

### 3.1 Navigate to Backend
```bash
cd backend
```

### 3.2 Install Dependencies
```bash
npm install
```

Expected output:
```
added 47 packages in 15s
```

### 3.3 Create .env File
```bash
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

### 3.4 Configure .env File

Open `backend/.env` and fill in:

```env
# Database
MONGO_URI=mongodb://localhost:27017/hostel-mgmt
# OR for Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/hostel-mgmt

# JWT Configuration
JWT_SECRET=your_very_secret_jwt_key_12345_make_it_long_and_random

# Server
NODE_ENV=development
PORT=5000

# Email (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx
# ^ 16-character app password from Step 2

# Frontend URL
CLIENT_URL=http://localhost:3000
```

### 3.5 Verify MongoDB Connection

Before starting the server, verify MongoDB:
```bash
# Open new terminal and test connection
mongosh
# or mongo (older versions)
# Should show MongoDB version and connected
```

### 3.6 Start Backend Server

```bash
npm run dev
```

Expected output:
```
Server running on port 5000
MongoDB connected
```

✅ Backend is now running!

---

## Step 4: Frontend Setup

### 4.1 Open New Terminal and Navigate to Frontend
```bash
cd frontend
```

### 4.2 Install Dependencies
```bash
npm install
```

Expected output:
```
added 1234 packages in 45s
```

*Note: This takes longer than backend due to React dependencies*

### 4.3 Create .env File (Optional)
```bash
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

The frontend automatically connects to `http://localhost:5000` (proxy in package.json)

### 4.4 Start Frontend Server
```bash
npm start
```

Expected output:
```
Compiled successfully!
On Your Network: http://192.168.x.x:3000
```

✅ Frontend is now running on `http://localhost:3000`!

---

## Terminal Setup Example

You should have 3 terminals running:

### Terminal 1: MongoDB (if local)
```bash
mongod
# Output: {"msg":"Waiting for connections","attr":{"port":27017}}
```

### Terminal 2: Backend
```bash
cd backend
npm run dev
# Output: Server running on port 5000
```

### Terminal 3: Frontend
```bash
cd frontend
npm start
# Output: Compiled successfully!
```

---

## Step 5: Test the Application

### 5.1 Create Student Account
1. Open http://localhost:3000
2. Click "Sign up here"
3. Fill form:
   - Name: John Student
   - Email: john@example.com
   - Password: password123
   - Confirm: password123
   - Room: 101
   - Role: Student
4. Click "Sign Up"

### 5.2 Create Admin Account
1. Go to http://localhost:3000/signup
2. Fill form:
   - Name: Admin Warden
   - Email: admin@example.com
   - Password: password123
   - Confirm: password123
   - Room: 001
   - Role: Admin (Warden)
3. Click "Sign Up"

### 5.3 Test Student Features
1. Login as student (john@example.com / password123)
2. Click "Raise Complaint"
3. Fill form:
   - Category: Electricity
   - Priority: High
   - Description: Room lights not working
4. Click "Submit"
5. Check email for confirmation

### 5.4 Test Admin Features
1. Logout
2. Login as admin (admin@example.com / password123)
3. View student's complaint in table
4. Click "Update"
5. Change status to "In Progress"
6. Add remark: "Electrician notified"
7. Click "Update & Notify"
8. Check email for update notification

---

## 🔧 Common Issues & Solutions

### Issue 1: MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution**:
- Ensure MongoDB is running (`mongod` in terminal)
- Check MONGO_URI in `.env`
- Verify connection string format

### Issue 2: Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution**:
```bash
# Windows - Find and kill process
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### Issue 3: Email Not Sending
```
Error: Invalid login: authentication failed
```

**Solution**:
- Verify app password (not regular Gmail password)
- Enable 2FA in Gmail account
- Check EMAIL_USER and EMAIL_PASS in `.env`
- Verify email is less than 30 seconds old

### Issue 4: CORS Error
```
Access to XMLHttpRequest blocked by CORS error
```

**Solution**:
- Ensure backend is running on port 5000
- Check `CLIENT_URL` in backend `.env`
- Frontend proxy is set correctly in package.json

### Issue 5: React Not Starting
```
npm ERR! Could not find module
```

**Solution**:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📋 Environment Variables Reference

### Backend .env Required Fields

| Variable | Example | Description |
|----------|---------|-------------|
| MONGO_URI | mongodb://localhost:27017/hostel-mgmt | Database connection |
| JWT_SECRET | my_super_secret_key_xyz | JWT signing key |
| PORT | 5000 | Server port |
| NODE_ENV | development | Environment type |
| EMAIL_USER | user@gmail.com | Sender email |
| EMAIL_PASS | abcd efgh ijkl mnop | Gmail app password (16 chars) |
| CLIENT_URL | http://localhost:3000 | Frontend URL for CORS |

### Frontend .env Optional

| Variable | Example | Description |
|----------|---------|-------------|
| REACT_APP_API_URL | http://localhost:5000/api | API endpoint (auto-detected via proxy) |

---

## ✅ Verification Checklist

Before considering setup complete:

- [ ] MongoDB running and accessible
- [ ] Backend `.env` file created with all variables
- [ ] Frontend package installed
- [ ] Backend server starts without errors
- [ ] Frontend compiles successfully
- [ ] Can signup as student
- [ ] Can signup as admin
- [ ] Can login with both accounts
- [ ] Can raise complaint as student
- [ ] Can view complaints as admin
- [ ] Email notifications working

---

## 🎯 Next Steps After Setup

1. **Customize**: Update colors in `frontend/src/App.js` theme
2. **Database**: Create MongoDB collections/indexes if needed
3. **Deployment**: Deploy to Heroku, AWS, or Vercel
4. **Testing**: Create test accounts for different scenarios
5. **Features**: Add additional features as needed

---

## 📞 Troubleshooting Commands

```bash
# Check Node version
node --version

# Check npm version
npm --version

# Test MongoDB connection
mongosh --eval "db.version()"

# View backend logs
npm run dev

# Restart all services
# Kill all Node processes and restart servers

# Check if ports are in use
# Windows:
netstat -ano | findstr :5000
netstat -ano | findstr :3000
netstat -ano | findstr :27017

# Mac/Linux:
lsof -i :5000
lsof -i :3000
lsof -i :27017
```

---

## 🚀 You're All Set!

Your Smart Hostel Complaint Management System is now ready to use! 

**Access the application**:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

**Happy coding!** 🎉

---

## 📚 Additional Resources

- [Node.js Documentation](https://nodejs.org/en/docs/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Material UI Docs](https://mui.com/)
- [JWT Introduction](https://jwt.io/)

