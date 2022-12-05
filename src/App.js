import React, { Component } from "react";
import { Routes, Route, Link, BrowserRouter as Router } from "react-router-dom";

import AddProduct from "./components/AddProduct";
import Cart from "./components/Cart";
import Login from "./components/Login";
import ProductList from "./components/ProductList";
import axios from "axios";
import { SERVER_URL } from "./constants";

import Context from "./Context";
import Register from "./components/Register";
import Checkout from "./components/Checkout";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      cart: {},
      products: [],
    };
    this.routerRef = React.createRef();
  }

  async componentDidMount() {
    let user = localStorage.getItem("user");
    let cart = localStorage.getItem("cart");

    const products = await axios.get(SERVER_URL + "/products");
    user = user ? JSON.parse(user) : null;
    cart = cart ? JSON.parse(cart) : {};

    this.setState({ user, products: products.data, cart });
  }

  increaseItem = (cartItemId) => {
    let cart = this.state.cart;
    if (cart[cartItemId]) {
      cart[cartItemId].amount += 1;
      if (cart[cartItemId].amount > cart[cartItemId].product.stock) {
        cart[cartItemId].amount = cart[cartItemId].product.stock;
      }
      this.setState({ cart });
    }
  };
  decreaseItem = (cartItemId) => {
    let cart = this.state.cart;
    if (cart[cartItemId]) {
      if (cart[cartItemId].amount === 1) {
        this.removeFromCart(cartItemId);
      } else {
        cart[cartItemId].amount -= 1;
      }
      this.setState({ cart });
    }
  };

  addToCart = (cartItem) => {
    let cart = this.state.cart;
    if (cart[cartItem.id]) {
      cart[cartItem.id].amount += cartItem.amount;
    } else {
      cart[cartItem.id] = cartItem;
    }
    if (cart[cartItem.id].amount > cart[cartItem.id].product.stock) {
      cart[cartItem.id].amount = cart[cartItem.id].product.stock;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  removeFromCart = (cartItemId) => {
    let cart = this.state.cart;
    delete cart[cartItemId];
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  clearCart = () => {
    let cart = {};
    localStorage.removeItem("cart");
    this.setState({ cart });
  };

  checkout = async (email, cart, eth_address) => {
    if (!this.state.user) {
      return;
    }

    const resp = await axios.post(SERVER_URL + "/checkout", {
      email,
      cart,
      eth_address,
    });
    console.log("checkout resp:", resp.data);

    const products = await axios.get(SERVER_URL + "/products");

    this.setState({ products });
    this.clearCart();
  };

  addProduct = (product, callback) => {
    let products = this.state.products.slice();
    products.push(product);
    this.setState({ products }, () => callback && callback());
  };

  login = async (email, password) => {
    const res = await axios
      .post(SERVER_URL + "/login", { email, password })
      .catch((res) => {
        return { status: 401, message: "Unauthorized" };
      });

    console.log("login:", res.data);
    if (res.data.status === "ok") {
      const { email } = res.data.user;
      const user = {
        email,
        accessLevel: email === "admin@example.com" ? 0 : 1,
      };

      this.setState({ user });
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    } else {
      return false;
    }
  };

  register = async (email, username, password) => {
    const res = await axios
      .post(SERVER_URL + "/register", { email, username, password })
      .catch((res) => {
        return { status: 401, message: "Unauthorized" };
      });

    console.log("register:", res.data);

    if (res.data?.status === "ok") {
      const user = {
        email,
        accessLevel: email === "admin@example.com" ? 0 : 1,
      };

      this.setState({ user });
    }

    return res.data?.status;
  };

  logout = (e) => {
    e.preventDefault();
    this.setState({ user: null });
    localStorage.removeItem("user");
  };

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          removeFromCart: this.removeFromCart,
          addToCart: this.addToCart,
          login: this.login,
          register: this.register,
          addProduct: this.addProduct,
          clearCart: this.clearCart,
          checkout: this.checkout,
          increaseItem: this.increaseItem,
          decreaseItem: this.decreaseItem,
        }}
      >
        <Router innerRef={this.routerRef}>
          <div className="App">
            <nav
              className="navbar container"
              role="navigation"
              aria-label="main navigation"
            >
              <div className="navbar-brand">
                <b className="navbar-item is-size-4 ">Fable</b>
                <label
                  role="button"
                  className="navbar-burger burger"
                  aria-label="menu"
                  aria-expanded="false"
                  data-target="navbarBasicExample"
                  onClick={(e) => {
                    e.preventDefault();
                    this.setState({ showMenu: !this.state.showMenu });
                  }}
                >
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                </label>
              </div>
              <div
                className={`navbar-menu ${
                  this.state.showMenu ? "is-active" : ""
                }`}
              >
                <Link to="/products" className="navbar-item">
                  Products
                </Link>
                {this.state.user && this.state.user.accessLevel < 1 && (
                  <Link to="/add-product" className="navbar-item">
                    Add Product
                  </Link>
                )}
                <Link to="/cart" className="navbar-item">
                  Cart
                  <span
                    className="tag is-primary"
                    style={{ marginLeft: "5px" }}
                  >
                    {Object.keys(this.state.cart).length}
                  </span>
                </Link>
                {!this.state.user ? (
                  <Link to="/login" className="navbar-item">
                    Login
                  </Link>
                ) : (
                  <Link to="/" onClick={this.logout} className="navbar-item">
                    Logout
                  </Link>
                )}
              </div>
            </nav>
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </div>
        </Router>
      </Context.Provider>
    );
  }
}
