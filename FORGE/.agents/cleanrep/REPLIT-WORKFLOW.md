# CLEANREP REPLIT WORKFLOW

**Purpose**: Extended workflow for converting Replit-generated React apps to Shopify Liquid themes
**Supplements**: ACTIVATE.md, CONVERSION-PROCESS.md

---

## REPLIT APP CHARACTERISTICS

Replit-generated Shopify theme apps have specific patterns:

### File Structure
```
replit-app/
├── .replit                    # Replit config (REMOVE)
├── replit.nix                 # Replit environment (REMOVE)
├── .local/                    # Replit cache (REMOVE)
├── client/
│   └── src/
│       ├── components/        # React components
│       ├── pages/             # 20+ page files
│       ├── data/              # Mock data (convert to Shopify objects)
│       ├── hooks/             # React hooks (convert to vanilla JS)
│       └── lib/               # Utilities
├── server/                    # Express backend (usually not needed for Shopify)
├── package.json               # Has @replit dependencies (clean these)
├── vite.config.ts             # Vite configuration
└── tailwind.config.js         # Tailwind (extract to vanilla CSS)
```

### Common Patterns

**Dependencies to Remove:**
- `@replit/vite-plugin-*` - Replit-specific plugins
- Express server dependencies (unless needed for custom backend)
- Unnecessary state management libs (Zustand, Redux if simple cart)

**Pages to Convert:** (typically 20+ pages)
- Dynamic: Home, Collection, Product, Cart, Search, Sale
- Static: About, Contact, FAQ, Shipping, Privacy, Terms, Size Guide
- Blog: Blog, Blog Article
- Special: Lookbook, Press, Careers, Wishlist, Account, 404

---

## REPLIT → SHOPIFY WORKFLOW

### PRE-FLIGHT: Before Conversion

**Step 1: Run Cleanup Script**

```bash
# From .codex/FORGE/scripts/
./shopify-theme-cleanup.sh /path/to/replit-app
```

**What this does:**
- ✅ Removes .replit, replit.nix, .local
- ✅ Deletes node_modules, lock files
- ✅ Resets git history (optional)
- ✅ Creates theme/ directory structure
- ✅ Creates favicon placeholders
- ✅ Generates CLEANUP-REPORT.md

**Step 2: Verify Cleanup**

Check CLEANUP-REPORT.md for:
- Number of pages found
- Number of components found
- Any missing directories

**Step 3: Manual Review**

Review and update:
- `package.json` - Remove @replit dependencies
- `client/src/data/` - Check mock data structure
- `public/favicons/` - Add actual favicons

---

### PHASE 1: REACT ANALYSIS (Extended for Replit)

**1.1 Identify Replit-Specific Patterns**

```bash
# Check for Replit plugins
grep "@replit" package.json

# Check for Express server usage
grep -r "express\|app.listen" server/

# Check for database usage (may need migration)
grep -r "drizzle\|prisma\|pg" server/
```

**1.2 Page Inventory**

List all pages and categorize:

```bash
ls client/src/pages/*.tsx

# Expected Replit pages (21+):
# - Home.tsx → templates/index.liquid
# - Collection.tsx → templates/collection.liquid
# - Product.tsx → templates/product.liquid
# - Cart.tsx → templates/cart.liquid (or snippet)
# - Search.tsx → templates/search.liquid
# - Sale.tsx → templates/collection.liquid (sale variant)
# - About.tsx → templates/page.liquid
# - Contact.tsx → templates/page.liquid
# - FAQ.tsx → templates/page.liquid
# - Shipping.tsx → templates/page.liquid
# - SizeGuide.tsx → templates/page.liquid
# - Privacy.tsx → templates/page.liquid
# - Terms.tsx → templates/page.liquid
# - Blog.tsx → templates/blog.liquid
# - BlogArticle.tsx → templates/article.liquid
# - Lookbook.tsx → templates/page.liquid (or custom)
# - Press.tsx → templates/page.liquid
# - Careers.tsx → templates/page.liquid
# - Wishlist.tsx → templates/page.liquid (or custom)
# - Account.tsx → templates/customers/account.liquid
# - not-found.tsx → templates/404.liquid
```

**1.3 Component Inventory**

