import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import getLangText from "../transcripts";
import withContext from "../withContext";
import CartItem from "./CartItem";

const Cart = (props) => {
  useEffect(() => {
    props.context.useAnalyticsEventTracker("cart page", "pageview", "pageview");
  }, []);

  const { cart } = props.context;
  const cartKeys = Object.keys(cart || {});
  return (
    <>
      <div className="hero is-primary">
        <div className="hero-body container">
          <h4 className="title">{getLangText(props.context.lang, "cart")}</h4>
        </div>
      </div>
      <br />
      <div className="container">
        {cartKeys.length ? (
          <div className="column columns is-multiline">
            {cartKeys.map((key) => (
              <CartItem
                cartKey={key}
                key={key}
                cartItem={cart[key]}
                removeFromCart={props.context.removeFromCart}
                increaseitem={props.context.increaseItem}
                decreaseItem={props.context.decreaseItem}
                lang={props.context.lang}
              />
            ))}
            <div className="column is-12 is-clearfix">
              <br />
              <div className="is-pulled-right">
                <button
                  onClick={props.context.clearCart}
                  className="button is-warning "
                >
                  {getLangText(props.context.lang, "clearcart")}
                </button>{" "}
                <Link to="/checkout" className="button is-success">
                  {/*onClick={props.context.checkout}*/}
                  {getLangText(props.context.lang, "checkout")}
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="column">
            <div className="title has-text-grey-light">{getLangText(props.context.lang, "noitemincart")}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default withContext(Cart);
