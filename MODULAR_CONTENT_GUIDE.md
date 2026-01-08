# Complete Modular Content System

This guide explains the modular content system for Forgotten Essentials, allowing the owner to manage all website content through Shopify Admin without touching code.

## Current Status

### ✅ Fully Modular (Ready to Use)

1. **Hero Section** - Image, title, description, label, buttons
2. **All Products** - Everything about products
3. **All Collections** - Names, images, descriptions
4. **Instagram Feed** - Up to 50 posts with images, links, captions

### 🔧 Infrastructure Ready (Needs Component Updates)

The following metaobjects have GraphQL queries, TypeScript interfaces, hooks, and mock data ready:

1. **Site Settings** - Brand name, description, social media links
2. **Home Page Sections** - Section headings and link text
3. **Value Items** - The 4 value boxes on homepage (icons, titles, descriptions)

### ❌ Not Yet Implemented

- Footer content metaobject
- About page content metaobject
- Header/navigation items

---

## How to Complete the Modular System

### Phase 1: Update Homepage (Partially Done)

The infrastructure is ready. To complete:

#### Update Home.tsx to use dynamic sections:

Replace section headings with:
```tsx
const { sections } = useHomeSections();

// Then use:
<h2>{sections?.categoriesHeading}</h2>
<h2>{sections?.featuredHeading}</h2>
<Link to="/shop">{sections?.featuredLinkText}</Link>
```

#### Update Value Items section:

Replace the hardcoded 4 boxes with:
```tsx
const { items: valueItems } = useValueItems(10);

// Then map over them:
{valueItems.map(item => (
  <div key={item.id} className="value-item">
    {iconMap[item.icon]}
    <h3>{item.title}</h3>
    <p>{item.description}</p>
  </div>
))}
```

### Phase 2: Update Footer

**Create Footer Hook:**

```typescript
export interface FooterContent {
  id: string;
  brandName: string;
  brandDescription: string;
  // Add footer link sections as JSON
}

export function useFooterContent() {
  // Similar pattern to useHeroContent
}
```

**Update Footer.tsx:**
- Use `useSiteSettings()` for brand name, description, social links
- Use `useFooterContent()` for footer sections and links

### Phase 3: Update InstagramFeed Header

**Update InstagramFeed.tsx:**
- Use `useSiteSettings()` for Instagram handle in header
- Use settings.instagramUrl for "Follow on Instagram" button

### Phase 4: Update About Page (Optional)

Create metaobject for all About page content sections.

---

## Shopify Admin Setup Instructions

### 1. Site Settings Metaobject

**Create Definition:**
1. Go to Settings → Custom data → Metaobjects
2. Click "Add definition"
3. Name: `Site Settings`, Type: `site_settings`

**Add Fields:**

| Field Name | Key | Type | Required |
|------------|-----|------|----------|
| Brand Name | `brand_name` | Single line text | Yes |
| Brand Description | `brand_description` | Multi-line text | Yes |
| Instagram URL | `instagram_url` | Single line text | Yes |
| Facebook URL | `facebook_url` | Single line text | Yes |
| TikTok URL | `tiktok_url` | Single line text | Yes |
| Instagram Handle | `instagram_handle` | Single line text | Yes |

**Create Entry:**
- Brand Name: `FORGOTTEN ESSENTIALS`
- Brand Description: `Thoughtfully sourced vintage and pre-loved clothing for the conscious consumer.`
- Instagram URL: `https://instagram.com/forgottenessentials`
- Facebook URL: `https://facebook.com/forgottenessentials`
- TikTok URL: `https://tiktok.com/@forgottenessentials`
- Instagram Handle: `@forgottenessentials`

### 2. Home Sections Metaobject

**Create Definition:**
1. Name: `Home Sections`, Type: `home_sections`

**Add Fields:**

| Field Name | Key | Type |
|------------|-----|------|
| Categories Heading | `categories_heading` | Single line text |
| Featured Heading | `featured_heading` | Single line text |
| Featured Link Text | `featured_link_text` | Single line text |
| New Arrivals Heading | `new_arrivals_heading` | Single line text |
| New Arrivals Link Text | `new_arrivals_link_text` | Single line text |

