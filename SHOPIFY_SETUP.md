# Shopify Headless Setup Guide

This application is now integrated with Shopify's Storefront API, allowing the owner to manage products, collections, and checkout through Shopify admin while keeping the custom frontend design.

## Prerequisites

- A Shopify store (you can create one at https://shopify.com)
- Admin access to the Shopify store

## Step 1: Create a Custom App in Shopify

1. Log in to your Shopify admin panel
2. Navigate to **Settings** > **Apps and sales channels**
3. Click **Develop apps** (or **Develop apps for your store**)
4. Click **Create an app**
5. Name your app (e.g., "Forgotten Essentials Storefront")
6. Click **Create app**

## Step 2: Configure Storefront API Permissions

1. In your newly created app, click **Configure Storefront API scopes**
2. Enable the following scopes:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_product_tags`
   - `unauthenticated_read_product_pickup_locations`
   - `unauthenticated_read_collection_listings`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_checkouts`
3. Click **Save**

## Step 3: Install the App and Get Access Token

1. Click **API credentials** tab
2. Click **Install app** in the Storefront API section
3. Copy the **Storefront API access token** (you'll only see this once!)
4. Also note your **Store domain** (e.g., `your-store.myshopify.com`)

## Step 4: Configure Environment Variables

1. In this project, open the `.env.local` file (create it if it doesn't exist)
2. Add your credentials:

```env
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token-here
```

Replace `your-store.myshopify.com` and `your-storefront-access-token-here` with your actual values.

## Step 5: Set Up Products in Shopify

### Adding Products

1. In Shopify admin, go to **Products** > **Add product**
2. Fill in product details:
   - **Title**: Product name (e.g., "Carhartt Work Jacket")
   - **Description**: Product description
   - **Price**: Product price
   - **Compare at price**: Original price (for showing discounts)
   - **Images**: Upload product photos
   - **Product type**: Category (e.g., "Jackets", "Shirts", "Tees", etc.)
   - **Vendor**: Brand name (optional)

### Organizing with Tags

Add tags to products for better organization (tags are used to display condition, era, etc.):
- **Condition tags**: `Good`, `Excellent`, `Fair`, `Like New`
- **Era tags**: `1990s`, `1980s`, `2000s`
- **Brand tags**: `Brand: Carhartt`, `Brand: Champion`, etc.

### Size and Variants

1. In the product editor, scroll to **Variants**
2. Add size options (S, M, L, XL, etc.)
3. Each variant can have its own price and inventory

## Step 6: Create Collections

Collections are used as categories on your site:

1. In Shopify admin, go to **Products** > **Collections**
2. Click **Create collection**
3. Name your collection (e.g., "Jackets", "Shirts", "Tees", "Pants", "Accessories")
4. Set collection type:
   - **Manual**: Manually add products
   - **Automated**: Automatically include products based on conditions (e.g., product type = "Jackets")
5. Add a collection image
6. **Important**: Note the collection **handle** (URL-friendly version of the name, shown in the collection URL)

### Mapping Collections to Categories

The site uses collection handles to filter products. Make sure your collection handles match these common categories:
- `jackets`
- `shirts`
- `tees`
- `pants`
- `accessories`

You can customize handles when creating or editing collections.

## Step 7: Test the Integration

1. Start the development server:
```bash
npm run dev
```

2. Visit `http://localhost:5173`
3. You should see:
   - Products loading from your Shopify store
   - Collections appearing in the categories section
   - Ability to add products to cart
   - Checkout button redirecting to Shopify checkout

## Step 8: Managing Inventory

The owner can now manage everything through Shopify admin:

### Adding New Products
1. Go to Products > Add product
2. Fill in details, add images, set price
3. Add appropriate tags (condition, era, brand)
4. Assign to collections
5. Save - product will automatically appear on the site!

### Editing Products
1. Go to Products > All products
2. Click on a product to edit
3. Make changes and save
4. Changes appear immediately on the site

### Managing Stock
1. Edit any product
2. Update the **Quantity** field for variants
3. When quantity reaches 0, the product shows as out of stock

## How It Works

### Product Data Flow
1. Owner adds/updates products in Shopify admin
2. Site fetches products via Storefront API
3. Products display with custom design
4. Cart syncs with Shopify
5. Checkout handled by Shopify (secure, PCI compliant)

### Collections
- Collections in Shopify = Categories on the site
- Automatically filtered by collection handle
- Owner can create unlimited collections

### Cart & Checkout
- Adding to cart creates a Shopify cart
- Cart persists across page reloads
- "Proceed to Checkout" redirects to Shopify's secure checkout
- Owner configures shipping, taxes, payment methods in Shopify

## Deployment Notes

When deploying to production:

1. Set environment variables in your hosting platform:
   - `VITE_SHOPIFY_STORE_DOMAIN`
   - `VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN`

2. Build the project:
```bash
npm run build
```

3. Deploy the `dist` folder to your hosting service (Vercel, Netlify, etc.)

## Benefits of This Setup

✅ **Owner-friendly**: Manage everything through Shopify's intuitive admin
✅ **Custom design**: Keep the unique grungy thrift store aesthetic
✅ **Secure checkout**: Shopify handles payments, shipping, taxes
✅ **Scalable**: No limit on products or collections
✅ **Real-time updates**: Changes in Shopify appear immediately
✅ **No backend needed**: Fully serverless architecture
✅ **Inventory tracking**: Shopify automatically manages stock levels

## Troubleshooting

### Products not loading
- Check that environment variables are set correctly
- Verify Storefront API access token is valid
- Ensure products are set to "Active" in Shopify

### Collections not showing
- Verify collections have products assigned
- Check that collection handles match category slugs
- Ensure collections are not set to "Draft"

### Checkout not working
- Verify `unauthenticated_write_checkouts` scope is enabled
- Check that products have variants with prices
- Ensure cart creation is successful (check browser console)

## Support

For Shopify-specific questions:
- [Shopify Help Center](https://help.shopify.com)
- [Storefront API Documentation](https://shopify.dev/docs/api/storefront)

For technical issues with this integration:
- Check browser console for errors
- Verify API credentials in `.env.local`
- Review the code in `src/lib/shopify.ts` and `src/hooks/useShopify.ts`
