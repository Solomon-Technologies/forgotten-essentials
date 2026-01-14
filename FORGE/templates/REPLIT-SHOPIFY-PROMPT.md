# REPLIT SHOPIFY THEME DESIGN PROMPT

**Purpose**: Copy-paste prompt template for Replit Agent to generate Shopify-ready React apps

---

## HOW TO USE THIS TEMPLATE

1. Copy the entire prompt below
2. Paste into Replit Agent
3. Customize the `[VARIABLES]` sections for your specific theme
4. Let Replit Agent generate the app
5. Use CLEANREP agent to convert React → Shopify Liquid

---

## PROMPT TEMPLATE (COPY BELOW)

```
Create a complete e-commerce website using React + TypeScript + Vite + TailwindCSS with the following specifications:

## THEME IDENTITY

**Theme Name**: [YOUR THEME NAME]
**Design Style**: [e.g., "Minimalist streetwear", "Vintage brutalist", "Modern luxury", "Grungy thrift"]
**Target Audience**: [e.g., "Gen-Z streetwear enthusiasts", "Vintage clothing collectors"]
**Brand Vibe**: [e.g., "Edgy, urban, raw", "Clean, sophisticated, timeless"]

## COLOR PALETTE

**Primary Colors:**
- Background: [#FFFFFF]
- Text: [#000000]
- Accent: [#FF0000]
- Secondary Background: [#F5F5F5]

**Semantic Colors:**
- Success: [#00FF00]
- Error: [#FF0000]
- Warning: [#FFA500]
- Info: [#0000FF]

## TYPOGRAPHY

**Font Stack:**
- Headings: [e.g., "Inter", "Helvetica Neue", "Arial"]
- Body: [e.g., "Inter", "system-ui"]
- Mono: [e.g., "Courier New", "monospace"]

**Font Weights:**
- Regular: 400
- Medium: 500
- Bold: 700
- Black: 900

**Font Sizes:**
- H1: [48px]
- H2: [36px]
- H3: [24px]
- H4: [20px]
- Body: [16px]
- Small: [14px]

## DESIGN SYSTEM

**Borders:**
- Width: [2px] (use 0px for no borders)
- Radius: [0px] (0px = sharp corners, 4px+ = rounded)
- Style: [solid] (solid, dashed, dotted)

**Spacing Scale:**
- Use consistent spacing: 4px, 8px, 16px, 24px, 32px, 48px, 64px

**Shadows:**
- [None] or [Subtle drop shadows] or [Bold shadows]

**Animations:**
- Hover transitions: [0.2s ease]
- Page transitions: [Fade] or [Slide] or [None]

## REQUIRED PAGES (MUST INCLUDE ALL)

### Core Shopify Pages (Dynamic - will use Shopify data)
1. **Home** (`/`) - Homepage with hero, featured products, collections
2. **Collection** (`/collections/:handle`) - Product grid with filters
3. **Product** (`/products/:handle`) - Product detail with variants
4. **Cart** (`/cart`) - Shopping cart
5. **Search** (`/search`) - Product search with filters
6. **Sale** (`/collections/sale`) - Sale products page

### Static Content Pages (Will convert to Shopify pages)
7. **About** (`/pages/about`) - About the brand
8. **Contact** (`/pages/contact`) - Contact form
9. **FAQ** (`/pages/faq`) - Frequently asked questions
10. **Shipping** (`/pages/shipping`) - Shipping information
11. **Privacy** (`/pages/privacy`) - Privacy policy
12. **Terms** (`/pages/terms`) - Terms of service
13. **Size Guide** (`/pages/size-guide`) - Size chart

### Enhanced Pages (Optional but recommended)
14. **Blog** (`/blogs/news`) - Blog listing page
15. **Blog Article** (`/blogs/news/:article`) - Individual blog post
16. **Lookbook** (`/pages/lookbook`) - Visual product galleries
17. **Press** (`/pages/press`) - Press mentions
18. **Careers** (`/pages/careers`) - Job listings
19. **Wishlist** (`/wishlist`) - Saved products
20. **Account** (`/account`) - Customer account page
21. **404** (`/404`) - Not found page

## PRODUCT PAGE LAYOUT VARIANTS

Create THREE product layout variants that can be toggled:

**Variant 1: Classic Layout**
- Gallery on left (60%), details on right (40%)
- Sticky add-to-cart button
- Tabs for description, details, shipping

**Variant 2: Full-Width Gallery**
- Full-width image carousel at top
- Product info centered below
- Accordion for details sections

**Variant 3: Split Minimal**
- 50/50 split
- Large single image (no carousel initially)
- Minimal product info
- Click to see more details

## COLLECTION PAGE LAYOUT VARIANTS

Create THREE collection layout variants:

**Variant 1: Grid with Sidebar**
- Filters in left sidebar (desktop)
- 3-4 column product grid
- Sort dropdown top-right

**Variant 2: Full-Width Grid**
- No sidebar
- Filter bar at top (horizontal)
- 4-5 column product grid

**Variant 3: List View**
- 2 column layout
- Larger product cards with more info
- Filter sidebar (collapsible)

## BLOG PAGE LAYOUT VARIANTS

Create TWO blog layout variants:

**Variant 1: Magazine Grid**
- Featured article (large card)
- Grid of smaller article cards
- Category filter sidebar

**Variant 2: Simple List**
- Single column
- Large article previews
- Minimal sidebar

## COMPONENT REQUIREMENTS

### Header/Navigation
- Logo (centered or left-aligned per design style)
- Main navigation (Shop, New Arrivals, Collections, About)
- Search icon
- Cart icon with item count
- Mobile hamburger menu

### Footer
- Newsletter signup
- Social media links (Instagram, TikTok, Pinterest, Twitter, Facebook)
- Footer nav columns (Shop, About, Help, Legal)
- Payment icons
- Copyright notice

### Product Card
- Product image (3:4 aspect ratio)
- Hover image (second product image)
- Product title
- Price (with compare-at price strikethrough for sales)
- Sale badge
- Quick add button (optional)
- Custom badges (New, Bestseller, etc.)

### Cart Drawer
- Slide-in from right
- Line items with image, title, price, quantity
- Quantity +/- controls
- Remove item button
- Subtotal
- Checkout button
- Continue shopping button
- Empty state

### Hero Section
- Full-width or constrained container
- Split layout or centered content
- Background image or solid color
- Primary CTA button
- Secondary CTA button (optional)

### Featured Collection Tiles
- 3-5 column grid (responsive)
- Collection image
- Collection title overlay
- Hover effect

### Newsletter Signup
- Email input
- Submit button
- Success message
- Error handling

### Product Filter/Sort
- Filter by: Category, Size, Color, Price Range
- Sort by: Best Selling, Price Low-High, Price High-Low, Newest
- Active filters display
- Clear all filters

## TECHNICAL REQUIREMENTS

**Framework:**
- React 18+
- TypeScript
- Vite for build
- TailwindCSS for styling

**State Management:**
- React Context for cart
- TanStack Query for data fetching (if needed)

**Routing:**
- React Router or Wouter

**Components:**
- Radix UI or shadcn/ui for accessible components
- Framer Motion for animations (optional)

**Code Quality:**
- TypeScript strict mode
- Proper type definitions
- Component composition (no massive monoliths)
- Reusable UI components

**Performance:**
- Lazy load images
- Code splitting for routes
- Optimized bundle size
- Responsive images with srcset

**Accessibility:**
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation
- Focus states on interactive elements
- Alt text on all images
- Color contrast ≥ 4.5:1

## SHOPIFY PREPARATION

**This app will be converted to Shopify Liquid. Therefore:**

1. **Use Static Data** - Create mock products/collections in `/src/data/`
2. **Avoid Complex State** - Keep state management simple (will convert to Shopify objects)
3. **No External APIs** - All data should be local (will use Shopify APIs later)
4. **Standard URL Patterns** - Use Shopify-style URLs:
   - Products: `/products/:handle`
   - Collections: `/collections/:handle`
   - Pages: `/pages/:handle`
   - Blogs: `/blogs/:blog/articles/:handle`

5. **Metafield-Ready Product Data** - Include custom fields in mock data:
   ```typescript
   interface Product {
     id: string;
     title: string;
     handle: string;
     price: number;
     compareAtPrice?: number; // For sale pricing
     images: string[];
     description: string;
     // Custom metafields (will convert to Shopify metafields)
     size?: string;
     color?: string;
     material?: string;
     era?: string; // For vintage items
     condition?: string; // For vintage items
     measurements?: { chest: string; waist: string; length: string; };
   }
   ```

## FILE STRUCTURE

```
/
├── client/
│   └── src/
│       ├── components/
│       │   ├── ui/              # Reusable UI components
│       │   ├── Navigation.tsx
│       │   ├── Footer.tsx
│       │   ├── ProductCard.tsx
│       │   ├── CartDrawer.tsx
│       │   ├── ProductGrid.tsx
│       │   ├── FeaturedSection.tsx
│       │   └── ...
│       ├── pages/
│       │   ├── Home.tsx
│       │   ├── Collection.tsx
│       │   ├── Product.tsx
│       │   ├── Cart.tsx
│       │   ├── Search.tsx
│       │   ├── About.tsx
│       │   ├── Contact.tsx
│       │   ├── FAQ.tsx
│       │   ├── Privacy.tsx
│       │   ├── Terms.tsx
│       │   ├── Shipping.tsx
│       │   ├── SizeGuide.tsx
│       │   ├── Blog.tsx
│       │   ├── BlogArticle.tsx
│       │   ├── Lookbook.tsx
│       │   ├── Press.tsx
│       │   ├── Careers.tsx
│       │   ├── Wishlist.tsx
│       │   ├── Account.tsx
│       │   └── not-found.tsx
│       ├── data/
│       │   ├── products.ts      # Mock product data
│       │   ├── collections.ts   # Mock collection data
│       │   ├── blog.ts          # Mock blog posts
│       │   └── site.ts          # Site settings
│       ├── hooks/
│       │   ├── useCart.tsx      # Cart context/hook
│       │   └── useWishlist.tsx  # Wishlist hook
│       ├── lib/
│       │   └── utils.ts         # Utility functions
│       ├── App.tsx
│       ├── main.tsx
│       └── index.css            # Global styles
├── server/                       # Backend (optional, for future Shopify integration)
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## RESPONSIVE BREAKPOINTS

