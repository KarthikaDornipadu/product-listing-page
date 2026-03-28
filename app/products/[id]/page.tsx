import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getProductById, getAllProducts } from "@/lib/fakestore";
import { notFound } from "next/navigation";
import { StarIcon } from "@/components/Icons";
import '@/styles/product-detail.css';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.slice(0, 20).map((product) => ({
    id: product.id.toString(),
  }));
}

export async function generateMetadata(
  { params }: ProductPageProps
): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(parseInt(id));

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The product you are looking for does not exist.",
    };
  }

  return {
    title: `${product.title} - Product Store`,
    description: product.description,
    keywords: `${product.title}, ${product.category}, shopping, store`,
    openGraph: {
      title: product.title,
      description: product.description,
      type: "website",
      images: [
        {
          url: product.image,
          width: 500,
          height: 500,
          alt: product.title,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(parseInt(id));

  if (!product) {
    notFound();
  }

  const imageUrl = product.image || "https://via.placeholder.com/500x500?text=Product";
  const rating = product.rating?.rate || 0;
  const ratingCount = product.rating?.count || 0;

  return (
    <div style={{ backgroundColor: 'var(--color-white)' }}>
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link href="/" className="breadcrumb-link">
          Home
        </Link>
        <span className="breadcrumb-separator">/</span>
        <Link
          href={`/category/${product.category}`}
          className="breadcrumb-link"
          style={{ textTransform: 'capitalize' }}
        >
          {product.category}
        </Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">{product.title}</span>
      </div>

      <div className="product-detail-container">
        <div className="product-detail-grid">
          {/* Image Section */}
          <div className="product-image-section">
            <Image
              src={imageUrl}
              alt={`${product.title} - High quality product image`}
              width={500}
              height={500}
              style={{ maxWidth: '100%', height: 'auto' }}
              priority
            />
          </div>

          {/* Product Details */}
          <div className="product-details-section">
            <h1>
              {product.title}
            </h1>

            {/* Rating */}
            <div className="product-rating">
              <div className="rating-stars">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} filled={i < Math.round(rating)} />
                ))}
              </div>
              <span className="rating-text">
                {rating.toFixed(1)} ({ratingCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div style={{ marginBottom: 'var(--space-lg)' }}>
              <div className="product-price">
                ${product.price.toFixed(2)}
              </div>
              <div className="product-category">
                <span className="product-category-label">Category:</span>
                <span className="product-category-name"> {product.category}</span>
              </div>
            </div>

            {/* Description */}
            <div className="description-section">
              <h2>Description</h2>
              <p className="product-description">
                {product.description}
              </p>
            </div>

            {/* Product Details */}
            <div className="details-section">
              <h2>Product Details</h2>
              <ul className="details-list">
                <li>
                  <span className="details-label">Category:</span>
                  {" "}
                  <span style={{ textTransform: 'capitalize' }}>{product.category}</span>
                </li>
                <li>
                  <span className="details-label">Price:</span>
                  {" "}
                  ${product.price.toFixed(2)}
                </li>
                <li>
                  <span className="details-label">Rating:</span>
                  {" "}
                  {rating.toFixed(1)}/5
                </li>
              </ul>
            </div>

            {/* Actions */}
            <div className="product-actions">
              <button className="btn-add-cart">
                Add to Cart
              </button>
              <button className="btn-wishlist">
                Add to Wishlist
              </button>
            </div>

            {/* Related Products Link */}
            <div>
              <Link
                href={`/category/${product.category}`}
                className="related-link"
              >
                ← View more {product.category} products
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            description: product.description,
            image: product.image,
            brand: {
              "@type": "Brand",
              name: "Product Store",
            },
            offers: {
              "@type": "Offer",
              url: `https://product-store.app/products/${product.id}`,
              priceCurrency: "USD",
              price: product.price.toFixed(2),
              availability: "https://schema.org/InStock",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: rating.toFixed(1),
              reviewCount: ratingCount,
            },
          }),
        }}
      />
    </div>
  );
}
