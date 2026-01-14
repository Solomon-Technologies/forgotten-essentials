# Expo/Mobile App: Agents, Commands, and Skills

**Pattern Type**: Expo Mobile Development Tooling
**Created**: 2026-01-10
**Author**: Codex Agent
**Purpose**: Comprehensive list of specialized agents, commands, and skills for mobile app development

---

## Overview

This document defines all specialized agents, slash commands, and reusable skills specifically designed for Expo/React Native mobile app development, complementing the existing FORGE system.

---

# PART 1: SPECIALIZED AGENTS

## Existing FORGE Agents (Mobile-Compatible)

### 1. **db-guardian** (Database)
**Use for Mobile**: ✅ Full compatibility
- Database schema for mobile backend (Supabase, Firebase)
- RLS policies for multi-tenant mobile apps
- Migrations for user profiles, app data

**Mobile-Specific Tasks**:
- Device tokens table (push notifications)
- Offline sync tables (if offline-first)
- User preferences/settings tables

---

### 2. **security-sentinel** (Security Audit)
**Use for Mobile**: ✅ Full compatibility + mobile-specific checks

**Mobile-Specific Security Checks**:
- Expo Secure Store usage verification
- No hardcoded API keys in code
- Apple App Store compliance (privacy manifest, ATT)
- Certificate pinning (if needed)
- Deep link validation (prevent malicious links)
- Biometric auth security (Face ID/Touch ID)

---

### 3. **algo-auditor** (API Route Validation)
**Use for Mobile**: ✅ Full compatibility

**Mobile-Specific Validations**:
- Mobile API endpoints schema alignment
- Push notification endpoints
- File upload endpoints (avatar, photos)
- Offline sync endpoints (if applicable)

---

### 4. **frontend-validator** (UI/UX Validation)
**Use for Mobile**: ⚠️ Needs mobile-specific rules

**Current Gaps** (needs mobile extension):
- ❌ Doesn't check for vertical scroll anti-pattern
- ❌ Doesn't validate mobile navigation (tabs vs stack)
- ❌ Doesn't check KeyboardAvoidingView usage
- ❌ Doesn't validate accessibility for mobile

**See**: `mobile-ui-validator` (NEW) below

---

### 5. **diablo-systematic-coder** (Feature Implementation)
**Use for Mobile**: ✅ Compatible with mobile projects
- Systematic phase execution works for mobile
- Theme enforcement applies to mobile design systems

---

### 6. **patchbot** (Bug Fixes)
**Use for Mobile**: ✅ Full compatibility
- Fixes mobile-specific bugs
- Handles keyboard issues, navigation bugs, etc.

---

### 7. **landing-page-architect** (Marketing Sites)
**Use for Mobile**: ✅ For companion marketing sites
- Builds marketing site for mobile app
- App Store/Play Store landing pages

---

### 8. **pricing-enforcer** (Pricing Validation)
**Use for Mobile**: ✅ Full compatibility
- In-app purchase pricing validation
- Subscription tier enforcement

---

### 9. **codex-documenter** (Pattern Documentation)
**Use for Mobile**: ✅ Full compatibility
- Documents mobile-specific patterns

---

## NEW: Mobile-Specific Agents

### 10. **mobile-ui-validator** (NEW - Mobile UI Validation)

**Purpose**: Validates mobile UI patterns and catches web-pattern anti-patterns

**Activation**: `/forge:mobile-ui-agent`

**What It Checks**:

#### Anti-Pattern Detection:
- ❌ **Vertical scrolling forms** (triggers warning, suggests multi-step)
- ❌ **Vertical scrolling onboarding** (suggests horizontal swiper)
- ❌ **Long settings pages** (suggests grouped navigation)
- ❌ **Web-style navigation** (hamburger menu → suggests bottom tabs)
- ❌ **Desktop dropdowns** (suggests native pickers)
- ❌ **Missing KeyboardAvoidingView** (on input screens)

