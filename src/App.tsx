import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import AnnouncementBar from './components/AnnouncementBar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Collections from './pages/Collections';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import Wishlist from './pages/Wishlist';
import './App.css';

const isPreviewMode =
  !import.meta.env.VITE_SHOPIFY_STORE_DOMAIN ||
  !import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
  import.meta.env.VITE_SHOPIFY_STORE_DOMAIN === 'your-store.myshopify.com' ||
  import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN === 'your-storefront-access-token-here';

function App() {
  const [showMockData, setShowMockData] = useState(() => {
    const saved = localStorage.getItem('showMockData');
    return saved !== null ? saved === 'true' : true; // Default to true (show mock data)
  });

  const handleToggleMockData = () => {
    const newValue = !showMockData;
    setShowMockData(newValue);
    localStorage.setItem('showMockData', String(newValue));
    window.location.reload(); // Reload to apply changes
  };

  const bannerHeight = isPreviewMode ? '46px' : '0px';
  const announcementBarHeight = '36px';

  return (
    <BrowserRouter>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <div className="app" style={{
              '--preview-banner-height': bannerHeight,
              '--announcement-bar-height': announcementBarHeight
            } as React.CSSProperties}>
              {isPreviewMode && (
                <div style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  zIndex: 101,
                  background: '#000',
                  color: '#fff',
                  padding: '12px 20px',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontWeight: 700,
                  borderBottom: '2px solid #000',
                  fontFamily: 'Arial, sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '20px'
                }}>
                  <span>
                    {showMockData ? 'PREVIEW MODE - Showing example data' : 'EMPTY MODE - No products loaded'}
                  </span>
                  <button
                    onClick={handleToggleMockData}
                    style={{
                      background: '#fff',
                      color: '#000',
                      border: '2px solid #fff',
                      padding: '6px 16px',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontFamily: 'Arial, sans-serif',
                      textTransform: 'uppercase'
                    }}
                  >
                    {showMockData ? 'Switch to Empty' : 'Switch to Preview'}
                  </button>
                </div>
              )}
              <AnnouncementBar />
              <Header />
              <CartDrawer />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/account" element={<Account />} />
                <Route path="/wishlist" element={<Wishlist />} />
              </Routes>
              <Footer />
            </div>
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
