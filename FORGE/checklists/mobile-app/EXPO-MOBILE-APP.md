# Expo Mobile App Checklist

**Pattern Type**: Expo Mobile Application (React Native)
**Applies To**: iOS and Android mobile apps
**Source Projects**: Morganna mobile consumer app, Auldrom (dream diary), Skulptor.ai
**Documented**: 2026-01-09
**Author**: Codex Agent

---

## Overview

This checklist covers Expo/React Native-specific requirements for mobile applications. Assumes **Universal Foundation** checklist is completed first.

**Example Projects**:
- **Morganna Mobile**: Consumer-facing mobile app
- **Auldrom**: Dream diary mobile app
- **Skulptor.ai**: AI-powered mobile creative tool

---

## Prerequisites

✓ Complete [Universal Foundation Checklist](../universal/00-FOUNDATION.md) first

---

## 1. Expo Project Setup

### Initialization
- [ ] **Expo project** initialized (`npx create-expo-app@latest`)
- [ ] **Expo SDK version** selected (latest stable recommended)
- [ ] **TypeScript** enabled
- [ ] **Expo Router** configured (file-based routing)
- [ ] **EAS (Expo Application Services)** account created

### Configuration Files
- [ ] **`app.json`** or **`app.config.js`** configured
  - [ ] App name
  - [ ] Bundle identifier (iOS)
  - [ ] Package name (Android)
  - [ ] App icon
  - [ ] Splash screen
  - [ ] Orientation (portrait/landscape)
  - [ ] Permissions requested
- [ ] **`eas.json`** configured for builds
- [ ] **`tsconfig.json`** configured
  - [ ] Path aliases (`@/components`, `@/lib`, etc.)

### Expo Plugins
- [ ] **Required plugins** installed
  - [ ] `expo-router` (navigation)
  - [ ] `expo-auth-session` (OAuth)
  - [ ] `expo-secure-store` (credentials)
  - [ ] `expo-notifications` (push notifications)
  - [ ] Project-specific plugins

---

## 2. Project Structure

### Directory Organization
- [ ] **`/app`** directory (Expo Router routes)
  - [ ] `_layout.tsx` - root layout
  - [ ] `index.tsx` - home/landing screen
  - [ ] `(auth)/` - auth screens (stack)
  - [ ] `(tabs)/` - main app tabs
- [ ] **`/components`** directory
  - [ ] `/ui` - reusable UI components
  - [ ] `/features` - feature-specific components
  - [ ] `/layouts` - layout components
- [ ] **`/lib`** directory
  - [ ] API clients
  - [ ] Database clients (Supabase, etc.)
  - [ ] Utilities
- [ ] **`/hooks`** directory - custom hooks
- [ ] **`/types`** directory - TypeScript types
- [ ] **`/constants`** directory - colors, sizes, etc.
- [ ] **`/assets`** directory - images, fonts, etc.

---

## 3. Mobile-First UI Principles ⚠️ CRITICAL

### The #1 Mobile Anti-Pattern: Vertical Scrolling Forms

**❌ NEVER DO THIS (Web Pattern):**
```tsx
// AI agents love to create this - DON'T!
<ScrollView>
  <TextInput placeholder="Name" />
  <TextInput placeholder="Email" />
  <TextInput placeholder="Phone" />
  <TextInput placeholder="Address" />
  <TextInput placeholder="City" />
  <TextInput placeholder="State" />
  <TextInput placeholder="Zip" />
  {/* 20 more fields... */}
</ScrollView>
```

**✅ ALWAYS DO THIS (Mobile Pattern):**
```tsx
// Multi-step horizontal slides (NOT vertical scroll)
<Swiper>
  <Step1> {/* Name + Email */} </Step1>
  <Step2> {/* Phone + Address */} </Step2>
  <Step3> {/* City + State + Zip */} </Step3>
</Swiper>

// OR Tabs for sections
<Tabs>
  <Tab label="Personal"> {/* Fits in view */} </Tab>
  <Tab label="Contact"> {/* Fits in view */} </Tab>
</Tabs>

// OR Bottom Sheet for long forms
<BottomSheet> {/* Swipe up to reveal more */} </BottomSheet>
```

### When TO Scroll (Allowed):
- **Feeds** (social, news, timelines)
- **Lists** (FlatList/FlashList for contacts, products, etc.)
- **Horizontal scrollers** (carousel, image gallery)
- **Picker wheels** (date, time, game selectors)
- **Long-form content** (articles, terms of service - ONLY if read-only)

