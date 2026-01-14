# Mobile UI Anti-Patterns

**Pattern Type**: Mobile-Specific Anti-Patterns for AI Agents
**Applies To**: React Native, Expo, iOS, Android development
**Created**: 2026-01-10
**Author**: Codex + Diablo Agent

---

## Purpose

AI agents trained on web development patterns often apply **web UI paradigms to mobile apps**, resulting in poor user experience. This document defines mobile-specific anti-patterns and their correct implementations.

---

## 🚨 ANTI-PATTERN #1: Vertical Scrolling Forms (WEB PATTERN, NOT MOBILE)

### The Problem

AI agents love to create long, vertically scrolling forms like they would for a website. **This is the #1 mobile UI anti-pattern.**

### ❌ WRONG (Web Pattern):

```tsx
// AI agents default to this - NEVER DO THIS!
<ScrollView>
  <Text>Sign Up</Text>
  <TextInput placeholder="Name" />
  <TextInput placeholder="Email" />
  <TextInput placeholder="Phone" />
  <TextInput placeholder="Address Line 1" />
  <TextInput placeholder="Address Line 2" />
  <TextInput placeholder="City" />
  <TextInput placeholder="State" />
  <TextInput placeholder="Zip Code" />
  <TextInput placeholder="Country" />
  <TextInput placeholder="Company" />
  <TextInput placeholder="Job Title" />
  <TextInput placeholder="Referral Code" />
  {/* 20 more fields... user scrolling endlessly */}
  <Button title="Submit" />
</ScrollView>
```

**Problems**:
- User has to scroll forever
- Loses context (can't see what step they're on)
- Keyboard blocks half the screen
- Feels like a web form, not a mobile app
- Error messages get lost off-screen

---

### ✅ CORRECT (Mobile Pattern): Multi-Step Horizontal Flow

```tsx
// Step-by-step wizard (mobile-first approach)
import { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

function SignupFlow() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
            <Text>Step 1 of 4: Basic Info</Text>
            <TextInput placeholder="Name" /* fits in view */ />
            <TextInput placeholder="Email" /* fits in view */ />
            <Button title="Next" onPress={() => setStep(2)} />
          </View>
        );
      case 2:
        return (
          <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
            <Text>Step 2 of 4: Contact</Text>
            <TextInput placeholder="Phone" /* fits in view */ />
            <TextInput placeholder="Address" /* fits in view */ />
            <Button title="Next" onPress={() => setStep(3)} />
            <Button title="Back" onPress={() => setStep(1)} />
          </View>
        );
      // ... more steps
    }
  };

  return renderStep();
}
```

**Benefits**:
- All inputs visible without scrolling
- Progress indicator ("Step 2 of 4")
- Back/Next navigation
- Keyboard doesn't hide critical UI
- Feels native to mobile

---

### ✅ CORRECT Alternative: Horizontal Swiper

```tsx
// Using react-native-swiper or similar
import Swiper from 'react-native-swiper';

function SignupFlow() {
  return (
    <Swiper showsPagination loop={false}>
      <View style={styles.slide}>
        <Text>Step 1: Basic Info</Text>
        <TextInput placeholder="Name" />
        <TextInput placeholder="Email" />
      </View>
      <View style={styles.slide}>
        <Text>Step 2: Contact</Text>
        <TextInput placeholder="Phone" />
        <TextInput placeholder="Address" />
      </View>
      <View style={styles.slide}>
        <Text>Step 3: Preferences</Text>
        {/* ... */}
      </View>
    </Swiper>
  );
}
```

---

### ✅ CORRECT Alternative: Tabs for Grouped Sections

```tsx
// For settings pages with multiple sections
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

function SettingsScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={ProfileSettings} />
      <Tab.Screen name="Privacy" component={PrivacySettings} />
      <Tab.Screen name="Notifications" component={NotificationSettings} />
    </Tab.Navigator>
  );
}

function ProfileSettings() {
  return (
    <View style={{ padding: 20 }}>
      {/* Max 5 fields, all fit in view */}
      <TextInput placeholder="Display Name" />
      <TextInput placeholder="Bio" />
      <Button title="Save" />
    </View>
  );
}
```

---

### ✅ CORRECT Alternative: Bottom Sheet for Long Forms

