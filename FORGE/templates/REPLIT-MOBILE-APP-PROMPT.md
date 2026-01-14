# REPLIT MOBILE APP DESIGN PROMPT

**Purpose**: Copy-paste prompt template for Replit Agent to generate production-ready React Native/Expo mobile apps

---

## HOW TO USE THIS TEMPLATE

1. Copy the entire prompt below
2. Paste into Replit Agent
3. Customize the `[VARIABLES]` sections for your specific app
4. Let Replit Agent generate the app
5. Test with Expo Go on your phone

---

## PROMPT TEMPLATE (COPY BELOW)

```
Create a complete mobile application using Expo + React Native + TypeScript with the following specifications:

## APP IDENTITY

**App Name**: [YOUR APP NAME]
**App Type**: [e.g., "Social network", "E-commerce", "Productivity", "Entertainment", "Marketplace"]
**Design Style**: [e.g., "Modern minimal", "Bold and vibrant", "Clean professional", "Playful and friendly"]
**Target Audience**: [e.g., "Gen-Z social users", "Busy professionals", "Creative freelancers"]
**Core Purpose**: [One sentence describing what the app does]

## COLOR PALETTE

**Primary Colors:**
- Primary: [#6366F1] (main brand color)
- Secondary: [#8B5CF6] (accent color)
- Background: [#FFFFFF]
- Surface: [#F9FAFB] (cards, elevated surfaces)
- Text Primary: [#111827]
- Text Secondary: [#6B7280]

**Semantic Colors:**
- Success: [#10B981]
- Error: [#EF4444]
- Warning: [#F59E0B]
- Info: [#3B82F6]

**Dark Mode** (optional):
- Background: [#111827]
- Surface: [#1F2937]
- Text Primary: [#F9FAFB]
- Text Secondary: [#9CA3AF]

## TYPOGRAPHY

**Font Stack:**
- Headings: [e.g., "Inter", "SF Pro", "Roboto"]
- Body: [e.g., "Inter", "SF Pro", "Roboto"]
- Mono: [e.g., "SF Mono", "Roboto Mono"]

**Font Sizes:**
- Display: 32px
- H1: 28px
- H2: 24px
- H3: 20px
- H4: 18px
- Body Large: 16px
- Body: 14px
- Caption: 12px
- Small: 10px

**Font Weights:**
- Light: 300
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700
- Black: 900

## DESIGN SYSTEM

**Spacing Scale:**
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px

**Border Radius:**
- sm: 4px
- md: 8px
- lg: 12px
- xl: 16px
- 2xl: 24px
- full: 9999px

**Shadows:**
- sm: Small drop shadow
- md: Medium drop shadow
- lg: Large drop shadow
- none: No shadow

**Animations:**
- Duration: 200-300ms
- Easing: ease-in-out
- Gestures: Smooth spring animations

## REQUIRED SCREENS (30+ SCREENS)

### 1. ONBOARDING FLOW (5 screens)

**1.1 Splash Screen** (`/splash`)
- App logo (animated)
- Brand name
- Loading indicator
- Version number (bottom)

**1.2 Welcome Screen** (`/welcome`)
- Hero image/illustration
- App tagline
- "Get Started" button
- "Sign In" link

**1.3 Intro Slides** (`/intro/:index`)
- 3-4 slides explaining app features
- Illustrations for each feature
- Skip button (top-right)
- Next/Done buttons
- Pagination dots

**1.4 Permissions Screen** (`/permissions`)
- List of required permissions:
  - Camera (if needed)
  - Location (if needed)
  - Notifications (if needed)
  - Photos (if needed)
- Enable/skip options
- Explanation for each permission

**1.5 Tutorial/First-Time Setup** (`/tutorial`)
- Interactive walkthrough
- Highlight key features
- Quick tips
- "Start Using App" button

### 2. AUTHENTICATION FLOW (7 screens)

**2.1 Login** (`/login`)
- Email/phone input
- Password input
- "Forgot Password" link
- "Sign In" button
- Divider with "OR"
- Social login buttons (Google, Apple, Facebook)
- "Don't have an account? Sign Up" link

**2.2 Register** (`/register`)
- Full name input
- Email input
- Phone number input (optional)
- Password input
- Password confirmation
- Terms & Privacy checkbox
- "Create Account" button
- "Already have account? Sign In" link

**2.3 Forgot Password** (`/forgot-password`)
- Email/phone input
- "Send Reset Code" button
- Back to login link

**2.4 OTP Verification** (`/verify-otp`)
- 6-digit code input
- Resend code timer
- "Verify" button
- Edit phone number link

**2.5 Reset Password** (`/reset-password`)
- New password input
- Confirm password input
- Password strength indicator
- "Reset Password" button

**2.6 Biometric Setup** (`/biometric-setup`)
- Face ID / Touch ID icon
- Enable biometric prompt
- Skip option
- Privacy explanation

**2.7 Profile Setup** (`/profile-setup`)
- Profile photo upload
- Username input
- Bio/description (optional)
- Interests/preferences selection
- "Complete Setup" button

### 3. MAIN APP SCREENS (15+ screens)

**3.1 Home/Dashboard** (`/home`)
- Header with logo, notifications, profile
- Hero section or main content
- Quick actions grid
- Recent activity feed
- Pull-to-refresh
- Bottom tab navigation

**3.2 Search/Discovery** (`/search`)
- Search bar with filters
- Trending/popular section
- Recent searches
- Search results (grid or list)
- Filter drawer
- Sort options

**3.3 Feed/Timeline** (`/feed`)
- Infinite scroll posts
- Like/comment/share actions
- Pull-to-refresh
- Create post FAB (floating action button)
- Story circles at top (optional)

**3.4 Explore/Browse** (`/explore`)
- Category grid
- Featured items carousel
- Recommendations
- Filters
- Sort options

**3.5 Detail/Item View** (`/item/:id`)
- Image gallery (swipeable)
- Title and description
- Key information
- Action buttons (Buy, Save, Share)
- Reviews/ratings section
- Related items
- Comments section

**3.6 Profile** (`/profile`)
- Profile header (photo, name, bio)
- Stats (followers, following, posts)
- Edit profile button
- Tab navigation (Posts, About, Activity)
- Settings icon

**3.7 Edit Profile** (`/profile/edit`)
- Profile photo change
- Cover photo change (optional)
- Name input
- Username input
- Bio input
- Website/social links
- Privacy settings
- "Save Changes" button

**3.8 Settings** (`/settings`)
- Account settings section
- Notification settings
- Privacy settings
- Appearance (theme toggle)
- Language selection
- About/Help section
- Logout button

**3.9 Notifications** (`/notifications`)
- Tab navigation (All, Mentions, Likes, etc.)
- Notification cards
- Mark as read
- Pull-to-refresh
- Empty state

**3.10 Messages/Chat** (`/messages`)
- Conversation list
- Unread badge
- Search conversations
- New message FAB

**3.11 Chat Conversation** (`/messages/:id`)
- Message bubbles
- Input bar at bottom
- Send button
- Attachment button (camera, photos, location)
- User status (online, typing)
- Scroll to bottom button

**3.12 Create/Add** (`/create`)
- Photo/video picker
- Text input
- Caption/description
- Tags/mentions
- Privacy settings
- Location tagging
- "Post/Publish" button

**3.13 Favorites/Saved** (`/favorites`)
- Grid or list of saved items
- Filter options
- Remove from favorites
- Empty state

**3.14 Activity/History** (`/activity`)
- Timeline of user actions
- Filter by date
- Activity types filter
- Clear history option

**3.15 Help/Support** (`/support`)
- FAQ accordion
- Contact form
- Live chat (optional)
- App version
- Terms & Privacy links

### 4. ADDITIONAL SCREENS (10+ screens)

**4.1 Categories** (`/categories`)
- Category grid with icons
- Count per category
- Trending indicator

**4.2 Category Detail** (`/categories/:id`)
- Filtered items by category
- Sort options
- Subcategories

**4.3 User Profile (Other)** (`/user/:id`)
- User info
- Follow/Unfollow button
- User's content
- Block/Report options

**4.4 Following/Followers** (`/followers` or `/following`)
- User list
- Follow/Unfollow buttons
- Search users

**4.5 Bookmarks/Collections** (`/collections`)
- User-created collections
- Create new collection
- Edit/Delete collections

**4.6 Reviews** (`/reviews/:itemId`)
- Rating distribution chart
- Review list
- Filter by rating
- Write review button

**4.7 Write Review** (`/reviews/create/:itemId`)
- Star rating selector
- Review text input
- Photo upload
- Submit button

**4.8 Privacy Settings** (`/settings/privacy`)
- Account privacy (public/private)
- Blocked users
- Muted users
- Activity status visibility

**4.9 Notification Settings** (`/settings/notifications`)
- Push notification toggles
- Email notification toggles
- Notification categories

**4.10 About** (`/about`)
- App description
- Version number
- Credits
- Terms of Service
- Privacy Policy
- Licenses

**4.11 Terms & Privacy** (`/terms` or `/privacy`)
- Scrollable legal text
- Accept button (if first time)

**4.12 Blocked/Reported** (`/blocked`)
- List of blocked users
- Unblock button

### 5. ERROR & UTILITY SCREENS (3 screens)

**5.1 No Internet** (`/offline`)
- Offline illustration
- "No Internet Connection" message
- "Retry" button

**5.2 Error Screen** (`/error`)
- Error illustration
- Error message
- "Go Home" button
- "Try Again" button

**5.3 Maintenance** (`/maintenance`)
- Maintenance illustration
- "We'll be back soon" message
- Estimated time (if available)

## NAVIGATION STRUCTURE

### Bottom Tab Navigation (Main)
```
┌─────────────────────────────────────┐
│ [Home]  [Search]  [Add]  [Activity]  [Profile] │
└─────────────────────────────────────┘
```

Tabs:
1. **Home** - Main feed/dashboard
2. **Search** - Search/discovery
3. **Add** - Create new content (center, highlighted)
4. **Activity** - Notifications/activity feed
5. **Profile** - User profile

### Stack Navigation (Nested)
- Each tab has its own stack
- Modal screens overlay the entire app
- Authentication screens are separate stack

### Drawer Navigation (Optional)
- Slide-in from left
- User profile section at top
- Menu items:
  - Settings
  - Help & Support
  - Invite Friends
  - About
  - Logout

## MOBILE-SPECIFIC FEATURES

### Gestures
- **Swipe** - Navigate between tabs, dismiss modals
- **Pull to refresh** - Refresh content
- **Long press** - Context menus, preview
- **Pinch to zoom** - Image galleries
- **Swipe left/right** - Delete items, archive

### Animations
- **Page transitions** - Slide, fade, scale
- **Loading states** - Skeleton screens, shimmer effect
- **Success feedback** - Checkmark animation
- **Error shake** - Input validation errors
- **Spring animations** - Button presses, modal opens

### Native Features
- **Camera** - Take photos/videos
- **Photo Library** - Select from gallery
- **Location** - Get user location
- **Notifications** - Push notifications
- **Haptic Feedback** - Button presses, actions
- **Share** - Native share sheet
- **Biometrics** - Face ID, Touch ID
- **Deep Linking** - Handle app links
- **App State** - Handle background/foreground

### Offline Support
- **Local Storage** - AsyncStorage for offline data
- **Queue Actions** - Sync when online
- **Offline Indicator** - Show connection status
- **Cached Images** - Cache network images

## COMPONENT REQUIREMENTS

### Core Components

**1. Button**
- Primary, Secondary, Outline, Text variants
- Sizes: sm, md, lg
- Loading state
- Disabled state
- Icon support

**2. Input Field**
- Text, Email, Password, Number types
- Label, placeholder, helper text
- Error state with message
- Success state
- Icon support (left/right)
- Clear button

**3. Card**
- Elevated or flat
- Header, body, footer
- Image support
- Action buttons

**4. Modal/Bottom Sheet**
- Full screen or partial
- Swipe to dismiss
- Backdrop blur
- Custom content

**5. List Item**
- Avatar, title, subtitle
- Right actions (chevron, switch, etc.)
- Dividers
- Press/long-press actions

**6. Avatar**
- Sizes: xs, sm, md, lg, xl
- Image or initials
- Status indicator (online, offline)
- Badge support

**7. Badge**
- Number badge
- Dot badge
- Colors: primary, success, error, warning

**8. Alert/Toast**
- Success, Error, Warning, Info types
- Auto-dismiss timer
- Action button support
- Swipe to dismiss

**9. Loading**
- Spinner
- Skeleton screens
- Shimmer effect
- Progress bar

**10. Empty State**
- Illustration/icon
- Title and description
- Call-to-action button

## EXPO CONFIGURATION

### app.json Settings

```json
{
  "expo": {
    "name": "[APP_NAME]",
    "slug": "[app-slug]",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.[company].[appname]",
      "infoPlist": {
        "NSCameraUsageDescription": "This app uses the camera to...",
        "NSPhotoLibraryUsageDescription": "This app accesses your photos to...",
        "NSLocationWhenInUseUsageDescription": "This app uses your location to..."
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.[company].[appname]",
      "permissions": [
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
        "ACCESS_FINE_LOCATION"
      ]
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-notifications",
        {
          "icon": "./assets/notification-icon.png",
          "color": "#ffffff"
        }
      ]
    ],
    "scheme": "[app-scheme]",
    "extra": {
      "router": {
        "origin": false
      }
    }
  }
}
```

### Required Assets

Place in `assets/`:
- `icon.png` - 1024x1024 app icon
- `adaptive-icon.png` - 1024x1024 (Android)
- `splash.png` - 2048x2048 splash screen
- `notification-icon.png` - 96x96 notification icon
- `favicon.png` - 48x48 favicon

## MOCK DATA REQUIREMENTS

### User Data
```typescript
interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  followerCount: number;
  followingCount: number;
  isFollowing?: boolean;
  isVerified?: boolean;
}
```

Create 20-50 mock users with realistic:
- Usernames
- Names
- Avatars (use placeholder services)
- Bios
- Varied follower counts

### Content/Posts Data
```typescript
interface Post {
  id: string;
  userId: string;
  content: string;
  images?: string[];
  likeCount: number;
  commentCount: number;
  shareCount: number;
  isLiked?: boolean;
  isSaved?: boolean;
  createdAt: Date;
}
```

Create 50-100 mock posts with:
- Varied content
- Mix of text-only and with images
- Different engagement levels
- Various timestamps

### Categories/Tags
```typescript
interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  color?: string;
}
```

Create 10-20 categories relevant to your app

## TECHNICAL REQUIREMENTS

### Framework & Tools
- **Expo SDK 51+**
- **React Native**
- **TypeScript** (strict mode)
- **Expo Router** (file-based routing)

### State Management
- **Zustand** or **React Context** for global state
- **TanStack Query** for server state (optional)
- **AsyncStorage** for local persistence

### UI Libraries
- **React Native Paper** or **NativeBase** (optional)
- **React Native Reanimated** for animations
- **React Native Gesture Handler** for gestures
- **Expo Vector Icons** for icons

### Code Quality
- TypeScript strict mode
- Proper type definitions
- Component composition
- Reusable components
- Custom hooks for logic

### Performance
- Lazy load images
- Virtualized lists (FlatList, SectionList)
- Memoization (React.memo, useMemo, useCallback)
- Optimized re-renders
- Image caching

### Accessibility
- Screen reader support (accessibilityLabel)
- Accessible touch targets (min 44x44)
- Color contrast ≥ 4.5:1
- Focus management
- Keyboard navigation (web)

## FILE STRUCTURE

```
/
├── app/                          # Expo Router screens
│   ├── (auth)/                   # Auth group
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── ...
│   ├── (tabs)/                   # Bottom tabs
│   │   ├── home.tsx
│   │   ├── search.tsx
│   │   ├── create.tsx
│   │   ├── activity.tsx
│   │   └── profile.tsx
│   ├── (modals)/                 # Modal screens
│   │   ├── settings.tsx
│   │   └── ...
│   ├── item/
│   │   └── [id].tsx              # Dynamic route
│   ├── _layout.tsx               # Root layout
│   └── index.tsx                 # Entry point
├── components/
│   ├── ui/                       # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── ...
│   ├── PostCard.tsx
│   ├── UserAvatar.tsx
│   └── ...
├── hooks/
│   ├── useAuth.tsx
│   ├── useUser.tsx
│   └── ...
├── lib/
│   ├── api.ts                    # API functions
│   ├── storage.ts                # AsyncStorage helpers
│   └── utils.ts
├── store/
│   ├── authStore.ts              # Zustand stores
│   └── userStore.ts
├── data/
│   ├── users.ts                  # Mock data
│   ├── posts.ts
│   └── ...
├── constants/
│   ├── Colors.ts
│   ├── Fonts.ts
│   └── Layout.ts
├── types/
│   └── index.ts                  # TypeScript types
├── assets/
│   ├── icon.png
│   ├── splash.png
│   ├── images/
│   └── fonts/
├── app.json
├── package.json
├── tsconfig.json
└── README.md
```

## DESIGN INSPIRATION KEYWORDS

**For Replit Agent to reference:**
[e.g., "iOS native", "Material Design", "Glassmorphism", "Neumorphism", "Minimalist", "Vibrant", "Dark mode first", "Playful"]

## SPECIAL FEATURES (SELECT AS NEEDED)

- [ ] Dark mode support
- [ ] Multi-language support (i18n)
- [ ] Offline mode with sync
- [ ] Camera integration
- [ ] Photo/video upload
- [ ] Location services
- [ ] Maps integration
- [ ] Push notifications
- [ ] In-app purchases
- [ ] Social sharing
- [ ] QR code scanner
- [ ] Biometric authentication
- [ ] Audio/video playback
- [ ] Real-time updates (WebSockets)
- [ ] Deep linking
- [ ] Analytics integration

## CODE QUALITY & BEST PRACTICES

**For production-ready code:**

1. **TypeScript strict mode** - Catch errors early
2. **Component composition** - Small, focused components
3. **Custom hooks** - Extract reusable logic
4. **Error boundaries** - Graceful error handling
5. **Loading states** - Skeleton screens, not spinners
6. **Optimistic updates** - Better UX
7. **Accessibility** - Screen reader support
8. **Performance** - Memoization, virtualization
9. **Clean imports** - Organized, no circular deps
10. **Consistent naming** - Follow conventions

---

## FINAL DELIVERABLE

A fully functional, polished mobile application that:
- ✅ Includes ALL required screens (30+ screens)
- ✅ Has complete onboarding flow (5 screens)
- ✅ Has authentication flow (7 screens)
- ✅ Works on iOS and Android
- ✅ Has proper navigation (bottom tabs, stack, modal)
- ✅ Includes all mobile-specific features (gestures, animations)
- ✅ Has realistic mock data
- ✅ Uses TypeScript properly
- ✅ Is accessible and performant
- ✅ Follows Expo/React Native best practices
- ✅ Has proper app.json configuration
- ✅ Includes loading, empty, and error states
- ✅ Is production-ready

Build this mobile app now.
```

---

**This prompt gives Replit Agent everything needed to build a production-ready, non-generic mobile app with proper depth and polish.**