```bash
ls client/src/components/*.tsx

# Common Replit components:
# - Navigation.tsx → sections/header.liquid
# - Footer.tsx → sections/footer.liquid
# - ProductCard.tsx → snippets/product-card.liquid
# - CartDrawer.tsx → snippets/cart-drawer.liquid
# - ProductGrid.tsx → sections/product-grid.liquid or inline
# - FeaturedSection.tsx → sections/featured-*.liquid
# - CountdownTimer.tsx → snippet or vanilla JS
# - ui/* → Convert to vanilla HTML + CSS
```

**1.4 Data Analysis**

Check `client/src/data/`:

```typescript
// products.ts → Will use Shopify product objects
// collections.ts → Will use Shopify collection objects
// blog.ts → Will use Shopify blog/article objects
// site.ts → Will use Shopify shop object + theme settings
```

**1.5 Styling Analysis**

```bash
# Check for Tailwind usage
grep -r "className=" client/src/components/ | wc -l

# Check for custom CSS
find client/src -name "*.css"

# Replit apps usually use Tailwind heavily
# Will need to extract to vanilla CSS
```

---

### PHASE 2: LIQUID CONVERSION (Extended)

**2.1 Pages → Templates Priority Order**

Convert in this order:

1. **Core Dynamic Pages (Required)**
   - Product.tsx → product.liquid
   - Collection.tsx → collection.liquid
   - Cart.tsx → cart.liquid (or cart-drawer snippet)
   - Search.tsx → search.liquid

2. **Homepage (Required)**
   - Home.tsx → index.liquid or index.json

3. **Static Pages (Single Template)**
   - Create ONE `page.liquid` template
   - All static pages (About, Contact, FAQ, etc.) use this

4. **Blog Pages (If blog exists)**
   - Blog.tsx → blog.liquid
   - BlogArticle.tsx → article.liquid

5. **Customer Account Pages (If Account.tsx exists)**
   - Account.tsx → customers/account.liquid
   - May need login.liquid, register.liquid, etc.

6. **Special Pages**
   - 404.tsx → 404.liquid
   - Lookbook.tsx → custom template or page.liquid
   - Wishlist.tsx → custom implementation

**2.2 Components → Sections vs Snippets**

**Sections** (larger, has settings):
- Navigation.tsx → header.liquid (with logo picker, etc.)
- Footer.tsx → footer.liquid (with social links, newsletter)
- Featured*.tsx → featured-*.liquid (with collection picker)
- Hero sections → hero.liquid (with image picker, text fields)

**Snippets** (smaller, reusable):
- ProductCard.tsx → product-card.liquid
- CartDrawer.tsx → cart-drawer.liquid
- CountdownTimer.tsx → countdown-timer.liquid
- Icons → icon-*.liquid

**2.3 Tailwind → Vanilla CSS Extraction**

Replit apps heavily use Tailwind. Convert to vanilla CSS:

**Extract approach:**

1. **Global styles** → `theme/assets/base.css`
   ```css
   /* Tailwind resets */
   * {
     box-sizing: border-box;
     margin: 0;
     padding: 0;
   }

   /* Tailwind defaults */
   body {
     font-family: system-ui, -apple-system, sans-serif;
     line-height: 1.5;
   }
   ```

2. **Component styles** → Inline `<style>` in sections
   ```liquid
   <div class="product-card">
     <!-- content -->
   </div>

   <style>
     .product-card {
       border: 1px solid #e5e7eb;
       padding: 1rem;
       border-radius: 0.5rem;
     }
   </style>
   ```

3. **Utility classes** → Keep common ones in `base.css`
   ```css
   .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
   .grid { display: grid; }
   .flex { display: flex; }
   .hidden { display: none; }
   ```

**2.4 React Hooks → Vanilla JS**

Common Replit patterns:

**Cart Context:**
```typescript
// React (Replit)
const { cart, addToCart } = useCart();

// Vanilla JS (Shopify)
class Cart {
  static async add(variantId, quantity) {
    const res = await fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: variantId, quantity })
    });
    return res.json();
  }
}
```

**Product Gallery:**
```typescript
// React (Replit)
const [currentImage, setCurrentImage] = useState(0);

// Vanilla JS (Shopify)
class ProductGallery {
  constructor() {
    this.currentIndex = 0;
    this.images = document.querySelectorAll('.gallery-image');
  }

  setActive(index) {
    this.images.forEach((img, i) => {
      img.classList.toggle('active', i === index);
    });
    this.currentIndex = index;
  }
}
```

---

