# MOBILE UI VALIDATOR - PRE-FLIGHT CHECKLIST

**Agent**: mobile-ui-validator
**Version**: 1.0
**Created**: 2026-01-10
**Purpose**: Pre-validation checks before scanning mobile UI

---

## Purpose

Pre-flight checks ensure the mobile-ui-validator agent:
- Runs on appropriate projects (Expo/React Native only)
- Has access to necessary files
- Understands project structure
- Can generate accurate reports

**Never skip pre-flight checks.**

---

## Pre-Flight Checklist

```bash
PRE_MOBILE_UI_VALIDATION=(
  # Project Type Verification
  "[ ] Checked for app.json (Expo config)"
  "[ ] Checked for app.config.js (Expo config alternative)"
  "[ ] Verified expo in package.json dependencies"
  "[ ] Confirmed project is React Native (not React web)"

  # Directory Structure
  "[ ] Verified /app directory exists (Expo Router)"
  "[ ] OR verified /screens directory exists (traditional navigation)"
  "[ ] Checked for /components directory"

  # File Access
  "[ ] Can read TypeScript/JavaScript files (.tsx, .jsx)"
  "[ ] Identified all screen files to scan"
  "[ ] Counted total files to validate"

  # Configuration
  "[ ] Checked for .mobile-ui-validator.config.js (custom thresholds)"
  "[ ] Loaded default thresholds if no config found"
  "[ ] Verified validation rules are loaded"

  # Context Understanding
  "[ ] Identified app type (consumer app, B2B, e-commerce, etc.)"
  "[ ] Noted existing navigation pattern (tabs, stack, drawer)"
  "[ ] Checked for existing UI library (NativeBase, React Native Paper, etc.)"
)
```

---

## Step-by-Step Execution

### Step 1: Verify Project is Expo/React Native

**Check for Expo:**
```bash
# Check app.json exists
ls app.json

# OR check app.config.js exists
ls app.config.js

# Check package.json for expo
grep -i "expo" package.json
```

**Expected Results:**
- ✅ `app.json` OR `app.config.js` found
- ✅ `package.json` contains `"expo": "^XX.X.X"`
- ✅ `package.json` contains `"react-native": "^X.XX.X"`

**If Check Fails:**
```markdown
❌ PRE-FLIGHT FAILED: Not an Expo project

**Detected:**
- No app.json or app.config.js found
- No expo in package.json

**Action:** HALT validation

**Reason:** mobile-ui-validator only works on Expo/React Native projects.

**User Recommendation:**
This appears to be a [web/other] project. Use frontend-validator agent instead.
```

---

### Step 2: Verify Directory Structure

**Check for app directory (Expo Router):**
```bash
ls -la app/
```

**OR check for screens directory (traditional):**
```bash
ls -la screens/
```

**Expected Results:**
- ✅ `/app/` directory exists (Expo Router pattern)
- OR ✅ `/screens/` directory exists (traditional pattern)

**Example Structure (Expo Router):**
```
app/
├── (auth)/
│   ├── login.tsx
│   └── signup.tsx
├── (tabs)/
│   ├── _layout.tsx
│   ├── home.tsx
│   ├── profile.tsx
│   └── settings.tsx
├── onboarding.tsx
└── _layout.tsx
```

**Example Structure (Traditional):**
```
screens/
├── auth/
│   ├── LoginScreen.tsx
│   └── SignupScreen.tsx
├── HomeScreen.tsx
├── ProfileScreen.tsx
└── SettingsScreen.tsx
```

**If Check Fails:**
```markdown
❌ PRE-FLIGHT FAILED: No screen directories found

**Checked:**
- /app/ → Not found
- /screens/ → Not found

**Action:** HALT validation

**User Recommendation:**
Could not locate screen files. Please specify directory structure.
```

---

### Step 3: Identify Files to Scan

**Scan for all screen files:**
```bash
# Expo Router pattern
find app/ -name "*.tsx" -o -name "*.jsx"

# Traditional pattern
find screens/ -name "*.tsx" -o -name "*.jsx"

# Components (optional)
find components/ -name "*.tsx" -o -name "*.jsx"
```

