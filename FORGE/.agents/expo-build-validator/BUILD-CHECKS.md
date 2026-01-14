# EXPO BUILD VALIDATION CHECKS

**Agent**: expo-build-validator
**Version**: 1.0
**Created**: 2026-01-10
**Purpose**: Comprehensive pre-build validation rules

---

## Overview

This document defines all validation checks the expo-build-validator agent performs before submitting builds to EAS (Expo Application Services).

**Check Priority Levels:**
- **CRITICAL** - Blocks build, must fix before submission
- **WARNING** - May cause issues, should fix before production
- **INFO** - Best practice suggestion, recommended to fix

---

## Check 1: App Configuration Validation (CRITICAL)

### app.json / app.config.js Required Fields

**Validation Rules:**

```javascript
// CRITICAL: These fields MUST exist and be valid
const requiredFields = {
  "expo.name": {
    type: "string",
    minLength: 1,
    maxLength: 30,  // App Store limit
    pattern: /^[a-zA-Z0-9 &'-]+$/,  // Allowed characters
    error: "App name missing or invalid"
  },

  "expo.slug": {
    type: "string",
    minLength: 1,
    pattern: /^[a-z0-9-]+$/,  // Lowercase, numbers, dashes only
    error: "Slug missing or invalid (must be lowercase-with-dashes)"
  },

  "expo.version": {
    type: "string",
    pattern: /^\d+\.\d+\.\d+$/,  // Semver: 1.0.0
    error: "Version missing or not in semver format (x.y.z)"
  },

  "expo.orientation": {
    type: "string",
    enum: ["portrait", "landscape", "default"],
    error: "Orientation must be portrait, landscape, or default"
  },

  "expo.icon": {
    type: "string",
    mustExist: true,  // File must exist at path
    error: "Icon path missing or file doesn't exist"
  },

  "expo.splash.image": {
    type: "string",
    mustExist: true,
    error: "Splash screen path missing or file doesn't exist"
  },

  // Platform-specific
  "expo.ios.bundleIdentifier": {
    platform: "ios",
    type: "string",
    pattern: /^[a-zA-Z0-9.-]+$/,  // Reverse domain notation
    error: "iOS bundle identifier missing or invalid"
  },

  "expo.android.package": {
    platform: "android",
    type: "string",
    pattern: /^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)+$/,  // Java package format
    error: "Android package name missing or invalid"
  }
};
```

**Validation Logic:**

```javascript
function validateAppConfig(appJson, platform) {
  const errors = [];
  const warnings = [];

  // Check each required field
  for (const [path, rules] of Object.entries(requiredFields)) {
    // Skip if platform-specific and doesn't match
    if (rules.platform && rules.platform !== platform) continue;

    const value = getNestedValue(appJson, path);

    // Check existence
    if (!value) {
      errors.push({
        severity: 'CRITICAL',
        field: path,
        message: rules.error,
        fix: `Add "${path}" to app.json`
      });
      continue;
    }

    // Check type
    if (typeof value !== rules.type) {
      errors.push({
        severity: 'CRITICAL',
        field: path,
        message: `${path} must be ${rules.type}`,
        current: typeof value
      });
      continue;
    }

    // Check pattern
    if (rules.pattern && !rules.pattern.test(value)) {
      errors.push({
        severity: 'CRITICAL',
        field: path,
        message: rules.error,
        current: value,
        expected: rules.pattern.toString()
      });
    }

    // Check enum
    if (rules.enum && !rules.enum.includes(value)) {
      errors.push({
        severity: 'CRITICAL',
        field: path,
        message: rules.error,
        current: value,
        expected: rules.enum.join(', ')
      });
    }

    // Check file existence
    if (rules.mustExist && !fs.existsSync(value)) {
      errors.push({
        severity: 'CRITICAL',
        field: path,
        message: `File not found: ${value}`,
        fix: `Create file at ${value} or update path in app.json`
      });
    }

    // Check length
    if (rules.minLength && value.length < rules.minLength) {
      errors.push({
        severity: 'CRITICAL',
        field: path,
        message: `${path} too short (min: ${rules.minLength})`,
        current: value.length
      });
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      errors.push({
        severity: 'WARNING',
        field: path,
        message: `${path} too long (max: ${rules.maxLength})`,
        current: value.length,
        note: 'May be truncated in App Store'
      });
    }
  }

  return { errors, warnings };
}
```

