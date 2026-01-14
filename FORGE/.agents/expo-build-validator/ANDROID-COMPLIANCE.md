# ANDROID BUILD COMPLIANCE REQUIREMENTS

**Agent**: expo-build-validator
**Version**: 1.0
**Created**: 2026-01-10
**Purpose**: Android-specific build and Google Play Store compliance requirements

---

## Overview

This document defines all Android-specific requirements for successful EAS builds and Google Play Store submission.

**Android Validation Levels:**
- **CRITICAL** - Blocks Play Store submission, must fix
- **WARNING** - May cause rejection, should fix before submission
- **INFO** - Best practice, recommended

---

## Requirement 1: Package Name (CRITICAL)

### Package Name Format

**Validation Rule:**

```javascript
{
  field: "expo.android.package",
  required: true,
  pattern: /^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)+$/,
  format: "Java package format: com.company.app",
  examples: {
    valid: [
      "com.company.app",
      "com.company.myapp",
      "io.github.username.app",
      "com.company.my_app"  // Underscores allowed in segments
    ],
    invalid: [
      "myapp",                    // Missing domain
      "com.company.my-app",       // Hyphen not allowed
      "com.company.my app",       // Space not allowed
      "Com.Company.MyApp",        // Must be lowercase
      "com.company.123app"        // Cannot start with number
    ]
  }
}
```

**Best Practices:**
- Use lowercase only (REQUIRED)
- Use company domain in reverse (com.yourcompany.appname)
- Use underscores within segments if needed
- Avoid hyphens (use underscores instead)
- Keep it simple and consistent with iOS bundle ID

**Common Errors:**

```
❌ Package name missing
   Fix: Add "expo.android.package": "com.company.app" to app.json

❌ Package name contains uppercase
   Current: Com.Company.App
   Fix: Change to com.company.app (all lowercase)

❌ Package name contains hyphen
   Current: com.company.my-app
   Fix: Change to com.company.my_app or com.company.myapp

❌ Package name doesn't match iOS bundle ID
   iOS: com.company.app
   Android: com.company.myapp
   Fix: Update both to match (recommended: com.company.app)
```

---

## Requirement 2: Version Code (CRITICAL)

### Version Code Must Increment

**Validation Rule:**

```javascript
function validateVersionCode(appJson, lastSubmittedVersionCode) {
  const versionCode = appJson.expo?.android?.versionCode;

  if (!versionCode || versionCode === 0) {
    return {
      severity: 'CRITICAL',
      message: 'Version code missing or zero',
      fix: 'Add "expo.android.versionCode": 1 to app.json',
      requirement: 'Must be positive integer (1, 2, 3, ...)',
      note: 'Increment by 1 for each Play Store submission'
    };
  }

  if (typeof versionCode !== 'number' || !Number.isInteger(versionCode)) {
    return {
      severity: 'CRITICAL',
      message: 'Version code must be an integer',
      current: versionCode,
      currentType: typeof versionCode,
      fix: 'Change to integer: "versionCode": 1'
    };
  }

  if (lastSubmittedVersionCode && versionCode <= lastSubmittedVersionCode) {
    return {
      severity: 'CRITICAL',
      message: 'Version code must be incremented',
      current: versionCode,
      lastSubmitted: lastSubmittedVersionCode,
      fix: `Change to ${lastSubmittedVersionCode + 1} or higher`,
      requirement: 'Each submission to Play Store requires higher version code'
    };
  }

  return null;
}
```

**Version Code Rules:**
- Must be positive integer (1, 2, 3, ...)
- Must increment for EVERY Play Store submission
- Cannot reuse a version code (even after deletion)
- Independent from version string ("1.0.0" can have versionCode 50)

**app.json Example:**

```json
{
  "expo": {
    "android": {
      "versionCode": 1
    }
  }
}
```

**Common Errors:**

```
❌ Version code missing
   Fix: Add "expo.android.versionCode": 1 to app.json

❌ Version code is zero
   Current: 0
   Fix: Change to 1 or higher

❌ Version code not incremented
   Current: 5
   Last Submitted: 5
   Fix: Change to 6

❌ Version code is string
   Current: "1"
   Fix: Change to integer: 1 (no quotes)
```

