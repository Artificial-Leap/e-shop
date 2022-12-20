import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./styles/Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("/products");
      setProducts(res.data);
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
                />
              );
            })}
          <ProductCard
            img="/assets/test-item.webp"
            name="Sain Laurent"
            desc="Logo printed textured hoodie"
            price="$850"
          />
          <ProductCard
            img="/assets/test-item.webp"
            name="Sain Laurent"
            desc="Logo printed textured hoodie"
            price="$850"
          />
          <ProductCard
            img="/assets/test-item.webp"
            name="Sain Laurent"
            desc="Logo printed textured hoodie"
            price="$850"
          />
          <ProductCard
            img="/assets/test-item.webp"
            name="Sain Laurent"
            desc="Logo printed textured hoodie"
            price="$850"
          />
          <ProductCard
            img="/assets/test-item.webp"
            name="Sain Laurent"
            desc="Logo printed textured hoodie"
            price="$850"
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
