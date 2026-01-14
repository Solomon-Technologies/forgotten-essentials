# COMMON APP STORE REJECTION REASONS & PREVENTION

**Agent**: app-store-compliance
**Version**: 1.0
**Created**: 2026-01-10
**Purpose**: Common rejection reasons and how to prevent them

---

## Overview

This document catalogs the most common reasons apps get rejected from iOS App Store and Google Play Store, with specific prevention strategies.

**Rejection Risk Levels:**
- **🔴 HIGH RISK** - Very common rejection reason
- **🟡 MEDIUM RISK** - Occasional rejection reason
- **🟢 LOW RISK** - Rare but possible

---

## iOS App Store - Top Rejection Reasons

### 1. App Crashes or Doesn't Function 🔴 HIGH RISK

**Guideline**: 2.1 - App Completeness

**Common Scenarios**:
```
❌ App crashes on launch
❌ App crashes when tapping certain buttons
❌ Features don't work as described
❌ App shows error messages instead of content
❌ App requires server connection that's down during review
```

**How to Prevent**:
```markdown
✅ Test on physical device (not just simulator)
✅ Delete and reinstall app fresh
✅ Test with poor network conditions
✅ Test all user flows end-to-end
✅ Add error handling for network failures
✅ Implement offline mode or graceful degradation
✅ Use crash reporting (Sentry, Crashlytics) and fix all crashes
```

**Example Rejection**:
```
"We found that your app crashed on launch. We have attached
detailed crash logs to help troubleshoot this issue."

Fix: Review crash logs, identify bug, fix, and resubmit.
```

---

### 2. Sign in with Apple Missing 🔴 HIGH RISK

**Guideline**: 4.8 - Sign in with Apple

**Requirement**:
If your app uses third-party login (Google, Facebook, Twitter, etc.), you **MUST** also offer Sign in with Apple.

**Common Scenarios**:
```
❌ App has "Sign in with Google" but no Apple option
❌ App has Facebook login but no Apple option
❌ Apple button exists but doesn't work
❌ Apple button hidden or hard to find
```

**How to Prevent**:
```markdown
✅ Install @invertase/react-native-apple-authentication
✅ Add Sign in with Apple button to login screen
✅ Make Apple button same prominence as other login options
✅ Test Apple login flow thoroughly
✅ Add entitlements to app.json:
   "expo.ios.entitlements": {
     "com.apple.developer.applesignin": ["Default"]
   }
```

**Code Example**:
```tsx
import AppleAuthentication from '@invertase/react-native-apple-authentication';

<AppleAuthentication.AppleAuthenticationButton
  buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
  buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
  onPress={async () => {
    const appleAuthRequestResponse = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });
    // Handle authentication
  }}
/>
```

**Example Rejection**:
```
"Your app offers account creation or sign-in with a third-party
service (Google), but does not offer Sign in with Apple."

Guideline 4.8 - Design - Sign in with Apple

Fix: Add Sign in with Apple button and implement authentication.
```

---

### 3. Missing or Inaccessible Privacy Policy 🔴 HIGH RISK

**Guideline**: 5.1.2 - Privacy - Data Use and Sharing

**Common Scenarios**:
```
❌ No privacy policy URL provided
❌ Privacy policy URL returns 404
❌ Privacy policy is generic template (not specific to app)
❌ Privacy policy doesn't mention data app actually collects
```

**How to Prevent**:
```markdown
✅ Create detailed privacy policy specific to your app
✅ Host at accessible HTTPS URL
✅ List ALL data collected:
   - Email, name, phone (if collected)
   - Location (if using expo-location)
   - Photos (if using expo-image-picker)
   - Device ID, advertising ID (if using analytics)
✅ Explain how data is used
✅ Explain if data is shared with third parties
✅ Add privacy policy URL to App Store Connect
✅ Test URL before submission
```

