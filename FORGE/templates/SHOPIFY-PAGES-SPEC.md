# SHOPIFY THEME PAGES SPECIFICATION

**Purpose**: Standard page structure for all Shopify themes
**Based on**: Replit-generated themes + Shopify best practices

---

## PAGE CATEGORIES

Pages are divided into **4 categories**:

1. **Dynamic Shopify Pages** - Use Shopify data (products, collections, cart)
2. **Static Content Pages** - Marketing/informational content
3. **Customer Account Pages** - Login, registration, account management
4. **Special/Optional Pages** - Enhanced features

---

## 1. DYNAMIC SHOPIFY PAGES (REQUIRED)

These pages use Shopify's dynamic data and are **mandatory** for e-commerce functionality.

### 1.1 Home (`/`)
**Template**: `templates/index.liquid` or `templates/index.json`
**Purpose**: Homepage
**Sections typically include**:
- Hero banner
- Featured collections (3-5 tiles)
- Featured products grid
- New arrivals
- Brand story/values
- Newsletter signup
- Instagram feed (optional)

### 1.2 Collection (`/collections/:handle`)
**Template**: `templates/collection.liquid`
**Purpose**: Product listing page with filters
**Features**:
- Product grid (3-4 columns desktop, 2 mobile)
- Filter sidebar (category, size, color, price)
- Sort dropdown (best selling, price, newest)
- Pagination
- Collection description
- Product count
**Layout Variants**:
- v1: Grid with left sidebar
- v2: Full-width grid with top filter bar
- v3: List view with detailed cards

### 1.3 Product (`/products/:handle`)
**Template**: `templates/product.liquid`
**Purpose**: Individual product page
**Features**:
- Image gallery (3-5 images)
- Product title
- Price (with compare-at price for sales)
- Variant selector (size, color, etc.)
- Quantity selector
- Add to cart button
- Product description (tabs or accordion)
- Shipping/returns info
- Size guide link
- Related products
**Layout Variants**:
- v1: Classic (gallery left, details right)
- v2: Full-width gallery with details below
- v3: Split minimal (50/50)

### 1.4 Cart (`/cart`)
**Template**: `templates/cart.liquid` (or drawer via snippet)
**Purpose**: Shopping cart page/drawer
**Features**:
- Line items (image, title, variant, price, quantity)
- Quantity controls
- Remove item button
- Subtotal
- Shipping calculator (optional)
- Promo code input
- Checkout button
- Continue shopping link
- Empty state

### 1.5 Search (`/search`)
**Template**: `templates/search.liquid`
**Purpose**: Product search results
**Features**:
- Search query input
- Results grid (same as collection)
- Filter/sort options
- "No results" state with suggestions
- Search suggestions/autocomplete

### 1.6 Sale/All Products (`/collections/sale` or `/collections/all`)
**Template**: Uses `collection.liquid`
**Purpose**: Sale items or all products
**Features**:
- Same as collection page
- Highlight sale badges
- Sort by discount % (optional)

---

## 2. STATIC CONTENT PAGES (REQUIRED)

These are **Shopify Pages** (created in admin) rendered via `templates/page.liquid`.

### 2.1 About (`/pages/about`)
**Purpose**: Brand story, mission, values
**Content**:
- Brand origin story
- Mission statement
- Team photos/bios
- Timeline (optional)
- Press mentions
- Certifications/awards

### 2.2 Contact (`/pages/contact`)
**Purpose**: Contact information and form
**Content**:
- Contact form (name, email, message)
- Email address
- Phone number (optional)
- Physical address (if applicable)
- Business hours
- Map (optional)
- Social media links

### 2.3 FAQ (`/pages/faq`)
**Purpose**: Frequently asked questions
**Content**:
- Accordion-style Q&A
- Categories: Ordering, Shipping, Returns, Products, Account
- Search FAQ (optional)

### 2.4 Shipping & Returns (`/pages/shipping`)
**Purpose**: Shipping and return policies
**Content**:
- Shipping rates/times by region
- Free shipping thresholds
- International shipping info
- Return policy (timeframe, conditions)
- Return process instructions
- Exchange policy

### 2.5 Size Guide (`/pages/size-guide`)
**Purpose**: Size charts and fit information
**Content**:
- Size charts (measurements tables)
- How to measure instructions
- Fit guide (true to size, runs small/large)
- Size conversion charts (US/UK/EU)

### 2.6 Privacy Policy (`/pages/privacy`)
**Purpose**: Privacy and data protection policy
**Content**:
- Data collection practices
- Cookie usage
- Third-party sharing
- User rights (GDPR, CCPA)
- Contact for privacy concerns

### 2.7 Terms of Service (`/pages/terms`)
**Purpose**: Terms and conditions
**Content**:
- Purchase terms
- User conduct rules
- Intellectual property rights
- Limitation of liability
- Dispute resolution

---

## 3. CUSTOMER ACCOUNT PAGES (REQUIRED FOR CUSTOMER ACCOUNTS)

These use Shopify's customer account templates.

