import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard/ProductCard";
import { getProducts } from "../../redux/productsSlice";
import { SERVER_URL } from "../../constants";

import "./styles/Products.css";

const Products = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get(SERVER_URL + "/products");
      dispatch(getProducts(res.data));

      const res2 = await axios.get(SERVER_URL + "/sizes", {
        responseType: "json",
      });
      console.log(res2.data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="container products-wrapp">
      <div className="products-div">
        <h1 className="title">Our Products</h1>
        <div className="products-grid">
          {products &&
            products.map((elem) => {
              return (
                <ProductCard
                  key={elem.id}
                  name={elem.name}
                  img={elem.image}
                  desc={elem.shortDesc}
                  price={elem.price}
                  id={elem.id}
                />
              );
            })}
          {/* <ProductCard
            img="/assets/test-item.webp"
            name="Sain Laurent"
            desc="Logo printed textured hoodie"
            price="850"
          />
          <ProductCard
            img="/assets/test-item.webp"
            name="Sain Laurent"
            desc="Logo printed textured hoodie"
            price="850"
          />
          <ProductCard
            img="/assets/test-item.webp"
            name="Sain Laurent"
            desc="Logo printed textured hoodie"
            price="850"
          />
          <ProductCard
            img="/assets/test-item.webp"
            name="Sain Laurent"
            desc="Logo printed textured hoodie"
            price="850"
          />
          <ProductCard
            img="/assets/test-item.webp"
            name="Sain Laurent"
            desc="Logo printed textured hoodie"
            price="850"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Products;
