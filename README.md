# 🗳️ Votexus - Secure & Transparent Voting System

A modern, secure, and transparent voting system designed for college club elections with emphasis on integrity, security, and user experience.

![Votexus](https://img.shields.io/badge/Votexus-Voting%20System-blue)
![Security](https://img.shields.io/badge/Security-Hardened-green)
![License](https://img.shields.io/badge/License-ISC-yellow)

## ✨ Features

### 🔐 Security
- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - Bcrypt with salt for password security
- **Admin Authorization** - Role-based access control
- **Email Domain Restriction** - Only @srmap.edu.in emails allowed
- **Strong Password Policy** - Uppercase, lowercase, special characters required

### 🗳️ Vote Integrity
- **Duplicate Vote Prevention** - Multiple validation checks
- **Transaction Support** - MongoDB transactions for atomic operations
- **Race Condition Protection** - Prevents concurrent voting issues
- **Candidate Validation** - Verifies candidate belongs to election
- **Atomic Updates** - Vote count, voter record, and election record updated together

### 📊 Transparency
- **Public Results** - Vote counts and percentages visible to all
- **Audit Trail** - Admin can view voter list with timestamps
- **Real-time Updates** - Results calculated dynamically
- **Voter Accountability** - Tracks which elections each voter participated in

### 💻 User Experience
- **Loading Indicators** - Visual feedback for all operations
- **Confirmation Modals** - Prevents accidental deletions
- **Custom Alerts** - No browser popups, beautiful custom modals
- **Empty States** - Attractive messages when no data exists
- **Responsive Design** - Works on all devices

## 🛠️ Tech Stack

### Frontend
- React 19
- Redux Toolkit
- React Router
- Axios
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT
- Bcrypt
- Cloudinary (Image Storage)

## 📦 Installation

### Prerequisites
- Node.js 16+ 
- MongoDB (Atlas recommended for production)
- Cloudinary account (for image storage)

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/votexus.git
cd votexus
```

### Backend Setup

```bash
cd server
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Edit .env with your configuration
nano .env
```

**Required Environment Variables:**
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ALLOWED_ORIGINS=http://localhost:3000
NODE_ENV=development
```

### Frontend Setup

```bash
cd client
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Edit .env with your API URL
nano .env
```

**Required Environment Variables:**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Run Development Servers

**Backend:**
```bash
cd server
npm run dev
```

**Frontend:**
```bash
cd client
npm start
```

## 🚀 Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

### Quick Deploy Options

- **Frontend:** Vercel, Netlify
- **Backend:** Railway, Render, Heroku
- **Database:** MongoDB Atlas (Recommended)

## 📚 Documentation

- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Complete deployment guide
- [VOTING_SECURITY.md](./VOTING_SECURITY.md) - Security measures documentation
- [SECURITY_AUDIT_REPORT.md](./SECURITY_AUDIT_REPORT.md) - Security audit report
- [PROJECT_VERIFICATION_SUMMARY.md](./PROJECT_VERIFICATION_SUMMARY.md) - Project verification
- [MONGODB_REPLICA_SET_SETUP.md](./MONGODB_REPLICA_SET_SETUP.md) - MongoDB setup guide

## 🔒 Security Features

### Authentication
- JWT-based authentication with token expiration
- Secure password hashing with bcrypt
- Email domain verification
- Strong password requirements

### Authorization
- Role-based access control (Admin/User)
- Protected API endpoints
- Admin-only actions verified

### Vote Integrity
- Transaction support for atomic operations
- Duplicate vote prevention
- Race condition protection
- Comprehensive validation

### Data Protection
- Passwords never exposed to client
- Environment variables for secrets
- Input validation and sanitization
- CORS protection

## 📊 Project Structure

```
votexus/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Redux store
│   │   └── ...
│   └── package.json
├── server/                 # Express backend
│   ├── controllers/       # Route controllers
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Express middleware
│   └── utils/             # Utility functions
├── .gitignore
├── README.md
└── DEPLOYMENT_GUIDE.md
```

## 👥 Usage

### Admin Features
- Create and manage elections
- Add/remove candidates
- View voter list
- Delete elections
- Update election details

### User Features
- Register with college email
- View ongoing elections
- Vote for candidates (once per election)
- View real-time results
- See voting history

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration
- [ ] User login
- [ ] Admin election creation
- [ ] Candidate addition
- [ ] Voting process
- [ ] Duplicate vote prevention
- [ ] Results display
- [ ] Image uploads

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Your Name - [Your GitHub](https://github.com/YOUR_USERNAME)

## 🙏 Acknowledgments

- College community for requirements and feedback
- Open source community for amazing tools and libraries

## 📞 Support

For support, email your-email@example.com or open an issue on GitHub.

---

**Made with ❤️ for transparent college club elections**

