# FORGE Agent System & Claude Code Configuration

**Repository**: forgotten-essentials
**Source**: Extracted from `.codex` (Solomon Technologies knowledge base)
**Date**: 2026-01-13
**Purpose**: Complete FORGE agent system, slash commands, and project checklists for reuse

---

## What's Included

This repository contains the complete FORGE agent system and Claude Code configuration files for rapid project setup and AI-assisted development.

### 📁 Directory Structure

```
forgotten-essentials/
├── .claude/                    # Claude Code Configuration
│   ├── agents/                # Custom agents (KFC spec workflow)
│   ├── commands/              # Slash command definitions
│   └── system-prompts/        # System prompts for workflows
│
├── FORGE/                     # FORGE Agent System
│   ├── .agents/               # 15 specialized agents
│   │   ├── algo/             # Algorithm auditor
│   │   ├── db/               # Database guardian
│   │   ├── security/         # Security sentinel
│   │   ├── frontend/         # Frontend validator
│   │   ├── pricing/          # Pricing enforcer
│   │   ├── diablo/           # Systematic feature coder
│   │   ├── patchbot/         # Bug fix specialist
│   │   ├── landing-agent/    # Landing page architect
│   │   ├── mobile-ui-validator/      # Mobile UI validation
│   │   ├── expo-build-validator/     # Expo build checks
│   │   ├── app-store-compliance/     # App Store compliance
│   │   ├── locke/            # Documentation agent
│   │   ├── codex/            # Pattern documenter
│   │   ├── cleanrep/         # Code cleanup
│   │   └── shared/           # Shared patterns & anti-patterns
│   │
│   ├── commands/              # Slash Command Documentation
│   │   ├── morning-status.md
│   │   ├── review-changes.md
│   │   ├── database-snapshot.md
│   │   ├── commit-push-pr.md
│   │   ├── db-migrate.md
│   │   ├── test-and-fix.md
│   │   └── forge/            # FORGE agent command hooks
│   │       ├── db-agent.md
│   │       ├── sec-agent.md
│   │       ├── algo-agent.md
│   │       ├── fe-agent.md
│   │       └── price-agent.md
│   │
│   ├── templates/             # Reusable Project Templates
│   │   ├── REPLIT-MOBILE-APP-PROMPT.md
│   │   ├── REPLIT-SHOPIFY-PROMPT.md
│   │   ├── REPLIT-AITA-MOBILE-PROMPT.md
│   │   ├── REPLIT-FLIPFORCE-MOBILE-PROMPT.md
│   │   └── SHOPIFY-PAGES-SPEC.md
│   │
│   └── checklists/            # Project Type Checklists
│       ├── README.md         # Checklist index & guide
│       ├── universal/        # Universal foundation (all projects)
│       ├── web-app/          # Next.js web apps
│       ├── mobile-app/       # Expo mobile apps
│       ├── ecommerce/        # Shopify stores
│       ├── marketing-site/   # Marketing/landing sites
│       └── agent-playbooks/  # Agent coordination workflows
│
└── FORGE-SYSTEM-README.md    # This file
```

---

## 🚀 Quick Start

### For New Projects

1. **Copy `.claude/` to your project root**
   ```bash
   cp -r .claude /path/to/your/project/
   ```

2. **Choose your project checklist**
   - Web app: `FORGE/checklists/web-app/NEXTJS-WEB-APP.md`
   - Mobile app: `FORGE/checklists/mobile-app/EXPO-MOBILE-APP.md`
   - E-commerce: `FORGE/checklists/ecommerce/SHOPIFY-STORE.md`
   - Marketing site: `FORGE/checklists/marketing-site/MARKETING-SITE.md`

3. **Start with Universal Foundation**
   - All projects: `FORGE/checklists/universal/00-FOUNDATION.md`

4. **Use slash commands**
   ```bash
   /morning-status          # Project status check
   /forge:db-agent          # Database guardian
   /forge:sec-agent         # Security audit
   /forge:fe-agent          # Frontend validation
   /commit-push-pr          # Commit, push, create PR
   /test-and-fix            # Run tests and fix failures
   ```

---

## 📋 Available Agents

