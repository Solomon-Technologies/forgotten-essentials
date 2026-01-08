import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2 className="footer-logo">FORGOTTEN ESSENTIALS</h2>
            <p className="footer-description">
              Thoughtfully sourced vintage and pre-loved clothing for the conscious consumer.
              Every piece tells a story.
            </p>
            <div className="footer-social">
              <a
                href="https://instagram.com/forgottenessentials"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://facebook.com/forgottenessentials"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="https://tiktok.com/@forgottenessentials"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h3>Shop</h3>
            <ul>
              <li><Link to="/shop?category=new">New Arrivals</Link></li>
              <li><Link to="/shop?category=outerwear">Outerwear</Link></li>
              <li><Link to="/shop?category=dresses">Dresses</Link></li>
              <li><Link to="/shop?category=tops">Tops</Link></li>
              <li><Link to="/shop?category=bottoms">Bottoms</Link></li>
              <li><Link to="/shop?category=accessories">Accessories</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h3>About</h3>
            <ul>
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/sustainability">Sustainability</Link></li>
              <li><Link to="/consign">Sell With Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h3>Help</h3>
            <ul>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/shipping">Shipping & Returns</Link></li>
              <li><Link to="/sizing">Size Guide</Link></li>
              <li><Link to="/care">Care Instructions</Link></li>
            </ul>
          </div>

          <div className="footer-newsletter">
            <h3>Stay in Touch</h3>
            <p>Subscribe for early access to new arrivals and exclusive offers.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Your email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Forgotten Essentials. All rights reserved.</p>
          <div className="footer-legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
