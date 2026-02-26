# 🔧 Troubleshooting & FAQ

## Common Issues & Solutions

---

## 1. Backend Issues

### Issue: "Cannot find module 'express'"
```
Error: Cannot find module 'express'
```

**Solution**:
```bash
cd backend
npm install
```

---

### Issue: MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Causes**:
- MongoDB not running
- Wrong connection string
- MongoDB port occupied

**Solutions**:
```bash
# Check if MongoDB is running
mongosh

# If Windows:
mongod

# If Mac:
brew services start mongodb-community

# If Linux:
sudo systemctl start mongod
```

**Update .env**:
```env
# For local MongoDB
MONGO_URI=mongodb://localhost:27017/hostel-mgmt

# For MongoDB Atlas
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/hostel-mgmt
```

---

### Issue: "Port 5000 is already in use"
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution**:
```bash
# Windows - Find and kill process
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# Mac/Linux - Find and kill process
lsof -i :5000
kill -9 <PID_NUMBER>

# Alternative: Use different port
# Change PORT in .env to 5001
```

---

### Issue: JWT_SECRET Error
```
Error: secret is required
```

**Add to .env**:
```env
JWT_SECRET=my_super_secret_key_make_it_long_and_complex_xyz123abc
```

---

### Issue: bcryptjs Error
```
Error: No module named bcryptjs
```

**Solution**:
```bash
cd backend
npm install bcryptjs
```

---

## 2. Frontend Issues

### Issue: "npm ERR! Could not resolve dependency"
```
npm ERR! peer @emotion/react@"^11" from @mui/material@5.11.0
```

**Solution**:
```bash
cd frontend
npm install --force
# or
npm install --legacy-peer-deps
```

---

### Issue: React App Won't Start
```
Error: Plugin/Preset files are not configurable objects
```

**Solution**:
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

---

### Issue: "Port 3000 is already in use"
```
Error: Something is already listening on port 3000
```

**Solution**:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID_NUMBER>

# Or choose different port
PORT=3001 npm start
```

---

### Issue: Axios Requests Error
```
Error: network Error / Failed to fetch
```

**Causes**:
- Backend not running
- Wrong API URL
- CORS issue

**Solutions**:
1. Check backend is running on port 5000
2. Verify `proxy` in `frontend/package.json`:
   ```json
   "proxy": "http://localhost:5000"
   ```
3. Check `frontend/src/utils/api.js` baseURL

---

### Issue: CSS Not Loading (SCSS/CSS Modules)
```
Module not found: Can't resolve './auth.module.css'
```

**Solution**:
- Ensure CSS files are in `frontend/src/styles/`
- Import correctly:
  ```javascript
  import styles from '../styles/auth.module.css';
  ```

---

## 3. Email Issues

### Issue: "Invalid login: authentication failed"
```
Error: Login failed with unknown error
```

**Causes**:
- Using regular Gmail password instead of app password
- 2FA not enabled
- App password expired

**Solutions**:
1. Use App Password (not regular password)
2. Enable 2FA in Gmail
3. Verify EMAIL_USER and EMAIL_PASS in `.env`
4. Generate new app password

**Check Gmail Settings**:
1. Go to [Gmail Account](https://myaccount.google.com)
2. Click Security
3. Enable "2-Step Verification"
4. Go to "App passwords"
5. Generate new password for "Mail" and "Windows Computer"
6. Copy 16-character password to `EMAIL_PASS`

---

### Issue: Emails Not Sending (No Error)
**Causes**:
- Email service disabled for account
- Credentials incorrect but silent fail
- Network issue

**Solution**:
```bash
# Test email configuration
# In backend, create a test file:
node -e "
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: 'your_email@gmail.com', pass: 'app_password' }
});
transporter.verify((error, success) => {
  if (error) console.log('Error:', error);
  else console.log('Server ready:', success);
});
"
```

---

### Issue: "TLS Error" in Email
```
Error: self signed certificate
```

**Solution** (.env):
```env
# Disable SSL verification (development only)
NODE_TLS_REJECT_UNAUTHORIZED=0
```

---

## 4. Database Issues

### Issue: "Collection not found"
**Solution**:
MongoDB automatically creates collections. If not:
```javascript
// In MongoDB shell
use hostel-complaints
db.users.insertOne({})
db.complaints.insertOne({})
```

---

### Issue: Duplicate Key Error
```
E11000 duplicate key error
```

**Cause**: Email already exists in database

**Solution**:
```bash
# Clear database (development)
mongosh
use hostel-complaints
db.users.deleteMany({})
db.complaints.deleteMany({})
```

---

### Issue: Connection Pool Error
```
MongoServerSelectionError: connect ECONNREFUSED
```

**Solution**:
- Restart MongoDB
- Check connection string
- Verify MongoDB is running

---

## 5. Authentication Issues

### Issue: "Invalid token" on every request
```
Error: Invalid token
```

**Causes**:
- Token corrupted
- Token expired (7 days)
- JWT_SECRET changed

**Solutions**:
```javascript
// Clear localStorage and re-login
localStorage.clear();
// Then refresh page and login again
```

---

### Issue: "Access denied" error
```
Error: Access denied
```

**Cause**: Wrong role for endpoint

**Solution**:
- Ensure admin endpoints accessed with admin account
- Check `roleCheck` middleware

---

### Issue: Stuck on loading after login
```
Page keeps showing loading spinner
```

**Causes**:
- Token not stored
- API call failed silently
- Component not checking auth state

**Solution**:
1. Check browser console for errors
2. Verify token in localStorage
3. Check API response in Network tab

---

## 6. CORS Issues

### Issue: "Access to XMLHttpRequest blocked by CORS"
```
Error: CORS policy: No 'Access-Control-Allow-Origin' header
```

**Causes**:
- Backend CORS not configured
- Wrong frontend URL in backend

**Solution in backend/server.js**:
```javascript
const cors = require('cors');
app.use(cors());

