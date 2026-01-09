import { Product } from '../types';

/**
 * Search products by keyword(s)
 * Matches against: name, description, brand, category, era
 * Supports partial matches and is case-insensitive
 */
export function searchProducts(products: Product[], query: string): Product[] {
  if (!query || query.trim() === '') {
    return [];
  }

  const searchTerms = query.toLowerCase().trim().split(/\s+/);

  return products.filter(product => {
    // Build searchable text from all relevant fields
    const searchableText = [
      product.name,
      product.description,
      product.brand,
      product.category,
      product.era,
      product.size,
      product.condition
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    // Check if ALL search terms match (AND logic)
    // This allows "Pistons Jersey" to match products with both words
    return searchTerms.every(term => searchableText.includes(term));
  });
}

/**
 * Highlight matching text in a string
 * Returns the string with matching parts wrapped in <mark> tags
 */
export function highlightMatches(text: string, query: string): string {
  if (!query || query.trim() === '') {
    return text;
  }

  const searchTerms = query.toLowerCase().trim().split(/\s+/);
  let result = text;

  searchTerms.forEach(term => {
    if (term.length > 0) {
      const regex = new RegExp(`(${escapeRegExp(term)})`, 'gi');
      result = result.replace(regex, '<mark>$1</mark>');
    }
  });

  return result;
}

/**
 * Escape special regex characters
 */
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Score a product based on how well it matches the query
 * Higher scores = better matches (exact name match > partial match > description match)
 */
export function scoreProduct(product: Product, query: string): number {
  if (!query || query.trim() === '') {
    return 0;
  }

  const searchTerms = query.toLowerCase().trim().split(/\s+/);
  let score = 0;

  searchTerms.forEach(term => {
    // Exact name match (highest priority)
    if (product.name.toLowerCase() === term) {
      score += 100;
    }
    // Name contains term
    else if (product.name.toLowerCase().includes(term)) {
      score += 50;
    }
    // Brand match
    if (product.brand?.toLowerCase().includes(term)) {
      score += 40;
    }
    // Category match
    if (product.category.toLowerCase().includes(term)) {
      score += 30;
    }
    // Era match
    if (product.era?.toLowerCase().includes(term)) {
      score += 20;
    }
    // Description match (lowest priority)
    if (product.description.toLowerCase().includes(term)) {
      score += 10;
    }
  });

  return score;
}

/**
 * Search and sort products by relevance
 */
export function searchProductsWithRelevance(products: Product[], query: string): Product[] {
  const matches = searchProducts(products, query);

  // Sort by relevance score (highest first)
  return matches.sort((a, b) => {
    const scoreA = scoreProduct(a, query);
    const scoreB = scoreProduct(b, query);
    return scoreB - scoreA;
  });
}
