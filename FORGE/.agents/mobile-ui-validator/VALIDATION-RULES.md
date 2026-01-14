# MOBILE UI VALIDATION RULES

**Agent**: mobile-ui-validator
**Version**: 1.0
**Created**: 2026-01-10
**Purpose**: Technical detection rules for mobile UI anti-patterns

---

## Overview

This document defines the technical rules the mobile-ui-validator agent uses to detect anti-patterns in Expo/React Native applications.

**Rule Priority Levels:**
- **CRITICAL** - Blocks good UX, must fix before release
- **WARNING** - Impacts UX, should fix soon
- **INFO** - Best practice suggestion, nice to fix

---

## Rule 1: Vertical Scrolling Forms (CRITICAL)

### Detection Pattern

**Triggers when:**
```tsx
<ScrollView> contains > 5 <TextInput> components as children
```

**AST Detection Logic:**
```javascript
// Pseudo-code for detection
function detectVerticalScrollForm(fileAST) {
  const scrollViews = findAllJSXElements(fileAST, 'ScrollView');

  for (const scrollView of scrollViews) {
    const textInputs = countDirectAndNestedChildren(scrollView, 'TextInput');

    if (textInputs > 5) {
      return {
        severity: 'CRITICAL',
        count: textInputs,
        location: scrollView.loc,
        message: `ScrollView contains ${textInputs} TextInput fields (max: 5)`
      };
    }
  }
}
```

**Regex Pattern (Simple Detection):**
```regex
<ScrollView[\s\S]*?>[\s\S]*?(?:(?:<TextInput|{.*TextInput)[\s\S]*?){6,}[\s\S]*?<\/ScrollView>
```

**Threshold:**
- **Max TextInput in ScrollView**: 5
- **Recommended per step**: 3-5 fields
- **Max steps in wizard**: 5 steps

**False Positives to Ignore:**
```tsx
// ✅ IGNORE: Search forms (1-2 inputs)
<ScrollView>
  <TextInput placeholder="Search..." />
  {/* Other content */}
</ScrollView>

// ✅ IGNORE: Comment forms (1-3 inputs)
<ScrollView>
  <TextInput placeholder="Your name" />
  <TextInput placeholder="Comment" multiline />
</ScrollView>

// ❌ FLAG: Sign-up forms (6+ inputs)
<ScrollView>
  <TextInput placeholder="Email" />
  <TextInput placeholder="Password" />
  <TextInput placeholder="Confirm Password" />
  <TextInput placeholder="First Name" />
  <TextInput placeholder="Last Name" />
  <TextInput placeholder="Phone" />
  {/* MORE INPUTS = VIOLATION */}
</ScrollView>
```

**Context Clues for False Positives:**
- File name contains "search", "filter", "comment" → likely safe
- File name contains "signup", "register", "profile-edit", "settings" → likely violation
- Less than 3 TextInput total → safe
- Mix of TextInput and non-input content → evaluate case-by-case

**Suggested Fix:**
```tsx
// REPLACE:
<ScrollView>
  <TextInput placeholder="Email" />
  <TextInput placeholder="Password" />
  <TextInput placeholder="Confirm Password" />
  <TextInput placeholder="First Name" />
  <TextInput placeholder="Last Name" />
  <TextInput placeholder="Phone" />
  <TextInput placeholder="Address" />
  <TextInput placeholder="City" />
  <TextInput placeholder="State" />
  <TextInput placeholder="Zip" />
</ScrollView>

// WITH:
function MultiStepSignup() {
  const [step, setStep] = useState(1);

  // Step 1: Credentials (3 fields)
  if (step === 1) {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.stepContainer}>
        <Text style={styles.stepIndicator}>Step 1 of 3</Text>
        <TextInput placeholder="Email" />
        <TextInput placeholder="Password" />
        <TextInput placeholder="Confirm Password" />
        <Button title="Next" onPress={() => setStep(2)} />
      </KeyboardAvoidingView>
    );
  }

  // Step 2: Personal Info (4 fields)
  if (step === 2) {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.stepContainer}>
        <Text style={styles.stepIndicator}>Step 2 of 3</Text>
        <TextInput placeholder="First Name" />
        <TextInput placeholder="Last Name" />
        <TextInput placeholder="Phone" />
        <Button title="Back" onPress={() => setStep(1)} />
        <Button title="Next" onPress={() => setStep(3)} />
      </KeyboardAvoidingView>
    );
  }

  // Step 3: Address (3 fields)
  if (step === 3) {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.stepContainer}>
        <Text style={styles.stepIndicator}>Step 3 of 3</Text>
        <TextInput placeholder="Address" />
        <TextInput placeholder="City" />
        <TextInput placeholder="State & Zip" />
        <Button title="Back" onPress={() => setStep(2)} />
        <Button title="Create Account" onPress={handleSubmit} />
      </KeyboardAvoidingView>
    );
  }
}
```

