import { GraphQLClient } from 'graphql-request';

const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

// Check if credentials are valid (not placeholders)
const hasValidCredentials =
  domain &&
  storefrontAccessToken &&
  domain !== 'your-store.myshopify.com' &&
  storefrontAccessToken !== 'your-storefront-access-token-here';

// Create a placeholder client if env vars aren't set (for preview mode with mock data)
// When credentials are missing, the app will use mock data instead
export const shopifyClient = hasValidCredentials
  ? new GraphQLClient(
      `https://${domain}/api/2024-01/graphql.json`,
      {
        headers: {
          'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
          'Content-Type': 'application/json',
        },
      }
    )
  : new GraphQLClient('https://placeholder.myshopify.com/api/2024-01/graphql.json');

// GraphQL queries
export const GET_PRODUCTS = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          compareAtPriceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          tags
          productType
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_HANDLE = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      compareAtPriceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            availableForSale
            priceV2 {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
      tags
      productType
      metafields(identifiers: [
        {namespace: "custom", key: "era"},
        {namespace: "custom", key: "condition"},
        {namespace: "custom", key: "brand"},
        {namespace: "custom", key: "size"},
        {namespace: "custom", key: "measurements"}
      ]) {
        key
        value
        type
      }
    }
  }
`;

export const GET_COLLECTIONS = `
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            url
            altText
          }
        }
      }
    }
  }
`;

export const GET_PRODUCTS_BY_COLLECTION = `
  query GetProductsByCollection($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  availableForSale
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
            tags
            productType
          }
        }
      }
    }
  }
`;

export const CREATE_CART = `
  mutation CreateCart($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    images(first: 1) {
                      edges {
                        node {
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        estimatedCost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

export const ADD_TO_CART = `
  mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    images(first: 1) {
                      edges {
                        node {
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        estimatedCost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

export const UPDATE_CART_LINES = `
  mutation UpdateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 10) {
          edges {
            node {
              id
              quantity
            }
          }
        }
      }
    }
  }
`;

export const REMOVE_FROM_CART = `
  mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        lines(first: 10) {
          edges {
            node {
              id
              quantity
            }
          }
        }
      }
    }
  }
`;

export const GET_INSTAGRAM_POSTS = `
  query GetInstagramPosts($first: Int!) {
    metaobjects(type: "instagram_post", first: $first) {
      edges {
        node {
          id
          handle
          fields {
            key
            value
          }
        }
      }
    }
  }
`;

export const GET_HERO_CONTENT = `
  query GetHeroContent {
    metaobjects(type: "hero_section", first: 1) {
      edges {
        node {
          id
          handle
          fields {
            key
            value
          }
        }
      }
    }
  }
`;

export const GET_SITE_SETTINGS = `
  query GetSiteSettings {
    metaobjects(type: "site_settings", first: 1) {
      edges {
        node {
          id
          handle
          fields {
            key
            value
          }
        }
      }
    }
  }
`;

export const GET_HOME_SECTIONS = `
  query GetHomeSections {
    metaobjects(type: "home_sections", first: 1) {
      edges {
        node {
          id
          handle
          fields {
            key
            value
          }
        }
      }
    }
  }
`;

export const GET_VALUE_ITEMS = `
  query GetValueItems($first: Int!) {
    metaobjects(type: "value_item", first: $first) {
      edges {
        node {
          id
          handle
          fields {
            key
            value
          }
        }
      }
    }
  }
`;

export const GET_FOOTER_CONTENT = `
  query GetFooterContent {
    metaobjects(type: "footer_content", first: 1) {
      edges {
        node {
          id
          handle
          fields {
            key
            value
          }
        }
      }
    }
  }
`;

export const GET_ABOUT_PAGE = `
  query GetAboutPage {
    metaobjects(type: "about_page", first: 1) {
      edges {
        node {
          id
          handle
          fields {
            key
            value
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_DETAIL_SETTINGS = `
  query GetProductDetailSettings {
    metaobjects(type: "product_detail_settings", first: 1) {
      edges {
        node {
          id
          handle
          fields {
            key
            value
          }
        }
      }
    }
  }
`;
