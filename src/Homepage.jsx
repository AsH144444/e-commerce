import axios from "axios";
import { useEffect, useState } from "react";
import './homepages.css'

export function Homepage() {
  const [products, setProducts] = useState([]);
  function handelcard(pro_name){
    console.log(pro_name)
  }

  useEffect(() => {
    axios.get("https://dummyjson.com/products?limit=50")
      .then((response) => {
        setProducts(response.data.products);
      });
  }, []);

  // Get one product for each category
  const categories = [];

  products.forEach((product) => {
    if (!categories.find((item) => item.category === product.category)) {
      categories.push(product);
    }
  });

  return (
    <div>
      

      <div className="categories" >
        {categories.map((product) => (
          <div className="category-card" key={product.category} onClick={(e) =>
            handelcard(product.category)
          }>
            <img src={product.thumbnail} alt={product.category} />
            <h2 className="category-card-h2">{product.category}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}