const express = require("express");
const router = express.Router();

// In-memory data store
let posts = [
  {
    id: 13311,
    title: "Sample title",
    description: "Sample description",
  },
  {
    id: 24622,
    title: "Another title",
    description: "Another description",
  },
  { id: 35933, title: "Third title", description: "Third description" },
  { id: 47244, title: "Fourth title", description: "Fourth description" },
];

router.get("/", (req, res) => {
  res.json({ data: posts });
});

module.exports = router;
