'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { StarIcon } from './Icons';
import { convertUSDToINR, formatCategoryName } from '@/lib/fakestore';
import { useCart } from '@/context/CartContext';
import '@/styles/product-card.css';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const imageUrl = product.image || 'https://via.placeholder.com/300x400?text=Product';
  const rating = product.rating?.rate || 0;
  const ratingCount = product.rating?.count || 0;
  const categoryName = formatCategoryName(product.category);

  return (
    <div className="product-card">
      <Link href={`/products/${product.id}`} className="product-card-link" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="product-card-image">
          <Image
            src={imageUrl}
            alt={`${product.title} - Product image`}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
          <span className="product-card-badge" style={{ textTransform: 'capitalize' }}>
            {categoryName}
          </span>
        </div>
        <div className="product-card-content">
          <h3 className="product-card-title">
            {product.title}
          </h3>
          <p className="product-card-description">
            {product.description}
          </p>
          <div className="product-card-footer">
            <div className="product-card-rating">
              <div className="product-card-stars">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    filled={i < Math.round(rating)}
                  />
                ))}
              </div>
              <span className="product-card-count">
                ({ratingCount})
              </span>
            </div>
            <span className="product-card-price">
              ₹{convertUSDToINR(product.price).toFixed(2)}
            </span>
          </div>
        </div>
      </Link>
      <div style={{ padding: '0 var(--space-md) var(--space-md)' }}>
        <button 
          onClick={() => addToCart(product)}
          className="btn-add-cart"
          style={{ width: '100%', padding: 'var(--space-sm)', borderRadius: 'var(--radius-md)' }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
