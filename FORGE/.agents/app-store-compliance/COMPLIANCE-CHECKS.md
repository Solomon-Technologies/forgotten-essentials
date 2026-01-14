# APP STORE COMPLIANCE VALIDATION CHECKS

**Agent**: app-store-compliance
**Version**: 1.0
**Created**: 2026-01-10
**Purpose**: Detailed compliance rules for iOS App Store and Google Play Store

---

## Overview

This document defines all compliance checks the app-store-compliance agent performs before app store submission.

**Check Priority Levels:**
- **CRITICAL** - Will cause rejection, must fix before submission
- **WARNING** - May cause rejection, should fix to be safe
- **INFO** - Best practice, recommended

---

## Category 1: App Functionality (CRITICAL)

### Check 1.1: App Completeness

**Requirement**: App must be complete and fully functional.

**Validation**:
```markdown
✅ App launches successfully
✅ No crashes on startup or during use
✅ All features listed in description are present
✅ No "Coming Soon" or placeholder content
✅ No broken buttons, links, or navigation
✅ Core functionality works end-to-end
✅ All screens accessible
✅ No dead ends in user flow
```

**Common Rejection Reasons**:
```
❌ "App crashes on launch" (iOS 2.1, Android)
❌ "Features mentioned in description not present" (iOS 2.1)
❌ "App contains placeholder content" (iOS 2.1)
❌ "App is not finished" (iOS 2.1)
❌ "Core features require login but registration doesn't work" (iOS 2.1)
```

**How to Validate**:
```markdown
Manual Testing Required:
1. Delete app if installed
2. Install fresh build
3. Complete full user journey:
   - Open app
   - Sign up (if required)
   - Access all main features
   - Test all buttons and navigation
   - Attempt to complete core tasks
4. Log any crashes or errors
5. Verify all advertised features work
```

---

### Check 1.2: Demo Account (if required)

**Requirement**: Provide test credentials if app requires login.

**Validation**:
```javascript
function validateDemoAccount(appStoreNotes) {
  const requiresLogin = detectLoginRequirement();

  if (requiresLogin) {
    const hasDemoCredentials = appStoreNotes.includes('demo') ||
                                appStoreNotes.includes('test account');

    if (!hasDemoCredentials) {
      return {
        severity: 'CRITICAL',
        message: 'Demo account required for app review',
        requirement: 'App requires login - must provide test credentials',
        fix: 'Add demo credentials in App Store Connect / Play Console notes',
        example: [
          'Demo Account:',
          'Email: demo@example.com',
          'Password: DemoPassword123',
          '',
          'Note: This account has sample data for testing all features.'
        ]
      };
    }
  }

  return null;
}
```

**Common Rejection Reasons**:
```
❌ "No demo account provided" (iOS 2.1)
❌ "Demo account doesn't work" (iOS 2.1)
❌ "Demo account has no content to review" (iOS 2.1)
```

**Best Practices**:
```markdown
Demo Account Requirements:
✅ Works immediately (no email verification)
✅ Contains sample data for all features
✅ Has appropriate permissions (admin if needed)
✅ Never expires
✅ Password doesn't change
✅ Clearly documented in review notes
```

---

## Category 2: Metadata Compliance (CRITICAL)

### Check 2.1: App Name

**Validation Rules**:
```javascript
const appNameRules = {
  ios: {
    maxLength: 30,
    allowedCharacters: /^[a-zA-Z0-9 &'-]+$/,
    prohibitedContent: [
      'Trademarks (Apple, Google, Facebook, etc.)',
      'Competitor names',
      'Keyword stuffing',
      'Prices or promotional text'
    ]
  },

  android: {
    maxLength: 50,
    allowedCharacters: /^[a-zA-Z0-9 &'-]+$/,
    prohibitedContent: [
      'Misleading claims',
      'Competitor names',
      'Excessive capitalization',
      'Special symbols for attention (★ ✓ ☆)'
    ]
  }
};

function validateAppName(appName, platform) {
  const rules = appNameRules[platform];
  const issues = [];

  // Length check
  if (appName.length > rules.maxLength) {
    issues.push({
      severity: 'WARNING',
      message: `App name exceeds ${rules.maxLength} characters`,
      current: appName.length,
      platform: platform,
      impact: 'Will be truncated in store listing'
    });
  }

  // Character check
  if (!rules.allowedCharacters.test(appName)) {
    const invalidChars = appName.match(/[^a-zA-Z0-9 &'-]/g);
    issues.push({
      severity: 'CRITICAL',
      message: 'App name contains invalid characters',
      invalidChars: [...new Set(invalidChars)].join(', '),
      allowed: 'Letters, numbers, spaces, &, \', -'
    });
  }

  // Trademark check
  const trademarks = ['Apple', 'Google', 'Facebook', 'Meta', 'Amazon', 'Microsoft', 'iPhone', 'Android'];
  const foundTrademarks = trademarks.filter(tm =>
    appName.toLowerCase().includes(tm.toLowerCase())
  );

  if (foundTrademarks.length > 0) {
    issues.push({
      severity: 'CRITICAL',
      message: 'Potential trademark violation in app name',
      trademarks: foundTrademarks,
      guideline: 'iOS 5.2.5, Android IP',
      rejectionRisk: 'Very high',
      fix: 'Remove trademarked names unless you have explicit permission'
    });
  }

  // Keyword stuffing check
  const words = appName.split(/[\s-]+/);
  if (words.length > 5) {
    issues.push({
      severity: 'WARNING',
      message: 'App name appears to contain keyword stuffing',
      wordCount: words.length,
      guideline: 'iOS 2.3.7',
      recommendation: 'Keep app name concise, use subtitle for keywords'
    });
  }

  return issues;
}
```

