import { Product } from '@/types/product';

const API_BASE_URL = 'https://fakestoreapi.com';
const USD_TO_INR_RATE = 83; // Approximate conversion rate

export function convertUSDToINR(usd: number): number {
  return usd * USD_TO_INR_RATE;
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      next: { revalidate: 3600 }, // Revalidate every hour for SSR
    });
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductById(id: number): Promise<Product | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/category/${category}`
    );
    if (!response.ok) throw new Error('Failed to fetch products by category');
    return response.json();
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
}
