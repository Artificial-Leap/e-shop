import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import withContext from "../withContext";
import PaypalPayment from "./PaypalPayment";
import CryptoPayment from "./CryptoPayment";
import getLangText from "../transcripts";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eth_address: "",
      phone: "",
      payment: "paypal",
      shipping_address: "",
      full_name: "",
      apt_suite: "",
      shipping_method: "normal",
      gift: "no",
      invoice: "no",
      invoice_name: "",
      invoice_phone: "",
      invoice_email: "",
      invoice_address: "",
      invoice_date: new Date(),
      invoice_vat: "",
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

  checkout = (e) => {
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
              {getLangText(this.props.context.lang, "checkout")}{" "}
              {this.getProductCount()}{" "}
              {this.getProductCount() === 1
                ? getLangText(this.props.context.lang, "product")
                : getLangText(this.props.context.lang, "products")}
            </h4>
          </div>
        </div>
        <br />
        <br />
        <form onSubmit={this.checkout}>
          <div className="columns is-mobile is-centered">
            <div className="column is-one-third">
              <div className="field">
                <label className="label">
                  {getLangText(this.props.context.lang, "fullname")}
                </label>
                <input
                  className="input"
                  type="input"
                  name="full_name"
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label">
                  {getLangText(this.props.context.lang, "shipping_adress")}
                </label>
                <input
                  className="input"
                  type="input"
                  name="shipping_address"
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label">
                  {getLangText(this.props.context.lang, "phone")}
                </label>
                <input
                  className="input"
                  type="input"
                  name="phone"
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label">
                  {getLangText(this.props.context.lang, "apt") +
                    "/" +
                    getLangText(this.props.context.lang, "suite") +
                    getLangText(this.props.context.lang, "unit") +
                    " " +
                    getLangText(this.props.context.lang, "optional")}
                </label>
                <input
                  className="input"
                  type="input"
                  name="apt_suite"
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label">
                  {getLangText(this.props.context.lang, "shipping method")}
                </label>
                <select
                  className="input"
                  name="shipping_method"
                  onChange={this.handleChange}
                >
                  <option value="normal">
                    {getLangText(this.props.context.lang, "normal")}
                  </option>
                  <option value="fast">
                    {getLangText(this.props.context.lang, "fast")}
                  </option>
                </select>
                <label className="label">
                  {getLangText(this.props.context.lang, "shipment_amount")}:{" "}
                  {this.getShippmentAmount()}
                </label>
              </div>
              <div className="field">
                <label className="label">
                  {getLangText(this.props.context.lang, "this_is_a_gift")}
                </label>
                <select
                  className="input"
                  name="gift"
                  onChange={this.handleChange}
                >
                  <option value="yes">
                    {getLangText(this.props.context.lang, "Yes")}
                  </option>
                  <option value="no">
                    {getLangText(this.props.context.lang, "No")}
                  </option>
                </select>
              </div>
              <div className="field">
                <label className="label">
                  {getLangText(this.props.context.lang, "Ethereum_adress")}
                </label>
                <input
                  className="input"
                  type="input"
                  name="eth_address"
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label">
                  {getLangText(this.props.context.lang, "Invoice")}
                </label>
                <select
                  className="input"
                  name="invoice"
                  onChange={this.handleChange}
                >
                  <option value="no">
                    {getLangText(this.props.context.lang, "No")}
                  </option>
                  <option value="yes">
                    {getLangText(this.props.context.lang, "Yes")}
                  </option>
                </select>
              </div>
              {this.state.invoice == "yes" ? (
                <div>
                  <div className="field">
                    <label className="label">Name</label>
                    <input
                      className="input"
                      type="input"
                      name="invoice_name"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="field">
                    <label className="label">Phone</label>
                    <input
                      className="input"
                      type="input"
                      name="invoice_phone"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="field">
                    <label className="label">Email</label>
                    <input
                      className="input"
                      type="input"
                      name="invoice_email"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="field">
                    <label className="label">Billing Address</label>
                    <input
                      className="input"
                      type="input"
                      name="invoice_address"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="field">
                    <label className="label">VAT</label>
                    <input
                      className="input"
                      type="input"
                      name="invoice_vat"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              ) : null}
              <div className="field">
                <label className="label">{getLangText(this.props.context.lang, "payment_method")}</label>
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
                {getLangText(this.props.context.lang, "Product's Amount")}: {this.getAmount()}
                </label>
                <label className="label">
                {getLangText(this.props.context.lang, "Total Amount")}: {this.getTotalAmount()}
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
                {getLangText(this.props.context.lang, "checkout")}
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
