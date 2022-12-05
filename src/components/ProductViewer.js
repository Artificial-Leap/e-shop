import React from "react";
import withContext from "../withContext";

const ProductViewer = (props) => {
  const product = props.product;
  console.log(product);

  return (
    <>
      <div>
        <figure className="image is-128x128">
          <img src={product.image} alt={product.name} />
        </figure>
        <label>Price: {product.price}</label>
        <br />
        <label>Description: {product.description}</label>
        <br />
        <button
          className="button is-small is-outlined is-primary   is-pulled-right"
          onClick={() =>
            props.addToCart({
              id: product.name,
              product,
              amount: 1,
            })
          }
        >
          Add to Cart
        </button>
        <button
          className="button is-small is-outlined is-primary   is-pulled-right"
          onClick={() => props.setProduct("")}
        >
          Back
        </button>
      </div>
    </>
  );
};

export default withContext(ProductViewer);
