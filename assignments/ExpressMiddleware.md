# 🧩 Express.js Middleware Tasks

🎯 Objective
Understand how **middlewares** work in Express, create your own **application-level middleware**, and implement a centralized **error-handling middleware** to manage runtime errors gracefully.

---

## 🧠 What You'll Learn

- What a middleware is and how it fits in the request–response cycle
- How to use `next()` to move between multiple middlewares
- How to build and apply **Application-level middlewares**
- How to handle errors globally using an **Error-handling middleware**

---

### 🪜 Task 1: Create a Custom Middleware

🧩 Goal
Create a simple middleware that logs every incoming request.
Steps

1. Create a new Express app (`middleware-demo.js`).
2. Define a custom middleware function that:
   - Logs the HTTP method (e.g., GET, POST)
   - Logs the URL (e.g., `/users`)
   - Logs the current timestamp
3. Use `app.use()` to apply it globally.
4. Add 2 routes: `/` and `/about`.
5. Check the terminal after each request to see your logs.
   💡 Example Output
   📦 GET request received at / on 2025-10-28T14:35:00.000Z
   📦 GET request received at /about on 2025-10-28T14:35:05.000Z
   📝 Complete Code Example
   const express = require('express');
   const app = express();
   // Custom logging middleware
   app.use((req, res, next) => {
   console.log(`📦 ${req.method} request received at ${req.path} on ${new Date().toISOString()}`);
   next();
   });
   // Routes
   app.get('/', (req, res) => {
   res.send('Welcome to the Home Page');
   });
   app.get('/about', (req, res) => {
   res.send('About Us Page');
   });
   const PORT = 3000;
   app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
   });

---

### 🪜 Task 2: Application-Level Middleware

🧩 Goal
Learn how to use middlewares that apply to all routes or specific routes.
Steps

1. Add a second middleware that adds a property req.requestTime = new Date().toISOString().
2. Use it globally with app.use().
3. In your routes, return both a message and the req.requestTime value.
   Example Response
   {
   message: Welcome to the Home Page,
   requestedAt: 2025-10-28T14:35:00.000Z
   }
4. Now, modify it so the middleware only applies to one specific route (e.g., /about).
5. Observe the difference: / should not have requestedAt, /about should.
   📝 Complete Code Example
   const express = require('express');
   const app = express();
   // Logging middleware (global)
   app.use((req, res, next) => {
   console.log(`📦 ${req.method} request received at ${req.path} on ${new Date().toISOString()}`);
   next();
   });
   // Request time middleware (global)
   app.use((req, res, next) => {
   req.requestTime = new Date().toISOString();
   next();
   });
   // Routes
   app.get('/', (req, res) => {
   res.json({
   message: "Welcome to the Home Page"
   });
   });
   // Route-specific middleware
   app.use('/about', (req, res, next) => {
   req.specialMessage = "This is a special message for the about page!";
   next();
   });
   app.get('/about', (req, res) => {
   res.json({
   message: "About Us Page",
   requestedAt: req.requestTime,
   special: req.specialMessage
   });
   });
   const PORT = 3000;
   app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
   });

---

### 🪜 Task 3: Error-Handling Middleware

🧩 Goal
Learn to handle application errors gracefully without crashing the server.
Steps

1. Add a route /fail that intentionally throws an error:
   - For example: access a property of undefined or throw new Error("Something broke!").
2. Create an error-handling middleware (must have 4 parameters):
   app.use((err, req, res, next) => {
   console.error("🚨 Error caught:", err.message);
   res.status(500).json({
   success: false,
   message: "Internal Server Error",
   error: err.message
   });
   });
3. Test the error handling by visiting /fail
4. Observe how the server doesn't crash and returns a proper error response
   📝 Complete Code Example
   const express = require('express');
   const app = express();
   // Logging middleware
   app.use((req, res, next) => {
   console.log(`📦 ${req.method} request received at ${req.path} on ${new Date().toISOString()}`);
   next();
   });
   // Request time middleware
   app.use((req, res, next) => {
   req.requestTime = new Date().toISOString();
   next();
   });
   // Routes
   app.get('/', (req, res) => {
   res.json({
   message: "Welcome to the Home Page",
   requestedAt: req.requestTime
   });
   });
   app.get('/about', (req, res) => {
   res.json({
   message: "About Us Page",
   requestedAt: req.requestTime
   });
   });
   // Route that intentionally fails
   app.get('/fail', (req, res, next) => {
   try {
   // This will cause an error
   const undefinedVar = undefined;
   undefinedVar.someProperty; // This will throw TypeError
   } catch (error) {
   next(error); // Pass error to error-handling middleware
   }
   });
   // Alternative way to trigger error
   app.get('/fail-throw', (req, res, next) => {
   throw new Error("Something broke intentionally!");
   });
   // Error-handling middleware (must have 4 parameters)
   app.use((err, req, res, next) => {
   console.error("🚨 Error caught:", err.message);
   console.error("📍 Stack trace:", err.stack);

res.status(500).json({
success: false,
message: "Internal Server Error",
error: err.message,
timestamp: new Date().toISOString()
});
});
// 404 handler (must be after all other routes)
app.use((req, res) => {
res.status(404).json({
success: false,
message: "Route not found",
path: req.path
});
});
const PORT = 3000;
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
🧪 Testing Steps