**Mobile First Approach:**
```css
/* Mobile: 320px - 767px (default) */
/* Tablet: 768px - 1023px */
@media (min-width: 768px) { ... }

/* Desktop: 1024px+ */
@media (min-width: 1024px) { ... }

/* Large Desktop: 1440px+ */
@media (min-width: 1440px) { ... }
```

**Grid Breakpoints:**
- Mobile: 1-2 columns
- Tablet: 2-3 columns
- Desktop: 3-4 columns
- Large Desktop: 4-5 columns

## MOCK DATA GUIDELINES

**Products:**
- Create at least 20-30 mock products
- Variety of prices ($20 - $500)
- Mix of sale and regular pricing
- Multiple images per product (3-5)
- Realistic product titles and descriptions
- Various categories/types

**Collections:**
- Create 5-10 collections
- "New Arrivals", "Bestsellers", "Sale"
- Category collections (Tops, Bottoms, Outerwear, Accessories)
- Each collection should have 8-16 products

**Blog Posts:**
- Create 5-10 blog posts
- Mix of styling guides, brand stories, product features
- Include featured images
- Varied publish dates

## DESIGN INSPIRATION KEYWORDS

**For Replit Agent to reference:**
[e.g., "Streetwear", "Minimalism", "Y2K", "Brutalism", "Vintage", "Luxury", "Grunge", "Clean", "Maximalist", "Retro"]

