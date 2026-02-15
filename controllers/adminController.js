const AuditLog = require("../models/AuditLog");

exports.getAuditLogs = async (req, res) => {
  try {
    const { action, userId, from, to } = req.query;

    const filter = {};

    if (action) filter.action = action;          // UPLOAD | DOWNLOAD | DENIED
    if (userId) filter.user = userId;

    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from);
      if (to) filter.createdAt.$lte = new Date(to);
    }

    const logs = await AuditLog.find(filter)
      .populate("user", "name email role")
      .populate("file", "originalName")
      .sort({ createdAt: -1 });

    res.json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch audit logs" });
  }
};
