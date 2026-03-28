'use client';

import { useCart } from '@/context/CartContext';
import { Product } from '@/types/product';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      className="btn-add-cart"
      style={{
        padding: 'var(--space-md) var(--space-xl)',
        fontSize: 'var(--font-size-lg)',
        fontWeight: 'var(--font-weight-bold)',
        backgroundColor: 'var(--color-primary)',
        color: 'var(--color-white)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-md)',
        transition: 'all var(--transition-fast)',
        width: '100%',
      }}
    >
      Add to Cart
    </button>
  );
}
