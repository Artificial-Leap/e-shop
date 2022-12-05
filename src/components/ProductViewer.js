import React from "react";
import getLangText from "../transcripts";
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
        <label>
          {getLangText(props.lang, "price")}: {product.price}
        </label>
        <br />
        <label>
          {getLangText(props.lang, "description")}: {product.description}
        </label>
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
          {getLangText(props.lang, "add_cart")}
        </button>
        <button
          className="button is-small is-outlined is-primary   is-pulled-right"
          onClick={() => props.setProduct("")}
        >
          {getLangText(props.lang, "back")}
        </button>
      </div>
    </>
  );
};

export default withContext(ProductViewer);
