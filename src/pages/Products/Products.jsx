import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard/ProductCard";
import { getProducts } from "../../redux/productsSlice";
import "./styles/Products.css";

const Products = ({ language }) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("/products");
      dispatch(getProducts(res.data));
    };
    fetchProducts();
  }, []);

  return (
    <div className="container products-wrapp">
      <div className="products-div">
        <h1 className="title">{language.heading}</h1>
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
                  stock={elem.stock}
                  language={language}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Products;