```tsx
// For forms that genuinely need many fields
import BottomSheet from '@gorhom/bottom-sheet';

function EditContactForm() {
  return (
    <BottomSheet snapPoints={['25%', '50%', '90%']}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* OK to scroll here because it's in a bottom sheet context */}
        <TextInput placeholder="Name" />
        <TextInput placeholder="Email" />
        <TextInput placeholder="Phone" />
        {/* ... more fields, but user expects scroll in bottom sheet */}
      </ScrollView>
    </BottomSheet>
  );
}
```

---

## 🚨 ANTI-PATTERN #2: Vertically Scrolling Onboarding

### ❌ WRONG:

```tsx
// Long vertical onboarding scroll
<ScrollView>
  <View style={{ height: 800 }}>
    <Text>Welcome to App!</Text>
    <Image source={logo} />
  </View>
  <View style={{ height: 800 }}>
    <Text>Feature 1</Text>
    <Image source={feature1} />
  </View>
  <View style={{ height: 800 }}>
    <Text>Feature 2</Text>
    <Image source={feature2} />
  </View>
  {/* User scrolls down instead of swiping */}
</ScrollView>
```

### ✅ CORRECT:

```tsx
// Horizontal swiper for onboarding
import Swiper from 'react-native-swiper';

function Onboarding() {
  return (
    <Swiper
      showsPagination
      dot={<View style={styles.dot} />}
      activeDot={<View style={styles.activeDot} />}
    >
      <View style={styles.slide}>
        <Image source={logo} />
        <Text>Welcome to App!</Text>
      </View>
      <View style={styles.slide}>
        <Image source={feature1} />
        <Text>Track your progress</Text>
      </View>
      <View style={styles.slide}>
        <Image source={feature2} />
        <Text>Connect with friends</Text>
        <Button title="Get Started" onPress={() => navigate('SignUp')} />
      </View>
    </Swiper>
  );
}
```

---

## 🚨 ANTI-PATTERN #3: Settings as Long Scrolling List

### ❌ WRONG:

```tsx
// Endless scrolling settings page
<ScrollView>
  <Text>Profile Settings</Text>
  <TextInput placeholder="Name" />
  <TextInput placeholder="Email" />
  <TextInput placeholder="Phone" />

  <Text>Privacy Settings</Text>
  <Switch label="Public Profile" />
  <Switch label="Show Email" />
  <Switch label="Show Phone" />

  <Text>Notification Settings</Text>
  <Switch label="Push Notifications" />
  <Switch label="Email Notifications" />
  <Switch label="SMS Notifications" />

  {/* ... 20 more settings */}
</ScrollView>
```

### ✅ CORRECT:

```tsx
// Grouped settings with navigation
function SettingsScreen() {
  return (
    <View>
      <SettingRow
        title="Profile"
        icon="user"
        onPress={() => navigate('ProfileSettings')}
      />
      <SettingRow
        title="Privacy"
        icon="lock"
        onPress={() => navigate('PrivacySettings')}
      />
      <SettingRow
        title="Notifications"
        icon="bell"
        onPress={() => navigate('NotificationSettings')}
      />
      <SettingRow
        title="Account"
        icon="settings"
        onPress={() => navigate('AccountSettings')}
      />
    </View>
  );
}

// Each setting page has max 5-7 items, fits in view
function ProfileSettings() {
  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Name" />
      <TextInput placeholder="Email" />
      <Button title="Save" />
    </View>
  );
}
```

---

## When Scrolling IS Allowed

### ✅ Feeds/Timelines (Content Consumption)

```tsx
// FlatList for social feed - scrolling is expected
<FlatList
  data={posts}
  renderItem={({ item }) => <PostCard post={item} />}
  keyExtractor={(item) => item.id}
/>
```

### ✅ Product Lists (E-commerce)

```tsx
// Grid of products - scrolling is expected
<FlatList
  data={products}
  numColumns={2}
  renderItem={({ item }) => <ProductCard product={item} />}
/>
```

### ✅ Horizontal Carousels

```tsx
// Horizontal scrolling for images/cards
<FlatList
  horizontal
  data={images}
  renderItem={({ item }) => <Image source={item} />}
  showsHorizontalScrollIndicator={false}
/>
```

### ✅ Long-Form Read-Only Content

```tsx
// Articles, terms of service, privacy policy
<ScrollView>
  <Text>{articleContent}</Text>
</ScrollView>
```

### ✅ Chat/Messages