1. Start the server: node middleware-demo.js
2. Test normal routes:
   - Visit http://localhost:3000/ - Should work normally
   - Visit http://localhost:3000/about - Should work normally
3. Test error routes:
   - Visit http://localhost:3000/fail - Should return 500 error
   - Visit http://localhost:3000/fail-throw - Should return 500 error
4. Test 404:
   - Visit http://localhost:3000/nonexistent - Should return 404 error

---

### 🪜 Task 4: Putting It All Together

🧩 Goal
Create a comprehensive example that demonstrates proper middleware ordering and best practices.
📝 Complete Production-Ready Example
const express = require('express');
const app = express();
// 🏗️ Middleware Order Matters!
// 1. Built-in middleware (always first)
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
// 2. Custom logging middleware
app.use((req, res, next) => {
const timestamp = new Date().toISOString();
console.log(`[${timestamp}] ${req.method} ${req.path}`);
next();
});
// 3. Security/CORS middleware (example)
app.use((req, res, next) => {
res.header('Access-Control-Allow-Origin', '\*');
res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
next();
});
// 4. Request enhancement middleware
app.use((req, res, next) => {
req.requestTime = new Date().toISOString();
req.requestId = Math.random().toString(36).substr(2, 9);
next();
});
// 5. Route-specific middleware
const authenticate = (req, res, next) => {
const authHeader = req.headers.authorization;
if (!authHeader || authHeader !== 'Bearer secret-token') {
return res.status(401).json({
success: false,
message: 'Authentication required'
});
}
req.user = { id: 1, name: 'John Doe' };
next();
};
// 🛣️ Routes
app.get('/', (req, res) => {
res.json({
message: "Public API",
requestedAt: req.requestTime,
requestId: req.requestId
});
});
app.get('/protected', authenticate, (req, res) => {
res.json({
message: "Protected API",
user: req.user,
requestedAt: req.requestTime,
requestId: req.requestId
});
});
app.post('/users', (req, res, next) => {
try {
const { name, email } = req.body;

    if (!name || !email) {
      const error = new Error('Name and email are required');
      error.status = 400;
      throw error;
    }

    // Simulate user creation
    const newUser = {
      id: Date.now(),
      name,
      email,
      createdAt: new Date().toISOString()
    };

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: newUser
    });

} catch (error) {
next(error);
}
});
// 6. Error-handling middleware (must be last)
app.use((err, req, res, next) => {
console.error(`🚨 Error [${req.requestId}]:`, err.message);

const status = err.status || 500;
const message = process.env.NODE_ENV === 'production'
? 'Internal Server Error'
: err.message;

res.status(status).json({
success: false,
message,
requestId: req.requestId,
timestamp: new Date().toISOString()
});
});
// 7. 404 handler (must be after error handler)
app.use((req, res) => {
res.status(404).json({
success: false,
message: 'Route not found',
path: req.path,
requestId: req.requestId
});
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`🚀 Server running on port ${PORT}`);
});

---

✅ Expected Outcomes
By the end of these tasks, you'll be able to:

- ✅ Create custom middleware that logs and enhances requests
- ✅ Apply middleware globally or to specific routes
- ✅ Handle errors gracefully without crashing the server
- ✅ Understand middleware ordering and its importance
- ✅ Implement production-ready middleware patterns

---

🧠 Key Takeaways

1. Middleware Order Matters: Express executes middleware in the order they're defined
2. Always call next(): Unless you want to end the request-response cycle
3. Error handlers need 4 parameters: (err, req, res, next)
4. 404 handlers go last: After all routes and error handlers
5. Use try...catch: In routes to catch synchronous errors
6. Pass errors to next(): To trigger error-handling middleware

---

🚀 Next Steps & Challenges
🎯 Practice Challenges

1. Rate Limiting Middleware: Create middleware that limits requests per IP
2. Request Validation Middleware: Build middleware to validate incoming data
3. Caching Middleware: Implement simple in-memory caching
4. Logging Middleware: Create advanced logging with different levels
   📚 Further Learning

- Study popular middleware like morgan, helmet, cors
- Learn about async middleware and error handling
- Explore middleware composition patterns
- Understand middleware in different Express app instances

---

🔧 Common Middleware Patterns
Authentication Middleware
const auth = (req, res, next) => {
const token = req.headers.authorization?.split(' ')[1];
if (!token) return res.status(401).json({ error: 'No token' });
// Verify token logic here
next();
};
Validation Middleware
const validate = (schema) => (req, res, next) => {
const { error } = schema.validate(req.body);
if (error) return res.status(400).json({ error: error.details[0].message });
next();
};
Rate Limiting Middleware
const rateLimit = {};
const rateLimiter = (req, res, next) => {
const ip = req.ip;
rateLimit[ip] = (rateLimit[ip] || 0) + 1;
if (rateLimit[ip] > 10) return res.status(429).json({ error: 'Too many requests' });
next();
};

---

🎉 Congratulations! You've mastered Express.js middleware fundamentals. Keep practicing and building more complex middleware patterns!
This complete file now includes:

1. ✅ **Complete Task 3** with full testing steps and examples
2. ✅ **New Task 4** with production-ready middleware patterns
3. ✅ **Proper closing sections** with outcomes, takeaways, and next steps
4. ✅ **Fixed formatting** throughout with consistent markdown
5. ✅ **Additional content** including common patterns and challenges
   The file is now comprehensive and ready for learning Express.js middleware concepts!
