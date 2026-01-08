import { useState, useEffect } from 'react';
import {
  shopifyClient,
  GET_PRODUCTS,
  GET_COLLECTIONS,
  GET_PRODUCTS_BY_COLLECTION,
  GET_INSTAGRAM_POSTS,
  GET_HERO_CONTENT,
  GET_SITE_SETTINGS,
  GET_HOME_SECTIONS,
  GET_VALUE_ITEMS,
  GET_FOOTER_CONTENT,
  GET_ABOUT_PAGE
} from '../lib/shopify';
import { Product, Category } from '../types';
import { mockProducts, mockCollections, mockFeaturedCollections } from '../data/mockData';

// Check if we should use mock data (when env vars are missing or have placeholder values)
// Also check localStorage setting for preview mode toggle
const shouldUseMockData = () => {
  const isInPreviewMode =
    !import.meta.env.VITE_SHOPIFY_STORE_DOMAIN ||
    !import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
    import.meta.env.VITE_SHOPIFY_STORE_DOMAIN === 'your-store.myshopify.com' ||
    import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN === 'your-storefront-access-token-here';

  if (!isInPreviewMode) return false; // If Shopify is configured, always use real data

  const saved = localStorage.getItem('showMockData');
  return saved !== null ? saved === 'true' : true; // Default to true
};

// Transform Shopify product data to match our existing type structure
function transformShopifyProduct(shopifyProduct: any): Product {
  const images = shopifyProduct.images.edges.map((edge: any) => edge.node.url);
  const variant = shopifyProduct.variants.edges[0]?.node;
  const price = parseFloat(shopifyProduct.priceRange.minVariantPrice.amount);
  const compareAtPrice = shopifyProduct.compareAtPriceRange?.minVariantPrice?.amount;
  const originalPrice = compareAtPrice ? parseFloat(compareAtPrice) : undefined;

  // Extract size from variant options
  const sizeOption = variant?.selectedOptions?.find((opt: any) => opt.name === 'Size');

  return {
    id: shopifyProduct.id.split('/').pop() || shopifyProduct.id,
    name: shopifyProduct.title,
    price,
    originalPrice,
    description: shopifyProduct.description,
    images,
    category: shopifyProduct.productType.toLowerCase() || 'uncategorized',
    era: shopifyProduct.tags.find((tag: string) => tag.includes('90s') || tag.includes('80s')) || 'Vintage',
    size: sizeOption?.value || 'N/A',
    condition: shopifyProduct.tags.find((tag: string) =>
      ['Good', 'Excellent', 'Fair', 'Like New'].includes(tag)
    ) || 'Good',
    brand: shopifyProduct.tags.find((tag: string) => tag.startsWith('Brand:'))?.replace('Brand:', '').trim(),
    inStock: variant?.availableForSale || false,
  };
}

// Transform Shopify collection data to match our Category type
function transformShopifyCollection(shopifyCollection: any): Category {
  return {
    id: shopifyCollection.id.split('/').pop() || shopifyCollection.id,
    name: shopifyCollection.title,
    slug: shopifyCollection.handle,
    image: shopifyCollection.image?.url || '',
  };
}

export function useProducts(limit: number = 50) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      // Use mock data if Shopify credentials aren't configured
      if (shouldUseMockData()) {
        setLoading(true);
        setTimeout(() => {
          setProducts(mockProducts.slice(0, limit));
          setLoading(false);
        }, 500); // Simulate loading
        return;
      }

      try {
        setLoading(true);
        const data: any = await shopifyClient.request(GET_PRODUCTS, { first: limit });
        const transformedProducts = data.products.edges.map((edge: any) =>
          transformShopifyProduct(edge.node)
        );
        setProducts(transformedProducts);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch products'));
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [limit]);

  return { products, loading, error };
}

