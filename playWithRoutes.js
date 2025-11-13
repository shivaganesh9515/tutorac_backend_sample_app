const express = require("express");
const router = express.Router();

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  if (token === "mysecrettoken") {
    next();
  } else {
    res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

router.get("/valid-route", authMiddleware, (req, res) => {
  res.json({ message: "You have accessed a protected route!" });
});

router.get("/normal-route", (req, res) => {
  res.json({ message: "This is a normal route without authentication." });
});

// create dummy login and return token
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "password") {
    res.json({ token: "mysecrettoken" });
  } else {
    res.status(401).json({ message: "Unauthorized: Invalid credentials" });
  }
});

module.exports = router;
