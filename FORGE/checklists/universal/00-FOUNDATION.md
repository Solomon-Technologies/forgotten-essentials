# Universal Project Foundation Checklist

**Pattern Type**: Universal Project Requirements
**Applies To**: All Projects (Web, Mobile, E-commerce)
**Source Projects**: AniltX, Morganna, NMHL, Auldrom, Skulptor.ai
**Documented**: 2026-01-09
**Author**: Codex Agent

---

## Overview

Every project, regardless of type (web app, mobile app, e-commerce), requires these foundational systems. This checklist ensures no critical infrastructure is missed during project initialization.

---

## 1. Authentication & Authorization System

### Backend (Database + API)
- [ ] **User table/schema** in database
  - [ ] Email/password fields
  - [ ] OAuth provider fields (Google, Apple, etc.)
  - [ ] Email verification status
  - [ ] Created/updated timestamps
- [ ] **Auth API routes**
  - [ ] Sign up
  - [ ] Sign in
  - [ ] Sign out
  - [ ] Password reset
  - [ ] Email verification
  - [ ] OAuth callbacks
- [ ] **RLS (Row Level Security) policies** on user table
- [ ] **Session management** (JWT, cookies, etc.)

### Frontend
- [ ] **Auth UI components**
  - [ ] Sign in form
  - [ ] Sign up form
  - [ ] Password reset flow
  - [ ] Email verification screen
  - [ ] OAuth buttons
- [ ] **Protected route logic**
- [ ] **Auth state management** (Context, Redux, Zustand, etc.)
- [ ] **Auth error handling** (expired sessions, invalid credentials, etc.)

**Agents Involved**:
- `db-guardian` (database schema + RLS policies)
- `algo-auditor` (API route validation)
- `frontend-validator` (UI components + auth flows)
- `security-sentinel` (auth flow security audit)

---

## 2. Database Setup

### Core Infrastructure
- [ ] **Database provisioned** (Supabase, PostgreSQL, etc.)
- [ ] **Connection strings** configured in environment
- [ ] **Migration system** initialized
- [ ] **Initial schema** created
  - [ ] Users table
  - [ ] Profiles table (if applicable)
  - [ ] Public schema for content
- [ ] **RLS enabled** on all tables
- [ ] **Database backups** configured

### Standard Tables
- [ ] `users` - authentication
- [ ] `profiles` - user metadata
- [ ] `cms_collections` - content types
- [ ] `cms_collection_items` - actual content
- [ ] Project-specific tables

**Agents Involved**:
- `db-guardian` (schema creation, migration safety, snapshots)
- `security-sentinel` (RLS policy audit)

---

## 3. CMS (Content Management System)

### Database Structure
- [ ] **`cms_collections` table**
  - [ ] Collection name
  - [ ] Collection slug
  - [ ] Schema definition (JSON)
  - [ ] Published status
- [ ] **`cms_collection_items` table**
  - [ ] Foreign key to collection
  - [ ] Content (JSON/JSONB)
  - [ ] Published status
  - [ ] Created/updated timestamps
  - [ ] Author/editor tracking
- [ ] **RLS policies** for public read access

### CMS Features
- [ ] **Public API routes** for fetching content
- [ ] **Admin routes** for CRUD operations (protected)
- [ ] **Frontend components** for displaying CMS content
- [ ] **Rich text editor** integration (if needed)

**Use Cases**:
- Blog posts
- Marketing content
- Product descriptions
- FAQ sections
- Documentation

**Agents Involved**:
- `db-guardian` (CMS schema)
- `algo-auditor` (CMS API routes)
- `frontend-validator` (CMS UI components)

---

## 4. Environment Configuration

- [ ] **`.env.local`** or **`.env`** file created
- [ ] **Environment variables** documented
  - [ ] Database URL
  - [ ] API keys (Stripe, SendGrid, etc.)
  - [ ] OAuth credentials
  - [ ] Public/private key pairs
- [ ] **`.env.example`** created for team onboarding
- [ ] **Secrets management** configured (Vercel, Railway, etc.)

---

## 5. Dependencies & Package Management

- [ ] **Package manager** initialized (npm, yarn, pnpm, bun)
- [ ] **Core dependencies** installed
  - [ ] Framework (Next.js, Expo, etc.)
  - [ ] Database client (Supabase client, Prisma, etc.)
  - [ ] Auth library
  - [ ] UI library (if applicable)
- [ ] **Development dependencies** installed
  - [ ] TypeScript
  - [ ] ESLint
  - [ ] Prettier
  - [ ] Testing framework
- [ ] **Lock file** committed

**Future**: Dependency update bot command (`/update-deps`)

---

## 6. Project Status & Health Check

- [ ] **Project status command** created (`/project-status`)
  - [ ] Checks against this checklist
  - [ ] Reports missing items
  - [ ] Suggests next steps

**Future Agent**: `project-status-bot`

---

## 7. Git & Version Control

- [ ] **Repository initialized**
- [ ] **`.gitignore`** configured
  - [ ] `.env` files
  - [ ] `node_modules`
  - [ ] Build artifacts
  - [ ] OS files (`.DS_Store`, etc.)
- [ ] **Initial commit** created
- [ ] **Branch strategy** defined (main, develop, feature branches)
- [ ] **Remote repository** connected (GitHub, GitLab, etc.)

---

## 8. Testing Setup

- [ ] **Testing framework** installed (Jest, Vitest, etc.)
- [ ] **Test directories** created
- [ ] **Initial tests** written
  - [ ] Auth flow tests
  - [ ] API route tests
  - [ ] Component tests (if applicable)
- [ ] **CI/CD pipeline** configured for test execution

---

## Variation Notes

**What's Rigid**:
- Every project needs auth
- Every project needs a database
- Every project needs environment configuration

**What's Flexible**:
- Auth provider (email/password vs OAuth vs magic links)
- Database choice (Supabase vs PostgreSQL vs MongoDB)
- CMS implementation (custom vs headless CMS like Sanity/Contentful)

---

## Truth Disclaimer

This checklist represents common patterns observed across Solomon Technologies projects. It is **informational**, not law. Your project may require additional steps or exclude certain items based on specific needs.

---

## Next Steps

After completing this universal foundation:
1. Proceed to **project-type-specific checklists** (Web App, Mobile App, etc.)
2. Run **agent coordination** for setup (see `agent-playbooks/`)
3. Run `/project-status` to validate setup
