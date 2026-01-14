# Next.js Web App Checklist

**Pattern Type**: Next.js Web Application
**Applies To**: Web applications, B2B platforms, dashboards
**Source Projects**: Morganna B2B web app, AniltX web app, NMHL portal
**Documented**: 2026-01-09
**Author**: Codex Agent

---

## Overview

This checklist covers Next.js-specific requirements for web applications. Assumes **Universal Foundation** checklist is completed first.

**Example Projects**:
- **Morganna B2B**: Web app for business users
- **NMHL Portal**: Internal team portal
- **AniltX**: Main web application

---

## Prerequisites

✓ Complete [Universal Foundation Checklist](../universal/00-FOUNDATION.md) first

---

## 1. Next.js Project Setup

### Initialization
- [ ] **Next.js project** initialized (`npx create-next-app@latest`)
- [ ] **App Router** vs **Pages Router** decision made
  - [ ] App Router (recommended for new projects)
  - [ ] Pages Router (legacy or specific requirements)
- [ ] **TypeScript** enabled
- [ ] **Tailwind CSS** configured (if using)
- [ ] **ESLint** configured for Next.js

### Configuration Files
- [ ] **`next.config.js`** configured
  - [ ] Image domains whitelisted
  - [ ] Environment variables (if public)
  - [ ] Redirects/rewrites (if needed)
- [ ] **`tsconfig.json`** configured
  - [ ] Path aliases (`@/components`, `@/lib`, etc.)
- [ ] **`tailwind.config.js`** configured (if using Tailwind)

---

## 2. Project Structure

### Directory Organization
- [ ] **`/app`** directory (App Router) or **`/pages`** (Pages Router)
- [ ] **`/components`** directory
  - [ ] `/ui` - reusable UI components
  - [ ] `/features` - feature-specific components
  - [ ] `/layouts` - layout components
- [ ] **`/lib`** directory
  - [ ] Utility functions
  - [ ] API clients
  - [ ] Database clients
- [ ] **`/hooks`** directory - custom React hooks
- [ ] **`/types`** directory - TypeScript types
- [ ] **`/styles`** directory - global styles
- [ ] **`/public`** directory - static assets

### App Router Specific (if using)
- [ ] **`app/layout.tsx`** - root layout
- [ ] **`app/page.tsx`** - homepage
- [ ] **`app/api/`** - API routes
- [ ] **Loading states** (`loading.tsx`)
- [ ] **Error boundaries** (`error.tsx`)
- [ ] **Not found pages** (`not-found.tsx`)

---

## 3. Routing & Navigation

### Core Routes
- [ ] **Homepage** (`/`)
- [ ] **Auth routes**
  - [ ] `/signin`
  - [ ] `/signup`
  - [ ] `/reset-password`
  - [ ] `/verify-email`
- [ ] **Dashboard/App routes** (protected)
  - [ ] `/dashboard`
  - [ ] Feature-specific routes
- [ ] **Settings routes** (protected)
  - [ ] `/settings/profile`
  - [ ] `/settings/billing`
  - [ ] `/settings/team`

### Navigation Components
- [ ] **Header/Navbar** component
- [ ] **Sidebar** (if dashboard layout)
- [ ] **Footer** component
- [ ] **Breadcrumbs** (if multi-level navigation)
- [ ] **Mobile menu** (responsive)

### Route Protection
- [ ] **Middleware** for auth checking (`middleware.ts`)
- [ ] **Protected route wrapper** component
- [ ] **Redirect logic** (unauthenticated → signin)
- [ ] **Role-based access control** (if multi-role)

---

## 4. API Routes

### Backend API
- [ ] **`/api/auth/`** routes
  - [ ] `/api/auth/signin`
  - [ ] `/api/auth/signup`
  - [ ] `/api/auth/signout`
  - [ ] `/api/auth/verify`
- [ ] **`/api/user/`** routes
  - [ ] `/api/user/profile`
  - [ ] `/api/user/settings`
- [ ] **Feature-specific API routes**
- [ ] **Webhook routes** (if external services)

### API Route Best Practices
- [ ] **Error handling** in all routes
- [ ] **Input validation** (Zod, Yup, etc.)
- [ ] **Rate limiting** configured
- [ ] **CORS** configured (if needed)
- [ ] **API documentation** (comments or OpenAPI)

**Agents Involved**:
- `algo-auditor` (validate API logic + schema alignment)
- `security-sentinel` (auth + input validation audit)

---

## 5. Data Fetching

### Server Components (App Router)
- [ ] **Server-side data fetching** using `fetch` or database client
- [ ] **Data caching strategy** defined
- [ ] **Revalidation strategy** (ISR, on-demand)

### Client Components
- [ ] **Client-side data fetching** library
  - [ ] SWR (recommended)
  - [ ] React Query
  - [ ] Custom hooks
