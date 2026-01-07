export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  category: string;
  era: string;
  size: string;
  condition: 'Excellent' | 'Very Good' | 'Good';
  brand?: string;
  measurements?: {
    chest?: string;
    waist?: string;
    length?: string;
    shoulders?: string;
    sleeves?: string;
  };
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
}
