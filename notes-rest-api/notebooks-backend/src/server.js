const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({ message: "hello from Notebook is working watch " });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Notebook is listening on part ${port}`);
});
