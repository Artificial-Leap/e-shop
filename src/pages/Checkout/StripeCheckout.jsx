import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "black",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "black" },
      "::placeholder": { color: "black" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "black",
    },
  },
};

function StripeCheckout(props) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(
        CardCvcElement,
        CardExpiryElement,
        CardNumberElement
      ),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        props.payFunc(id, null);
      } catch (e) {
        console.log("Error", e);
        props.payFunc(null, e);
      }
    } else {
      console.log(error.message);
      props.payFunc(null, error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Card Number</label>
        <fieldset className="FormGroup">
          <div className="FormRow">
            <CardNumberElement options={CARD_OPTIONS} />
          </div>
        </fieldset>
        <label>Card Expiration Date</label>
        <fieldset className="FormGroup">
          <div className="FormRow">
            <CardExpiryElement options={CARD_OPTIONS} />
          </div>
        </fieldset>
        <label>CVC</label>
        <fieldset className="FormGroup">
          <div className="FormRow">
            <CardCvcElement options={CARD_OPTIONS} />
          </div>
        </fieldset>
        <button>Pay</button>
      </form>
    </>
  );
}

export default StripeCheckout;
