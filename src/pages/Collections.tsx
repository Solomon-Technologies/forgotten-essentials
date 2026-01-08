import { Link } from 'react-router-dom';
import { useCollections } from '../hooks/useShopify';
import './Collections.css';

export default function Collections() {
  const { collections, loading } = useCollections(20);

  return (
    <main className="collections-page">
      <div className="collections-header">
        <h1>Shop by Collection</h1>
        <p>Browse our curated categories</p>
      </div>

      <div className="collections-container">
        {loading ? (
          <p>Loading collections...</p>
        ) : collections.length > 0 ? (
          <div className="collections-grid">
            {collections.map(collection => (
              <Link
                key={collection.id}
                to={`/shop?category=${collection.slug}`}
                className="collection-card"
              >
                <div className="collection-image-wrapper">
                  <img src={collection.image} alt={collection.name} />
                </div>
                <div className="collection-info">
                  <h3>{collection.name}</h3>
                  {collection.description && (
                    <p className="collection-description">{collection.description}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="no-collections">
            <p>No collections found.</p>
          </div>
        )}
      </div>
    </main>
  );
}