**Example Rejection**:
```
"We noticed your app collects user location data but your privacy
policy does not disclose this collection."

Guideline 5.1.2 - Legal - Privacy

Fix: Update privacy policy to include location data collection,
explain why it's collected and how it's used.
```

---

### 4. Incomplete App Privacy Report 🔴 HIGH RISK

**Guideline**: iOS App Privacy (App Store Connect)

**Common Scenarios**:
```
❌ App Privacy section not filled out
❌ App collects data but marked as "No data collected"
❌ Analytics package installed but not disclosed
❌ Location collected but not disclosed
❌ Marked data as "Not linked to user" when it is
```

**How to Prevent**:
```markdown
✅ Complete App Privacy section in App Store Connect
✅ Review package.json for data collection packages:
   - expo-location → Disclose Location
   - expo-camera → Disclose Photos
   - expo-firebase-analytics → Disclose Identifiers + Usage Data
   - @react-native-google-signin → Disclose Email/Name
✅ Disclose all data types collected
✅ Mark if data is "Linked to User" or not
✅ Mark if data is "Used for Tracking"
✅ Select correct data usage purposes
```

**Data Collection Checklist**:
```markdown
Using expo-location?
  ✅ Disclose: Location Data (Precise or Coarse)
  ✅ Purpose: App Functionality / Product Personalization
  ✅ Linked to User: Yes (usually)

Using expo-firebase-analytics?
  ✅ Disclose: Identifiers (User ID, Device ID)
  ✅ Disclose: Usage Data (Product Interaction)
  ✅ Purpose: Analytics
  ✅ Used for Tracking: Yes

Using expo-camera or expo-image-picker?
  ✅ Disclose: Photos and Videos
  ✅ Purpose: App Functionality
  ✅ Linked to User: Yes (if uploaded to server)
```

**Example Rejection**:
```
"Your app's privacy report indicates no data is collected, but we
found that your app collects location data."

Fix: Update App Privacy in App Store Connect to disclose location
data collection.
```

---

### 5. Metadata Misleading or Inaccurate 🔴 HIGH RISK

**Guideline**: 2.3 - Accurate Metadata

**Common Scenarios**:
```
❌ Screenshots show features not in app
❌ Description mentions features not implemented
❌ App name contains competitor names
❌ App claims to be "#1" without proof
❌ Keywords spam (repeating same words)
```

**How to Prevent**:
```markdown
✅ Screenshots must be from ACTUAL app (no mockups)
✅ Update screenshots to match current version
✅ Description must accurately reflect app features
✅ Remove any "coming soon" features from description
✅ Avoid superlatives (#1, best, only, etc.) unless substantiated
✅ Keep app name concise and descriptive
✅ Don't mention competitors in metadata
✅ Keywords: relevant only, no spam
```

**Example Rejection**:
```
"Your screenshots show a dark mode feature, but we were unable to
locate this feature in your app."

Guideline 2.3.4 - Performance - Accurate Metadata

Fix: Either implement dark mode or update screenshots to match
current app version.
```

---

### 6. External Payment Links (Digital Goods) 🔴 HIGH RISK

**Guideline**: 3.1.1 - In-App Purchase

**Requirement**:
Apps selling digital goods or services MUST use Apple's in-app purchase. Links to external payment pages are prohibited.

**Common Scenarios**:
```
❌ "Buy Premium on our website" link
❌ Button directing to Stripe checkout page
❌ "Subscribe here" link to external site
❌ Mentioning prices available elsewhere
```

**How to Prevent**:
```markdown
✅ Use Apple's in-app purchase (StoreKit) for:
   - Subscriptions
   - Premium features
   - Virtual currency
   - Unlockable content
✅ Remove ALL external payment links for digital goods
✅ Can use external payment for physical goods/services ONLY
✅ Use RevenueCat or similar to manage IAP
```

**Code Scan**:
```bash
# Scan for external payment links
grep -r "stripe.com" src/ app/
grep -r "paypal.com" src/ app/
grep -r "paddle.com" src/ app/

# Remove all links to external payment for digital goods
```

