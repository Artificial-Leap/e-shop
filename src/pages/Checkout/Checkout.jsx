import { useState } from "react";
import "./Checkout.css";
import CryptoPayment from "./CryptoPayment";
import PaypalPayment from "./PaypalPayment";

const Checkout = () => {
  const [inputValues, setInputValues] = useState({
    name: "",
    address: "",
    number: "",
    method: "",
    gift: "No",
    payment: "",
  });
  const changeHandler = (e) => {
    setInputValues((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="container">
      <div className="login-div checkout-div">
        <h2>Checkout</h2>
        <form>
          <div className="input-div-login">
            <label htmlFor="name">Full name</label>
            <input
              onChange={changeHandler}
              value={inputValues.name}
              type="text"
              name="name"
              placeholder="Full Name"
              id="name"
            />
          </div>
          <div className="input-div-login">
            <label htmlFor="address">Shipping Address</label>
            <input
              onChange={changeHandler}
              value={inputValues.address}
              type="text"
              name="address"
              placeholder="Shipping Address"
              id="address"
            />
          </div>
          <div className="input-div-login">
            <label htmlFor="number">Phone Number</label>
            <input
              onChange={changeHandler}
              type="text"
              value={inputValues.number}
              name="number"
              placeholder="Phone Number"
              id="number"
            />
          </div>
          <div className="input-div-login">
            <label htmlFor="method">Shipping Method</label>
            <select
              onChange={changeHandler}
              value={inputValues.method}
              name="method"
              id="method"
            >
              <option value="Normal">Normal</option>
              <option value="Fast">Fast</option>
            </select>
          </div>
          <div className="input-div-login">
            <label htmlFor="gift">This is a gift?</label>
            <select
              onChange={changeHandler}
              value={inputValues.gift}
              name="gift"
              id="gift"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="input-div-login">
            <label htmlFor="payment">Payment Method</label>
            <select
              value={inputValues.payment}
              onChange={changeHandler}
              name="payment"
              id="payment"
            >
              <option value="Card">Card</option>
              <option value="Paypal">Paypal</option>
              <option value="Crypto">Crypto</option>
            </select>
          </div>
          {inputValues.payment === "Paypal" && <PaypalPayment />}
          {inputValues.payment === "Crypto" && <CryptoPayment amount={0.001} />}
          <h3 className="total-amount">
            Total Amount: <strong>$40000</strong>
          </h3>
          <button type="submit" onClick={submitHandler} className="login">
            Checkout
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