### PHASE 3: ASSET EXTRACTION (Replit-Specific)

**3.1 Remove Replit Dependencies**

Edit `package.json`:

```json
// REMOVE these:
"@replit/vite-plugin-cartographer": "^0.4.4",
"@replit/vite-plugin-dev-banner": "^0.1.1",
"@replit/vite-plugin-runtime-error-modal": "^0.0.4",

// KEEP core dependencies:
"react": "^19.2.0",  // (only during conversion)
"vite": "^7.1.9",
"tailwindcss": "^4.1.14",
```

**3.2 Extract Images**

```bash
# Copy images from public/ to theme/assets/
cp -r public/images/* theme/assets/
cp -r public/favicons/* theme/assets/
```

Update image references:
```liquid
<!-- React -->
<img src="/images/hero.jpg" />

<!-- Liquid -->
<img src="{{ 'hero.jpg' | asset_url }}" />
```

**3.3 Extract Fonts (if custom fonts exist)**

⚠️ **WARNING**: Shopify theme store doesn't allow custom fonts unless essential.

If theme has custom fonts:
1. Check if they're necessary
2. Consider using Shopify font picker instead
3. Document font usage in theme settings

---

### PHASE 4: SHOPIFY INTEGRATION (Replit-Specific)

**4.1 Mock Data → Shopify Objects**

Replace Replit mock data with Shopify Liquid:

**Products:**
```typescript
// Replit mock data
const product = {
  id: 1,
  title: "Vintage Jacket",
  price: 85,
  images: ["/images/jacket.jpg"]
};

// Shopify Liquid
{% assign product = product %}
{{ product.title }}
{{ product.price | money }}
{{ product.featured_image | image_url: width: 800 }}
```

**Collections:**
```typescript
// Replit mock
const collections = [...];

// Shopify Liquid
{% for collection in collections %}
  {{ collection.title }}
  {{ collection.image | image_url }}
{% endfor %}
```

**4.2 Routing → Shopify URLs**

Replit apps use client-side routing. Convert to Shopify URLs:

```typescript
// Replit routing
<Link to={`/products/${product.handle}`}>

// Shopify Liquid
<a href="{{ product.url }}">
```

**4.3 Form Handling**

Convert React forms to Shopify forms:

**Contact Form:**
```liquid
{% form 'contact' %}
  <input type="text" name="contact[name]" placeholder="Name">
  <input type="email" name="contact[email]" placeholder="Email">
  <textarea name="contact[body]" placeholder="Message"></textarea>
  <button type="submit">Send</button>
{% endform %}
```

**Newsletter Signup:**
```liquid
{% form 'customer', class: 'newsletter-form' %}
  <input type="hidden" name="contact[tags]" value="newsletter">
  <input type="email" name="contact[email]" placeholder="Email">
  <button type="submit">Subscribe</button>
{% endform %}
```

---

### PHASE 5: VALIDATION (Replit-Specific Checks)

**5.1 Verify No Replit Artifacts Remain**

```bash
# Check for Replit files
find theme/ -name ".replit*" -o -name "replit.nix"
# Should return NOTHING

# Check for Replit imports in code
grep -r "@replit" theme/
# Should return NOTHING
```

**5.2 Verify No React Artifacts**

```bash
# Check for React syntax
grep -r "useState\|useEffect\|React\|jsx" theme/
# Should return NOTHING

# Check for React imports
grep -r "import.*from.*react" theme/
# Should return NOTHING
```

**5.3 Check Page Coverage**

```bash
# Count Replit pages
REPLIT_PAGES=$(find client/src/pages -name "*.tsx" | wc -l)

# Count Liquid templates
LIQUID_TEMPLATES=$(find theme/templates -name "*.liquid" | wc -l)

echo "Replit pages: $REPLIT_PAGES"
echo "Liquid templates: $LIQUID_TEMPLATES"
# Should have coverage for all dynamic pages
# Static pages use single page.liquid template
```

**5.4 Run Shopify Theme Check**

```bash
cd theme/
shopify theme check
# Fix all errors before proceeding
```

---

### PHASE 6: DEPLOYMENT (Replit-Specific)

**6.1 Run Deployment Script**

```bash
# From .codex/FORGE/scripts/
./shopify-theme-deploy.sh /path/to/converted-theme theme-name
```

