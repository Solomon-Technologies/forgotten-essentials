import { Product, Category } from '../types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Outerwear',
    slug: 'outerwear',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80'
  },
  {
    id: '2',
    name: 'Dresses',
    slug: 'dresses',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80'
  },
  {
    id: '3',
    name: 'Tops',
    slug: 'tops',
    image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&q=80'
  },
  {
    id: '4',
    name: 'Bottoms',
    slug: 'bottoms',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80'
  },
  {
    id: '5',
    name: 'Accessories',
    slug: 'accessories',
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80'
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Vintage Burberry Trench Coat',
    price: 485,
    originalPrice: 650,
    description: 'Classic Burberry trench coat from the 1980s. Features the iconic Nova check lining, cotton gabardine exterior, and signature double-breasted silhouette. A timeless investment piece in exceptional condition.',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80'
    ],
    category: 'outerwear',
    era: '1980s',
    size: 'M',
    condition: 'Excellent',
    brand: 'Burberry',
    measurements: {
      chest: '42"',
      length: '45"',
      shoulders: '18"',
      sleeves: '24"'
    },
    inStock: true
  },
  {
    id: '2',
    name: 'Silk Floral Midi Dress',
    price: 225,
    description: 'Stunning 1970s silk dress with hand-painted floral motif. Features a flattering A-line silhouette, delicate cap sleeves, and a romantic flowing skirt. Perfect for special occasions.',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80'
    ],
    category: 'dresses',
    era: '1970s',
    size: 'S',
    condition: 'Very Good',
    measurements: {
      chest: '34"',
      waist: '26"',
      length: '42"'
    },
    inStock: true
  },
  {
    id: '3',
    name: 'Leather Biker Jacket',
    price: 375,
    originalPrice: 450,
    description: 'Authentic 1990s black leather motorcycle jacket. Supple, broken-in leather with beautiful patina. Features asymmetric zip closure, multiple pockets, and quilted shoulders.',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
      'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=800&q=80'
    ],
    category: 'outerwear',
    era: '1990s',
    size: 'M',
    condition: 'Excellent',
    measurements: {
      chest: '40"',
      length: '24"',
      shoulders: '17"',
      sleeves: '25"'
    },
    inStock: true
  },
  {
    id: '4',
    name: 'Cashmere Cable Knit Sweater',
    price: 195,
    description: 'Luxurious 1990s Scottish cashmere sweater in cream. Features traditional cable knit pattern with ribbed cuffs and hem. Incredibly soft with no pilling.',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80'
    ],
    category: 'tops',
    era: '1990s',
    size: 'M',
    condition: 'Excellent',
    brand: 'Ballantyne',
    measurements: {
      chest: '44"',
      length: '26"',
      sleeves: '22"'
    },
    inStock: true
  },
  {
    id: '5',
    name: 'High-Waisted Levi\'s 501',
    price: 145,
    description: 'Iconic 1990s Levi\'s 501 jeans with the perfect vintage fade. High-waisted fit with straight leg. Classic American style that gets better with every wear.',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80'
    ],
    category: 'bottoms',
    era: '1990s',
    size: '28',
    condition: 'Very Good',
    brand: "Levi's",
    measurements: {
      waist: '28"',
      length: '32"'
    },
    inStock: true
  },
  {
    id: '6',
    name: 'Velvet Evening Gown',
    price: 425,
    description: 'Breathtaking 1960s emerald green velvet gown. Features elegant boat neckline, fitted bodice, and flowing floor-length skirt. A showstopper for black-tie events.',
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80'
    ],
    category: 'dresses',
    era: '1960s',
    size: 'S',
    condition: 'Excellent',
    measurements: {
      chest: '34"',
      waist: '25"',
      length: '58"'
    },
    inStock: true
  },
  {
    id: '7',
    name: 'Wool Plaid Blazer',
    price: 275,
    description: 'Distinguished 1980s Ralph Lauren wool blazer in classic plaid. Fully lined with notched lapels and horn buttons. Versatile piece for both casual and formal styling.',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80'
    ],
    category: 'outerwear',
    era: '1980s',
    size: 'L',
    condition: 'Very Good',
    brand: 'Ralph Lauren',
    measurements: {
      chest: '44"',
      length: '30"',
      shoulders: '19"',
      sleeves: '25"'
    },
    inStock: true
  },
  {
    id: '8',
    name: 'Silk Scarf - Hermès',
    price: 295,
    description: 'Elegant vintage Hermès silk scarf featuring the "Les Cavaliers d\'Or" design. Hand-rolled edges with vibrant colors that have maintained their brilliance.',
    images: [
      'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80'
    ],
    category: 'accessories',
    era: '1980s',
    size: 'One Size',
    condition: 'Excellent',
    brand: 'Hermès',
    inStock: true
  }
];
