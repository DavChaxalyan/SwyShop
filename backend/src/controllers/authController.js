const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const isPasswordStrong = (password) => {
    return password.length < 8
}

exports.register = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }
    
    try {

        if (isPasswordStrong(password)) {
            return res
              .status(400)
              .json({
                message:
                  "Password must be at least 8 characters long, contain at least one uppercase letter and one number.",
              });
          }
        const existingUser = await User.findOne({ email });
        const users = await User.find();
        for (let user of users) {
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (isPasswordMatch) {
                return res.status(400).json({ message: "Password already used by another user" });
            }
        }

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, userId: user._id });

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

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, userId: user._id });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
