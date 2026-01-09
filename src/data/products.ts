import { Product, Category } from '../types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Jackets',
    slug: 'jackets',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80'
  },
  {
    id: '2',
    name: 'Shirts',
    slug: 'shirts',
    image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&q=80'
  },
  {
    id: '3',
    name: 'Tees',
    slug: 'tees',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80'
  },
  {
    id: '4',
    name: 'Pants',
    slug: 'pants',
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
    name: 'Carhartt Work Jacket',
    slug: 'carhartt-work-jacket',
    price: 65,
    originalPrice: 85,
    description: 'Worn-in Carhartt work jacket from the 1990s. Heavy canvas with faded brown color and authentic workwear patina. Zip front with button closures and multiple pockets.',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80'
    ],
    category: 'jackets',
    era: '1990s',
    size: 'L',
    condition: 'Good',
    brand: 'Carhartt',
    measurements: {
      chest: '46"',
      length: '28"',
      shoulders: '20"',
      sleeves: '24"'
    },
    inStock: true
  },
  {
    id: '2',
    name: 'Vintage Band Tee - Nirvana',
    slug: 'vintage-band-tee-nirvana',
    price: 45,
    description: '1990s Nirvana tour tee with faded black print. Soft, worn-in cotton with authentic vintage fade and cracking on the graphic. Single stitch construction.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80'
    ],
    category: 'tees',
    era: '1990s',
    size: 'L',
    condition: 'Good',
    measurements: {
      chest: '42"',
      length: '28"'
    },
    inStock: true
  },
  {
    id: '3',
    name: 'Leather Biker Jacket',
    slug: 'leather-biker-jacket',
    price: 125,
    originalPrice: 165,
    description: 'Worn 1990s black leather motorcycle jacket. Broken-in leather with natural patina. Asymmetric zip, multiple pockets. Some scuffs add character.',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
      'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=800&q=80'
    ],
    category: 'jackets',
    era: '1990s',
    size: 'M',
    condition: 'Good',
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
    name: 'Flannel Shirt - Red Plaid',
    slug: 'flannel-shirt-red-plaid',
    price: 32,
    description: '1990s thick cotton flannel in red and black plaid. Button-down with chest pockets. Soft and broken-in, perfect layering piece.',
    image: 'https://images.unsplash.com/photo-1525450824786-227cbef70703?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1525450824786-227cbef70703?w=800&q=80',
      'https://images.unsplash.com/photo-1598032895397-b9c37ef1b95c?w=800&q=80'
    ],
    category: 'shirts',
    era: '1990s',
    size: 'L',
    condition: 'Good',
    measurements: {
      chest: '44"',
      length: '30"',
      sleeves: '24"'
    },
    inStock: true
  },
  {
    id: '5',
    name: 'Levi\'s 501 Jeans',
    slug: 'levis-501-jeans',
    price: 48,
    description: '1990s Levi\'s 501 jeans with vintage fade. Straight leg fit. Authentic worn-in look.',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80'
    ],
    category: 'pants',
    era: '1990s',
    size: '32',
    condition: 'Good',
    brand: "Levi's",
    measurements: {
      waist: '32"',
      length: '32"'
    },
    inStock: true
  },
  {
    id: '6',
    name: 'Champion Reverse Weave Hoodie',
    slug: 'champion-reverse-weave-hoodie',
    price: 58,
    description: '1990s Champion reverse weave hoodie in faded grey. Heavy cotton construction with iconic side panels. Drawstring hood and kangaroo pocket.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80',
      'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=800&q=80'
    ],
    category: 'shirts',
    era: '1990s',
    size: 'XL',
    condition: 'Good',
    brand: 'Champion',
    measurements: {
      chest: '48"',
      length: '28"'
    },
    inStock: true
  },
  {
    id: '7',
    name: 'Dickies Work Pants',
    slug: 'dickies-work-pants',
    price: 38,
    description: '1990s Dickies work pants in tan. Durable twill cotton with straight leg fit. Belt loops and multiple pockets. Classic workwear staple.',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80'
    ],
    category: 'pants',
    era: '1990s',
    size: '34',
    condition: 'Good',
    brand: 'Dickies',
    measurements: {
      waist: '34"',
      length: '32"'
    },
    inStock: true
  },
  {
    id: '8',
    name: 'Vintage Snapback Cap',
    slug: 'vintage-snapback-cap',
    price: 28,
    description: '1990s snapback hat with faded logo. Adjustable plastic snap closure. Curved brim with some wear. Authentic vintage headwear.',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80',
      'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=800&q=80'
    ],
    category: 'accessories',
    era: '1990s',
    size: 'One Size',
    condition: 'Good',
    inStock: true
  }
];