**Common Errors:**

```
❌ name: Missing
   Fix: Add "expo.name": "My App" to app.json

❌ slug: "MyApp" (contains uppercase)
   Fix: Change to "my-app" (lowercase with dashes)

❌ version: "1.0" (not semver)
   Fix: Change to "1.0.0" (three numbers)

❌ icon: "./assets/icon.png" (file doesn't exist)
   Fix: Create icon.png at ./assets/ or update path

❌ ios.bundleIdentifier: Missing
   Fix: Add "expo.ios.bundleIdentifier": "com.company.app"

❌ android.package: "Com.Company.App" (contains uppercase)
   Fix: Change to "com.company.app" (all lowercase)
```

---

## Check 2: Bundle Identifier Consistency (CRITICAL)

### iOS and Android Bundle IDs Must Match

**Validation Rule:**

```javascript
function validateBundleIDConsistency(appJson) {
  const iosBundleId = appJson.expo?.ios?.bundleIdentifier;
  const androidPackage = appJson.expo?.android?.package;

  if (iosBundleId && androidPackage && iosBundleId !== androidPackage) {
    return {
      severity: 'CRITICAL',
      message: 'iOS bundle identifier and Android package name should match',
      ios: iosBundleId,
      android: androidPackage,
      fix: 'Update app.json to use same identifier for both platforms',
      reason: 'Prevents confusion, ensures consistent app identity across platforms'
    };
  }

  return null;
}
```

**Example Error:**

```
❌ Bundle ID Mismatch

iOS:     com.company.myapp
Android: com.company.my-app

Fix: Choose one and update both:
- Option 1: Use "com.company.myapp" for both
- Option 2: Use "com.company.my-app" for both (less common, but valid)

Recommendation: Use "com.company.myapp" (no hyphens)
```

---

## Check 3: Version Consistency (WARNING)

### Ensure Versions Are Incremented

**Validation Rules:**

```javascript
function validateVersionIncrement(appJson, lastReleasedVersion) {
  const currentVersion = appJson.expo.version;
  const iosBuildNumber = appJson.expo.ios?.buildNumber;
  const androidVersionCode = appJson.expo.android?.versionCode;

  const issues = [];

  // Check if version incremented since last release
  if (lastReleasedVersion && currentVersion === lastReleasedVersion) {
    issues.push({
      severity: 'WARNING',
      message: 'Version not incremented since last release',
      current: currentVersion,
      last: lastReleasedVersion,
      fix: 'Increment version to 1.0.1 or higher'
    });
  }

  // iOS build number should increment
  if (!iosBuildNumber || iosBuildNumber === '0') {
    issues.push({
      severity: 'INFO',
      message: 'iOS build number missing or zero',
      fix: 'Set expo.ios.buildNumber to "1" or higher'
    });
  }

  // Android version code should increment
  if (!androidVersionCode || androidVersionCode === 0) {
    issues.push({
      severity: 'INFO',
      message: 'Android version code missing or zero',
      fix: 'Set expo.android.versionCode to 1 or higher'
    });
  }

  return issues;
}
```

**Versioning Best Practices:**

```
Version Format:
- expo.version: "1.0.0" (user-facing, semver)
- expo.ios.buildNumber: "1" (increment every build)
- expo.android.versionCode: 1 (increment every build, integer)

Increment Rules:
- Major: Breaking changes (2.0.0)
- Minor: New features (1.1.0)
- Patch: Bug fixes (1.0.1)

Build Numbers:
- iOS buildNumber: String, can be "1", "2", "100"
- Android versionCode: Integer, must increment every submission
```

---

## Check 4: Asset Validation (CRITICAL)

### Verify All Assets Exist and Meet Requirements

**Asset Requirements:**