### Core Infrastructure Agents
- **`/forge:db-agent`** - Database schema design, migrations, RLS policies
- **`/forge:sec-agent`** - Security audit (auth, API keys, RLS, permissions)
- **`/forge:algo-agent`** - API route validation (params, auth, error handling)

### Frontend Agents
- **`/forge:fe-agent`** - Frontend/UI validation (components, state, routing)
- **`/forge:price-agent`** - Pricing logic enforcement (tiers, quotas, subscriptions)

### Mobile-Specific Agents
- **`mobile-ui-validator`** - Detects web patterns in mobile apps (vertical scroll, etc.)
- **`expo-build-validator`** - Validates Expo config and build readiness
- **`app-store-compliance`** - App Store/Play Store compliance checks

### Feature Development Agents
- **`diablo-systematic-coder`** - Systematic feature implementation (phase-by-phase)
- **`patchbot`** - Bug fix specialist
- **`landing-page-architect`** - Marketing/landing page builder

### Documentation Agents
- **`codex-documenter`** - Pattern documentation and knowledge capture
- **`locke`** - Technical documentation writer

---

## 📚 Project Checklists

### Universal Foundation (All Projects)
**File**: `FORGE/checklists/universal/00-FOUNDATION.md`

**Covers**:
- Authentication (Supabase Auth, RLS)
- Database setup (schemas, migrations)
- Environment variables
- CMS integration (if needed)

---

### Next.js Web App Checklist
**File**: `FORGE/checklists/web-app/NEXTJS-WEB-APP.md`

**Use for**:
- B2B SaaS platforms
- Dashboards/portals
- Admin panels

**Tech Stack**:
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Supabase

---

### Expo Mobile App Checklist
**File**: `FORGE/checklists/mobile-app/EXPO-MOBILE-APP.md`

**Use for**:
- iOS + Android mobile apps
- React Native projects

**Tech Stack**:
- Expo 51+
- React Native
- TypeScript
- Supabase

**Critical Resources**:
- `MOBILE-UI-ANTI-PATTERNS.md` - Avoid web patterns in mobile
- `ONBOARDING-FLOW-PATTERNS.md` - Complete onboarding flows
- `EXPO-AGENTS-COMMANDS-SKILLS.md` - Mobile-specific agents & commands

---

### Shopify Store Checklist
**File**: `FORGE/checklists/ecommerce/SHOPIFY-STORE.md`

**Use for**:
- E-commerce stores
- Shopify-hosted platforms

**Note**: Limited dev agent involvement (mostly manual setup)

---

### Marketing Site Checklist
**File**: `FORGE/checklists/marketing-site/MARKETING-SITE.md`

**Use for**:
- Marketing/landing pages
- Lead generation sites
- Product launches

**Focus**: SEO, conversion optimization, lead capture

---

## 🎯 Agent Coordination Playbook

**File**: `FORGE/checklists/agent-playbooks/AGENT-COORDINATION.md`

**Covers**:
- Which agents to use for which tasks
- Optimal execution order (sequential vs parallel)
- Common workflows:
  - Auth setup
  - Feature implementation
  - Pre-deployment checks
  - Security audits

**Example Workflow** (from playbook):
```
1. /forge:db-agent         # Design database schema
2. /database-snapshot      # Snapshot current state
3. /db-migrate             # Create migration
4. /forge:algo-agent       # Validate API routes
5. /forge:fe-agent         # Validate frontend
6. /forge:sec-agent        # Security audit
7. /test-and-fix           # Run tests, fix failures
8. /commit-push-pr         # Commit, push, create PR
```

---

## 🛠️ Slash Commands

### Project Management
- `/morning-status` - Project status for standup
- `/review-changes` - Review uncommitted changes before shipping

### Database
- `/database-snapshot` - Create DB snapshot before schema work
- `/db-migrate [description]` - Generate safe migration from current state

### Development
- `/test-and-fix` - Run tests, analyze failures, fix them
- `/commit-push-pr [message]` - Commit, push, and create PR in one command

