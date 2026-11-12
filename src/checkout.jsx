
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Nav } from "./nav";
import "./checkout.css";

export function Checkout() {
    const navigate = useNavigate();

    const [cart, setCart] = useState(() => {
        return JSON.parse(localStorage.getItem("cart")) || [];
    });

    const [customer, setCustomer] = useState({
        name: "",
        phone: "",
        address: ""
    });

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    
    function handleChange(e) {
        const { name, value } = e.target;

        setCustomer((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    // Place order
    function placeOrder(e) {
        e.preventDefault();

        if (cart.length === 0) {
            alert("Your cart is empty!");
            navigate("/cart");
            return;
        }

        // Create order object
        const order = {
            id: Date.now(),
            customer: customer,
            products: cart,
            total: total,
            date: new Date().toISOString()
        };

        // Save demo order in localStorage
        const previousOrders =
            JSON.parse(localStorage.getItem("orders")) || [];

        localStorage.setItem(
            "orders",
            JSON.stringify([...previousOrders, order])
        );

        // Clear cart
        localStorage.removeItem("cart");

        setCart([]);

        // Update navbar cart count
        window.dispatchEvent(new Event("cartUpdated"));

        alert("Order placed successfully!");

        navigate("/");
    }

    // Empty cart
    if (cart.length === 0) {
        return (
            <>
                <Nav />

                <div className="checkout-page">
                    <h2>Your cart is empty.</h2>

                    <Link to="/catagories">
                        Continue Shopping
                    </Link>
                </div>
            </>
        );
    }

    return (
        <>
            <Nav />

            <div className="checkout-page">
                <h1>Checkout</h1>

                <div className="checkout-container">

                    {/* Customer Form */}
                    <form
                        className="customer-form"
                        onSubmit={placeOrder}
                    >
                        <h2>Delivery Details</h2>

                        <label>Full Name</label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={customer.name}
                            onChange={handleChange}
                            required
                        />

                        <label>Phone Number</label>

                        <input
                            type="tel"
                            name="phone"
                            placeholder="Enter your phone number"
                            value={customer.phone}
                            onChange={handleChange}
                            required
                        />

                        <label>Delivery Address</label>

                        <textarea
                            name="address"
                            placeholder="Enter your delivery address"
                            value={customer.address}
                            onChange={handleChange}
                            required
                        />

                        <button type="submit">
                            Place Order
                        </button>
                    </form>

                    {/* Order Summary */}
                    <div className="checkout-summary">
                        <h2>Your Order</h2>

                        {cart.map((item) => (
                            <div
                                className="checkout-item"
                                key={item.id}
                            >
                                <span>
                                    {item.title} × {item.quantity}
                                </span>

                                <span>
                                    ${(item.price * item.quantity).toFixed(2)}
                                </span>
                            </div>
                        ))}

                        <hr />

                        <div className="checkout-total">
                            <h3>Total</h3>

                            <h3>${total.toFixed(2)}</h3>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
