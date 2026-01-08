import { useState, useEffect } from 'react';
import { shopifyClient, GET_PRODUCTS, GET_COLLECTIONS, GET_PRODUCTS_BY_COLLECTION } from '../lib/shopify';
import { Product, Category } from '../types';
import { mockProducts, mockCollections } from '../data/mockData';

// Check if we should use mock data (when env vars are missing)
const useMockData = !import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || !import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

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
      if (useMockData) {
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
      if (useMockData) {
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
      if (useMockData) {
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
