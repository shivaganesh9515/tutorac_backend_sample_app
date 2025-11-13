const express = require("express");
const router = express.Router();
const { User } = require("../models/User");

// ➕ Create user
router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    console.log("Creating user:", user);
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔍 Get all users
router.get("/", async (req, res) => {
  try {
    // it is returning an array of users
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔍 Get user by ID
router.get("/:id", async (req, res) => {
  try {
    // it is returning a single user object
    const user = await User.findById(req.params.id);
    console.log("Fetched user:", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✏️ Update user by ID
router.put("/:id", async (req, res) => {
  try {
    // why using new: true?
    // It returns the modified document rather than the original.

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log("Updated user:", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ❌ Delete user by ID
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    console.log("Deleted user:", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