**Common Rejection Reasons**:
```
❌ "App name includes trademark without permission" (iOS 5.2.5)
❌ "App name misleads users" (iOS 4.1)
❌ "App name is keyword spam" (iOS 2.3.7)
❌ "App name suggests official app when it's not" (Android IP)
```

---

### Check 2.2: Description Accuracy

**Validation Rules**:
```javascript
function validateDescription(description, appFeatures) {
  const issues = [];

  // Check for placeholder text
  const placeholders = ['Lorem ipsum', '[TODO]', 'TBD', 'Coming soon'];
  for (const placeholder of placeholders) {
    if (description.toLowerCase().includes(placeholder.toLowerCase())) {
      issues.push({
        severity: 'CRITICAL',
        message: 'Placeholder text in description',
        found: placeholder,
        fix: 'Replace with actual app description'
      });
    }
  }

  // Check for misleading claims
  const misleadingPhrases = [
    { phrase: '#1 app', claim: 'Unsubstantiated ranking claim' },
    { phrase: 'best app', claim: 'Unsubstantiated superlative' },
    { phrase: 'only app you need', claim: 'Misleading claim' },
    { phrase: 'official', claim: 'Suggests endorsement (unless true)' },
    { phrase: 'free forever', claim: 'May violate if has IAP' }
  ];

  for (const { phrase, claim } of misleadingPhrases) {
    if (description.toLowerCase().includes(phrase)) {
      issues.push({
        severity: 'WARNING',
        message: 'Potentially misleading claim in description',
        phrase: phrase,
        issue: claim,
        guideline: 'iOS 4.1, Android Metadata Policy',
        recommendation: 'Remove or substantiate claim'
      });
    }
  }

  // Check description matches app features
  const mentionedFeatures = extractFeaturesFromDescription(description);
  const missingFeatures = mentionedFeatures.filter(f => !appFeatures.includes(f));

  if (missingFeatures.length > 0) {
    issues.push({
      severity: 'CRITICAL',
      message: 'Description mentions features not present in app',
      mentionedButMissing: missingFeatures,
      guideline: 'iOS 2.3.1',
      fix: 'Remove feature descriptions or implement features'
    });
  }

  return issues;
}
```

**Common Rejection Reasons**:
```
❌ "Description mentions features not in the app" (iOS 2.3.1)
❌ "Description contains placeholder text" (iOS 2.3)
❌ "Description makes unsubstantiated claims" (iOS 4.1)
```

---

### Check 2.3: Screenshots

**Validation Rules**:
```javascript
const screenshotRequirements = {
  ios: {
    required: [
      { device: 'iPhone 6.7"', size: '1290 x 2796' },
      { device: 'iPhone 5.5"', size: '1242 x 2208' }
    ],
    optional: [
      { device: 'iPad Pro 12.9"', size: '2048 x 2732' }
    ],
    count: { min: 1, max: 10 },
    format: ['PNG', 'JPEG']
  },

  android: {
    required: [
      { type: 'Phone', minSize: '320px (any side)' }
    ],
    count: { min: 2, max: 8 },
    format: ['PNG', 'JPEG']
  }
};

function validateScreenshots(screenshots, appContent) {
  const issues = [];

  // Check minimum count
  if (screenshots.length < screenshotRequirements.android.count.min) {
    issues.push({
      severity: 'CRITICAL',
      message: 'Not enough screenshots',
      current: screenshots.length,
      minimum: screenshotRequirements.android.count.min,
      fix: 'Add more screenshots showing app features'
    });
  }

  // Check for mockups (not actual app)
  for (const screenshot of screenshots) {
    if (isMockup(screenshot) || containsDeviceFrame(screenshot)) {
      issues.push({
        severity: 'CRITICAL',
        message: 'Screenshots must show actual app, not mockups',
        screenshot: screenshot.filename,
        guideline: 'iOS 2.3.4, Android Metadata',
        fix: 'Replace with actual app screenshots from device/simulator'
      });
    }
  }

  // Check screenshots match app content
  const screenshotContent = extractContentFromScreenshots(screenshots);
  const actualAppContent = appContent;

  if (!screenshotContent.matches(actualAppContent)) {
    issues.push({
      severity: 'CRITICAL',
      message: 'Screenshots don\'t match actual app',
      guideline: 'iOS 2.3.4',
      example: 'Screenshot shows blue theme, app has green theme',
      fix: 'Update screenshots to match current app version'
    });
  }

  return issues;
}
```

