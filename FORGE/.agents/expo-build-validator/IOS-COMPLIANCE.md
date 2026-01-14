# iOS BUILD COMPLIANCE REQUIREMENTS

**Agent**: expo-build-validator
**Version**: 1.0
**Created**: 2026-01-10
**Purpose**: iOS-specific build and App Store compliance requirements

---

## Overview

This document defines all iOS-specific requirements for successful EAS builds and App Store submission.

**iOS Validation Levels:**
- **CRITICAL** - Blocks App Store submission, must fix
- **WARNING** - May cause rejection, should fix before submission
- **INFO** - Best practice, recommended

---

## Requirement 1: Bundle Identifier (CRITICAL)

### Bundle Identifier Format

**Validation Rule:**

```javascript
{
  field: "expo.ios.bundleIdentifier",
  required: true,
  pattern: /^[a-zA-Z0-9.-]+$/,
  format: "Reverse domain notation: com.company.app",
  examples: {
    valid: [
      "com.company.app",
      "com.company.myapp",
      "io.github.username.app"
    ],
    invalid: [
      "myapp",                    // Missing domain
      "com.company.my_app",       // Underscore not allowed
      "com.company.my app",       // Space not allowed
      "com.Company.MyApp"         // Avoid uppercase (though technically valid)
    ]
  }
}
```

**Best Practices:**
- Use lowercase only (though uppercase allowed)
- Use company domain in reverse (com.yourcompany.appname)
- Avoid special characters except `.` and `-`
- Keep it simple and consistent

**Common Errors:**

```
❌ Bundle identifier missing
   Fix: Add "expo.ios.bundleIdentifier": "com.company.app" to app.json

❌ Bundle identifier contains underscore
   Current: com.company.my_app
   Fix: Change to com.company.myapp or com.company.my-app

❌ Bundle identifier doesn't match Android package
   iOS: com.company.app
   Android: com.company.myapp
   Fix: Update both to match (recommended: com.company.app)
```

---

## Requirement 2: Privacy Descriptions (CRITICAL)

### Required NSUsageDescription Strings

**iOS requires privacy descriptions for ALL permissions used.**

**Validation Rules:**

```javascript
const privacyDescriptions = {
  camera: {
    key: "NSCameraUsageDescription",
    required: "If app uses Camera API",
    detection: ["expo-camera", "Camera.requestPermissionsAsync"],
    example: "We need access to your camera to scan QR codes and take profile photos."
  },

  photoLibrary: {
    key: "NSPhotoLibraryUsageDescription",
    required: "If app accesses photo library",
    detection: ["expo-image-picker", "expo-media-library", "ImagePicker.launchImageLibraryAsync"],
    example: "We need access to your photos to upload profile pictures and share images."
  },

  photoLibraryAddOnly: {
    key: "NSPhotoLibraryAddUsageDescription",
    required: "If app saves to photo library",
    detection: ["MediaLibrary.saveToLibraryAsync"],
    example: "We need permission to save images to your photo library."
  },

  microphone: {
    key: "NSMicrophoneUsageDescription",
    required: "If app uses microphone",
    detection: ["expo-av", "Audio.requestPermissionsAsync"],
    example: "We need access to your microphone to record voice messages."
  },

  location: {
    key: "NSLocationWhenInUseUsageDescription",
    required: "If app uses location while in use",
    detection: ["expo-location", "Location.requestForegroundPermissionsAsync"],
    example: "We need your location to show nearby businesses and provide directions."
  },

  locationAlways: {
    key: "NSLocationAlwaysAndWhenInUseUsageDescription",
    required: "If app uses background location",
    detection: ["Location.requestBackgroundPermissionsAsync"],
    example: "We need background location access to track your fitness activities even when the app is closed."
  },

  contacts: {
    key: "NSContactsUsageDescription",
    required: "If app accesses contacts",
    detection: ["expo-contacts", "Contacts.requestPermissionsAsync"],
    example: "We need access to your contacts to help you invite friends to the app."
  },

  calendar: {
    key: "NSCalendarsUsageDescription",
    required: "If app accesses calendar",
    detection: ["expo-calendar", "Calendar.requestPermissionsAsync"],
    example: "We need access to your calendar to schedule appointments and reminders."
  },

  reminders: {
    key: "NSRemindersUsageDescription",
    required: "If app accesses reminders",
    detection: ["expo-calendar", "Calendar.requestRemindersPermissionsAsync"],
    example: "We need access to your reminders to create task notifications."
  },

  motion: {
    key: "NSMotionUsageDescription",
    required: "If app uses motion/pedometer",
    detection: ["expo-sensors", "Pedometer.requestPermissionsAsync"],
    example: "We need access to your motion data to track your daily steps and activity."
  },

  bluetooth: {
    key: "NSBluetoothAlwaysUsageDescription",
    required: "If app uses Bluetooth",
    detection: ["expo-bluetooth"],
    example: "We need Bluetooth access to connect to nearby devices."
  },

  faceID: {
    key: "NSFaceIDUsageDescription",
    required: "If app uses Face ID",
    detection: ["expo-local-authentication", "LocalAuthentication.authenticateAsync"],
    example: "We use Face ID to securely authenticate your identity."
  },

  notifications: {
    key: "NSUserNotificationsUsageDescription",  // iOS 10+
    required: "If app uses notifications (recommended)",
    detection: ["expo-notifications"],
    example: "We need permission to send you important updates and notifications."
  },

  appTracking: {
    key: "NSUserTrackingUsageDescription",
    required: "ALWAYS (iOS 14.5+)",
    critical: true,
    example: "We use tracking to provide personalized ads and improve your experience."
  }
};
```

