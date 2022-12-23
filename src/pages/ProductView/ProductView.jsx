import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart, changeQuantity } from "../../redux/productsSlice";
import "./ProductView.css";

const ProductView = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { id } = useParams();
  const { products, cart } = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(0);
  useEffect(() => {
    products.forEach((elem) => {
      if (elem.id === id) {
        setProduct(elem);
      }
    });
    cart.forEach((elem) => {
      if (elem.id === id) {
        setIsAddedToCart(true);
        setQuantity(parseFloat(elem.quantity));
      }
    });
  }, []);
  const addToCartFunc = () => {
    dispatch(
      addToCart({
        img: product.image,
        name: product.name,
        desc: product.description,
        price: product.price,
        id: product.id,
        quantity: 1,
      })
    );
    setIsAddedToCart(true);
  };
  return (
    <div className="container">
      <div className="product-div">
        <div className="left-details">
          <img src={product.image} alt="" />
        </div>
        <div className="right-details">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <h3>${product.price}</h3>
          {isAddedToCart ? (
            <div className="quantity-div">
              <button
                onClick={() => {
                  setQuantity((prev) => prev + 1);
                  dispatch(
                    changeQuantity({ id: product.id, quantity: quantity + 1 })
                  );
                }}
              >
                +
              </button>
              <p>{quantity}</p>
              <button
                onClick={() => {
                  setQuantity((prev) => prev - 1);
                  dispatch(
                    changeQuantity({
                      id: product.id,
                      quantity: quantity - 1,
                    })
                  );
                }}
              >
                -
              </button>
            </div>
          ) : (
            <button onClick={addToCartFunc} className="login">
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductView;
