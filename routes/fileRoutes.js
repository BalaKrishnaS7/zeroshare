const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  upload,
  uploadEncryptedFile,
  downloadFile,
  listFiles,
  generateShareLink,
  sharedDownload,
  deleteFile,
} = require("../controllers/fileController");


// Upload encrypted file
router.post("/upload", protect, upload, uploadEncryptedFile);

// Download (Owner / Admin)
router.get("/download/:id", protect, downloadFile);

// List files (RBAC)
router.get("/list", protect, listFiles);

// Generate time-limited share link
router.get("/share/:id", protect, generateShareLink);

// Shared download (no login)
router.get("/shared-download/:token", sharedDownload);

// delete file (Owner / Admin)
router.delete("/delete/:id", protect, deleteFile);

module.exports = router;