```javascript
const assetRequirements = {
  icon: {
    path: 'expo.icon',
    required: true,
    dimensions: { width: 1024, height: 1024 },
    format: ['png'],
    note: 'App icon for all platforms'
  },

  splash: {
    path: 'expo.splash.image',
    required: true,
    dimensions: { minWidth: 1284, minHeight: 2778 },
    format: ['png'],
    note: 'Splash screen (iPhone 14 Pro Max size recommended)'
  },

  adaptiveIcon: {
    path: 'expo.android.adaptiveIcon.foregroundImage',
    required: false,  // Required for Android if targeting API 26+
    platform: 'android',
    dimensions: { width: 1024, height: 1024 },
    format: ['png'],
    note: 'Android adaptive icon (API 26+)'
  },

  favicon: {
    path: 'expo.web.favicon',
    required: false,
    platform: 'web',
    dimensions: { width: 48, height: 48 },
    format: ['png', 'ico'],
    note: 'Web favicon'
  }
};
```

**Validation Logic:**

```javascript
function validateAssets(appJson, platform) {
  const errors = [];
  const warnings = [];

  for (const [assetName, requirements] of Object.entries(assetRequirements)) {
    // Skip if platform-specific and doesn't match
    if (requirements.platform && requirements.platform !== platform) continue;

    const assetPath = getNestedValue(appJson, requirements.path);

    // Check if required
    if (requirements.required && !assetPath) {
      errors.push({
        severity: 'CRITICAL',
        asset: assetName,
        message: `${assetName} path missing in app.json`,
        fix: `Add "${requirements.path}": "./assets/${assetName}.png"`
      });
      continue;
    }

    if (!assetPath) continue;  // Not required and not set

    // Check file exists
    if (!fs.existsSync(assetPath)) {
      errors.push({
        severity: 'CRITICAL',
        asset: assetName,
        path: assetPath,
        message: `${assetName} file not found`,
        fix: `Create file at ${assetPath} or update path in app.json`
      });
      continue;
    }

    // Check file format
    const ext = path.extname(assetPath).slice(1);
    if (!requirements.format.includes(ext)) {
      errors.push({
        severity: 'CRITICAL',
        asset: assetName,
        path: assetPath,
        message: `Invalid format: .${ext}`,
        expected: requirements.format.join(', ')
      });
    }

    // Check dimensions (if image)
    if (requirements.dimensions) {
      const dimensions = getImageDimensions(assetPath);

      if (requirements.dimensions.width && dimensions.width !== requirements.dimensions.width) {
        warnings.push({
          severity: 'WARNING',
          asset: assetName,
          path: assetPath,
          message: `Width ${dimensions.width}px (expected: ${requirements.dimensions.width}px)`,
          note: 'May be resized, potentially losing quality'
        });
      }

      if (requirements.dimensions.minWidth && dimensions.width < requirements.dimensions.minWidth) {
        warnings.push({
          severity: 'WARNING',
          asset: assetName,
          path: assetPath,
          message: `Width too small: ${dimensions.width}px (min: ${requirements.dimensions.minWidth}px)`,
          note: 'May appear blurry on larger devices'
        });
      }
    }
  }

  return { errors, warnings };
}
```

**Common Asset Errors:**

```
❌ Icon missing
   Path: ./assets/icon.png
   Fix: Create 1024x1024 PNG icon

❌ Splash screen dimensions incorrect
   Current: 800x1200
   Expected: 1284x2778 (or larger)
   Fix: Resize splash screen to recommended dimensions

❌ Adaptive icon missing (Android)
   Path: ./assets/adaptive-icon.png
   Fix: Create 1024x1024 PNG adaptive icon for Android

⚠️ Icon smaller than recommended
   Current: 512x512
   Expected: 1024x1024
   Note: Will be upscaled, may lose quality
```

---

## Check 5: Referenced Assets Scan (WARNING)

### Scan Code for Missing Asset References

**Scan Patterns:**

```javascript
const assetPatterns = [
  // Image imports
  /require\(['"](\.[^'"]+\.(png|jpg|jpeg|gif|svg))['"\]]/g,

  // Image source props
  /<Image\s+source=\{require\(['"]([^'"]+)['"\]\)\}/g,

  // Font files
  /useFonts\(\{[^}]*['"]([^'"]+\.(ttf|otf))['"][^}]*\}/g,
];

function scanForMissingAssets(projectDir) {
  const missingAssets = [];
  const files = glob.sync(`${projectDir}/**/*.{ts,tsx,js,jsx}`, {
    ignore: ['**/node_modules/**']
  });

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');

    for (const pattern of assetPatterns) {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        const assetPath = match[1];
        const resolvedPath = path.resolve(path.dirname(file), assetPath);

        if (!fs.existsSync(resolvedPath)) {
          missingAssets.push({
            severity: 'WARNING',
            file: file,
            assetPath: assetPath,
            resolvedPath: resolvedPath,
            message: 'Referenced asset not found',
            fix: `Create asset at ${resolvedPath} or update reference`
          });
        }
      }
    }
  }

  return missingAssets;
}
```

