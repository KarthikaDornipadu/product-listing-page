'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  function handleSearch(term: string) {
    setQuery(term);
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set('q', term);
      } else {
        params.delete('q');
      }
      router.push(`/?${params.toString()}`);
    });
  }

  return (
    <div className="search-container" style={{ margin: 'var(--space-lg) 0' }}>
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="search-input"
        style={{
          width: '100%',
          padding: 'var(--space-md) var(--space-lg)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
          fontSize: 'var(--font-size-base)',
          outline: 'none',
          boxShadow: 'var(--shadow-sm)',
          transition: 'border-color var(--transition-fast)',
        }}
      />
      {isPending && <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-gray-500)', marginTop: 'var(--space-xs)' }}>Searching...</p>}
    </div>
  );
}
