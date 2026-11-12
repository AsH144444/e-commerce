
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './nav.css';

export function Nav() {
    const [date, setData] = useState('');
    const [count, setCount] = useState(0);

    const navigate = useNavigate();


    useEffect(() => {
        function updateCount() {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];

            const total = cart.reduce(
                (sum, item) => sum + item.quantity,
                0
            );

            setCount(total);
        }

        updateCount();

        window.addEventListener("cartUpdated", updateCount);

        return () => {
            window.removeEventListener("cartUpdated", updateCount);
        };
    }, []);

    function search() {
        if (!date.trim()) return;

        navigate(`/catagories?q=${encodeURIComponent(date.trim())}`);
    }

    return (
        <div className="nav">
            <div className="left-nav">
                <Link to="/" className="logo">
                    <h1>Veyro</h1>
                </Link>
            </div>

            <div className="right-nav">
                <div className="search">
                    <input
                        type="search"
                        placeholder="Search..."
                        value={date}
                        onChange={(event) => setData(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') search();
                        }}
                    />

                    <button onClick={search}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
            </div>

            <Link to="/cart" className="cart">
                <span className="cart-count">{count}</span>
                🛒 <b>Cart</b>
            </Link>
        </div>
    );
}