```tsx
// Conversation thread - scrolling expected
<FlatList
  data={messages}
  renderItem={({ item }) => <MessageBubble message={item} />}
  inverted // newest at bottom
/>
```

---

## 🚨 ANTI-PATTERN #4: Web-Style Navigation

### ❌ WRONG:

```tsx
// Hamburger menu like a website
<View>
  <HamburgerIcon onPress={() => setMenuOpen(true)} />
  {menuOpen && (
    <View style={styles.menu}>
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/settings">Settings</Link>
      {/* ... */}
    </View>
  )}
</View>
```

### ✅ CORRECT:

```tsx
// Bottom tab navigation (mobile standard)
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
```

---

## 🚨 ANTI-PATTERN #5: Desktop-Style Dropdowns

### ❌ WRONG:

```tsx
// Tiny dropdown like on desktop
<select>
  <option>Select Country</option>
  <option>USA</option>
  <option>Canada</option>
  {/* ... 200 countries */}
</select>
```

### ✅ CORRECT:

```tsx
// Picker with native modal (iOS) or bottom sheet (Android)
import { Picker } from '@react-native-picker/picker';

<Picker
  selectedValue={country}
  onValueChange={(value) => setCountry(value)}
>
  <Picker.Item label="Select Country" value="" />
  <Picker.Item label="USA" value="us" />
  <Picker.Item label="Canada" value="ca" />
  {/* ... */}
</Picker>

// OR custom searchable picker for long lists
<TouchableOpacity onPress={() => setPickerVisible(true)}>
  <Text>{country || "Select Country"}</Text>
</TouchableOpacity>

<Modal visible={pickerVisible}>
  <SearchBar onSearch={filterCountries} />
  <FlatList
    data={filteredCountries}
    renderItem={({ item }) => (
      <TouchableOpacity onPress={() => selectCountry(item)}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    )}
  />
</Modal>
```

---

## 🚨 ANTI-PATTERN #6: Ignoring Keyboard

### ❌ WRONG:

```tsx
// Submit button hidden by keyboard
<View style={{ flex: 1 }}>
  <TextInput placeholder="Email" />
  <TextInput placeholder="Password" />
  <Button title="Login" style={{ position: 'absolute', bottom: 20 }} />
  {/* Button gets hidden when keyboard appears! */}
</View>
```

### ✅ CORRECT:

```tsx
// KeyboardAvoidingView keeps button visible
import { KeyboardAvoidingView, Platform } from 'react-native';

<KeyboardAvoidingView
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  style={{ flex: 1 }}
>
  <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
    <TextInput placeholder="Email" />
    <TextInput placeholder="Password" />
    <Button title="Login" />
  </View>
</KeyboardAvoidingView>
```

---

## Mobile UI Best Practices Checklist

### For Forms/Input Screens:
- [ ] All fields fit in viewport without scrolling
- [ ] Multi-step flow for > 5 fields
- [ ] Progress indicator shown ("Step 2 of 4")
- [ ] KeyboardAvoidingView used
- [ ] Submit button always visible (even with keyboard)

### For Navigation:
- [ ] Bottom tabs for main sections (not hamburger menu)
- [ ] Stack navigation for drill-down
- [ ] Modals for temporary flows
- [ ] Back button/gesture always works

### For Lists/Content:
- [ ] FlatList for dynamic lists (not ScrollView with .map)
- [ ] Horizontal ScrollView for carousels
- [ ] Pull-to-refresh for feeds
- [ ] Infinite scroll for long lists

### For Settings:
- [ ] Grouped into navigable sections (not one long list)
- [ ] Each section < 10 items
- [ ] Switches for toggles (not checkboxes)
- [ ] Native pickers for selects

---

## When to Break These Rules

**NEVER** - The "no vertical scroll forms" rule is absolute.

**Rarely** - If you have a genuinely unique use case, document WHY you're breaking the pattern.

**Always ask the user** - If you think a rule should be broken, ask first.

---

## Truth Disclaimer

These patterns represent mobile-first best practices. They are strongly recommended but adapt based on specific app requirements. When in doubt, **follow iOS Human Interface Guidelines and Android Material Design**.

---

## References

- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Android Material Design](https://material.io/design)
- [React Native Best Practices](https://reactnative.dev/docs/performance)

---

**Version**: 1.0
**Created**: 2026-01-10
**Authority**: Codex + Diablo Mobile Standards
