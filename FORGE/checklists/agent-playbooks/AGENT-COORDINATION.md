# Agent Coordination Playbook

**Pattern Type**: Multi-Agent Workflows
**Applies To**: Complex project setups requiring multiple FORGE agents
**Source**: FORGE agent system design
**Documented**: 2026-01-09
**Author**: Codex Agent

---

## Overview

This playbook defines **which agents work together** for specific tasks and the **optimal execution order** to prevent conflicts and maximize efficiency.

**Key Principle**: Agents must execute in the correct **phase order** to avoid conflicts:
1. **Database first** (schema must exist before routes can query it)
2. **Backend/API second** (routes must exist before frontend can call them)
3. **Frontend third** (UI builds on top of backend)
4. **Security/Validation last** (audit completed work)

---

## Agent Reference Guide

### Core FORGE Agents

| Agent | Purpose | When to Use |
|-------|---------|-------------|
| `db-guardian` | Database schema, migrations, snapshots, RLS | Any database work, before schema changes |
| `security-sentinel` | Security audits, RLS policies, auth flows, secrets | Before deployment, after auth implementation |
| `algo-auditor` | API route logic, schema alignment, N+1 queries | After API routes created, after schema changes |
| `frontend-validator` | UI component validation, user flows, a11y | After frontend built, before deployment |
| `landing-page-architect` | Landing pages, conversion optimization, marketing UI | Marketing site creation, conversion flows |
| `diablo-systematic-coder` | Feature implementation (DB → Theme → UI → Routes → Security) | Complex features, systematic builds |
| `patchbot` | Bug fixes, debugging, root cause analysis | When bugs occur, silent failures |
| `codex-documenter` | Pattern documentation, knowledge extraction | After feature completion, for knowledge transfer |
| `spec-*` agents | Requirements, design, tasks, testing, implementation | Spec-driven development workflows |

---

## Common Workflows

### 1. New Project Setup (Full Stack)

**Example**: Setting up Morganna (mobile + web + marketing site)

**Agent Sequence**:
```
1. db-guardian
   - Create initial database schema
   - Set up users, profiles, cms_collections tables
   - Enable RLS on all tables

2. security-sentinel
   - Audit RLS policies
   - Verify no tables are publicly accessible
   - Check auth configuration

3. algo-auditor
   - Validate API routes match schema
   - Check for missing error handling
   - Audit business logic

4. frontend-validator
   - Validate auth flows (signin/signup/reset)
   - Check loading/error/empty states
   - Audit accessibility

5. landing-page-architect (if marketing site)
   - Create homepage, pricing, features pages
   - Optimize for conversion
   - Add click walls for lead capture
```

**Run in Parallel** (after DB setup):
- `algo-auditor` (backend) + `frontend-validator` (frontend) can run simultaneously
- `security-sentinel` can audit both concurrently

---

### 2. Authentication Setup

**Example**: Adding auth to AniltX

**Agent Sequence**:
```
1. db-guardian
   - Create/verify users table
   - Add RLS policies for users table
   - Create auth-related tables (sessions, etc.)

2. diablo-systematic-coder (or manual implementation)
   - Implement auth API routes (/api/auth/*)
   - Implement auth UI components (signin/signup forms)
   - Implement protected route logic

3. algo-auditor
   - Validate auth API routes
   - Check token handling
   - Verify error responses

4. security-sentinel
   - Audit auth flow end-to-end
   - Check session security
   - Verify no hardcoded secrets
   - Validate RLS policies

5. frontend-validator
   - Test auth user flows (signup → signin → dashboard)
   - Check error states (wrong password, etc.)
   - Verify redirect logic
```

---

### 3. New Feature Implementation

**Example**: Adding subscription billing to Morganna