**Example Rejection**:
```
"Your app contains a link to https://yourapp.com/subscribe which
allows users to purchase premium features outside of in-app purchase."

Guideline 3.1.1 - Business - In-App Purchase

Fix: Remove link. Implement in-app purchase using StoreKit for
premium subscription.
```

---

### 7. Placeholder or Unfinished Content 🟡 MEDIUM RISK

**Guideline**: 2.1 - App Completeness

**Common Scenarios**:
```
❌ "Lorem ipsum" text in app
❌ "Coming Soon" sections
❌ Empty states with no guidance
❌ [TODO] comments visible to users
❌ Default/placeholder images
```

**How to Prevent**:
```markdown
✅ Replace ALL placeholder content before submission
✅ Fill all sections with real content
✅ Provide sample/demo data for empty states
✅ Remove "Coming Soon" features
✅ Test app as if you're a first-time user
```

**Example Rejection**:
```
"Your app contains unfinished features and placeholder content."

Guideline 2.1 - Performance - App Completeness

Fix: Replace Lorem ipsum with actual content. Remove or complete
"Coming Soon" sections.
```

---

### 8. Kids Apps with Third-Party Ads/Analytics 🔴 HIGH RISK

**Guideline**: 1.3 - Kids Category

**Requirement**:
Apps in Kids category (ages 5 and under, ages 6-8, ages 9-11) CANNOT have third-party advertising or analytics.

**Common Scenarios**:
```
❌ Kids app with Google AdMob
❌ Kids app with Facebook Analytics
❌ Kids app with Mixpanel/Amplitude
❌ Kids app collecting behavioral data
```

**How to Prevent**:
```markdown
For Kids Apps ONLY:
✅ Remove all third-party ad networks
✅ Remove all third-party analytics
✅ Use first-party analytics only (your own server)
✅ Add parental gate for external links
✅ No contextual advertising or targeted ads
✅ Comply with COPPA (Children's Online Privacy Protection Act)
```

**Example Rejection**:
```
"Your app in the Kids Category contains third-party analytics
(Google Analytics), which is not permitted."

Guideline 1.3 - Kids Category

Fix: Remove Google Analytics or remove app from Kids Category.
```

---

## Google Play Store - Top Rejection Reasons

### 9. Missing or Inadequate Privacy Policy 🔴 HIGH RISK

**Policy**: User Data - Privacy Policy

**Common Scenarios**:
```
❌ No privacy policy provided in Play Console
❌ Privacy policy URL returns 404
❌ Privacy policy doesn't cover sensitive permissions
❌ Generic template not customized for app
```

**How to Prevent**:
```markdown
✅ Create app-specific privacy policy
✅ Host at accessible HTTPS URL
✅ Add URL to Play Console:
   Store presence → Privacy Policy
✅ Policy must cover:
   - What data is collected
   - How data is used
   - If data is shared with third parties
   - User rights (access, deletion)
   - Contact information
✅ Mention ALL permissions app uses:
   - Location → Why and when collected
   - Camera → Why needed
   - Storage → What files accessed
```

**Example Rejection**:
```
"Your app requests sensitive permissions (ACCESS_FINE_LOCATION)
but does not have a privacy policy or the policy does not disclose
location data collection."

Policy: User Data

Fix: Add privacy policy that explicitly mentions location data
collection and usage.
```

---

### 10. Incomplete Data Safety Section 🔴 HIGH RISK

**Policy**: Data Safety (Play Console)

**Common Scenarios**:
```
❌ Data Safety section not completed
❌ Marked "No data collected" when app does collect data
❌ Missing data sharing disclosure
❌ Incorrect data type selections
```

