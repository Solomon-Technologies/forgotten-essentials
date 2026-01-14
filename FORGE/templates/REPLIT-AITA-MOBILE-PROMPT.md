# REPLIT AITA MOBILE APP PROMPT

**App**: AI The Arbitrage (AITA) Mobile
**Purpose**: AI tools directory, surveys, gamification, and community platform

---

## PROMPT TEMPLATE (COPY BELOW)

```
Create a mobile application for "AI The Arbitrage" (AITA) using Expo + React Native + TypeScript with the following specifications:

## APP IDENTITY

**App Name**: AI The Arbitrage (AITA)
**App Type**: AI Tools Directory + Survey Platform + Gamified Community
**Design Style**: Metallic professional with gold accents and dark mode
**Target Audience**: AI enthusiasts, early adopters, tech professionals, entrepreneurs
**Core Purpose**: Discover 2100+ AI tools, complete surveys for points, earn rewards, connect with AI community

## COLOR PALETTE

**AITA Brand Colors:**
- Primary Gold: #BE9E66 (metallic gold)
- Background Dark: #0A0A0A (deep black)
- Background Light: #1A1A1A (card surfaces)
- Surface Elevated: #242424 (elevated cards)
- Text Primary: #FFFFFF
- Text Secondary: #A0A0A0
- Accent Success: #10B981 (points earned)
- Accent Warning: #F59E0B (limited offers)
- Border Subtle: #2A2A2A

**Gradient Accents:**
- Gold Gradient: linear-gradient(135deg, #D4AF37 0%, #BE9E66 100%)
- Metallic Shimmer: linear-gradient(90deg, #888 0%, #FFF 50%, #888 100%)

## TYPOGRAPHY

**Fonts:**
- Headings: Montserrat (Bold, Black)
- Body: Inter (Regular, Medium)
- Mono: SF Mono (for points, stats)

**Font Sizes:**
- Display: 32px (app name, hero titles)
- H1: 28px
- H2: 24px
- H3: 20px
- Body Large: 16px
- Body: 14px
- Caption: 12px
- Small: 10px

## DESIGN SYSTEM

**Metallic Components:**
- Buttons: Metallic gradient with gold shine effect
- Cards: Dark elevated surfaces with subtle gold border on hover
- Badges: Gold metallic with shimmer animation
- Progress Bars: Gold fill with glow effect

**Spacing:**
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px

**Border Radius:**
- Buttons: 8px (slightly rounded metallic look)
- Cards: 12px
- Badges: 16px (pill shape)

**Shadows:**
- Gold glow: 0 4px 20px rgba(190, 158, 102, 0.3)
- Elevated: 0 8px 32px rgba(0, 0, 0, 0.5)

## REQUIRED SCREENS (35+ SCREENS)

### 1. ONBOARDING FLOW (6 screens)

**1.1 Splash Screen** (`/splash`)
- AITA logo with gold shimmer animation
- "AI The Arbitrage" text fade-in
- Loading bar with gold progress

**1.2 Welcome Screen** (`/welcome`)
- Hero: "Discover 2100+ AI Tools"
- Subtext: "Complete surveys. Earn points. Get rewards."
- "Get Started" metallic button
- "Sign In" link

**1.3 Intro Slide 1** (`/intro/1`)
- Illustration: AI tools directory
- Title: "Largest AI Tools Directory"
- Description: "Browse, compare, and discover 2100+ AI tools across every category"
- Gold "Next" button

**1.4 Intro Slide 2** (`/intro/2`)
- Illustration: Survey completion
- Title: "Get Paid for Your Opinion"
- Description: "Complete surveys about AI tools and earn points instantly"

**1.5 Intro Slide 3** (`/intro/3`)
- Illustration: Points dashboard
- Title: "Redeem Rewards"
- Description: "Use points for premium features, discounts, and exclusive content"

**1.6 Permissions** (`/permissions`)
- Notifications (for survey alerts, point updates)
- Camera (for profile photo, tool screenshots)
- Optional: Location (for local AI events)

### 2. AUTHENTICATION (7 screens)

**2.1 Login** (`/login`)
- Email input
- Password input
- "Forgot Password?" link
- Gold "Sign In" button
- Social login: Google, Apple, LinkedIn
- "Create Account" link

**2.2 Register** (`/register`)
- Full name
- Email
- Password (with strength indicator)
- "I agree to earn points by completing surveys" checkbox
- Terms & Privacy links
- Gold "Create Account" button

**2.3 Email Verification** (`/verify-email`)
- "Check your email" message
- Resend code timer
- 6-digit OTP input
- "Verify" button

**2.4 Profile Setup** (`/onboarding/profile`)
- Profile photo upload
- Username
- Bio (optional)
- "AI Interests" multi-select (GPT, Image Gen, Coding, etc.)
- "Finish Setup" button

**2.5 Survey Preferences** (`/onboarding/preferences`)
- "How often do you want surveys?" (Daily, Weekly, Monthly)
- "What topics interest you?" (checkboxes)
- Survey notification time preference
- "Save & Continue" button

**2.6 First Points Bonus** (`/onboarding/bonus`)
- Animated confetti
- "+100 Points" display with gold shine
- "Welcome Bonus Unlocked!"
- Current point balance
- "Start Exploring" button

**2.7 Tutorial** (`/tutorial`)
- Interactive walkthrough
- Highlight: AI tools directory
- Highlight: Survey notification
- Highlight: Points dashboard
- "Got It" button

### 3. MAIN APP SCREENS (20 screens)

**3.1 Home/Dashboard** (`/(tabs)/home`)
- Header: AITA logo, points balance (top-right), notifications bell
- Hero card: "Featured AI Tool of the Day" (swipeable carousel)
- "Quick Actions" grid:
  - Take Survey
  - Browse Tools
  - Check Points
  - Leaderboard
- "Recent Activity" feed
- "Trending Tools" horizontal scroll
- Bottom tab navigation

**3.2 AI Tools Directory** (`/(tabs)/explore`)
- Search bar with filters (Category, Free/Paid, Trending)
- Category pills (scroll horizontal): All, GPT, Image, Video, Code, Audio, etc.
- Tool cards (vertical scroll):
  - Tool logo
  - Tool name
  - Category badge
  - Rating (stars)
  - "Featured" badge (if sponsored)
  - Quick "Add to Favorites" heart icon
- Sort dropdown (Trending, A-Z, Newest, Highest Rated)
- Filter drawer (Price, Category, Features)

**3.3 Tool Detail** (`/tool/[id]`)
- Tool hero image/logo
- Tool name + category
- Rating + review count
- "Visit Website" button (opens in-app browser)
- "Add to Favorites" button
- Description
- Key features (bullets)
- Pricing tiers (if applicable)
- Screenshots carousel
- User reviews section
- "Submit Review" button
- "Similar Tools" section

**3.4 Surveys** (`/(tabs)/surveys`)
- "Available Surveys" tab
- Survey cards:
  - Survey title
  - Points reward (gold badge)
  - Estimated time
  - Expiration date
  - "Start Survey" button
- "Completed Surveys" tab (history)
- "Pending Rewards" indicator
- Filter: All, New, Expiring Soon

**3.5 Take Survey** (`/survey/[id]`)
- Progress bar at top
- Question counter (1 of 10)
- Question text
- Answer options (radio, checkboxes, text input, scale)
- "Next" button (gold)
- "Previous" button
- "Save & Exit" option
- Completion screen:
  - Animated "+50 Points" (or variable amount)
  - Gold confetti
  - Updated point balance
  - "Done" button

**3.6 Points Dashboard** (`/(tabs)/points`)
- Large points balance (center, animated)
- "Earn More" button
- Points history (timeline):
  - Survey completed: +50 pts
  - Daily login: +10 pts
  - Referral: +100 pts
  - Etc.
- "Redeem Rewards" button
- Leaderboard preview (top 3 users)

**3.7 Rewards Store** (`/rewards`)
- Reward categories tabs: Features, Discounts, Physical Goods
- Reward cards:
  - Image
  - Name
  - Points cost
  - "Redeem" button (disabled if not enough points)
- "My Redeemed Rewards" link
- Points balance at top

**3.8 Redeem Reward** (`/rewards/[id]`)
- Reward image
- Name + description
- Points cost
- "Confirm Redemption" button
- Terms & conditions
- Success modal:
  - "Reward Unlocked!"
  - Instructions (code, download link, etc.)
  - Updated points balance

**3.9 Leaderboard** (`/leaderboard`)
- Tabs: Today, This Week, All-Time
- User ranking list:
  - Rank number
  - User avatar
  - Username
  - Points
  - "You" indicator (if user is in list)
- User's current rank (sticky at top if not in top 10)
- Rewards for top rankers (badges, bonus points)

**3.10 Profile** (`/(tabs)/profile`)
- Profile header:
  - Cover photo (optional)
  - Profile photo
  - Username
  - Bio
  - Points badge
  - Rank badge
- Stats row: Surveys Completed, Tools Reviewed, Referrals
- Tabs:
  - Activity (survey history, reviews)
  - Favorites (saved tools)
  - Achievements (badges earned)
- "Edit Profile" button
- "Settings" icon (top-right)

**3.11 Edit Profile** (`/profile/edit`)
- Profile photo change
- Cover photo change
- Username
- Bio
- Interests (multi-select pills)
- Privacy settings: Public/Private profile
- "Save Changes" button

**3.12 Settings** (`/settings`)
- **Account** section:
  - Email
  - Password
  - Linked accounts (Google, Apple, etc.)
- **Notifications** section:
  - Survey alerts
  - Point updates
  - Leaderboard updates
  - Newsletter
- **Preferences** section:
  - Survey frequency
  - Preferred topics
- **Appearance** section:
  - Dark mode (default on)
  - Theme customization
- **About** section:
  - App version
  - Terms of Service
  - Privacy Policy
  - Help & Support
- "Logout" button (bottom, red)

**3.13 Notifications** (`/notifications`)
- Tabs: All, Surveys, Points, Social
- Notification cards:
  - Icon (survey, points, user, etc.)
  - Title
  - Message
  - Time ago
  - Action button (if applicable)
- Mark all as read
- Clear all

**3.14 Search** (`/search`)
- Search bar (placeholder: "Search AI tools, surveys, users...")
- Recent searches
- Trending searches
- Search results (tools, surveys, users)
- Filters: Tools, Surveys, Users
- Empty state: "No results found"

**3.15 Community/Feed** (`/community`)
- User posts feed:
  - Tool reviews
  - Survey discussions
  - AI news shares
- Create post FAB
- Like, comment, share actions
- Filter: Following, Trending, Latest

**3.16 Create Post** (`/community/create`)
- Post type: Text, Tool Review, Survey Feedback
- Text input
- Attach tool (search)
- Photo upload (optional)
- Tags
- "Post" button

**3.17 User Profile (Other)** (`/user/[id]`)
- User info (avatar, username, bio, stats)
- Follow/Unfollow button
- User's posts
- User's reviews
- "Message" button (optional)

**3.18 Messages** (`/messages`)
- Conversation list
- Unread count badges
- Search conversations
- New message FAB

**3.19 Chat** (`/messages/[id]`)
- Message bubbles
- Input bar
- Send button
- Typing indicator

**3.20 Referrals** (`/referrals`)
- "Invite Friends" section
- Referral link (copy button)
- Share button (native share)
- Referral stats:
  - Total invites sent
  - Sign-ups from invites
  - Points earned from referrals
- Referral leaderboard

### 4. ADDITIONAL SCREENS (7 screens)

**4.1 Tool Reviews** (`/tool/[id]/reviews`)
- All reviews for tool
- Filter: Highest Rated, Recent, Verified
- Write review button
- Review cards (rating, text, user, date)

**4.2 Write Review** (`/tool/[id]/review`)
- Star rating (1-5)
- Review title
- Review text
- Photo upload (optional)
- Submit button
- "+25 Points for verified review" indicator

**4.3 Achievements** (`/achievements`)
- Achievement badges grid:
  - Locked (grayed out)
  - Unlocked (gold)
  - Progress bars for in-progress
- Achievement detail modal on tap

**4.4 Help & Support** (`/support`)
- FAQ accordion
- Contact form
- Live chat (optional)
- Report issue button

**4.5 About AITA** (`/about`)
- Mission statement
- "2100+ AI tools cataloged"
- "Join 1000+ users earning rewards"
- Team info (optional)
- Version number

**4.6 Terms of Service** (`/terms`)
- Scrollable legal text

**4.7 Privacy Policy** (`/privacy`)
- Scrollable legal text

### 5. ERROR & UTILITY SCREENS (3 screens)

**5.1 No Internet**
- Offline icon
- "No connection" message
- "Retry" button

**5.2 Error Screen**
- Error illustration
- Error message
- "Go Home" button

**5.3 Maintenance**
- "We're upgrading!" message
- Estimated downtime

## NAVIGATION STRUCTURE

### Bottom Tab Navigation

```
┌───────────────────────────────────────────────┐
│ [Home] [Explore] [Surveys] [Points] [Profile] │
└───────────────────────────────────────────────┘
```

1. **Home** - Dashboard with featured tools, quick actions
2. **Explore** - AI tools directory
3. **Surveys** - Available and completed surveys
4. **Points** - Points balance and history
5. **Profile** - User profile and settings

## AITA-SPECIFIC FEATURES

### Gamification System

**Points System:**
- Survey completion: +25 to +100 points (based on length)
- Daily login: +10 points
- Tool review: +25 points
- Referral sign-up: +100 points
- Streak bonuses: +50 points (7 days), +200 points (30 days)

**Achievements:**
- "Survey Master" - Complete 10 surveys
- "Tool Connoisseur" - Review 20 tools
- "Social Butterfly" - Refer 5 friends
- "Streak Warrior" - 30-day login streak
- "Community Leader" - Get 100 likes on posts

**Leaderboard:**
- Daily, weekly, all-time rankings
- Top 10 users displayed
- Rewards for top 3 (bonus points, badges)

### Survey Features

**Survey Types:**
- Multiple choice (single or multi-select)
- Scale rating (1-10)
- Text response
- Image selection
- Ranking (drag & drop)

**Survey Scheduling:**
- Push notification when new survey available
- Expiration timers
- "Save and continue later" functionality
- Survey history tracking

### Tool Directory Features

**Tool Data:**
```typescript
interface Tool {
  id: string;
  name: string;
  category: string;
  description: string;
  logo: string;
  website: string;
  pricing: 'Free' | 'Freemium' | 'Paid';
  rating: number;
  reviewCount: number;
  features: string[];
  screenshots: string[];
  isFeatured: boolean; // Sponsored tools
  isFavorited: boolean; // User saved
}
```

**Categories:**
- GPT & Language Models
- Image Generation
- Video Creation
- Code Assistants
- Audio & Music
- Productivity
- Marketing
- Design
- Data Analysis
- No-Code Tools

**Filters:**
- Free vs Paid
- By category
- By rating (4+ stars, etc.)
- Featured/Sponsored tools
- Recently added

### Reward Types

**Digital Rewards:**
- Premium AI tool access (1 month free trial)
- Survey boosters (2x points for 1 week)
- Profile customization (badges, themes)
- Ad-free experience
- Early access to new tools

**Physical Rewards:**
- AITA merchandise (t-shirts, stickers)
- Gift cards ($5, $10, $25, $50)
- AI courses/books

**Exclusive Rewards:**
- Beta tester access for new AI tools
- Virtual events with AI founders
- Community moderator role

## MOBILE-SPECIFIC FEATURES

### Gestures
- Swipe left/right: Navigate between surveys questions
- Swipe down: Refresh feeds
- Long press: Tool quick actions (favorite, share, review)
- Pinch zoom: Tool screenshots

### Animations
- Points earn animation: Gold coins flying to balance
- Survey completion: Confetti explosion
- Level up: Badge unlock animation
- Streak milestone: Fire animation

### Push Notifications

**Types:**
- New survey available (+50 pts)
- Survey expiring soon (2 hours left)
- Points reward unlocked
- Leaderboard position change
- Someone reviewed your favorite tool
- Referral signed up
- Weekly summary (surveys completed, points earned)

**Customization:**
- Frequency settings (immediate, daily digest, off)
- Notification categories (on/off per type)
- Quiet hours

### Offline Mode

**Cached Data:**
- Recent tool listings
- User's favorites
- Points balance (last known)
- Survey draft saves

**Offline Actions:**
- Browse cached tools
- Save tools to favorites (syncs when online)
- View points history
- Complete draft surveys (submits when online)

## COMPONENT REQUIREMENTS

### AITA-Specific Components

**1. Metallic Button**
- Gold gradient background
- Shimmer animation on press
- Haptic feedback
- Disabled state (grayed out)

**2. Points Badge**
- Gold circle with point value
- Animated when points change
- Glow effect
- Different sizes (sm, md, lg)

**3. Tool Card**
- Logo, name, category
- Rating stars
- "Featured" ribbon (if sponsored)
- Heart icon (favorite toggle)
- Tap to view details

**4. Survey Card**
- Title, estimated time, points reward
- Progress bar (if in-progress)
- Expiration countdown
- "Start" or "Continue" button

**5. Achievement Badge**
- Locked/unlocked states
- Progress ring (for in-progress achievements)
- Unlock animation
- Tooltip with description

**6. Leaderboard Item**
- Rank number (1st, 2nd, 3rd with gold/silver/bronze)
- User avatar
- Username
- Points
- "You" indicator

**7. Reward Card**
- Image, name, points cost
- "Redeem" button (enabled/disabled based on points)
- "Redeemed" badge (if already claimed)

## EXPO CONFIGURATION

### app.json

```json
{
  "expo": {
    "name": "AI The Arbitrage",
    "slug": "aita-mobile",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "dark",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#0A0A0A"
    },
    "ios": {
      "bundleIdentifier": "com.solomon.aita",
      "infoPlist": {
        "NSCameraUsageDescription": "Upload profile photos and tool screenshots",
        "NSPhotoLibraryUsageDescription": "Select photos for reviews and posts"
      }
    },
    "android": {
      "package": "com.solomon.aita",
      "permissions": [
        "CAMERA",
        "READ_EXTERNAL_STORAGE"
      ],
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#BE9E66"
      }
    },
    "plugins": [
      "expo-router",
      "expo-notifications"
    ],
    "scheme": "aita"
  }
}
```

## MOCK DATA

### Users (50 users)
- Varied usernames
- Point balances (100 - 50,000)
- Different ranks
- Profile photos (avatars)

### AI Tools (2100 tools)
- Realistic tool names
- Various categories
- Mix of free/freemium/paid
- Ratings 3.0 - 5.0
- Review counts 0 - 1000
- 10-20 featured/sponsored tools

### Surveys (30 surveys)
- Various topics (tool feedback, AI trends, user preferences)
- Points rewards: 25, 50, 75, 100
- Estimated times: 2min, 5min, 10min
- Expiration dates (some expiring soon)
- Question types: multiple choice, scale, text

### Rewards (20 rewards)
- Points costs: 500, 1000, 2500, 5000, 10000
- Categories: Digital, Physical, Exclusive
- Availability (limited quantity for some)

## TECHNICAL REQUIREMENTS

- **Expo SDK 51+**
- **React Native**
- **TypeScript** (strict mode)
- **Expo Router** (file-based routing)
- **Zustand** (global state: auth, points, favorites)
- **TanStack Query** (API data fetching)
- **AsyncStorage** (offline caching)
- **React Native Reanimated** (animations)
- **Expo Notifications** (push notifications)

## CODE QUALITY

- TypeScript strict mode
- Component composition
- Custom hooks (useAuth, usePoints, useSurveys)
- Error boundaries
- Loading states (skeleton screens)
- Accessibility (screen readers, touch targets ≥44px)

## FINAL DELIVERABLE

A production-ready AITA mobile app that:
- ✅ Includes all 35+ screens
- ✅ Has metallic gold design with dark mode
- ✅ Implements gamification (points, achievements, leaderboard)
- ✅ Has complete survey system
- ✅ Includes AI tools directory (2100+ tools)
- ✅ Has rewards store and redemption
- ✅ Supports push notifications
- ✅ Works offline with caching
- ✅ Has proper animations and gestures
- ✅ Is accessible and performant

Build this AITA mobile app now.
```

---

**This prompt gives Replit everything to build a polished AITA mobile app with all the gamification, surveys, and AI tools features.**