---

## Rule 2: Vertical Scrolling Onboarding (WARNING)

### Detection Pattern

**Triggers when:**
```tsx
File name matches onboarding pattern
AND uses vertical <ScrollView>
AND does NOT use horizontal scroll or swiper
```

**File Name Patterns:**
```regex
/(onboarding|welcome|intro|tutorial|walkthrough)\.tsx$/i
```

**Detection Logic:**
```javascript
function detectVerticalOnboarding(fileAST, fileName) {
  const isOnboardingFile = /onboarding|welcome|intro|tutorial|walkthrough/i.test(fileName);

  if (!isOnboardingFile) return null;

  const hasVerticalScroll = findJSXElement(fileAST, 'ScrollView', {
    horizontal: false // or prop missing
  });

  const hasHorizontalScroll = findJSXElement(fileAST, 'ScrollView', {
    horizontal: true
  });

  const hasSwiper = findJSXElement(fileAST, /Swiper|FlatList.*horizontal/);

  if (hasVerticalScroll && !hasHorizontalScroll && !hasSwiper) {
    return {
      severity: 'WARNING',
      message: 'Onboarding screen uses vertical scroll instead of horizontal swiper'
    };
  }
}
```

**False Positives to Ignore:**
```tsx
// ✅ IGNORE: Long terms of service (read-only content)
// File: terms-onboarding.tsx
<ScrollView>
  <Text>{longTermsText}</Text>
</ScrollView>

// ✅ IGNORE: Welcome screen with scrollable intro text (if brief)
<ScrollView>
  <Text>Welcome! Here's a brief intro...</Text>
  <Button title="Get Started" />
</ScrollView>
```

**Suggested Fix:**
```tsx
// REPLACE:
// File: onboarding.tsx
<ScrollView>
  <View style={styles.screen1}>...</View>
  <View style={styles.screen2}>...</View>
  <View style={styles.screen3}>...</View>
</ScrollView>

// WITH:
import Swiper from 'react-native-swiper';

<Swiper
  showsPagination
  loop={false}
  activeDotColor="#3B82F6"
>
  <View style={styles.slide}>
    <Image source={require('./assets/welcome-1.png')} />
    <Text style={styles.title}>Welcome to App</Text>
    <Text style={styles.description}>Track your progress effortlessly</Text>
  </View>

  <View style={styles.slide}>
    <Image source={require('./assets/welcome-2.png')} />
    <Text style={styles.title}>Stay Organized</Text>
    <Text style={styles.description}>All your data in one place</Text>
  </View>

  <View style={styles.slide}>
    <Image source={require('./assets/welcome-3.png')} />
    <Text style={styles.title}>Get Started</Text>
    <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
  </View>
</Swiper>
```

---

## Rule 3: Long Settings Pages (WARNING)

### Detection Pattern

**Triggers when:**
```tsx
File name matches settings pattern
AND <ScrollView> contains > 10 pressable/selectable items
```

**File Name Patterns:**
```regex
/(settings|preferences|config)\.tsx$/i
```

**Detection Logic:**
```javascript
function detectLongSettingsPage(fileAST, fileName) {
  const isSettingsFile = /settings|preferences|config/i.test(fileName);

  if (!isSettingsFile) return null;

  const scrollViews = findAllJSXElements(fileAST, 'ScrollView');

  for (const scrollView of scrollViews) {
    const interactiveItems = countChildren(scrollView, [
      'TouchableOpacity',
      'Pressable',
      'Switch',
      'Button',
      'ListItem'
    ]);

    if (interactiveItems > 10) {
      return {
        severity: 'WARNING',
        count: interactiveItems,
        message: `Settings screen has ${interactiveItems} items (max recommended: 10). Consider grouping.`
      };
    }
  }
}
```

**Threshold:**
- **Max items in single settings screen**: 10
- **Recommended**: 5-8 items per group
- **Pattern**: Use grouped navigation (Account Settings, Privacy Settings, etc.)

