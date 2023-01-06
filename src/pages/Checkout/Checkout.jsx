import { useState } from "react";
import "./Checkout.css";
import CryptoPayment from "./CryptoPayment";
import PaypalPayment from "./PaypalPayment";

const Checkout = ({ language }) => {
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
        <h2>{language.btn}</h2>
        <form>
          <div className="input-div-login">
            <label htmlFor="name">{language.name}</label>
            <input
              onChange={changeHandler}
              value={inputValues.name}
              type="text"
              name="name"
              placeholder={language.name}
              id="name"
            />
          </div>
          <div className="input-div-login">
            <label htmlFor="address">{language.address}</label>
            <input
              onChange={changeHandler}
              value={inputValues.address}
              type="text"
              name="address"
              placeholder={language.address}
              id="address"
            />
          </div>
          <div className="input-div-login">
            <label htmlFor="number">{language.number}</label>
            <input
              onChange={changeHandler}
              type="text"
              value={inputValues.number}
              name="number"
              placeholder={language.number}
              id="number"
            />
          </div>
          <div className="input-div-login">
            <label htmlFor="method">{language.method[0]}</label>
            <select
              onChange={changeHandler}
              value={inputValues.method}
              name="method"
              id="method"
            >
              <option value="Normal">{language.method[1]}</option>
              <option value="Fast">{language.method[2]}</option>
            </select>
          </div>
          <div className="input-div-login">
            <label htmlFor="gift">{language.gift[0]}</label>
            <select
              onChange={changeHandler}
              value={inputValues.gift}
              name="gift"
              id="gift"
            >
              <option value="Yes">{language.gift[1]}</option>
              <option value="No">{language.gift[2]}</option>
            </select>
          </div>
          <div className="input-div-login">
            <label htmlFor="payment">{language.payment}</label>
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
            {language.total}: <strong>$40000</strong>
          </h3>
          <button type="submit" onClick={submitHandler} className="login">
            {language.btn}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
