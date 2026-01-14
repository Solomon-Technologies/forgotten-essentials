# Project Checklists

**Created**: 2026-01-09
**Purpose**: Standardized checklists for different project types across Solomon Technologies projects

---

## Overview

This directory contains **project-type-specific checklists** to ensure no critical infrastructure is missed during project initialization and development.

All projects should start with the **Universal Foundation** checklist, then proceed to the appropriate project-type checklist(s).

---

## Checklist Index

### 1. Universal (All Projects)
- [**00-FOUNDATION.md**](./universal/00-FOUNDATION.md) - Auth, Database, CMS, Environment Setup
  - **Required for all projects**
  - Complete this first before moving to project-type checklists

---

### 2. Web Applications (Next.js)
- [**NEXTJS-WEB-APP.md**](./web-app/NEXTJS-WEB-APP.md) - Next.js web apps, B2B platforms, dashboards
  - **Examples**: Morganna B2B web app, NMHL portal, AniltX web app
  - **Tech Stack**: Next.js, TypeScript, Tailwind CSS, Supabase

---

### 3. Mobile Applications (Expo)
- [**EXPO-MOBILE-APP.md**](./mobile-app/EXPO-MOBILE-APP.md) - React Native mobile apps (iOS + Android)
  - **Examples**: Morganna mobile consumer app, Auldrom, Skulptor.ai
  - **Tech Stack**: Expo, React Native, TypeScript, Supabase
  - **⚠️ CRITICAL**: Includes NO VERTICAL SCROLL principles, iPad support, Apple App Store compliance

#### Mobile-Specific Resources:
- [**MOBILE-UI-ANTI-PATTERNS.md**](./mobile-app/MOBILE-UI-ANTI-PATTERNS.md) - Mobile UI anti-patterns (AI agent mistakes)
  - **Focus**: No vertical scroll forms, mobile-first patterns
  - **Critical for**: Preventing web patterns in mobile apps
- [**ONBOARDING-FLOW-PATTERNS.md**](./mobile-app/ONBOARDING-FLOW-PATTERNS.md) - Complete onboarding flows
  - **Focus**: Splash → Welcome → Multi-step Signup → Permissions
  - **Includes**: Code examples, best practices, state management

---

### 4. E-commerce (Shopify)
- [**SHOPIFY-STORE.md**](./ecommerce/SHOPIFY-STORE.md) - Shopify-hosted e-commerce stores
  - **Examples**: Client projects (past/future)
  - **Tech Stack**: Shopify (hosted platform)
  - **Note**: Limited dev agent involvement (manual setup)

---

### 5. Marketing Sites
- [**MARKETING-SITE.md**](./marketing-site/MARKETING-SITE.md) - Marketing/landing sites for lead generation
  - **Examples**: Morganna marketing site, AniltX website, NMHL website
  - **Tech Stack**: Next.js, Tailwind CSS, SEO-focused
  - **Focus**: Conversion optimization, SEO, lead capture

---

### 6. Agent Coordination
- [**AGENT-COORDINATION.md**](./agent-playbooks/AGENT-COORDINATION.md) - Multi-agent workflows and execution order
  - **Purpose**: Defines which agents to use for which tasks
  - **Includes**: Agent reference guide, common workflows, anti-patterns

---

## How to Use These Checklists

### Step 1: Identify Your Project Type
Choose the checklist(s) that match your project:

| Project Type | Checklists Needed |
|--------------|-------------------|
| **Web app only** | Universal → Next.js Web App |
| **Mobile app only** | Universal → Expo Mobile App |
| **Web app + Marketing site** | Universal → Next.js Web App + Marketing Site |
| **Mobile app + Marketing site** | Universal → Expo Mobile App + Marketing Site |
| **Full stack (like Morganna)** | Universal → Expo Mobile + Next.js Web App + Marketing Site |
| **E-commerce store** | Universal (if custom features) → Shopify Store |

---

