import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useShopify';
import { searchProductsWithRelevance } from '../utils/search';
import './SearchModal.css';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { products } = useProducts(100);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Reset query when modal closes
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setDebouncedQuery('');
    }
  }, [isOpen]);

  const searchResults = searchProductsWithRelevance(products, debouncedQuery);
  const displayResults = searchResults.slice(0, 6); // Show top 6 results

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  const handleResultClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="search-form">
          <div className="search-input-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products..."
              className="search-input"
              autoComplete="off"
            />
            {query && (
              <button
                type="button"
                className="search-clear"
                onClick={() => setQuery('')}
                aria-label="Clear search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>
          <button type="button" className="search-close" onClick={onClose}>
            Cancel
          </button>
        </form>

        {debouncedQuery && (
          <div className="search-results">
            {displayResults.length > 0 ? (
              <>
                <div className="search-results-list">
                  {displayResults.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.slug}`}
                      className="search-result-item"
                      onClick={handleResultClick}
                    >
                      <div className="search-result-image">
                        <img src={product.image} alt={product.name} />
                      </div>
                      <div className="search-result-info">
                        <span className="search-result-name">{product.name}</span>
                        <span className="search-result-meta">
                          {product.brand && <span>{product.brand}</span>}
                          {product.category && <span>{product.category}</span>}
                        </span>
                        <span className="search-result-price">${product.price}</span>
                      </div>
                    </Link>
                  ))}
                </div>
                {searchResults.length > 6 && (
                  <Link
                    to={`/shop?search=${encodeURIComponent(debouncedQuery)}`}
                    className="search-view-all"
                    onClick={handleResultClick}
                  >
                    View all {searchResults.length} results
                  </Link>
                )}
              </>
            ) : (
              <div className="search-no-results">
                <p>No products found for "{debouncedQuery}"</p>
                <p className="search-no-results-hint">Try different keywords or browse our collections</p>
              </div>
            )}
          </div>
        )}

        {!debouncedQuery && (
          <div className="search-suggestions">
            <p className="search-suggestions-title">Popular Searches</p>
            <div className="search-suggestions-list">
              {['Jacket', 'Vintage', 'Carhartt', 'Jeans', 'Flannel'].map((term) => (
                <button
                  key={term}
                  className="search-suggestion"
                  onClick={() => setQuery(term)}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
