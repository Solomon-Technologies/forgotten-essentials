import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts, useProductsByCollection, useCollections } from '../hooks/useShopify';
import { searchProductsWithRelevance } from '../utils/search';
import './Shop.css';

type SortOption = 'newest' | 'price-low' | 'price-high';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchQuery = searchParams.get('search');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Fetch all products for search, or by collection for category filtering
  const { products: allProducts, loading: allProductsLoading } = useProducts(100);
  const { products: collectionProducts, loading: collectionLoading } = useProductsByCollection(categoryParam, 50);
  const { collections } = useCollections(10);

  const productsLoading = searchQuery ? allProductsLoading : collectionLoading;
  const baseProducts = searchQuery ? allProducts : collectionProducts;

  const filteredProducts = useMemo(() => {
    let result = [...baseProducts];

    // Apply search filter if search query exists
    if (searchQuery) {
      result = searchProductsWithRelevance(result, searchQuery);
    }

    // Apply sorting (skip for search results as they're already sorted by relevance)
    if (!searchQuery) {
      switch (sortBy) {
        case 'price-low':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          result.sort((a, b) => b.price - a.price);
          break;
        default:
          break;
      }
    }

    return result;
  }, [baseProducts, searchQuery, sortBy]);

  const clearSearch = () => {
    setSearchParams({});
  };

  return (
    <main className="shop">
      <div className="shop-header">
        <h1>
          {searchQuery
            ? `Search Results for "${searchQuery}"`
            : categoryParam
            ? collections.find(c => c.slug === categoryParam)?.name || 'All Products'
            : 'All Products'}
        </h1>
        <p>{filteredProducts.length} {filteredProducts.length === 1 ? 'piece' : 'pieces'}</p>
        {searchQuery ? (
          <button onClick={clearSearch} className="view-all-btn">
            Clear Search
          </button>
        ) : categoryParam ? (
          <Link to="/collections" className="view-all-btn">
            View All Collections
          </Link>
        ) : (
          <Link to="/collections" className="view-all-btn">
            Browse Collections
          </Link>
        )}
      </div>

      <div className="shop-container">
        {/* Mobile Filter Toggle */}
        <button className="filter-toggle" onClick={() => setIsFilterOpen(!isFilterOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="21" x2="14" y1="4" y2="4"></line>
            <line x1="10" x2="3" y1="4" y2="4"></line>
            <line x1="21" x2="12" y1="12" y2="12"></line>
            <line x1="8" x2="3" y1="12" y2="12"></line>
            <line x1="21" x2="16" y1="20" y2="20"></line>
            <line x1="12" x2="3" y1="20" y2="20"></line>
            <line x1="14" x2="14" y1="2" y2="6"></line>
            <line x1="8" x2="8" y1="10" y2="14"></line>
            <line x1="16" x2="16" y1="18" y2="22"></line>
          </svg>
          Filter & Sort
        </button>

        {/* Sidebar */}
        <aside className={`shop-sidebar ${isFilterOpen ? 'open' : ''}`}>
          <div className="sidebar-section">
            <h3>Categories</h3>
            <ul className="filter-list">
              <li>
                <Link
                  to="/shop"
                  className={!categoryParam ? 'active' : ''}
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=jackets"
                  className={categoryParam === 'jackets' ? 'active' : ''}
                >
                  Jackets
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=shirts"
                  className={categoryParam === 'shirts' ? 'active' : ''}
                >
                  Shirts
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=tees"
                  className={categoryParam === 'tees' ? 'active' : ''}
                >
                  Tees
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=pants"
                  className={categoryParam === 'pants' ? 'active' : ''}
                >
                  Pants
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=accessories"
                  className={categoryParam === 'accessories' ? 'active' : ''}
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          <div className="sidebar-section">
            <h3>Sort By</h3>
            <ul className="filter-list">
              <li>
                <button
                  className={sortBy === 'newest' ? 'active' : ''}
                  onClick={() => setSortBy('newest')}
                >
                  Newest
                </button>
              </li>
              <li>
                <button
                  className={sortBy === 'price-low' ? 'active' : ''}
                  onClick={() => setSortBy('price-low')}
                >
                  Price: Low to High
                </button>
              </li>
              <li>
                <button
                  className={sortBy === 'price-high' ? 'active' : ''}
                  onClick={() => setSortBy('price-high')}
                >
                  Price: High to Low
                </button>
              </li>
            </ul>
          </div>

          <button className="sidebar-close" onClick={() => setIsFilterOpen(false)}>
            Apply Filters
          </button>
        </aside>

        {/* Products Grid */}
        <div className="shop-products">
          {productsLoading ? (
            <p>Loading products...</p>
          ) : filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-products">
              <p>No products found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
