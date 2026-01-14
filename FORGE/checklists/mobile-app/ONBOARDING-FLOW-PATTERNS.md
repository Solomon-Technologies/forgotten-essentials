# Mobile Onboarding Flow Patterns

**Pattern Type**: Mobile Onboarding & Signup Flows
**Applies To**: Expo, React Native mobile apps
**Source Projects**: Morganna mobile, Auldrom, Skulptor.ai
**Created**: 2026-01-10
**Author**: Codex Agent

---

## Overview

Mobile app onboarding is a critical first-impression experience. This document defines proven patterns for splash screens, welcome flows, multi-step signup, and first-run experiences.

---

## The Complete Onboarding Journey

```
App Launch
    ↓
Splash Screen (1-2 seconds)
    ↓
┌─────────────────────────────────┐
│  First Time User?               │
├─────────────────────────────────┤
│ YES → Welcome Onboarding        │
│ NO  → Check Auth                │
└─────────────────────────────────┘
    ↓
Welcome Onboarding (3-5 screens, horizontal swipe)
    ↓
Sign Up (multi-step, NO vertical scroll)
    ↓
Optional: Permissions Requests
    ↓
Optional: Profile Setup
    ↓
Main App Experience
```

---

## 1. Splash Screen

### Purpose
- **Branding** (show logo while app loads)
- **Initialize** (load essential data)
- **Transition** (smooth entry to app)

### Duration
- **1-2 seconds maximum**
- Use for initial data loading only
- Too long = bad UX

### Implementation (Expo)

```tsx
// app.json configuration
{
  "expo": {
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    }
  }
}
```

```tsx
// app/_layout.tsx - Control when splash hides
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Load essential data
        await loadFonts();
        await checkAuthStatus();
        await initializeApp();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return <RootNavigator />;
}
```

### Best Practices
- ✅ Simple, clean logo
- ✅ Brand colors
- ✅ No animation (iOS guideline)
- ✅ Same aspect ratio as app
- ❌ Don't use as loading screen for long tasks

---

## 2. Welcome/Intro Onboarding

### Purpose
- **Explain value proposition** (why use this app?)
- **Show key features** (what can you do?)
- **Build trust** (social proof, testimonials)
- **Set expectations** (how app works)

### Pattern: Horizontal Swiper (3-5 screens)

```tsx
// app/onboarding.tsx
import Swiper from 'react-native-swiper';

export default function Onboarding() {
  const navigation = useNavigation();

  return (
    <Swiper
      loop={false}
      showsPagination
      dot={<View style={styles.dot} />}
      activeDot={<View style={styles.activeDot} />}
    >
      {/* Screen 1: Welcome + Value Prop */}
      <View style={styles.slide}>
        <Image source={require('./assets/welcome.png')} style={styles.image} />
        <Text style={styles.title}>Welcome to AppName</Text>
        <Text style={styles.subtitle}>
          Track your habits and reach your goals
        </Text>
      </View>

      {/* Screen 2: Feature 1 */}
      <View style={styles.slide}>
        <Image source={require('./assets/feature1.png')} style={styles.image} />
        <Text style={styles.title}>Track Daily Progress</Text>
        <Text style={styles.subtitle}>
          Build streaks and stay motivated
        </Text>
      </View>

      {/* Screen 3: Feature 2 */}
      <View style={styles.slide}>
        <Image source={require('./assets/feature2.png')} style={styles.image} />
        <Text style={styles.title}>Get Insights</Text>
        <Text style={styles.subtitle}>
          See patterns and celebrate wins
        </Text>
      </View>

      {/* Screen 4: CTA */}
      <View style={styles.slide}>
        <Image source={require('./assets/cta.png')} style={styles.image} />
        <Text style={styles.title}>Ready to Start?</Text>
        <Button
          title="Sign Up"
          onPress={() => navigation.navigate('SignUp')}
        />
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.link}>Already have an account? Sign In</Text>
        </TouchableOpacity>
      </View>
    </Swiper>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  dot: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: '#007AFF',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  link: {
    color: '#007AFF',
    marginTop: 20,
  },
});
```

### Best Practices
- ✅ **3-5 screens max** (don't overwhelm)
- ✅ **Clear pagination dots** (show progress)
- ✅ **Swipe gesture** (horizontal, not vertical scroll)
- ✅ **Skip button** (let users skip if they want)
- ✅ **Visual > Text** (images/icons communicate faster)
- ❌ **Don't auto-advance** (user controls pace)

---

## 3. Multi-Step Sign Up Flow ⚠️ CRITICAL

### The #1 Rule: NO VERTICAL SCROLLING

**Pattern**: Horizontal steps, each screen fits in viewport

```tsx
// app/(auth)/signup.tsx
import { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

export default function SignUpFlow() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
  });

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepEmailPassword step={step} formData={formData} setFormData={setFormData} onNext={() => setStep(2)} />;
      case 2:
        return <StepPersonalInfo step={step} formData={formData} setFormData={setFormData} onNext={() => setStep(3)} onBack={() => setStep(1)} />;
      case 3:
        return <StepConfirmation step={step} formData={formData} onSubmit={handleSignUp} onBack={() => setStep(2)} />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Progress Indicator */}
      <View style={styles.progressBar}>
        <Text>Step {step} of 3</Text>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${(step / 3) * 100}%` }]} />
        </View>
      </View>

      {renderStep()}
    </View>
  );
}