**Count files:**
```bash
total_files=$(find app/ screens/ components/ -name "*.tsx" -o -name "*.jsx" 2>/dev/null | wc -l)
echo "Total files to scan: $total_files"
```

**Expected Results:**
- ✅ At least 1 screen file found
- ✅ File extensions are .tsx or .jsx

**Priority Files (Scan First):**
1. `**/signup.tsx`, `**/register.tsx`
2. `**/login.tsx`, `**/signin.tsx`
3. `**/onboarding.tsx`, `**/welcome.tsx`
4. `**/settings.tsx`
5. `**/profile/edit.tsx`, `**/account/edit.tsx`

**Log in Session File:**
```markdown
### Mobile UI Validator Pre-Flight

**Project Type:** Expo (app.json found)
**Directory Structure:** Expo Router (/app directory)
**Total Files to Scan:** 47 files
**Priority Files Identified:**
- app/(auth)/signup.tsx ✅
- app/(auth)/login.tsx ✅
- app/onboarding.tsx ✅
- app/(tabs)/settings.tsx ✅
- app/profile/edit.tsx ✅

All pre-flight checks passed ✅
```

---

### Step 4: Load Configuration

**Check for custom config:**
```bash
ls .mobile-ui-validator.config.js
```

**If exists, load custom thresholds:**
```javascript
// .mobile-ui-validator.config.js
const config = require('./.mobile-ui-validator.config.js');

const thresholds = {
  maxInputsInScrollView: config.maxInputsInScrollView || 5,
  maxSettingsItems: config.maxSettingsItems || 10,
  maxOnboardingScreens: config.maxOnboardingScreens || 5,
  enforceKeyboardAvoidance: config.enforceKeyboardAvoidance ?? true,
  enforceNativePicker: config.enforceNativePicker ?? true,
};
```

**If not exists, use defaults:**
```javascript
const thresholds = {
  maxInputsInScrollView: 5,
  maxSettingsItems: 10,
  maxOnboardingScreens: 5,
  enforceKeyboardAvoidance: true,
  enforceNativePicker: true,
};
```

**Log Configuration:**
```markdown
**Configuration:**
- Max inputs in ScrollView: 5 (default)
- Max settings items: 10 (default)
- Enforce KeyboardAvoidingView: Yes
- Enforce native Picker: Yes
```

---

### Step 5: Understand Project Context

**Check navigation pattern:**
```bash
# Check for bottom tabs
grep -r "createBottomTabNavigator" app/ screens/

# Check for drawer
grep -r "createDrawerNavigator" app/ screens/

# Check for Expo Router tabs
grep -r "expo-router" package.json
```

**Check for UI library:**
```bash
grep -E "(native-base|react-native-paper|react-native-elements)" package.json
```

**Identify app type from README or package.json:**
```bash
# Check description
grep "description" package.json

# Check name
grep "name" package.json
```

**Log Context:**
```markdown
**Project Context:**
- Navigation: Bottom tabs (detected in app/(tabs)/_layout.tsx) ✅
- UI Library: None (using base React Native components)
- App Type: Consumer mobile app (from package.json description)
- Existing Patterns: Clean, mobile-first structure detected
```

---

## Pre-Flight Pass Criteria

**All checks MUST pass:**

✅ **Project Type:**
- Expo project confirmed (app.json OR app.config.js)
- React Native dependencies in package.json

✅ **File Access:**
- Screen directory exists (/app OR /screens)
- At least 1 screen file found (.tsx or .jsx)
- Can read file contents

✅ **Configuration:**
- Validation rules loaded
- Thresholds configured (custom or default)

✅ **Context:**
- Project structure understood
- Navigation pattern identified (if any)

---

## Pre-Flight Fail Scenarios

### Scenario 1: Not an Expo Project

```markdown
❌ PRE-FLIGHT FAILED

**Issue:** Project is not Expo/React Native

**Checks:**
- [❌] app.json found → Not found
- [❌] expo in package.json → Not found
- [✅] package.json exists → Found
- [❌] react-native in package.json → Not found

**Detected Type:** React web project (Next.js/Vite detected)

**Action:** HALT validation

**Recommendation:** Use frontend-validator agent for web projects.
```