**Validation Logic:**

```javascript
function validatePrivacyDescriptions(appJson, packageJson) {
  const errors = [];
  const warnings = [];
  const infoPlist = appJson.expo?.ios?.infoPlist || {};

  // Always require NSUserTrackingUsageDescription (iOS 14.5+)
  if (!infoPlist.NSUserTrackingUsageDescription) {
    errors.push({
      severity: 'CRITICAL',
      key: 'NSUserTrackingUsageDescription',
      message: 'App Tracking Transparency description required (iOS 14.5+)',
      fix: 'Add to expo.ios.infoPlist in app.json',
      example: '"NSUserTrackingUsageDescription": "We use tracking to..."'
    });
  }

  // Scan package.json and code for permission usage
  for (const [name, config] of Object.entries(privacyDescriptions)) {
    const usesPermission = detectPermissionUsage(packageJson, config.detection);

    if (usesPermission && !infoPlist[config.key]) {
      errors.push({
        severity: config.critical ? 'CRITICAL' : 'WARNING',
        permission: name,
        key: config.key,
        message: `${config.key} required (detected usage of ${name})`,
        detected: config.detection.join(', '),
        fix: `Add to expo.ios.infoPlist in app.json`,
        example: `"${config.key}": "${config.example}"`
      });
    }
  }

  return { errors, warnings };
}
```

**Example app.json Configuration:**

```json
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.company.app",
      "infoPlist": {
        "NSCameraUsageDescription": "We need access to your camera to scan QR codes and take profile photos.",
        "NSPhotoLibraryUsageDescription": "We need access to your photos to upload profile pictures.",
        "NSLocationWhenInUseUsageDescription": "We need your location to show nearby businesses.",
        "NSUserTrackingUsageDescription": "We use tracking to provide personalized content and improve your experience.",
        "NSFaceIDUsageDescription": "We use Face ID to securely authenticate your identity."
      }
    }
  }
}
```

**Common Errors:**

```
❌ Missing NSUserTrackingUsageDescription (CRITICAL)
   Required: Always (iOS 14.5+)
   Fix: Add to infoPlist with explanation

❌ Missing NSCameraUsageDescription
   Detected: expo-camera in package.json
   Fix: Add camera usage description to infoPlist

⚠️ Generic usage descriptions
   Current: "This app needs access to your camera."
   Better: "We need camera access to scan QR codes for quick login."
   Note: App Store reviewers prefer specific, contextual explanations
```

---

## Requirement 3: Sign in with Apple (CRITICAL if OAuth)

### Mandatory for Apps with Third-Party Login

**Apple Requirement:**
If your app offers third-party social login (Google, Facebook, etc.), you MUST also offer Sign in with Apple.

**Validation Rule:**

