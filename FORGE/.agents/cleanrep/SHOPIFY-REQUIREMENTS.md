# SHOPIFY THEME STORE REQUIREMENTS

**Source**: https://shopify.dev/docs/storefronts/themes/store/requirements
**Purpose**: Official Shopify theme submission requirements for theme store approval

---

## CRITICAL REQUIREMENTS

These are **MANDATORY** for all Shopify themes. Failure to meet any of these will result in theme rejection.

---

## 1. REQUIRED FILES

### Must Include (MANDATORY)

```
theme/
├── config/
│   ├── settings_schema.json  ✅ REQUIRED
│   └── settings_data.json    ✅ REQUIRED
├── layout/
│   └── theme.liquid          ✅ REQUIRED
├── locales/
│   └── en.default.json       ✅ REQUIRED
├── sections/
│   └── [at least one .liquid file]  ✅ REQUIRED
└── templates/
    ├── index.liquid or index.json    ✅ REQUIRED
    ├── product.liquid or product.json ✅ REQUIRED
    └── collection.liquid or collection.json ✅ REQUIRED
```

### Section Requirements

**MANDATORY sections:**
- Header and footer sections **must use section groups**
- Must include a "Custom Liquid" section for merchant flexibility
- Most templates must support sections (use JSON template variants)

**Section groups location:**
```
theme/
├── sections/
│   ├── header-group.json     ✅ Header group
│   └── footer-group.json     ✅ Footer group
```

**Reference in theme.liquid:**
```liquid
{% sections 'header-group' %}
{{ content_for_layout }}
{% sections 'footer-group' %}
```

---

## 2. PERFORMANCE REQUIREMENTS

### Lighthouse Performance Score

**Minimum score: 60** across all tested pages:
- Homepage (`/`)
- Collection page (`/collections/all`)
- Product page (`/products/[any-product]`)

**Testing command:**
```bash
# Start local dev server
shopify theme dev

# Run Lighthouse on:
# - http://localhost:9292/
# - http://localhost:9292/collections/all
# - http://localhost:9292/products/[product-handle]
```

### Performance Best Practices

**✅ DO:**
- Use responsive images with `image_url` filter
- Lazy load images (`loading="lazy"`)
- Minimize CSS/JS file sizes
- Use async/defer for JavaScript
- Optimize image sizes (use Shopify CDN)
- Minimize HTTP requests

**❌ DON'T:**
- Load unnecessary JavaScript libraries
- Use uncompressed images
- Block rendering with synchronous scripts
- Load full-size images on mobile

**Example: Responsive images**
```liquid
<img
  src="{{ product.featured_image | image_url: width: 800 }}"
  srcset="
    {{ product.featured_image | image_url: width: 400 }} 400w,
    {{ product.featured_image | image_url: width: 800 }} 800w,
    {{ product.featured_image | image_url: width: 1200 }} 1200w
  "
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="{{ product.title | escape }}"
  loading="lazy"
  width="800"
  height="1000"
>
```

---

## 3. ACCESSIBILITY REQUIREMENTS

### Lighthouse Accessibility Score

**Minimum score: 90** across all tested pages

### Required Accessibility Features

#### Keyboard Navigation
- ✅ All interactive elements must be keyboard accessible
- ✅ Tab order must be logical
- ✅ No keyboard traps
- ✅ Skip-to-content link required

**Example: Skip to content**
```liquid
<a href="#main-content" class="skip-to-content">
  {{ 'accessibility.skip_to_text' | t }}
</a>

<main id="main-content" tabindex="-1">
  {{ content_for_layout }}
</main>
```

```css
.skip-to-content {
  position: absolute;
  left: -9999px;
  z-index: 999;
}

.skip-to-content:focus {
  left: 0;
  top: 0;
  background: white;
  padding: 1rem;
}
```

#### Focus States
- ✅ All interactive elements must have visible focus states
- ✅ Focus indicators must meet contrast requirements

**Example:**
```css
button:focus,
a:focus,
input:focus {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

#### Image Alt Text
- ✅ All images must have alt attributes
- ✅ Decorative images should use `alt=""`

```liquid
<!-- Product image -->
<img src="{{ image | image_url }}" alt="{{ product.title | escape }}">

