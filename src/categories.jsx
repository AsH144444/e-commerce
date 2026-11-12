
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./categories.css";
import { Nav } from "./nav";

export function Catagories() {
    const [products, setProducts] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();

    const productName = searchParams.get("q") || "";
    const category = searchParams.get("category") || "";

    const [nameInput, setNameInput] = useState(productName);

    const [cart, setCart] = useState(() => {
        return JSON.parse(localStorage.getItem("cart")) || [];
    });

    useEffect(() => {
        setNameInput(productName);
    }, [productName]);


    useEffect(() => {
        axios
            .get("https://dummyjson.com/products/category-list")
            .then((res) => {
                setCategoryList(res.data);
            })
            .catch((err) => {
                console.error("Category error:", err);
            });
    }, []);


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

                // Filter by product name inside category
                if (category && name) {
                    list = list.filter((p) =>
                        p.title.toLowerCase().includes(name)
                    );
                }

                setProducts(list);
            })
            .catch((err) => {
                if (!ignore) {
                    console.error("Product error:", err);
                }
            });

        return () => {
            ignore = true;
        };
    }, [productName, category]);

    // Add product to cart
    function addToCart(product) {
        const currentCart =
            JSON.parse(localStorage.getItem("cart")) || [];

        const existing = currentCart.find(
            (item) => item.id === product.id
        );

        let updatedCart;

        if (existing) {
            updatedCart = currentCart.map((item) =>
                item.id === product.id
                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    : item
            );
        } else {
            updatedCart = [
                ...currentCart,
                {
                    ...product,
                    quantity: 1
                }
            ];
        }

        localStorage.setItem(
            "cart",
            JSON.stringify(updatedCart)
        );

        setCart(updatedCart);

        window.dispatchEvent(new Event("cartUpdated"));
    }

    // Buy Now
    function handleBuyNow(product) {
        addToCart(product);
        navigate("/checkout");
    }

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
                    onChange={(e) =>
                        setNameInput(e.target.value)
                    }
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
                    <div
                        className="product-card"
                        key={product.id}
                    >
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                        />

                        <h3>{product.title}</h3>

                        <p>${product.price}</p>

                        <div className="btn">
                            <button
                                className="buy"
                                onClick={() =>
                                    handleBuyNow(product)
                                }
                            >
                                Buy Now
                            </button>

                            <button
                                className="card"
                                onClick={() =>
                                    addToCart(product)
                                }
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
