const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const TempUser = require("../models/TempUser");
require("dotenv").config();

const isPasswordStrong = (password) => {
  return password.length < 8;
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendVerificationEmail = (email, code) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Confirm your email",
    text: `Your confirmation code: ${code}`,
  };

  return transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
      throw new Error("Error sending email");
    } else {
      console.log("Email sent: ", info.response);
    }
  });
};

exports.register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    if (isPasswordStrong(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long, contain at least one uppercase letter and one number.",
      });
    }

    const existingUser = await User.findOne({ email });
    const tempUserExists = await TempUser.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (tempUserExists) {
      return res
        .status(400)
        .json({ message: "Confirmation code already sent, check your email." });
    }
    const verificationCode = generateVerificationCode();

    await sendVerificationEmail(email, verificationCode);
    const hashedPassword = await bcrypt.hash(password, 12);

    const tempUser = new TempUser({
      username,
      email,
      password: hashedPassword,
      verificationCode,
    });

    await tempUser.save();

    res.status(200).json({
      message:
        "The confirmation code has been sent to your email. Enter it to complete the registration.",
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.verifyEmail = async (req, res) => {
  const { email, code } = req.body;

  try {
    const tempUser = await TempUser.findOne({ email });

    if (!tempUser) {
      return res.status(400).json({ message: "User not found" });
    }

    if (tempUser.verificationCode === code) {
      const user = new User({
        username: tempUser.username,
        email: tempUser.email,
        password: tempUser.password,
      });

      await user.save();

      await TempUser.deleteOne({ email });

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "3h",
      });
      res.status(201).json({ token, userId: user._id });
    } else {
      return res.status(400).json({ message: "Invalid confirmation code" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });

    res.json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const url = `http://localhost:3000/reset-password/${token}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      html: `You requested a password reset. Click the link to reset your password: <a href="${url}">here</a>`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (error) {
    console.error("Error during forgot password:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (isPasswordStrong(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long, contain at least one uppercase letter and one number.",
      });
    }

    const existingUsers = await User.find();
    const isPasswordTaken = existingUsers.some((existingUser) => {
      return bcrypt.compareSync(password, existingUser.password);
    });

    if (isPasswordTaken) {
      return res
        .status(400)
        .json({ message: "A user with this password already exists" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Password reset error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword, userId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect current password" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password successfully changed" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: "Failed to change password" });
  }
};
