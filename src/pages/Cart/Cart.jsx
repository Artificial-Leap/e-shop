import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { changeQuantity } from "../../redux/productsSlice";
import "./Cart.css";

const Cart = () => {
  const { cart } = useSelector((state) => state.products);
  const [subTotal, setSubTotal] = useState(0);
  useEffect(() => {
    let total = 0;
    cart.forEach((elem) => {
      const sub = parseFloat(elem.price * elem.quantity);
      total += sub;
    });
    setSubTotal(total);
  }, [cart]);

  return (
    <div className="container">
      <div className="cart-div">
        <h2>Cart</h2>
        <div className="main-cart">
          <div className="cart-left">
            {cart?.map((elem) => {
              return <CartItem {...elem} key={elem.id} />;
            })}
          </div>
          <div className="cart-right">
            <h3>Summary</h3>
            <div className="total-row">
              <p>Subtotal</p>
              <p>${subTotal}</p>
            </div>
            <div className="total-row">
              <p>Delivery</p>
              <p>$12</p>
            </div>
            <hr />
            <div className="total-row">
              <p>Total</p>
              <p>
                EUR <strong>${subTotal + 12}</strong>
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

const CartItem = ({ img, price, name, id, quantity }) => {
  const dispatch = useDispatch();
  const changeQuantityFunc = (e) => {
    dispatch(changeQuantity({ id, quantity: e.target.value }));
  };
  return (
    <div className="cart-item">
      <div className="item-col flex-row">
        <img src={img} alt="" />
        <div className="cart-desc">
          <h4>{name}</h4>
          <p>Color: White</p>
          <p>Size: S</p>
          <p>In Stock</p>
        </div>
      </div>
      <div className="item-col">
        <h5>Each</h5>
        <h3>${price}</h3>
      </div>
      <div className="item-col">
        <h5>Quantity</h5>
        <select onChange={changeQuantityFunc} value={quantity}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <div className="item-col">
        <h5>Total</h5>
        <h3>${price * quantity}</h3>
      </div>
    </div>
  );
};
