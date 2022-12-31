import express, { json } from "express";
import database from "./database.js";
import emailer from "./emailer.js";
import nfts from "./nfts.js";

new database();
new emailer();
new nfts();

const app = express();
app.use(json({ limit: "50mb" }));
app.use(express.static("files"));
app.use("/static", express.static("public"));

const port = 80;
const localEmail = "test@gmail.com";

app.post("/", (req, res) => {
  const body = req.body;
  console.log("body:", body);
  res.send("done");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const resp = await database.instance.login(email, password);
  console.log("login resp:", resp);

  res.send({
    status: resp ? "ok" : "invalid",
    user: resp ? { email, password } : null,
  });
});

app.post("/register", async (req, res) => {
  const { email, username, password } = req.body;
  const resp = await database.instance.register(username, email, password);

  res.send({ status: resp });
});

app.get("/products", async (req, res) => {
  const products = await database.instance.getProducts();
  res.send(products);
});

app.get("/sizes", async (req, res) => {
  const sizes = await database.instance.getSizes();
  res.send(sizes);
});

app.post("/checkout", async (req, res) => {
  const {
    email,
    name,
    content,
    address,
    phoneNumber,
    paymentMethod,
    paymentInfo,
    shippingMethod,
    gift,
    invoice,
    vatid,
    invoiceAddress,
  } = req.body;

  //update products with the current new availability
  //check again if all products are available, also cart item count
  //proceed to payment
  //send an automatic email for delivery and order info
  //add the delivery to the database with a custom Delivery id (character/number 8 length)
  //send the response message (ok if the order is done, otherwise error message)
  //send to the orders' email the new order with all products and shipment address

  let _content = "";
  for (let i = 0; i < content.length; i++) {
    if (!(await database.instance.productSizeExists(content[i].id))) {
      //size doesn't exist
    }

    _content +=
      "id: " +
      content[i].id +
      ", size: " +
      content[i].size +
      ", quantity: " +
      content[i].quantity +
      " | ";

    await database.instance.removeProductSize(
      content[i].id,
      content[i].size,
      content[i].quantity
    );
  }

  await database.instance.addOrder(
    email,
    _content,
    name,
    address,
    phoneNumber,
    paymentMethod,
    paymentInfo,
    shippingMethod,
    gift,
    invoice,
    vatid,
    invoiceAddress
  );
  emailer.instance.sendEmail(email, "Order Confirmation", "");
  emailer.instance.sendEmail(localEmail, "Order Received", "");
});

app.post("/contact", async (req, res) => {
  const { email, name, orderId, query } = req.body;

  res.send("ok");
});

app.post("/chat", async (req, res) => {
  const { message, sender } = req.body;
  //add the message to chat history with current sender & ip
  //get message response
  //add the response to the history too

  res.send({ message });
});

app.listen(port, () => {
  console.log(`File server listening on port ${port}`);
});
