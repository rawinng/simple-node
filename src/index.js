import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({ status: "OK", data: [] });
});

app.listen(3000, () => {
  console.log("Start app at port : 3000");
});

