# CLEANREP CONVERSION PROCESS

**Source**: Noah's forgotten-essentials conversion (React → Shopify Liquid)
**Reference**: `.codex/RAW-IMPORTS/forgotten-essentials/root/`

---

## CONVERSION OVERVIEW

This document details the **proven process** for converting React/Vite applications into Shopify Liquid themes, based on Noah's successful conversion of the Forgotten Essentials vintage clothing store.

**Core Principle**: Preserve design aesthetic exactly while migrating from React framework to Shopify-native Liquid + vanilla JavaScript.

---

## PHASE 1: REACT APP ANALYSIS

### 1.1 Identify Component Hierarchy

```bash
# Map React component tree
tree src/components/
tree src/pages/

# Output example:
# src/
# ├── components/
# │   ├── Header.tsx        → sections/header.liquid
# │   ├── Footer.tsx        → sections/footer.liquid
# │   ├── ProductCard.tsx   → snippets/product-card.liquid
# │   └── CartDrawer.tsx    → snippets/cart-drawer.liquid
# └── pages/
#     ├── Home.tsx          → templates/index.liquid
#     ├── Shop.tsx          → templates/collection.liquid
#     └── ProductDetail.tsx → templates/product.liquid
```

### 1.2 Analyze Styling Approach

```bash
# Check for CSS approach
grep -r "styled-components\|@emotion\|css-in-js" package.json
grep -r "\.module\.css" src/
cat src/App.css  # Check global styles

# Identify CSS variables
grep -r "--color\|--font\|--spacing" src/
```

### 1.3 Identify State Management

```bash
# Check React patterns to convert
grep -r "useState\|useEffect\|useContext" src/
grep -r "createContext\|useReducer" src/

# Common patterns to convert:
# - useState → Vanilla JS class properties
# - useEffect → DOMContentLoaded listeners
# - useContext (Cart) → Shopify Ajax Cart API
# - useRef → document.querySelector
```

### 1.4 Extract Design Specifications

Document the design system:
- **Typography**: Font families, weights, sizes
- **Colors**: Primary, secondary, accent, backgrounds
- **Spacing**: Padding/margin patterns
- **Borders**: Width, radius, style
- **Breakpoints**: Mobile, tablet, desktop thresholds

**Example from forgotten-essentials:**
```
Typography: Arial, 700 weight for bold
Colors: #000000 (text), #ffffff (bg), #d20000 (accent), #f5f5f5 (cream)
Borders: 2px solid black everywhere
Border Radius: 0px (sharp corners)
Breakpoints: <768px (mobile), 768-1024px (tablet), >1024px (desktop)
```

---

## PHASE 2: THEME STRUCTURE SETUP

### 2.1 Create Theme Directory Structure

```bash
mkdir -p theme/{assets,config,layout,locales,sections,snippets,templates/customers}
```

**Required structure:**
```
theme/
├── assets/           # CSS, JS, images
├── config/           # REQUIRED: settings_schema.json, settings_data.json
├── layout/           # REQUIRED: theme.liquid
├── locales/          # REQUIRED: en.default.json
├── sections/         # Reusable sections with settings
├── snippets/         # Small reusable components
└── templates/        # Page templates
    └── customers/    # Customer account templates
```

### 2.2 Create Required Configuration Files

#### config/settings_schema.json

Defines theme customization UI in Shopify admin.

