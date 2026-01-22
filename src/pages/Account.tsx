import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import './Account.css';

// Mock order data for demonstration
const mockOrders = [
  {
    id: 'FE-1001',
    date: '2024-01-15',
    status: 'Delivered',
    total: 125.00,
    items: 2,
  },
  {
    id: 'FE-1002',
    date: '2024-01-28',
    status: 'Shipped',
    total: 89.00,
    items: 1,
  },
];

export default function Account() {
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const { items: wishlistItems } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (isLoading) {
    return (
      <main className="account-page">
        <div className="account-loading">Loading...</div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <main className="account-page">
      <div className="account-container">
        <div className="account-header">
          <h1>My Account</h1>
          <button onClick={handleLogout} className="logout-btn">
            Sign Out
          </button>
        </div>

        <div className="account-grid">
          <section className="account-section account-details">
            <h2>Account Details</h2>
            <div className="details-card">
              <div className="detail-row">
                <span className="detail-label">Name</span>
                <span className="detail-value">
                  {user.firstName} {user.lastName}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email</span>
                <span className="detail-value">{user.email}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Member Since</span>
                <span className="detail-value">{formatDate(user.createdAt)}</span>
              </div>
            </div>
          </section>

          <section className="account-section account-wishlist-preview">
            <div className="section-header">
              <h2>Saved Items</h2>
              <Link to="/wishlist" className="view-all-link">
                View All ({wishlistItems.length})
              </Link>
            </div>
            {wishlistItems.length > 0 ? (
              <div className="wishlist-preview-grid">
                {wishlistItems.slice(0, 3).map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.slug}`}
                    className="wishlist-preview-item"
                  >
                    <img src={product.image} alt={product.name} />
                  </Link>
                ))}
                {wishlistItems.length > 3 && (
                  <Link to="/wishlist" className="wishlist-preview-more">
                    +{wishlistItems.length - 3} more
                  </Link>
                )}
              </div>
            ) : (
              <p className="empty-message">
                No saved items yet.{' '}
                <Link to="/shop">Start shopping</Link>
              </p>
            )}
          </section>

          <section className="account-section account-orders">
            <div className="section-header">
              <h2>Recent Orders</h2>
            </div>
            {mockOrders.length > 0 ? (
              <div className="orders-list">
                {mockOrders.map((order) => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <span className="order-id">Order #{order.id}</span>
                      <span className={`order-status status-${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="order-details">
                      <span className="order-date">{formatDate(order.date)}</span>
                      <span className="order-items">{order.items} item{order.items > 1 ? 's' : ''}</span>
                      <span className="order-total">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-message">
                No orders yet.{' '}
                <Link to="/shop">Start shopping</Link>
              </p>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