**Suggested Fix:**
```tsx
// REPLACE:
// File: settings.tsx (20 items)
<ScrollView>
  <SettingRow title="Profile" />
  <SettingRow title="Email" />
  <SettingRow title="Password" />
  <SettingRow title="Notifications" />
  <SettingRow title="Privacy" />
  {/* 15 more items... */}
</ScrollView>

// WITH:
// File: settings/index.tsx (grouped navigation)
<View style={styles.container}>
  <SettingGroup
    title="Account"
    icon="user"
    onPress={() => navigation.navigate('AccountSettings')}
  />
  <SettingGroup
    title="Privacy & Security"
    icon="shield"
    onPress={() => navigation.navigate('PrivacySettings')}
  />
  <SettingGroup
    title="Notifications"
    icon="bell"
    onPress={() => navigation.navigate('NotificationSettings')}
  />
  <SettingGroup
    title="Appearance"
    icon="palette"
    onPress={() => navigation.navigate('AppearanceSettings')}
  />
</View>

// Then create:
// settings/account.tsx (5-8 items)
// settings/privacy.tsx (5-8 items)
// settings/notifications.tsx (5-8 items)
```

---

## Rule 4: Web-Style Navigation (WARNING)

### Detection Pattern

**Triggers when:**
```tsx
Uses Drawer navigation OR hamburger menu icon
WITHOUT bottom tab navigation
```

**Detection Logic:**
```javascript
function detectWebNavigation(fileAST, fileName) {
  const hasDrawer = findImport(fileAST, '@react-navigation/drawer');
  const hasHamburgerIcon = findJSXElement(fileAST, 'Icon', {
    name: /menu|hamburger|bars/i
  });

  const hasBottomTabs = findImport(fileAST, '@react-navigation/bottom-tabs');

  if ((hasDrawer || hasHamburgerIcon) && !hasBottomTabs) {
    return {
      severity: 'WARNING',
      message: 'Drawer/hamburger menu detected. Mobile apps should use bottom tab navigation.'
    };
  }
}
```

**False Positives to Ignore:**
```tsx
// ✅ IGNORE: Drawer used WITH bottom tabs (supplementary navigation)
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Both exist = OK (drawer for secondary actions)
```

**Suggested Fix:**
```tsx
// REPLACE:
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

<Drawer.Navigator>
  <Drawer.Screen name="Home" component={HomeScreen} />
  <Drawer.Screen name="Profile" component={ProfileScreen} />
  <Drawer.Screen name="Settings" component={SettingsScreen} />
</Drawer.Navigator>

// WITH:
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, User, Settings } from 'lucide-react-native';

const Tab = createBottomTabNavigator();

<Tab.Navigator
  screenOptions={{
    tabBarActiveTintColor: '#3B82F6',
    tabBarInactiveTintColor: '#9CA3AF',
  }}
>
  <Tab.Screen
    name="Home"
    component={HomeScreen}
    options={{
      tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
    }}
  />
  <Tab.Screen
    name="Profile"
    component={ProfileScreen}
    options={{
      tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
    }}
  />
  <Tab.Screen
    name="Settings"
    component={SettingsScreen}
    options={{
      tabBarIcon: ({ color, size }) => <Settings color={color} size={size} />,
    }}
  />
</Tab.Navigator>
```

---

## Rule 5: Missing KeyboardAvoidingView (WARNING)

### Detection Pattern

**Triggers when:**
```tsx
Screen has <TextInput> with submit button
AND no <KeyboardAvoidingView> wrapper
```

**Detection Logic:**
```javascript
function detectMissingKeyboardAvoidance(fileAST) {
  const hasTextInput = findJSXElement(fileAST, 'TextInput');
  const hasButton = findJSXElement(fileAST, /Button|TouchableOpacity.*onPress/);
  const hasKeyboardAvoidingView = findJSXElement(fileAST, 'KeyboardAvoidingView');

  if (hasTextInput && hasButton && !hasKeyboardAvoidingView) {
    return {
      severity: 'WARNING',
      message: 'Form with TextInput and Button detected without KeyboardAvoidingView. Submit button may be hidden by keyboard.'
    };
  }
}
```

**False Positives to Ignore:**
```tsx
// ✅ IGNORE: Single search input at top (no submit button below)
<View>
  <TextInput placeholder="Search..." />
  {/* Content below */}
</View>

// ✅ IGNORE: Input with auto-submit (no button)
<TextInput
  placeholder="Search..."
  onChangeText={handleSearch} // auto-searches
/>
```