---

## Requirement 3: Adaptive Icon (WARNING)

### Adaptive Icon Configuration (API 26+)

**Validation Rule:**

```javascript
function validateAdaptiveIcon(appJson) {
  const adaptiveIcon = appJson.expo?.android?.adaptiveIcon;

  if (!adaptiveIcon) {
    return {
      severity: 'WARNING',
      message: 'Adaptive icon not configured',
      targetAPI: 'Android 8.0 (API 26) and higher',
      recommendation: 'Configure adaptive icon for better icon appearance on modern Android',
      fix: [
        '1. Create adaptive icon: 1024x1024 PNG with transparent background',
        '2. Add to app.json:',
        '   "expo.android.adaptiveIcon": {',
        '     "foregroundImage": "./assets/adaptive-icon.png",',
        '     "backgroundColor": "#FFFFFF"',
        '   }'
      ],
      fallback: 'Will use standard icon on Android 8.0+'
    };
  }

  // Check foreground image
  const foregroundImage = adaptiveIcon.foregroundImage;
  if (!foregroundImage) {
    return {
      severity: 'WARNING',
      message: 'Adaptive icon foreground image missing',
      fix: 'Add "foregroundImage": "./assets/adaptive-icon.png"'
    };
  }

  // Check if file exists
  if (!fs.existsSync(foregroundImage)) {
    return {
      severity: 'CRITICAL',
      message: 'Adaptive icon file not found',
      path: foregroundImage,
      fix: `Create file at ${foregroundImage} or update path`
    };
  }

  // Check background color
  const backgroundColor = adaptiveIcon.backgroundColor;
  if (!backgroundColor) {
    return {
      severity: 'INFO',
      message: 'Adaptive icon background color not set',
      default: 'Will use transparent background',
      recommendation: 'Set background color for better appearance'
    };
  }

  return null;
}
```

**Adaptive Icon Requirements:**
- Foreground image: 1024x1024 PNG with transparent background
- Safe zone: Content should fit within center 66% of canvas (684x684)
- Background color: Solid color (hex format)

**app.json Example:**

```json
{
  "expo": {
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      }
    }
  }
}
```

**Common Warnings:**

```
⚠️ Adaptive icon not configured
   Impact: Icon may not display correctly on Android 8.0+
   Fix: Add adaptive icon configuration to app.json

❌ Adaptive icon file missing
   Path: ./assets/adaptive-icon.png
   Fix: Create 1024x1024 PNG with transparent background

ℹ️ Background color not set
   Recommendation: Add "backgroundColor": "#FFFFFF"
```

---

## Requirement 4: Permissions Declaration (WARNING)

### Explicitly Declare Permissions

**Validation Rule:**