// Or specific origin:
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

---

## 7. Development Issues

### Issue: Hot Reload Not Working
**Solution**:
```bash
# Frontend (React)
# Modify any file and save - should auto-refresh

# Backend (if using nodemon)
# Install nodemon globally
npm install -g nodemon
npm run dev  # Should auto-reload
```

---

### Issue: Console Shows Old Code
**Solution**:
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache
- Close DevTools and reopen

---

## 8. Deployment Issues

### Issue: Production Build Fails
```
npm run build
Error: Out of memory
```

**Solution**:
```bash
# Increase Node memory
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

---

### Issue: .env Not Loaded in Production
**Solution**:
- Ensure .env file exists in production
- Set environment variables in hosting platform
- Never commit .env to git

---

## 9. Browser Issues

### Issue: Cookies/Tokens Not Persisting
**Solution**:
```javascript
// Check if localStorage is enabled
if (typeof(Storage) === "undefined") {
  console.log("localStorage disabled");
}

// Clear and re-login
localStorage.clear();
```

---

### Issue: Mixed Content Error (HTTPS)
```
Error: Mixed content - https page trying to load http resource
```

**Solution**:
- Use HTTPS for both frontend and backend in production
- Or use HTTP for both in development

---

## 10. Performance Issues

### Issue: Slow Page Load
**Causes**:
- Large dependency bundles
- Unoptimized images
- Slow database queries

**Solutions**:
```bash
# Analyze bundle
npm install -g webpack-bundle-analyzer
```

---

### Issue: High Memory Usage
**Solution**:
```bash
# Check Node process
ps aux | grep node

# Restart services
killall node
npm run dev  # backend
npm start    # frontend
```

---

## Quick Fixes Checklist

### When Something Breaks

1. **Check Console Errors**
   ```
   Browser F12 → Console tab
   Terminal output
   Network tab (F12 → Network)
   ```

2. **Restart Everything**
   ```bash
   Kill all Node processes
   Restart MongoDB
   npm run dev (backend)
   npm start (frontend)
   ```

3. **Clear Cache**
   ```bash
   localStorage.clear()
   Browser hard refresh (Ctrl+Shift+R)
   Clear npm cache (npm cache clean --force)
   ```

4. **Reinstall Dependencies**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

5. **Check .env File**
   ```
   Backend: backend/.env exists
   Frontend: frontend/.env (optional)
   All variables filled
   ```

6. **Verify Connections**
   ```
   MongoDB running?
   Backend accessible?
   Frontend can reach backend?
   ```

---

## Useful Debugging Commands

```bash
# Check if port is in use
netstat -ano | findstr :PORT  # Windows
lsof -i :PORT                  # Mac/Linux

# Test MongoDB
mongosh
mongosh --eval "db.version()"

# Test API endpoint
curl http://localhost:5000/api/health

# View npm logs
npm config set loglevel verbose

# Install specific package version
npm install package@1.2.3

# Update all packages
npm update

# Clear npm cache
npm cache clean --force
```

---

## Getting Help

1. **Check Documentation**:
   - README.md
   - INSTALLATION_GUIDE.md
   - Official package docs

2. **Search Error Message**:
   - Copy exact error
   - Search on Stack Overflow
   - Check package GitHub issues

3. **Debug Step by Step**:
   - Add console.log statements
   - Check each layer (frontend → API → backend → database)
   - Verify data flow

4. **Check Recent Changes**:
   - What code changed last?
   - Did you modify .env?
   - Did you install new packages?

---

## FAQ

### Q: Can I use this on production?
A: Yes, but add:
- HTTPS/SSL
- Better authentication
- Rate limiting
- Input validation
- Database backups

### Q: How do I reset the database?
A: Delete all documents:
```bash
mongosh
use hostel-complaints
db.users.deleteMany({})
db.complaints.deleteMany({})
```

### Q: Can I change the port?
A: Yes, modify .env:
```env
PORT=5001
```

### Q: How do I add more features?
A: Follow the same pattern:
1. Create model/schema
2. Create controller
3. Create routes
4. Create component
5. Add to context if needed

### Q: Is the password really secure?
A: Yes, it's hashed with bcryptjs (10 rounds of salt)

### Q: Can students see other student complaints?
A: No, students only see their own complaints

### Q: How long is the JWT token valid?
A: 7 days (check authController.js)

---

## When All Else Fails

1. **Deep dive debugging**:
   ```javascript
   // Add debugging to understand flow
   console.log('Frontend thinks token is:', localStorage.getItem('token'));
   console.log('Backend received:', req.headers.authorization);
   ```

2. **Start fresh**:
   ```bash
   rm -rf backend/node_modules frontend/node_modules
   npm install (in both)
   Delete .env and recreate
   ```

3. **Check file permissions**:
   ```bash
   chmod 644 .env  # Linux/Mac
   ```

4. **Look at Git history**:
   ```bash
   git log --oneline
   git diff HEAD~1
   ```

---

**Still stuck?** Create an issue with:
- Error message (exact)
- Steps to reproduce
- What you've tried
- Environment (OS, Node version, etc)

Good luck! 🚀

