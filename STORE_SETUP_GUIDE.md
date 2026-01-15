# Forgotten Essentials Store Setup Guide

Welcome! This guide will walk you through setting up your Shopify store with your new custom theme.

## Table of Contents
1. [Initial Theme Setup](#initial-theme-setup)
2. [Creating Collections](#creating-collections)
3. [Adding Products](#adding-products)
4. [Configuring the Homepage](#configuring-the-homepage)
5. [Setting Up Navigation](#setting-up-navigation)
6. [Adding Instagram Posts](#adding-instagram-posts)
7. [Uploading Images](#uploading-images)
8. [Going Live](#going-live)

---

## Initial Theme Setup

### 1. Access Your Theme
1. Log into your Shopify Admin at `forgotten-essential.myshopify.com/admin`
2. Go to **Online Store** → **Themes**
3. Find your development theme: **"Development (f0b543-DESKTOP-VNC9CRH)"**
4. Click **Customize** to open the Theme Editor

### 2. Configure Basic Settings
1. In the Theme Editor, click the **Theme settings** icon (gear icon) in the left sidebar
2. Set your:
   - Logo (if you have one)
   - Brand colors
   - Typography preferences
   - Social media links

---

## Creating Collections

Collections are how you organize your products. Start by creating these recommended collections:

### Step-by-Step: Create a Collection

1. In Shopify Admin, go to **Products** → **Collections**
2. Click **Create collection**
3. Fill in the details:
   - **Title**: e.g., "New Arrivals"
   - **Description**: Brief description of the collection
   - **Collection type**: Choose one:
     - **Manual**: You add products yourself (recommended for curated stores)
     - **Automated**: Products are added based on rules you set

### Recommended Collections to Create

#### Essential Collections:
1. **New Arrivals** (Manual)
   - For your latest additions
   - Update this regularly with new inventory

2. **Outerwear** (Manual or Automated)
   - Jackets, coats, blazers
   - If automated, use condition: `Product type equals Jacket OR Coat OR Blazer`

3. **Dresses** (Manual or Automated)
   - All dresses
   - If automated, use condition: `Product type equals Dress`

4. **Tops** (Manual or Automated)
   - Shirts, blouses, sweaters, t-shirts
   - If automated, use condition: `Product type equals Top OR Shirt OR Blouse`

5. **Bottoms** (Manual or Automated)
   - Pants, jeans, skirts, shorts
   - If automated, use condition: `Product type equals Pants OR Jeans OR Skirt`

6. **Accessories** (Manual or Automated)
   - Bags, jewelry, scarves, belts
   - If automated, use condition: `Product type equals Accessory`

#### Optional Collections:
- **Featured Pieces** - Your best items
- **By Era** - "1980s", "1990s", "2000s" collections
- **By Condition** - "Like New", "Excellent", "Good"
- **Sale** - Discounted items

### Tips for Automated Collections

To create automated collections with tags:
1. Set **Collection type** to **Automated**
2. Add conditions like:
   - `Product tag` contains `outerwear`
   - `Product tag` contains `1990s`
   - `Product type` equals `Jacket`
3. Products matching ALL conditions are automatically added

---

## Adding Products

### Step-by-Step: Add a Product

1. Go to **Products** → **All products**
2. Click **Add product**
3. Fill in all details:

#### Basic Information
- **Title**: Product name (e.g., "Vintage Levi's 501 Jeans")
- **Description**: Detailed description including:
  - Condition
  - Measurements
  - Era/year
  - Brand
  - Material
  - Any flaws or unique features

#### Media
- Upload 3-5 high-quality photos:
  - Front view
  - Back view
  - Detail shots
  - Tag/label (if vintage)
  - Model/flat lay
- Recommended size: At least 1600px wide

#### Pricing
- **Price**: Regular price
- **Compare at price**: Original price (if on sale)

#### Inventory
- **SKU**: Optional tracking code
- **Barcode**: If applicable
- **Quantity**: Number in stock
- Check **Track quantity** to manage inventory

#### Shipping
- **Weight**: Required for shipping calculations

#### Variants
Use variants for different sizes or colors:
1. Click **Add variant**
2. Add options like:
   - Size: S, M, L, XL
   - Color: Black, Blue, etc.
3. Set price and inventory for each variant

#### Product Organization
- **Product type**: e.g., "Jacket", "Dress", "Jeans"
- **Vendor**: Brand name (e.g., "Levi's", "Vintage")
- **Collections**: Select which collections to add this to
- **Tags**: Add descriptive tags:
  - Era: `1990s`, `1980s`, `vintage`
  - Condition: `excellent`, `like-new`, `good`
  - Category: `outerwear`, `denim`, `designer`
  - Style: `casual`, `formal`, `streetwear`

### Recommended Tagging System

Consistent tagging helps with organization and automated collections:

**Era Tags:**
- `1970s`, `1980s`, `1990s`, `2000s`, `vintage`

**Condition Tags:**
- `excellent` - Minimal to no signs of wear
- `like-new` - Barely worn
- `good` - Some signs of wear, still great condition

**Category Tags:**
- `outerwear`, `dress`, `top`, `bottom`, `accessory`, `denim`, `designer`

**Style Tags:**
- `casual`, `formal`, `streetwear`, `minimalist`, `bohemian`

---

## Configuring the Homepage

Now let's customize your homepage to showcase your products and collections.

### 1. Access Theme Customization
1. Go to **Online Store** → **Themes**
2. Click **Customize** on your theme

### 2. Configure the Hero Section

The hero is the first thing visitors see.

1. Click on the **Hero** section at the top
2. In the right panel, configure:
   - **Label**: e.g., "New Arrivals" (small text above title)
   - **Title**: Your main headline (already set to "Curated Vintage & Pre-Loved Fashion")
   - **Description**: Brief description of your store
   - **Hero Image**: Upload a beautiful 1600×2000px image
     - Should represent your brand aesthetic
     - High-quality photo of clothing or styled outfit
   - **Primary Button Text**: e.g., "Shop New Arrivals"
   - **Primary Button Link**: Select `/collections/new-arrivals`
   - **Secondary Button Text**: e.g., "Browse Collections"
   - **Secondary Button Link**: Select `/collections/all`

**Image Tips:**
- Use a vertical image (portrait orientation)
- Show your best pieces or brand aesthetic
- Ensure good lighting and high resolution
- Subject should be centered

### 3. Configure Featured Collections

This section shows category cards (Outerwear, Dresses, etc.)

1. Click on **Featured Collections** section
2. Configure the heading: "Shop by Category"
3. Add collection blocks:
   - Click **Add block** → **Collection**
   - Select a collection (e.g., "Outerwear")
   - Upload an image (or leave empty to use collection featured image)
   - Add custom title (optional - otherwise uses collection name)
   - Repeat for each category (up to 12)

**Recommended Setup:**
- Add 5-6 main categories: Outerwear, Dresses, Tops, Bottoms, Accessories
- Use consistent, high-quality images
- Images should be 800×1000px (3:4 aspect ratio)

### 4. Configure Featured Products

This section shows 4 featured products.

1. Click on **Featured Products** section
2. Configure:
   - **Heading**: "Featured Pieces"
   - **Collection**: Select "Featured Pieces" or "All" to show any products
   - **Number of Products**: 4 (default)
   - **View All Link**: `/collections/featured` or `/collections/all`

### 5. Configure New Arrivals

This is a second product section for new items.

1. Click on **New Arrivals** section (uses same template as Featured Products)
2. Configure:
   - **Heading**: "New Arrivals"
   - **Collection**: Select "New Arrivals"
   - **Number of Products**: 4
   - **View All Link**: `/collections/new-arrivals`

### 6. Configure Values Section

This section shows your brand values with icons.

1. Click on **Values** section
2. Each value block has:
   - **Icon**: Choose from available icons
   - **Title**: Value name (e.g., "Authenticated")
   - **Description**: Brief explanation

**Current values** (feel free to edit):
- Authenticated - "Every piece verified for authenticity by our expert team."
- Sustainable - "Extending the lifecycle of beautiful clothing, one piece at a time."
- Curated - "Only the finest pieces make it into our collection."
- Secure Checkout - "Shop confidently with our secure payment processing."

### 7. Configure Instagram Feed

This section shows an auto-scrolling carousel of Instagram posts.

1. Click on **Instagram Feed** section
2. Configure:
   - **Heading**: "Follow Us @forgottenessentials"
   - **Instagram Profile URL**: Your full Instagram URL
   - **Button Text**: "Follow on Instagram"

3. Add Instagram post blocks:
   - Click **Add block** → **Post**
   - **Post URL**: Link to specific Instagram post
   - **Image**: Upload screenshot of Instagram post
   - **Caption**: Short caption or leave as is
   - Repeat for 6 posts

**Getting Instagram Post URLs:**
- Go to the post on Instagram
- Click the three dots (•••)
- Select "Copy link"
- Paste in the Post URL field

**Image Tips:**
- Take screenshots of your Instagram posts (square format works best)
- Or download with an Instagram downloader tool
- Keep images around 600×600px to 1080×1080px
- Use your best, most engaging posts

---

## Setting Up Navigation

### Main Menu (Header)

1. Go to **Online Store** → **Navigation**
2. Click on **Main menu**
3. Add menu items:
   - **Shop All** → `/collections/all`
   - **New Arrivals** → `/collections/new-arrivals`
   - **Outerwear** → `/collections/outerwear`
   - **Dresses** → `/collections/dresses`
   - **Tops** → `/collections/tops`
   - **Bottoms** → `/collections/bottoms`
   - **Accessories** → `/collections/accessories`
   - **About** → `/pages/about` (create this page)
   - **Contact** → `/pages/contact` (create this page)

### Footer Menus

The footer has three columns. Create these menus:

#### 1. Shop Menu
1. Create a new menu called "Footer - Shop"
2. Add links:
   - New Arrivals
   - All Products
   - Featured Pieces
   - Sale

#### 2. About Menu
1. Create a new menu called "Footer - About"
2. Add links:
   - About Us
   - Our Story
   - Sustainability
   - Blog (if you have one)

#### 3. Help Menu
1. Create a new menu called "Footer - Help"
2. Add links:
   - Contact
   - Shipping & Returns
   - Size Guide
   - FAQ
   - Privacy Policy
   - Terms of Service

Then assign these menus:
1. Go to **Online Store** → **Themes** → **Customize**
2. Click **Footer** section
3. Select the appropriate menu for each column

---

## Adding Instagram Posts

### Option 1: Manual Upload (Recommended for now)

1. In Theme Editor, scroll to **Instagram Feed** section
2. For each post block:
   - Upload image (screenshot of Instagram post)
   - Add post URL
   - Add caption (optional)

### Option 2: Instagram Integration App (Future)

Consider installing an Instagram feed app from the Shopify App Store:
- **Instagram Feed by Snapppt**
- **Instafeed by Mintt**
- **Social Photos**

These apps automatically pull your Instagram posts.

---

## Uploading Images

### Image Size Recommendations

**Hero Image:**
- Size: 1600×2000px (portrait)
- Format: JPG or PNG
- File size: Under 500KB (compress if needed)

**Collection Images:**
- Size: 800×1000px (3:4 ratio)
- Format: JPG or PNG
- File size: Under 300KB

**Product Images:**
- Size: 1600×1600px minimum
- Format: JPG or PNG
- File size: Under 500KB each
- Upload 3-5 images per product

**Instagram Posts:**
- Size: 1080×1080px (square)
- Format: JPG or PNG
- File size: Under 200KB

### Image Compression Tools

Keep file sizes small for fast loading:
- **TinyPNG** (tinypng.com)
- **Squoosh** (squoosh.app)
- **Shopify Image Resizer** (built into Shopify)

---

## Going Live

Once you've added products, collections, and configured your homepage:

### 1. Preview Your Theme
1. In the Theme Editor, click the **eye icon** to preview
2. Test on mobile and desktop
3. Check all links work
4. Test adding a product to cart

### 2. Publish Your Theme
1. Go to **Online Store** → **Themes**
2. Find your development theme
3. Click **Actions** → **Publish**
4. Confirm the publication

### 3. Remove Password Protection
1. Go to **Online Store** → **Preferences**
2. Scroll to **Password protection**
3. Uncheck **Enable password**
4. Click **Save**

Your store is now live!

---

## Quick Start Checklist

Use this checklist to track your progress:

**Collections:**
- [ ] Create "New Arrivals" collection
- [ ] Create "Outerwear" collection
- [ ] Create "Dresses" collection
- [ ] Create "Tops" collection
- [ ] Create "Bottoms" collection
- [ ] Create "Accessories" collection

**Products:**
- [ ] Add at least 10-15 products
- [ ] Upload 3-5 images per product
- [ ] Write detailed descriptions
- [ ] Add products to appropriate collections
- [ ] Add consistent tags (era, condition, category)

**Homepage:**
- [ ] Upload hero image
- [ ] Configure hero buttons
- [ ] Add 5-6 collection blocks with images
- [ ] Verify featured products show correctly
- [ ] Add 6 Instagram posts with images

**Navigation:**
- [ ] Set up main menu
- [ ] Create footer menus
- [ ] Create About page
- [ ] Create Contact page

**Final Steps:**
- [ ] Preview theme on mobile and desktop
- [ ] Test purchasing flow
- [ ] Publish theme
- [ ] Remove password protection
- [ ] Share with friends for feedback

---

## Need Help?

If you run into issues or have questions:

1. **Shopify Help Center**: help.shopify.com
2. **Shopify Community**: community.shopify.com
3. **Contact Developer**: [Your contact info]

---

## Pro Tips

### For Best Results:

1. **Consistency is Key**
   - Use similar photo styles for all products
   - Tag products consistently
   - Keep descriptions in the same format

2. **Update Regularly**
   - Add new products weekly
   - Keep "New Arrivals" fresh
   - Update Instagram feed regularly

3. **Quality Over Quantity**
   - Better to have 20 well-photographed items than 100 poor ones
   - Write detailed, honest descriptions
   - Highlight unique features and any flaws

4. **Mobile-First**
   - Most shoppers browse on mobile
   - Test everything on your phone
   - Ensure images look good on small screens

5. **SEO Basics**
   - Use descriptive product titles
   - Write unique descriptions
   - Add alt text to images
   - Use relevant tags

---

Good luck with your store! Take it one step at a time, and don't hesitate to reach out if you need help.

**Welcome to Forgotten Essentials!** 🌿
