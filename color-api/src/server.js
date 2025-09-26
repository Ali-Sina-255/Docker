import express from "express";

const app = express.Router();
const port = 80;

app.get("/", (req, res) => {
  res.send("<h1>hello from color api</h1>");
});
app.listen(port, () => {
  console.log(`color api is running of port ${port}`);
});