**Example Warning:**

```
⚠️ Missing Asset Reference

File: app/components/ProfileCard.tsx
Line: 42
Code: <Image source={require('./assets/placeholder.png')} />
Issue: ./assets/placeholder.png not found

Fix: Create placeholder.png or update reference
```

---

## Check 6: Dependency Validation (CRITICAL)

### Verify Dependencies Are Compatible

**Validation Rules:**

```javascript
function validateDependencies(packageJson, expoSdkVersion) {
  const errors = [];
  const warnings = [];

  // Get recommended React Native version for Expo SDK
  const recommendedRN = getRecommendedReactNativeVersion(expoSdkVersion);

  // Check React Native version
  const currentRN = packageJson.dependencies['react-native'];
  if (currentRN && currentRN !== recommendedRN) {
    warnings.push({
      severity: 'WARNING',
      package: 'react-native',
      current: currentRN,
      recommended: recommendedRN,
      message: 'React Native version may not be compatible with Expo SDK',
      fix: `Update to ${recommendedRN} or check Expo docs`
    });
  }

  // Check for deprecated Expo packages
  const deprecatedPackages = {
    'expo-facebook': 'Deprecated. Use expo-auth-session with Facebook provider.',
    'expo-google-sign-in': 'Deprecated. Use expo-auth-session with Google provider.',
    'expo-app-auth': 'Deprecated. Use expo-auth-session instead.'
  };

  for (const [pkg, reason] of Object.entries(deprecatedPackages)) {
    if (packageJson.dependencies[pkg] || packageJson.devDependencies[pkg]) {
      warnings.push({
        severity: 'WARNING',
        package: pkg,
        message: 'Deprecated package detected',
        reason: reason,
        fix: `Remove ${pkg} and follow migration guide`
      });
    }
  }

  // Check for conflicting peer dependencies
  // (This would use npm/yarn to detect peer dep conflicts)

  return { errors, warnings };
}
```

**Expo SDK vs React Native Version Table:**

```
Expo SDK 50: React Native 0.73.x
Expo SDK 49: React Native 0.72.x
Expo SDK 48: React Native 0.71.x
```

**Common Dependency Errors:**

```
⚠️ React Native version mismatch
   Current: 0.72.0
   Expected: 0.73.4 (for Expo SDK 50)
   Fix: Update react-native in package.json

⚠️ Deprecated package: expo-facebook
   Reason: No longer supported
   Fix: Migrate to expo-auth-session with Facebook provider

❌ Conflicting peer dependencies
   Package: @react-native-community/datetimepicker
   Required: react-native >=0.73.0
   Installed: react-native 0.72.0
   Fix: Upgrade react-native to 0.73.0 or higher
```

---

## Check 7: Environment & Secrets (CRITICAL)

### Scan for Hardcoded Secrets

**Patterns to Detect:**

```javascript
const secretPatterns = [
  {
    name: 'Google API Key',
    pattern: /AIza[0-9A-Za-z-_]{35}/g,
    severity: 'CRITICAL'
  },
  {
    name: 'AWS Access Key',
    pattern: /AKIA[0-9A-Z]{16}/g,
    severity: 'CRITICAL'
  },
  {
    name: 'Stripe Secret Key',
    pattern: /sk_live_[0-9a-zA-Z]{24,}/g,
    severity: 'CRITICAL'
  },
  {
    name: 'Private Key',
    pattern: /-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/g,
    severity: 'CRITICAL'
  },
  {
    name: 'Generic API Key Pattern',
    pattern: /(api_key|apikey|api-key)\s*[:=]\s*['"][a-zA-Z0-9]{20,}['"]/gi,
    severity: 'WARNING'
  }
];

function scanForHardcodedSecrets(projectDir) {
  const secrets = [];
  const files = glob.sync(`${projectDir}/**/*.{ts,tsx,js,jsx,json}`, {
    ignore: ['**/node_modules/**', '**/.env*']
  });

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');

    for (const { name, pattern, severity } of secretPatterns) {
      const matches = content.match(pattern);
      if (matches) {
        secrets.push({
          severity: severity,
          file: file,
          secretType: name,
          count: matches.length,
          message: `Hardcoded ${name} detected`,
          fix: 'Move to environment variables (.env) or EAS secrets'
        });
      }
    }
  }

  return secrets;
}
```

