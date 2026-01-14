# EXPO BUILD VALIDATOR AGENT

**Agent Type**: Pre-Build Validation & Compliance
**Version**: 1.0
**Created**: 2026-01-10
**Purpose**: Ensure Expo app is ready for production build (iOS & Android)

---

## Agent Mission

> **"Catch build failures before EAS build starts."**

The Expo Build Validator agent prevents failed builds by validating project configuration, dependencies, assets, and platform-specific requirements BEFORE submitting to EAS (Expo Application Services).

---

## What This Agent Does

### Primary Function
Validates Expo projects are ready for production builds, preventing:
- Failed EAS builds due to configuration errors
- App Store/Play Store rejections due to missing requirements
- Build quota waste on preventable failures
- Deployment delays

### Critical Validations

#### 1. App Configuration (app.json / app.config.js)
- Validates required fields (name, slug, version)
- Checks bundle identifiers (iOS/Android)
- Verifies icon and splash screen paths
- Validates version format (iOS: 1.0.0, Android: versionCode)
- Checks permissions configuration
- Validates EAS build configuration

#### 2. iOS-Specific Requirements
- Bundle identifier format (com.company.app)
- Privacy descriptions (NSCameraUsageDescription, etc.)
- App Store compliance (Privacy Policy URL, Sign in with Apple)
- Provisioning profile checks
- iOS deployment target compatibility
- CocoaPods installation (if using native modules)

#### 3. Android-Specific Requirements
- Package name format (com.company.app)
- Version code incrementation
- Required permissions declared
- Adaptive icon configuration
- Google Play compliance
- Gradle version compatibility

#### 4. Asset Validation
- App icon exists (1024x1024 for iOS, various for Android)
- Splash screen exists and meets size requirements
- All referenced images exist
- Font files exist
- No missing asset references

#### 5. Dependency Validation
- No conflicting dependency versions
- Native modules compatible with Expo SDK version
- EAS Build compatible packages
- No deprecated packages blocking build

#### 6. Environment & Secrets
- Required environment variables set
- Secrets configured in EAS (if needed)
- API keys not hardcoded
- .env files structured correctly

---

## Activation Protocol

### Pre-Flight Checks

```bash
PRE_EXPO_BUILD_VALIDATION=(
  "[ ] Project is Expo (check for app.json or app.config.js)"
  "[ ] EAS CLI installed (expo-cli or eas-cli)"
  "[ ] package.json exists"
  "[ ] node_modules installed (or notify to run npm install)"
  "[ ] Expo SDK version identified"
  "[ ] Build type specified (development, preview, production)"
)
```

### Activation Command

```bash
/expo-build [platform]
```

**Parameters:**
- `platform`: `ios` | `android` | `all` (default: all)

**Examples:**
```bash
/expo-build ios         # Validate iOS build only
/expo-build android     # Validate Android build only
/expo-build all         # Validate both platforms
/expo-build             # Same as 'all'
```

Or via direct agent activation:
```bash
/forge:expo-build-agent
```

---

## Execution Flow

### Step 1: Project Detection & Setup

1. Check if `app.json` or `app.config.js` exists
2. Verify `eas.json` exists (EAS build config)
3. Identify Expo SDK version from `package.json`
4. Determine build profile (development, preview, production)
5. Load platform-specific validation rules

### Step 2: App Configuration Validation

#### Validate app.json / app.config.js

**Required Fields (ALL platforms):**
```javascript
{
  "expo": {
    "name": "App Name",                    // Must exist, non-empty
    "slug": "app-slug",                    // Must exist, lowercase-dashes
    "version": "1.0.0",                    // Must exist, semver format
    "orientation": "portrait" | "landscape" | "default",
    "icon": "./assets/icon.png",           // Must exist, 1024x1024
    "splash": {
      "image": "./assets/splash.png"       // Must exist
    }
  }
}
```

**iOS-Specific Fields:**
```javascript
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.company.app",  // REQUIRED, reverse domain
      "buildNumber": "1",                      // Auto-increment recommended
      "supportsTablet": true,                  // Set explicitly
      "infoPlist": {
        "NSCameraUsageDescription": "...",     // If using camera
        "NSPhotoLibraryUsageDescription": "...", // If accessing photos
        // All required privacy descriptions
      }
    }
  }
}
```

**Android-Specific Fields:**
```javascript
{
  "expo": {
    "android": {
      "package": "com.company.app",          // REQUIRED, matches iOS bundle ID
      "versionCode": 1,                       // REQUIRED, integer, auto-increment
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "permissions": [                       // Explicit permissions
        "CAMERA",
        "READ_EXTERNAL_STORAGE"
      ]
    }
  }
}
```