**What this does:**
- ✅ Validates theme structure
- ✅ Runs shopify theme check
- ✅ Copies theme to Shopify-Themes repo
- ✅ Creates documentation (README, installation guide)
- ✅ Creates screenshot placeholders
- ✅ Updates repository README
- ✅ Commits to git

**6.2 Post-Deployment Tasks**

1. **Add Screenshots**
   ```bash
   # Take screenshots of:
   # - Homepage
   # - Collection page
   # - Product page
   # - Cart
   # - Mobile view

   # Save to:
   ~/Documents/Shopify-Themes/theme-name/screenshots/
   ```

2. **Test ZIP Upload**
   ```bash
   cd ~/Documents/Shopify-Themes/theme-name
   zip -r theme.zip theme/

   # Upload to Shopify Admin → Themes → Upload ZIP
   # Test theme in preview mode
   ```

3. **Update Repository README**
   - Add theme description
   - Add feature list
   - Add screenshots to gallery
   - Update "Themes" section

---

## REPLIT APP CONVERSION CHECKLIST

### Pre-Conversion
- [ ] Run `shopify-theme-cleanup.sh`
- [ ] Review CLEANUP-REPORT.md
- [ ] Remove @replit dependencies from package.json
- [ ] Add favicons to public/favicons/

### Conversion
- [ ] All pages converted to Liquid templates
- [ ] All components converted to sections/snippets
- [ ] CSS extracted from Tailwind to vanilla
- [ ] JavaScript converted to vanilla (no React)
- [ ] Mock data replaced with Shopify objects
- [ ] Routing converted to Shopify URLs
- [ ] Forms converted to Shopify forms

### Validation
- [ ] No Replit artifacts remain
- [ ] No React artifacts remain
- [ ] All Replit pages have Liquid equivalents
- [ ] Shopify theme check passes (0 errors)
- [ ] Frontend validator approves
- [ ] Design aesthetic preserved

### Deployment
- [ ] Run `shopify-theme-deploy.sh`
- [ ] Theme copied to Shopify-Themes repo
- [ ] Documentation created
- [ ] Screenshots added
- [ ] Repository README updated
- [ ] Test ZIP upload to Shopify

---

## AUTOMATION WORKFLOWS

### Full Workflow (Manual)

```bash
# Step 1: Cleanup Replit app
cd .codex/FORGE/scripts
./shopify-theme-cleanup.sh ~/Documents/Shopify-Themes/street-canvas

# Step 2: Activate CLEANREP and convert
# (manual conversion process)

# Step 3: Deploy converted theme
./shopify-theme-deploy.sh ~/Documents/Shopify-Themes/street-canvas/theme street-canvas
```

### Batch Processing Multiple Themes

```bash
# Process all unextracted Replit themes
for zip in ~/Documents/Shopify-Themes/*.zip; do
    theme_name=$(basename "$zip" .zip)
    echo "Processing: $theme_name"

    # Extract if not already extracted
    if [ ! -d ~/Documents/Shopify-Themes/$theme_name ]; then
        unzip -q "$zip" -d ~/Documents/Shopify-Themes/$theme_name
    fi

    # Run cleanup
    ./shopify-theme-cleanup.sh ~/Documents/Shopify-Themes/$theme_name

    # Manual CLEANREP conversion required here

    echo "Cleaned: $theme_name"
done
```

---

## TROUBLESHOOTING REPLIT APPS

### Issue: Too Many Dependencies

**Problem**: package.json has 50+ dependencies from Replit template

**Solution**:
- Review dependencies
- Remove unused UI libraries (if not using Radix components)
- Remove server-side dependencies (Express, DB, etc.) if not needed

### Issue: Complex State Management

**Problem**: App uses Zustand/Redux for simple cart

**Solution**:
- Simplify to Shopify Ajax Cart API
- No need for complex state management

### Issue: Custom Backend (Express server)

**Problem**: Replit app has Express server in `/server`

**Solution**:
- Shopify doesn't support custom backends
- Move any custom logic to Shopify Apps or Liquid
- Remove server/ directory after extracting any needed logic

### Issue: Database Usage

**Problem**: App uses Drizzle/Prisma with PostgreSQL

**Solution**:
- Shopify handles data (products, collections, customers)
- Remove database dependencies
- If custom data needed, use Shopify metafields or custom Shopify app

---

**This workflow extends CLEANREP for Replit-generated React apps, automating cleanup and providing clear conversion steps.**