**Agent Sequence (Diablo Handles This)**:
```
1. db-guardian (Phase 1: Database)
   - Create subscriptions table
   - Create invoices table
   - Add RLS policies
   - Create migration

2. diablo-systematic-coder (Phase 2-4)
   - Phase 2: Theme verification
   - Phase 3: UI components (subscription settings page)
   - Phase 4: API routes (/api/subscriptions/*)

3. security-sentinel (Phase 5)
   - Audit subscription routes
   - Verify payment data security
   - Check RLS on subscription tables

4. algo-auditor
   - Validate subscription logic
   - Check Stripe integration
   - Audit webhook handling

5. frontend-validator
   - Test subscription flow (upgrade, downgrade, cancel)
   - Verify error states (payment fails, etc.)
```

**Note**: `diablo-systematic-coder` enforces this phase order automatically, so you can invoke Diablo and it will coordinate internally.

---

### 4. Marketing Site Creation

**Example**: Building NMHL marketing website

**Agent Sequence**:
```
1. landing-page-architect
   - Design homepage (hero, features, social proof)
   - Create pricing page (tiers, CTAs)
   - Build contact page (form, info)
   - Optimize for conversion

2. FUTURE: writing-agent
   - Research target keywords
   - Write blog posts
   - Create case studies
   - Draft product copy

3. frontend-validator
   - Validate all CTAs work
   - Test form submissions
   - Check mobile responsiveness
   - Run a11y audit (/fe-a11y)

4. security-sentinel
   - Audit form security (spam protection)
   - Check GDPR compliance (cookie banner)
   - Verify no exposed secrets
```

---

### 5. Database Schema Change

**Example**: Adding new column to existing table

**Agent Sequence**:
```
1. db-guardian
   - Create snapshot of current state
   - Create migration file
   - Validate migration safety
   - Apply migration (after approval)

2. algo-auditor
   - Scan all API routes
   - Identify routes using affected table
   - Validate schema alignment
   - Fix any column mismatches

3. frontend-validator (if UI affected)
   - Check components using affected data
   - Verify UI handles new column
```

**Critical**: Always run `db-guardian` **before** making schema changes to create a snapshot.

---

### 6. Pre-Deployment Audit

**Example**: Before deploying Morganna to production

**Agent Sequence (Run in Parallel)**:
```
1. security-sentinel
   - Full security audit
   - Check all RLS policies
   - Verify auth flows
   - Scan for exposed secrets

2. frontend-validator
   - Test all critical user flows
   - Validate loading/error states
   - Run a11y audit

3. algo-auditor
   - Validate all API routes
   - Check schema alignment
   - Audit error handling

4. db-guardian (if schema changes)
   - Final snapshot before deploy
```

**After audits**: Review agent reports, fix issues, run `/test-and-fix` if needed.

---

### 7. Bug Fix Workflow

**Example**: Form submission fails silently

**Agent Sequence**:
```
1. patchbot
   - Diagnose root cause
   - Apply fix (API route, validation, etc.)

2. algo-auditor (if API affected)
   - Validate fix doesn't break other routes
   - Check schema alignment

3. frontend-validator (if UI affected)
   - Test form submission flow
   - Verify error states now work

4. security-sentinel (if auth/security related)
   - Audit fix for security implications
```

---

## Agent Coordination Matrix

| Task | Primary Agent | Supporting Agents | Run in Parallel? |
|------|---------------|-------------------|------------------|
| New project setup | `db-guardian` | `security-sentinel`, `algo-auditor`, `frontend-validator` | Sequential: DB → Security → Algo/Frontend |
| Auth implementation | `diablo` or manual | `security-sentinel`, `frontend-validator` | Sequential: DB → Backend → Frontend → Security |
| Feature build | `diablo-systematic-coder` | N/A (Diablo coordinates internally) | No (Diablo is systematic) |
| Marketing site | `landing-page-architect` | `frontend-validator`, `writing-agent` (future) | Parallel: Landing + Writing, then Frontend |
| Schema migration | `db-guardian` | `algo-auditor`, `frontend-validator` | Sequential: DB → Algo → Frontend |
| Bug fix | `patchbot` | `algo-auditor`, `frontend-validator`, `security-sentinel` | Sequential: Patch → Validation |
| Pre-deployment | `security-sentinel` | `algo-auditor`, `frontend-validator`, `db-guardian` | **Parallel: All audits** |
| Documentation | `codex-documenter` | N/A | After feature complete |

