import "./ProductCard.css";

const ProductCard = ({ img, name, desc, price }) => {
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
        <p>{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
