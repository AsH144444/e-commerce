
import { useState } from "react";
import { Link } from "react-router-dom";
import { Nav } from "./nav";
import "./cart.css";

export function Cart() {
    const [cart, setCart] = useState(() => {
        return JSON.parse(localStorage.getItem("cart")) || [];
    });

    // Update cart and localStorage
    function updateCart(updatedCart) {
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        window.dispatchEvent(new Event("cartUpdated"));
    }

    // Increase quantity
    function increase(id) {
        const updatedCart = cart.map((item) =>
            item.id === id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );

        updateCart(updatedCart);
    }

    // Decrease quantity
    function decrease(id) {
        const updatedCart = cart
            .map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
            .filter((item) => item.quantity > 0);

        updateCart(updatedCart);
    }

    // Remove product
    function removeItem(id) {
        const updatedCart = cart.filter(
            (item) => item.id !== id
        );

        updateCart(updatedCart);
    }

    // Calculate total quantity
    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    // Calculate total price
    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <>
            <Nav />

            <div className="cart-page">
                <h1>Shopping Cart</h1>

                {cart.length === 0 ? (
                    <div className="empty-cart">
                        <h2>Your cart is empty!</h2>
                        <p>Add some products to get started.</p>

                        <Link to="/" className="continue-btn">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="cart-container">

                        <div className="cart-products">
                            {cart.map((item) => (
                                <div
                                    className="cart-product"
                                    key={item.id}
                                >
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                    />

                                    <div className="cart-details">
                                        <h3>{item.title}</h3>

                                        <p className="cart-price">
                                            ${item.price}
                                        </p>

                                        <div className="quantity">
                                            <button
                                                onClick={() => decrease(item.id)}
                                            >
                                                -
                                            </button>

                                            <span>{item.quantity}</span>

                                            <button
                                                onClick={() => increase(item.id)}
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button
                                            className="remove-btn"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>

                                    <h3 className="item-total">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </h3>
                                </div>
                            ))}
                        </div>

                        <div className="cart-summary">
                            <h2>Order Summary</h2>

                            <div>
                                <span>Products ({count})</span>
                                <span>${total.toFixed(2)}</span>
                            </div>

                            <div>
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>

                            <hr />

                            <div className="total">
                                <h3>Total</h3>
                                <h3>${total.toFixed(2)}</h3>
                            </div>

                            <button className="checkout-btn">
                                Proceed to Checkout
                            </button>

                            <Link to="/" className="continue-shopping">
                                Continue Shopping
                            </Link>
                        </div>

                    </div>
                )}
            </div>
        </>
    );
}
