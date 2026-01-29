import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import SearchModal from './SearchModal';
import './Header.css';

export default function Header() {
  const { totalItems, setIsCartOpen } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems: wishlistItems } = useWishlist();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsAccountDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change or resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    logout();
    setIsAccountDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Mobile hamburger button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <div className="header-left">
          <nav className="nav-links">
            <Link to="/shop">Shop</Link>
            <Link to="/collections">Collections</Link>
            <Link to="/about">About</Link>
          </nav>
        </div>

        <Link to="/" className="logo">
          <img src="/Logo.png" alt="Forgotten Essentials" className="logo-image" />
        </Link>

        <div className="header-right">
          <span className="currency-flag" title="Ships to USA only">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="14" viewBox="0 0 60 42">
              <rect width="60" height="42" fill="#B22234"/>
              <rect y="3.23" width="60" height="3.23" fill="#fff"/>
              <rect y="9.69" width="60" height="3.23" fill="#fff"/>
              <rect y="16.15" width="60" height="3.23" fill="#fff"/>
              <rect y="22.62" width="60" height="3.23" fill="#fff"/>
              <rect y="29.08" width="60" height="3.23" fill="#fff"/>
              <rect y="35.54" width="60" height="3.23" fill="#fff"/>
              <rect width="24" height="22.62" fill="#3C3B6E"/>
            </svg>
          </span>

          <button className="search-btn" aria-label="Search" onClick={() => setIsSearchOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </button>

          <Link to="/wishlist" className="wishlist-link desktop-only" aria-label="Wishlist">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            {wishlistItems > 0 && <span className="wishlist-count">{wishlistItems}</span>}
          </Link>

          <div className="account-dropdown-wrapper desktop-only" ref={dropdownRef}>
            <button
              className="account-btn"
              aria-label="Account"
              onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>

            {isAccountDropdownOpen && (
              <div className="account-dropdown">
                {isAuthenticated ? (
                  <>
                    <div className="dropdown-header">
                      <span className="dropdown-greeting">Hi, {user?.firstName}!</span>
                    </div>
                    <Link to="/account" className="dropdown-link" onClick={() => setIsAccountDropdownOpen(false)}>
                      My Account
                    </Link>
                    <Link to="/wishlist" className="dropdown-link" onClick={() => setIsAccountDropdownOpen(false)}>
                      Saved Items ({wishlistItems})
                    </Link>
                    <button onClick={handleLogout} className="dropdown-link dropdown-logout">
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="dropdown-link" onClick={() => setIsAccountDropdownOpen(false)}>
                      Sign In
                    </Link>
                    <Link to="/register" className="dropdown-link" onClick={() => setIsAccountDropdownOpen(false)}>
                      Create Account
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

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

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          <Link to="/shop" onClick={closeMobileMenu}>Shop</Link>
          <Link to="/collections" onClick={closeMobileMenu}>Collections</Link>
          <Link to="/about" onClick={closeMobileMenu}>About</Link>
          <Link to="/wishlist" onClick={closeMobileMenu}>
            Saved Items {wishlistItems > 0 && `(${wishlistItems})`}
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/account" onClick={closeMobileMenu}>My Account</Link>
              <button onClick={handleLogout} className="mobile-logout">Sign Out</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMobileMenu}>Sign In</Link>
              <Link to="/register" onClick={closeMobileMenu}>Create Account</Link>
            </>
          )}
        </nav>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
      )}

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
