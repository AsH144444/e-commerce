import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './nav.css';

export function Nav() {
  const [date, setData] = useState('');
  const navigate = useNavigate();

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

      <div className="cart">
        <span className="cart-count">0</span>
        🛒 <b>Cart</b>
      </div>
    </div>
  );
}