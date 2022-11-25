import express, { json } from "express";

const app = express();
app.use(json({ limit: "50mb" }));
app.use(express.static('files'))

const port = 3003;

app.post("/", (req, res) => {
  const body = req.body;
  console.log("body:", body);
  res.send("done");
});

app.listen(port, () => {
  console.log(`File server listening on port ${port}`);
});