```javascript
function validateSignInWithApple(packageJson, appJson) {
  const errors = [];

  // Detect OAuth/social login packages
  const oauthPackages = {
    'expo-auth-session': 'OAuth provider',
    'expo-google-app-auth': 'Google Sign-In (deprecated)',
    '@react-native-google-signin/google-signin': 'Google Sign-In',
    'react-native-fbsdk-next': 'Facebook Login',
    '@invertase/react-native-apple-authentication': 'Sign in with Apple (good!)'
  };

  const detectedOAuth = [];
  for (const [pkg, name] of Object.entries(oauthPackages)) {
    if (packageJson.dependencies?.[pkg] || packageJson.devDependencies?.[pkg]) {
      detectedOAuth.push({ package: pkg, name });
    }
  }

  // Exclude Sign in with Apple from the count
  const nonAppleOAuth = detectedOAuth.filter(
    oauth => oauth.package !== '@invertase/react-native-apple-authentication'
  );

  const hasAppleSignIn = detectedOAuth.some(
    oauth => oauth.package === '@invertase/react-native-apple-authentication'
  );

  // If using OAuth but NOT Sign in with Apple, flag as CRITICAL
  if (nonAppleOAuth.length > 0 && !hasAppleSignIn) {
    errors.push({
      severity: 'CRITICAL',
      message: 'Sign in with Apple REQUIRED (detected third-party OAuth)',
      detected: nonAppleOAuth.map(o => o.name).join(', '),
      appleGuideline: 'App Store Review Guideline 4.8',
      fix: [
        '1. Install: expo install @invertase/react-native-apple-authentication',
        '2. Add Sign in with Apple button to auth screens',
        '3. Configure entitlements in app.json'
      ],
      reference: 'https://developer.apple.com/sign-in-with-apple/'
    });
  }

  return errors;
}
```

**Required Configuration (if using Sign in with Apple):**

```json
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.company.app",
      "entitlements": {
        "com.apple.developer.applesignin": ["Default"]
      }
    }
  }
}
```

**Common Errors:**

```
❌ CRITICAL: Sign in with Apple missing

Detected OAuth:
- Google Sign-In (via @react-native-google-signin/google-signin)
- Facebook Login (via react-native-fbsdk-next)

Apple Requirement:
Apps that use third-party login MUST offer Sign in with Apple.

Fix:
1. Install: expo install @invertase/react-native-apple-authentication
2. Add Sign in with Apple button to login screen
3. Add entitlements to app.json:
   "expo.ios.entitlements": {
     "com.apple.developer.applesignin": ["Default"]
   }

Reference: Apple App Store Review Guideline 4.8
```

---

## Requirement 4: Privacy Policy URL (CRITICAL)

### Required for App Store Submission

**Validation Rule:**

```javascript
function validatePrivacyPolicyURL(appJson) {
  const privacyUrl = appJson.expo?.ios?.config?.privacyManifests?.[0]?.NSPrivacyPolicyURL;

  if (!privacyUrl) {
    return {
      severity: 'CRITICAL',
      message: 'Privacy Policy URL required for App Store submission',
      fix: 'Add privacy policy URL to app.json',
      example: {
        "expo": {
          "ios": {
            "config": {
              "privacyManifests": [
                {
                  "NSPrivacyPolicyURL": "https://yourapp.com/privacy"
                }
              ]
            }
          }
        }
      },
      note: 'Privacy policy must be publicly accessible and specific to your app'
    };
  }

  // Validate URL format
  if (!privacyUrl.startsWith('https://')) {
    return {
      severity: 'WARNING',
      message: 'Privacy Policy URL should use HTTPS',
      current: privacyUrl,
      fix: 'Update to HTTPS URL'
    };
  }

  return null;
}
```

**Privacy Policy Requirements:**
- Must be publicly accessible
- Must use HTTPS
- Must be specific to your app (not a generic template)
- Must explain data collection and usage
- Must be kept up-to-date

**Common Errors:**

```
❌ Privacy Policy URL missing
   Fix: Add to app.json under expo.ios.config.privacyManifests

⚠️ Privacy Policy URL uses HTTP
   Current: http://myapp.com/privacy
   Fix: Change to HTTPS: https://myapp.com/privacy

⚠️ Privacy Policy URL returns 404
   URL: https://myapp.com/privacy
   Status: 404 Not Found
   Fix: Ensure privacy policy page exists and is accessible
```

---

## Requirement 5: iPad Support (WARNING)

### Explicitly Configure iPad Support

**Validation Rule:**

```javascript
function validateiPadSupport(appJson) {
  const supportsTablet = appJson.expo?.ios?.supportsTablet;

  if (supportsTablet === undefined) {
    return {
      severity: 'WARNING',
      message: 'supportsTablet not explicitly set',
      recommendation: 'Set to true for broader reach, or false if not supporting iPad',
      fix: 'Add "expo.ios.supportsTablet": true or false to app.json',
      note: 'If true, ensure UI works well on larger screens'
    };
  }

  if (supportsTablet === true) {
    return {
      severity: 'INFO',
      message: 'iPad support enabled',
      reminder: [
        'Test on iPad simulators (iPad Pro 12.9", iPad Mini)',
        'Ensure responsive layouts work on larger screens',
        'Consider multi-column layouts for iPad',
        'Test both portrait and landscape orientations'
      ]
    };
  }

  return null;
}
```

