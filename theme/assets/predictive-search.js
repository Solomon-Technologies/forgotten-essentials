/**
 * Predictive Search - Forgotten Essentials Theme
 * Provides live search results using Shopify's Predictive Search API
 */

class PredictiveSearch {
  constructor() {
    this.searchButton = document.querySelector('[data-search-toggle]');
    this.overlay = null;
    this.input = null;
    this.resultsContainer = null;
    this.abortController = null;
    this.debounceTimer = null;

    if (this.searchButton) {
      this.createOverlay();
      this.bindEvents();
    }
  }

  createOverlay() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'predictive-search-overlay';
    this.overlay.innerHTML = `
      <div class="predictive-search-modal">
        <div class="predictive-search-header">
          <form action="/search" method="get" class="predictive-search-form" role="search">
            <input type="hidden" name="type" value="product">
            <input
              type="search"
              name="q"
              class="predictive-search-input"
              placeholder="Search products..."
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
              aria-label="Search"
            >
          </form>
          <button class="predictive-search-close" aria-label="Close search">&times;</button>
        </div>
        <div class="predictive-search-results"></div>
      </div>
    `;
    document.body.appendChild(this.overlay);

    this.input = this.overlay.querySelector('.predictive-search-input');
    this.resultsContainer = this.overlay.querySelector('.predictive-search-results');
  }

  bindEvents() {
    this.searchButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.open();
    });

    this.overlay.querySelector('.predictive-search-close').addEventListener('click', () => {
      this.close();
    });

    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });

    this.input.addEventListener('input', () => {
      this.debounce(() => this.search(this.input.value.trim()), 300);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.overlay.classList.contains('open')) {
        this.close();
      }
    });
  }

  open() {
    this.overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => this.input.focus(), 100);
  }

  close() {
    this.overlay.classList.remove('open');
    document.body.style.overflow = '';
    this.input.value = '';
    this.resultsContainer.innerHTML = '';
  }

  debounce(fn, delay) {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(fn, delay);
  }

  async search(query) {
    if (this.abortController) {
      this.abortController.abort();
    }

    if (!query || query.length < 2) {
      this.resultsContainer.innerHTML = '';
      return;
    }

    this.abortController = new AbortController();
    this.resultsContainer.innerHTML = '<div class="predictive-search-loading">Searching...</div>';

    try {
      const response = await fetch(
        `${window.routes.predictive_search_url}?q=${encodeURIComponent(query)}&resources[type]=product&resources[limit]=6&section_id=predictive-search`,
        { signal: this.abortController.signal }
      );

      if (!response.ok) throw new Error('Search failed');

      const text = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      const shopifySection = doc.querySelector('#shopify-section-predictive-search');

      if (shopifySection) {
        this.resultsContainer.innerHTML = shopifySection.innerHTML;
      } else {
        this.renderFallbackResults(query);
      }
    } catch (error) {
      if (error.name === 'AbortError') return;
      this.renderFallbackResults(query);
    }
  }

  async renderFallbackResults(query) {
    try {
      const response = await fetch(
        `${window.routes.predictive_search_url}?q=${encodeURIComponent(query)}&resources[type]=product&resources[limit]=6`,
        { headers: { Accept: 'application/json' } }
      );

      if (!response.ok) throw new Error('Search failed');

      const data = await response.json();
      const products = data.resources?.results?.products || [];

      if (products.length === 0) {
        this.resultsContainer.innerHTML = `
          <div class="predictive-search-empty">
            <p>No results for "${this.escapeHtml(query)}"</p>
          </div>
        `;
        return;
      }

      const html = products.map(product => `
        <a href="${product.url}" class="predictive-search-item">
          ${product.image ? `<img src="${product.image}" alt="${this.escapeHtml(product.title)}" width="60" height="75" loading="lazy">` : '<div class="predictive-search-placeholder"></div>'}
          <div class="predictive-search-item-info">
            <span class="predictive-search-item-title">${this.escapeHtml(product.title)}</span>
            <span class="predictive-search-item-price">${product.price}</span>
          </div>
        </a>
      `).join('');

      this.resultsContainer.innerHTML = `
        <div class="predictive-search-products">${html}</div>
        <a href="/search?q=${encodeURIComponent(query)}&type=product" class="predictive-search-view-all">
          View all results
        </a>
      `;
    } catch {
      this.resultsContainer.innerHTML = `
        <div class="predictive-search-empty">
          <a href="/search?q=${encodeURIComponent(query)}" class="predictive-search-view-all">
            Search for "${this.escapeHtml(query)}"
          </a>
        </div>
      `;
    }
  }

  escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}

/* Inject predictive search styles */
const style = document.createElement('style');
style.textContent = `
  .predictive-search-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 9999;
    align-items: flex-start;
    justify-content: center;
    padding-top: 10vh;
  }
  .predictive-search-overlay.open {
    display: flex;
  }
  .predictive-search-modal {
    background: var(--color-bg, #fff);
    width: 90%;
    max-width: 600px;
    max-height: 70vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    border: 2px solid var(--color-text, #000);
  }
  .predictive-search-header {
    display: flex;
    align-items: center;
    border-bottom: 2px solid var(--color-border, #e5e5e5);
  }
  .predictive-search-form {
    flex: 1;
  }
  .predictive-search-input {
    width: 100%;
    padding: 1.25rem 1.5rem;
    border: none;
    font-size: 1rem;
    font-family: inherit;
    outline: none;
    background: transparent;
  }
  .predictive-search-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    padding: 1rem 1.25rem;
    cursor: pointer;
    color: var(--color-text, #000);
    line-height: 1;
  }
  .predictive-search-results {
    overflow-y: auto;
    padding: 0;
  }
  .predictive-search-loading,
  .predictive-search-empty {
    padding: 2rem;
    text-align: center;
    font-size: 0.875rem;
    color: var(--color-muted, #666);
  }
  .predictive-search-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 1.5rem;
    text-decoration: none;
    color: var(--color-text, #000);
    border-bottom: 1px solid var(--color-border, #e5e5e5);
    transition: background 0.15s;
  }
  .predictive-search-item:hover {
    background: rgba(0, 0, 0, 0.03);
  }
  .predictive-search-item img {
    width: 60px;
    height: 75px;
    object-fit: cover;
    flex-shrink: 0;
  }
  .predictive-search-placeholder {
    width: 60px;
    height: 75px;
    background: #f0f0f0;
    flex-shrink: 0;
  }
  .predictive-search-item-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  .predictive-search-item-title {
    font-size: 0.875rem;
    font-weight: 500;
  }
  .predictive-search-item-price {
    font-size: 0.8rem;
    color: var(--color-muted, #666);
  }
  .predictive-search-view-all {
    display: block;
    text-align: center;
    padding: 1rem;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text, #000);
    text-decoration: none;
    border-top: 1px solid var(--color-border, #e5e5e5);
  }
  .predictive-search-view-all:hover {
    text-decoration: underline;
  }
`;
document.head.appendChild(style);

/* Initialize */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new PredictiveSearch());
} else {
  new PredictiveSearch();
}
