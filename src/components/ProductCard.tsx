import { Link } from 'react-router-dom';
import { Product } from '../types';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image-wrapper">
        <img
          src={product.images[0]}
          alt={product.name}
          className="product-image"
        />
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={product.name}
            className="product-image-hover"
          />
        )}
        {product.originalPrice && (
          <span className="product-badge">Sale</span>
        )}
      </div>
      <div className="product-info">
        <span className="product-era">{product.era}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-meta">Size {product.size} · {product.condition}</p>
        <div className="product-price">
          <span className="price-current">${product.price}</span>
          {product.originalPrice && (
            <span className="price-original">${product.originalPrice}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
