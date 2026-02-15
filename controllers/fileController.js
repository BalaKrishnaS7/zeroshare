const File = require("../models/File");
const { encryptFile, decryptFile } = require("../utils/encryption");
const { logAction } = require("../utils/auditLogger");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");

/* =======================
   MULTER CONFIG
======================= */
const storage = multer.memoryStorage();
exports.upload = multer({ storage }).single("file");

/* =======================
   UPLOAD + ENCRYPT FILE
======================= */
exports.uploadEncryptedFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { encrypted, iv } = encryptFile(req.file.buffer);

    const userFolder = path.join(
      __dirname,
      "../uploads",
      "user_" + req.user.id
    );

    if (!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder, { recursive: true });
    }

    const storedName = Date.now() + "-" + req.file.originalname;
    const filePath = path.join(userFolder, storedName);

    fs.writeFileSync(filePath, encrypted);

    const newFile = await File.create({
      originalName: req.file.originalname,
      storedName,
      owner: req.user.id,
      iv,
    });

    await logAction({
      userId: req.user.id,
      action: "UPLOAD",
      fileId: newFile._id,
      message: "Encrypted file uploaded",
      ip: req.ip,
    });

    res.status(201).json({
      message: "File uploaded and encrypted",
      file: newFile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "File upload failed" });
  }
};

/* =======================
   DOWNLOAD + DECRYPT FILE
======================= */
exports.downloadFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // RBAC: Owner OR Admin
    if (
      file.owner.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      await logAction({
        userId: req.user.id,
        action: "DENIED",
        fileId: file._id,
        message: "Unauthorized download attempt",
        ip: req.ip,
      });

      return res.status(403).json({ message: "Access denied" });
    }

    const filePath = path.join(
      __dirname,
      "../uploads",
      "user_" + file.owner.toString(),
      file.storedName
    );

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "Encrypted file missing" });
    }

    const encryptedData = fs.readFileSync(filePath);
    const decryptedData = decryptFile(encryptedData, file.iv);

    await logAction({
      userId: req.user.id,
      action: "DOWNLOAD",
      fileId: file._id,
      message: "File downloaded successfully",
      ip: req.ip,
    });

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${file.originalName}"`
    );
    res.send(decryptedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Download failed" });
  }
};

/* =======================
   LIST FILES (RBAC)
======================= */
exports.listFiles = async (req, res) => {
  try {
    let files;

    if (req.user.role === "admin") {
      files = await File.find().populate("owner", "name email");
    } else {
      files = await File.find({ owner: req.user.id });
    }

    res.json(files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch files" });
  }
};

/* =======================
   GENERATE TIME-LIMITED SHARE LINK
======================= */
exports.generateShareLink = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    const expiresIn = req.query.expiresIn || "10m";

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // Owner or Admin
    if (
      file.owner.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    const token = jwt.sign(
      {
        fileId: file._id,
        purpose: "share",
      },
      process.env.JWT_SECRET,
      { expiresIn }
    );

    const link = `http://localhost:5000/api/files/shared-download/${token}`;

    res.json({
      message: "Time-limited download link generated",
      expiresIn,
      link,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to generate share link" });
  }
};

/* =======================
   SHARED DOWNLOAD (NO LOGIN)
======================= */
exports.sharedDownload = async (req, res) => {
  try {
    const decoded = jwt.verify(
      req.params.token,
      process.env.JWT_SECRET
    );

    if (decoded.purpose !== "share") {
      return res.status(403).json({ message: "Invalid share token" });
    }

    const file = await File.findById(decoded.fileId);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    const filePath = path.join(
      __dirname,
      "../uploads",
      "user_" + file.owner.toString(),
      file.storedName
    );

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "Encrypted file missing" });
    }

    const encryptedData = fs.readFileSync(filePath);
    const decryptedData = decryptFile(encryptedData, file.iv);

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${file.originalName}"`
    );
    res.send(decryptedData);
  } catch (error) {
    return res.status(401).json({
      message: "Share link expired or invalid",
    });
  }
};

/* =======================
   SECURE FILE DELETION
======================= */
exports.deleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // RBAC: Owner OR Admin
    if (
      file.owner.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      await logAction({
        userId: req.user.id,
        action: "DENIED",
        fileId: file._id,
        message: "Unauthorized delete attempt",
        ip: req.ip,
      });

      return res.status(403).json({ message: "Access denied" });
    }

    const filePath = path.join(
      __dirname,
      "../uploads",
      "user_" + file.owner.toString(),
      file.storedName
    );

    // Remove encrypted file from disk
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Remove metadata
    await file.deleteOne();

    // Audit log
    await logAction({
      userId: req.user.id,
      action: "DELETE",
      fileId: file._id,
      message: "File securely deleted",
      ip: req.ip,
    });

    res.json({ message: "File deleted securely" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "File deletion failed" });
  }
};
