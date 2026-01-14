# Marketing Site Checklist

**Pattern Type**: Marketing/Landing Site
**Applies To**: Product marketing sites, B2B landing pages, SEO-driven content sites
**Source Projects**: Morganna marketing site, AniltX website, NMHL website
**Documented**: 2026-01-09
**Author**: Codex Agent

---

## Overview

This checklist covers marketing sites that typically accompany web apps or mobile apps. These sites focus on **SEO, conversion, and lead generation** rather than application functionality.

**Example Projects**:
- **Morganna Marketing Site**: B2B/B2C marketing with SEO + click walls
- **AniltX Website**: Product marketing and lead generation
- **NMHL Website**: Team/client-facing marketing site

**Key Difference from App**: Marketing sites are **content-heavy, conversion-focused, and public-facing**, while apps are **user-authenticated and feature-heavy**.

---

## Prerequisites

- [ ] **Domain** purchased (or subdomain decided)
- [ ] **Hosting platform** chosen (Vercel, Netlify, etc.)
- [ ] **Framework** chosen (usually Next.js for SSR/SSG)

---

## 1. Project Setup (Next.js)

### Initialization
- [ ] **Next.js project** initialized (App Router recommended)
- [ ] **TypeScript** enabled
- [ ] **Tailwind CSS** configured
- [ ] **ESLint + Prettier** configured

### Configuration
- [ ] **`next.config.js`** configured
  - [ ] Image domains whitelisted
  - [ ] Redirects (www → non-www or vice versa)
  - [ ] Trailing slash preference
- [ ] **Static export** configured (if fully static, `output: 'export'`)

---

## 2. Essential Pages

### Core Marketing Pages
- [ ] **Homepage** (`/`)
  - [ ] Hero section (clear value proposition)
  - [ ] Features overview
  - [ ] Social proof (testimonials, logos)
  - [ ] CTA (sign up, request demo, etc.)
- [ ] **About** page (`/about`)
  - [ ] Company story
  - [ ] Team bios (if B2B)
  - [ ] Mission/values
- [ ] **Pricing** page (`/pricing`)
  - [ ] Pricing tiers
  - [ ] Feature comparison table
  - [ ] FAQ section
  - [ ] CTA buttons
- [ ] **Contact** page (`/contact`)
  - [ ] Contact form
  - [ ] Email/phone
  - [ ] Social links
- [ ] **Blog** (`/blog`)
  - [ ] Blog index (list of posts)
  - [ ] Blog post template
  - [ ] Categories/tags
  - [ ] Search (optional)

### Legal Pages
- [ ] **Privacy Policy** (`/privacy`)
- [ ] **Terms of Service** (`/terms`)
- [ ] **Cookie Policy** (`/cookies`) (if GDPR-compliant)

### Product/Feature Pages
- [ ] **Features** page (`/features`)
  - [ ] Individual feature sections
  - [ ] Use cases
- [ ] **Use Cases** page (`/use-cases` or `/solutions`)
  - [ ] Industry-specific solutions
  - [ ] Customer stories
- [ ] **Integrations** page (`/integrations`) (if applicable)
- [ ] **Changelog** page (`/changelog`) (if public product updates)

---

## 3. Navigation & Structure

- [ ] **Header/Navbar**
  - [ ] Logo (links to homepage)
  - [ ] Main navigation links
  - [ ] CTA button (e.g., "Sign Up" or "Get Started")
  - [ ] Mobile menu (hamburger)
- [ ] **Footer**
  - [ ] Company info
  - [ ] Footer links (About, Pricing, Blog, Contact)
  - [ ] Social media links
  - [ ] Legal links (Privacy, Terms)
  - [ ] Newsletter signup (optional)
- [ ] **Breadcrumbs** (if deep page structure)

---

## 4. SEO Optimization

### Meta Tags
- [ ] **Page titles** optimized (unique per page, < 60 chars)
- [ ] **Meta descriptions** written (unique per page, < 160 chars)
- [ ] **Open Graph tags** (for social sharing)
  - [ ] `og:title`, `og:description`, `og:image`, `og:url`
- [ ] **Twitter Card tags** (for Twitter sharing)
- [ ] **Canonical URLs** set (prevent duplicate content)

### Technical SEO
- [ ] **`robots.txt`** configured
- [ ] **`sitemap.xml`** generated (automatic in Next.js)
- [ ] **Structured data** (JSON-LD)
  - [ ] Organization schema (homepage)
  - [ ] Article schema (blog posts)
  - [ ] Product schema (if product-focused)
  - [ ] FAQ schema (if FAQ page)
