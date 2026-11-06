
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./categories.css";
import { Nav } from "./nav";

export function Catagories() {
    const [products, setProducts] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const productName = searchParams.get("q") || "";
    const category = searchParams.get("category") || "";

    // Load cart from localStorage
    const [cart, setCart] = useState(() => {
        return JSON.parse(localStorage.getItem("cart")) || [];
    });

    // Search input state
    const [nameInput, setNameInput] = useState(productName);

    // Update input when URL changes
    useEffect(() => {
        setNameInput(productName);
    }, [productName]);

    // Add product to cart
    function handelcard(product) {
        setCart((prevCart) => {
            const existing = prevCart.find(
                (item) => item.id === product.id
            );

            let updatedCart;

            if (existing) {
                updatedCart = prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                updatedCart = [
                    ...prevCart,
                    { ...product, quantity: 1 }
                ];
            }

            localStorage.setItem(
                "cart",
                JSON.stringify(updatedCart)
            );

            // Notify Navbar
            window.dispatchEvent(new Event("cartUpdated"));

            return updatedCart;
        });
    }

    // Fetch category list
    useEffect(() => {
        axios
            .get("https://dummyjson.com/products/category-list")
            .then((res) => setCategoryList(res.data))
            .catch((err) =>
                console.error("Error fetching categories:", err)
            );
    }, []);

    // Fetch products based on search and category
    useEffect(() => {
        let ignore = false;

        const name = productName.trim().toLowerCase();

        let url;

        if (category) {
            url = `https://dummyjson.com/products/category/${encodeURIComponent(category)}`;
        } else if (name) {
            url = `https://dummyjson.com/products/search?q=${encodeURIComponent(name)}`;
        } else {
            url = "https://dummyjson.com/products?limit=30";
        }

        axios
            .get(url)
            .then((res) => {
                if (ignore) return;

                let list = res.data.products;

                // Filter products by name inside selected category
                if (category && name) {
                    list = list.filter((p) =>
                        p.title.toLowerCase().includes(name)
                    );
                }

                setProducts(list);
            })
            .catch((err) =>
                console.error("Error fetching products:", err)
            );

        return () => {
            ignore = true;
        };
    }, [productName, category]);

    // Update URL search parameters
    function updateParams(newName, newCategory) {
        const params = {};

        if (newName.trim()) {
            params.q = newName.trim();
        }

        if (newCategory) {
            params.category = newCategory;
        }

        setSearchParams(params);
    }

    // Search submit
    function handleSubmit(e) {
        e.preventDefault();
        updateParams(nameInput, category);
    }

    // Category selection
    function handleCategoryChange(e) {
        updateParams(nameInput, e.target.value);
    }

    return (
        <>
            <Nav />

            <form onSubmit={handleSubmit} className="search-bar">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                />

                <select
                    value={category}
                    onChange={handleCategoryChange}
                >
                    <option value="">All categories</option>

                    {categoryList.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>

                <button type="submit">Search</button>
            </form>

            <h2>
                {productName && `Results for "${productName}"`}
                {productName && category && " in "}
                {category && category}
                {!productName && !category && "All products"}
            </h2>

            <div className="products">
                {products.length === 0 && (
                    <p>No products found.</p>
                )}

                {products.map((product) => (
                    <div className="product-card" key={product.id}>
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                        />

                        <h3>{product.title}</h3>

                        <p>${product.price}</p>

                        <div className="btn">
                            <button className="buy">
                                Buy Now
                            </button>

                            <button
                                className="card"
                                onClick={() => handelcard(product)}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