**Minimum structure:**
```json
[
  {
    "name": "theme_info",
    "theme_name": "Your Theme Name",
    "theme_version": "1.0.0",
    "theme_author": "Your Name",
    "theme_documentation_url": "https://...",
    "theme_support_url": "https://..."
  },
  {
    "name": "Colors",
    "settings": [
      {
        "type": "color",
        "id": "color_text",
        "label": "Text Color",
        "default": "#000000"
      },
      {
        "type": "color",
        "id": "color_background",
        "label": "Background Color",
        "default": "#ffffff"
      },
      {
        "type": "color",
        "id": "color_accent",
        "label": "Accent Color",
        "default": "#d20000"
      }
    ]
  },
  {
    "name": "Typography",
    "settings": [
      {
        "type": "font_picker",
        "id": "font_body",
        "label": "Body Font",
        "default": "assistant_n4"
      }
    ]
  },
  {
    "name": "Layout",
    "settings": [
      {
        "type": "range",
        "id": "border_width",
        "label": "Border Width",
        "min": 0,
        "max": 10,
        "step": 1,
        "unit": "px",
        "default": 2
      },
      {
        "type": "range",
        "id": "border_radius",
        "label": "Border Radius",
        "min": 0,
        "max": 20,
        "step": 1,
        "unit": "px",
        "default": 0
      }
    ]
  }
]
```

#### config/settings_data.json

Contains default theme setting values.

```json
{
  "current": {
    "color_text": "#000000",
    "color_background": "#ffffff",
    "color_accent": "#d20000",
    "border_width": 2,
    "border_radius": 0
  }
}
```

#### locales/en.default.json

Translation strings for theme text.

```json
{
  "general": {
    "accessibility": {
      "skip_to_content": "Skip to content"
    }
  },
  "products": {
    "product": {
      "add_to_cart": "Add to Cart",
      "sold_out": "Sold Out"
    }
  },
  "cart": {
    "general": {
      "title": "Cart",
      "continue_shopping": "Continue Shopping"
    }
  }
}
```

### 2.3 Create Main Layout File

#### layout/theme.liquid

Main wrapper for all pages.

```liquid
<!DOCTYPE html>
<html lang="{{ shop.locale }}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ page_title }}{% if current_tags %} &ndash; {{ 'general.meta.tags' | t: tags: current_tags.join(', ') }}{% endif %}{% if current_page != 1 %} &ndash; {{ 'general.meta.page' | t: page: current_page }}{% endif %}{% unless page_title contains shop.name %} &ndash; {{ shop.name }}{% endunless %}</title>

  {% if page_description %}
    <meta name="description" content="{{ page_description | escape }}">
  {% endif %}

  <link rel="canonical" href="{{ canonical_url }}">

  {{ 'base.css' | asset_url | stylesheet_tag }}
  {{ 'theme.css' | asset_url | stylesheet_tag }}

  {{ content_for_header }}

  <style>
    :root {
      --color-text: {{ settings.color_text }};
      --color-background: {{ settings.color_background }};
      --color-accent: {{ settings.color_accent }};
      --border-width: {{ settings.border_width }}px;
      --border-radius: {{ settings.border_radius }}px;
    }
  </style>
</head>
<body>
  {% sections 'header-group' %}

  <main id="main-content">
    {{ content_for_layout }}
  </main>

  {% sections 'footer-group' %}

  <script src="{{ 'theme.js' | asset_url }}" defer></script>
</body>
</html>
```

---

## PHASE 3: COMPONENT CONVERSION

### 3.1 React Component → Liquid Section

**Conversion Rule**: Shared layout components → `sections/`

#### Example: Header Component

**React (src/components/Header.tsx):**
```tsx
export function Header() {
  const { cartCount } = useCart();

  return (
    <header className="header">
      <nav>
        <a href="/shop">Shop</a>
        <a href="/about">About</a>
      </nav>
      <div className="logo">
        <img src="/logo.png" alt="Logo" />
      </div>
      <div className="cart-icon">
        <span>{cartCount}</span>
      </div>
    </header>
  );
}
```

**Liquid (theme/sections/header.liquid):**
```liquid
<header class="header">
  <nav>
    <a href="/collections/all">Shop</a>
    <a href="/pages/about">About</a>
  </nav>
  <div class="logo">
    {% if section.settings.logo %}
      <img src="{{ section.settings.logo | image_url: width: 200 }}" alt="{{ shop.name }}">
    {% else %}
      <h1>{{ shop.name }}</h1>
    {% endif %}
  </div>
  <div class="cart-icon" data-cart-count="{{ cart.item_count }}">
    <span>{{ cart.item_count }}</span>
  </div>
</header>

<style>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    border-bottom: var(--border-width) solid var(--color-text);
    position: fixed;
    top: 0;
    width: 100%;
    background: var(--color-background);
  }
</style>

{% schema %}
{
  "name": "Header",
  "settings": [
    {
      "type": "image_picker",
      "id": "logo",
      "label": "Logo Image"
    }
  ]
}
{% endschema %}
```