```javascript
const androidPermissions = {
  camera: {
    permission: "android.permission.CAMERA",
    required: "If app uses Camera API",
    detection: ["expo-camera", "Camera."],
    playStoreRequirement: "Sensitive permission - must justify in Play Console"
  },

  location: {
    permission: "android.permission.ACCESS_FINE_LOCATION",
    required: "If app uses precise location",
    detection: ["expo-location", "Location.requestForegroundPermissionsAsync"],
    playStoreRequirement: "Sensitive permission - must justify in Play Console"
  },

  locationCoarse: {
    permission: "android.permission.ACCESS_COARSE_LOCATION",
    required: "If app uses approximate location",
    detection: ["expo-location"],
    playStoreRequirement: "Sensitive permission - must justify in Play Console"
  },

  backgroundLocation: {
    permission: "android.permission.ACCESS_BACKGROUND_LOCATION",
    required: "If app uses background location (API 29+)",
    detection: ["Location.requestBackgroundPermissionsAsync"],
    playStoreRequirement: "CRITICAL - Must complete Play Console declaration form",
    apiLevel: 29
  },

  storage: {
    permission: "android.permission.READ_EXTERNAL_STORAGE",
    required: "If app reads from external storage",
    detection: ["expo-media-library", "expo-file-system"],
    note: "Required for API < 33. Use scoped storage on API 33+"
  },

  writeStorage: {
    permission: "android.permission.WRITE_EXTERNAL_STORAGE",
    required: "If app writes to external storage",
    detection: ["MediaLibrary.saveToLibraryAsync"],
    note: "Required for API < 29. Use scoped storage on API 29+"
  },

  recordAudio: {
    permission: "android.permission.RECORD_AUDIO",
    required: "If app records audio",
    detection: ["expo-av", "Audio.Recording"],
    playStoreRequirement: "Sensitive permission - must justify"
  },

  contacts: {
    permission: "android.permission.READ_CONTACTS",
    required: "If app reads contacts",
    detection: ["expo-contacts"],
    playStoreRequirement: "Sensitive permission - must justify"
  },

  calendar: {
    permission: "android.permission.READ_CALENDAR",
    required: "If app reads calendar",
    detection: ["expo-calendar", "Calendar.getCalendarsAsync"],
    playStoreRequirement: "Sensitive permission - must justify"
  }
};

function validateAndroidPermissions(appJson, packageJson) {
  const warnings = [];
  const declaredPermissions = appJson.expo?.android?.permissions || [];

  for (const [name, config] of Object.entries(androidPermissions)) {
    const usesFeature = detectFeatureUsage(packageJson, config.detection);

    if (usesFeature && !declaredPermissions.includes(config.permission)) {
      warnings.push({
        severity: 'WARNING',
        permission: name,
        androidPermission: config.permission,
        message: `${config.permission} should be declared`,
        detected: config.detection.join(', '),
        fix: [
          'Add to app.json:',
          '"expo.android.permissions": [',
          `  "${config.permission}"`,
          ']'
        ],
        playStoreNote: config.playStoreRequirement
      });
    }

    // Special warnings for sensitive permissions
    if (usesFeature && config.playStoreRequirement && config.playStoreRequirement.includes('CRITICAL')) {
      warnings.push({
        severity: 'CRITICAL',
        permission: name,
        message: config.playStoreRequirement,
        action: 'Must complete permission declaration form in Play Console before submission'
      });
    }
  }

  return warnings;
}
```

**app.json Example:**

```json
{
  "expo": {
    "android": {
      "permissions": [
        "android.permission.CAMERA",
        "android.permission.RECORD_AUDIO",
        "android.permission.ACCESS_FINE_LOCATION"
      ]
    }
  }
}
```

**Common Warnings:**

```
⚠️ CAMERA permission should be declared
   Detected: expo-camera in package.json
   Fix: Add "android.permission.CAMERA" to permissions array
   Play Store: Must justify usage in Play Console

⚠️ ACCESS_FINE_LOCATION permission should be declared
   Detected: expo-location in package.json
   Fix: Add "android.permission.ACCESS_FINE_LOCATION"
   Play Store: Must justify usage in Play Console

❌ CRITICAL: ACCESS_BACKGROUND_LOCATION detected
   Detected: Location.requestBackgroundPermissionsAsync in code
   Requirement: Must complete declaration form in Play Console
   Action: Justify background location usage before submission
```

---

## Requirement 5: Target SDK Version (CRITICAL)

### Target Latest Android API Level

**Google Play Requirement:**
New apps must target API 33 (Android 13) or higher as of August 2023.

**Validation Rule:**

```javascript
function validateTargetSdkVersion(appJson) {
  const targetSdkVersion = appJson.expo?.android?.targetSdkVersion;
  const minimumRequired = 33;  // As of 2023

  if (!targetSdkVersion) {
    return {
      severity: 'INFO',
      message: 'Target SDK version not set (using Expo default)',
      expoDefault: 'Latest SDK supported by Expo',
      note: 'Expo automatically uses recommended target SDK'
    };
  }

  if (targetSdkVersion < minimumRequired) {
    return {
      severity: 'CRITICAL',
      message: 'Target SDK version too low for Play Store',
      current: targetSdkVersion,
      minimum: minimumRequired,
      requirement: 'Google Play requires targeting API 33+ for new apps',
      fix: `Update "expo.android.targetSdkVersion" to ${minimumRequired} or higher`,
      deadline: 'Required for new apps since August 2023'
    };
  }

  return null;
}
```

