const express = require("express");
const router = express.Router();
const protect = require("../middleware/protect");
const DecryptionLog = require("../models/DecryptionLog");
const File = require("../models/File");

router.get("/", protect, async (req, res) => {
  try {
    const files = await File.find({ user_id: req.user._id })
      .sort({ createdAt: -1 });

    const decryptLogs = await DecryptionLog.find({
      decrypted_by: req.user._id
    })
      .populate("file_id", "original_filename cloud_path createdAt")
      .sort({ createdAt: -1 });

    const encryptItems = files.map((f) => ({
      _id: f._id,
      action: "ENCRYPT",
      fileName: f.original_filename,
      fileUrl: f.cloud_path,
      createdAt: f.createdAt
    }));

    const decryptItems = decryptLogs.map((d) => ({
      _id: d._id,
      action: "DECRYPT",
      fileName: d.file_id?.original_filename || "-",
      fileUrl: d.file_id?.cloud_path || null,
      createdAt: d.createdAt
    }));

    const items = [...encryptItems, ...decryptItems].sort(
      (a, b) => b.createdAt - a.createdAt
    );

    res.json(items);
  } catch (err) {
    console.error("Activity error:", err.message);
    res.status(500).json({ message: "Failed to fetch activity" });
  }
});

module.exports = router;
