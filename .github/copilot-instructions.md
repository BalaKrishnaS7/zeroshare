# ZeroShare - AI Coding Agent Instructions

## Project Overview
ZeroShare is a secure file-sharing backend API built with Node.js, Express, and MongoDB. The application provides user authentication and file upload/management capabilities with a focus on security and encryption.

## Architecture & Structure

### MVC Pattern
- **Models** (`models/`): Mongoose schemas for MongoDB collections
- **Controllers** (`controllers/`): Business logic handlers that process requests
- **Routes** (`routes/`): Express route definitions mapping endpoints to controllers
- **Middleware** (`middleware/`): Reusable request processing (auth, validation, error handling)

### Key Components
- `server.js`: Express app initialization, middleware setup, and route mounting
- `config/db.js`: MongoDB connection using Mongoose with connection pooling
- `utils/encryption.js`: File encryption/decryption utilities for secure storage
- `uploads/`: Directory for uploaded files (ensure `.gitignore` includes this)

## Technology Stack
- **Runtime**: Node.js with CommonJS modules (`"type": "commonjs"` in package.json)
- **Framework**: Express 5.x
- **Database**: MongoDB via Mongoose 9.x
- **Auth**: JWT (jsonwebtoken) + bcryptjs for password hashing
- **File Uploads**: Multer 2.x for multipart/form-data handling
- **Environment**: dotenv for configuration

## Development Conventions

### Authentication Flow
1. User registers → `authController.js` hashes password with bcryptjs (10 rounds)
2. User model stores: username, email, hashed password, timestamps
3. Login → verify password → issue JWT with user ID payload
4. Protected routes use `authMiddleware.js` to verify JWT from `Authorization: Bearer <token>` header
5. Middleware attaches decoded user data to `req.user` for controller access

### File Handling Pattern
1. Multer middleware configured in `fileRoutes.js` (destination: `uploads/`, size limits)
2. `fileController.js` receives file via `req.file`, encrypts using `utils/encryption.js`
3. Store file metadata in MongoDB: filename, size, upload date, owner reference, encryption key
4. Download flow: Retrieve metadata → decrypt file → stream to client
5. Clean up temporary files after processing

### Error Handling
- Use async/await with try-catch in controllers
- Return structured JSON errors: `{ success: false, message: "error description" }`
- HTTP status codes: 200 (success), 400 (validation), 401 (unauthorized), 404 (not found), 500 (server error)

### Environment Variables (.env)
```
MONGO_URI=mongodb://localhost:27017/zeroshare
JWT_SECRET=<generate-secure-random-string>
PORT=5000
NODE_ENV=development
```

## Essential Commands

### Development
```bash
npm install                    # Install dependencies
node server.js                 # Start server (add nodemon for dev)
```

### MongoDB Setup
Ensure MongoDB is running locally or update `MONGO_URI` for cloud instance (MongoDB Atlas).

## Critical Implementation Notes

### Security Requirements
1. **Never commit .env** - Add to `.gitignore` immediately
2. **JWT secrets** must be cryptographically random (min 32 chars)
3. **Password hashing** use bcryptjs salt rounds: 10-12
4. **File validation** check MIME types and file size limits in Multer config
5. **Path traversal protection** sanitize filenames before storage

### Model Relationships
- User model: Reference for file ownership
- File model should include: `{ userId: ObjectId, filename: String, originalName: String, size: Number, encryptionKey: String, uploadDate: Date }`

### Middleware Order in server.js
```javascript
1. express.json()              // Parse JSON bodies
2. cors()                      // CORS configuration
3. express.static('uploads')   // Serve static files (if needed)
4. Route handlers              // Mount authRoutes, fileRoutes
5. Error handling middleware   // Catch-all error handler
```

## Testing & Debugging
- Test auth endpoints with Postman/Thunder Client
- Verify JWT tokens at jwt.io
- Check MongoDB documents with Compass or mongosh
- Enable Express debug: `DEBUG=express:* node server.js`

## Common Pitfalls
- Forgetting `await` on Mongoose operations causes silent failures
- Multer field name must match form field name: `upload.single('file')`
- JWT verification errors: Check token format is `Bearer <token>` not just `<token>`
- CORS issues: Configure allowed origins explicitly in production
