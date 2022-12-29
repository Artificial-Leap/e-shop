import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addToCart,
  changeQuantity,
  changeSize,
  removeFromCart,
} from "../../redux/productsSlice";
import "./ProductView.css";

const ProductView = () => {
  const dispatch = useDispatch();
  const { products, cart } = useSelector((state) => state.products);
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState("");
  const [product, setProduct] = useState({});
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [allSizes, setAllSizes] = useState([]);
  useEffect(() => {
    products.forEach((elem) => {
      if (elem.id === id) {
        setProduct(elem);
      }
    });

    sizes();
  }, []);
  //setting the sizes Accordingly
  const sizes = async () => {
    let sizesArr = [];
    const res = await axios.get("/sizes");
    for (const property in res.data) {
      if (property !== "id") {
        sizesArr.push({ size: property, stock: res.data[property] });
      }
    }

    setAllSizes(sizesArr);
  };
  //adding items to cart
  const addToCartFunc = () => {
    dispatch(
      addToCart({
        img: product.image,
        name: product.name,
        desc: product.description,
        price: product.price,
        id: product.id,
        quantity: 1,
        size: selectedSize.size,
        stock: selectedSize.stock,
      })
    );
    setIsAddedToCart(true);
    setQuantity(1);
  };

  // useEffect(() => {
  //   if (quantity <= 0) {
  //     setSelectedSize({});
  //     setIsAddedToCart(false);
  //     dispatch(
  //       removeFromCart({
  //         id: product.id,
  //         size: selectedSize.size,
  //       })
  //     );
  //   }
  // }, [quantity]);

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
          <div className="sizes-div">
            {allSizes?.map((elem, idx) => {
              return (
                <button
                  key={idx + "size"}
                  onClick={() => {
                    setSelectedSize(elem);
                  }}
                  className={`size-btn ${
                    selectedSize.size === elem.size ? "selected-size" : ""
                  } `}
                >
                  {elem.size}
                </button>
              );
            })}
          </div>

          {/* {isAddedToCart ? (
            <div className="quantity-div">
              <button
                onClick={() => {
                  setQuantity((prev) => {
                    if (prev < selectedSize.stock) {
                      return prev + 1;
                    } else return prev;
                  });
                  dispatch(
                    changeQuantity({
                      id: product.id,
                      quantity: quantity + 1,
                      size: selectedSize.size,
                    })
                  );
                }}
              >
                +
              </button>
              <p>{quantity}</p>
              <button
                onClick={() => {
                  setQuantity((prev) => {
                    if (prev > 0) {
                      return prev - 1;
                    } else {
                      return prev;
                    }
                  });

                  dispatch(
                    changeQuantity({
                      id: product.id,
                      quantity: quantity - 1,
                      size: selectedSize.size,
                    })
                  );
                }}
              >
                -
              </button>
            </div>
          ) : (
            <button
              style={{
                opacity: selectedSize.size ? "1" : "0.6",
              }}
              onClick={() => {
                if (selectedSize.size) {
                  addToCartFunc();
                } else {
                  toast.warn("Please select a size");
                }
              }}
              className="login"
            >
              Add to Cart
            </button>
          )} */}
          <button
            style={{
              opacity: selectedSize.size ? "1" : "0.6",
            }}
            onClick={() => {
              if (selectedSize.size) {
                addToCartFunc();
                toast.success(product.name + " Added to cart");
              } else {
                toast.warn("Please select a size");
              }
            }}
            className="login"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