## SPECIAL FEATURES (OPTIONAL)

- [ ] Size recommendation tool
- [ ] Product comparison
- [ ] Recently viewed products
- [ ] Customer reviews/ratings
- [ ] Product bundling
- [ ] Gift cards
- [ ] Store locator
- [ ] Live chat widget
- [ ] Currency selector
- [ ] Language selector
- [ ] Countdown timer for sales
- [ ] Stock level indicator
- [ ] Pre-order functionality

## CODE QUALITY & BEST PRACTICES

**For clean, maintainable code:**

1. **Prefer vanilla JavaScript** for interactive features (easier to maintain)
2. **Use CSS variables** for theming (makes customization easier)
3. **Component-scoped styles** (keeps styles organized)
4. **Semantic HTML** (better accessibility and SEO)
5. **Props-based components** (clean data flow)
6. **No overly complex patterns** (keep it simple and readable)

---

## FINAL DELIVERABLE

A fully functional, beautiful, responsive e-commerce website that:
- ✅ Includes ALL required pages (21+ pages)
- ✅ Has consistent design aesthetic throughout
- ✅ Works perfectly on mobile, tablet, and desktop
- ✅ Has accessible components with proper ARIA labels
- ✅ Includes product/collection/blog layout variants
- ✅ Uses proper TypeScript with type safety
- ✅ Has realistic mock data for demonstration
- ✅ Follows Shopify URL patterns and data structure
- ✅ Is production-ready and performant