#### Mobile Best Practices:
- ✅ All form screens have max 5 fields (fits in viewport)
- ✅ Multi-step flows have progress indicators
- ✅ Bottom tabs used for main navigation
- ✅ Horizontal swiper used for onboarding
- ✅ KeyboardAvoidingView wraps input screens
- ✅ Native pickers for dropdowns (not web select)

#### Accessibility (Mobile-Specific):
- ✅ All touchables have `accessibilityLabel`
- ✅ All images have `accessibilityLabel` (if meaningful)
- ✅ Forms have `accessibilityHint` for complex inputs
- ✅ Dynamic Type support (text scaling)
- ✅ VoiceOver tested (iOS) or TalkBack (Android)

#### Navigation Validation:
- ✅ Bottom tabs for main sections (not hamburger)
- ✅ Stack navigation for drill-down
- ✅ Modals for temporary flows
- ✅ Back gesture works everywhere

**Execution Flow**:
1. Scan all screens in `/app` directory
2. Identify form screens, onboarding, settings
3. Check for vertical ScrollView with multiple inputs
4. Validate navigation structure (tabs vs stack vs drawer)
5. Check KeyboardAvoidingView usage
6. Generate report with violations

**Report Format**:
```markdown
# Mobile UI Validation Report

## ❌ Critical Issues (Web Patterns Found)
- `/app/(auth)/signup.tsx`: Vertical scrolling form with 12 fields
  - **Fix**: Convert to multi-step wizard (3-4 steps)

- `/app/onboarding.tsx`: Vertical ScrollView onboarding
  - **Fix**: Use horizontal Swiper component

## ⚠️ Warnings
- `/app/settings/index.tsx`: Long settings list (20 items)
  - **Recommendation**: Group into navigable sections

## ✅ Passed
- `/app/(tabs)/_layout.tsx`: Bottom tabs used correctly
- `/app/(auth)/signin.tsx`: KeyboardAvoidingView present
```

---

### 11. **expo-build-validator** (NEW - Build & Deployment)

**Purpose**: Validates Expo app configuration and build readiness

**Activation**: `/forge:expo-build-agent`

**What It Checks**:

#### App Configuration (`app.json` / `app.config.js`):
- ✅ Bundle identifier set (iOS)
- ✅ Package name set (Android)
- ✅ App icon configured (all sizes)
- ✅ Splash screen configured
- ✅ Permissions requested match code usage
- ✅ Orientation lock set (if needed)

#### EAS Configuration (`eas.json`):
- ✅ iOS build profile configured
- ✅ Android build profile configured
- ✅ Production vs development channels
- ✅ OTA update channels

#### iOS-Specific (App Store Compliance):
- ✅ Privacy manifest created (`PrivacyInfo.xcprivacy`)
- ✅ All permission descriptions set (`NSCameraUsageDescription`, etc.)
- ✅ Sign in with Apple implemented (if other social logins exist)
- ✅ App Tracking Transparency configured (if using IDFA)

#### Android-Specific (Play Store Compliance):
- ✅ Keystore configured
- ✅ Version code increments
- ✅ Permissions match manifest

#### Build Validation:
- ✅ `eas build --platform ios` succeeds (dry run)
- ✅ `eas build --platform android` succeeds (dry run)
- ✅ No TypeScript errors
- ✅ No unmet peer dependencies

**Execution Flow**:
1. Read and validate `app.json` / `app.config.js`
2. Read and validate `eas.json`
3. Check for iOS privacy manifest
4. Scan code for permission usage (camera, location, etc.)
5. Verify permission descriptions exist for all used permissions
6. Check for Sign in with Apple if Google/Facebook auth exists
7. Run build dry-run to catch errors
8. Generate compliance report