<!-- Decorative image -->
<img src="{{ image | image_url }}" alt="">
```

#### Form Labels
- ✅ All form inputs must have associated labels
- ✅ Use `<label>` elements or `aria-label`

```liquid
<label for="email">Email Address</label>
<input type="email" id="email" name="email" required>

<!-- Or with aria-label -->
<input
  type="search"
  name="q"
  aria-label="Search products"
  placeholder="Search..."
>
```

#### Color Contrast
- ✅ **Minimum contrast ratio: 4.5:1** for normal text
- ✅ **Minimum contrast ratio: 3:1** for large text (18pt+)

**Test your colors:**
```
Text color: #000000
Background: #ffffff
Contrast: 21:1 ✅ PASS

Text color: #d20000
Background: #ffffff
Contrast: 5.9:1 ✅ PASS (for accent text)
```

#### Touch Targets
- ✅ **Minimum size: 24x24 CSS pixels**
- ✅ Adequate spacing between touch targets

```css
button,
a.btn {
  min-width: 44px;
  min-height: 44px;
  /* Shopify recommends 44x44, but 24x24 is minimum */
}
```

#### ARIA Attributes
- ✅ Use semantic HTML first
- ✅ Add ARIA when semantic HTML insufficient
- ✅ Common ARIA attributes:
  - `aria-label`
  - `aria-labelledby`
  - `aria-expanded`
  - `aria-hidden`
  - `role`

**Example: Accessible cart drawer**
```liquid
<button
  aria-label="Open cart"
  aria-expanded="false"
  data-cart-toggle
>
  Cart ({{ cart.item_count }})
</button>

<div
  id="cart-drawer"
  role="dialog"
  aria-labelledby="cart-title"
  aria-hidden="true"
>
  <h2 id="cart-title">Your Cart</h2>
  <!-- Cart content -->
</div>
```

---

## 4. FORBIDDEN FEATURES

### ❌ Sass Files

**NOT ALLOWED:**
- `.scss` files
- `.sass` files
- Sass compilation

**REASON**: Shopify doesn't support Sass preprocessing in themes.

**SOLUTION**: Use vanilla CSS or compile Sass to CSS before uploading.

### ❌ Minified Files

**NOT ALLOWED:**
- Minified CSS (except where necessary for performance)
- Minified JavaScript (except ES6 transpiled code and third-party libraries)

**REASON**: Shopify needs to review code for security and quality.

**ALLOWED exceptions:**
- ES6 code transpiled to ES5
- Third-party libraries (jQuery, etc.) can be minified

**Example:**
```
✅ theme.css (readable)
✅ theme.js (readable)
✅ vendor-library.min.js (third-party, documented)
❌ custom-code.min.js (your code, minified)
```

### ❌ App Dependencies

**NOT ALLOWED:**
- Functionality that requires installing a Shopify app
- Hard dependencies on external services
- Features that break without apps

**REASON**: Themes must work standalone.

**ALLOWED:**
- Optional integrations
- Features that degrade gracefully

### ❌ Custom Fonts

**NOT ALLOWED (usually):**
- Self-hosted custom fonts
- Google Fonts loaded directly
- Adobe Fonts

**REASON**: Shopify has approved font library; custom fonts hurt performance.

**ALLOWED:**
- Fonts from Shopify's font picker
- System fonts

**Exception**: Custom fonts may be approved if they're essential to brand identity and optimized.

### ❌ robots.txt.liquid

**NOT ALLOWED:**
- `templates/robots.txt.liquid`

**REASON**: Shopify manages robots.txt at platform level.

### ❌ Deceptive Practices

**NOT ALLOWED:**
- Fake urgency timers
- Misleading scarcity claims
- False social proof
- Hidden costs
- Dark patterns

---

## 5. BROWSER COMPATIBILITY

### Required Browser Support

**Desktop:**
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

**Mobile:**
- ✅ iOS Safari (latest)
- ✅ Android Chrome (latest)

### WebView Support (CRITICAL)

**Must work in social media webviews:**
- ✅ Instagram in-app browser
- ✅ Facebook in-app browser
- ✅ Pinterest in-app browser
- ✅ TikTok in-app browser

**Testing:**
```bash
# Test webview compatibility
# Share product URL on Instagram/Facebook
# Open link in-app (don't open in Safari/Chrome)
# Verify theme loads and functions correctly
```

---

## 6. RESPONSIVE DESIGN

### Required Breakpoints

**Must support:**
- ✅ Mobile (320px - 767px)
- ✅ Tablet (768px - 1023px)
- ✅ Desktop (1024px+)

### Mobile-First Approach

```css
/* Base styles (mobile) */
.grid {
  grid-template-columns: 1fr;
}

