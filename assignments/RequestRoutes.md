# 🧩 Task: Understanding All Types of Parameters in Express.js

## 🎯 Objective

Learn how data travels from the **frontend to the backend** in an Express.js app through different types of parameters — and how to handle them properly in API routes.

---

## 🧠 What You’ll Learn

- The difference between **Route Params**, **Query Params**, **Request Body**, and **Headers**
- When and why each type is used
- How to access and handle them inside Express routes
- How to combine multiple parameter types in a single request

---

## 🧩 The Four Main Types of Parameters

| Type             | Accessed From | Example URL                     | Common Use                                      |
| ---------------- | ------------- | ------------------------------- | ----------------------------------------------- |
| **Route Params** | `req.params`  | `/users/123`                    | Identifying a specific resource (e.g., user ID) |
| **Query Params** | `req.query`   | `/search?name=shubham&age=25`   | Filtering, sorting, or searching data           |
| **Request Body** | `req.body`    | Sent with `POST`/`PUT` requests | Sending form data, JSON payloads, login info    |
| **Headers**      | `req.headers` | Included in the request header  | Sending metadata (tokens, auth info, API keys)  |

---

## 🪜 Steps

### Step 1: Create a Sample Route for Each Type

1. **Route Param Example** — Create a route like `/users/:id` that logs and returns the user ID.
2. **Query Param Example** — Create a route `/search` that logs and returns query parameters like `name` or `city`.
3. **Body Example** — Create a `POST /register` route that logs and returns the user data sent in the request body.
4. **Header Example** — Create a route `/check-auth` that reads a custom header like `x-api-key` or `authorization`.

---

### Step 2: Observe the Request Flow

Send different requests using Postman or Thunder Client:

| Route                  | Method | Example       | Where Data Appears         |
| ---------------------- | ------ | ------------- | -------------------------- |
| `/users/10`            | GET    | URL path      | `req.params.id`            |
| `/search?name=Shubham` | GET    | URL query     | `req.query.name`           |
| `/register`            | POST   | JSON body     | `req.body.name`            |
| `/check-auth`          | GET    | Custom header | `req.headers["x-api-key"]` |

Add `console.log()` inside each route to visualize what’s being received on the backend.

---

### Step 3: Combine Parameters

Create one advanced route that uses **all** four types of parameters together:

Example (conceptually):

POST /users/5/update?role=admin
Header: x-api-key: 12345
Body: { “email”: “shubham@example.com” }

Log each parameter source separately:

- Route param: user ID
- Query param: role
- Body: email
- Header: API key

---

### Step 4: Reflect

Answer these questions in your notes:

1. Which parameter type is most secure for sensitive data?
2. Why do we avoid sending large data through query params?
3. Why must the server use `express.json()` middleware to read `req.body`?

---

## 🧩 Bonus Challenge

Create a route `/api/log-request` that returns a JSON response showing **all four** parameter types in one response:

```json
{
  "params": {...},
  "query": {...},
  "body": {...},
  "headers": {...}
}
```