### When NOT TO Scroll (NEVER):
- ❌ Multi-field forms (use steps/slides/tabs instead)
- ❌ Onboarding screens (use horizontal swipe)
- ❌ Signup flows (use multi-step wizard)
- ❌ Settings pages (group into sections with navigation)
- ❌ Any input-heavy screen (keep all inputs in viewport)

### Mobile UI Layout Rules:
1. **Keep inputs visible** - All form fields should fit in viewport without scrolling
2. **Use horizontal navigation** - Slides, tabs, bottom sheets (NOT vertical scroll)
3. **Group related fields** - Max 3-5 fields per screen
4. **Progress indicators** - Show "Step 2 of 5" for multi-step flows
5. **Dismiss keyboard** - Ensure fields don't get hidden by keyboard

---

## 4. Navigation (Expo Router)

### Screen Structure
- [ ] **Splash screen** (app launch, branding, loading)
- [ ] **Onboarding flow** (HORIZONTAL SWIPE, NOT SCROLL)
  - [ ] Welcome screen (single view, no scroll)
  - [ ] Tutorial screens (horizontal swiper, 3-5 screens max)
  - [ ] Permission requests (modals, not scrollable forms)
- [ ] **Auth screens** (`/app/(auth)/`) - **MULTI-STEP, NO VERTICAL SCROLL**
  - [ ] Sign in screen (email/password in viewport + social buttons)
  - [ ] **Sign up screen** (CRITICAL: MULTI-STEP HORIZONTAL FLOW)
    - [ ] Step 1: Email + Password (fits in view)
    - [ ] Step 2: Name + Phone (fits in view)
    - [ ] Step 3: Preferences (fits in view)
    - [ ] Progress indicator ("Step 2 of 3")
  - [ ] Password reset screen (email only, fits in view)
  - [ ] Email verification screen (code input, fits in view)
- [ ] **Main app tabs** (`/app/(tabs)/`)
  - [ ] Home tab
  - [ ] Settings tab
  - [ ] Profile tab
  - [ ] Notifications tab
  - [ ] (Other feature tabs)
- [ ] **Core Pages** (Required for most apps)
  - [ ] Home page (primary dashboard/feed)
  - [ ] Settings page (grouped sections, NOT scrollable list)
  - [ ] Profile page (view/edit, use tabs if needed)
  - [ ] Contact Info Edit (modal or separate screen, max 5 fields)
  - [ ] Notifications page (feed/list, scrollable)
  - [ ] Integrations page (list of connected services)
  - [ ] Messages/Chat (scrollable thread)
  - [ ] Support/Bug Report (form: use bottom sheet or multi-step)
- [ ] **Protected screens** (require authentication)
- [ ] **Modal screens** (overlays, detail views, forms)

### Navigation Components
- [ ] **Tab bar** configured
- [ ] **Header** configured (per screen)
- [ ] **Back button** handling
- [ ] **Deep linking** configured
- [ ] **Universal links** (iOS) and **App Links** (Android)

### Route Protection
- [ ] **Auth guard** for protected routes
- [ ] **Redirect logic** (unauthenticated → sign in)
- [ ] **Role-based access** (if multi-role app)

---

## 5. iPad Support Requirements ⚠️ APPLE REQUIREMENT

**Critical**: If submitting to App Store, iPad support may be required or highly recommended.

### iPad-Specific Considerations
- [ ] **Responsive layouts** for larger screens
  - [ ] Portrait and landscape orientations
  - [ ] Multi-column layouts on iPad (NOT just scaled-up phone UI)
  - [ ] Split-view/multitasking support
- [ ] **Touch targets** sized for Apple Pencil (if applicable)
- [ ] **Keyboard shortcuts** (if applicable for productivity apps)
- [ ] **Drag and drop** support (if applicable)
- [ ] **iPad-specific navigation** (sidebars, dual-pane layouts)

