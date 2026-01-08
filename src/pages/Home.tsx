import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import InstagramFeed from '../components/InstagramFeed';
import { useProducts, useCollections, useHeroContent } from '../hooks/useShopify';
import './Home.css';

export default function Home() {
  const { products, loading: productsLoading } = useProducts(20);
  const { collections, loading: collectionsLoading } = useCollections(5);
  const { hero, loading: heroLoading } = useHeroContent();

  const featuredProducts = products.slice(0, 4);
  const newArrivals = products.slice(4, 8);

  return (
    <main className="home">
      {/* Hero Section */}
      {heroLoading ? (
        <section className="hero">
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <p>Loading...</p>
          </div>
        </section>
      ) : hero ? (
        <section className="hero">
          <div className="hero-content">
            <span className="hero-label">{hero.label}</span>
            <h1 className="hero-title">{hero.title}</h1>
            <p className="hero-description">{hero.description}</p>
            <div className="hero-actions">
              <Link to={hero.primaryButtonLink || '/shop'} className="btn-primary">
                {hero.primaryButtonText}
              </Link>
              <Link to={hero.secondaryButtonLink || '/collections'} className="btn-secondary">
                {hero.secondaryButtonText}
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <img
              src={hero.image}
              alt={hero.title || 'Vintage fashion editorial'}
            />
          </div>
        </section>
      ) : null}

      {/* Categories */}
      <section className="categories">
        <div className="section-header">
          <h2>Shop by Category</h2>
        </div>
        <div className="categories-grid">
          {collectionsLoading ? (
            <p>Loading collections...</p>
          ) : (
            collections.map(category => (
              <Link
                key={category.id}
                to={`/shop?category=${category.slug}`}
                className="category-card"
              >
                <img src={category.image} alt={category.name} />
                <span className="category-name">{category.name}</span>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured">
        <div className="section-header">
          <h2>Featured Pieces</h2>
          <Link to="/shop" className="section-link">View All</Link>
        </div>
        <div className="products-grid">
          {productsLoading ? (
            <p>Loading products...</p>
          ) : (
            featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="new-arrivals">
        <div className="section-header">
          <h2>New Arrivals</h2>
          <Link to="/shop?category=new" className="section-link">View All</Link>
        </div>
        <div className="products-grid">
          {productsLoading ? (
            <p>Loading products...</p>
          ) : (
            newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </section>

      {/* Instagram Feed */}
      <InstagramFeed />

      {/* Values */}
      <section className="values">
        <div className="values-grid">
          <div className="value-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
            <h3>Authenticated</h3>
            <p>Every piece verified for authenticity by our expert team.</p>
          </div>
          <div className="value-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
            </svg>
            <h3>Sustainable</h3>
            <p>Extending the lifecycle of beautiful clothing, one piece at a time.</p>
          </div>
          <div className="value-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>
            <h3>Curated</h3>
            <p>Only the finest pieces make it into our collection.</p>
          </div>
          <div className="value-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="14" x="2" y="5" rx="2"/>
              <line x1="2" x2="22" y1="10" y2="10"/>
            </svg>
            <h3>Secure Checkout</h3>
            <p>Shop confidently with our secure payment processing.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
