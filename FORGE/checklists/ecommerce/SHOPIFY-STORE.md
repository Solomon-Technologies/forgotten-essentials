# Shopify E-commerce Store Checklist

**Pattern Type**: Shopify-hosted E-commerce Store
**Applies To**: Shopify stores, product-based businesses
**Source Projects**: Client projects, potential future Solomon stores
**Documented**: 2026-01-09
**Author**: Codex Agent

---

## Overview

This checklist covers Shopify-specific requirements for e-commerce stores. Shopify provides the backend infrastructure, so this focuses on store configuration, theme customization, and essential pages.

**Note**: Unlike Next.js or Expo projects, Shopify handles hosting, database, and most backend logic. Focus is on store setup and customization.

---

## Prerequisites

- [ ] **Shopify account** created (Basic, Shopify, or Advanced plan)
- [ ] **Store domain** chosen (`.myshopify.com` or custom domain)
- [ ] **Payment gateway** decision made (Shopify Payments, Stripe, PayPal, etc.)

---

## 1. Shopify Store Setup

### Store Settings
- [ ] **Store name** configured
- [ ] **Store contact information** (email, phone, address)
- [ ] **Store currency** set
- [ ] **Tax settings** configured (by region)
- [ ] **Shipping zones** configured
- [ ] **Checkout settings** configured
  - [ ] Customer accounts (required, optional, disabled)
  - [ ] Guest checkout enabled/disabled
  - [ ] Tipping enabled (if applicable)

### Payment Gateway
- [ ] **Payment provider** activated
  - [ ] Shopify Payments (recommended)
  - [ ] Stripe
  - [ ] PayPal
  - [ ] Others (Apple Pay, Google Pay, etc.)
- [ ] **Test mode** configured for development
- [ ] **Production credentials** configured for launch

---

## 2. Products & Collections

### Product Setup
- [ ] **Product catalog** created
  - [ ] Product titles
  - [ ] Product descriptions (SEO-optimized)
  - [ ] Product images (high quality, multiple angles)
  - [ ] Product prices
  - [ ] Product SKUs
  - [ ] Inventory tracking enabled
- [ ] **Product variants** configured (size, color, etc.)
- [ ] **Product tags** added for filtering
- [ ] **Product metafields** (if custom data needed)

### Collections
- [ ] **Collections** created (categories)
  - [ ] Manual collections (curated)
  - [ ] Automated collections (rule-based)
- [ ] **Collection images** uploaded
- [ ] **Collection descriptions** written

---

## 3. Theme Selection & Customization

### Theme Choice
- [ ] **Shopify theme** selected
  - [ ] Free theme (Dawn, Refresh, Sense, etc.)
  - [ ] Premium theme (from Shopify Theme Store)
  - [ ] Custom theme (Liquid-based or Hydrogen/Remix)

### Theme Customization
- [ ] **Logo** uploaded
- [ ] **Brand colors** configured
- [ ] **Typography** configured
- [ ] **Homepage** customized
  - [ ] Hero section
  - [ ] Featured collections
  - [ ] Featured products
  - [ ] Testimonials/social proof
- [ ] **Header** customized
  - [ ] Navigation menu
  - [ ] Search bar
  - [ ] Cart icon
- [ ] **Footer** customized
  - [ ] Footer links (About, Contact, Policies)
  - [ ] Social media links
  - [ ] Newsletter signup

---

## 4. Essential Pages

### Required Pages
- [ ] **Homepage** (`/`)
- [ ] **Product pages** (`/products/[handle]`)
- [ ] **Collection pages** (`/collections/[handle]`)
- [ ] **Cart page** (`/cart`)
- [ ] **Checkout** (Shopify-managed)

### Legal/Policy Pages
- [ ] **Privacy Policy** (`/pages/privacy-policy`)
- [ ] **Terms of Service** (`/pages/terms-of-service`)
- [ ] **Refund Policy** (`/pages/refund-policy`)
- [ ] **Shipping Policy** (`/pages/shipping-policy`)

### Additional Pages
- [ ] **About Us** page (`/pages/about`)
- [ ] **Contact Us** page (`/pages/contact`)
- [ ] **FAQ** page (`/pages/faq`)
- [ ] **Size Guide** (if apparel)
- [ ] **Returns** page

---

## 5. Navigation & Menus

- [ ] **Main navigation menu** configured
  - [ ] Shop/Products link
  - [ ] Collections links
  - [ ] About/Contact links
- [ ] **Footer menu** configured
- [ ] **Mega menu** (if many products/collections)
- [ ] **Mobile menu** tested and optimized

---

## 6. Checkout & Payments

### Checkout Customization
- [ ] **Checkout branding** matches store theme
- [ ] **Custom checkout fields** (if needed: gift message, delivery notes)
- [ ] **Shipping options** configured
  - [ ] Free shipping threshold
  - [ ] Flat rate shipping
  - [ ] Calculated shipping (by carrier)
- [ ] **Discount codes** configured (if launching with promotions)

### Abandoned Cart Recovery
- [ ] **Abandoned cart emails** enabled (Shopify Plus feature)
- [ ] **Klaviyo/Mailchimp integration** for cart recovery (if not Shopify Plus)

---

## 7. Apps & Integrations

### Essential Apps
- [ ] **Reviews app** (Yotpo, Judge.me, Loox)
- [ ] **Email marketing** (Klaviyo, Mailchimp, Omnisend)
- [ ] **SEO app** (Plug in SEO, Smart SEO)
- [ ] **Analytics** (Google Analytics 4 via app or custom code)
- [ ] **Social proof** (Fomo, Recent Sales Notification)

