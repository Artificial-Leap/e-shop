import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../../redux/productsSlice";
import "./ProductCard.css";

const ProductCard = ({ img, name, desc, price, id }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.products);
  const addToCartFunc = () => {
    dispatch(addToCart({ img, name, desc, price, id, quantity: 1 }));
    setAddedToCart(true);
  };
  const removeFromCartFunc = () => {
    dispatch(removeFromCart(id));
    setAddedToCart(false);
  };
  useEffect(() => {
    cart.forEach((elem) => {
      if (elem.id === id) {
        setAddedToCart(true);
      }
    });
  }, []);

  return (
    <div className="product-card">
      <div className="product-img-div">
        <img src={img} alt="" />
      </div>
      <div className="text-div">
        <div className="top-text">
          <h5>New Season</h5>
          <h4>{name}</h4>
          <p>{desc}</p>
        </div>
        <p>${price}</p>
        <div className="btn-div">
          {addedToCart ? (
            <button onClick={removeFromCartFunc} className="login">
              Remove
            </button>
          ) : (
            <button onClick={addToCartFunc} className="login">
              Add to cart
            </button>
          )}
          <Link to={`/${id}`} className="login">
            Quick View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
