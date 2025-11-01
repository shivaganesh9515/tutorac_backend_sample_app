const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;
const users = require("./users");
const posts = require("./posts");

app.get("/", (req, res) => {
  res.send("Hello World from backend, Holaaaa Amigo!");
});

app.use("/api/users", users);
app.use("/api/posts", posts);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