### Step 2: Complete Checklists in Order
1. **Start with Universal Foundation** (always)
2. **Add project-type specific** checklists
3. **Refer to Agent Coordination** playbook for agent usage

---

### Step 3: Use Agents for Automation
See [Agent Coordination Playbook](./agent-playbooks/AGENT-COORDINATION.md) for:
- Which agents to use for each task
- Optimal execution order (sequential vs parallel)
- Common workflows (auth setup, feature implementation, pre-deployment)

---

## Future Enhancements

### Planned Checklists
- **Headless Shopify (Hydrogen/Remix)** - For custom Shopify storefronts
- **Chrome Extension** - For browser extensions (if applicable)
- **Electron App** - For desktop applications (if applicable)

### Planned Commands
- **`/project-status`** - Check project against appropriate checklist, report missing items
- **`/update-deps`** - Dependency update bot to keep packages current

### Planned Agents
- **Writing Agent** - Research topics, draft blog posts, create marketing copy
- **Dependency Bot** - Automated dependency updates with test validation
- **Project Status Bot** - Automated checklist validation

---

## Project Examples by Type

### Full Stack Projects
**Morganna** (most complex):
- ✅ Mobile app (Expo) - consumer-facing
- ✅ Web app (Next.js) - B2B platform
- ✅ Marketing site (Next.js) - SEO + lead generation
- ✅ Universal foundation (auth, db, cms)

**AniltX**:
- ✅ Web app (Next.js)
- ✅ Marketing site (Next.js)
- ✅ Universal foundation

**NMHL**:
- ✅ Web app (Next.js) - portal
- ✅ Marketing site (Next.js)
- ✅ Universal foundation

---

### Mobile-First Projects
**Auldrom** (dream diary):
- ✅ Mobile app (Expo)
- ✅ Universal foundation

**Skulptor.ai**:
- ✅ Mobile app (Expo)
- ✅ Universal foundation

---

### Client Projects
**Salem Techsperts, Forgotten Essentials**:
- Varies by client needs
- Likely: Marketing site + potential e-commerce

---

## Checklist Philosophy

**What Makes a Good Checklist**:
- ✅ **Actionable items** (not vague)
- ✅ **Phase-aware** (database before API, API before frontend)
- ✅ **Agent-integrated** (references which agents to use)
- ✅ **Flexible** (variation notes for project-specific needs)
- ✅ **Truthful** (disclaimers that this is guidance, not law)

**What to Avoid**:
- ❌ Overly rigid requirements (every project is different)
- ❌ Technology lock-in (except where necessary: Next.js for web, Expo for mobile)
- ❌ Missing agent coordination (checklists should guide agent usage)

---

## Codex Integration

These checklists are part of the **Codex knowledge repository**:
- **Source**: `.codex/FORGE/checklists/`
- **Format**: Markdown with Codex-compliant metadata
- **Purpose**: Standardize project setups across Solomon Technologies
- **Future**: May be integrated into `mothercore` (Grundy database) for cross-project tracking

---

## Contributing

When adding new checklists:
1. Follow the existing format (Overview, Prerequisites, Sections, Variation Notes, Truth Disclaimer)
2. Include **source projects** (which projects this pattern comes from)
3. Reference appropriate **agents** in Agent Coordination section
4. Add **variation notes** (what's rigid vs flexible)
5. Include **truth disclaimer** (this is information, not law)
6. Update this README.md index

---

## Related Documentation

- [FORGE Agents](../FORGE/README.md) - Agent system overview (if exists)
- [Slash Commands](../FORGE/commands/) - Available commands
- [Codex Activation](../../ACTIVATE.md) - How to activate Codex agent mode
- [Codex Law](../../.cursorrules) - Codex documentation standards

---

## Questions?

If you're unsure which checklist to use or have questions:
1. Review the **Project Examples by Type** section above
2. Check the **Agent Coordination Playbook** for workflow guidance
3. Refer to existing projects (Morganna, AniltX, NMHL) as references

Remember: **Checklists are guidance, not law.** Adapt based on your specific project needs.
