// user.js
const express = require("express");
const { createUser, getSingleUser } = require("./controllers/users");
const router = express.Router();

// In-memory data store
let users = [
  {
    id: 10137,
    name: "Shiva",
    email: "shiva@gmail.com",
    phone: "423523525",
  },
  {
    id: 96951,
    name: "Suresh",
    email: "suresh@gmail.com",
    phone: "354534534",
  },
  {
    id: 60512,
    name: "Shubham",
    email: "shub@gmail.com",
    phone: "635456456",
  },
];

// CREATE - Add a new user
router.post("/", createUser(users));

// READ - Get all users
router.get("/", (req, res) => {
  // res.json({ data: users });
  res.status(404).json({ data: users });
});

// Params
// Query Strings
// Body

// DATA

// READ - Get single user by ID
router.get("/:id", getSingleUser(users, "Hello from user route"));

// UPDATE - Update user by ID
router.put("/:id", (req, res) => {
  const { name, email, phone } = req.body;
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));

  if (userIndex === -1)
    return res.status(404).json({ message: "User not found" });

  users[userIndex] = {
    ...users[userIndex],
    name: name || users[userIndex].name,
    email: email || users[userIndex].email,
    phone: phone || users[userIndex].phone,
  };

  res.json({ message: "User updated successfully", user: users[userIndex] });
});

// DELETE - Delete user by ID
router.delete("/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));

  if (userIndex === -1)
    return res.status(404).json({ message: "User not found" });

  const deletedUser = users.splice(userIndex, 2);
  res.json({ message: "User deleted successfully", user: deletedUser[0] });
});

module.exports = router;

// Summary of HTTP Methods and CRUD Operations
// GET
// POST
// PUT
// DELETE

// C - Create
// R - Read
// U - Update
// D - Delete
