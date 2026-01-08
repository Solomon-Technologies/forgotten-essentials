export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  images: string[];
  category: string;
  era?: string;
  size?: string;
  condition?: string;
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
  description?: string;
}

export interface Collection extends Category {
  // Collection is the same as Category for now
}
