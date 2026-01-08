import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import './App.css';

const isPreviewMode =
  !import.meta.env.VITE_SHOPIFY_STORE_DOMAIN ||
  !import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
  import.meta.env.VITE_SHOPIFY_STORE_DOMAIN === 'your-store.myshopify.com' ||
  import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN === 'your-storefront-access-token-here';

function App() {
  const bannerHeight = isPreviewMode ? '46px' : '0px';

  return (
    <BrowserRouter>
      <CartProvider>
        <div className="app" style={{ '--preview-banner-height': bannerHeight } as React.CSSProperties}>
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
              fontFamily: 'Arial, sans-serif'
            }}>
              PREVIEW MODE - Using example data. Configure Shopify credentials in .env.local to connect your store.
            </div>
          )}
          <Header />
          <CartDrawer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