/* Tablet */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### Viewport Meta Tag (REQUIRED)

```liquid
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

---

## 7. SEO REQUIREMENTS

### Meta Tags

**Required in theme.liquid:**
```liquid
<title>
  {{ page_title }}
  {%- if current_tags %} &ndash; {{ current_tags | join: ', ' }}{% endif -%}
  {%- if current_page != 1 %} &ndash; Page {{ current_page }}{% endif -%}
  {%- unless page_title contains shop.name %} &ndash; {{ shop.name }}{% endunless -%}
</title>

{% if page_description %}
  <meta name="description" content="{{ page_description | escape }}">
{% endif %}

<link rel="canonical" href="{{ canonical_url }}">

<meta property="og:site_name" content="{{ shop.name }}">
<meta property="og:url" content="{{ canonical_url }}">
<meta property="og:title" content="{{ page_title | default: shop.name }}">
<meta property="og:type" content="website">
<meta property="og:description" content="{{ page_description | escape }}">
```

### Structured Data

**Recommended**: Add JSON-LD structured data for products.

```liquid
{% if product %}
  <script type="application/ld+json">
  {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": {{ product.title | json }},
    "image": {{ product.featured_image | image_url | json }},
    "description": {{ product.description | strip_html | json }},
    "offers": {
      "@type": "Offer",
      "priceCurrency": {{ cart.currency.iso_code | json }},
      "price": {{ product.price | divided_by: 100.0 | json }},
      "availability": "https://schema.org/InStock"
    }
  }
  </script>
{% endif %}
```

---

## 8. INTERNATIONALIZATION

### Multi-Language Support

**Required:**
- ✅ All user-facing text must use translation strings
- ✅ Support for RTL languages (if applicable)

**Use locales:**
```liquid
<!-- Instead of hardcoded text -->
❌ <button>Add to Cart</button>

<!-- Use translation strings -->
✅ <button>{{ 'products.product.add_to_cart' | t }}</button>
```

**In `locales/en.default.json`:**
```json
{
  "products": {
    "product": {
      "add_to_cart": "Add to Cart"
    }
  }
}
```

### Multi-Currency Support

**Required:**
- ✅ Use `money` filter for all prices
- ✅ Support Shopify's currency conversion

```liquid
<!-- Use money filter -->
{{ product.price | money }}

<!-- With currency code -->
{{ product.price | money_with_currency }}
```

---

## 9. THEME SETTINGS

### settings_schema.json Structure

**Required sections:**
```json
[
  {
    "name": "theme_info",
    "theme_name": "Your Theme Name",
    "theme_version": "1.0.0",
    "theme_author": "Your Name",
    "theme_documentation_url": "https://docs.example.com",
    "theme_support_url": "https://support.example.com"
  },
  {
    "name": "Colors",
    "settings": [ /* color settings */ ]
  },
  {
    "name": "Typography",
    "settings": [ /* font settings */ ]
  }
]
```

### Comprehensive Settings System

**Must provide:**
- ✅ Color customization
- ✅ Font selection
- ✅ Layout options
- ✅ Section visibility toggles
- ✅ Social media links
- ✅ Cart behavior options

---

## 10. VALIDATION CHECKLIST

### Pre-Submission Checklist

```markdown
## Files
- [ ] settings_schema.json present
- [ ] settings_data.json present
- [ ] theme.liquid present
- [ ] en.default.json present
- [ ] All required templates present
- [ ] Header/footer use section groups
- [ ] Custom Liquid section included

