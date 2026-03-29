import { Product } from '@/types/product';

const API_BASE_URL = 'https://fakestoreapi.com';
const USD_TO_INR_RATE = 83; // Approximate conversion rate

export function convertUSDToINR(usd: number): number {
  return usd * USD_TO_INR_RATE;
}

export function formatCategoryName(category: string): string {
  // The API uses "jewelery" (misspelled). We support it but can display it better if needed.
  if (category.toLowerCase() === 'jewelery') return 'jewelry';
  return category;
}

const fetchOptions = {
  headers: {
    'Accept': 'application/json',
  },
  next: { revalidate: 300 },
};

export async function getAllProducts(): Promise<Product[]> {
  const url = `${API_BASE_URL}/products`;
  console.log('Fetching all products from:', url);
  try {
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No error body');
      console.error(`Fetch failed with status: ${response.status}. Error: ${errorText}`);
      throw new Error(`Failed to fetch products: ${response.status}`);
    }
    const data = await response.json();
    console.log(`Successfully fetched ${data.length} products`);
    return data;
  } catch (error) {
    console.error('Error in getAllProducts:', error);
    // Return empty array as fallback, but the log will now show the actual error on the server
    return [];
  }
}

export async function getProductById(id: number): Promise<Product | null> {
  const url = `${API_BASE_URL}/products/${id}`;
  try {
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No error body');
      console.error(`Fetch product ${id} failed with status: ${response.status}. Error: ${errorText}`);
      throw new Error(`Failed to fetch product: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Error in getProductById for id ${id}:`, error);
    return null;
  }
}

export async function getCategories(): Promise<string[]> {
  const url = `${API_BASE_URL}/products/categories`;
  try {
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No error body');
      console.error(`Fetch categories failed with status: ${response.status}. Error: ${errorText}`);
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error in getCategories:', error);
    return [];
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const url = `${API_BASE_URL}/products/category/${category}`;
  try {
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No error body');
      console.error(`Fetch products by category ${category} failed with status: ${response.status}. Error: ${errorText}`);
      throw new Error(`Failed to fetch products by category: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Error in getProductsByCategory for category ${category}:`, error);
    return [];
  }
}