### 3.1 Login (`/account/login`)
**Template**: `templates/customers/login.liquid`
**Features**:
- Email/password login form
- "Forgot password" link
- Create account link
- Social login (optional)

### 3.2 Register (`/account/register`)
**Template**: `templates/customers/register.liquid`
**Features**:
- First/last name
- Email
- Password (with confirmation)
- Marketing opt-in checkbox

### 3.3 Account Dashboard (`/account`)
**Template**: `templates/customers/account.liquid`
**Features**:
- Order history
- Account details
- Saved addresses
- Wishlist link (if implemented)
- Logout button

### 3.4 Order History (`/account/orders/:id`)
**Template**: `templates/customers/order.liquid`
**Features**:
- Order details
- Line items
- Shipping address
- Billing address
- Order status/tracking

### 3.5 Addresses (`/account/addresses`)
**Template**: `templates/customers/addresses.liquid`
**Features**:
- Saved addresses list
- Add new address
- Edit/delete addresses
- Set default address

### 3.6 Reset Password (`/account/reset/:id/:token`)
**Template**: `templates/customers/reset_password.liquid`
**Features**:
- New password input
- Password confirmation
- Submit button

---

## 4. SPECIAL/OPTIONAL PAGES

These enhance the store but aren't mandatory.

### 4.1 Blog (`/blogs/:blog`)
**Template**: `templates/blog.liquid`
**Purpose**: Blog post listing
**Features**:
- Blog post cards (image, title, excerpt, date)
- Pagination
- Categories/tags filter
- Search (optional)
**Layout Variants**:
- v1: Magazine grid (featured + grid)
- v2: Simple list

### 4.2 Blog Article (`/blogs/:blog/:article`)
**Template**: `templates/article.liquid`
**Purpose**: Individual blog post
**Features**:
- Featured image
- Article title
- Author/date
- Article content (rich text)
- Tags
- Social share buttons
- Related articles
- Comments (if enabled)

### 4.3 Lookbook (`/pages/lookbook`)
**Purpose**: Visual product galleries/styling inspiration
**Content**:
- Image galleries
- Shoppable looks
- Product tags on images
- Seasonal collections

### 4.4 Press (`/pages/press`)
**Purpose**: Press mentions and media coverage
**Content**:
- Press logos
- Article excerpts/links
- Press kit download
- Media contact info

### 4.5 Careers (`/pages/careers`)
**Purpose**: Job openings
**Content**:
- Open positions list
- Application form/link
- Company culture info
- Benefits overview

### 4.6 Wholesale (`/pages/wholesale`)
**Purpose**: B2B/wholesale inquiries
**Content**:
- Wholesale benefits
- Minimum order quantities
- Application form
- Contact info

### 4.7 Stockists (`/pages/stockists`)
**Purpose**: Physical store locations or retailers
**Content**:
- Store locator map
- Store list with addresses
- Hours of operation
- Contact info per location

### 4.8 Wishlist (`/pages/wishlist` or `/wishlist`)
**Purpose**: Saved products (requires custom implementation)
**Features**:
- Saved product grid
- Remove from wishlist
- Add to cart from wishlist
- Share wishlist (optional)

### 4.9 Gift Cards (`/products/gift-card`)
**Template**: `templates/gift_card.liquid`
**Purpose**: Purchase gift cards
**Features**:
- Gift card amounts
- Custom message
- Recipient email (optional)

### 4.10 Password Page (`/password`)
**Template**: `templates/password.liquid`
**Purpose**: Store password protection (for stores under development)
**Features**:
- Password input
- Store logo
- Coming soon message
- Newsletter signup (optional)

### 4.11 404 Not Found (`/404`)
**Template**: `templates/404.liquid`
**Purpose**: Error page for broken links
**Features**:
- Error message
- Search bar
- Link to home
- Popular products/collections

### 4.12 List Collections (`/collections`)
**Template**: `templates/list-collections.liquid`
**Purpose**: All collections directory
**Features**:
- Collection tiles grid
- Collection descriptions
- Product count per collection

---

## PAGES COMPARISON: REPLIT vs SHOPIFY

### Standard Across All Replit Themes (21 pages found):

| Replit Page | Shopify Template | Category | Priority |
|-------------|-----------------|----------|----------|
| Home | `index.liquid` | Dynamic | ✅ Required |
| Collection | `collection.liquid` | Dynamic | ✅ Required |
| Product | `product.liquid` | Dynamic | ✅ Required |
| Cart | `cart.liquid` | Dynamic | ✅ Required |
| Search | `search.liquid` | Dynamic | ✅ Required |
| Sale | `collection.liquid` | Dynamic | Recommended |
| About | `page.liquid` | Static | ✅ Required |
| Contact | `page.liquid` | Static | ✅ Required |
| FAQ | `page.liquid` | Static | ✅ Required |
| Shipping | `page.liquid` | Static | ✅ Required |
| Size Guide | `page.liquid` | Static | Recommended |
| Privacy | `page.liquid` | Static | ✅ Required (legal) |
| Terms | `page.liquid` | Static | ✅ Required (legal) |
| Blog | `blog.liquid` | Special | Recommended |
| Blog Article | `article.liquid` | Special | Recommended |
| Lookbook | `page.liquid` | Special | Optional |
| Press | `page.liquid` | Special | Optional |
| Careers | `page.liquid` | Special | Optional |
| Wishlist | Custom | Special | Optional |
| Account | `customers/account.liquid` | Account | If accounts enabled |
| 404 | `404.liquid` | Special | ✅ Required |

