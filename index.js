const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;
const users = require("./users");

app.get("/", (req, res) => {
  res.send("Hello World from backend, Holaaaa Amigo!");
});

app.use("/users", users);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