### 3.2 React Component → Liquid Snippet

**Conversion Rule**: Small reusable components → `snippets/`

#### Example: Product Card Component

**React (src/components/ProductCard.tsx):**
```tsx
interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      {product.onSale && <span className="badge">SALE</span>}
      <h3>{product.title}</h3>
      <p className="price">${product.price}</p>
    </div>
  );
}
```

**Liquid (theme/snippets/product-card.liquid):**
```liquid
<div class="product-card">
  <a href="{{ product.url }}">
    <div class="product-card__image">
      <img
        src="{{ product.featured_image | image_url: width: 400 }}"
        alt="{{ product.title | escape }}"
        loading="lazy"
        width="400"
        height="533"
      >
      {% if product.compare_at_price > product.price %}
        <span class="badge">SALE</span>
      {% endif %}
    </div>
    <h3 class="product-card__title">{{ product.title }}</h3>
    <p class="product-card__price">
      {{ product.price | money }}
      {% if product.compare_at_price > product.price %}
        <s>{{ product.compare_at_price | money }}</s>
      {% endif %}
    </p>
  </a>
</div>

<style>
  .product-card {
    border: var(--border-width) solid var(--color-text);
  }

  .product-card__image {
    position: relative;
    aspect-ratio: 3 / 4;
    overflow: hidden;
  }

  .badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background: var(--color-accent);
    color: white;
    padding: 0.25rem 0.5rem;
  }
</style>
```

**Usage in templates:**
```liquid
{% for product in collection.products %}
  {% render 'product-card', product: product %}
{% endfor %}
```

### 3.3 React Page → Liquid Template

**Conversion Rule**: Page components → `templates/`

#### Example: Homepage

**React (src/pages/Home.tsx):**
```tsx
export function Home() {
  const featuredProducts = useFeaturedProducts();

  return (
    <>
      <HeroSection />
      <FeaturedCollections />
      <ProductGrid products={featuredProducts} />
    </>
  );
}
```

**Liquid (theme/templates/index.json):**
```json
{
  "sections": {
    "hero": {
      "type": "hero"
    },
    "featured-collections": {
      "type": "featured-collections"
    },
    "featured-products": {
      "type": "featured-products",
      "settings": {
        "heading": "Featured Products",
        "collection": "frontpage"
      }
    }
  },
  "order": [
    "hero",
    "featured-collections",
    "featured-products"
  ]
}
```

---

## PHASE 4: JAVASCRIPT CONVERSION

### 4.1 React Hooks → Vanilla JavaScript

#### useState Example

**React:**
```tsx
const [isOpen, setIsOpen] = useState(false);

<button onClick={() => setIsOpen(true)}>Open</button>
```

**Vanilla JS:**
```javascript
class CartDrawer {
  constructor() {
    this.isOpen = false;
    this.init();
  }

  init() {
    document.querySelectorAll('[data-cart-toggle]').forEach(btn => {
      btn.addEventListener('click', () => this.open());
    });
  }

  open() {
    this.isOpen = true;
    document.getElementById('cart-drawer').classList.add('active');
  }

  close() {
    this.isOpen = false;
    document.getElementById('cart-drawer').classList.remove('active');
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  new CartDrawer();
});
```

#### useContext (Cart) → Shopify Ajax Cart API

**React (with Context):**
```tsx
const { addToCart } = useCart();

<button onClick={() => addToCart(productId, 1)}>
  Add to Cart
</button>
```

