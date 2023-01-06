import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { changeQuantity } from "../../redux/productsSlice";
import "./Cart.css";

const Cart = ({ language }) => {
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
        <h2>{language.heading}</h2>
        <div className="main-cart">
          <div className="cart-left">
            {cart?.map((elem) => {
              return <CartItem language={language} {...elem} key={elem.id} />;
            })}
          </div>
          <div className="cart-right">
            <h3>{language.summary}</h3>
            <div className="total-row">
              <p>{language.sub}</p>
              <p>${subTotal}</p>
            </div>
            <div className="total-row">
              <p>{language.delivery}</p>
              <p>$12</p>
            </div>
            <hr />
            <div className="total-row">
              <p>{language.total}</p>
              <p>
                EUR <strong>${subTotal + 12}</strong>
              </p>
            </div>
            <Link to={"/checkout"} className="checkout">
              {language.btn}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

const CartItem = ({
  img,
  price,
  name,
  id,
  quantity,
  size,
  stock,
  language,
}) => {
  const dispatch = useDispatch();
  const changeQuantityFunc = (e) => {
    dispatch(changeQuantity({ id, quantity: e.target.value, size: size }));
  };
  return (
    <div className="cart-item">
      <div className="item-col flex-row">
        <img src={img} alt="" />
        <div className="cart-desc">
          <h4>{name}</h4>
          <p>{language.color}: White</p>
          <p>
            {language.size}:{" "}
            <span style={{ textTransform: "uppercase" }}> {size}</span>
          </p>
          <p>{language.stock}</p>
        </div>
      </div>
      <div className="item-col">
        <h5>{language.each}</h5>
        <h3>${price}</h3>
      </div>
      <div className="item-col">
        <h5>{language.quantity}</h5>
        <select onChange={changeQuantityFunc} value={quantity}>
          {Array(stock)
            .fill(false)
            .map((elem, idx) => {
              return (
                <option key={idx + "stock" + id} value={idx + 1}>
                  {idx + 1}
                </option>
              );
            })}
        </select>
      </div>
      <div className="item-col">
        <h5>{language.total}</h5>
        <h3>${price * quantity}</h3>
      </div>
    </div>
  );
};