**Create Entry:**
- Categories Heading: `Shop by Category`
- Featured Heading: `Featured Pieces`
- Featured Link Text: `View All`
- New Arrivals Heading: `New Arrivals`
- New Arrivals Link Text: `View All`

### 3. Value Item Metaobject

**Create Definition:**
1. Name: `Value Item`, Type: `value_item`

**Add Fields:**

| Field Name | Key | Type | Required |
|------------|-----|------|----------|
| Icon | `icon` | Single line text | Yes |
| Title | `title` | Single line text | Yes |
| Description | `description` | Multi-line text | Yes |
| Order | `order` | Integer | Yes |

**Icon Options:**
- `shield` - Authenticated icon
- `cloud` - Sustainable icon
- `heart` - Curated icon
- `credit-card` - Secure Checkout icon

**Create 4 Entries:**

**Entry 1:**
- Icon: `shield`
- Title: `Authenticated`
- Description: `Every piece verified for authenticity by our expert team.`
- Order: `1`

**Entry 2:**
- Icon: `cloud`
- Title: `Sustainable`
- Description: `Extending the lifecycle of beautiful clothing, one piece at a time.`
- Order: `2`

**Entry 3:**
- Icon: `heart`
- Title: `Curated`
- Description: `Only the finest pieces make it into our collection.`
- Order: `3`

**Entry 4:**
- Icon: `credit-card`
- Title: `Secure Checkout`
- Description: `Shop confidently with our secure payment processing.`
- Order: `4`

---

## Already Documented Metaobjects

- **Hero Section** - See [HERO_SETUP.md](./HERO_SETUP.md)
- **Instagram Posts** - See [INSTAGRAM_SETUP.md](./INSTAGRAM_SETUP.md)

---

## Summary: What's Modular Now

| Content | Status | Owner Can Edit |
|---------|--------|----------------|
| Hero section | ✅ Complete | Yes - via Shopify |
| Products | ✅ Complete | Yes - via Shopify |
| Collections | ✅ Complete | Yes - via Shopify |
| Instagram posts | ✅ Complete | Yes - via Shopify |
| Homepage section headings | 🔧 Ready (needs component update) | Yes - once updated |
| Value boxes (4 boxes) | 🔧 Ready (needs component update) | Yes - once updated |
| Brand name/social links | 🔧 Ready (needs component update) | Yes - once updated |
| Footer content | ❌ Not yet | No - requires code |
| About page | ❌ Not yet | No - requires code |
| Header navigation | ❌ Not yet | No - requires code |

---

## Benefits of Full Modular System

1. **No Code Changes** - Owner updates content entirely through Shopify Admin
2. **Preview Mode** - All content works in preview mode with mock data
3. **Flexible** - Owner can change any text, image, or link
4. **Maintainable** - Clear separation between code and content
5. **Scalable** - Easy to add new sections or content types

---

## Next Steps

### To Complete Homepage Modularity:

1. Update `Home.tsx` to use `sections` for all headings
2. Update `Home.tsx` to use `valueItems` for the 4 boxes
3. Test in preview mode
4. Set up metaobjects in Shopify Admin
5. Test with real Shopify data

### To Make Footer Modular:

1. Create footer_content GraphQL query
2. Create useFooterContent hook
3. Update Footer.tsx component
4. Add mockFooterContent
5. Create Shopify metaobject
6. Test and document

### To Make Everything Modular:

Complete the above steps for every section of the site that contains hardcoded text or images.

---

## Technical Notes

- All hooks follow the same pattern as `useHeroContent`
- All metaobjects use the Shopify Storefront API
- Mock data ensures preview mode works without Shopify
- Field keys use snake_case (e.g., `brand_name`)
- TypeScript interfaces use camelCase (e.g., `brandName`)
- Order fields control display order (1, 2, 3, etc.)

---

## Questions?

The infrastructure for modular content is in place. To complete the system:
1. Update components to use the hooks (already created)
2. Set up metaobjects in Shopify Admin (instructions provided)
3. Test in both preview and live modes

All the hard work (GraphQL queries, TypeScript types, hooks, mock data) is done. It's just a matter of updating the JSX in each component to use the dynamic data instead of hardcoded strings.
