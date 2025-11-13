const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public"));

// Middleware 1: Logs request info
const logger = (req, res, next) => {
  console.log(`🧾 ${req.method} ${req.url}`);
  next(); // move to next middleware
};

// Middleware 2: Adds a timestamp
const addRequestTime = (req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
};

// Normal route that throws an error
app.get("/fail", (req, res, next) => {
  try {
    // Simulate an error
    throw new Error("Something went wrong on the server!");
  } catch (error) {
    next(error); // pass the error to the error-handling middleware
  }
});

const errorHandler = (err, req, res, next) => {
  console.error("🚨 Error caught:", err.message);
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
  });
};

// 🧩 Error Handling Middleware (must be defined LAST)
app.use(errorHandler);

app.use("/test-routes", require("./playWithRoutes"));

const port = 3300;
const users = require("./users");
const posts = require("./posts");

app.get("/", logger, addRequestTime, (req, res) => {
  res.send(`Request received at: ${req.requestTime}`);
});

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.get("/htmlFile", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/dynamicHtml", (req, res) => {
  const user = {
    name: "Shubham Jain",
    role: "Senior Software Engineer",
    skills: ["Node.js", "React.js", "Next.js", "Go", "AWS"],
    joinedAt: "March 2022",
  };
  res.render("home", { user });
});

mongoose
  .connect("mongodb://127.0.0.1:27017/sampleMongoDB") // Url of the mongodb server
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