**How to Prevent**:
```markdown
✅ Complete Data Safety in Play Console
✅ Accurately disclose ALL data collected:
   - Location (precise or approximate)
   - Personal info (name, email, phone)
   - Photos/videos (if using camera/gallery)
   - App activity (if using analytics)
   - Device IDs (if using analytics)
✅ Disclose if data is shared with third parties
✅ Mark if data collection is optional or required
✅ Explain security practices (encryption in transit, etc.)
```

**Data Safety Checklist**:
```markdown
Using expo-location?
  ✅ Data Type: Location → Approximate or Precise location
  ✅ Data Usage: App functionality
  ✅ Data Sharing: No (unless sending to your server)
  ✅ Ephemeral: No (if stored)
  ✅ Required: Yes/No

Using expo-firebase-analytics?
  ✅ Data Type: App activity → App interactions
  ✅ Data Type: Device or other IDs → Analytics IDs
  ✅ Data Usage: Analytics
  ✅ Data Sharing: Yes (shared with Google)
  ✅ Ephemeral: No
```

**Example Rejection**:
```
"Your app's Data Safety section indicates no data is collected,
but the app requests the ACCESS_FINE_LOCATION permission."

Policy: Data Safety

Fix: Update Data Safety to disclose location data collection.
```

---

### 11. Target SDK Too Low 🔴 HIGH RISK

**Policy**: Target API Level Requirement

**Requirement**:
- New apps: Must target API 33 (Android 13) or higher
- App updates: Must target API 31 (Android 12) or higher

**Common Scenarios**:
```
❌ targetSdkVersion: 30 (too low for new apps)
❌ targetSdkVersion not set in app.json
❌ Using old Expo SDK with outdated target SDK
```

**How to Prevent**:
```markdown
✅ Set targetSdkVersion to 33+ in app.json:
   "expo.android.targetSdkVersion": 34
✅ Use latest Expo SDK (SDK 50+ targets API 34)
✅ Test app on Android 13+ devices
✅ Update deprecated APIs if any
```

**Example Rejection**:
```
"Your app targets API level 30. New apps must target API level 33
or higher."

Policy: Target API Level

Fix: Update expo.android.targetSdkVersion to 33 or 34 in app.json.
```

---

### 12. Using APK Instead of AAB 🟡 MEDIUM RISK

**Policy**: Android App Bundle

**Requirement**:
New apps must use Android App Bundle (.aab) format, not APK.

**Common Scenarios**:
```
❌ Uploading .apk file to Play Console
❌ EAS build configured for "apk" instead of "app-bundle"
```

**How to Prevent**:
```markdown
✅ Configure eas.json for AAB:
   {
     "build": {
       "production": {
         "android": {
           "buildType": "app-bundle"
         }
       }
     }
   }
✅ Build with: eas build --platform android --profile production
✅ Upload .aab file to Play Console (not .apk)
```

**Example Rejection**:
```
"Your app is submitted as an APK. New apps must use Android App
Bundle format."

Policy: App Bundle Requirement

Fix: Rebuild as AAB using EAS or Gradle, then upload .aab file.
```

---

### 13. Sensitive Permissions Not Justified 🔴 HIGH RISK

**Policy**: Permissions

**Requirement**:
Apps requesting sensitive permissions (location, camera, contacts, etc.) must justify usage in Play Console declaration form.

**Common Scenarios**:
```
❌ Requesting ACCESS_BACKGROUND_LOCATION without form
❌ Requesting SMS permissions without justification
❌ Requesting contacts without clear reason
❌ Requesting phone state without justification
```

**How to Prevent**:
```markdown
✅ Only request necessary permissions
✅ Complete declaration form in Play Console for:
   - ACCESS_BACKGROUND_LOCATION (REQUIRED)
   - SMS permissions (REQUIRED)
   - Call log permissions (REQUIRED)
   - Phone permissions (REQUIRED)
✅ Provide detailed justification for each permission
✅ Remove permissions not actively used
```

