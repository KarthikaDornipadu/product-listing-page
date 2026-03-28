'use client';

import Link from 'next/link';
import '@/styles/header.css';

export default function Header() {
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
