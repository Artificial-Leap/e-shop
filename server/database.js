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
      await this.updateProductSize("3dc7fiyzlfmkfqseqam", 10, 10, 10, 10, 10, 10);
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
      await this.updateProductSize("aoe8wvdxvrkfqsew67", 10, 10, 10, 10, 10, 10);
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
      await this.updateProductSize("bmfrurdkswtkfqsf15j", 10, 10, 10, 10, 10, 10);
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

  getSizes = async(id) => {
    const query = "SELECT * FROM sizes WHERE id = ?";
    const result = await this.db.get(query, [id]);
    return result;
  }
}
