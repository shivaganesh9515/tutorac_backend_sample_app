const express = require("express");
const router = express.Router();
const { Post } = require("../models/Post");

// ➕ Create post
router.post("/", async (req, res) => {
  try {
    const post = new Post(req.body);
    console.log("Creating post:", post);
    await post.save();
    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