### Optional Apps (Based on Need)
- [ ] **Subscriptions** (Recharge, Yotpo Subscriptions)
- [ ] **Upsell/Cross-sell** (Zipify, Bold Upsell)
- [ ] **Loyalty program** (Smile.io, LoyaltyLion)
- [ ] **Live chat** (Gorgias, Tidio, Zendesk)
- [ ] **Inventory management** (if multi-channel: Shopify POS, TradeGecko)

---

## 8. SEO & Marketing

### SEO Setup
- [ ] **Page titles** optimized (products, collections, pages)
- [ ] **Meta descriptions** written
- [ ] **Alt text** added to all images
- [ ] **URL handles** clean and descriptive
- [ ] **Sitemap** auto-generated by Shopify
- [ ] **robots.txt** configured (Shopify default is usually fine)
- [ ] **Structured data** (Shopify adds automatically for products)

### Google Integration
- [ ] **Google Search Console** connected
- [ ] **Google Analytics 4** installed
- [ ] **Google Merchant Center** connected (for Shopping ads)

### Social Media
- [ ] **Facebook pixel** installed
- [ ] **Instagram Shopping** enabled
- [ ] **TikTok pixel** (if using TikTok ads)
- [ ] **Pinterest tag** (if relevant audience)

### Email Marketing
- [ ] **Email capture** form (popup, footer, homepage)
- [ ] **Welcome email** series configured
- [ ] **Abandoned cart emails** configured
- [ ] **Post-purchase emails** configured

---

## 9. Performance & Speed

- [ ] **Image optimization**
  - [ ] Compress images before upload
  - [ ] Use WebP format where possible
- [ ] **Lazy loading** enabled (modern themes have this)
- [ ] **Minimize apps** (each app adds scripts that slow site)
- [ ] **Test page speed** (Google PageSpeed Insights)
- [ ] **Remove unused theme code** (if custom theme)

---

## 10. Testing Before Launch

### Functionality Testing
- [ ] **Place test order** (end-to-end checkout flow)
- [ ] **Test payment gateway** (test mode)
- [ ] **Test shipping calculation** (various addresses)
- [ ] **Test discount codes**
- [ ] **Test mobile responsiveness** (all pages)
- [ ] **Test on multiple browsers** (Chrome, Safari, Firefox)

### Content Review
- [ ] **Proofread all copy** (product descriptions, pages)
- [ ] **Check all images** (high quality, correct sizing)
- [ ] **Verify links** (no broken links)

### Legal Compliance
- [ ] **GDPR compliance** (if EU customers)
  - [ ] Cookie banner
  - [ ] Privacy policy updated
- [ ] **ADA compliance** (accessibility)
  - [ ] Alt text on images
  - [ ] Keyboard navigation
- [ ] **Age verification** (if selling age-restricted products)

---

## 11. Launch Preparation

### Pre-Launch Checklist
- [ ] **Remove password protection** (if store was password-protected)
- [ ] **Custom domain** connected and SSL configured
- [ ] **Favicon** uploaded
- [ ] **Social media accounts** created and linked
- [ ] **Google Analytics** verified (tracking data)
- [ ] **Test order confirmation emails** (ensure deliverability)

### Launch Day
- [ ] **Announce launch** (email list, social media)
- [ ] **Monitor for issues** (first 24-48 hours)
- [ ] **Check order processing** (ensure orders flow correctly)

---

## 12. Post-Launch

### Ongoing Maintenance
- [ ] **Monitor analytics** (traffic, conversion rate, bounce rate)
- [ ] **A/B test** product pages, CTAs, etc.
- [ ] **Collect customer feedback** (reviews, surveys)
- [ ] **Update product inventory** regularly
- [ ] **Add new products** as available
- [ ] **Run promotions** (seasonal, holiday, flash sales)

### Customer Support
- [ ] **Response system** for customer inquiries (email, chat)
- [ ] **Returns/refunds process** documented
- [ ] **FAQ page** updated based on common questions

---

## 13. Advanced Features (Shopify Plus)

If using **Shopify Plus**, additional features:
- [ ] **Custom checkout** (Liquid-based customization)
- [ ] **Wholesale channel** (B2B pricing)
- [ ] **Launchpad** (automated sales/events)
- [ ] **Flow** (automation workflows)
- [ ] **Multipass** (SSO for logged-in customers)

---

## Variation Notes

**What's Rigid**:
- Must use Shopify platform for hosting/backend
- Legal pages required for compliance
- Checkout flow is Shopify-controlled (unless Shopify Plus)

**What's Flexible**:
- Theme choice (free vs premium vs custom)
- App selection (many alternatives for each function)
- Payment gateway (Shopify Payments vs third-party)
- Marketing channels (email, social, ads)

---

## Truth Disclaimer

This checklist represents common Shopify store patterns. E-commerce requirements vary widely based on product type, target market, and business model. Adapt accordingly.

---

## Related Checklists

- [Marketing Site](../marketing-site/MARKETING-SITE.md) - Often separate from Shopify store
- [CMS Content](../universal/00-FOUNDATION.md#3-cms-content-management-system) - For blog/content

---

## Agent Coordination for Shopify

**Note**: Shopify is a hosted platform, so traditional dev agents (db-guardian, algo-auditor) are not applicable. Focus is on:
- `landing-page-architect` - For custom landing pages or theme design
- `codex-documenter` - Documenting Shopify setup patterns
- Manual setup via Shopify admin

For **headless Shopify** (Hydrogen/Remix), use:
- [Next.js Web App Checklist](../web-app/NEXTJS-WEB-APP.md) with Shopify Storefront API integration
- `frontend-validator` - For custom storefront
- `algo-auditor` - For Storefront API integration
