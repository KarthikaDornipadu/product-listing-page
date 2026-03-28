'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import '@/styles/header.css';

export default function Header() {
  const { cartCount } = useCart();

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <Link href="/" className="header-logo">
            Product Store
          </Link>
          <nav className="header-nav">
            <Link href="/" className="nav-link">
              Home
            </Link>
            <Link href="/#categories" className="nav-link">
              Categories
            </Link>
            <div className="cart-link" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-gray-600)', background: 'var(--color-gray-100)', padding: 'var(--space-xs) var(--space-sm)', borderRadius: 'var(--radius-full)' }}>
                Cart ({cartCount})
              </span>
            </div>
          </nav>
          <div className="header-mobile-menu">
            <button className="menu-toggle" aria-label="Toggle menu">
              <svg
                className="menu-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
