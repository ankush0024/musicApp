/** @format */

/** @format */

const express = require("express");
const app = express();
const port = 8000;

app.get("/", (req, res) => {
  console.log("Hello world");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
