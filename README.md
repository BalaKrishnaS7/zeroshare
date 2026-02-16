# ZeroShare - Secure File Sharing Platform

A modern, full-stack file sharing application with end-to-end encryption, role-based access control, and comprehensive audit logging.

## ✨ Features

- **Secure File Sharing** - Encrypted file storage with download capabilities and time-limited share links
- **User Authentication** - JWT-based authentication with secure password hashing
- **Time-Limited Share Links** - Generate expiring share links for files without requiring recipient login
- **Admin Dashboard** - Real-time audit logs with activity monitoring and statistics
- **User Dashboard** - Personal file management with upload/download/delete actions
- **Encryption** - Files encrypted at rest using AES-256-CBC encryption
- **Audit Logging** - Complete activity tracking with filtering, search, and IP address logging
- **Role-Based Access** - Admin and User roles with appropriate permissions
- **Dark Mode** - Full dark mode support across the application
- **Responsive Design** - Mobile-friendly interface using Tailwind CSS
- **Search & Filter** - Client-side pagination and search across files and audit logs
- **Landing Page** - Professional landing page with feature showcase

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Multer** - File upload handling
- **bcryptjs** - Password hashing

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/BalaKrishnaS7/zeroshare.git
cd zeroshare
```

### 2. Backend Setup
```bash
# Install dependencies
npm install

# Create .env file in root directory
touch .env
```

Configure `.env`:
```
MONGODB_URI=mongodb://localhost:27017/zeroshare
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
NODE_ENV=development
```

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install
```

Configure `frontend/.env.local`:
```
VITE_API_URL=http://localhost:5000/api
```

## 🏃 Running the Project

### Backend
```bash
# From root directory
npm start
# Server runs on http://localhost:5000
```

### Frontend
```bash
# From frontend directory
npm run dev
# App runs on http://localhost:5173
```

## 📁 Project Structure

```
zeroshare/
├── config/
│   └── db.js                 # Database configuration
├── controllers/
│   ├── adminController.js    # Admin operations
│   ├── authController.js     # Authentication logic
│   └── fileController.js     # File operations
├── middleware/
│   ├── authMiddleware.js     # JWT verification
│   └── adminMiddleware.js    # Admin role check
├── models/
│   ├── User.js               # User schema
│   ├── File.js               # File schema
│   └── AuditLog.js           # Audit log schema
├── routes/
│   ├── authRoutes.js         # Auth endpoints
│   ├── fileRoutes.js         # File endpoints
│   └── adminRoutes.js        # Admin endpoints
├── utils/
│   ├── encryption.js         # File encryption/decryption
│   └── auditLogger.js        # Audit logging utility
├── uploads/                  # User uploaded files
├── server.js                 # Express server entry point
└── frontend/                 # React application
    ├── src/
    │   ├── components/       # Reusable components
    │   ├── pages/           # Page components (Landing, Login, Signup, Dashboards, NotFound)
    │   ├── auth/            # Auth guards (ProtectedRoute, AdminRoute)
    │   ├── api/             # API client
    │   └── styles/          # Global styles
    └── vite.config.js       # Vite configuration
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user (returns JWT token)

### Files
- `POST /api/files/upload` - Upload and encrypt file
- `GET /api/files/list` - List user's files (admin sees all files)
- `GET /api/files/download/:id` - Download and decrypt file (owner or admin only)
- `GET /api/files/share/:id` - Generate time-limited share link
- `GET /api/files/shared-download/:token` - Public download via share link (no auth required)
- `DELETE /api/files/delete/:id` - Delete file (owner or admin only)

### Admin
- `GET /api/admin/logs` - Get audit logs with optional filters (action, userId, date range)

## 🔑 Default Credentials

To test admin features:
- **Email**: admin@zeroshare.com
- **Password**: Admin@123 (Create this account first)

## 🎨 Design System

- **Colors**: Slate (neutral), Emerald (success), Sky (info), Rose (danger), Amber (warning)
- **Font**: Space Grotesk (primary)
- **Animations**: Custom fade-up and float animations
- **Spacing**: Tailwind's 4px base unit system
- **Components**: Reusable modals, navbar, file upload/list, audit logs with live statistics

## 🌐 Deployment

### Deploy Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy dist/ folder to Vercel
```

### Deploy Backend (Railway/Render)
- Push to GitHub
- Connect repository to Railway/Render
- Set environment variables
- Deploy

## 📝 Environment Variables

### Backend (.env)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT signing
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)

### Frontend (.env.local)
- `VITE_API_URL` - Backend API URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**BalaKrishnaS7** - [GitHub Profile](https://github.com/BalaKrishnaS7)

## 📧 Support

For support, open an issue on GitHub.

---

**Built with ❤️ for secure file sharing**