export function useCollections(limit: number = 10) {
  const [collections, setCollections] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCollections() {
      // Use mock data if Shopify credentials aren't configured
      if (shouldUseMockData()) {
        setLoading(true);
        setTimeout(() => {
          setCollections(mockCollections.slice(0, limit));
          setLoading(false);
        }, 500); // Simulate loading
        return;
      }

      try {
        setLoading(true);
        const data: any = await shopifyClient.request(GET_COLLECTIONS, { first: limit });
        const transformedCollections = data.collections.edges.map((edge: any) =>
          transformShopifyCollection(edge.node)
        );
        setCollections(transformedCollections);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch collections'));
        console.error('Error fetching collections:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCollections();
  }, [limit]);

  return { collections, loading, error };
}

export function useProductsByCollection(collectionHandle: string | null, limit: number = 50) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProductsByCollection() {
      // Use mock data if Shopify credentials aren't configured
      if (shouldUseMockData()) {
        setLoading(true);
        setTimeout(() => {
          if (!collectionHandle) {
            setProducts(mockProducts.slice(0, limit));
          } else {
            const filtered = mockProducts.filter(p => p.category === collectionHandle);
            setProducts(filtered.slice(0, limit));
          }
          setLoading(false);
        }, 500); // Simulate loading
        return;
      }

      if (!collectionHandle) {
        // If no collection specified, fetch all products
        try {
          setLoading(true);
          const data: any = await shopifyClient.request(GET_PRODUCTS, { first: limit });
          const transformedProducts = data.products.edges.map((edge: any) =>
            transformShopifyProduct(edge.node)
          );
          setProducts(transformedProducts);
          setError(null);
        } catch (err) {
          setError(err instanceof Error ? err : new Error('Failed to fetch products'));
          console.error('Error fetching products:', err);
        } finally {
          setLoading(false);
        }
        return;
      }

      try {
        setLoading(true);
        const data: any = await shopifyClient.request(GET_PRODUCTS_BY_COLLECTION, {
          handle: collectionHandle,
          first: limit,
        });

        if (data.collection?.products) {
          const transformedProducts = data.collection.products.edges.map((edge: any) =>
            transformShopifyProduct(edge.node)
          );
          setProducts(transformedProducts);
        } else {
          setProducts([]);
        }
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch collection products'));
        console.error('Error fetching collection products:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProductsByCollection();
  }, [collectionHandle, limit]);

  return { products, loading, error };
}

// Hook for featured/themed collections (excludes basic categories like Jackets, Shirts, etc.)
export function useFeaturedCollections(limit: number = 10) {
  const [collections, setCollections] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchFeaturedCollections() {
      // Use mock featured collections if Shopify credentials aren't configured
      if (shouldUseMockData()) {
        setLoading(true);
        setTimeout(() => {
          setCollections(mockFeaturedCollections.slice(0, limit));
          setLoading(false);
        }, 500); // Simulate loading
        return;
      }

      // For real Shopify data, we would need to filter collections by tags or use a specific metafield
      // For now, fetch all and filter by excluding basic categories
      try {
        setLoading(true);
        const data: any = await shopifyClient.request(GET_COLLECTIONS, { first: limit });
        const allCollections = data.collections.edges.map((edge: any) =>
          transformShopifyCollection(edge.node)
        );

        // Filter out basic categories (would be better to use Shopify tags in production)
        const basicCategorySlugs = ['jackets', 'shirts', 'tees', 'pants', 'accessories'];
        const featured = allCollections.filter(
          (col: Category) => !basicCategorySlugs.includes(col.slug)
        );

        setCollections(featured);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch featured collections'));
        console.error('Error fetching featured collections:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedCollections();
  }, [limit]);

  return { collections, loading, error };
}

// Instagram Post type
export interface InstagramPost {
  id: string;
  image: string;
  link: string;
  caption?: string;
  order?: number;
}

// Hook for Instagram posts from Shopify metaobjects
export function useInstagramPosts(limit: number = 10) {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchInstagramPosts() {
      // Use mock data if Shopify credentials aren't configured
      if (shouldUseMockData()) {
        setLoading(true);
        // Import mock Instagram posts
        const { mockInstagramPosts } = await import('../data/mockData');
        setTimeout(() => {
          setPosts(mockInstagramPosts.slice(0, limit));
          setLoading(false);
        }, 500);
        return;
      }

      try {
        setLoading(true);
        const data: any = await shopifyClient.request(GET_INSTAGRAM_POSTS, { first: limit });

        const transformedPosts: InstagramPost[] = data.metaobjects.edges.map((edge: any) => {
          const fields = edge.node.fields.reduce((acc: any, field: any) => {
            acc[field.key] = field.value;
            return acc;
          }, {});

          return {
            id: edge.node.id,
            image: fields.image || '',
            link: fields.link || '',
            caption: fields.caption || '',
            order: parseInt(fields.order || '0', 10),
          };
        });

        // Sort by order field
        transformedPosts.sort((a, b) => (a.order || 0) - (b.order || 0));

        setPosts(transformedPosts);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch Instagram posts'));
        console.error('Error fetching Instagram posts:', err);
        // Fallback to mock data on error
        const { mockInstagramPosts } = await import('../data/mockData');
        setPosts(mockInstagramPosts.slice(0, limit));
      } finally {
        setLoading(false);
      }
    }

    fetchInstagramPosts();
  }, [limit]);

  return { posts, loading, error };
}

