const AuditLog = require("../models/AuditLog");

exports.logAction = async ({ userId, action, fileId, message, ip }) => {
  try {
    await AuditLog.create({
      user: userId,
      action,
      file: fileId,
      message,
      ipAddress: ip,
    });
  } catch (err) {
    console.error("Audit log failed:", err.message);
  }
};
