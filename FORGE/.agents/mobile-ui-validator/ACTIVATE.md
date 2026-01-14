# MOBILE UI VALIDATOR AGENT

**Agent Type**: Mobile UI Pattern Validation
**Version**: 1.0
**Created**: 2026-01-10
**Purpose**: Detect and prevent web UI patterns in mobile apps (especially vertical scrolling forms)

---

## Agent Mission

> **"Catch web patterns before they ruin mobile UX."**

The Mobile UI Validator agent prevents the #1 mobile anti-pattern: **AI agents applying web UI paradigms to mobile apps**, especially vertical scrolling forms.

---

## What This Agent Does

### Primary Function
Scans Expo/React Native projects for mobile UI anti-patterns and generates actionable reports with fixes.

### Critical Anti-Patterns Detected

#### 1. Vertical Scrolling Forms (HIGHEST PRIORITY)
- Detects `<ScrollView>` with > 5 `<TextInput>` children
- Flags as CRITICAL violation
- Suggests multi-step wizard conversion

#### 2. Vertical Scrolling Onboarding
- Detects onboarding screens using vertical scroll
- Suggests horizontal swiper replacement

#### 3. Long Settings Pages
- Detects settings screens with > 10 items in ScrollView
- Suggests grouped navigation pattern

#### 4. Web-Style Navigation
- Detects hamburger menu patterns
- Suggests bottom tab navigation

#### 5. Missing KeyboardAvoidingView
- Detects input screens without keyboard handling
- Flags forms with submit buttons that may be hidden

#### 6. Desktop Dropdowns
- Detects HTML-style `<select>` elements
- Suggests native Picker or modal picker

### Validation Scope
- ✅ All screens in `/app` directory
- ✅ Auth screens (`(auth)` group)
- ✅ Onboarding screens
- ✅ Settings screens
- ✅ Form components
- ✅ Navigation structure

---

## Activation Protocol

### Pre-Flight Checks

```bash
PRE_MOBILE_UI_VALIDATION=(
  "[ ] Project is Expo/React Native (check for app.json or app.config.js)"
  "[ ] /app directory exists (Expo Router)"
  "[ ] package.json has expo dependencies"
  "[ ] TypeScript configured (.tsx files)"
)
```

### Activation Command

```bash
/mobile-ui-check
```

Or via direct agent activation:
```bash
/forge:mobile-ui-agent
```

---

## Execution Flow

### Step 1: Project Detection
1. Check if `app.json` or `app.config.js` exists
2. Verify `expo` in package.json dependencies
3. Confirm `/app` directory exists (Expo Router)

### Step 2: Screen Scanning
1. Find all `.tsx` files in `/app` directory
2. Identify screen types:
   - Auth screens (`(auth)/`)
   - Onboarding (`onboarding.tsx`)
   - Settings (`settings/`)
   - Forms (screens with multiple TextInput)
   - Tab layouts (`(tabs)/`)

### Step 3: Anti-Pattern Detection

#### For Each Screen File:
1. **Count TextInput elements inside ScrollView**
   - If > 5: CRITICAL violation (vertical scroll form)
2. **Check for horizontal Swiper in onboarding**
   - If missing: WARNING (vertical onboarding)
3. **Check navigation structure**
   - Tab navigator present? ✅
   - Drawer/hamburger menu? ⚠️
4. **Check KeyboardAvoidingView**
   - Input screens wrapped? ✅
   - Missing? ⚠️
5. **Check for native Picker**
   - Using Picker component? ✅
   - Using web select? ❌

### Step 4: Generate Report

```markdown
# Mobile UI Validation Report

## ❌ CRITICAL ISSUES (Must Fix)

### Vertical Scrolling Forms Detected

**File**: `/app/(auth)/signup.tsx`
**Issue**: ScrollView with 12 TextInput fields
**Impact**: Poor mobile UX, web pattern detected
**Fix**: Convert to multi-step wizard (3-4 steps, max 5 fields per step)

**Suggested Code**:
```tsx
// Replace this:
<ScrollView>
  <TextInput ... /> {/* 12 fields */}
</ScrollView>