**Example Critical Error:**

```
❌ CRITICAL: Hardcoded Secret Detected

File: app/services/api.ts
Line: 12
Secret Type: Google API Key
Detected: AIzaSyB...

Fix:
1. Remove hardcoded key from code
2. Add to .env file:
   GOOGLE_API_KEY=AIzaSyB...
3. Use in code:
   import Constants from 'expo-constants';
   const apiKey = Constants.expoConfig?.extra?.googleApiKey;
4. Configure in eas.json or EAS secrets
```

---

## Check 8: EAS Build Configuration (CRITICAL)

### Validate eas.json Configuration

**Required Structure:**

```javascript
// eas.json
{
  "build": {
    "development": { /* ... */ },
    "preview": { /* ... */ },
    "production": {
      "ios": {
        "buildConfiguration": "Release"  // CRITICAL
      },
      "android": {
        "buildType": "app-bundle"         // CRITICAL for Play Store
      }
    }
  }
}
```

**Validation Rules:**

```javascript
function validateEASConfig(easJson, buildProfile) {
  const errors = [];
  const warnings = [];

  if (!easJson) {
    errors.push({
      severity: 'CRITICAL',
      message: 'eas.json not found',
      fix: 'Run: eas build:configure'
    });
    return { errors, warnings };
  }

  const profile = easJson.build?.[buildProfile];

  if (!profile) {
    errors.push({
      severity: 'CRITICAL',
      message: `Build profile "${buildProfile}" not found in eas.json`,
      fix: `Add "${buildProfile}" profile to eas.json`
    });
    return { errors, warnings };
  }

  // Check iOS configuration
  if (profile.ios) {
    if (buildProfile === 'production' && profile.ios.buildConfiguration !== 'Release') {
      errors.push({
        severity: 'CRITICAL',
        message: 'iOS production build must use "Release" configuration',
        current: profile.ios.buildConfiguration,
        fix: 'Set "buildConfiguration": "Release" in eas.json production.ios'
      });
    }
  }

  // Check Android configuration
  if (profile.android) {
    if (buildProfile === 'production' && profile.android.buildType === 'apk') {
      warnings.push({
        severity: 'WARNING',
        message: 'Android production build using APK (Google Play requires AAB)',
        current: 'apk',
        recommended: 'app-bundle',
        fix: 'Set "buildType": "app-bundle" for Play Store submission'
      });
    }
  }

  return { errors, warnings };
}
```

**Common EAS Configuration Issues:**

```
❌ eas.json missing
   Fix: Run `eas build:configure` to create it

❌ Production profile missing
   Fix: Add "production" profile to eas.json

❌ iOS not using Release configuration
   Current: Debug
   Expected: Release (for production)
   Fix: Set "buildConfiguration": "Release"

⚠️ Android using APK for production
   Current: "buildType": "apk"
   Recommended: "buildType": "app-bundle"
   Reason: Google Play requires AAB for new apps
```

---

## Validation Summary

### Critical Checks (Must Pass)
1. ✅ App configuration (name, slug, version, bundle IDs)
2. ✅ Asset existence (icon, splash screen)
3. ✅ Bundle ID consistency (iOS vs Android)
4. ✅ No hardcoded secrets
5. ✅ EAS configuration valid
6. ✅ Platform-specific requirements (see iOS/Android compliance docs)

### Warning Checks (Should Pass)
1. ⚠️ Version incremented
2. ⚠️ Asset dimensions optimal
3. ⚠️ No deprecated dependencies
4. ⚠️ All referenced assets exist
5. ⚠️ React Native version matches Expo SDK

### Info Checks (Nice to Pass)
1. ℹ️ Build numbers set
2. ℹ️ Environment variables configured
3. ℹ️ .gitignore includes .env files
4. ℹ️ README documents build process

---

**Version**: 1.0
**Created**: 2026-01-10
**Authority**: FORGE Mobile Standards
**Maintained By**: expo-build-validator agent
