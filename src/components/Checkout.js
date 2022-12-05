import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import withContext from "../withContext";
import PaypalPayment from "./PaypalPayment";
import CryptoPayment from "./CryptoPayment";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eth_address: "",
      payment: "paypal",
      shipping_address: "",
      full_name: "",
      apt_suite: "",
      shipping_method: "normal",
      gift: "no",
    };
  }

  getProductCount = () => {
    let res = 0;
    const cart = this.props.context.cart;
    for (const obj in cart) {
      const _obj = cart[obj];
      const amount = _obj.amount;
      res += amount;
    }
    return res;
  };

  getAmount = () => {
    let res = 0;
    const cart = this.props.context.cart;
    for (const obj in cart) {
      const _obj = cart[obj];
      const amount = _obj.amount;
      const price = _obj.product.price;
      res += amount * price;
    }
    return res;
  };
  getShippmentAmount = () => {
    const { shipping_method } = this.state;
    if (shipping_method == "normal") {
      //fetch these prices from server (?)
      return 10;
    } else {
      return 20;
    }
  };
  getTotalAmount = () => {
    return this.getAmount() + this.getShippmentAmount();
  };

  payment_done = () => {};

  handleChange = (e) =>
    this.setState({ [e.target.name]: e.target.value, error: "" });

  login = (e) => {
    e.preventDefault();

    const email = this.props.context.user.email;
    const cart = this.props.context.cart;

    const {
      eth_address,
      payment,
      shipping_address,
      full_name,
      apt_suite,
      shipping_method,
      gift,
    } = this.state;
    if (!shipping_address || full_name) {
      return this.setState({ error: "Fill all fields!" });
    }
    this.props.context.checkout(email, cart, eth_address).then((msg) => {
      if (msg !== "ok") {
        return this.setState({ error: msg });
      }
    });
  };

  render() {
    return Object.keys(this.props.context.cart).length > 0 ? (
      <>
        <div className="hero is-primary ">
          <div className="hero-body container">
            <h4 className="title">
              Checkout {this.getProductCount()}{" "}
              {this.getProductCount() === 1 ? "Product" : "Products"}
            </h4>
          </div>
        </div>
        <br />
        <br />
        <form onSubmit={this.login}>
          <div className="columns is-mobile is-centered">
            <div className="column is-one-third">
              <div className="field">
                <label className="label">Full Name</label>
                <input
                  className="input"
                  type="input"
                  name="full_name"
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label">
                  Shipping Address (City, Province, Postal Code)
                </label>
                <input
                  className="input"
                  type="input"
                  name="shipping_address"
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label">Apt/Suite/Unit (Optional)</label>
                <input
                  className="input"
                  type="input"
                  name="apt_suite"
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label">Shipping Method</label>
                <select
                  className="input"
                  name="shipping_method"
                  onChange={this.handleChange}
                >
                  <option value="normal">Normal</option>
                  <option value="fast">Fast</option>
                </select>
                <label className="label">
                  Shippment Amount: {this.getShippmentAmount()}
                </label>
              </div>
              <div className="field">
                <label className="label">This is a gift</label>
                <select
                  className="input"
                  name="gift"
                  onChange={this.handleChange}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="field">
                <label className="label">
                  Ethereum Address (Clothe NFT will be sent there - Optional):{" "}
                </label>
                <input
                  className="input"
                  type="input"
                  name="eth_address"
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label">Payement Method</label>
                <select
                  className="input"
                  name="payment"
                  onChange={this.handleChange}
                >
                  <option value="paypal">Paypal or Card</option>
                  <option value="crypto">Crypto</option>
                </select>
              </div>
              <div className="field">
                <label className="label">
                  Products' Amount: {this.getAmount()}
                </label>
                <label className="label">
                  Total Amount: {this.getTotalAmount()}
                </label>
              </div>

              {this.state.payment === "crypto" ? (
                <CryptoPayment payment_done={this.payment_done} />
              ) : (
                <PaypalPayment payment_done={this.payment_done} />
              )}

              {this.state.error && (
                <div className="has-text-danger">{this.state.error}</div>
              )}
              <div className="field is-clearfix">
                <button className="button is-primary is-outlined is-pulled-right">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </form>
      </>
    ) : (
      <Navigate to="/products" />
    );
  }
}

export default withContext(Checkout);
