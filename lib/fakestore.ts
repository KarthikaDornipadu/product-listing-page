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
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  },
  next: { revalidate: 300 },
};

// Fallback data when API is down
const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: { rate: 3.9, count: 120 }
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The henley style round neckline includes a three-button placket.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    rating: { rate: 4.1, count: 259 }
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description: "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    rating: { rate: 4.7, count: 500 }
  }
];

export async function getAllProducts(): Promise<Product[]> {
  const url = `${API_BASE_URL}/products`;
  console.log('Fetching all products from:', url);
  try {
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
      console.warn(`Initial fetch failed (${response.status}). Retrying without cache...`);
      // Retry once without cache
      const retryResponse = await fetch(url, { ...fetchOptions, cache: 'no-store' });
      if (!retryResponse.ok) throw new Error(`API returned ${retryResponse.status}`);
      return await retryResponse.json();
    }
    const data = await response.json();
    console.log(`Successfully fetched ${data.length} products`);
    return data;
  } catch (error) {
    console.error('API Fetch failed, using mock data:', error);
    return MOCK_PRODUCTS;
  }
}

export async function getProductById(id: number): Promise<Product | null> {
  const url = `${API_BASE_URL}/products/${id}`;
  try {
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
        const retryResponse = await fetch(url, { ...fetchOptions, cache: 'no-store' });
        if (!retryResponse.ok) throw new Error(`API returned ${retryResponse.status}`);
        return await retryResponse.json();
    }
    return response.json();
  } catch (error) {
    console.error(`Error in getProductById for id ${id}:`, error);
    return MOCK_PRODUCTS.find(p => p.id === id) || null;
  }
}

export async function getCategories(): Promise<string[]> {
  const url = `${API_BASE_URL}/products/categories`;
  try {
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
        const retryResponse = await fetch(url, { ...fetchOptions, cache: 'no-store' });
        if (!retryResponse.ok) throw new Error(`API returned ${retryResponse.status}`);
        return await retryResponse.json();
    }
    return response.json();
  } catch (error) {
    console.error('Error in getCategories:', error);
    return ["electronics", "jewelery", "men's clothing", "women's clothing"];
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const url = `${API_BASE_URL}/products/category/${category}`;
  try {
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
        const retryResponse = await fetch(url, { ...fetchOptions, cache: 'no-store' });
        if (!retryResponse.ok) throw new Error(`API returned ${retryResponse.status}`);
        return await retryResponse.json();
    }
    return response.json();
  } catch (error) {
    console.error(`Error in getProductsByCategory for category ${category}:`, error);
    return MOCK_PRODUCTS.filter(p => p.category === category);
  }
}