- [ ] **Internal linking** strategy (link related pages)
- [ ] **Alt text** on all images

### Performance
- [ ] **Core Web Vitals** optimized
  - [ ] LCP (Largest Contentful Paint) < 2.5s
  - [ ] FID (First Input Delay) < 100ms
  - [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] **Image optimization** (`next/image`)
- [ ] **Font optimization** (`next/font`)
- [ ] **Lazy loading** for below-fold content

---

## 5. Conversion Optimization (CRO)

### Call-to-Action (CTA)
- [ ] **Primary CTA** clear on every page
- [ ] **CTA buttons** above the fold
- [ ] **CTA copy** action-oriented ("Get Started", "Request Demo", "Try Free")

### Lead Capture
- [ ] **Email signup form** (newsletter, waitlist, etc.)
- [ ] **Contact form** (for inquiries, demos)
- [ ] **Popup/modal** for email capture (exit-intent or timed)
- [ ] **Click walls** for gated content (e.g., ebooks, case studies)

### Social Proof
- [ ] **Customer testimonials** on homepage
- [ ] **Case studies** (dedicated pages or section)
- [ ] **Client logos** (if B2B)
- [ ] **Trust badges** (security, certifications)
- [ ] **Review widgets** (G2, Capterra, Trustpilot)

### Psychological Triggers
- [ ] **Scarcity** ("Limited time offer")
- [ ] **Urgency** ("Sign up today")
- [ ] **Authority** (awards, press mentions)
- [ ] **Reciprocity** (free trial, free resources)

**Agents Involved**:
- `landing-page-architect` (design + conversion psychology)

---

## 6. Content Strategy

### Blog/Content Marketing
- [ ] **Blog CMS** integrated
  - [ ] Custom CMS (Supabase + `cms_collections`)
  - [ ] Headless CMS (Sanity, Contentful, Strapi)
  - [ ] MDX files (for developer-focused content)
- [ ] **Blog categories** defined
- [ ] **Content calendar** planned
- [ ] **SEO keywords** researched (for blog topics)

### Writing Agent (Future)
- [ ] **Writing agent** to gather info and draft blog posts
- [ ] **Web search integration** for research

**Agents Involved**:
- `landing-page-architect` (content structure)
- **Future: Writing Agent** (content creation)

---

## 7. Analytics & Tracking

- [ ] **Google Analytics 4** installed
- [ ] **Google Tag Manager** (optional, for flexible tracking)
- [ ] **Google Search Console** connected
- [ ] **Hotjar or similar** (heatmaps, session recordings)
- [ ] **Conversion tracking** set up
  - [ ] Form submissions
  - [ ] CTA clicks
  - [ ] Sign-ups

---

## 8. Marketing Integrations

### Email Marketing
- [ ] **Email provider** integrated (Mailchimp, ConvertKit, SendGrid)
- [ ] **Welcome email** series configured
- [ ] **Newsletter automation** set up

### CRM (if B2B)
- [ ] **CRM integration** (HubSpot, Salesforce, Pipedrive)
- [ ] **Lead scoring** configured
- [ ] **Sales team notifications** for high-intent leads

### Advertising
- [ ] **Facebook Pixel** installed (if running FB ads)
- [ ] **Google Ads conversion tracking** (if running Google Ads)
- [ ] **LinkedIn Insight Tag** (if B2B LinkedIn ads)

---

## 9. Accessibility (A11y)

- [ ] **ARIA labels** on interactive elements
- [ ] **Keyboard navigation** support
- [ ] **Focus states** visible
- [ ] **Color contrast** meets WCAG AA standards
- [ ] **Alt text** on all images
- [ ] **Semantic HTML** (headings, landmarks)
- [ ] **Screen reader** tested (NVDA, JAWS, VoiceOver)

**Agents Involved**:
- `frontend-validator` (a11y audit via `/fe-a11y`)

---

## 10. Mobile Optimization

- [ ] **Responsive design** (mobile-first approach)
- [ ] **Touch targets** minimum 44x44px
- [ ] **Mobile menu** functional
- [ ] **Forms** optimized for mobile (large inputs, autocomplete)
- [ ] **Images** optimized for mobile (smaller sizes, lazy loading)

---

## 11. Security & Compliance

### GDPR (if EU visitors)
- [ ] **Cookie banner** implemented
- [ ] **Privacy policy** updated for GDPR
- [ ] **Cookie consent** tracked (opt-in for non-essential cookies)
- [ ] **Data processing** documented

### CCPA (if California visitors)
- [ ] **"Do Not Sell My Info"** link in footer

### Security
- [ ] **SSL certificate** installed (HTTPS)
- [ ] **Form spam protection** (reCAPTCHA, honeypot)
- [ ] **Rate limiting** on forms (prevent abuse)