**Report Format**:
```markdown
# Expo Build Validation Report

## ❌ Blockers (Must Fix Before Build)
- Missing `NSCameraUsageDescription` in app.json
  - Code uses `expo-camera` but no permission description

- Sign in with Apple not implemented
  - Google Sign-In found, Apple Sign-In REQUIRED for App Store

## ⚠️ Warnings
- Privacy manifest not found
  - iOS requires `PrivacyInfo.xcprivacy` for App Store submission

## ✅ Passed
- Bundle identifier set: `com.company.appname`
- App icon configured (all sizes)
- EAS build profiles configured
```

---

### 12. **app-store-compliance-agent** (NEW - Apple/Google Compliance)

**Purpose**: Ensures App Store and Play Store compliance before submission

**Activation**: `/forge:app-store-compliance`

**What It Checks**:

#### Apple App Store (iOS):
- ✅ Privacy Policy URL set in App Store Connect
- ✅ Privacy manifest includes all data collection
- ✅ App Tracking Transparency implemented (if tracking)
- ✅ Sign in with Apple button prominent (if required)
- ✅ All permissions have descriptions
- ✅ No crashes on launch
- ✅ No "Coming Soon" features
- ✅ Screenshots match actual app
- ✅ Age rating appropriate for content
- ✅ Subscription compliance (if in-app purchases)

#### Google Play Store (Android):
- ✅ Privacy policy URL set in Play Console
- ✅ Data safety section completed
- ✅ All permissions justified
- ✅ Content rating completed
- ✅ Feature graphic uploaded (1024x500)
- ✅ Screenshots uploaded (phone + tablet if universal)

#### Common Requirements:
- ✅ App doesn't crash
- ✅ Login/signup functional
- ✅ All features accessible (not disabled/hidden)
- ✅ No placeholder content
- ✅ Terms of Service linked
- ✅ Support email/URL provided

**Execution Flow**:
1. Check app.json for store metadata
2. Verify privacy policy URL exists and is accessible
3. Check for Apple Sign-In implementation (if needed)
4. Scan for tracking code (analytics, ads)
5. Verify ATT implementation if tracking found
6. Check for subscription code and compliance
7. Generate pre-submission checklist

**Report Format**:
```markdown
# App Store Compliance Report

## iOS App Store

### ❌ Blockers
- Privacy Policy URL not set in app.json
- Sign in with Apple not implemented (REQUIRED: Google Sign-In found)

### ⚠️ Warnings
- No privacy manifest found (create `PrivacyInfo.xcprivacy`)
- Analytics tracking found but no ATT implementation

### ✅ Ready
- All permission descriptions present
- No crashes detected
- Login/signup functional

## Android Play Store

### ⚠️ Warnings
- Data safety section: Needs manual completion in Play Console
- Content rating: Needs manual completion in Play Console

### ✅ Ready
- Privacy policy URL set
- Keystore configured
- Build succeeds
```

---

### 13. **mobile-performance-auditor** (NEW - Performance Analysis)

**Purpose**: Analyzes mobile app performance and identifies bottlenecks

**Activation**: `/forge:mobile-perf-agent`

**What It Checks**:

#### Image Optimization:
- ❌ Using `<Image>` instead of `<expo-image>`
- ❌ Large uncompressed images
- ❌ Missing image caching
- ✅ Proper image format (WebP preferred)

#### List Performance:
- ❌ Using `ScrollView` with `.map()` instead of `FlatList`
- ❌ Missing `keyExtractor` on FlatList
- ❌ Missing `getItemLayout` for fixed-height items
- ❌ Large `windowSize` (should be optimized)

#### Memory Management:
- ❌ Event listeners not cleaned up in `useEffect`
- ❌ Subscriptions not unsubscribed on unmount
- ❌ Large state objects (should be paginated/virtualized)

#### Bundle Size:
- ❌ Unused dependencies in package.json
- ❌ Large JavaScript bundle (> 5MB)
- ❌ Unoptimized assets

#### Navigation Performance:
- ❌ Too many screens in stack (memory issue)
- ❌ Missing lazy loading for heavy screens