// Hero Content type
export interface HeroContent {
  id: string;
  image: string;
  title: string;
  description: string;
  label?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

// Hook for hero section content from Shopify metaobjects
export function useHeroContent() {
  const [hero, setHero] = useState<HeroContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchHeroContent() {
      // Use mock data if Shopify credentials aren't configured
      if (shouldUseMockData()) {
        setLoading(true);
        // Import mock hero content
        const { mockHeroContent } = await import('../data/mockData');
        setTimeout(() => {
          setHero(mockHeroContent);
          setLoading(false);
        }, 500);
        return;
      }

      try {
        setLoading(true);
        const data: any = await shopifyClient.request(GET_HERO_CONTENT);

        if (data.metaobjects.edges.length === 0) {
          // No hero content found, use fallback
          const { mockHeroContent } = await import('../data/mockData');
          setHero(mockHeroContent);
          setLoading(false);
          return;
        }

        const heroNode = data.metaobjects.edges[0].node;
        const fields = heroNode.fields.reduce((acc: any, field: any) => {
          acc[field.key] = field.value;
          return acc;
        }, {});

        const transformedHero: HeroContent = {
          id: heroNode.id,
          image: fields.image || '',
          title: fields.title || 'Shop by Style',
          description: fields.description || '',
          label: fields.label || 'New Arrivals',
          primaryButtonText: fields.primary_button_text || 'Shop Now',
          primaryButtonLink: fields.primary_button_link || '/shop',
          secondaryButtonText: fields.secondary_button_text || 'Collections',
          secondaryButtonLink: fields.secondary_button_link || '/collections',
        };

        setHero(transformedHero);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch hero content'));
        console.error('Error fetching hero content:', err);
        // Fallback to mock data on error
        const { mockHeroContent } = await import('../data/mockData');
        setHero(mockHeroContent);
      } finally {
        setLoading(false);
      }
    }

    fetchHeroContent();
  }, []);

  return { hero, loading, error };
}

// Site Settings type
export interface SiteSettings {
  id: string;
  brandName: string;
  brandDescription: string;
  instagramUrl: string;
  facebookUrl: string;
  tiktokUrl: string;
  instagramHandle: string;
}

