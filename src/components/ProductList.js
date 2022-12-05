import React, { useState } from "react";
import ProductItem from "./ProductItem";
import withContext from "../withContext";
import ProductViewer from "./ProductViewer";

const ProductList = (props) => {
  const [selectedProduct, setSelectedProduct] = useState("");

  const { products } = props.context;

  const getProductName = () => {
    if (selectedProduct) {
      let name = "";

      products.forEach((product) => {
        if (product.id === selectedProduct) {
          name = product.name;
        }
      });

      return name;
    }

    return "";
  };

  const getProduct = () => {
    if (selectedProduct) {
      let res = {};

      products.forEach((product) => {
        if (product.id === selectedProduct) {
          res = product;
        }
      });

      return res;
    }

    return {};
  }

  const selectProduct = (product) => {
    setSelectedProduct(product.id);
  };

  return (
    <>
      <div className="hero is-primary">
        <div className="hero-body container">
          <h4 className="title">
            {selectedProduct ? getProductName() : "Our Products"}
          </h4>
        </div>
      </div>
      <br />
      <div className="container">
        {" "}
        {selectedProduct ? (
          <ProductViewer
            addToCart={props.context.addToCart}
            product={getProduct()}
            setProduct={selectProduct}
          />
        ) : (
          <div className="column columns is-multiline">
            {products && products.length ? (
              products.map((product, index) => (
                <ProductItem
                  product={product}
                  key={index}
                  addToCart={props.context.addToCart}
                  selectProduct={selectProduct}
                />
              ))
            ) : (
              <div className="column">
                <span className="title has-text-grey-light">
                  No products found!
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default withContext(ProductList);
