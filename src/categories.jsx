import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Nav } from "./nav";

export function Catagories() {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();

  const productName = searchParams.get("q") || "";

  useEffect(() => {
    if (!productName.trim()) {
      setProducts([]);
      return;
    }

    axios
      .get(`https://dummyjson.com/products/search?q=${encodeURIComponent(productName)}`)
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [productName]);

  return (
    <>
      <Nav />

      <h2>Search results for: {productName}</h2>

      <div className="products">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </>
  );
}