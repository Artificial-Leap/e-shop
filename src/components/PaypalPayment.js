import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PaypalPayment = (props) => {
  return (
    <div className=" column is-half">
      <PayPalScriptProvider options={{ "client-id": "test" }}>
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: "1.99",
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              const name = details.payer.name.given_name;
              console.log('details:', details)
              props.payment_done()
            });
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default PaypalPayment;