**Common Rejection Reasons**:
```
❌ "Screenshots show mockups instead of actual app" (iOS 2.3.4)
❌ "Screenshots show different app or older version" (iOS 2.3.4)
❌ "Screenshots too blurry or low quality" (iOS 2.3.4)
❌ "Screenshots contain competitor names" (iOS 2.3.4)
❌ "Not enough screenshots" (Android Metadata)
```

---

## Category 3: Privacy & Data Compliance (CRITICAL)

### Check 3.1: Privacy Policy

**Validation Rules**:
```javascript
function validatePrivacyPolicy(privacyPolicyURL, appDataCollection) {
  const issues = [];

  // 1. Privacy policy must exist
  if (!privacyPolicyURL) {
    issues.push({
      severity: 'CRITICAL',
      message: 'Privacy policy required',
      platforms: ['iOS', 'Android'],
      guideline: 'iOS 5.1.2, Android User Data',
      fix: [
        '1. Create privacy policy page',
        '2. Add URL to App Store Connect / Play Console',
        '3. Ensure policy is accessible to all users'
      ]
    });
    return issues;
  }

  // 2. Privacy policy must be accessible
  const isAccessible = checkURLAccessibility(privacyPolicyURL);
  if (!isAccessible) {
    issues.push({
      severity: 'CRITICAL',
      message: 'Privacy policy URL not accessible',
      url: privacyPolicyURL,
      error: '404 or connection error',
      fix: 'Ensure privacy policy page is live before submission'
    });
  }

  // 3. Privacy policy must use HTTPS
  if (privacyPolicyURL && !privacyPolicyURL.startsWith('https://')) {
    issues.push({
      severity: 'WARNING',
      message: 'Privacy policy should use HTTPS',
      current: privacyPolicyURL,
      recommendation: 'Use HTTPS for security and trust'
    });
  }

  // 4. Privacy policy must be complete
  const policyContent = fetchPrivacyPolicy(privacyPolicyURL);
  const requiredSections = [
    'What data is collected',
    'How data is used',
    'Data sharing (if any)',
    'Data retention',
    'User rights',
    'Contact information'
  ];

  const missingSections = requiredSections.filter(
    section => !policyContent.includes(section)
  );

  if (missingSections.length > 0) {
    issues.push({
      severity: 'WARNING',
      message: 'Privacy policy may be incomplete',
      missing: missingSections,
      recommendation: 'Ensure policy covers all required sections',
      guideline: 'GDPR, CCPA, iOS 5.1.2'
    });
  }

  // 5. Privacy policy must match app data collection
  if (!policyMatchesDataCollection(policyContent, appDataCollection)) {
    issues.push({
      severity: 'CRITICAL',
      message: 'Privacy policy doesn\'t match actual data collection',
      example: 'App collects location but policy doesn\'t mention it',
      guideline: 'iOS 5.1.2',
      fix: 'Update privacy policy to accurately reflect data collection'
    });
  }

  return issues;
}
```

**Common Rejection Reasons**:
```
❌ "No privacy policy provided" (iOS 5.1.2, Android)
❌ "Privacy policy URL doesn't work" (iOS 5.1.2)
❌ "Privacy policy doesn't mention data collected by app" (iOS 5.1.2)
❌ "App collects data not disclosed in privacy policy" (iOS 5.1.2)
```

---

### Check 3.2: Data Collection Disclosure

