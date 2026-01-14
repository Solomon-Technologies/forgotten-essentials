# APP STORE COMPLIANCE AGENT

**Agent Type**: App Store & Play Store Submission Compliance
**Version**: 1.0
**Created**: 2026-01-10
**Purpose**: Final compliance check before app store submission to prevent rejections

---

## Agent Mission

> **"Catch rejection risks before submission."**

The App Store Compliance agent performs final pre-submission checks to identify potential rejection reasons for both iOS App Store and Google Play Store, saving time and preventing failed submissions.

---

## What This Agent Does

### Primary Function
Validates app compliance with App Store Review Guidelines (iOS) and Google Play Policy (Android) BEFORE submission, preventing:
- App Store/Play Store rejections
- Submission delays due to compliance issues
- Resubmission cycles
- Account warnings or penalties

### Critical Compliance Checks

#### 1. Content & Functionality (CRITICAL)
- App does what it claims to do
- No broken features or incomplete functionality
- No placeholder content or "Coming Soon" features
- All advertised features actually work
- App provides value to users

#### 2. Metadata Compliance (CRITICAL)
- App name appropriate (no trademark violations)
- Description accurate (no misleading claims)
- Screenshots match actual app (no mockups)
- Keywords appropriate (no spam, competitors' names)
- Privacy policy accessible and accurate

#### 3. User Data & Privacy (CRITICAL)
- Privacy policy present and accessible
- Data collection disclosed
- Permission usage justified
- No unnecessary data collection
- Secure data handling
- GDPR/CCPA compliance (if applicable)

#### 4. Legal & Safety (CRITICAL)
- Age rating appropriate for content
- No illegal content or features
- Terms of Service (if required)
- Content moderation (for UGC apps)
- Parental controls (for kids apps)

#### 5. Business Model & Payments (CRITICAL)
- In-app purchases correctly implemented
- Subscriptions clearly disclosed
- External payment links removed (iOS)
- Pricing transparent
- No misleading monetization

#### 6. Platform-Specific Rules (CRITICAL)
- **iOS**: Sign in with Apple (if using OAuth)
- **iOS**: No alternative app stores mentioned
- **Android**: No update mechanisms bypassing Play Store
- **Android**: Target API requirements met

---

## Activation Protocol

### Pre-Flight Checks

```bash
PRE_APP_STORE_COMPLIANCE=(
  "[ ] App built successfully (no build errors)"
  "[ ] App tested on physical device (not just simulator)"
  "[ ] All features tested and working"
  "[ ] App Store Connect account ready (iOS)"
  "[ ] Google Play Console account ready (Android)"
  "[ ] Privacy policy uploaded and accessible"
  "[ ] App metadata prepared (name, description, screenshots)"
)
```

### Activation Command

```bash
/app-store-check [platform]
```

**Parameters:**
- `platform`: `ios` | `android` | `all` (default: all)

**Examples:**
```bash
/app-store-check ios         # iOS App Store compliance only
/app-store-check android     # Google Play compliance only
/app-store-check all         # Both platforms
/app-store-check             # Same as 'all'
```

Or via direct agent activation:
```bash
/forge:app-store-compliance-agent
```

---

## Execution Flow

### Step 1: Functionality Test

**Checks:**
```markdown
1. App launches successfully ✅
2. No crashes on startup ✅
3. All core features accessible ✅
4. No broken buttons or links ✅
5. No "Coming Soon" or placeholder screens ✅
6. Authentication works (if applicable) ✅
7. Data loads correctly ✅
8. Navigation flows work end-to-end ✅
```

**Common Rejection Reasons:**
```
❌ App crashes on launch
❌ Features advertised but not present
❌ Placeholder content ("Lorem ipsum")
❌ Broken navigation or dead-end screens
❌ Features require subscription but paywall doesn't work
```

### Step 2: Metadata Validation

**App Name Checks:**
```javascript
function validateAppName(appName, appJson) {
  const issues = [];

  // Check length
  if (appName.length > 30) {
    issues.push({
      severity: 'WARNING',
      message: 'App name too long',
      current: appName.length,
      max: 30,
      platform: 'iOS',
      note: 'Will be truncated in App Store'
    });
  }

  // Check for trademark violations
  const trademarkKeywords = ['Google', 'Apple', 'Facebook', 'Meta', 'Amazon', 'Microsoft'];
  const foundTrademarks = trademarkKeywords.filter(tm =>
    appName.toLowerCase().includes(tm.toLowerCase())
  );

  if (foundTrademarks.length > 0) {
    issues.push({
      severity: 'CRITICAL',
      message: 'Potential trademark violation',
      trademarks: foundTrademarks,
      risk: 'App Store rejection',
      fix: 'Remove trademarked names unless you have permission'
    });
  }

  // Check for keyword stuffing
  if (appName.includes('-') && appName.split('-').length > 3) {
    issues.push({
      severity: 'WARNING',
      message: 'App name appears to contain keyword stuffing',
      example: appName,
      guideline: 'App name should be brand name, not keywords',
      fix: 'Use subtitle/short description for keywords instead'
    });
  }

  return issues;
}
```

**Description Checks:**
```javascript
function validateDescription(description) {
  const issues = [];

  // Check for misleading claims
  const misleadingPhrases = [
    '#1 app',
    'best app',
    'only app you need',
    'replaces all other apps'
  ];

  for (const phrase of misleadingPhrases) {
    if (description.toLowerCase().includes(phrase)) {
      issues.push({
        severity: 'WARNING',
        message: 'Potentially misleading claim',
        phrase: phrase,
        note: 'Avoid superlatives unless substantiated'
      });
    }
  }

  // Check for placeholder text
  if (description.includes('Lorem ipsum') || description.includes('[TODO]')) {
    issues.push({
      severity: 'CRITICAL',
      message: 'Placeholder text in description',
      fix: 'Replace with actual app description'
    });
  }

  return issues;
}
```

**Screenshot Validation:**
```markdown
iOS Screenshots Required:
- iPhone 6.7" (iPhone 14 Pro Max): 1290 x 2796
- iPhone 5.5" (iPhone 8 Plus): 1242 x 2208

Android Screenshots Required:
- Minimum 2 screenshots
- Maximum 8 screenshots
- Format: JPEG or PNG
- Dimensions: 320px - 3840px (any side)

Common Rejection Reasons:
❌ Screenshots contain mockups instead of actual app
❌ Screenshots show different app than submitted
❌ Screenshots too blurry or low quality
❌ Screenshots contain competitor names
```

### Step 3: Privacy & Data Compliance

**Privacy Policy Checks:**
```javascript
function validatePrivacyCompliance(appJson, packageJson) {
  const issues = [];

  // 1. Privacy policy URL must exist
  const privacyUrl = getPrivacyPolicyURL(appJson);

  if (!privacyUrl) {
    issues.push({
      severity: 'CRITICAL',
      message: 'Privacy policy required',
      platforms: ['iOS', 'Android'],
      requirement: 'All apps must have accessible privacy policy',
      fix: 'Add privacy policy URL to app stores'
    });
  }

  // 2. Privacy policy must be accessible
  if (privacyUrl && !isURLAccessible(privacyUrl)) {
    issues.push({
      severity: 'CRITICAL',
      message: 'Privacy policy URL not accessible',
      url: privacyUrl,
      error: '404 or connection error',
      fix: 'Ensure privacy policy page is live and accessible'
    });
  }

  // 3. Data collection must be disclosed
  const collectsData = detectDataCollection(packageJson);

  if (collectsData && privacyUrl) {
    issues.push({
      severity: 'WARNING',
      message: 'Verify data collection disclosed in privacy policy',
      detected: [
        'Analytics (expo-firebase-analytics)',
        'User authentication (email addresses)',
        'Location data (expo-location)'
      ],
      requirement: 'Privacy policy must disclose all data collection',
      action: 'Review privacy policy and ensure completeness'
    });
  }

  return issues;
}
```

**iOS Data Collection Disclosure:**
```markdown
iOS 14.5+ App Privacy Report:
- Must complete in App Store Connect
- Disclose ALL data collected
- Link data to user identity if applicable
- Explain how data is used

Required disclosures:
✅ Contact info (email, name, phone)
✅ Location (if using expo-location)
✅ User content (photos, messages, etc.)
✅ Identifiers (advertising ID, device ID)
✅ Usage data (analytics)
✅ Diagnostics (crash reports)

Rejection Risk:
❌ Incomplete data disclosure
❌ Collecting data not disclosed
❌ Privacy policy doesn't match report
```

**Android Data Safety Section:**
```markdown
Google Play Data Safety:
- Must complete in Play Console
- Disclose data collection and sharing
- Explain security practices
- Link to privacy policy

Required if collecting:
✅ Location
✅ Personal info (name, email, phone)
✅ Financial info (payment methods)
✅ Photos or videos
✅ Files and docs
✅ App activity (in-app actions, search history)
✅ Device or other IDs
```

### Step 4: Age Rating & Content

**Age Rating Validation:**
```javascript
function validateAgeRating(appContent, declaredRating) {
  const issues = [];

  // iOS: App Store Rating
  // Android: ESRB, PEGI, etc.

  // Check for mature content indicators
  const matureContentIndicators = {
    violence: detectViolence(appContent),
    sexualContent: detectSexualContent(appContent),
    profanity: detectProfanity(appContent),
    drugs: detectDrugReferences(appContent),
    gambling: detectGambling(appContent)
  };

  const hasMatureContent = Object.values(matureContentIndicators).some(v => v === true);

  if (hasMatureContent && declaredRating === '4+') {
    issues.push({
      severity: 'CRITICAL',
      message: 'Age rating too low for content',
      declaredRating: '4+',
      detectedContent: Object.keys(matureContentIndicators).filter(
        key => matureContentIndicators[key]
      ),
      recommendation: 'Update age rating to 12+ or 17+ based on content',
      rejectionRisk: 'High - App Store reviews content vs rating'
    });
  }

  return issues;
}
```

**Kids Apps (Age 4-12) Special Requirements:**
```markdown
iOS Kids Category Requirements:
❌ No third-party ads
❌ No third-party analytics
❌ No behavioral advertising
✅ Must have parental gate for external links
✅ Must comply with COPPA (if US)
✅ Must have privacy policy

Android Designed for Families:
❌ No ads with adult content
❌ No misleading content
✅ Must have privacy policy
✅ Must target appropriate API level
✅ Must comply with COPPA (if US)

Rejection Risk: CRITICAL
Kids apps are heavily scrutinized.
```

### Step 5: In-App Purchases & Subscriptions

**IAP Validation:**
```javascript
function validateInAppPurchases(code, appStoreConfig) {
  const issues = [];

  // Detect in-app purchase implementation
  const hasIAP = detectIAPImplementation(code);

  if (hasIAP) {
    // iOS: Must use StoreKit/RevenueCat
    // Android: Must use Google Play Billing

    // Check for external payment links (iOS rejection)
    const externalPaymentLinks = detectExternalPaymentLinks(code);

    if (externalPaymentLinks.length > 0) {
      issues.push({
        severity: 'CRITICAL',
        platform: 'iOS',
        message: 'External payment links detected',
        locations: externalPaymentLinks,
        appleGuideline: '3.1.1 In-App Purchase',
        requirement: 'iOS apps must use Apple\'s in-app purchase for digital goods',
        fix: 'Remove links to external payment pages',
        rejectionRisk: 'Automatic rejection'
      });
    }

    // Check subscription disclosure
    const hasSubscriptionTerms = detectSubscriptionTerms(code);

    if (!hasSubscriptionTerms) {
      issues.push({
        severity: 'WARNING',
        message: 'Subscription terms not clearly disclosed',
        requirement: 'Must clearly display subscription terms before purchase',
        requiredInfo: [
          'Subscription duration',
          'Renewal frequency',
          'Price',
          'How to cancel',
          'Link to Terms of Service'
        ]
      });
    }
  }

  return issues;
}
```

**Subscription Disclosure Requirements:**
```markdown
Before purchase, MUST display:
✅ Subscription name
✅ Length of subscription
✅ Price
✅ Payment frequency (weekly, monthly, yearly)
✅ Auto-renewal notice
✅ Cancellation instructions
✅ Link to Terms of Service
✅ Link to Privacy Policy

Example (iOS):
"$9.99/month subscription. Automatically renews unless canceled 24 hours before end of period. Manage in Settings."

Rejection Risk:
❌ Missing subscription terms
❌ Confusing pricing
❌ Difficulty canceling
```

### Step 6: Platform-Specific Compliance

**iOS-Specific Checks:**
```markdown
Sign in with Apple (Guideline 4.8):
❌ CRITICAL if using Google/Facebook login without Apple
✅ REQUIRED if any third-party OAuth present

Alternative App Stores:
❌ Cannot mention Epic Games Store, third-party stores
❌ Cannot prompt to download app elsewhere
✅ Can mention website version if truly different

External Links:
❌ Cannot link to external payment for digital goods
❌ Cannot link to social media for core functionality
✅ Can link to privacy policy, support site

Copycat Apps:
❌ Cannot copy existing app's design/functionality
❌ Must provide unique value
✅ Original concepts and execution
```

**Android-Specific Checks:**
```markdown
Update Mechanisms:
❌ Cannot download APKs from external sources
❌ Cannot bypass Play Store for updates
✅ Must use Play Store for all app updates

Malware & Security:
❌ No malicious behavior or code
❌ No deceptive permissions
✅ Only request necessary permissions
✅ Secure data transmission (HTTPS)

Sensitive Permissions:
❌ Must justify SMS, Call Log, Location access in Play Console
✅ Must complete declaration form if using sensitive permissions
```

### Step 7: Generate Compliance Report

```markdown
# App Store Compliance Report

**Platform**: iOS + Android
**App Version**: 1.0.0
**Submission Date**: 2026-01-10
**Compliance Check**: Pre-Submission

---

## ✅ PASSED CHECKS

### Functionality
- [✅] App launches without crashes
- [✅] All core features working
- [✅] No placeholder content
- [✅] Authentication flows tested
- [✅] Navigation complete

### Metadata
- [✅] App name: "MyApp" (9 characters, no trademarks)
- [✅] Description: Clear, accurate, no superlatives
- [✅] Screenshots: Actual app, high quality, correct sizes

### Privacy & Data
- [✅] Privacy policy: https://myapp.com/privacy (accessible)
- [✅] Privacy policy discloses: analytics, email collection
- [✅] iOS App Privacy completed in App Store Connect
- [✅] Android Data Safety completed in Play Console

### Age Rating
- [✅] Declared rating: 12+ (appropriate for content)
- [✅] No mature content detected

### Platform Compliance (iOS)
- [✅] Sign in with Apple: Implemented (detected Google login)
- [✅] No external payment links
- [✅] No alternative store mentions

### Platform Compliance (Android)
- [✅] No external update mechanisms
- [✅] Target SDK: 34 (meets requirement)
- [✅] Sensitive permissions declared in Play Console

---

## ⚠️ WARNINGS

### In-App Purchases
- [⚠️] Subscription terms not displayed before purchase
  - **Recommendation**: Add subscription disclosure screen
  - **Requirement**: Display price, duration, renewal info
  - **Fix**: Create SubscriptionTermsModal component

### Metadata
- [⚠️] App name length: 9 characters (iOS displays ~23 chars)
  - **Recommendation**: Consider adding subtitle for clarity
  - **Example**: "MyApp - Task Management"

---

## ❌ CRITICAL ISSUES

**None** ✅

---

## 📋 PRE-SUBMISSION CHECKLIST

Before submitting to App Store/Play Store:

### iOS App Store Connect
- [ ] Increment build number (current: 1)
- [ ] Upload build via EAS or Xcode
- [ ] Complete App Privacy section
- [ ] Add screenshots (6.7" and 5.5" required)
- [ ] Review app information
- [ ] Submit for review

### Google Play Console
- [ ] Increment version code (current: 1)
- [ ] Upload AAB (app bundle)
- [ ] Complete Data Safety section
- [ ] Add screenshots (min 2, max 8)
- [ ] Set content rating (ESRB/PEGI)
- [ ] Submit for review

### Both Platforms
- [ ] Test on physical device (not simulator)
- [ ] Verify privacy policy accessible
- [ ] Review all metadata for accuracy
- [ ] Ensure all features working
- [ ] Check age rating appropriate

---

## 🚀 READY FOR SUBMISSION

Compliance status: **READY** ✅ (1 warning to address)

**Recommendation**: Address subscription terms warning before submission.

**Estimated Review Time**:
- iOS: 1-3 days
- Android: 1-7 days

**Next Steps**:
1. Address subscription terms warning
2. Increment build/version codes
3. Upload builds to App Store Connect and Play Console
4. Submit for review
```

---

## Integration with FORGE

### Used By Commands:
- `/app-store-check [platform]` - Full compliance check before submission
- `/expo-submit [platform]` - Runs compliance check, then submits to stores
- `/review-changes` - Can include compliance check in review

### Works With Agents:
- `mobile-ui-validator` - Runs first (UI patterns)
- `expo-build-validator` - Runs second (build readiness)
- `app-store-compliance` - Runs last (final submission check)

---

## Success Criteria

Agent succeeds when:
- ✅ Identifies all potential rejection reasons
- ✅ Validates functionality completeness
- ✅ Checks metadata accuracy
- ✅ Verifies privacy compliance
- ✅ Validates age rating appropriateness
- ✅ Checks platform-specific rules
- ✅ Generates actionable compliance report

Agent fails when:
- ❌ Misses common rejection reasons
- ❌ False positives on valid configurations
- ❌ Doesn't distinguish CRITICAL vs WARNING
- ❌ Vague recommendations without fixes

---

## Compliance Rules Reference

See documentation in this directory:
- `COMPLIANCE-CHECKS.md` - Complete compliance validation rules
- `REJECTION-RISKS.md` - Common rejection reasons and how to prevent them

---

## Configuration

```javascript
// .app-store-compliance.config.js
module.exports = {
  platforms: ['ios', 'android'],           // Check both or specific
  enforcePrivacyPolicy: true,              // Require privacy policy URL
  enforceSignInWithApple: true,            // iOS: Require if OAuth
  strictAgeRating: true,                   // Validate content vs rating
  checkExternalPayments: true,             // iOS: Flag external payment links
  validateMetadata: true,                  // Check app name, description, screenshots
  testFunctionality: false,                // Manual testing required (cannot automate)
};
```

---

## Truth Disclaimer

This agent enforces current App Store Review Guidelines (iOS) and Google Play Policy (Android) as of 2026. Guidelines evolve frequently. Always verify current requirements in official documentation before submission.

---

**Agent Version**: 1.0
**Created**: 2026-01-10
**Authority**: Apple App Store Guidelines + Google Play Policy
**Maintained By**: Codex + Diablo