### Testing
- [ ] **Test on iPad simulator** (12.9", 11", 10.9")
- [ ] **Test on physical iPad** (if available)
- [ ] **Verify all features work** on iPad (not just phone)

### App Store Requirements
- [ ] **Universal app** (iPhone + iPad) OR
- [ ] **iPhone-only with iPad compatibility** (scales up)
- [ ] **Screenshots** for iPad (if universal app)

---

## 6. Apple App Store Compliance ⚠️ MANDATORY

### Privacy Requirements
- [ ] **Privacy Policy** URL configured in App Store Connect
- [ ] **Privacy Manifest** (`PrivacyInfo.xcprivacy`) created
- [ ] **Data Use Disclosure** completed in App Store Connect
  - [ ] List all data collected (email, name, location, etc.)
  - [ ] Specify data usage purpose (analytics, personalization, etc.)
  - [ ] Indicate if data is linked to user identity
- [ ] **App Tracking Transparency (ATT)** implemented (iOS 14.5+)
  - [ ] `NSUserTrackingUsageDescription` in app.json
  - [ ] Request tracking permission before using IDFA
  - [ ] Provide opt-out for tracking

### Sign in with Apple (Mandatory)
- [ ] **Sign in with Apple** implemented
  - [ ] **REQUIRED** if app offers other social logins (Google, Facebook)
  - [ ] Configured in `expo-auth-session` or `expo-apple-authentication`
  - [ ] Button prominently displayed (Apple guidelines)
  - [ ] User can use Apple ID to sign in
- [ ] **Alternative login** available (email/password)

### Required Permissions Descriptions
- [ ] **Camera**: `NSCameraUsageDescription` (why you need camera)
- [ ] **Photo Library**: `NSPhotoLibraryUsageDescription`
- [ ] **Location**: `NSLocationWhenInUseUsageDescription` or `NSLocationAlwaysUsageDescription`
- [ ] **Microphone**: `NSMicrophoneUsageDescription`
- [ ] **Contacts**: `NSContactsUsageDescription`
- [ ] **Notifications**: System handles, but explain in onboarding
- [ ] **Face ID**: `NSFaceIDUsageDescription`

### App Store Review Guidelines
- [ ] **No crashes** - App must be stable
- [ ] **Complete functionality** - All features must work
- [ ] **No placeholder content** - All UI must be functional
- [ ] **Proper error handling** - Graceful failures, helpful messages
- [ ] **No "Coming Soon"** - Only ship complete features
- [ ] **Accurate screenshots** - Screenshots match actual app
- [ ] **Age rating** correct for content
- [ ] **Subscription compliance** (if using in-app purchases)
  - [ ] Clear terms
  - [ ] Restore purchases option
  - [ ] Cancel subscription info

### Accessibility Requirements (Recommended)
- [ ] **VoiceOver support** (screen reader)
  - [ ] All buttons/touchables have `accessibilityLabel`
  - [ ] Images have `accessibilityLabel` if meaningful
  - [ ] Forms have `accessibilityHint` for complex inputs
- [ ] **Dynamic Type** support (text scaling)
  - [ ] Text respects user's text size settings
  - [ ] Layouts don't break with large text
- [ ] **High Contrast** mode support
- [ ] **Reduce Motion** support (disable animations if requested)
- [ ] **Color blindness** consideration (don't rely on color alone)

### Rejection Risk Areas
- ❌ **Crashes on launch** - Instant rejection
- ❌ **Broken login** - Cannot test app = rejection
- ❌ **Missing privacy policy** - Rejection
- ❌ **Collecting data without disclosure** - Rejection
- ❌ **No Sign in with Apple** (when required) - Rejection
- ❌ **Misleading screenshots** - Rejection
- ❌ **Copycat app** - Rejection (must be original/useful)
- ❌ **Spam/low-quality** - Rejection

**Reference**: [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)

---

## 7. Authentication & Session Management

### Auth Implementation
- [ ] **Auth provider** chosen
  - [ ] Supabase Auth
  - [ ] Firebase Auth
  - [ ] Custom backend
- [ ] **OAuth providers** configured
  - [ ] **Apple Sign-In** (REQUIRED if other social logins exist)
  - [ ] Google Sign-In
  - [ ] Facebook/other (optional)
- [ ] **Secure token storage** (`expo-secure-store`)
- [ ] **Session persistence** across app restarts
- [ ] **Token refresh logic**

### Biometric Auth
- [ ] **Face ID / Touch ID** support (`expo-local-authentication`)
- [ ] **Fallback to password** if biometric fails
- [ ] **Permission description** in app.json (`NSFaceIDUsageDescription`)

**Agents Involved**:
- `security-sentinel` (auth flow audit + secure storage)
- `frontend-validator` (auth UI flows)

---

## 8. UI/UX Components

### Core Components
- [ ] **Button** component (primary, secondary, text)
- [ ] **Input** component (text, email, password, etc.)
- [ ] **Card** component
- [ ] **Modal/BottomSheet** component
- [ ] **Toast/Snackbar** notification system
- [ ] **Loading spinner/skeleton** screens
- [ ] **Avatar** component
- [ ] **Icon** system (Expo Vector Icons)

### Component Library (Choose One or Build Custom)
- [ ] React Native Paper
- [ ] NativeBase
- [ ] UI Kitten
- [ ] Custom components (styled-components or Tailwind via NativeWind)

### Styling Approach
- [ ] **StyleSheet API** (default React Native)
- [ ] **Styled Components** or **Emotion**
- [ ] **NativeWind** (Tailwind for React Native)

### Dark Mode Support
- [ ] **Theme system** implemented
- [ ] **Light/dark mode toggle**
- [ ] **System preference detection**

### Accessibility
- [ ] **`accessibilityLabel`** on all touchable components
- [ ] **`accessibilityHint`** where needed
- [ ] **Screen reader support** tested
- [ ] **Dynamic font sizing** support

**Agents Involved**:
- `frontend-validator` (UI component validation + a11y audit)

---

## 9. Data Fetching & State Management

### API Client
- [ ] **HTTP client** configured (Axios, Fetch, or framework-specific)
- [ ] **Base URL** environment variable
- [ ] **Auth token injection** in requests
- [ ] **Error handling** globally

### State Management
- [ ] **Global state solution** chosen
  - [ ] React Context
  - [ ] Zustand (lightweight, recommended)
  - [ ] Redux Toolkit
  - [ ] Jotai/Recoil
- [ ] **Auth state** managed globally
- [ ] **User data** managed globally
- [ ] **Offline state** handled (if offline-first)

### Data Persistence
- [ ] **AsyncStorage** for non-sensitive data
- [ ] **Expo Secure Store** for sensitive data
- [ ] **Local database** (if needed: SQLite, WatermelonDB)

### Real-time Features (if applicable)
- [ ] **WebSocket** connection
- [ ] **Supabase Realtime** subscriptions
- [ ] **Firebase Realtime Database** listeners

---

## 10. Device Features & Permissions

### Permissions Configuration
- [ ] **Camera** (`expo-camera`)
- [ ] **Photo library** (`expo-image-picker`)
- [ ] **Location** (`expo-location`)
- [ ] **Push notifications** (`expo-notifications`)
- [ ] **Contacts** (if needed)
- [ ] **Calendar/Reminders** (if needed)
- [ ] **Biometrics** (`expo-local-authentication`)

### Permission Handling
- [ ] **Request permission** flow for each feature
- [ ] **Permission denied** fallback UI
- [ ] **Settings redirect** if permission permanently denied

### Device-Specific Features
- [ ] **Haptic feedback** (`expo-haptics`)
- [ ] **App tracking transparency** (iOS 14.5+)
- [ ] **Background tasks** (if needed: `expo-task-manager`)

---

## 11. Push Notifications

- [ ] **Expo Push Notifications** configured
- [ ] **Push token** stored in backend
- [ ] **Notification permissions** requested
- [ ] **Foreground notification handler**
- [ ] **Background notification handler**
- [ ] **Notification tap handler** (deep linking)
- [ ] **Badge count** management

### Notification Categories
- [ ] Transactional (order updates, messages, etc.)
- [ ] Marketing (promotions, reminders, etc.)
- [ ] User preferences for notification types

---

## 12. Performance Optimization

### Image Optimization
- [ ] **`expo-image`** used (faster than Image component)
- [ ] **Image caching** enabled
- [ ] **Lazy loading** for lists

### List Performance
- [ ] **FlatList** or **FlashList** for long lists
- [ ] **`keyExtractor`** properly implemented
- [ ] **`getItemLayout`** for fixed-height items
- [ ] **`windowSize`** optimized

### Bundle Size
- [ ] **Unused dependencies** removed
- [ ] **Code splitting** where possible
- [ ] **Asset optimization** (compress images)

### Memory Management
- [ ] **Event listeners** cleaned up in `useEffect`
- [ ] **Subscriptions** unsubscribed on unmount
- [ ] **Large data** paginated or virtualized

---

## 13. Offline Support (if applicable)

- [ ] **Network state detection** (`expo-network`)
- [ ] **Offline UI** indicators
- [ ] **Request queuing** for offline actions
- [ ] **Optimistic UI updates**
- [ ] **Conflict resolution** strategy (if sync required)

---

## 14. Analytics & Monitoring

- [ ] **Analytics** integrated
  - [ ] Firebase Analytics
  - [ ] Amplitude
  - [ ] Mixpanel
  - [ ] PostHog
- [ ] **Error tracking** (Sentry, Bugsnag)
- [ ] **Crash reporting** (Firebase Crashlytics)
- [ ] **Performance monitoring**

### Event Tracking
- [ ] User sign-up
- [ ] Screen views
- [ ] Feature usage
- [ ] Errors/failures

---

## 15. Build & Deployment

### Development Builds
- [ ] **Expo Go** tested (development)
- [ ] **Development build** created (if custom native modules)
- [ ] **Internal distribution** (TestFlight, Google Play Internal Testing)

### Production Builds
- [ ] **iOS build** configured in `eas.json`
  - [ ] Bundle identifier
  - [ ] App Store provisioning
  - [ ] App icon (all sizes)
- [ ] **Android build** configured in `eas.json`
  - [ ] Package name
  - [ ] Keystore configured
  - [ ] App icon (all sizes)
- [ ] **Build successfully** runs (`eas build`)

### App Store Submission
- [ ] **App Store Connect** configured
  - [ ] App metadata (name, description, screenshots)
  - [ ] Privacy policy URL
  - [ ] Support URL
  - [ ] Age rating
- [ ] **Google Play Console** configured
  - [ ] App metadata
  - [ ] Feature graphic, screenshots
  - [ ] Content rating
- [ ] **App review** guidelines followed
  - [ ] No crashy bugs
  - [ ] Proper permission descriptions
  - [ ] Functional login/signup

### OTA Updates
- [ ] **EAS Update** configured for OTA updates
- [ ] **Update channel** strategy (production, staging)
- [ ] **Update rollout** plan

---

## 16. Testing

- [ ] **Unit tests** for utilities/hooks
- [ ] **Component tests** (React Native Testing Library)
- [ ] **Integration tests** for API interactions
- [ ] **E2E tests** (Detox, Maestro)
  - [ ] Auth flow
  - [ ] Critical user journeys
- [ ] **Device testing**
  - [ ] iOS (various screen sizes)
  - [ ] Android (various screen sizes)
  - [ ] Tablets (if supported)

**Agents Involved**:
- `spec-test` (generate test cases)

---

## 17. Security

- [ ] **API keys** stored in environment variables
- [ ] **Sensitive data** encrypted in Secure Store
- [ ] **Certificate pinning** (if high-security app)
- [ ] **Code obfuscation** (if needed)
- [ ] **No hardcoded secrets** in code
- [ ] **Deep link validation** (prevent malicious links)

**Agents Involved**:
- `security-sentinel` (security audit)

---

## 18. Documentation

- [ ] **README.md** with setup instructions
- [ ] **Environment setup** guide
- [ ] **Build instructions** (EAS, local)
- [ ] **API documentation** (if custom backend)
- [ ] **Component documentation** (comments or Storybook)

---

## Variation Notes

**What's Rigid**:
- Expo must be used for mobile apps (React Native)
- TypeScript is required
- Apple Sign-In required for iOS App Store submission

**What's Flexible**:
- State management solution
- UI component library vs custom
- Backend provider (Supabase, Firebase, custom)
- Analytics platform

---

## Truth Disclaimer

This checklist represents common Expo mobile patterns from Solomon Technologies projects. Adapt based on project requirements and platform guidelines.

---

## Related Checklists

- [Universal Foundation](../universal/00-FOUNDATION.md) - Complete first
- [Marketing Site](../marketing-site/MARKETING-SITE.md) - Often paired with mobile apps
- [Agent Coordination Playbook](../agent-playbooks/MOBILE-APP-SETUP.md)

---

## Agent Coordination for Expo Setup

**Recommended Agent Flow**:
1. `db-guardian` - Database schema + migrations
2. `security-sentinel` - Auth + secure storage audit
3. `algo-auditor` - API routes validation
4. `frontend-validator` - Mobile UI flows + device permissions
5. `diablo-systematic-coder` - Feature implementation

See [Mobile App Setup Playbook](../agent-playbooks/MOBILE-APP-SETUP.md) for details.
