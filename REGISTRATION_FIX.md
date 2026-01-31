# Quick Fix for Registration Error

## ✅ Fixed Issues:
1. Removed quotes from MONGO_URI in .env
2. Added input validation
3. Better error messages

## 🚀 Steps to Fix:

### 1. Make sure MongoDB is running

**Check if MongoDB is running:**
```powershell
# Check MongoDB service status
Get-Service -Name MongoDB

# If not running, start it:
net start MongoDB

# OR if using MongoDB Community Edition:
Start-Service MongoDB
```

**Alternative - Start MongoDB manually:**
```powershell
# Navigate to MongoDB bin folder (adjust path if needed)
cd "C:\Program Files\MongoDB\Server\7.0\bin"

# Start MongoDB
.\mongod.exe
```

### 2. Restart Your Backend Server

**Stop the current server** (Ctrl+C in the terminal)

**Then restart:**
```powershell
cd server
npm run dev
```

**You should see:**
```
[dotenv] injecting env (2) from .env
MongoDB connected successfully
Server running on http://localhost:3000
```

⚠️ **If you see "MongoDB connection failed"**, MongoDB is not running!

### 3. Test Registration Again

1. Go to `http://localhost:5173/register`
2. Fill in the form:
   - Name: Test User
   - Email: test@test.com
   - Password: 123456
3. Click Register

### 4. Check for Errors

**Backend Terminal Should Show:**
- ✅ `MongoDB connected successfully`
- ✅ No errors when you register

**If you still see error, check:**

#### Error: "registration failed"
**In backend terminal, you'll see the actual error. Common causes:**

1. **MongoDB not connected:**
   - Check if MongoDB service is running
   - Try connection string: `mongodb://127.0.0.1:27017/watch_ecommerce`

2. **Validation error:**
   - Make sure all fields are filled
   - Check browser console for request details

3. **Duplicate email:**
   - Email already exists in database
   - Try different email or clear database:
   ```bash
   mongosh
   use watch_ecommerce
   db.users.deleteMany({})
   ```

### 5. Debug Mode - Check What's Happening

**Open browser DevTools (F12) → Network Tab**
- Click on the registration request
- Check **Payload** (data sent)
- Check **Response** (error message)

**Check Backend Terminal**
- Should show: `Registration error: <actual error message>`

### 6. Test MongoDB Connection Manually

Create a test file to verify MongoDB:

**server/test-db.js:**
```javascript
require('dotenv').config();
const mongoose = require('mongoose');

console.log('MONGO_URI:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
```

**Run it:**
```powershell
cd server
node test-db.js
```

If this fails, MongoDB is not running properly.

## 📋 Complete Checklist:

- [ ] MongoDB service is running
- [ ] Backend server restarted
- [ ] .env file has no quotes in MONGO_URI
- [ ] Console shows "MongoDB connected successfully"
- [ ] All form fields are filled
- [ ] Using unique email address

## 💡 Quick Test Commands:

**Test if MongoDB is accessible:**
```powershell
mongosh mongodb://localhost:27017/watch_ecommerce
```

Should connect without errors.

**Test API directly with curl:**
```powershell
curl -X POST http://localhost:3000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{\"name\":\"Test User\",\"email\":\"test@test.com\",\"password\":\"123456\"}'
```

Should return user and token.

---

## 🎯 Most Common Solution:

**99% of the time, it's because MongoDB is not running!**

```powershell
# Start MongoDB
net start MongoDB

# Restart backend
cd server
npm run dev
```

Then try registration again!
