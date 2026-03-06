const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const transporter = require("../utils/mailer");
const router = express.Router();

/* =====================
   REGISTER API
   POST /api/auth/register
===================== */
router.post("/register", async (req, res) => {
  console.log("Register route hit");
  console.log("REQ BODY:", req.body);

  const { firstname, lastname, email, password } = req.body || {};

  // Validation
  if (!firstname || !email || !password) {
    return res.status(400).json({
      message: "Firstname, email, and password are required"
    });
  }

  try {
    const emailLower = email.toLowerCase().trim();

    // ✅ Check if user already exists (case insensitive)
    const existingUser = await User.findOne({ email: emailLower });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // ✅ Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // ✅ Create new user
    const user = new User({
      firstname,
      lastname,
      email: emailLower,
      password: passwordHash
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({
      message: "Server error"
    });
  }
});


/* =====================
   LOGIN API
   POST /api/auth/login
===================== */
router.post("/login", async (req, res) => {
  console.log("Login route hit");

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required"
    });
  }

  try {
    const emailLower = email.toLowerCase().trim();
    const user = await User.findOne({ email: emailLower });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // 🔥 Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP and expiry (5 minutes)
    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;
    await user.save();

    console.log("Generated OTP:", otp);

    // Send OTP email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Your Login OTP - DeepShield",
      text: `Your OTP is ${otp}. It expires in 5 minutes.`
    });

    res.status(200).json({
      message: "OTP sent successfully"
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({
      message: "Server error"
    });
  }
});

router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({
      message: "Email and OTP are required"
    });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user || user.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP"
      });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({
        message: "OTP expired"
      });
    }

    // Clear OTP
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    // 🔐 Generate JWT after OTP verification
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token
    });

  } catch (error) {
    console.error("VERIFY OTP ERROR:", error);
    res.status(500).json({
      message: "Server error"
    });
  }
});

module.exports = router;