**Suggested Fix:**
```tsx
// REPLACE:
<View>
  <TextInput placeholder="Email" />
  <TextInput placeholder="Password" />
  <Button title="Login" onPress={handleLogin} />
</View>

// WITH:
import { KeyboardAvoidingView, Platform } from 'react-native';

<KeyboardAvoidingView
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  style={{ flex: 1 }}
  keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
>
  <ScrollView contentContainerStyle={styles.container}>
    <TextInput placeholder="Email" />
    <TextInput placeholder="Password" />
    <Button title="Login" onPress={handleLogin} />
  </ScrollView>
</KeyboardAvoidingView>
```

---

## Rule 6: Desktop Dropdowns (INFO)

### Detection Pattern

**Triggers when:**
```tsx
Uses HTML <select> element OR web-style Picker
INSTEAD of native Picker component
```

**Detection Logic:**
```javascript
function detectWebDropdown(fileAST) {
  const hasSelectElement = findJSXElement(fileAST, 'select');

  // Check for non-native picker libraries
  const hasWebPicker = findImport(fileAST, /react-select|downshift/);

  const hasNativePicker = findImport(fileAST, '@react-native-picker/picker');

  if ((hasSelectElement || hasWebPicker) && !hasNativePicker) {
    return {
      severity: 'INFO',
      message: 'Web-style dropdown detected. Consider using @react-native-picker/picker for better mobile UX.'
    };
  }
}
```

**Suggested Fix:**
```tsx
// REPLACE:
<select>
  <option value="us">United States</option>
  <option value="ca">Canada</option>
  <option value="mx">Mexico</option>
</select>

// WITH (iOS/Android Native Picker):
import { Picker } from '@react-native-picker/picker';

<Picker
  selectedValue={selectedCountry}
  onValueChange={(itemValue) => setSelectedCountry(itemValue)}
  style={styles.picker}
>
  <Picker.Item label="United States" value="us" />
  <Picker.Item label="Canada" value="ca" />
  <Picker.Item label="Mexico" value="mx" />
</Picker>

// OR (Modal Picker for better UX):
import { Modal, TouchableOpacity, FlatList } from 'react-native';

const [isPickerVisible, setPickerVisible] = useState(false);

<TouchableOpacity onPress={() => setPickerVisible(true)}>
  <Text>{selectedCountry || 'Select Country'}</Text>
</TouchableOpacity>

<Modal visible={isPickerVisible} animationType="slide">
  <FlatList
    data={countries}
    renderItem={({ item }) => (
      <TouchableOpacity onPress={() => {
        setSelectedCountry(item.value);
        setPickerVisible(false);
      }}>
        <Text>{item.label}</Text>
      </TouchableOpacity>
    )}
  />
</Modal>
```

---

## Validation Scope

### Files to Scan

**ALWAYS scan:**
- `/app/**/*.tsx` (Expo Router screens)
- `/screens/**/*.tsx` (traditional navigation)
- `/components/**/*.tsx` (reusable components)

**Priority scan (high-risk files):**
- `**/signup.tsx`, `**/register.tsx`
- `**/login.tsx`, `**/signin.tsx`
- `**/onboarding.tsx`, `**/welcome.tsx`, `**/intro.tsx`
- `**/settings.tsx`, `**/preferences.tsx`
- `**/profile/edit.tsx`, `**/account/edit.tsx`
- `**/checkout.tsx`, `**/payment.tsx`

**SKIP (safe to ignore):**
- `/node_modules/**`
- `/ios/**`, `/android/**` (native code)
- `**/*.test.tsx`, `**/*.spec.tsx` (test files)
- `/assets/**`

### When Scrolling IS Allowed (Whitelist)

**DO NOT flag these patterns:**

```tsx
// ✅ FlatList/FlashList for dynamic lists
<FlatList
  data={products}
  renderItem={({ item }) => <ProductCard product={item} />}
/>

// ✅ Horizontal ScrollView for carousels
<ScrollView horizontal showsHorizontalScrollIndicator={false}>
  <ImageCard />
  <ImageCard />
  <ImageCard />
</ScrollView>

// ✅ Vertical ScrollView for long-form read-only content
// File: article.tsx, terms.tsx, privacy.tsx
<ScrollView>
  <Text>{longArticleContent}</Text>
</ScrollView>

// ✅ Chat/message threads (inverted FlatList)
<FlatList
  inverted
  data={messages}
  renderItem={({ item }) => <MessageBubble message={item} />}
/>

// ✅ Search results (dynamic list)
<FlatList
  data={searchResults}
  renderItem={({ item }) => <SearchResultCard item={item} />}
/>
```

