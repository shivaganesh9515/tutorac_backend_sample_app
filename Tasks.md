🧩 Task: Build CRUD for Posts with Relation to Users

🎯 Objective

Create a post.js file to implement CRUD APIs for blog posts, where each post belongs to a user.
You will use Express and in-memory arrays (no database yet).

⸻

🧠 Concepts Practiced
• Express Router
• RESTful routes
• Request params and body
• Relationship between two resources (User ↔ Post)

⸻

🧱 Setup

You already have user.js and server.js.
Now create a new file: post.js.

Each Post should have:

{
id: Number,
userId: Number, // references a user
title: String,
content: String
}

⸻

🔧 Tasks

1. Create a new post

Route: POST /posts
• Accept userId, title, and content in the request body.
• Check if userId exists in the users array (from user.js).
• If not found → return 400 with message "Invalid userId".
• If valid → create a new post and add it to the posts array.
• Return the created post in response.

⸻

2. Get all posts

Route: GET /posts
• Return all posts.
• Bonus: Allow query param ?userId= to filter posts by a specific user.

Example:

GET /posts?userId=2

→ returns only posts created by user with ID 2.

⸻

3. Get single post

Route: GET /posts/:id
• Find the post by ID.
• If not found → return 404.
• Return the post details including user info (you can attach the user object to the response).

⸻

4. Update a post

Route: PUT /posts/:id
• Update the title or content (or both) of the post.
• Validate that the post exists.
• Return the updated post.

⸻

5. Delete a post

Route: DELETE /posts/:id
• Delete a post by its ID.
• Return a success message if deleted, or 404 if not found.

⸻

📁 Folder Structure

project/
├── user.js
├── post.js
├── server.js
└── package.json

⸻

⚙️ In server.js

Make sure both routers are used:

const express = require("express");
const app = express();
const userRoutes = require("./user");
const postRoutes = require("./post");

app.use(express.json());
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));

⸻

🧪 Example Requests

➕ Create Post

POST /posts
Content-Type: application/json

{
"userId": 1,
"title": "My First Post",
"content": "Learning Node.js is fun!"
}

🔍 Get All Posts

GET /posts

🔍 Get Posts by User

GET /posts?userId=1

✏️ Update Post

PUT /posts/1001
{
"title": "Updated Title"
}

❌ Delete Post

DELETE /posts/1001

⸻

🧩 Bonus Challenge

Add a new endpoint:

GET /users/:id/posts

→ Returns all posts created by that specific user.