**Example Rejection**:
```
"Your app requests ACCESS_BACKGROUND_LOCATION but does not have
an approved declaration form explaining why background location
is necessary."

Policy: Permissions

Fix: Complete declaration form in Play Console explaining background
location usage, or remove permission if not needed.
```

---

## Cross-Platform Rejection Risks

### 14. App Crashes on Specific Devices 🔴 HIGH RISK

**Both iOS and Android**

**Common Scenarios**:
```
❌ App works on simulator but crashes on device
❌ App crashes on older devices (iOS 13, Android 10)
❌ App crashes on specific device models (iPad, tablets)
❌ Memory issues on low-RAM devices
```

**How to Prevent**:
```markdown
✅ Test on physical devices (not just simulator)
✅ Test on older OS versions (iOS 13, Android 10)
✅ Test on tablets (iPad, Android tablets)
✅ Test on low-end devices
✅ Use crash reporting (Sentry, Crashlytics)
✅ Fix all crashes before submission
✅ Optimize memory usage
✅ Handle low-memory warnings
```

---

### 15. Missing Demo/Test Account 🟡 MEDIUM RISK

**Both iOS and Android**

**Common Scenarios**:
```
❌ App requires login but no test account provided
❌ Test account doesn't work
❌ Test account has no content to review
❌ Test account expired or deleted
```

**How to Prevent**:
```markdown
✅ Create permanent demo account:
   - Email: demo@yourapp.com
   - Password: DemoPass123
✅ Add sample data to demo account
✅ Ensure account never expires
✅ Document credentials in review notes:
   iOS: App Store Connect → App Review Information
   Android: Play Console → App Content → Internal Testing
✅ Test credentials before submission
```

---

## Rejection Risk Checklist

### Before Submission (Run This Checklist)

```markdown
iOS App Store:
- [ ] App launches without crashes on physical device
- [ ] All features work end-to-end
- [ ] Sign in with Apple implemented (if using OAuth)
- [ ] Privacy policy accessible (HTTPS)
- [ ] App Privacy completed in App Store Connect
- [ ] Screenshots match actual app
- [ ] Description accurate
- [ ] Demo account works (if login required)
- [ ] No external payment links for digital goods
- [ ] No placeholder content
- [ ] Tested on iPad (if supportsTablet: true)

Google Play Store:
- [ ] App launches without crashes on physical device
- [ ] All features work end-to-end
- [ ] Privacy policy accessible (HTTPS)
- [ ] Data Safety completed in Play Console
- [ ] Target SDK 33+ (for new apps)
- [ ] Using AAB format (not APK)
- [ ] Sensitive permissions declared/justified
- [ ] Screenshots match actual app
- [ ] Description accurate
- [ ] Demo account works (if login required)
```

---

## Quick Reference: Rejection Prevention

| Issue | iOS Risk | Android Risk | Prevention |
|-------|----------|--------------|------------|
| App crashes | 🔴 | 🔴 | Test on physical device, fix all crashes |
| Missing Sign in with Apple | 🔴 | N/A | Implement if using OAuth |
| No privacy policy | 🔴 | 🔴 | Create and link in store |
| Incomplete data disclosure | 🔴 | 🔴 | Complete App Privacy / Data Safety |
| Misleading metadata | 🔴 | 🔴 | Accurate screenshots and description |
| External payment links | 🔴 | 🟢 | Remove for digital goods (iOS) |
| Placeholder content | 🟡 | 🟡 | Replace all Lorem ipsum |
| Kids app with ads | 🔴 | 🔴 | Remove third-party ads/analytics |
| Low target SDK | N/A | 🔴 | Target API 33+ |
| APK instead of AAB | N/A | 🟡 | Use AAB format |
| Sensitive permissions | 🟡 | 🔴 | Complete declaration form |
| No demo account | 🟡 | 🟡 | Provide working test credentials |

---

**Version**: 1.0
**Created**: 2026-01-10
**Authority**: App Store Review Experience + Play Store Submission History
**Maintained By**: app-store-compliance agent