**Execution Flow**:
1. Scan all components for Image usage
2. Check all lists (FlatList vs ScrollView)
3. Analyze useEffect hooks for cleanup
4. Check package.json for unused deps
5. Analyze bundle size (if built)
6. Generate optimization report

**Report Format**:
```markdown
# Mobile Performance Audit Report

## 🔴 Critical Issues
- **Components using <Image> instead of <expo-image>**: 15 instances
  - Slower performance, no built-in caching
  - **Fix**: Replace with `expo-image`

- **ScrollView with .map() for long lists**: 3 instances
  - `/app/products/index.tsx`: 200 items
  - **Fix**: Convert to FlatList

## ⚠️ Optimization Opportunities
- **Missing keyExtractor**: 5 FlatLists
- **Unused dependencies**: 8 packages (save 2.3MB)
  - `lodash`, `moment`, etc.

## ✅ Good Practices Found
- FlatList used for feeds
- Event listeners cleaned up in 90% of components
```

---

### 14. **mobile-offline-architect** (NEW - Offline-First Design)

**Purpose**: Designs and validates offline-first mobile app architecture

**Activation**: `/forge:mobile-offline-agent`

**What It Provides**:

#### Offline Strategy Design:
- Network state detection (`expo-network`)
- Request queuing for offline actions
- Optimistic UI updates
- Conflict resolution strategy
- Local database choice (AsyncStorage, SQLite, WatermelonDB)

#### Implementation Checklist:
- [ ] Network state listener installed
- [ ] Offline UI indicators shown
- [ ] Critical data cached locally
- [ ] Queue system for mutations
- [ ] Sync logic on reconnect
- [ ] Conflict resolution rules

#### Code Generation:
Generates offline-first patterns:
- Network state context
- Request queue manager
- Sync engine
- Conflict resolver

**Use Case**: Apps that need to work without internet (field apps, travel apps, note-taking apps)

---

### 15. **mobile-push-notification-architect** (NEW - Push Notifications)

**Purpose**: Implements complete push notification system

**Activation**: `/forge:mobile-push-agent`

**What It Provides**:

#### Push Notification Setup:
- Expo Push Notifications configuration
- Permission request flow
- Token storage in backend
- Foreground notification handler
- Background notification handler
- Notification tap handler (deep linking)
- Badge count management

#### Notification Categories:
- Transactional (order updates, messages)
- Marketing (promotions, reminders)
- User preferences UI

#### Code Generation:
- Permission request screen
- Notification service
- Deep linking handler
- Backend token storage API

---

# PART 2: SLASH COMMANDS

## Existing Commands (Mobile-Compatible)

### 1. `/morning-status` ✅
**Use for Mobile**: Works for mobile projects

### 2. `/review-changes` ✅
**Use for Mobile**: Works for mobile projects

### 3. `/database-snapshot` ✅
**Use for Mobile**: Works for mobile backend

### 4. `/commit-push-pr` ✅
**Use for Mobile**: Works for mobile projects

### 5. `/db-migrate` ✅
**Use for Mobile**: Works for mobile backend

### 6. `/test-and-fix` ✅
**Use for Mobile**: Works for mobile testing

---

## NEW: Mobile-Specific Commands

### 7. `/expo-init` (NEW)
**Purpose**: Initialize new Expo project with best practices

**What It Does**:
1. Runs `npx create-expo-app@latest` with TypeScript
2. Sets up Expo Router (file-based navigation)
3. Configures EAS (`eas.json`)
4. Creates project structure (`/components`, `/lib`, `/hooks`, etc.)
5. Installs essential packages:
   - `expo-router`
   - `expo-auth-session`
   - `expo-secure-store`
   - `expo-notifications`
   - `@react-navigation/native`
   - `react-native-swiper` (for onboarding)