// Step 1: Email + Password
function StepEmailPassword({ step, formData, setFormData, onNext }) {
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Create Your Account</Text>
      <Text style={styles.stepSubtitle}>Step 1: Credentials</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password (min 8 characters)"
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        secureTextEntry
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Next"
          onPress={onNext}
          disabled={!formData.email || formData.password.length < 8}
        />
      </View>

      {/* Social Auth Alternative */}
      <View style={styles.divider}>
        <Text style={styles.dividerText}>or sign up with</Text>
      </View>

      <Button title="Continue with Apple" onPress={handleAppleSignIn} />
      <Button title="Continue with Google" onPress={handleGoogleSignIn} />
    </KeyboardAvoidingView>
  );
}

// Step 2: Personal Info
function StepPersonalInfo({ step, formData, setFormData, onNext, onBack }) {
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Tell Us About You</Text>
      <Text style={styles.stepSubtitle}>Step 2: Profile</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number (optional)"
        value={formData.phone}
        onChangeText={(text) => setFormData({ ...formData, phone: text })}
        keyboardType="phone-pad"
      />

      <View style={styles.buttonRow}>
        <Button title="Back" onPress={onBack} />
        <Button title="Next" onPress={onNext} disabled={!formData.name} />
      </View>
    </KeyboardAvoidingView>
  );
}

// Step 3: Confirmation
function StepConfirmation({ step, formData, onSubmit, onBack }) {
  return (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Review Your Info</Text>
      <Text style={styles.stepSubtitle}>Step 3: Confirm</Text>

      <View style={styles.reviewSection}>
        <Text style={styles.label}>Email:</Text>
        <Text>{formData.email}</Text>
      </View>

      <View style={styles.reviewSection}>
        <Text style={styles.label}>Name:</Text>
        <Text>{formData.name}</Text>
      </View>

      {formData.phone && (
        <View style={styles.reviewSection}>
          <Text style={styles.label}>Phone:</Text>
          <Text>{formData.phone}</Text>
        </View>
      )}

      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          By signing up, you agree to our{' '}
          <Text style={styles.link}>Terms of Service</Text> and{' '}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </View>

      <View style={styles.buttonRow}>
        <Button title="Back" onPress={onBack} />
        <Button title="Create Account" onPress={onSubmit} />
      </View>
    </View>
  );
}
```

### Sign Up Flow Best Practices

- ✅ **Max 3-5 steps** (don't overwhelm new users)
- ✅ **3-5 fields per step** (all fit in viewport)
- ✅ **Progress indicator** (visual + text: "Step 2 of 4")
- ✅ **Back button** on every step except first
- ✅ **Validation per step** (can't proceed with errors)
- ✅ **Social auth alternative** (Apple Sign-In REQUIRED on iOS if offering social)
- ✅ **KeyboardAvoidingView** (submit button stays visible)
- ❌ **Never use vertical ScrollView** for signup

---

## 4. Permission Requests

### Pattern: Request In Context, Not All at Once

```tsx
// DON'T: Request all permissions upfront
❌ <PermissionScreen>
     <Text>We need access to:</Text>
     <Text>• Camera</Text>
     <Text>• Location</Text>
     <Text>• Notifications</Text>
     <Text>• Contacts</Text>
     <Button title="Allow All" />
   </PermissionScreen>