### FORGE Agents (Specialized)
- `/forge:db-agent` - Activate Database Guardian
- `/forge:sec-agent` - Activate Security Sentinel
- `/forge:algo-agent` - Activate Algorithm Auditor
- `/forge:fe-agent` - Activate Frontend Validator
- `/forge:price-agent` - Activate Pricing Enforcer

---

## 🧪 Mobile-Specific Features

### Mobile UI Anti-Patterns (Critical)
**File**: `FORGE/checklists/mobile-app/MOBILE-UI-ANTI-PATTERNS.md`

**Detects & Prevents**:
- ❌ Vertical scrolling forms (use multi-step wizards)
- ❌ Vertical scrolling onboarding (use horizontal swiper)
- ❌ Web-style navigation (use bottom tabs)
- ❌ Missing KeyboardAvoidingView
- ❌ Desktop dropdowns (use native pickers)

**Best Practices**:
- ✅ Max 5 fields per screen (fits in viewport)
- ✅ Multi-step flows with progress indicators
- ✅ Bottom tabs for main navigation
- ✅ Horizontal swiper for onboarding
- ✅ KeyboardAvoidingView on all input screens

---

### Expo Agents & Commands
**File**: `FORGE/checklists/mobile-app/EXPO-AGENTS-COMMANDS-SKILLS.md`

**New Mobile Agents** (15 total):
- `mobile-ui-validator` - Mobile UI validation
- `expo-build-validator` - Build & deployment checks
- `app-store-compliance-agent` - App Store/Play Store compliance
- `mobile-performance-auditor` - Performance analysis
- `mobile-offline-architect` - Offline-first design
- `mobile-push-notification-architect` - Push notifications

**New Mobile Commands** (12 total):
- `/expo-init` - Initialize Expo project
- `/expo-build` - Validate and build
- `/expo-submit` - Submit to stores
- `/mobile-ui-check` - Run UI validation
- `/expo-permissions` - Audit permissions
- `/expo-onboarding` - Generate onboarding flow
- `/expo-perf-audit` - Performance audit
- `/expo-offline-setup` - Offline architecture
- `/expo-push-setup` - Push notifications
- And more...

**Reusable Skills** (15 total):
- Multi-step wizard generation
- Horizontal onboarding swiper
- Bottom tab navigation
- Native picker components
- Keyboard-aware forms
- And more...

---

### Onboarding Flow Patterns
**File**: `FORGE/checklists/mobile-app/ONBOARDING-FLOW-PATTERNS.md`

**Complete Flows**:
- Splash screen
- Welcome onboarding (horizontal swiper)
- Multi-step signup (NO vertical scroll)
- Permission requests
- State management (AsyncStorage)

**Includes**: Code examples, best practices, common pitfalls

---

## 📦 Replit Templates

Located in `FORGE/templates/`:

- **`REPLIT-MOBILE-APP-PROMPT.md`** - Generic Expo mobile app setup
- **`REPLIT-SHOPIFY-PROMPT.md`** - Shopify store setup
- **`REPLIT-AITA-MOBILE-PROMPT.md`** - AITA mobile app (example)
- **`REPLIT-FLIPFORCE-MOBILE-PROMPT.md`** - FlipForce mobile app (example)
- **`SHOPIFY-PAGES-SPEC.md`** - Shopify page specifications

---

## 🔧 How to Use This System

### Scenario 1: Starting a New Web App
```bash
# 1. Copy Claude config
cp -r .claude /path/to/project/

# 2. Follow checklists
# - FORGE/checklists/universal/00-FOUNDATION.md
# - FORGE/checklists/web-app/NEXTJS-WEB-APP.md

# 3. Use agents
/forge:db-agent          # Design database
/database-snapshot       # Snapshot DB
/forge:sec-agent         # Security audit
/forge:fe-agent          # Frontend validation
/commit-push-pr          # Ship it
```

---

### Scenario 2: Starting a New Mobile App
```bash
# 1. Copy Claude config
cp -r .claude /path/to/project/

# 2. Follow checklists
# - FORGE/checklists/universal/00-FOUNDATION.md
# - FORGE/checklists/mobile-app/EXPO-MOBILE-APP.md
# - FORGE/checklists/mobile-app/MOBILE-UI-ANTI-PATTERNS.md
# - FORGE/checklists/mobile-app/ONBOARDING-FLOW-PATTERNS.md

# 3. Use mobile-specific agents
/expo-init myapp         # Initialize Expo project
/mobile-ui-check         # Validate UI patterns
/expo-permissions        # Audit permissions
/expo-build ios          # Build for iOS
/expo-submit ios         # Submit to App Store
```