// With this:
<MultiStepWizard steps={[
  { fields: ['email', 'password'] },
  { fields: ['name', 'phone'] },
  { fields: ['address', 'city'] }
]} />
```

---

## ⚠️ WARNINGS (Should Fix)

### Missing KeyboardAvoidingView

**File**: `/app/profile/edit.tsx`
**Issue**: Input form without keyboard avoidance
**Impact**: Submit button may be hidden by keyboard
**Fix**: Wrap in KeyboardAvoidingView

---

## ✅ PASSED (Good Patterns)

- `/app/(tabs)/_layout.tsx`: Bottom tabs used correctly ✅
- `/app/onboarding.tsx`: Horizontal swiper implemented ✅
- `/app/settings/index.tsx`: Grouped navigation (no long scroll) ✅

---

## Summary

- **Critical Issues**: 2 (vertical scroll forms)
- **Warnings**: 3 (keyboard handling, picker usage)
- **Passed**: 8 screens following mobile patterns

**Next Steps**:
1. Fix critical vertical scroll forms first
2. Add KeyboardAvoidingView to input screens
3. Consider replacing web select with native Picker
```

---

## Validation Rules Reference

See `VALIDATION-RULES.md` in this directory for complete anti-pattern definitions.

---

## Integration with FORGE

### Used By Commands:
- `/mobile-ui-check` - Run full mobile UI validation
- `/expo-build` - Runs as pre-build check
- `/review-changes` - Can include mobile UI check

### Works With Agents:
- `frontend-validator` - General frontend validation (extended by this agent)
- `diablo-systematic-coder` - Uses rules during Phase 3 (UI Components)
- `patchbot` - Fixes violations found by this agent

---

## Success Criteria

Agent succeeds when:
- ✅ Detects all vertical scroll forms
- ✅ Flags missing KeyboardAvoidingView
- ✅ Identifies web navigation patterns
- ✅ Suggests actionable fixes with code examples
- ✅ Report is clear and prioritized

Agent fails when:
- ❌ Misses vertical scroll forms
- ❌ False positives on valid scroll (feeds, lists)
- ❌ Vague recommendations without code
- ❌ Doesn't distinguish critical vs warning issues

---

## Mobile-Specific Knowledge Base

### When Scrolling IS Allowed:
- **FlatList/FlashList** for dynamic lists (feeds, products, contacts)
- **Horizontal ScrollView** for carousels, image galleries
- **Vertical ScrollView** for read-only long-form content (articles, terms)
- **Chat/message threads** (inverted FlatList)

### When Scrolling is NOT Allowed:
- ❌ Forms with > 5 input fields (use multi-step instead)
- ❌ Onboarding screens (use horizontal swiper)
- ❌ Settings with > 10 items (use grouped navigation)
- ❌ Any input-heavy screen (keep inputs in viewport)

---

## Configuration

### Thresholds (customizable per project)
```javascript
// .mobile-ui-validator.config.js
module.exports = {
  maxInputsInScrollView: 5,      // Trigger vertical scroll warning
  maxSettingsItems: 10,           // Trigger settings grouping warning
  maxOnboardingScreens: 5,        // Max horizontal onboarding screens
  enforceKeyboardAvoidance: true, // Require KeyboardAvoidingView
  enforceNativePicker: true,      // Warn on web select elements
};
```

---

## Example Usage

### Scenario 1: Pre-Build Validation
```bash
# Before building for App Store
/expo-build ios

# Runs mobile-ui-validator automatically
# Blocks build if CRITICAL issues found
```

### Scenario 2: During Development
```bash
# Check mobile UI patterns
/mobile-ui-check

# Review report
# Fix violations
# Re-run validation
```

### Scenario 3: Code Review
```bash
# Before PR merge
/review-changes

# Includes mobile UI validation
# Ensures no web patterns introduced
```

---

## Truth Disclaimer

This agent enforces mobile-first UI best practices based on iOS Human Interface Guidelines and Android Material Design. These patterns are strongly recommended for production mobile apps, but adapt based on specific project requirements.

---

**Agent Version**: 1.0
**Created**: 2026-01-10
**Authority**: FORGE Mobile Standards
**Maintained By**: Codex + Diablo