Build this app now.
```

---

## CUSTOMIZATION EXAMPLES

### Example 1: Minimalist Luxury Theme

```
**Theme Name**: Luxe Minimal
**Design Style**: Minimalist luxury boutique
**Color Palette**:
  - Background: #FAFAFA
  - Text: #1A1A1A
  - Accent: #C9A96E (gold)
  - Secondary Background: #FFFFFF
**Typography**:
  - Headings: "Playfair Display"
  - Body: "Inter"
**Borders**:
  - Width: 1px
  - Radius: 0px
  - Style: solid
**Shadows**: Subtle drop shadows
```

### Example 2: Grungy Streetwear Theme

```
**Theme Name**: Street Canvas
**Design Style**: Grungy urban streetwear
**Color Palette**:
  - Background: #FFFFFF
  - Text: #000000
  - Accent: #FF0000
  - Secondary Background: #F0F0F0
**Typography**:
  - Headings: "Helvetica Neue"
  - Body: "Arial"
**Borders**:
  - Width: 2px
  - Radius: 0px (sharp corners)
  - Style: solid
**Shadows**: None
**Design Keywords**: "Brutalism", "Streetwear", "Grunge", "Raw"
```

### Example 3: Y2K Retro Theme

```
**Theme Name**: Retro Wave
**Design Style**: Y2K retro vibrant
**Color Palette**:
  - Background: #FF00FF
  - Text: #00FFFF
  - Accent: #FFFF00
  - Secondary Background: #000000
**Typography**:
  - Headings: "Comic Sans MS" or "Arial Black"
  - Body: "Verdana"
**Borders**:
  - Width: 3px
  - Radius: 8px
  - Style: solid
**Shadows**: Bold colorful shadows
**Design Keywords**: "Y2K", "Retro", "Vibrant", "Nostalgic", "2000s"
```

---

## POST-GENERATION CHECKLIST

After Replit Agent generates the app:

- [ ] All pages present (21+ pages)
- [ ] Navigation works
- [ ] Cart functionality works
- [ ] Responsive on all breakpoints
- [ ] Mock data loads correctly
- [ ] TypeScript compiles with no errors
- [ ] Design aesthetic consistent throughout
- [ ] Ready for CLEANREP conversion

---

**Save this prompt template and customize it for each new Shopify theme you want to create with Replit Agent.**
