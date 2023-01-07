import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "./StripeCheckout";

const stripePromise = loadStripe(
  "pk_test_51MNFM2LMuUtlClfsBHA2UUpm9ZZgHcI07q6Lc06rmFskqMX6IxZmcvL4Gao10eY5e9CMEgCzQPNEMotn8dnFaV3N00aA8Y2K9Y"
);

function CardCheckout(props) {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <StripeCheckout payFunc={props.payFunc} />
      </Elements>
    </div>
  );
}

export default CardCheckout;
