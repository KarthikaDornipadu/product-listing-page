'use client';

import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: 'var(--color-white)',
        textAlign: 'center',
      }}
    >
      <div>
        <h1 style={{ fontSize: 'var(--font-size-5xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-primary)', marginBottom: 'var(--space-lg)' }}>
          404
        </h1>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-gray-900)', marginBottom: 'var(--space-sm)' }}>
          Page Not Found
        </h2>
        <p style={{ color: 'var(--color-gray-600)', marginBottom: 'var(--space-2xl)' }}>
          Sorry, the page you&#39;re looking for doesn&#39;t exist.
        </p>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-white)',
            padding: 'var(--space-md) var(--space-xl)',
            borderRadius: 'var(--radius-md)',
            fontWeight: 'var(--font-weight-semibold)',
            textDecoration: 'none',
            transition: 'background-color var(--transition-fast)',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.backgroundColor = 'var(--color-primary-dark)';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.backgroundColor = 'var(--color-primary)';
          }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
