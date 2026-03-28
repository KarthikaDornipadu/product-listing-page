import type { Metadata } from "next";
import { getAllProducts, getCategories, formatCategoryName } from "@/lib/fakestore";
import ProductGrid from "@/components/ProductGrid";
import SearchInput from "@/components/SearchInput";
import { Suspense } from "react";
import '@/styles/home.css';

// Enable ISR (Incremental Static Regeneration) - revalidate every hour
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Product Store - Shop Quality Products Online",
  description: "Browse our extensive collection of products including electronics, clothing, jwellery, and more. Find everything you need at competitive prices.",
  keywords: "products, shopping, store, online store, e-commerce",
  openGraph: {
    title: "Product Store - Shop Quality Products Online",
    description: "Browse our collection of products at competitive prices.",
    type: "website",
  },
};

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function ProductsSection({ query }: { query?: string }) {
  let products = await getAllProducts();

  if (query) {
    const lowerQuery = query.toLowerCase();
    products = products.filter(
      (p) =>
        p.title.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery) ||
        formatCategoryName(p.category).toLowerCase().includes(lowerQuery)
    );
  }

  return (
    <section className="products-section">
      <div className="products-container">
        <ProductGrid products={products} />
      </div>
    </section>
  );
}

async function CategoriesSection() {
  const categories = await getCategories();

  return (
    <section id="categories" className="categories-section">
      <div className="categories-container">
        <h2 className="categories-title">Shop by Category</h2>
        <div className="categories-grid">
          {categories.map((category) => (
            <a
              key={category}
              href={`/category/${category}`}
              className="category-link"
              style={{ textTransform: 'capitalize' }}
            >
              {formatCategoryName(category)}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : undefined;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--color-white)' }}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to Product Store
          </h1>
          <p className="hero-subtitle">
            Discover an amazing selection of quality products at unbeatable prices. 
            Browse through thousands of items and find exactly what you&#39;re looking for.
          </p>
        </div>
      </section>

      {/* Categories Section */}
      <Suspense
        fallback={
          <section className="categories-section">
            <div className="categories-container">
              <div style={{ height: '8rem', backgroundColor: 'var(--color-gray-200)', borderRadius: 'var(--radius-md)' }}></div>
            </div>
          </section>
        }
      >
        <CategoriesSection />
      </Suspense>

      {/* Products Section */}
      <section className="products-section">
        <div className="products-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: 'var(--space-xl)' }}>
            <h2 className="products-title" style={{ marginBottom: 0 }}>
              {query ? `Search results for "${query}"` : "All Products"}
            </h2>
            <div style={{ width: '100%', maxWidth: '24rem' }}>
              <SearchInput />
            </div>
          </div>
          
          <Suspense
            key={query}
            fallback={
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-lg)', width: '100%' }}>
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: 'var(--color-gray-200)',
                      borderRadius: 'var(--radius-lg)',
                      height: '24rem',
                      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                    }}
                  />
                ))}
              </div>
            }
          >
            <ProductsSection query={query} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
