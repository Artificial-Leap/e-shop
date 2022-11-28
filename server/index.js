import express, { json } from "express";
import database from "./database.js";

new database();

const app = express();
app.use(json({ limit: "50mb" }));
app.use(express.static("files"));
app.use("/static", express.static("public"));

const port = 3002;

app.post("/", (req, res) => {
  const body = req.body;
  console.log("body:", body);
  res.send("done");
});

app.listen(port, () => {
  console.log(`File server listening on port ${port}`);
});
