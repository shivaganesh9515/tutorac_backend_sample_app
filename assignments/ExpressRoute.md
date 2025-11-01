# 🧩 Task: Understanding Route Matching and 404 Handling in Express

## 🎯 Objective

Learn how Express processes requests step-by-step, how it decides **which route** to run, and what happens when **no route matches** (404 scenario).

---

## 🧠 What You’ll Learn

- How Express checks routes **in order**
- What happens when **multiple routes** could match the same request
- How to **see route flow** using `console.log`
- Why **404 handling** is important

---

## 🪜 Steps

### Step 1: Create Multiple Routes

Create a few different routes that look similar (for example: `/users`, `/users/:id`, `/users/profile`).

Add simple `console.log()` messages inside each route to track which one runs when you send different requests.

### Step 2: Observe Route Matching

Send different requests like:

- `/users`
- `/users/10`
- `/users/profile`
- `/random`

Check the **console output** each time to see which route was matched by Express.

> 🧠 Tip: Express checks routes **top to bottom** and runs the **first one that matches**.

### Step 3: Add a 404 Handler

After all routes, create one final route handler that catches everything that didn’t match.

Example behavior:

- If you visit `/unknown`, it should log something like “Route not found” and respond with a 404 message.

### Step 4: Reflect

Answer these questions in your notes:

1. Why does the **order of routes** matter in Express?
2. What happens when you define `/users/:id` before `/users/profile`?
3. What role does the **404 handler** play in user experience?

---

## 🧩 Bonus Challenge

Try nesting routes logically (like `/posts` and `/posts/:id`) and observe how Express handles them.

---

## ✅ Outcome

By the end of this task, you’ll be able to:

- Predict which route will run for any given request.
- Understand why **route order** matters.
- Know how to handle **unmatched routes (404)** gracefully.
