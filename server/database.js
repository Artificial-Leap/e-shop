import sqlite3 from "sqlite3";
import { open } from "sqlite";
import * as fs from "fs";

export default class database {
  static instance;
  db = null;

  constructor() {
    database.instance = this;
    this.initDB();
  }

  initDB = async (dbname = "./db.sqlite") => {
    let firstInit = !fs.existsSync(dbname);

    this.db = await open({
      filename: dbname,
      driver: sqlite3.Database,
    });

    if (firstInit) {
      await this.db.run(
        "CREATE TABLE users(id TEXT, username TEXT, email TEXT, password TEXT)"
      );
      await this.db.run(
        "CREATE TABLE products(id text, name text, stock int, price float, shortDesc text, description text, image text, hasSize boolean)"
      );
      await this.db.run(
        "CREATE TABLE sizes(id text, xs int, s int, m int, l int, xl int, xxl int)"
      );
      await this.db.run(
        "CREATE TABLE orders(id text, email text, content text, name text, address text, phoneNumber text, paymentMethod text, paymentInfo text, shippingMethod text, gift text, invoice text, vatid text, invoiceAddress text, status text, date text)"
      );
      await this.db.run("CREATE TABLE qr_codes(id text, info text)");
      await this.db.run(
        "CREATE TABLE discount_codes(id text, discount int, target int, used_amount int, max_use_amount int)"
      );
      await this.addProduct(
        "3dc7fiyzlfmkfqseqam",
        "bag",
        10,
        500,
        "bag",
        "bag",
        "http://35.217.24.65:8081/http://35.217.24.65:3002/static/bag.png",
        "false"
      );
      await this.addProduct(
        "3dc7fiyzlfmkfqseqam",
        "bag",
        10,
        500,
        "bag",
        "bag",
        "http://35.217.24.65:8081/http://35.217.24.65:3002/static/bag.png",
        "true"
      );
      await this.updateProductSize(
        "3dc7fiyzlfmkfqseqam",
        10,
        10,
        10,
        10,
        10,
        10
      );
      await this.addProduct(
        "aoe8wvdxvrkfqsew67",
        "shirt",
        10,
        500,
        "shirt",
        "shirt",
        "http://35.217.24.65:8081/http://35.217.24.65:3002/static/shirt.png",
        "true"
      );
      await this.updateProductSize(
        "aoe8wvdxvrkfqsew67",
        10,
        10,
        10,
        10,
        10,
        10
      );
      await this.addProduct(
        "bmfrurdkswtkfqsf15j",
        "shorts",
        10,
        500,
        "shorts",
        "shorts",
        "http://35.217.24.65:8081/http://35.217.24.65:3002/static/shorts.png",
        "true"
      );
      await this.updateProductSize(
        "bmfrurdkswtkfqsf15j",
        10,
        10,
        10,
        10,
        10,
        10
      );

      await this.addQR("tt", "Test QR Info");
    }
  };

  login = async (email, password) => {
    if (!email || !password) {
      return false;
    }

    const query = "SELECT * FROM users WHERE email = ? AND password = ?";
    const result = await this.db.get(query, [email, password]);
    console.log("res", result);
    if (!result || result === undefined) {
      return false;
    }

    return true;
  };

  register = async (username, email, password) => {
    if (!username || !password) {
      return "Invalid username or password!";
    }
    if (!email.includes("@") || !email.includes(".")) {
      return "Invalid email!";
    }
    if (await this.usernameExists(username)) {
      return "Username already exists!";
    }
    if (await this.emailExists(email)) {
      return "Email already exists!";
    }

    const query =
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    await this.db.run(query, [username, email, password]);
    return "ok";
  };

  getNextFreeUserId = async () => {
    const query = "SELECT MAX(id) FROM users";
    const result = await this.db.get(query);
    return result["MAX(id)"] + 1;
  };

  userIDExists = async (username) => {
    const query = "SELECT * FROM users WHERE username = ?";
    const result = await this.db.get(query, [username]);
    if (!result) {
      return false;
    }

    return true;
  };

  usernameExists = async (username) => {
    const query = "SELECT * FROM users WHERE username = ?";
    const result = await this.db.get(query, [username]);
    return result !== undefined;
  };

  emailExists = async (email) => {
    const query = "SELECT * FROM users WHERE email = ?";
    const result = await this.db.get(query, [email]);
    return result !== undefined;
  };

  getProducts = async () => {
    const query = "SELECT * FROM products";
    const result = await this.db.all(query);
    return result;
  };

