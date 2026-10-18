
import { Link } from 'react-router-dom'
import './nav.css'

export function Nav() {
    return (
        <div className="nav">
            <div className="left-nav">
                <Link to={"/"}>
                    <h1>Veyro</h1>
                </Link>
            
            </div>
            <div className="right-nav">
                <div className="search">
                    <input type="search" placeholder="Search..." />
                    <button>{<i class="fa-solid fa-magnifying-glass"></i>}</button>
                </div>

            </div>
                            <div className="cart">
                    <span className="cart-count">0</span>
                    🛒 <b>Cart</b>
                </div>
        </div>
    )
}
