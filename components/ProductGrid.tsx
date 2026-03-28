'use client';

import { Product } from '@/types/product';
import ProductCard from './ProductCard';
import '@/styles/product-grid.css';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

export default function ProductGrid({
  products,
  isLoading = false,
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid-skeleton">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="skeleton-card"
          />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="grid-empty">
        <p>No products found</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