**Agents Involved**:
- `security-sentinel` (security audit)

---

## 12. Deployment & Hosting

- [ ] **Hosting platform** chosen
  - [ ] Vercel (recommended for Next.js)
  - [ ] Netlify
  - [ ] Cloudflare Pages
- [ ] **Environment variables** configured
- [ ] **Custom domain** connected
- [ ] **SSL/HTTPS** enabled
- [ ] **CDN** configured (automatic with Vercel/Netlify)
- [ ] **Edge functions** (if needed for personalization)

### CI/CD
- [ ] **GitHub Actions** or platform CI/CD for auto-deploy
- [ ] **Preview deployments** for PRs (automatic with Vercel)

---

## 13. Testing Before Launch

- [ ] **Cross-browser testing** (Chrome, Safari, Firefox, Edge)
- [ ] **Mobile testing** (iOS Safari, Android Chrome)
- [ ] **Form submissions** tested (receive emails)
- [ ] **Links** verified (no broken links)
- [ ] **SEO audit** (Lighthouse, Screaming Frog)
- [ ] **Performance audit** (Google PageSpeed Insights)
- [ ] **Accessibility audit** (WAVE, axe DevTools)

---

## 14. Launch Checklist

- [ ] **Remove `noindex`** tag (if site was hidden during dev)
- [ ] **Submit sitemap** to Google Search Console
- [ ] **Submit site** to Bing Webmaster Tools
- [ ] **Social media** sharing tested (OG images display correctly)
- [ ] **Analytics** verified (tracking data)
- [ ] **Announce launch** (social media, email list)

---

## 15. Post-Launch

### Ongoing Optimization
- [ ] **Monitor analytics** (traffic, bounce rate, conversions)
- [ ] **A/B test** CTAs, headlines, page layouts
- [ ] **Update content** regularly (blog, case studies)
- [ ] **Monitor SEO rankings** (track target keywords)
- [ ] **Fix technical issues** (broken links, slow pages)

### Content Marketing
- [ ] **Publish blog posts** regularly (weekly/monthly)
- [ ] **Update old content** (refresh for SEO)
- [ ] **Guest posting** on relevant sites (backlinks)
- [ ] **Social media sharing** (amplify content)

---

## Variation Notes

**What's Rigid**:
- Next.js for SSR/SSG (SEO benefits)
- Essential pages (Home, Pricing, Contact, Legal)
- SEO optimization required

**What's Flexible**:
- CMS choice (custom vs headless)
- Email provider (Mailchimp, ConvertKit, etc.)
- Analytics platform (GA4 vs alternatives like Plausible, Fathom)
- Hosting platform (Vercel, Netlify, Cloudflare)

---

## Truth Disclaimer

This checklist represents common marketing site patterns. Marketing strategies vary widely based on product, audience, and business model. Adapt accordingly.

---

## Related Checklists

- [Next.js Web App](../web-app/NEXTJS-WEB-APP.md) - For app component
- [Expo Mobile App](../mobile-app/EXPO-MOBILE-APP.md) - For mobile app component
- [CMS Content](../universal/00-FOUNDATION.md#3-cms-content-management-system)

---

## Agent Coordination for Marketing Site

**Recommended Agent Flow**:
1. `landing-page-architect` - Design landing pages, conversion optimization
2. **Future: Writing Agent** - Content creation, blog posts, SEO copywriting
3. `frontend-validator` - UI validation, a11y audit
4. `security-sentinel` - Security audit (GDPR, form protection)

See [Marketing Site Setup Playbook](../agent-playbooks/MARKETING-SITE-SETUP.md) for details.

---

## Marketing Site Specific: SEO & Click Walls

### Click Walls (Morganna Example)
Click walls are used to **gate premium content** and **capture leads** before granting access.

**Example Flow**:
1. User lands on blog post or resource page
2. After scrolling 50% or after 30 seconds, popup appears
3. "Unlock full content by entering your email"
4. User submits email → popup closes, full content revealed
5. Email added to mailing list

**Implementation**:
- [ ] **Scroll tracking** (detect when user reaches 50% of page)
- [ ] **Time-based trigger** (popup after 30 seconds)
- [ ] **Email capture form** in popup
- [ ] **Email service integration** (Mailchimp, ConvertKit)
- [ ] **Cookie/localStorage** to prevent popup on return visit

**Use Cases**:
- Ebooks, whitepapers, case studies
- Video content
- Premium blog posts
- Webinar registrations

**Agents Involved**:
- `landing-page-architect` (click wall design + psychology)
