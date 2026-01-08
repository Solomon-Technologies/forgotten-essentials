import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { useProduct, useProductDetailSettings, useProducts } from '../hooks/useShopify';
import './ProductDetail.css';

// Icon components for product perks
const perkIconMap: Record<string, JSX.Element> = {
  package: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16v-2"/>
      <path d="m7.5 4.27 9 5.15"/>
      <polyline points="3.29,7 12,12 20.71,7"/>
      <line x1="12" x2="12" y1="22" y2="12"/>
    </svg>
  ),
  return: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
      <path d="M3 3v5h5"/>
    </svg>
  ),
  shield: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  ),
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);

  const { product, loading: productLoading } = useProduct(id);
  const { settings, loading: settingsLoading } = useProductDetailSettings();
  const { products: allProducts } = useProducts(20);

  if (productLoading || settingsLoading) {
    return (
      <main className="product-detail">
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <p>Loading...</p>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="product-not-found">
        <h1>{settings?.notFoundHeading || 'Product Not Found'}</h1>
        <p>{settings?.notFoundDescription || "The product you're looking for doesn't exist."}</p>
        <Link to="/shop" className="btn-primary">
          {settings?.notFoundButtonText || 'Back to Shop'}
        </Link>
      </main>
    );
  }

  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <main className="product-detail">
      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/shop">Shop</Link>
        <span>/</span>
        <Link to={`/shop?category=${product.category}`}>{product.category}</Link>
        <span>/</span>
        <span>{product.name}</span>
      </nav>

      <div className="product-content">
        {/* Image Gallery */}
        <div className="product-gallery">
          <div className="gallery-main">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
            />
          </div>
          {product.images.length > 1 && (
            <div className="gallery-thumbs">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`gallery-thumb ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${product.name} view ${index + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="product-info">
          {product.era && <span className="product-era-badge">{product.era}</span>}
          <h1 className="product-title">{product.name}</h1>

          <div className="product-pricing">
            <span className="product-price">${product.price}</span>
            {product.originalPrice && (
              <span className="product-original-price">${product.originalPrice}</span>
            )}
          </div>

          <p className="product-description">{product.description}</p>

          <div className="product-details">
            {product.size && (
              <div className="detail-row">
                <span className="detail-label">Size</span>
                <span className="detail-value">{product.size}</span>
              </div>
            )}
            {product.era && (
              <div className="detail-row">
                <span className="detail-label">Era</span>
                <span className="detail-value">{product.era}</span>
              </div>
            )}
            {product.condition && (
              <div className="detail-row">
                <span className="detail-label">Condition</span>
                <span className="detail-value">{product.condition}</span>
              </div>
            )}
            {product.brand && (
              <div className="detail-row">
                <span className="detail-label">Brand</span>
                <span className="detail-value">{product.brand}</span>
              </div>
            )}
          </div>

          {product.measurements && (
            <div className="product-measurements">
              <h3>Measurements</h3>
              <div className="measurements-grid">
                {product.measurements.chest && (
                  <div className="measurement">
                    <span className="measurement-label">Chest</span>
                    <span className="measurement-value">{product.measurements.chest}</span>
                  </div>
                )}
                {product.measurements.waist && (
                  <div className="measurement">
                    <span className="measurement-label">Waist</span>
                    <span className="measurement-value">{product.measurements.waist}</span>
                  </div>
                )}
                {product.measurements.length && (
                  <div className="measurement">
                    <span className="measurement-label">Length</span>
                    <span className="measurement-value">{product.measurements.length}</span>
                  </div>
                )}
                {product.measurements.shoulders && (
                  <div className="measurement">
                    <span className="measurement-label">Shoulders</span>
                    <span className="measurement-value">{product.measurements.shoulders}</span>
                  </div>
                )}
                {product.measurements.sleeves && (
                  <div className="measurement">
                    <span className="measurement-label">Sleeves</span>
                    <span className="measurement-value">{product.measurements.sleeves}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <button
            className="btn-add-to-cart"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            {product.inStock
              ? settings?.addToCartText || 'Add to Cart'
              : settings?.soldOutText || 'Sold Out'}
          </button>

          <div className="product-perks">
            {settings?.perk1Text && (
              <div className="perk">
                {perkIconMap[settings.perk1Icon] || perkIconMap.package}
                <span>{settings.perk1Text}</span>
              </div>
            )}
            {settings?.perk2Text && (
              <div className="perk">
                {perkIconMap[settings.perk2Icon] || perkIconMap.return}
                <span>{settings.perk2Text}</span>
              </div>
            )}
            {settings?.perk3Text && (
              <div className="perk">
                {perkIconMap[settings.perk3Icon] || perkIconMap.shield}
                <span>{settings.perk3Text}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="related-products">
          <div className="section-header">
            <h2>{settings?.relatedProductsHeading || 'You May Also Like'}</h2>
            <Link to={`/shop?category=${product.category}`} className="section-link">
              {settings?.relatedProductsLinkText || 'View All'}
            </Link>
          </div>
          <div className="products-grid">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
