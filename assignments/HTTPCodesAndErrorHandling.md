# 🧩 Task: HTTP Status Codes & Error Handling in Express.js

## 🎯 Objective

Learn how to use proper **HTTP status codes** in your Express routes and handle **errors gracefully** using `try...catch` blocks.

---

## 🧠 What You’ll Learn

- The purpose of **HTTP status codes**
- How to choose the correct status code for different situations
- How to catch and handle errors without crashing the server
- How to send meaningful error messages to the frontend

---

## 🌍 Common HTTP Status Codes

| Code                          | Meaning                  | When to Use                                   |
| ----------------------------- | ------------------------ | --------------------------------------------- |
| **200 OK**                    | Request succeeded        | When returning data successfully              |
| **201 Created**               | New resource created     | After creating a new user, post, etc.         |
| **400 Bad Request**           | Client sent invalid data | Missing required fields or invalid input      |
| **401 Unauthorized**          | Authentication required  | When a user is not logged in or token invalid |
| **403 Forbidden**             | Access denied            | When user doesn’t have permission             |
| **404 Not Found**             | Resource doesn’t exist   | Wrong ID or missing endpoint                  |
| **500 Internal Server Error** | Server-side issue        | Any unexpected failure inside your code       |

---

## 🪜 Steps

### Step 1: Add Status Codes to Existing Routes

In your existing routes (`users`, `posts`, etc.), make sure each operation returns a **meaningful HTTP status code**.

Example thinking:

- When creating something → `201`
- When updating or deleting → `200`
- When user not found → `404`
- When invalid data sent → `400`

> 🧠 _You’re not changing logic — only improving the response quality._

---

### Step 2: Wrap Logic in try...catch

Wrap your route logic inside a `try...catch` block.

- Inside `try` → Write your normal logic (find, create, update).
- Inside `catch` → Handle unexpected errors:
  ```js
  res.status(500).json({ message: "Something went wrong" });
  ```