### Additional Shopify-Required Pages (Not in Replit):

| Page | Template | Why Needed |
|------|----------|-----------|
| Gift Card | `gift_card.liquid` | Shopify gift card feature |
| Password | `password.liquid` | Store password protection |
| List Collections | `list-collections.liquid` | Collections directory |
| Login | `customers/login.liquid` | Customer accounts |
| Register | `customers/register.liquid` | Customer accounts |
| Addresses | `customers/addresses.liquid` | Customer accounts |
| Order | `customers/order.liquid` | Customer accounts |
| Reset Password | `customers/reset_password.liquid` | Customer accounts |

---

## RECOMMENDED PAGE STRUCTURE FOR ALL THEMES

### Tier 1: Absolutely Required (11 pages)
1. Home
2. Collection
3. Product
4. Cart
5. Search
6. About
7. Contact
8. FAQ
9. Shipping
10. Privacy
11. Terms

### Tier 2: Strongly Recommended (6 pages)
12. Sale
13. Size Guide
14. Blog
15. Blog Article
16. 404
17. List Collections

### Tier 3: Customer Accounts (if enabled) (6 pages)
18. Login
19. Register
20. Account Dashboard
21. Order History
22. Addresses
23. Reset Password

### Tier 4: Enhanced Features (optional) (5+ pages)
24. Lookbook
25. Press
26. Careers
27. Wholesale
28. Stockists
29. Wishlist
30. Gift Card
31. Password

---

## CONVERSION NOTES FOR CLEANREP AGENT

When converting Replit React apps to Shopify Liquid:

**Pages → Templates Mapping:**

```
Replit Page File              →  Shopify Template
─────────────────────────────────────────────────────
Home.tsx                      →  templates/index.liquid
Collection.tsx                →  templates/collection.liquid
Product.tsx                   →  templates/product.liquid
Cart.tsx                      →  templates/cart.liquid
Search.tsx                    →  templates/search.liquid
Blog.tsx                      →  templates/blog.liquid
BlogArticle.tsx               →  templates/article.liquid
About.tsx                     →  templates/page.liquid (use for all static pages)
Contact.tsx                   →  templates/page.liquid
FAQ.tsx                       →  templates/page.liquid
Shipping.tsx                  →  templates/page.liquid
SizeGuide.tsx                 →  templates/page.liquid
Privacy.tsx                   →  templates/page.liquid
Terms.tsx                     →  templates/page.liquid
Lookbook.tsx                  →  templates/page.liquid
Press.tsx                     →  templates/page.liquid
Careers.tsx                   →  templates/page.liquid
Account.tsx                   →  templates/customers/account.liquid
not-found.tsx                 →  templates/404.liquid
```

**Pages Shopify Creates Automatically:**
- Login, Register, Addresses, Order, Reset Password
- Gift Card (if using Shopify gift cards)
- Password (for password-protected stores)

**CLEANREP should:**
1. Create `page.liquid` template (handles all `/pages/*` routes)
2. Create specific templates for dynamic pages (product, collection, etc.)
3. Create customer account templates if Account.tsx exists
4. Convert unique page layouts to Liquid sections (reusable across pages)

---

## QUALITY CHECKLIST

Before deploying a theme, verify:

**Required Pages Present:**
- [ ] Home (index.liquid)
- [ ] Collection (collection.liquid)
- [ ] Product (product.liquid)
- [ ] Cart (cart.liquid)
- [ ] Search (search.liquid)
- [ ] About (page.liquid)
- [ ] Contact (page.liquid)
- [ ] FAQ (page.liquid)
- [ ] Shipping (page.liquid)
- [ ] Privacy (page.liquid)
- [ ] Terms (page.liquid)
- [ ] 404 (404.liquid)

**Customer Account Pages (if applicable):**
- [ ] Login (customers/login.liquid)
- [ ] Register (customers/register.liquid)
- [ ] Account (customers/account.liquid)
- [ ] Order (customers/order.liquid)
- [ ] Addresses (customers/addresses.liquid)
- [ ] Reset Password (customers/reset_password.liquid)

**Optional but Recommended:**
- [ ] Size Guide (page.liquid)
- [ ] Blog (blog.liquid)
- [ ] Blog Article (article.liquid)
- [ ] List Collections (list-collections.liquid)

**Navigation Setup:**
- [ ] Header includes all main pages
- [ ] Footer includes legal pages (Privacy, Terms, Shipping)
- [ ] Mobile menu includes all navigation

---

**This specification defines the standard page structure for all Shopify themes created via Replit or manually.**