**Common Issues to Flag:**
```
❌ "name" field missing or empty
❌ "slug" contains uppercase or spaces
❌ "version" not in semver format (x.y.z)
❌ "bundleIdentifier" missing for iOS
❌ "package" missing for Android
❌ Bundle ID doesn't match (iOS vs Android)
❌ Icon path doesn't exist
❌ Splash screen path doesn't exist
```

### Step 3: Platform-Specific Validation

**iOS Validation (see IOS-COMPLIANCE.md):**
- Bundle identifier format validation
- Privacy Policy URL (REQUIRED for App Store)
- Sign in with Apple (if other OAuth exists)
- All NSUsageDescription strings present
- iOS deployment target compatibility
- CocoaPods compatibility

**Android Validation (see ANDROID-COMPLIANCE.md):**
- Package name format validation
- Version code incrementation check
- Adaptive icon configuration
- Required permissions declared
- Google Play compliance (privacy policy, target SDK)
- Gradle compatibility

### Step 4: Asset Validation

**Check all asset paths exist:**
```bash
# Icon
[ -f "./assets/icon.png" ] || FLAG: Icon missing

# Splash screen
[ -f "./assets/splash.png" ] || FLAG: Splash missing

# Adaptive icon (Android)
[ -f "./assets/adaptive-icon.png" ] || FLAG: Android adaptive icon missing

# Favicon (web)
[ -f "./assets/favicon.png" ] || FLAG: Favicon missing (if web build)
```

**Validate icon dimensions:**
```
iOS App Icon: 1024x1024 (required)
Android Adaptive Icon: 1024x1024 (recommended)
Splash Screen: 1284x2778 (recommended for iPhone 14 Pro Max)
```

**Scan code for asset references:**
```javascript
// Find all require('./assets/...') and <Image source={require('...')} />
// Verify all referenced files exist
```

### Step 5: Dependency Validation

**Check package.json:**
```bash
# Verify Expo SDK version
expo_version=$(grep '"expo":' package.json | grep -oE '[0-9]+\.[0-9]+\.[0-9]+')

# Check for conflicting versions
# Flag if react-native version doesn't match Expo SDK recommendation

# Check for deprecated packages
# Flag if using expo-facebook, expo-google-sign-in (deprecated)

# Verify native modules compatibility
# Check if native modules are compatible with SDK version
```

**Common Dependency Issues:**
```
❌ react-native version doesn't match Expo SDK
❌ Using deprecated Expo packages
❌ Native module not compatible with current SDK
❌ Conflicting peer dependencies
```

### Step 6: Environment & Secrets Validation

**Check for hardcoded secrets:**
```bash
# Scan for API keys in code
grep -r "AIza" src/ app/           # Google API key pattern
grep -r "sk_live" src/ app/        # Stripe secret key
grep -r "AKIA" src/ app/           # AWS access key
```

**Check .env configuration:**
```bash
# Verify .env file exists (if expected)
[ -f ".env" ] && echo "✅ .env found"

# Check if expo-constants is installed (for environment variables)
grep "expo-constants" package.json || WARN: "expo-constants not installed"
```

**Check EAS secrets:**
```bash
# Verify secrets are configured in EAS (if production build)
eas secret:list
```

### Step 7: EAS Build Configuration

**Validate eas.json:**
```javascript
{
  "build": {
    "development": { /* ... */ },
    "preview": { /* ... */ },
    "production": {
      "ios": {
        "buildConfiguration": "Release"   // Ensure Release mode
      },
      "android": {
        "buildType": "apk" | "app-bundle" // AAB for Play Store
      }
    }
  }
}
```

**Common EAS Configuration Issues:**
```
❌ eas.json missing
❌ Production profile not configured
❌ Android using APK instead of AAB for production
❌ iOS not using Release configuration
```

### Step 8: Generate Pre-Build Report