**Vanilla JS + Shopify API:**
```javascript
class Cart {
  static async add(variantId, quantity = 1) {
    const response = await fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: variantId,
        quantity: quantity
      })
    });

    if (!response.ok) {
      throw new Error('Failed to add to cart');
    }

    const data = await response.json();
    this.updateCartCount();
    return data;
  }

  static async updateCartCount() {
    const response = await fetch('/cart.js');
    const cart = await response.json();
    document.querySelectorAll('[data-cart-count]').forEach(el => {
      el.textContent = cart.item_count;
    });
  }
}

// Usage in Liquid template
document.querySelectorAll('[data-add-to-cart]').forEach(btn => {
  btn.addEventListener('click', async (e) => {
    const variantId = e.target.dataset.variantId;
    try {
      await Cart.add(variantId);
      // Show success message
    } catch (error) {
      // Show error message
    }
  });
});
```

### 4.2 Shopify Ajax Cart API Endpoints

```javascript
// Add item to cart
POST /cart/add.js
Body: { id: variantId, quantity: 1 }

// Update item quantity
POST /cart/change.js
Body: { id: lineItemKey, quantity: 2 }

// Get cart state
GET /cart.js
Returns: { item_count, items[], total_price, ... }

// Clear cart
POST /cart/clear.js
```

---

## PHASE 5: CSS EXTRACTION

### 5.1 Extract Global Styles

**Source**: `src/App.css` or `src/index.css`
**Destination**: `theme/assets/base.css`

```css
/* Reset and base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  color: var(--color-text);
  background: var(--color-background);
  line-height: 1.6;
}

/* Utility classes */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.btn-primary {
  background: var(--color-text);
  color: var(--color-background);
  border: none;
  padding: 0.75rem 1.5rem;
  font-weight: 700;
  cursor: pointer;
}

.btn-secondary {
  background: transparent;
  color: var(--color-text);
  border: var(--border-width) solid var(--color-text);
  padding: 0.75rem 1.5rem;
  font-weight: 700;
  cursor: pointer;
}
```

### 5.2 Component-Scoped CSS

**Option 1**: Inline `<style>` blocks in sections (recommended)

```liquid
<div class="hero">
  <!-- HTML -->
</div>

<style>
  .hero {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 100vh;
  }

  @media (max-width: 768px) {
    .hero {
      grid-template-columns: 1fr;
    }
  }
</style>
```

**Option 2**: Separate CSS file per section

Create `theme/assets/section-hero.css` and load in section:

```liquid
{{ 'section-hero.css' | asset_url | stylesheet_tag }}
```

---

## PHASE 6: METAFIELDS SETUP

### 6.1 Identify Custom Product Data

React apps often use JSON files or API data. In Shopify, use **metafields**.

**Example from forgotten-essentials:**

```javascript
// React data structure
{
  id: 1,
  title: "Vintage Carhartt Jacket",
  price: 85,
  era: "1990s",           // → metafield
  condition: "Excellent", // → metafield
  size: "M",              // → metafield
  measurements: {         // → metafield
    chest: "42\"",
    waist: "38\"",
    length: "28\""
  }
}
```

**Shopify metafield setup (in admin):**

1. Go to **Settings** → **Custom Data** → **Products**
2. Add metafield definitions:
   - `custom.era` (Single line text)
   - `custom.condition` (Single line text)
   - `custom.size` (Single line text)
   - `custom.measurements` (Multi-line text)

**Usage in Liquid:**
```liquid
{% if product.metafields.custom.era %}
  <span class="era-badge">{{ product.metafields.custom.era }}</span>
{% endif %}

{% if product.metafields.custom.measurements %}
  <div class="measurements">
    {% assign measurements = product.metafields.custom.measurements | split: '|' %}
    {% for measurement in measurements %}
      {% assign pair = measurement | split: ':' %}
      <div>{{ pair[0] }}: {{ pair[1] }}</div>
    {% endfor %}
  </div>
{% endif %}
```

---

## PHASE 7: RESPONSIVE DESIGN

### 7.1 Maintain React Breakpoints

Identify breakpoints in React app:

```bash
grep -r "@media\|useMediaQuery" src/
```

