import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Header.css';

export default function Header() {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <nav className="nav-links">
            <Link to="/shop">Shop</Link>
            <Link to="/shop?category=new">New Arrivals</Link>
            <Link to="/about">About</Link>
          </nav>
        </div>

        <Link to="/" className="logo">
          <img src="/Logo.jpg" alt="Forgotten Essentials" className="logo-image" />
        </Link>

        <div className="header-right">
          <button className="search-btn" aria-label="Search">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </button>
          <Link to="/account" className="account-btn" aria-label="Account">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </Link>
          <button
            className="cart-btn"
            onClick={() => setIsCartOpen(true)}
            aria-label="Cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
              <path d="M3 6h18"></path>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
