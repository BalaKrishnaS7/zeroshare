const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const { getAuditLogs } = require("../controllers/adminController");

router.get("/logs", protect, adminOnly, getAuditLogs);

module.exports = router;