**Target SDK Requirements:**

```
Minimum for New Apps (2023+): API 33 (Android 13)
Minimum for App Updates: API 31 (Android 12)
Recommended: Latest API level (API 34 for Expo SDK 50)
```

**app.json Example:**

```json
{
  "expo": {
    "android": {
      "targetSdkVersion": 34
    }
  }
}
```

**Common Errors:**

```
❌ Target SDK too low
   Current: 31
   Required: 33+ for new apps
   Fix: Update to 33 or higher in app.json
   Google Play: Will reject submission

ℹ️ Target SDK not set
   Expo will use: API 34 (default for SDK 50)
   Recommendation: Explicitly set for clarity
```

---

## Requirement 6: App Bundle (AAB) for Production (WARNING)

### Use AAB Instead of APK for Play Store

**Google Play Requirement:**
New apps must use Android App Bundle (.aab) format since August 2021.

**Validation Rule:**

```javascript
function validateBuildType(easJson, buildProfile) {
  const buildType = easJson?.build?.[buildProfile]?.android?.buildType;

  if (buildProfile === 'production' && buildType === 'apk') {
    return {
      severity: 'WARNING',
      message: 'Production build using APK format',
      current: 'apk',
      required: 'app-bundle (AAB)',
      googleRequirement: 'Play Store requires AAB for new apps (since Aug 2021)',
      fix: [
        'Update eas.json:',
        '{',
        '  "build": {',
        '    "production": {',
        '      "android": {',
        '        "buildType": "app-bundle"',
        '      }',
        '    }',
        '  }',
        '}'
      ],
      note: 'APK can be used for testing, but production must use AAB'
    };
  }

  return null;
}
```

**eas.json Example:**

```json
{
  "build": {
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    },
    "development": {
      "android": {
        "buildType": "apk"  // OK for development/testing
      }
    }
  }
}
```

**Common Warnings:**

```
⚠️ Production build using APK
   Current: "buildType": "apk"
   Required: "buildType": "app-bundle"
   Google Play: APK submissions rejected for new apps
   Fix: Update eas.json production profile
```

---

## Requirement 7: Privacy Policy (CRITICAL for certain features)

### Privacy Policy Required for Sensitive Permissions

**Google Play Requirement:**
Apps requesting sensitive permissions (location, camera, contacts, etc.) must have a privacy policy.

**Validation Rule:**

```javascript
function validatePrivacyPolicy(appJson, packageJson) {
  const sensitivePermissions = [
    'android.permission.ACCESS_FINE_LOCATION',
    'android.permission.ACCESS_BACKGROUND_LOCATION',
    'android.permission.CAMERA',
    'android.permission.RECORD_AUDIO',
    'android.permission.READ_CONTACTS',
    'android.permission.READ_CALENDAR'
  ];

  const declaredPermissions = appJson.expo?.android?.permissions || [];

  const usesSensitivePermissions = sensitivePermissions.some(
    perm => declaredPermissions.includes(perm)
  );

  // Check for advertising ID usage
  const usesAdvertising = detectAdvertisingIDUsage(packageJson);

  if (usesSensitivePermissions || usesAdvertising) {
    const privacyPolicyUrl = appJson.expo?.android?.config?.googleServicesFile?.privacy_policy_url;

    if (!privacyPolicyUrl) {
      return {
        severity: 'CRITICAL',
        message: 'Privacy policy required',
        reason: usesSensitivePermissions
          ? 'App uses sensitive permissions'
          : 'App uses advertising ID',
        permissions: declaredPermissions.filter(p => sensitivePermissions.includes(p)),
        requirement: 'Google Play requires privacy policy URL in Play Console',
        fix: [
          '1. Create privacy policy page at https://yourapp.com/privacy',
          '2. Add URL to Play Console under "Store presence" → "Privacy policy"',
          '3. Ensure policy explains data collection and usage'
        ]
      };
    }
  }

  return null;
}
```