**Common pattern:**
```css
/* Mobile-first approach */
.grid {
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### 7.2 Mobile-Specific Features

**Example: Mobile sidebar toggle**

```liquid
<button class="filter-toggle" data-sidebar-toggle>
  Filters
</button>

<aside class="sidebar" data-sidebar>
  <!-- Filter content -->
</aside>

<style>
  @media (max-width: 768px) {
    .sidebar {
      position: fixed;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100vh;
      background: white;
      transition: left 0.3s;
    }

    .sidebar.active {
      left: 0;
    }

    .filter-toggle {
      display: block;
    }
  }

  @media (min-width: 769px) {
    .filter-toggle {
      display: none;
    }

    .sidebar {
      position: static;
    }
  }
</style>

<script>
  class SidebarToggle {
    constructor() {
      this.sidebar = document.querySelector('[data-sidebar]');
      this.toggle = document.querySelector('[data-sidebar-toggle]');

      this.toggle?.addEventListener('click', () => {
        this.sidebar?.classList.toggle('active');
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    new SidebarToggle();
  });
</script>
```

---

## PHASE 8: TESTING & VALIDATION

### 8.1 Functional Testing Checklist

```markdown
- [ ] All pages load without errors
- [ ] Navigation links work
- [ ] Product pages display correctly
- [ ] Add to cart functionality works
- [ ] Cart drawer opens/closes
- [ ] Cart quantity updates work
- [ ] Remove from cart works
- [ ] Checkout redirects to Shopify checkout
- [ ] Image gallery navigation works
- [ ] Mobile sidebar toggles work
- [ ] Responsive design displays correctly
```

### 8.2 Design Verification Checklist

```markdown
- [ ] Colors match original design exactly
- [ ] Typography (fonts, sizes, weights) matches
- [ ] Spacing and layout matches
- [ ] Borders and border radius matches
- [ ] Hover states preserved
- [ ] Mobile breakpoints match
- [ ] Product grid aspect ratios correct
- [ ] Overall aesthetic preserved
```

### 8.3 Shopify Integration Checklist

```markdown
- [ ] Sections appear in theme editor
- [ ] Section settings are customizable
- [ ] Theme settings (colors, fonts) work
- [ ] Metafields display correctly
- [ ] Product variants work
- [ ] Collection filtering works
- [ ] Pagination works
- [ ] Cart syncs with Shopify
- [ ] Checkout process works
```

---

## CONVERSION COMPLETE CRITERIA

✅ **All React components converted to Liquid**
✅ **No React/Node dependencies remain**
✅ **Pure vanilla JavaScript (no frameworks)**
✅ **Design aesthetic preserved exactly**
✅ **All user flows tested and working**
✅ **Shopify theme check passes**
✅ **Performance acceptable (Lighthouse ≥60)**
✅ **Accessibility acceptable (Lighthouse ≥90)**
✅ **Theme uploads successfully to Shopify**

---

## QUICK REFERENCE: FILE MAPPING

| React | Shopify Liquid |
|-------|----------------|
| `src/components/Header.tsx` | `theme/sections/header.liquid` |
| `src/components/Footer.tsx` | `theme/sections/footer.liquid` |
| `src/components/ProductCard.tsx` | `theme/snippets/product-card.liquid` |
| `src/components/CartDrawer.tsx` | `theme/snippets/cart-drawer.liquid` |
| `src/pages/Home.tsx` | `theme/templates/index.liquid` or `index.json` |
| `src/pages/Shop.tsx` | `theme/templates/collection.liquid` |
| `src/pages/ProductDetail.tsx` | `theme/templates/product.liquid` |
| `src/App.css` | `theme/assets/base.css` + `theme/assets/theme.css` |
| `src/lib/cart.ts` | `theme/assets/theme.js` (vanilla JS Cart class) |
| `public/images/*` | `theme/assets/*` |

---

**This conversion process is proven and battle-tested. Follow it systematically for successful React → Shopify Liquid migrations.**
