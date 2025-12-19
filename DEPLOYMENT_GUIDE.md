# 🚀 Deployment Guide - Votexus Voting System

## Prerequisites

- GitHub account
- MongoDB Atlas account (or MongoDB server)
- Cloudinary account (for image storage)
- Node.js 16+ installed
- Git installed

---

## 📋 Pre-Deployment Checklist

### 1. Secure Your Environment Variables

**Server (.env):**
```bash
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=generate_strong_random_32_character_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
NODE_ENV=production
```

**Client (.env):**
```bash
REACT_APP_API_URL=https://your-backend-domain.com/api
```

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🔐 Step 1: Prepare Repository for GitHub

### 1.1 Update .gitignore Files

✅ Already created:
- Root `.gitignore`
- `server/.gitignore`
- `client/.gitignore`

### 1.2 Verify Sensitive Files Are Excluded

Make sure these are in `.gitignore`:
- `.env` files
- `node_modules/`
- `server/uploads/` (except `.gitkeep`)
- Log files
- OS-specific files

### 1.3 Create .env.example Files

✅ Already created:
- `server/.env.example`
- `client/.env.example`

---

## 📤 Step 2: Push to GitHub

### 2.1 Initialize Git Repository (if not already done)

```bash
cd P:\Projects\Votexus-main
git init
```

### 2.2 Check Current Status

```bash
git status
```

### 2.3 Add All Files (excluding .gitignore items)

```bash
git add .
```

### 2.4 Commit Changes

```bash
git commit -m "Initial commit: Secure and transparent voting system for college clubs

- Implemented secure authentication with JWT
- Added vote integrity with transaction support
- Enhanced transparency features
- Added confirmation modals and loading indicators
- Improved error handling and user experience
- Production-ready with security best practices"
```

### 2.5 Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click "New repository"
3. Repository name: `votexus` (or your preferred name)
4. Description: "Secure and transparent voting system for college clubs"
5. Visibility: Choose Public or Private
6. **DO NOT** initialize with README, .gitignore, or license
7. Click "Create repository"

### 2.6 Connect Local Repository to GitHub

```bash
# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/votexus.git

# Or if using SSH:
git remote add origin git@github.com:YOUR_USERNAME/votexus.git
```

### 2.7 Push to GitHub

```bash
# For first push
git branch -M main
git push -u origin main

# For subsequent pushes
git push origin main
```

---

## 🌐 Step 3: Deployment Options

### Option A: Deploy to Vercel (Frontend) + Railway/Render (Backend)

#### Backend Deployment (Railway/Render)

**Railway:**
1. Go to [railway.app](https://railway.app)
2. Sign up/login
3. "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Set environment variables in Railway dashboard
6. Set root directory to `server`
7. Deploy

**Render:**
1. Go to [render.com](https://render.com)
2. Sign up/login
3. "New" → "Web Service"
4. Connect GitHub repository
5. Settings:
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Add environment variables
7. Deploy

#### Frontend Deployment (Vercel)

1. Go to [vercel.com](https://vercel.com)
2. Sign up/login
3. "New Project" → Import from GitHub
4. Select your repository
5. Settings:
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `build`
6. Add environment variable:
   - `REACT_APP_API_URL` = your backend URL
7. Deploy

### Option B: Deploy to Heroku

#### Backend (Heroku)

```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
cd server
heroku create your-app-name-backend

# Set environment variables
heroku config:set JWT_SECRET=your_secret
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set CLOUDINARY_CLOUD_NAME=your_cloud_name
heroku config:set CLOUDINARY_API_KEY=your_api_key
heroku config:set CLOUDINARY_API_SECRET=your_api_secret
heroku config:set ALLOWED_ORIGINS=https://your-frontend-domain.com
heroku config:set NODE_ENV=production

# Deploy
git subtree push --prefix server heroku main
```

#### Frontend (Heroku or Netlify)

**Netlify (Recommended for Frontend):**
1. Go to [netlify.com](https://netlify.com)
2. "New site from Git"
3. Connect GitHub repository
4. Settings:
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `client/build`
5. Add environment variable: `REACT_APP_API_URL`
6. Deploy

---

## 🗄️ Step 4: Set Up MongoDB

### Option A: MongoDB Atlas (Recommended)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Create database user
4. Whitelist IP addresses (0.0.0.0/0 for all, or specific IPs)
5. Get connection string
6. Update `MONGODB_URI` in environment variables

**Connection String Format:**
```
mongodb+srv://username:password@cluster.mongodb.net/votexus?retryWrites=true&w=majority
```

### Option B: Local MongoDB (Development Only)

See `MONGODB_REPLICA_SET_SETUP.md` for local setup.

---

## 📸 Step 5: Set Up Cloudinary

1. Go to [cloudinary.com](https://cloudinary.com)
2. Create free account
3. Get credentials from Dashboard:
   - Cloud Name
   - API Key
   - API Secret
4. Add to environment variables

---

## ✅ Step 6: Post-Deployment Verification

### Test Checklist

- [ ] User registration works
- [ ] User login works
- [ ] Admin can create elections
- [ ] Admin can add candidates
- [ ] Users can vote
- [ ] Duplicate vote prevention works
- [ ] Results display correctly
- [ ] Images upload successfully
- [ ] CORS is properly configured
- [ ] HTTPS is enabled (for production)

---

## 🔧 Step 7: Production Environment Variables

### Backend Environment Variables

```bash
# Required
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=strong_random_32_char_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ALLOWED_ORIGINS=https://your-frontend-domain.com
NODE_ENV=production
```

### Frontend Environment Variables

```bash
# Required
REACT_APP_API_URL=https://your-backend-domain.com/api
```

---

## 📝 Step 8: Update README.md

Create a comprehensive README.md with:
- Project description
- Features
- Installation instructions
- Environment setup
- Deployment instructions
- License information

---

## 🚨 Security Reminders

1. ✅ Never commit `.env` files
2. ✅ Use strong JWT_SECRET (32+ characters)
3. ✅ Enable HTTPS in production
4. ✅ Set proper CORS origins
5. ✅ Use MongoDB Atlas with authentication
6. ✅ Set up rate limiting (recommended)
7. ✅ Enable MongoDB backups
8. ✅ Monitor error logs

---

## 📊 Monitoring (Recommended)

### Error Tracking
- Set up Sentry for error tracking
- Monitor failed login attempts
- Track API errors

### Logging
- Use proper logging library (Winston, Pino)
- Log security events
- Monitor vote operations

---

## 🎯 Quick Deploy Checklist

- [ ] All code committed and pushed to GitHub
- [ ] .env files created and configured (not committed)
- [ ] MongoDB Atlas cluster created
- [ ] Cloudinary account set up
- [ ] Backend deployed with environment variables
- [ ] Frontend deployed with API URL configured
- [ ] CORS updated with production domains
- [ ] HTTPS enabled
- [ ] Test all functionality
- [ ] Update documentation

---

## 🆘 Troubleshooting

### Common Issues

**CORS Errors:**
- Check `ALLOWED_ORIGINS` includes your frontend URL
- Ensure credentials: true is set

**MongoDB Connection Failed:**
- Verify connection string
- Check IP whitelist
- Verify database user credentials

**Images Not Uploading:**
- Check Cloudinary credentials
- Verify file size limits (1MB)
- Check upload folder permissions

**Build Failures:**
- Check Node.js version (16+)
- Verify all dependencies installed
- Check environment variables

---

**Good luck with your deployment! 🚀**