**iOS App Privacy (App Store Connect)**:
```javascript
const iosDataTypes = {
  contact: {
    types: ['Name', 'Email Address', 'Phone Number', 'Physical Address', 'Other User Contact Info'],
    linkedToUser: true,
    usedForTracking: false,
    purpose: ['App Functionality', 'Analytics', 'Product Personalization']
  },

  location: {
    types: ['Precise Location', 'Coarse Location'],
    linkedToUser: true,
    usedForTracking: false,
    purpose: ['App Functionality', 'Analytics', 'Product Personalization']
  },

  identifiers: {
    types: ['User ID', 'Device ID', 'Advertising Identifier'],
    linkedToUser: true,
    usedForTracking: true,  // If using for ads/analytics
    purpose: ['Analytics', 'Third-Party Advertising', 'Product Personalization']
  },

  usage: {
    types: ['Product Interaction', 'Advertising Data', 'Other Usage Data'],
    linkedToUser: false,
    usedForTracking: true,  // If analytics enabled
    purpose: ['Analytics', 'App Functionality']
  },

  diagnostics: {
    types: ['Crash Data', 'Performance Data', 'Other Diagnostic Data'],
    linkedToUser: false,
    usedForTracking: false,
    purpose: ['App Functionality', 'Analytics']
  }
};

function validateiOSAppPrivacy(packageJson, appStoreConnectData) {
  const detectedDataCollection = detectDataCollection(packageJson);
  const declaredDataCollection = appStoreConnectData.appPrivacy || [];

  const missingDisclosures = [];

  for (const [category, details] of Object.entries(iosDataTypes)) {
    if (detectedDataCollection.includes(category)) {
      const isDeclared = declaredDataCollection.some(
        d => d.category === category
      );

      if (!isDeclared) {
        missingDisclosures.push({
          severity: 'CRITICAL',
          category: category,
          types: details.types,
          message: `App collects ${category} data but not disclosed in App Privacy`,
          detected: `Detected via ${getDetectionSource(category, packageJson)}`,
          guideline: 'iOS App Privacy',
          fix: 'Complete App Privacy section in App Store Connect before submission'
        });
      }
    }
  }

  return missingDisclosures;
}
```

**Android Data Safety (Play Console)**:
```javascript
const androidDataTypes = {
  location: {
    types: ['Approximate location', 'Precise location'],
    collected: true,
    shared: false,
    ephemeral: false,
    required: true,
    purpose: ['App functionality', 'Analytics']
  },

  personalInfo: {
    types: ['Name', 'Email address', 'Phone number'],
    collected: true,
    shared: false,
    ephemeral: false,
    required: true,
    purpose: ['Account management']
  },

  financial: {
    types: ['Payment info', 'Purchase history'],
    collected: true,
    shared: true,  // If using payment processor
    ephemeral: false,
    required: false,
    purpose: ['App functionality']
  },

  photos: {
    types: ['Photos', 'Videos'],
    collected: true,
    shared: false,
    ephemeral: true,  // If not stored permanently
    required: false,
    purpose: ['App functionality']
  }
};

function validateAndroidDataSafety(packageJson, playConsoleData) {
  const detectedDataCollection = detectDataCollection(packageJson);
  const declaredDataSafety = playConsoleData.dataSafety || [];

  const missingDisclosures = [];

  for (const [category, details] of Object.entries(androidDataTypes)) {
    if (detectedDataCollection.includes(category)) {
      const isDeclared = declaredDataSafety.some(
        d => d.category === category
      );

      if (!isDeclared) {
        missingDisclosures.push({
          severity: 'CRITICAL',
          category: category,
          types: details.types,
          message: `App collects ${category} data but not disclosed in Data Safety`,
          detected: `Detected via ${getDetectionSource(category, packageJson)}`,
          guideline: 'Google Play Data Safety',
          fix: 'Complete Data Safety section in Play Console before submission'
        });
      }
    }
  }

  return missingDisclosures;
}
```

**Common Rejection Reasons**:
```
❌ "App Privacy report incomplete" (iOS)
❌ "App collects data not disclosed in App Privacy" (iOS)
❌ "Data Safety section incomplete" (Android)
❌ "App shares data but not disclosed" (Android)
```

---

## Summary of Critical Compliance Checks

### Must-Fix Before Submission (CRITICAL)
1. ✅ App functionality complete (no crashes, no placeholders)
2. ✅ Demo account provided (if login required)
3. ✅ App name compliant (no trademarks, no keyword stuffing)
4. ✅ Description accurate (matches app features)
5. ✅ Screenshots actual app (no mockups, match current version)
6. ✅ Privacy policy accessible
7. ✅ Privacy policy complete and matches data collection
8. ✅ iOS App Privacy completed
9. ✅ Android Data Safety completed

### Should-Fix Before Submission (WARNING)
1. ⚠️ App name concise (avoid excessive length)
2. ⚠️ Description avoids superlatives
3. ⚠️ Privacy policy uses HTTPS
4. ⚠️ Subscription terms clearly displayed

### Nice-to-Fix (INFO)
1. ℹ️ Optimized screenshots (clear, high quality)
2. ℹ️ Complete metadata (subtitle, promotional text)
3. ℹ️ Keywords optimized

---

**Version**: 1.0
**Created**: 2026-01-10
**Authority**: Apple App Store Guidelines + Google Play Policy
**Maintained By**: app-store-compliance agent