**Privacy Policy Requirements:**
- Must be publicly accessible
- Must use HTTPS
- Must be specific to your app
- Must explain what data is collected and how it's used
- Must be added to Play Console (not just app.json)

**Common Errors:**

```
❌ Privacy policy required

Reason: App uses sensitive permissions
Detected:
- android.permission.ACCESS_FINE_LOCATION
- android.permission.CAMERA

Google Play Requirement:
Apps accessing location, camera, or other sensitive data must provide privacy policy.

Fix:
1. Create privacy policy: https://yourapp.com/privacy
2. Add URL in Play Console:
   Store presence → Privacy policy → Enter URL
3. Ensure policy explains location and camera usage
```

---

## Requirement 8: App Signing (INFO)

### Google Play App Signing Recommended

**Validation Rule:**

```javascript
function validateAppSigning(easJson) {
  // Check if using Google Play App Signing
  // (This is typically configured in Play Console, not in project)

  return {
    severity: 'INFO',
    message: 'Google Play App Signing recommended',
    benefits: [
      'Google manages signing keys securely',
      'Supports key rotation',
      'Optimized app bundles',
      'Required for App Bundle (.aab) uploads'
    ],
    howTo: [
      '1. Upload first AAB to Play Console',
      '2. Opt in to Google Play App Signing',
      '3. Google generates upload key',
      '4. EAS Build handles key management automatically'
    ],
    easIntegration: 'EAS Build automatically configures app signing'
  };
}
```

**Benefits of Google Play App Signing:**
- Google securely manages app signing keys
- Supports key rotation if needed
- Optimized APKs generated from AAB
- Required for AAB format

**EAS Build Integration:**
- EAS automatically generates and manages keys
- No manual key management required
- Keys stored securely in EAS

---

## Requirement 9: Minimum SDK Version (INFO)

### Set Minimum Android Version

**Validation Rule:**

```javascript
function validateMinSdkVersion(appJson) {
  const minSdkVersion = appJson.expo?.android?.minSdkVersion;
  const expoRecommended = 21;  // Android 5.0

  if (!minSdkVersion) {
    return {
      severity: 'INFO',
      message: 'Minimum SDK version not set (using Expo default)',
      expoDefault: expoRecommended,
      note: 'Expo uses Android 5.0 (API 21) as default minimum'
    };
  }

  if (minSdkVersion < expoRecommended) {
    return {
      severity: 'WARNING',
      message: 'Minimum SDK version lower than recommended',
      current: minSdkVersion,
      recommended: expoRecommended,
      impact: 'May limit Expo features and package compatibility'
    };
  }

  return {
    severity: 'INFO',
    message: `Minimum SDK version: ${minSdkVersion}`,
    androidVersion: getAndroidVersionName(minSdkVersion),
    note: 'Devices below this version cannot install the app'
  };
}
```

**Minimum SDK Recommendations:**

```
Expo Recommended: API 21 (Android 5.0)
Modern Apps: API 23 (Android 6.0)
Latest Features: API 26 (Android 8.0)
```

**app.json Example:**

```json
{
  "expo": {
    "android": {
      "minSdkVersion": 21
    }
  }
}
```

---

## Android Compliance Summary

### CRITICAL Requirements (Must Fix)
1. ✅ Package name configured (lowercase)
2. ✅ Version code set and incremented
3. ✅ Target SDK version 33+ (for new apps)
4. ✅ Privacy policy (if using sensitive permissions)
5. ✅ Background location declaration form (if used)

### WARNING Requirements (Should Fix)
1. ⚠️ Adaptive icon configured
2. ⚠️ Sensitive permissions declared
3. ⚠️ App Bundle (AAB) for production builds
4. ⚠️ Privacy policy uses HTTPS

### INFO Requirements (Nice to Fix)
1. ℹ️ Minimum SDK version set
2. ℹ️ Google Play App Signing enabled
3. ℹ️ App signing configured

---

**Version**: 1.0
**Created**: 2026-01-10
**Authority**: Google Play Store Policies + Expo Best Practices
**Maintained By**: expo-build-validator agent
