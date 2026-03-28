import type { Metadata } from "next";
import { getProductsByCategory, getCategories } from "@/lib/fakestore";
import ProductGrid from "@/components/ProductGrid";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import '@/styles/category.css';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({
    category: category,
  }));
}

export async function generateMetadata(
  { params }: CategoryPageProps
): Promise<Metadata> {
  const { category } = await params;

  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

  return {
    title: `${categoryTitle} Products - Product Store`,
    description: `Browse our collection of ${categoryTitle.toLowerCase()} products. Find the best deals on quality items at Product Store.`,
    keywords: `${categoryTitle}, products, shopping, store, ${category}`,
    openGraph: {
      title: `${categoryTitle} Products - Product Store`,
      description: `Browse our collection of ${categoryTitle.toLowerCase()} products.`,
      type: "website",
    },
  };
}

async function CategoryProducts({ category }: { category: string }) {
  const products = await getProductsByCategory(category);

  if (!products || products.length === 0) {
    return (
      <div className="grid-empty">
        <p>No products found in this category</p>
      </div>
    );
  }

  return <ProductGrid products={products} />;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categories = await getCategories();

  // Validate category exists
  if (!categories.includes(category)) {
    notFound();
  }

  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div style={{ backgroundColor: 'var(--color-white)' }}>
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link href="/" className="breadcrumb-link">
          Home
        </Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current" style={{ textTransform: 'capitalize' }}>
          {category}
        </span>
      </div>

      {/* Category Header */}
      <div className="category-header">
        <div className="category-header-content">
          <h1 className="category-header-title">{category}</h1>
          <p className="category-header-subtitle">
            Explore our collection of premium {category} products
          </p>
        </div>
      </div>

      {/* Filters and Products Section */}
      <div className="category-filters-section">
        {/* Category Navigation */}
        <div className="category-nav">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/category/${cat}`}
              className={`category-nav-link ${
                cat === category ? 'active' : 'inactive'
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Products Grid */}
        <Suspense
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
          <CategoryProducts category={category} />
        </Suspense>
      </div>
    </div>
  );
}