---

## Threshold Configuration

Default thresholds (can be customized per project via `.mobile-ui-validator.config.js`):

```javascript
module.exports = {
  // Rule 1: Vertical Scrolling Forms
  maxInputsInScrollView: 5,        // Trigger CRITICAL if exceeded

  // Rule 3: Long Settings Pages
  maxSettingsItems: 10,             // Trigger WARNING if exceeded

  // Rule 2: Onboarding
  maxOnboardingScreens: 5,          // Max horizontal swiper screens

  // Rule 5: Keyboard Avoidance
  enforceKeyboardAvoidance: true,   // Flag missing KeyboardAvoidingView

  // Rule 6: Native Picker
  enforceNativePicker: true,        // Warn on web-style dropdowns

  // Scope
  ignoreTestFiles: true,            // Skip *.test.tsx files
  ignoreNodeModules: true,          // Skip /node_modules/
};
```

---

## Detection Priorities

**Priority 1 (Scan First):**
1. Rule 1: Vertical Scrolling Forms (CRITICAL)
2. Rule 5: Missing KeyboardAvoidingView (blocks UX)

**Priority 2 (Scan Second):**
3. Rule 2: Vertical Scrolling Onboarding
4. Rule 4: Web-Style Navigation

**Priority 3 (Scan Last):**
5. Rule 3: Long Settings Pages
6. Rule 6: Desktop Dropdowns

---

## Report Format

### Critical Issues Section
```markdown
## ❌ CRITICAL ISSUES (Must Fix)

### Vertical Scrolling Forms Detected

**File**: [/app/(auth)/signup.tsx](app/(auth)/signup.tsx#L45)
**Line**: 45
**Issue**: ScrollView contains 12 TextInput fields (max: 5)
**Impact**: Poor mobile UX, form fields hidden, web pattern detected
**Fix**: Convert to multi-step wizard (3-4 steps, max 5 fields per step)

**Code Location**:
```tsx
// Line 45-57
<ScrollView>
  <TextInput placeholder="Email" />
  <TextInput placeholder="Password" />
  {/* 10 more fields... */}
</ScrollView>
```

**Suggested Fix**: See code example in Rule 1 documentation
```

### Warning Issues Section
```markdown
## ⚠️ WARNINGS (Should Fix)

### Missing KeyboardAvoidingView

**File**: [/app/profile/edit.tsx](app/profile/edit.tsx#L23)
**Line**: 23
**Issue**: Form with 3 TextInput fields and submit button without KeyboardAvoidingView
**Impact**: Submit button may be hidden when keyboard appears
**Fix**: Wrap form in KeyboardAvoidingView component

**Suggested Fix**: See code example in Rule 5 documentation
```

### Passed Section
```markdown
## ✅ PASSED (Good Patterns Detected)

- [/app/(tabs)/_layout.tsx](app/(tabs)/_layout.tsx): Bottom tabs navigation ✅
- [/app/onboarding.tsx](app/onboarding.tsx): Horizontal swiper implemented ✅
- [/app/feed.tsx](app/feed.tsx): FlatList used for dynamic content ✅
- [/app/messages.tsx](app/messages.tsx): Inverted FlatList for chat ✅
- [/app/gallery.tsx](app/gallery.tsx): Horizontal ScrollView for carousel ✅
```

---

## Edge Cases & Special Handling

### Conditional Rendering
```tsx
// If TextInput count varies by condition, use MAX count
{isPremium ? (
  <ScrollView>
    <TextInput /> {/* 3 fields */}
  </ScrollView>
) : (
  <ScrollView>
    <TextInput /> {/* 8 fields */}
  </ScrollView>
)}

// Detection: Flag if ANY branch exceeds threshold (8 > 5 = CRITICAL)
```

### Dynamic Forms
```tsx
// Forms with dynamic field arrays
<ScrollView>
  {fields.map(field => <TextInput key={field.id} />)}
</ScrollView>

// Detection: Flag as WARNING with note "Dynamic form detected, verify max fields"
```

### Commented Code
```tsx
// Ignore commented-out violations
{/*
<ScrollView>
  <TextInput /> // 10 fields - but commented
</ScrollView>
*/}
```

---

**Version**: 1.0
**Created**: 2026-01-10
**Authority**: FORGE Mobile Standards
**Maintained By**: mobile-ui-validator agent
