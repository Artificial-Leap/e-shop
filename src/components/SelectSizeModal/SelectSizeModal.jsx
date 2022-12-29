import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/productsSlice";
import "./SelectSizeModal.css";

const SelectSizeModal = ({ setModal, product }) => {
  const dispatch = useDispatch();
  const [allSizes, setAllSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  useEffect(() => {
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
    setModal(false);
  };

  return (
    <>
      <div className="overlay"></div>
      <div className="select-size">
        <h3>Select Size</h3>
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
    </>
  );
};

export default SelectSizeModal;