---

## Parallel vs Sequential Execution

### Run in Parallel When:
- Agents work on **independent areas** (backend vs frontend)
- **Auditing** multiple systems at once (pre-deployment)
- **Validating** without making changes (all validator agents)

### Run Sequentially When:
- **Database changes** must happen before API changes
- **API routes** must exist before frontend can call them
- **Security audits** should happen after implementation
- **Bug fixes** need validation after applying

---

## Anti-Patterns (What NOT to Do)

❌ **Running frontend-validator before API routes exist**
- Frontend can't validate flows if backend doesn't exist

❌ **Running algo-auditor before database schema is finalized**
- Routes will fail schema alignment if tables don't exist

❌ **Running security-sentinel before auth is implemented**
- Nothing to audit if auth doesn't exist yet

❌ **Making database changes without db-guardian snapshot**
- Risk data loss if migration goes wrong

❌ **Running diablo-systematic-coder AND algo-auditor simultaneously**
- Let Diablo finish first, then validate with algo-auditor

---

## Future Agents (Planned)

### Dependency Update Bot
**Purpose**: Automatically update dependencies and test for breakage
**Command**: `/update-deps`

**Agent Sequence**:
```
1. dependency-bot
   - Check for outdated dependencies
   - Update package.json
   - Run tests to verify no breakage

2. patchbot (if tests fail)
   - Fix breaking changes from updates
```

### Project Status Bot
**Purpose**: Check project against checklists, report missing items
**Command**: `/project-status`

**Behavior**:
- Read appropriate checklist (web app, mobile, etc.)
- Scan project for missing items
- Generate report with recommendations
- Suggest next steps

### Writing Agent
**Purpose**: Research topics, gather info, write content (blog posts, marketing copy)

**Agent Sequence**:
```
1. writing-agent
   - Web search for research
   - Gather information
   - Draft content (blog post, case study, etc.)

2. landing-page-architect (if marketing)
   - Integrate content into landing page
   - Optimize for conversion
```

---

## Checklist Integration

Each checklist should reference the appropriate agent playbook:

- [Universal Foundation](../universal/00-FOUNDATION.md) → General setup agents
- [Next.js Web App](../web-app/NEXTJS-WEB-APP.md) → Web app agents
- [Expo Mobile App](../mobile-app/EXPO-MOBILE-APP.md) → Mobile app agents
- [Shopify Store](../ecommerce/SHOPIFY-STORE.md) → Manual setup (no dev agents)
- [Marketing Site](../marketing-site/MARKETING-SITE.md) → Marketing site agents

---

## Commands Quick Reference

| Command | Purpose | Agents Involved |
|---------|---------|-----------------|
| `/morning-status` | Daily project status | N/A (reads git, todos) |
| `/review-changes` | Pre-commit review | N/A (reviews uncommitted changes) |
| `/database-snapshot` | Snapshot before schema work | `db-guardian` |
| `/commit-push-pr` | Commit, push, create PR | N/A (git automation) |
| `/db-migrate` | Generate safe migration | `db-guardian` |
| `/test-and-fix` | Run tests, fix failures | `patchbot`, `spec-test` |
| `/forge:fe-agent` | Frontend validator | `frontend-validator` |
| `/forge:sec-agent` | Security sentinel | `security-sentinel` |
| `/forge:algo-agent` | Algorithm auditor | `algo-auditor` |
| `/forge:price-agent` | Pricing enforcer | `pricing-enforcer` |
| `/forge:db-agent` | Database guardian | `db-guardian` |

**Future Commands**:
- `/update-deps` → Dependency update bot
- `/project-status` → Project status bot

---

## Truth Disclaimer

This playbook represents common agent coordination patterns from the FORGE system. Your specific workflow may vary based on project complexity and requirements. Use this as a guide, not a strict rulebook.

---

## Related Documentation

- [FORGE Agents Overview](../FORGE/README.md) (if exists)
- [Slash Commands](../FORGE/commands/) (command details)
- [Checklists](../checklists/) (project-type specific guides)
