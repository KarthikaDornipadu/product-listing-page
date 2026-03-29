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

const fetchOptions: RequestInit = {
  headers: {
    'Accept': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  },
  // Use no-store to avoid stale empty results in some deployment environments Like Netlify
  cache: 'no-store',
};

// Fallback data when API is down or blocking requests
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
  },
  {
    id: 4,
    title: "Mens Casual Slim Fit",
    price: 15.99,
    description: "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71YXzeWusdL._AC_UY879_.jpg",
    rating: { rate: 2.1, count: 430 }
  },
  {
    id: 5,
    title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 695,
    description: "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 4.6, count: 400 }
  },
  {
    id: 6,
    title: "Solid Gold Petite Micropave",
    price: 168,
    description: "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 3.9, count: 70 }
  }
];

export async function getAllProducts(): Promise<Product[]> {
  const url = `${API_BASE_URL}/products`;
  try {
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
    }
    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) {
        throw new Error('API returned empty or invalid data');
    }
    return data;
  } catch (error) {
    console.warn(`getAllProducts failed, using mock data:`, error instanceof Error ? error.message : error);
    return MOCK_PRODUCTS;
  }
}

export async function getProductById(id: number): Promise<Product | null> {
  const url = `${API_BASE_URL}/products/${id}`;
  try {
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.warn(`getProductById with id ${id} failed, checking mock data:`, error);
    return MOCK_PRODUCTS.find(p => p.id === id) || null;
  }
}

export async function getCategories(): Promise<string[]> {
  const url = `${API_BASE_URL}/products/categories`;
  try {
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
    }
    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) {
        throw new Error('API returned empty or invalid categories');
    }
    return data;
  } catch (error) {
    console.warn('getCategories failed, using fallback:', error);
    return ["electronics", "jewelery", "men's clothing", "women's clothing"];
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const url = `${API_BASE_URL}/products/category/${category}`;
  try {
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
    }
    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) {
        throw new Error('API returned empty or invalid category data');
    }
    return data;
  } catch (error) {
    console.warn(`getProductsByCategory with category ${category} failed, using mock data:`, error);
    return MOCK_PRODUCTS.filter(p => p.category === category);
  }
}