---

### Scenario 3: Adding a Feature to Existing Project
```bash
# 1. Check project status
/morning-status

# 2. Use systematic coder
# Activate diablo-systematic-coder agent manually

# 3. Validate with specialists
/forge:algo-agent        # Validate API routes
/forge:fe-agent          # Validate frontend
/forge:sec-agent         # Security check

# 4. Ship
/test-and-fix            # Run tests
/review-changes          # Review before shipping
/commit-push-pr "feat: new feature description"
```

---

### Scenario 4: Pre-Deployment Security Audit
```bash
# 1. Review changes
/review-changes

# 2. Run security audit
/forge:sec-agent

# 3. Run all validators
/forge:db-agent          # Check DB schema
/forge:algo-agent        # Check API routes
/forge:fe-agent          # Check frontend

# 4. (Mobile only) Check compliance
# Activate expo-build-validator agent
# Activate app-store-compliance-agent

# 5. Test
/test-and-fix

# 6. Ship
/commit-push-pr "chore: pre-deployment audit fixes"
```

---

## 🎓 Learning Path

### New to FORGE?
1. Read: `FORGE/checklists/README.md`
2. Read: `FORGE/checklists/agent-playbooks/AGENT-COORDINATION.md`
3. Choose your project type checklist
4. Start with Universal Foundation

### Building a Mobile App?
1. Read: `FORGE/checklists/mobile-app/MOBILE-UI-ANTI-PATTERNS.md` (CRITICAL)
2. Read: `FORGE/checklists/mobile-app/EXPO-MOBILE-APP.md`
3. Read: `FORGE/checklists/mobile-app/EXPO-AGENTS-COMMANDS-SKILLS.md`
4. Reference: `FORGE/checklists/mobile-app/ONBOARDING-FLOW-PATTERNS.md` when building flows

### Using Agents Effectively?
1. Read: `FORGE/checklists/agent-playbooks/AGENT-COORDINATION.md`
2. Understand when to use which agent
3. Learn optimal execution order
4. Review common workflows

---

## 📖 Documentation Philosophy

**What These Checklists Are**:
- ✅ Guidance based on past projects
- ✅ Best practices from Solomon Technologies
- ✅ Patterns that have worked well
- ✅ Recommendations, not requirements

**What These Checklists Are NOT**:
- ❌ Rigid requirements
- ❌ One-size-fits-all solutions
- ❌ Replacement for critical thinking
- ❌ Absolute laws

**Remember**: Every project is different. Adapt as needed.

---

## 🔗 Source Attribution

**Extracted From**:
- MotherCore patterns (Library system)
- OpenProject patterns (Operations system)
- Grundy-Existing patterns (Integrations)
- Live projects: Morganna, AniltX, NMHL, Auldrom, Skulptor.ai

**Original Authors**:
- Morganna (AI agent system design)
- AniltX (Solomon Technologies founder)
- NMHL (project workflows)

**Documentation Created By**: Codex Agent (2026-01-09 to 2026-01-13)

---

## 🚦 Status

**Current Version**: 1.0
**Last Updated**: 2026-01-13
**Status**: Production-ready

**Known Gaps** (to be implemented):
- Mobile agents are design specs (not yet coded)
- Some slash commands reference future features
- Fastlane automation not yet documented

**Next Steps**:
- Implement Phase 1 mobile agents (mobile-ui-validator, expo-build-validator)
- Create `/expo-init` command
- Add Fastlane setup guide

---

## 📞 Questions?

If you're unsure:
1. Check the appropriate checklist README
2. Review the Agent Coordination Playbook
3. Reference existing projects (Morganna, AniltX, NMHL)

**Remember**: This is guidance, not law. Adapt to your project's needs.

---

**Codex Agent System** | Solomon Technologies | 2026