// Hook for site settings
export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchSiteSettings() {
      if (shouldUseMockData()) {
        setLoading(true);
        const { mockSiteSettings } = await import('../data/mockData');
        setTimeout(() => {
          setSettings(mockSiteSettings);
          setLoading(false);
        }, 500);
        return;
      }

      try {
        setLoading(true);
        const data: any = await shopifyClient.request(GET_SITE_SETTINGS);

        if (data.metaobjects.edges.length === 0) {
          const { mockSiteSettings } = await import('../data/mockData');
          setSettings(mockSiteSettings);
          setLoading(false);
          return;
        }

        const settingsNode = data.metaobjects.edges[0].node;
        const fields = settingsNode.fields.reduce((acc: any, field: any) => {
          acc[field.key] = field.value;
          return acc;
        }, {});

        setSettings({
          id: settingsNode.id,
          brandName: fields.brand_name || 'FORGOTTEN ESSENTIALS',
          brandDescription: fields.brand_description || 'Thoughtfully sourced vintage and pre-loved clothing for the conscious consumer.',
          instagramUrl: fields.instagram_url || 'https://instagram.com/forgottenessentials',
          facebookUrl: fields.facebook_url || 'https://facebook.com/forgottenessentials',
          tiktokUrl: fields.tiktok_url || 'https://tiktok.com/@forgottenessentials',
          instagramHandle: fields.instagram_handle || '@forgottenessentials',
        });
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch site settings'));
        const { mockSiteSettings } = await import('../data/mockData');
        setSettings(mockSiteSettings);
      } finally {
        setLoading(false);
      }
    }

    fetchSiteSettings();
  }, []);

  return { settings, loading, error };
}

// Home Sections type
export interface HomeSections {
  id: string;
  categoriesHeading: string;
  featuredHeading: string;
  featuredLinkText: string;
  newArrivalsHeading: string;
  newArrivalsLinkText: string;
}

// Hook for home page section headings
export function useHomeSections() {
  const [sections, setSections] = useState<HomeSections | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchHomeSections() {
      if (shouldUseMockData()) {
        setLoading(true);
        const { mockHomeSections } = await import('../data/mockData');
        setTimeout(() => {
          setSections(mockHomeSections);
          setLoading(false);
        }, 500);
        return;
      }

      try {
        setLoading(true);
        const data: any = await shopifyClient.request(GET_HOME_SECTIONS);

        if (data.metaobjects.edges.length === 0) {
          const { mockHomeSections } = await import('../data/mockData');
          setSections(mockHomeSections);
          setLoading(false);
          return;
        }

        const sectionsNode = data.metaobjects.edges[0].node;
        const fields = sectionsNode.fields.reduce((acc: any, field: any) => {
          acc[field.key] = field.value;
          return acc;
        }, {});

        setSections({
          id: sectionsNode.id,
          categoriesHeading: fields.categories_heading || 'Shop by Category',
          featuredHeading: fields.featured_heading || 'Featured Pieces',
          featuredLinkText: fields.featured_link_text || 'View All',
          newArrivalsHeading: fields.new_arrivals_heading || 'New Arrivals',
          newArrivalsLinkText: fields.new_arrivals_link_text || 'View All',
        });
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch home sections'));
        const { mockHomeSections } = await import('../data/mockData');
        setSections(mockHomeSections);
      } finally {
        setLoading(false);
      }
    }

    fetchHomeSections();
  }, []);

  return { sections, loading, error };
}

// Value Item type
export interface ValueItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  order: number;
}

// Hook for value items (the 4 boxes on homepage)
export function useValueItems(limit: number = 10) {
  const [items, setItems] = useState<ValueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchValueItems() {
      if (shouldUseMockData()) {
        setLoading(true);
        const { mockValueItems } = await import('../data/mockData');
        setTimeout(() => {
          setItems(mockValueItems.slice(0, limit));
          setLoading(false);
        }, 500);
        return;
      }

      try {
        setLoading(true);
        const data: any = await shopifyClient.request(GET_VALUE_ITEMS, { first: limit });

        const transformedItems: ValueItem[] = data.metaobjects.edges.map((edge: any) => {
          const fields = edge.node.fields.reduce((acc: any, field: any) => {
            acc[field.key] = field.value;
            return acc;
          }, {});

          return {
            id: edge.node.id,
            icon: fields.icon || 'shield',
            title: fields.title || '',
            description: fields.description || '',
            order: parseInt(fields.order || '0', 10),
          };
        });

        transformedItems.sort((a, b) => a.order - b.order);
        setItems(transformedItems);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch value items'));
        const { mockValueItems } = await import('../data/mockData');
        setItems(mockValueItems.slice(0, limit));
      } finally {
        setLoading(false);
      }
    }

    fetchValueItems();
  }, [limit]);

  return { items, loading, error };
}