6. Sets up `app.json` with placeholders
7. Creates splash screen and app icon placeholders
8. Runs `/database-snapshot` for initial DB state (if Supabase)

**Usage**:
```bash
/expo-init myapp
```

**Prompts**:
- Project name?
- Bundle identifier (iOS)?
- Package name (Android)?
- Backend? (Supabase / Firebase / Custom)
- Include example onboarding? (Yes / No)

---

### 8. `/expo-build` (NEW)
**Purpose**: Validate and build Expo app

**What It Does**:
1. Runs `expo-build-validator` agent
2. Fixes common issues (if possible)
3. Runs `eas build --platform ios` (or `android` or `all`)
4. Monitors build progress
5. Returns build URL

**Usage**:
```bash
/expo-build ios
/expo-build android
/expo-build all
```

**Options**:
- `--profile development` (development build)
- `--profile production` (production build)
- `--local` (build locally, not on EAS servers)

---

### 9. `/expo-submit` (NEW)
**Purpose**: Submit app to App Store / Play Store

**What It Does**:
1. Runs `app-store-compliance-agent`
2. Checks for blockers
3. If all clear, runs `eas submit`
4. Monitors submission status

**Usage**:
```bash
/expo-submit ios
/expo-submit android
```

**Prerequisites**:
- App Store Connect / Play Console configured
- Build exists
- All compliance checks passed

---

### 10. `/expo-ota-update` (NEW)
**Purpose**: Push over-the-air (OTA) update

**What It Does**:
1. Runs tests (`/test-and-fix`)
2. If tests pass, runs `eas update --branch production`
3. Monitors rollout
4. Can rollback if issues detected

**Usage**:
```bash
/expo-ota-update production
/expo-ota-update staging
```

---

### 11. `/mobile-ui-check` (NEW)
**Purpose**: Run mobile UI validation

**What It Does**:
1. Activates `mobile-ui-validator` agent
2. Scans all screens
3. Generates report with violations
4. Offers to fix common issues

**Usage**:
```bash
/mobile-ui-check
```

---

### 12. `/expo-permissions` (NEW)
**Purpose**: Audit and configure app permissions

**What It Does**:
1. Scans code for permission usage (camera, location, etc.)
2. Checks if permission descriptions exist in `app.json`
3. Generates missing descriptions with templates
4. Updates `app.json`

**Usage**:
```bash
/expo-permissions
```

**Output**:
```markdown
# Permissions Audit

## Detected Usage:
- Camera (`expo-camera` found in components/CameraScreen.tsx)
- Location (`expo-location` found in hooks/useLocation.ts)
- Notifications (`expo-notifications` found)

## Missing Descriptions:
- `NSCameraUsageDescription` (iOS) ❌
- `NSLocationWhenInUseUsageDescription` (iOS) ❌

## Generating Descriptions...
✅ Added: "Take photos to share with friends"
✅ Added: "Show nearby locations"

Updated: app.json
```

---

### 13. `/expo-perf-audit` (NEW)
**Purpose**: Run performance audit

**What It Does**:
1. Activates `mobile-performance-auditor` agent
2. Scans for performance issues
3. Generates optimization report
4. Offers to fix common issues (replace Image, fix FlatList, etc.)

**Usage**:
```bash
/expo-perf-audit
```

---

### 14. `/expo-onboarding` (NEW)
**Purpose**: Generate complete onboarding flow

**What It Does**:
1. Creates splash screen
2. Creates welcome onboarding (horizontal swiper with 3-5 screens)
3. Creates multi-step signup flow (NO vertical scroll)
4. Creates permission request screens
5. Implements onboarding state management (AsyncStorage)

**Usage**:
```bash
/expo-onboarding
```

**Prompts**:
- How many welcome screens? (3-5)
- Signup steps needed? (Basic Info, Contact, Preferences)
- Permissions to request? (Camera, Location, Notifications)