**Recommendation:**

```json
{
  "expo": {
    "ios": {
      "supportsTablet": true  // Recommended for broader reach
    }
  }
}
```

**iPad Optimization Checklist:**
- ✅ Test on iPad Pro 12.9" simulator
- ✅ Test on iPad Mini simulator
- ✅ Responsive layouts work on larger screens
- ✅ Multi-column layouts on iPad (not scaled-up phone UI)
- ✅ Both portrait and landscape orientations tested

---

## Requirement 6: iOS Deployment Target (INFO)

### Ensure iOS Version Compatibility

**Validation Rule:**

```javascript
function validateDeploymentTarget(appJson, expoSdkVersion) {
  const deploymentTarget = appJson.expo?.ios?.deploymentTarget;
  const recommendedTarget = getRecommendedDeploymentTarget(expoSdkVersion);

  if (!deploymentTarget) {
    return {
      severity: 'INFO',
      message: 'iOS deployment target not set (using Expo default)',
      default: recommendedTarget,
      note: 'Expo will use recommended version automatically'
    };
  }

  const targetVersion = parseFloat(deploymentTarget);
  const recommendedVersion = parseFloat(recommendedTarget);

  if (targetVersion < recommendedVersion) {
    return {
      severity: 'WARNING',
      message: 'iOS deployment target lower than recommended',
      current: deploymentTarget,
      recommended: recommendedTarget,
      risk: 'May have compatibility issues with newer Expo SDK features'
    };
  }

  return null;
}
```

**Deployment Target Recommendations:**

```
Expo SDK 50: iOS 13.4+
Expo SDK 49: iOS 13.0+
Expo SDK 48: iOS 13.0+
```

**app.json Example:**

```json
{
  "expo": {
    "ios": {
      "deploymentTarget": "13.4"
    }
  }
}
```

---

## Requirement 7: Build Number (INFO)

### Increment Build Number for Each Submission

**Validation Rule:**

```javascript
function validateBuildNumber(appJson) {
  const buildNumber = appJson.expo?.ios?.buildNumber;

  if (!buildNumber || buildNumber === "0") {
    return {
      severity: 'INFO',
      message: 'Build number not set or is zero',
      recommendation: 'Set to "1" or higher',
      fix: 'Add "expo.ios.buildNumber": "1" to app.json',
      note: 'Must increment for each App Store submission'
    };
  }

  return {
    severity: 'INFO',
    message: `Build number: ${buildNumber}`,
    reminder: 'Increment this number for each new build submitted to App Store'
  };
}
```

**Best Practices:**
- Start at "1"
- Increment by 1 for each submission
- Can be string: "1", "2", "100"
- Independent from version number (1.0.0 can have build 50)

---

## Requirement 8: CocoaPods (if using native modules)

### Ensure CocoaPods Installed

**Detection:**

```javascript
function validateCocoaPods(packageJson) {
  // Detect packages that require native modules
  const nativeModules = [
    '@react-native-firebase/app',
    'react-native-maps',
    'react-native-vision-camera',
    '@invertase/react-native-apple-authentication'
  ];

  const usesNativeModules = nativeModules.some(
    pkg => packageJson.dependencies?.[pkg]
  );

  if (usesNativeModules) {
    return {
      severity: 'INFO',
      message: 'Native modules detected - CocoaPods required',
      detected: nativeModules.filter(pkg => packageJson.dependencies?.[pkg]),
      requirement: 'CocoaPods must be installed on build machine',
      note: 'EAS Build handles this automatically'
    };
  }

  return null;
}
```

---

## iOS Compliance Summary

### CRITICAL Requirements (Must Fix)
1. ✅ Bundle identifier configured
2. ✅ NSUserTrackingUsageDescription present (iOS 14.5+)
3. ✅ All required NS*UsageDescription strings
4. ✅ Sign in with Apple (if using third-party OAuth)
5. ✅ Privacy Policy URL configured

### WARNING Requirements (Should Fix)
1. ⚠️ iPad support explicitly set
2. ⚠️ Privacy Policy URL uses HTTPS
3. ⚠️ iOS deployment target appropriate

### INFO Requirements (Nice to Fix)
1. ℹ️ Build number set
2. ℹ️ CocoaPods awareness (if needed)

---

**Version**: 1.0
**Created**: 2026-01-10
**Authority**: iOS App Store Guidelines + Expo Best Practices
**Maintained By**: expo-build-validator agent