## Performance
- [ ] Lighthouse performance ≥ 60 (homepage)
- [ ] Lighthouse performance ≥ 60 (collection)
- [ ] Lighthouse performance ≥ 60 (product)
- [ ] Images use responsive loading
- [ ] JavaScript uses async/defer
- [ ] No blocking resources

## Accessibility
- [ ] Lighthouse accessibility ≥ 90
- [ ] Skip-to-content link present
- [ ] All images have alt text
- [ ] All forms have labels
- [ ] Color contrast ≥ 4.5:1
- [ ] Touch targets ≥ 24x24px
- [ ] Keyboard navigation works
- [ ] Focus states visible

## Compatibility
- [ ] Works in Chrome
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Works in Edge
- [ ] Works on iOS
- [ ] Works on Android
- [ ] Works in Instagram webview
- [ ] Works in Facebook webview

## Code Quality
- [ ] No Sass files
- [ ] No minified CSS (except allowed)
- [ ] No minified JS (except allowed)
- [ ] No app dependencies
- [ ] No custom fonts (or approved)
- [ ] No robots.txt.liquid
- [ ] shopify theme check passes

## Functionality
- [ ] All pages load
- [ ] Navigation works
- [ ] Cart functionality works
- [ ] Checkout redirects properly
- [ ] Search works
- [ ] Filtering works
- [ ] Pagination works

## SEO
- [ ] Meta tags present
- [ ] Canonical URLs set
- [ ] Structured data included
- [ ] Translation strings used
- [ ] Multi-currency supported
```

---

## SHOPIFY THEME CHECK

### Install Shopify CLI

```bash
# Install Shopify CLI
npm install -g @shopify/cli @shopify/theme

# Or with Homebrew (macOS)
brew tap shopify/shopify
brew install shopify-cli
```

### Run Theme Check

```bash
cd theme/
shopify theme check

# Fix issues automatically (where possible)
shopify theme check --auto-correct
```

### Common Errors

**Error: Missing required file**
```
✗ settings_schema.json is required
```
**Fix**: Create `config/settings_schema.json`

**Error: Liquid syntax error**
```
✗ Syntax error in product.liquid line 42
```
**Fix**: Check Liquid syntax, closing tags, filters

**Error: Performance issue**
```
⚠ Large image detected: optimize before upload
```
**Fix**: Compress images, use Shopify CDN

**Error: Accessibility issue**
```
⚠ Image missing alt attribute
```
**Fix**: Add alt text to all images

---

## TESTING WORKFLOW

### 1. Local Development

```bash
shopify theme dev --store your-store.myshopify.com
```

### 2. Run Theme Check

```bash
shopify theme check
# Fix all errors before proceeding
```

### 3. Run Lighthouse Audits

```bash
# While theme dev is running
# Open Chrome DevTools → Lighthouse
# Test: Homepage, Collection, Product
# Verify: Performance ≥60, Accessibility ≥90
```

### 4. Test in Browsers

- Chrome, Firefox, Safari, Edge
- iOS Safari, Android Chrome
- Instagram/Facebook webviews

### 5. Upload to Shopify

```bash
# Upload theme for testing
shopify theme push --unpublished --store your-store.myshopify.com

# Preview in Shopify admin before publishing
```

---

## SUCCESS CRITERIA

Theme is ready for submission when:

✅ **All required files present**
✅ **shopify theme check** passes with 0 errors
✅ **Lighthouse performance ≥ 60** on all tested pages
✅ **Lighthouse accessibility ≥ 90** on all tested pages
✅ **No forbidden features** (Sass, minified code, etc.)
✅ **Browser compatibility** verified
✅ **Webview compatibility** verified
✅ **SEO meta tags** implemented
✅ **Translation strings** used throughout
✅ **Theme settings** comprehensive
✅ **All user flows** tested and working

---

## ADDITIONAL RESOURCES

- [Shopify Theme Documentation](https://shopify.dev/docs/themes)
- [Liquid Template Language](https://shopify.dev/docs/api/liquid)
- [Theme Store Requirements](https://shopify.dev/docs/storefronts/themes/store/requirements)
- [Shopify CLI Documentation](https://shopify.dev/docs/themes/tools/cli)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)

---

**These requirements are MANDATORY for Shopify theme store approval. Non-compliance will result in theme rejection.**
