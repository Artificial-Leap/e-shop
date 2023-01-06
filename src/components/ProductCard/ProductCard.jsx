import { useState } from "react";
import { Link } from "react-router-dom";
import SelectSizeModal from "../SelectSizeModal/SelectSizeModal";
import "./ProductCard.css";

const ProductCard = ({ img, name, desc, price, id, language }) => {
  const [modal, setModal] = useState(false);

  return (
    <div className="product-card">
      {modal && (
        <SelectSizeModal
          language={language}
          setModal={setModal}
          product={{ image: img, name, description: desc, price, id }}
        />
      )}
      <div className="product-img-div">
        <img src={img} alt="" />
      </div>
      <div className="text-div">
        <div className="top-text">
          <h5>{language.season}</h5>
          <h4>{name}</h4>
          <p>{desc}</p>
        </div>
        <p>${price}</p>
        <div className="btn-div">
          <button onClick={() => setModal(true)} className="login">
            {language.addtocart}
          </button>

          <Link to={`/${id}`} className="login">
            {language.view}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