**Generates**:
- `/app/onboarding.tsx` (welcome swiper)
- `/app/(auth)/signup.tsx` (multi-step signup)
- `/app/permissions.tsx` (permission requests)
- `/lib/onboarding.ts` (state management)

---

### 15. `/expo-deep-linking` (NEW)
**Purpose**: Set up deep linking and universal links

**What It Does**:
1. Configures deep linking in `app.json`
2. Sets up universal links (iOS) and app links (Android)
3. Creates deep link handler
4. Adds deep link testing utils

**Usage**:
```bash
/expo-deep-linking myapp://
```

---

### 16. `/expo-offline-setup` (NEW)
**Purpose**: Implement offline-first architecture

**What It Does**:
1. Activates `mobile-offline-architect` agent
2. Installs offline packages (`expo-network`, `@react-native-async-storage/async-storage`)
3. Creates network state context
4. Creates request queue manager
5. Creates sync engine

**Usage**:
```bash
/expo-offline-setup
```

---

### 17. `/expo-push-setup` (NEW)
**Purpose**: Implement push notifications

**What It Does**:
1. Activates `mobile-push-notification-architect` agent
2. Installs `expo-notifications`
3. Creates permission request flow
4. Creates notification service
5. Sets up deep linking from notifications
6. Creates backend API for token storage

**Usage**:
```bash
/expo-push-setup
```

---

### 18. `/expo-test-devices` (NEW)
**Purpose**: Test app on various device sizes

**What It Does**:
1. Lists available simulators/emulators
2. Launches app on selected devices
3. Takes screenshots for App Store/Play Store
4. Validates UI on different screen sizes

**Usage**:
```bash
/expo-test-devices
```

