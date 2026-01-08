/**
 * Theme JavaScript - Vanilla JS for cart and interactive features
 * Converted from React state management to Shopify Ajax Cart API
 */

(function() {
  'use strict';

  // Cart functionality
  class Cart {
    constructor() {
      this.drawer = document.querySelector('[data-cart-drawer]');
      this.overlay = document.querySelector('[data-cart-overlay]');
      this.itemsContainer = document.querySelector('[data-cart-items]');
      this.emptyState = document.querySelector('[data-cart-empty]');
      this.footer = document.querySelector('[data-cart-footer]');
      this.totalElement = document.querySelector('[data-cart-total]');
      this.countElement = document.querySelector('[data-cart-count]');

      this.bindEvents();
      this.updateCart();
    }

    bindEvents() {
      // Open cart
      document.querySelectorAll('[data-cart-toggle]').forEach(btn => {
        btn.addEventListener('click', () => this.open());
      });

      // Close cart
      document.querySelectorAll('[data-cart-close]').forEach(btn => {
        btn.addEventListener('click', () => this.close());
      });

      // Close on overlay click
      if (this.overlay) {
        this.overlay.addEventListener('click', () => this.close());
      }

      // Add to cart forms
      document.querySelectorAll('[data-product-form]').forEach(form => {
        form.addEventListener('submit', (e) => this.handleAddToCart(e));
      });
    }

    open() {
      if (this.drawer && this.overlay) {
        this.drawer.style.display = 'flex';
        this.overlay.style.display = 'block';
        setTimeout(() => {
          this.drawer.classList.add('active');
        }, 10);
        document.body.style.overflow = 'hidden';
      }
    }

    close() {
      if (this.drawer && this.overlay) {
        this.drawer.classList.remove('active');
        setTimeout(() => {
          this.drawer.style.display = 'none';
          this.overlay.style.display = 'none';
        }, 300);
        document.body.style.overflow = '';
      }
    }

    async handleAddToCart(e) {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);

      try {
        const response = await fetch('/cart/add.js', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          await this.updateCart();
          this.open();
        } else {
          alert('Error adding to cart. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error adding to cart. Please try again.');
      }
    }

    async updateCart() {
      try {
        const response = await fetch('/cart.js');
        const cart = await response.json();

        this.renderCart(cart);
        this.updateCartCount(cart.item_count);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    }

    renderCart(cart) {
      if (!this.itemsContainer) return;

      if (cart.items.length === 0) {
        this.emptyState.style.display = 'flex';
        this.footer.style.display = 'none';
        this.itemsContainer.innerHTML = '';
        return;
      }

      this.emptyState.style.display = 'none';
      this.footer.style.display = 'block';

      this.itemsContainer.innerHTML = cart.items.map(item => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.title}" />
          <div class="cart-item-details">
            <h3>${item.product_title}</h3>
            ${item.variant_title ? `<p class="cart-item-meta">${item.variant_title}</p>` : ''}
            <p class="cart-item-price">${this.formatMoney(item.price)}</p>
            <div class="cart-item-quantity">
              <button
                onclick="cart.changeQuantity('${item.key}', ${item.quantity - 1})"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span>${item.quantity}</span>
              <button
                onclick="cart.changeQuantity('${item.key}', ${item.quantity + 1})"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>
          <button
            class="cart-item-remove"
            onclick="cart.removeItem('${item.key}')"
            aria-label="Remove item"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>
      `).join('');

      if (this.totalElement) {
        this.totalElement.textContent = this.formatMoney(cart.total_price);
      }
    }

    updateCartCount(count) {
      if (this.countElement) {
        this.countElement.textContent = count;
        this.countElement.style.display = count > 0 ? 'flex' : 'none';
      }
    }

    async changeQuantity(key, quantity) {
      if (quantity < 1) {
        return this.removeItem(key);
      }

      try {
        const response = await fetch('/cart/change.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: key,
            quantity: quantity
          })
        });

        if (response.ok) {
          await this.updateCart();
        }
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    }

    async removeItem(key) {
      try {
        const response = await fetch('/cart/change.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: key,
            quantity: 0
          })
        });

        if (response.ok) {
          await this.updateCart();
        }
      } catch (error) {
        console.error('Error removing item:', error);
      }
    }

    formatMoney(cents) {
      const dollars = (cents / 100).toFixed(2);
      return `$${dollars}`;
    }
  }

  // Product gallery functionality
  class ProductGallery {
    constructor() {
      this.mainImage = document.querySelector('[data-main-image]');
      this.thumbs = document.querySelectorAll('[data-gallery-thumb]');

      if (this.mainImage && this.thumbs.length > 0) {
        this.bindEvents();
      }
    }

    bindEvents() {
      this.thumbs.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
          const imageSrc = thumb.getAttribute('data-image-src');
          if (imageSrc && this.mainImage) {
            this.mainImage.src = imageSrc;
          }

          // Update active state
          this.thumbs.forEach(t => t.classList.remove('active'));
          thumb.classList.add('active');
        });
      });
    }
  }

  // Sidebar toggle for mobile
  class SidebarToggle {
    constructor() {
      this.sidebar = document.querySelector('[data-sidebar]');
      this.toggleBtn = document.querySelector('[data-filter-toggle]');
      this.closeBtn = document.querySelector('[data-sidebar-close]');

      if (this.sidebar && this.toggleBtn) {
        this.bindEvents();
      }
    }

    bindEvents() {
      this.toggleBtn.addEventListener('click', () => this.open());

      if (this.closeBtn) {
        this.closeBtn.addEventListener('click', () => this.close());
      }
    }

    open() {
      if (this.sidebar) {
        this.sidebar.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    }

    close() {
      if (this.sidebar) {
        this.sidebar.classList.remove('open');
        document.body.style.overflow = '';
      }
    }
  }

  // Initialize on DOM ready
  function init() {
    // Initialize cart
    window.cart = new Cart();

    // Initialize product gallery
    new ProductGallery();

    // Initialize sidebar toggle
    new SidebarToggle();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