---

### Scenario 2: No Screen Files Found

```markdown
❌ PRE-FLIGHT FAILED

**Issue:** No screen files to validate

**Checks:**
- [✅] app.json found → Expo project confirmed
- [❌] /app directory → Not found
- [❌] /screens directory → Not found
- [✅] package.json has expo → Found

**Action:** HALT validation

**Recommendation:**
This is an Expo project but no screens exist yet.
Run mobile-ui-validator AFTER screens are created.
```

---

### Scenario 3: File Access Denied

```markdown
❌ PRE-FLIGHT FAILED

**Issue:** Cannot read screen files

**Checks:**
- [✅] app.json found → Expo project confirmed
- [✅] /app directory exists → Found
- [❌] Can read /app/*.tsx files → Permission denied

**Action:** HALT validation

**Recommendation:** Check file permissions. Ensure agent has read access.
```

---

## Pre-Flight Success Example

```markdown
### Mobile UI Validator Pre-Flight Checks

**Pre-flight checklist:**
- [✅] app.json found (Expo 50.0.0)
- [✅] package.json has expo dependency ✅
- [✅] package.json has react-native (0.73.4) ✅
- [✅] Project is React Native (confirmed)

**Directory structure:**
- [✅] /app directory exists (Expo Router detected)
- [✅] /components directory exists
- [✅] Total screen files found: 18 files

**Priority files identified:**
- [✅] app/(auth)/signup.tsx
- [✅] app/(auth)/login.tsx
- [✅] app/onboarding.tsx
- [✅] app/(tabs)/settings/index.tsx
- [✅] app/profile/edit.tsx

**Configuration:**
- [✅] No custom config found, using defaults
- Max inputs in ScrollView: 5
- Max settings items: 10
- Enforce KeyboardAvoidingView: Yes
- Enforce native Picker: Yes

**Project context:**
- Navigation: Bottom tabs (Expo Router)
- UI Library: None (base React Native)
- App Type: Consumer mobile app
- Structure: Clean Expo Router structure ✅

**Validation rules:**
- [✅] Rule 1: Vertical Scrolling Forms (CRITICAL)
- [✅] Rule 2: Vertical Scrolling Onboarding (WARNING)
- [✅] Rule 3: Long Settings Pages (WARNING)
- [✅] Rule 4: Web-Style Navigation (WARNING)
- [✅] Rule 5: Missing KeyboardAvoidingView (WARNING)
- [✅] Rule 6: Desktop Dropdowns (INFO)

**All pre-flight checks passed ✅**

**Proceeding with mobile UI validation...**
```

---

## Integration with Activation

**When mobile-ui-validator is activated:**

1. **Run pre-flight checks FIRST**
2. **Log all results in session file**
3. **Only proceed if ALL checks pass**
4. **If checks fail, report to user and HALT**

**From ACTIVATE.md:**
```
## Activation Protocol

### Pre-Flight Checks (MANDATORY)

Run all checks from PRE-FLIGHT.md before scanning.

If any check fails → HALT and report to user
If all checks pass → Proceed to Step 1: Project Detection
```

---

## What to Do If Pre-Flight Fails

### Option 1: Not Expo Project
```
User: Run /mobile-ui-check

Agent: Pre-flight failed. This is not an Expo project.

Detected: Next.js web app

Recommendation: Use /review-changes or frontend-validator agent instead.
```

### Option 2: No Screens Yet
```
User: Run /mobile-ui-check

Agent: Pre-flight failed. No screen files found.

This is an Expo project, but no screens exist yet.

Recommendation: Create screens first, then run /mobile-ui-check.
```

### Option 3: Partial Failure (e.g., missing components dir)
```
Agent: Pre-flight partial warning.

/components directory not found. Will scan /app only.

Proceeding with validation...
```

---

**Pre-flight checks prevent false reports and wasted validation cycles.**

**If in doubt, run pre-flight. If pre-flight fails, HALT and report.**

---

**Version**: 1.0
**Created**: 2026-01-10
**Authority**: FORGE Mobile Standards
**Maintained By**: mobile-ui-validator agent