**Options**:
- `--ios` (iPhone 15 Pro, iPhone 15 Pro Max, iPad Pro 12.9")
- `--android` (Pixel 7, Pixel 7 Pro, Pixel Tablet)
- `--screenshots` (generate store screenshots)

---

# PART 3: REUSABLE SKILLS

## UI Component Skills

### 1. **multi-step-wizard-skill**
**Purpose**: Generate multi-step form wizard

**Inputs**:
- Steps array (e.g., `['Basic Info', 'Contact', 'Preferences']`)
- Fields per step

**Outputs**:
- Wizard component with progress indicator
- Step navigation (Back/Next)
- Form state management
- KeyboardAvoidingView

**Usage**:
```typescript
generateMultiStepWizard({
  steps: [
    { title: 'Basic Info', fields: ['name', 'email'] },
    { title: 'Contact', fields: ['phone', 'address'] },
  ]
});
```

---

### 2. **horizontal-onboarding-skill**
**Purpose**: Generate horizontal swiper onboarding

**Inputs**:
- Number of screens (3-5)
- Content per screen (title, subtitle, image)

**Outputs**:
- Swiper component
- Pagination dots
- Skip button
- CTA on last screen

---

### 3. **bottom-tab-navigation-skill**
**Purpose**: Generate bottom tab navigation

**Inputs**:
- Tab names (e.g., `['Home', 'Search', 'Profile', 'Settings']`)
- Icons per tab

**Outputs**:
- Bottom tab navigator
- Tab bar configuration
- Screen components (placeholders)

---

### 4. **native-picker-skill**
**Purpose**: Generate native picker for dropdowns

**Inputs**:
- Options array
- Searchable (yes/no)

**Outputs**:
- Native picker component
- Modal for long lists (with search)
- Selection state management

---

### 5. **keyboard-aware-form-skill**
**Purpose**: Generate keyboard-aware form

**Inputs**:
- Fields array

**Outputs**:
- Form with KeyboardAvoidingView
- Input components
- Submit button (always visible)

---

## Backend/API Skills

### 6. **push-notification-backend-skill**
**Purpose**: Generate backend API for push notifications

**Inputs**:
- Backend type (Supabase, Firebase, Express)

**Outputs**:
- API route to store push tokens
- API route to send notifications
- Database migration for tokens table

---

### 7. **file-upload-api-skill**
**Purpose**: Generate file upload API (for avatars, photos)

**Inputs**:
- Storage provider (Supabase Storage, S3, Cloudinary)

**Outputs**:
- File upload API route
- Image optimization logic
- Frontend upload component

---

### 8. **offline-sync-backend-skill**
**Purpose**: Generate backend for offline sync

**Inputs**:
- Tables to sync

**Outputs**:
- Sync API endpoints
- Conflict resolution logic
- Last-modified tracking

---

## Testing Skills

### 9. **e2e-test-flow-skill**
**Purpose**: Generate E2E test for user flow

**Inputs**:
- Flow name (e.g., "Signup Flow", "Checkout Flow")
- Steps

**Outputs**:
- Detox or Maestro test file
- Test assertions

---

### 10. **accessibility-test-skill**
**Purpose**: Generate accessibility tests

**Outputs**:
- VoiceOver/TalkBack test scripts
- Accessibility audit checklist

---

## Deployment Skills

### 11. **app-store-screenshot-skill**
**Purpose**: Generate App Store screenshots

**Inputs**:
- Device sizes (iPhone 15 Pro, iPad Pro, etc.)

**Outputs**:
- Screenshot generator script
- Framed screenshots (with device frames)

---

### 12. **fastlane-setup-skill**
**Purpose**: Set up Fastlane for automated deployment

**Outputs**:
- Fastfile configuration
- Match for code signing (iOS)
- Upload to App Store/Play Store lanes

---

## State Management Skills

### 13. **zustand-store-skill**
**Purpose**: Generate Zustand store

**Inputs**:
- Store name (e.g., "auth", "cart")
- State shape

**Outputs**:
- Zustand store file
- Hooks for usage

---

### 14. **async-storage-persistence-skill**
**Purpose**: Generate AsyncStorage persistence

**Inputs**:
- Keys to persist

**Outputs**:
- Persistence layer
- Load/save helpers

---

## Analytics Skills

### 15. **analytics-tracking-skill**
**Purpose**: Set up analytics tracking

**Inputs**:
- Provider (Firebase, Amplitude, Mixpanel)

**Outputs**:
- Analytics service
- Event tracking hooks
- Screen view tracking

---

# SUMMARY

## Total Count:

### Agents:
- **Existing (Mobile-Compatible)**: 9
- **New (Mobile-Specific)**: 6
- **Total**: 15 agents

### Commands:
- **Existing (Mobile-Compatible)**: 6
- **New (Mobile-Specific)**: 12
- **Total**: 18 commands

### Skills:
- **UI Components**: 5
- **Backend/API**: 3
- **Testing**: 2
- **Deployment**: 2
- **State Management**: 2
- **Analytics**: 1
- **Total**: 15 skills

---

## Priority Implementation Order:

### Phase 1: Critical Agents
1. `mobile-ui-validator` (catch web patterns)
2. `expo-build-validator` (build readiness)
3. `app-store-compliance-agent` (prevent rejections)

### Phase 2: Essential Commands
1. `/expo-init` (project setup)
2. `/mobile-ui-check` (UI validation)
3. `/expo-permissions` (permission audit)
4. `/expo-onboarding` (onboarding generation)

### Phase 3: High-Value Skills
1. `multi-step-wizard-skill` (prevent vertical scroll)
2. `horizontal-onboarding-skill` (proper onboarding)
3. `bottom-tab-navigation-skill` (mobile navigation)
4. `keyboard-aware-form-skill` (proper form handling)

### Phase 4: Advanced Features
1. `/expo-offline-setup` (offline-first apps)
2. `/expo-push-setup` (push notifications)
3. `mobile-performance-auditor` (optimization)

---

**Version**: 1.0
**Created**: 2026-01-10
**Status**: Design specification (not yet implemented)
**Next Steps**: Implement Phase 1 agents first
