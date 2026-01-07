import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import './Shop.css';

type SortOption = 'newest' | 'price-low' | 'price-high';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (categoryParam && categoryParam !== 'new') {
      result = result.filter(p => p.category === categoryParam);
    }

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

    return result;
  }, [categoryParam, sortBy]);

  const handleCategoryChange = (slug: string | null) => {
    if (slug) {
      setSearchParams({ category: slug });
    } else {
      setSearchParams({});
    }
  };

  return (
    <main className="shop">
      <div className="shop-header">
        <h1>{categoryParam ? categories.find(c => c.slug === categoryParam)?.name || 'All Products' : 'All Products'}</h1>
        <p>{filteredProducts.length} {filteredProducts.length === 1 ? 'piece' : 'pieces'}</p>
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
                <button
                  className={!categoryParam ? 'active' : ''}
                  onClick={() => handleCategoryChange(null)}
                >
                  All Products
                </button>
              </li>
              {categories.map(category => (
                <li key={category.id}>
                  <button
                    className={categoryParam === category.slug ? 'active' : ''}
                    onClick={() => handleCategoryChange(category.slug)}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
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
          {filteredProducts.length > 0 ? (
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
