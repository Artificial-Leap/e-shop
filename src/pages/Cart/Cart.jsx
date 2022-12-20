import { Link } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  return (
    <div className="container">
      <div className="cart-div">
        <h2>Cart</h2>
        <div className="main-cart">
          <div className="cart-left">
            <CartItem />
            <CartItem />
            <CartItem />
          </div>
          <div className="cart-right">
            <h3>Summary</h3>
            <div className="total-row">
              <p>Subtotal</p>
              <p>$505.00</p>
            </div>
            <div className="total-row">
              <p>Delivery</p>
              <p>$12</p>
            </div>
            <hr />
            <div className="total-row">
              <p>Total</p>
              <p>
                EUR <strong>$517.00</strong>
              </p>
            </div>
            <Link to={"/checkout"} className="checkout">
              Go to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

const CartItem = () => {
  return (
    <div className="cart-item">
      <div className="item-col flex-row">
        <img src="/assets/test-item.webp" alt="" />
        <div className="cart-desc">
          <h4>Hoodie</h4>
          <p>Color: White</p>
          <p>Size: S</p>
          <p>In Stock</p>
        </div>
      </div>
      <div className="item-col">
        <h5>Each</h5>
        <h3>$399.99</h3>
      </div>
      <div className="item-col">
        <h5>Quantity</h5>
        <select>
          <option value="1">1</option>
          <option value="1">2</option>
          <option value="1">3</option>
        </select>
      </div>
      <div className="item-col">
        <h5>Total</h5>
        <h3>$399.99</h3>
      </div>
    </div>
  );
};