- [ ] **Loading states** handled
- [ ] **Error states** handled
- [ ] **Empty states** handled

**Agents Involved**:
- `frontend-validator` (check loading/error/empty states)

---

## 6. State Management

- [ ] **Global state solution** chosen (if needed)
  - [ ] React Context
  - [ ] Zustand
  - [ ] Redux Toolkit
  - [ ] Jotai/Recoil
- [ ] **Auth state** managed globally
- [ ] **User data** managed globally
- [ ] **Form state** managed (React Hook Form, Formik, etc.)

---

## 7. UI/UX Components

### Core Components
- [ ] **Button** component
- [ ] **Input/Form** components
- [ ] **Modal/Dialog** component
- [ ] **Toast/Notification** system
- [ ] **Loading spinners** component
- [ ] **Card** component
- [ ] **Table** component (if data-heavy app)

### Component Library (Choose One)
- [ ] shadcn/ui (Tailwind + Radix)
- [ ] Material UI
- [ ] Chakra UI
- [ ] Mantine
- [ ] Custom components

### Accessibility
- [ ] **ARIA labels** on interactive elements
- [ ] **Keyboard navigation** support
- [ ] **Focus management** (modals, forms)
- [ ] **Color contrast** meets WCAG standards

**Agents Involved**:
- `frontend-validator` (UI component validation + a11y audit)

---

## 8. SEO & Metadata

- [ ] **`metadata` API** configured (App Router)
- [ ] **Dynamic metadata** per page
  - [ ] Title
  - [ ] Description
  - [ ] OG image
  - [ ] Twitter card
- [ ] **`robots.txt`** configured
- [ ] **`sitemap.xml`** generated
- [ ] **Structured data** (JSON-LD) for key pages

---

## 9. Performance Optimization

### Image Optimization
- [ ] **`next/image`** used for all images
- [ ] **Image formats** optimized (WebP, AVIF)
- [ ] **Lazy loading** enabled

### Code Splitting
- [ ] **Dynamic imports** for heavy components
- [ ] **Route-based code splitting** (automatic in Next.js)

### Fonts
- [ ] **`next/font`** used for web fonts
- [ ] **Font preloading** configured

### Analytics & Monitoring
- [ ] **Analytics** integrated (Google Analytics, Plausible, etc.)
- [ ] **Error tracking** (Sentry, LogRocket, etc.)
- [ ] **Performance monitoring** (Vercel Analytics, etc.)

---

## 10. Deployment

### Build Configuration
- [ ] **Production build** runs successfully (`npm run build`)
- [ ] **TypeScript errors** resolved
- [ ] **ESLint warnings** resolved
- [ ] **Build output** optimized

### Hosting Platform
- [ ] **Hosting platform** chosen
  - [ ] Vercel (recommended for Next.js)
  - [ ] Netlify
  - [ ] Railway
  - [ ] AWS/GCP/Azure
- [ ] **Environment variables** configured in platform
- [ ] **Custom domain** connected
- [ ] **SSL certificate** configured

### CI/CD
- [ ] **GitHub Actions** or CI pipeline configured
- [ ] **Automated tests** run on PR
- [ ] **Automated deployments** on merge to main

---

## 11. Testing

- [ ] **Unit tests** for utilities/hooks
- [ ] **Integration tests** for API routes
- [ ] **Component tests** (React Testing Library)
- [ ] **E2E tests** (Playwright, Cypress)
  - [ ] Auth flow
  - [ ] Critical user journeys

**Agents Involved**:
- `spec-test` (generate test cases)

---

## 12. Documentation

- [ ] **README.md** with setup instructions
- [ ] **API documentation** (if public API)
- [ ] **Component documentation** (Storybook or comments)
- [ ] **Deployment guide**

---

## Variation Notes

**What's Rigid**:
- Next.js must be used for web apps
- TypeScript is required
- App Router preferred for new projects

**What's Flexible**:
- UI component library choice
- State management solution
- Data fetching library (SWR vs React Query)
- Hosting platform (though Vercel is ideal)

---

## Truth Disclaimer

This checklist represents common Next.js patterns from Solomon Technologies web projects. Adapt based on project requirements.

---

## Related Checklists

- [Universal Foundation](../universal/00-FOUNDATION.md) - Complete first
- [Marketing Site](../marketing-site/MARKETING-SITE.md) - Often paired with web apps
- [Agent Coordination Playbook](../agent-playbooks/WEB-APP-SETUP.md)

---

## Agent Coordination for Next.js Setup

**Recommended Agent Flow**:
1. `db-guardian` - Database schema + migrations
2. `security-sentinel` - RLS policies + auth audit
3. `algo-auditor` - API routes validation
4. `frontend-validator` - UI components + user flows
5. `diablo-systematic-coder` - Feature implementation

See [Web App Setup Playbook](../agent-playbooks/WEB-APP-SETUP.md) for details.
