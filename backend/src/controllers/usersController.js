const User = require("../models/userModel");

exports.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve products" });
  }
};

exports.putUser = async (req, res) => {
  try {
    const { username } = req.body;

    const user = await User.findById(req.user);

    if (user) {
      if (username) {
        user.username = username;
      }

      if (req.file) {
        user.profileImage = req.file.path;
      }

      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};