// DO: Request when needed
✅ When user taps "Take Photo" → Request camera permission
✅ When user enables location feature → Request location permission
✅ After signup → Request notification permission (with value prop)
```

### Notification Permission Pattern

```tsx
// After signup, before entering app
function NotificationPermissionScreen() {
  const navigation = useNavigation();

  const requestPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status === 'granted') {
      // Get push token and store in backend
      const token = await Notifications.getExpoPushTokenAsync();
      await savePushToken(token);
    }
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <Icon name="bell" size={80} color="#007AFF" />
      <Text style={styles.title}>Stay Updated</Text>
      <Text style={styles.subtitle}>
        Get notified about important updates and new features
      </Text>
      <Button title="Enable Notifications" onPress={requestPermission} />
      <TouchableOpacity onPress={() => navigation.navigate('Main')}>
        <Text style={styles.skip}>Skip for now</Text>
      </TouchableOpacity>
    </View>
  );
}
```

### Permission Best Practices

- ✅ **Explain why** before requesting
- ✅ **Allow skip** (except critical permissions)
- ✅ **Request in context** (when feature is used)
- ✅ **Handle denial gracefully** (link to settings if needed)
- ❌ **Don't request all at once** (overwhelming)

---

## 5. Profile Setup (Optional)

### When to Include
- **Avatar upload** (if profiles are key)
- **Preferences** (theme, interests)
- **Goals** (for habit/productivity apps)

### Pattern: Optional, Skippable

```tsx
function ProfileSetup() {
  const navigation = useNavigation();
  const [avatar, setAvatar] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Up Your Profile</Text>

      <TouchableOpacity onPress={pickImage}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Icon name="camera" size={40} />
          </View>
        )}
      </TouchableOpacity>

      <Button title="Save & Continue" onPress={handleSave} />
      <TouchableOpacity onPress={() => navigation.navigate('Main')}>
        <Text style={styles.skip}>Skip for now</Text>
      </TouchableOpacity>
    </View>
  );
}
```

---

## 6. Onboarding State Management

### Track Onboarding Completion

```tsx
// lib/onboarding.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function hasCompletedOnboarding(): Promise<boolean> {
  const value = await AsyncStorage.getItem('onboarding_complete');
  return value === 'true';
}

export async function markOnboardingComplete(): Promise<void> {
  await AsyncStorage.setItem('onboarding_complete', 'true');
}

export async function resetOnboarding(): Promise<void> {
  await AsyncStorage.removeItem('onboarding_complete');
}
```

### Root Navigation Logic

```tsx
// app/_layout.tsx
export default function RootLayout() {
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkStatus() {
      const onboarded = await hasCompletedOnboarding();
      const authed = await checkAuthStatus();
      setIsOnboarded(onboarded);
      setIsAuthenticated(authed);
    }
    checkStatus();
  }, []);

  if (isOnboarded === null || isAuthenticated === null) {
    return <SplashScreen />;
  }

  if (!isOnboarded) {
    return <OnboardingNavigator />;
  }

  if (!isAuthenticated) {
    return <AuthNavigator />;
  }

  return <MainAppNavigator />;
}
```

---

## Complete Onboarding Checklist

### Splash Screen
- [ ] Brand logo displayed
- [ ] 1-2 seconds max duration
- [ ] Smooth transition to next screen

### Welcome Onboarding
- [ ] 3-5 screens (horizontal swipe)
- [ ] Clear value proposition
- [ ] Key features explained
- [ ] Skip button available
- [ ] CTA to sign up

### Sign Up Flow
- [ ] **Multi-step (NO vertical scroll)**
- [ ] Progress indicator visible
- [ ] 3-5 fields per step
- [ ] Back/Next navigation
- [ ] Social auth options (Apple Sign-In REQUIRED on iOS)
- [ ] KeyboardAvoidingView used
- [ ] Terms & Privacy links

### Permissions
- [ ] Requested in context (not all upfront)
- [ ] Clear explanation of why
- [ ] Allow skip (where appropriate)
- [ ] Handle denial gracefully

### Profile Setup
- [ ] Optional/skippable
- [ ] Avatar upload (optional)
- [ ] Preferences (optional)

### State Management
- [ ] Onboarding completion tracked
- [ ] Auth state tracked
- [ ] Proper routing logic

---

## Common Mistakes to Avoid

❌ **Long vertical scrolling onboarding** (use horizontal swipe)
❌ **Vertical scrolling signup** (use multi-step)
❌ **Too many onboarding screens** (max 5)
❌ **Requesting all permissions upfront** (request in context)
❌ **Forcing profile setup** (make it optional)
❌ **Auto-advancing slides** (user controls pace)
❌ **No progress indicators** (user should know where they are)
❌ **Submit button hidden by keyboard** (use KeyboardAvoidingView)

---

## Example Flow Diagram

```
┌──────────────────┐
│  Splash Screen   │ (1-2 sec)
└────────┬─────────┘
         │
         ↓
┌──────────────────┐
│ First Time User? │
└────┬─────────┬───┘
     │         │
    YES       NO
     │         │
     ↓         ↓
┌────────┐  ┌─────────┐
│Welcome │  │ Sign In │
│Swiper  │  └─────────┘
│(3-5)   │       │
└────┬───┘       ↓
     │      ┌─────────┐
     ↓      │  Main   │
┌────────┐  │   App   │
│Sign Up │  └─────────┘
│Multi   │
│Step    │
│(3-4)   │
└────┬───┘
     │
     ↓
┌──────────────┐
│Notification  │
│Permission    │
└──────┬───────┘
       │
       ↓
┌──────────────┐
│Profile Setup │
│(Optional)    │
└──────┬───────┘
       │
       ↓
┌──────────────┐
│  Main App    │
└──────────────┘
```

---

**Version**: 1.0
**Created**: 2026-01-10
**Authority**: Codex Mobile Patterns