  addProduct = async (
    id,
    name,
    stock,
    price,
    shortDesc,
    description,
    image,
    hasSize
  ) => {
    if (await this.productIDExists(id)) {
      return "Product ID already exists!";
    }

    const query =
      "INSERT INTO products (id, name, stock, price, shortDesc, description, image, hasSize) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    await this;

    this.db.run(query, [
      id,
      name,
      stock,
      price,
      shortDesc,
      description,
      image,
      hasSize,
    ]);
    return "ok";
  };

  productIDExists = async (id) => {
    const query = "SELECT * FROM products WHERE id = ?";
    const result = await this.db.get(query, [id]);
    return result !== undefined;
  };

  updateProductSize = async (id, xs, s, m, l, xl, xxl) => {
    const query =
      "UPDATE sizes SET xs = ?, s = ?, m = ?, l = ?, xl = ?, xxl = ? WHERE id = ?";
    await this.db.run(query, [xs, s, m, l, xl, xxl, id]);
  };
  productSizeExists = async (id, size, amount) => {
    const query = "SELECT * FROM sizes WHERE id = ?";
    const result = await this.db.get(query, [id]);

    if (result === undefined) {
      return false;
    }
    if (result[size] < amount) {
      return false;
    }
    return true;
  };

  removeProductSize = async (id, size, amount) => {
    const query = "SELECT * FROM sizes WHERE id = ?";
    const result = await this.db.get(query, [id]);
    const newAmount = result[size] - amount;
    const query2 = "UPDATE sizes SET " + size + " = ? WHERE id = ?";
    await this.db.run(query2, [newAmount, id]);
  };

  getSizes = async () => {
    const query = "SELECT * FROM sizes";
    const result = await this.db.get(query);
    return result;
  };
  getSizesFor = async (id) => {
    const query = "SELECT * FROM sizes WHERE id = ?";
    const result = await this.db.get(query, [id]);
    return result;
  };

  addOrder = async (
    email,
    content,
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
  ) => {
    const date = new Date().toISOString().slice(0, 19).replace("T", " ");
    const status = "created";
    const id = await this.makeOrderId();
    const query =
      "INSERT INTO orders (id, email, content, name, address, phoneNumber, paymentMethod, paymentInfo, shippingMethod, gift, invoice, vatid, invoiceAddress, status, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    await this.db.run(query, [
      id,
      email,
      content,
      name,
      address,
      phoneNumber,
      paymentMethod,
      paymentInfo,
      shippingMethod,
      gift,
      invoice,
      vatid,
      invoiceAddress,
      status,
      date,
    ]);
  };

  orderIdExists = async (id) => {
    const query = "SELECT * FROM orders WHERE id = ?";
    const result = await this.db.get(query, [id]);
    return result !== undefined;
  };

  makeOrderId = async () => {
    const id = Math.floor(Math.random() * 1000000000);
    if (await this.orderIdExists(id)) {
      return await this.makeOrderId();
    }
    return id;
  };

  updateOrderStatus = async (id, status) => {
    const query = "UPDATE orders SET status = ? WHERE id = ?";
    await this.db.run(query, [status, id]);
  };

  getOrder = async (id) => {
    const query = "SELECT * FROM orders WHERE id = ?";
    const result = await this.db.get(query, [id]);
    return result;
  };

  getQR = async (id) => {
    const query = "SELECT * FROM qr_codes WHERE id = ?";
    const result = await this.db.get(query, [id]);
    return result;
  };

  addQR = async (id, info) => {
    const query = "INSERT INTO qr_codes (id, info) VALUES (?, ?)";
    await this.db.run(query, [id, info]);
  };
  removeQR = async (id) => {
    const query = "DELETE FROM qr_codes WHERE id = ?";
    await this.db.run(query, [id]);
  };

  addDiscountCode = async (code, discount, target, max_use_amount) => {
    const query =
      "INSERT INTO discount_codes (id, discount, target, used_amount, max_use_amount) VALUES (?, ?, ?, ?)";
    await this.db.run(query, [code, discount, target, 0, max_use_amount]);
  };
  updateDiscountCodeUsed = async (code) => {
    const query = "SELECT * FROM discount_codes WHERE id = ?";
    const result = await this.db.get(query, [code]);
    const newAmount = result.used_amount + 1;
    const query2 = "UPDATE discount_codes SET used_amount = ? WHERE id = ?";
    await this.db.run(query2, [newAmount, code]);
  };
  getDiscount = async (id) => {
    const query = "SELECT * FROM discount_codes WHERE id = ?";
    const result = await this.db.get(query, [id]);
    return result;
  };
  discountIsUsable = async (code, user) => {
    const dsCode = await this.getDiscount(code);
    if (!dsCode) {
      return false;
    }

    if (dsCode.max_use_amount <= dsCode.used_amount) {
      return false;
    }

    if (dsCode.target === "global") {
      return true;
    }

    if (dsCode.target === user) {
      return true;
    }

    return false;
  };
}