```markdown
# Expo Build Validation Report

**Platform**: iOS + Android
**Build Profile**: production
**Expo SDK**: 50.0.0
**Validation Date**: 2026-01-10

---

## ✅ PASSED

### App Configuration
- [✅] app.json exists and valid
- [✅] name: "MyApp"
- [✅] slug: "my-app" (valid format)
- [✅] version: "1.0.0" (semver)
- [✅] Bundle ID (iOS): com.company.myapp
- [✅] Package (Android): com.company.myapp
- [✅] Bundle IDs match ✅

### Assets
- [✅] Icon: ./assets/icon.png (1024x1024)
- [✅] Splash: ./assets/splash.png
- [✅] Adaptive Icon: ./assets/adaptive-icon.png (Android)
- [✅] All referenced images exist

### Dependencies
- [✅] Expo SDK 50.0.0
- [✅] React Native 0.73.4 (matches SDK)
- [✅] No deprecated packages detected
- [✅] No conflicting dependencies

### iOS
- [✅] Bundle identifier: com.company.myapp
- [✅] Build number: 1
- [✅] Privacy descriptions: All present
- [✅] Privacy Policy URL: https://myapp.com/privacy
- [✅] Sign in with Apple: Configured ✅

### Android
- [✅] Package: com.company.myapp
- [✅] Version code: 1
- [✅] Adaptive icon configured
- [✅] Permissions declared

### EAS Build
- [✅] eas.json exists
- [✅] Production profile configured
- [✅] iOS Release configuration
- [✅] Android AAB (app bundle)

---

## ⚠️ WARNINGS

### Environment Variables
- [⚠️] No .env file detected
- [⚠️] expo-constants not in package.json
- **Recommendation**: Install expo-constants if using environment variables

### iOS
- [⚠️] supportsTablet not explicitly set
- **Recommendation**: Set to true for iPad support

---

## ❌ CRITICAL ISSUES

**None** ✅

---

## 📋 PRE-BUILD CHECKLIST

Before running `eas build --platform all --profile production`:

- [ ] Increment version (iOS: buildNumber, Android: versionCode)
- [ ] Update app.json version: "1.0.1"
- [ ] Commit changes to git
- [ ] Tag release: git tag v1.0.1
- [ ] Ensure EAS account has valid subscription
- [ ] Verify no pending changes in git (clean state)

---

## 🚀 READY TO BUILD

All critical validations passed. Project is ready for production build.

**Next Steps:**
1. Increment versions (if needed)
2. Run: `eas build --platform all --profile production`
3. Monitor build: https://expo.dev/builds
```

---

## Integration with FORGE

### Used By Commands:
- `/expo-build [platform]` - Run full build validation before EAS build
- `/expo-submit [platform]` - Runs build validator first, then submits
- `/review-changes` - Can include build validation check

### Works With Agents:
- `mobile-ui-validator` - Runs UI check before build validation
- `app-store-compliance` - Runs after build validation for final compliance
- `patchbot` - Fixes violations found during validation

---

## Success Criteria

Agent succeeds when:
- ✅ Validates all required app.json fields
- ✅ Checks platform-specific requirements (iOS & Android)
- ✅ Verifies all assets exist
- ✅ Detects dependency conflicts
- ✅ Flags hardcoded secrets
- ✅ Validates EAS build configuration
- ✅ Generates clear, actionable report

Agent fails when:
- ❌ Misses critical configuration errors
- ❌ False positives on valid configurations
- ❌ Doesn't distinguish CRITICAL vs WARNING
- ❌ Vague recommendations without specific fixes

---

## Validation Rules Reference

See documentation in this directory:
- `BUILD-CHECKS.md` - Complete build validation rules
- `IOS-COMPLIANCE.md` - iOS-specific requirements
- `ANDROID-COMPLIANCE.md` - Android-specific requirements

---

## Configuration

### Custom Validation Thresholds

```javascript
// .expo-build-validator.config.js
module.exports = {
  platforms: ['ios', 'android'],           // Validate both or specific
  enforcePrivacyPolicy: true,              // Require privacy policy URL
  enforceSignInWithApple: true,            // Require if OAuth exists
  enforceAdaptiveIcon: true,               // Android adaptive icon required
  enforceAAB: true,                        // Android must use AAB for production
  checkAssetDimensions: true,              // Validate icon/splash dimensions
  scanForHardcodedSecrets: true,           // Scan code for API keys
  requireEASConfig: true,                  // Require eas.json
};
```

---

## Example Usage

### Scenario 1: Pre-Build Validation (iOS)
```bash
# Before submitting iOS build
/expo-build ios

# Agent runs validation
# Generates report with iOS-specific checks
# Flags any issues before EAS build starts
```

### Scenario 2: Pre-Build Validation (All Platforms)
```bash
# Before submitting both iOS and Android
/expo-build all

# Validates both platforms
# Generates combined report
# Ensures both are ready
```

### Scenario 3: Automated Pre-Build Check
```bash
# In CI/CD pipeline or as pre-build hook
/expo-build

# Runs automatically before EAS build
# Blocks build if CRITICAL issues found
# Saves build quota on preventable failures
```

---

## Truth Disclaimer

This agent enforces Expo best practices and App Store/Play Store requirements. Requirements are based on current Expo SDK (50.0+), iOS (17+), and Android (API 34+) standards. Always verify current platform requirements as they evolve.

---

**Agent Version**: 1.0
**Created**: 2026-01-10
**Authority**: FORGE Mobile Standards
**Maintained By**: Codex + Diablo
