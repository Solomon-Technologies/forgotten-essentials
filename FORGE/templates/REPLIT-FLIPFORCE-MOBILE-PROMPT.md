# REPLIT FLIPFORCE MOBILE APP PROMPT

**App**: FlipForce - Real Estate Wholesale Platform
**Purpose**: Property scanning, deal management, lead tracking, and wholesale tools for agents and investors

---

## PROMPT TEMPLATE (COPY BELOW)

```
Create a mobile application for "FlipForce" using Expo + React Native + TypeScript with the following specifications:

## APP IDENTITY

**App Name**: FlipForce
**App Type**: Real Estate Wholesale Platform & Deal Management Tool
**Design Style**: Professional real estate with bold accents and data-focused UI
**Target Audience**: Real estate wholesalers, agents, cash buyers, property investors
**Core Purpose**: Scan properties, analyze deals, manage leads, calculate offers, and close wholesale real estate transactions on the go

## COLOR PALETTE

**FlipForce Brand Colors:**
- Primary (Deep Blue): #1E3A8A
- Secondary (Success Green): #10B981
- Accent (Gold): #F59E0B
- Background Dark: #111827
- Background Light: #F9FAFB
- Surface Dark: #1F2937
- Surface Light: #FFFFFF
- Text Primary: #111827
- Text Secondary: #6B7280
- Success: #10B981 (profitable deals)
- Warning: #F59E0B (marginal deals)
- Error: #EF4444 (bad deals)

## TYPOGRAPHY

**Fonts:**
- Headings: "Inter" (Bold, Semibold) - professional, clean
- Body: "Inter" (Regular, Medium)
- Mono: "SF Mono" (for numbers, addresses, ARV, profit)

**Font Sizes:**
- Display: 32px (ARV, profit amounts)
- H1: 28px
- H2: 24px
- H3: 20px
- Body Large: 16px
- Body: 14px
- Caption: 12px

## DESIGN SYSTEM

**Professional Real Estate Aesthetic:**
- Clean cards with property images
- Data-focused tables (ARV, repairs, profit margins)
- Map integration (property locations)
- Calculator interfaces (Rehabinator, Offernator)
- Deal pipeline visualization
- Lead status indicators

**Spacing:**
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px

**Border Radius:**
- Buttons: 8px
- Cards: 12px
- Inputs: 8px

**Shadows:**
- Card: 0 4px 12px rgba(0, 0, 0, 0.1)
- Elevated: 0 8px 24px rgba(0, 0, 0, 0.15)

## REQUIRED SCREENS (40+ SCREENS)

### 1. ONBOARDING FLOW (6 screens)

**1.1 Splash Screen** (`/splash`)
- FlipForce logo
- "Wholesale Smarter" tagline
- Loading indicator

**1.2 Welcome Screen** (`/welcome`)
- Hero: "Find, Analyze, & Close Deals Faster"
- Subtext: "The all-in-one platform for real estate wholesalers"
- "Get Started" button
- "Sign In" link

**1.3 Intro Slide 1** (`/intro/1`)
- Illustration: Property scanner
- Title: "Scan Properties Instantly"
- Description: "Find distressed properties with our AI-powered scanner"

**1.4 Intro Slide 2** (`/intro/2`)
- Illustration: Calculator with profit display
- Title: "Calculate Offers in Seconds"
- Description: "Use Rehabinator and Offernator to analyze any deal"

**1.5 Intro Slide 3** (`/intro/3`)
- Illustration: Deal pipeline
- Title: "Manage Your Entire Pipeline"
- Description: "Track leads, deals, and closings all in one place"

**1.6 User Type Selection** (`/intro/user-type`)
- "I'm a..." selection:
  - Wholesaler/Agent
  - Cash Buyer/Investor
- Different onboarding paths based on selection

### 2. AUTHENTICATION (7 screens)

**2.1 Login** (`/login`)
- Email input
- Password input
- "Forgot Password?" link
- "Sign In" button
- "Create Account" link

**2.2 Register** (`/register`)
- Full name
- Email
- Password
- User type: Agent or Investor
- Company name (optional)
- Terms & Privacy checkbox
- "Create Account" button

**2.3 Email Verification** (`/verify-email`)
- 6-digit OTP input
- Resend code
- "Verify" button

**2.4 Profile Setup - Agent** (`/onboarding/agent-profile`)
- Company name
- License number (optional)
- Primary market (city/state)
- Years of experience
- Specialty (wholesale, fix-and-flip, rentals)
- "Continue" button

**2.5 Profile Setup - Investor** (`/onboarding/investor-profile`)
- Investment budget
- Preferred property types (SFR, multifamily, commercial)
- Target markets
- Cash availability
- "Submit for Approval" button (investors require approval)

**2.6 Subscription Selection** (`/onboarding/subscription`)
- Free plan (basic features)
- Premium plan ($49/mo):
  - Unlimited property scans
  - Advanced calculators
  - Lead management
  - Rapid Dialer
  - Flip AI assistant
- "Start Free Trial" or "Subscribe" button

**2.7 Tutorial** (`/tutorial`)
- How to scan a property
- How to use calculators
- How to manage leads
- How to track deals

### 3. MAIN APP SCREENS (25+ screens)

**3.1 Dashboard** (`/(tabs)/dashboard`)
- Header: FlipForce logo, notifications, profile
- Quick stats cards:
  - Active Deals (count)
  - Total ARV (sum)
  - Projected Profit (sum)
  - Leads This Month (count)
- "Quick Actions" grid:
  - Scan Property
  - New Lead
  - Rehabinator
  - Offernator
- Recent activity feed
- "Hot Deals" list (properties under contract)
- Bottom tab navigation

**3.2 Property Scanner** (`/(tabs)/scanner`)
- Camera integration (point at property address sign)
- Manual address input
- Map view (tap any property on map)
- Recent scans list
- "Scan Property" button
- Results:
  - Property photo (Google Street View API)
  - Address
  - Owner name
  - Estimated value
  - Last sale date/price
  - Tax assessment
  - Liens/foreclosure status
  - "Add to Leads" button
  - "Run Comps" button

**3.3 Property Detail** (`/property/[id]`)
- Property image carousel
- Address
- Owner info (name, phone if available)
- Property details:
  - Beds/baths
  - Sq ft
  - Lot size
  - Year built
  - Zoning
- Valuation:
  - Estimated market value
  - Tax assessed value
  - Last sale price/date
- Distressed indicators:
  - Foreclosure
  - Tax lien
  - Pre-foreclosure
  - Absentee owner
  - High equity
- Action buttons:
  - Call Owner
  - Add to Leads
  - Run Rehabinator
  - Run Offernator
  - Send Mailer
- Map (property location)
- Comparable sales (nearby sold properties)

**3.4 Leads** (`/(tabs)/leads`)
- Lead pipeline view:
  - New (count)
  - Contacted (count)
  - Qualified (count)
  - Offer Made (count)
  - Under Contract (count)
- Kanban board (drag & drop between stages)
- List view toggle
- Filter: All, Hot, Cold, Follow-up
- Search leads
- "+ New Lead" FAB

**3.5 Add/Edit Lead** (`/leads/add` or `/leads/[id]/edit`)
- Property address
- Owner name
- Owner phone
- Owner email (optional)
- Property type (SFR, multifamily, land, commercial)
- Lead source (driving for dollars, direct mail, cold call, referral)
- Lead status (new, contacted, qualified, etc.)
- Notes
- Follow-up date
- "Save Lead" button

**3.6 Lead Detail** (`/leads/[id]`)
- Lead info (address, owner, contact)
- Status badge
- Timeline (activity history)
- Action buttons:
  - Call
  - Text
  - Email
  - Schedule Follow-up
  - Move to Deals
- Notes section (add notes, view history)
- Attached documents (photos, contracts)
- Related property detail (if property scanned)

**3.7 Deals** (`/deals`)
- Active deals list
- Deal cards:
  - Property image
  - Address
  - Deal type (wholesale, fix-and-flip, rental)
  - ARV
  - Offer amount
  - Projected profit
  - Status (under contract, pending, closed)
- Filter: All, Wholesale, Fix-and-Flip, Rentals
- Sort: Newest, Highest Profit, Closing Soon

**3.8 Deal Detail** (`/deals/[id]`)
- Property summary
- Deal financials:
  - Purchase price
  - ARV
  - Repair estimate
  - Wholesale fee / Profit
  - ROI %
- Timeline (offer, contract, inspection, closing)
- Documents:
  - Purchase agreement
  - Inspection report
  - Photos
- Buyer info (if assigned)
- "Edit Deal" button
- "Mark as Closed" button

**3.9 Rehabinator** (`/tools/rehabinator`)
- (Rehab Cost Calculator)
- Property address input
- Property details (sq ft, beds/baths)
- Repair checklist:
  - Roof ($X per sq ft)
  - HVAC ($X)
  - Plumbing ($X)
  - Electrical ($X)
  - Kitchen ($X)
  - Bathrooms ($X)
  - Flooring ($X per sq ft)
  - Paint ($X per sq ft)
  - Landscaping ($X)
  - Permits/Fees ($X)
  - Contingency (10%)
- Total repair estimate (large, bold)
- "Save to Deal" button
- "Export PDF" button

**3.10 Offernator** (`/tools/offernator`)
- (Offer Calculator)
- ARV input
- Repair costs input (or import from Rehabinator)
- Desired profit input (or percentage)
- Closing costs (estimate)
- Holding costs (estimate)
- Formula display:
  - ARV: $X
  - - Repairs: $X
  - - Profit: $X
  - - Closing: $X
  - - Holding: $X
  - = Max Offer: $X (large, bold, green if profitable)
- "Save Offer" button
- "Send to Owner" button (generates offer letter)

**3.11 Comps** (`/property/[id]/comps`)
- Comparable sales (nearby sold properties)
- Map view (pins for each comp)
- List view:
  - Comp cards (image, address, sold price, sold date, beds/baths, sq ft)
  - Distance from subject property
- Filter: Sold last 3/6/12 months, within X miles
- Average sold price (calculated)
- Price per sq ft (average)

**3.12 Rapid Dialer** (`/tools/rapid-dialer`)
- (Premium feature)
- Lead list (imported or manual)
- Dialer interface:
  - Current lead name, address
  - Phone number
  - Call script (editable)
  - "Call" button (initiates call)
  - Quick actions: Left voicemail, Not interested, Call back, Qualified
- Call log (history)
- Daily call count
- Conversion stats

**3.13 Flip AI** (`/tools/flip-ai`)
- (Premium feature - AI assistant)
- Chat interface
- Ask questions:
  - "What's a good offer for [address]?"
  - "Find distressed properties in [city]"
  - "Calculate rehab costs for 3-bed, 2-bath"
  - "Draft contract for wholesale deal"
- AI provides answers with calculations
- Can save AI suggestions to deals

**3.14 Messages** (`/messages`)
- Conversations with leads/buyers
- Conversation list (unread badges)
- Search conversations
- "New Message" FAB

**3.15 Chat** (`/messages/[id]`)
- Message thread
- Send text message
- Attach photos
- Quick replies (templates)

**3.16 Calendar** (`/calendar`)
- Month view
- Events:
  - Follow-up calls
  - Property showings
  - Inspections
  - Closings
- "Add Event" FAB
- Day view (tap on date)

**3.17 Integrations** (`/integrations`)
- Connect external tools:
  - Google Calendar
  - Zapier
  - REI software (REIPro, PropStream, etc.)
  - CRM (HubSpot, Salesforce)
- Status: Connected / Not Connected
- "Connect" buttons

**3.18 Profile** (`/(tabs)/profile`)
- Profile photo
- Name, email, company
- Account type (Agent or Investor)
- Subscription status (Free or Premium)
- Stats:
  - Deals closed
  - Total profit
  - Average ROI
  - Properties scanned
- "Edit Profile" button
- "Settings" icon

**3.19 Edit Profile** (`/profile/edit`)
- Profile photo change
- Name
- Email
- Company
- License number
- Primary market
- Phone number
- "Save Changes" button

**3.20 Settings** (`/settings`)
- **Account:**
  - Email
  - Password
  - Phone
- **Subscription:**
  - Current plan (Free/Premium)
  - "Upgrade" button
  - Billing info
- **Notifications:**
  - Lead follow-ups
  - Deal updates
  - New investor matches
- **Preferences:**
  - Default market
  - Profit target
  - Currency
- **About:**
  - Terms of Service
  - Privacy Policy
  - Help & Support
- "Logout" button

**3.21 Subscription Management** (`/settings/subscription`)
- Current plan details
- Features comparison (Free vs Premium)
- "Upgrade to Premium" button
- Payment method
- Billing history

**3.22 Notifications** (`/notifications`)
- Tabs: All, Leads, Deals, System
- Notification cards:
  - Follow-up reminder (lead name, due today)
  - New investor inquiry on deal
  - Deal status change
  - Payment received
- Mark as read / Clear all

**3.23 Analytics** (`/analytics`)
- Dashboard overview:
  - Deals closed this month/year
  - Total profit
  - Average deal profit
  - Conversion rate (leads → deals)
- Charts:
  - Deals per month (bar chart)
  - Profit over time (line graph)
  - Lead sources (pie chart)
- Export report button

**3.24 Buyers List** (`/buyers`)
- (For agents to find cash buyers for deals)
- Buyer profiles:
  - Name
  - Budget
  - Preferred property types
  - Target markets
  - Contact info
- "Add Buyer" button
- "Message Buyer" button
- Assign buyer to deal

**3.25 Add Buyer** (`/buyers/add`)
- Buyer name
- Email
- Phone
- Budget range
- Preferred property types
- Target cities/zip codes
- "Save Buyer" button

### 4. INVESTOR-SPECIFIC SCREENS (5 screens)

**4.1 Available Deals** (`/investor/deals`)
- (Investor view)
- Wholesale deals posted by agents
- Deal cards:
  - Property image
  - Address
  - ARV
  - Asking price
  - Wholesale fee
  - Projected profit
  - "View Details" button
- Filter: Property type, Budget, Market

**4.2 Investor Deal Detail** (`/investor/deals/[id]`)
- Property details
- Deal financials
- Agent contact info
- "Claim Deal" button (express interest)
- "Message Agent" button

**4.3 Claimed Deals** (`/investor/my-deals`)
- Deals you've claimed
- Status: Pending, Accepted, Under Contract, Closed
- Action buttons based on status

**4.4 Investor Profile Setup** (`/investor/verify`)
- Proof of funds upload
- ID verification
- "Submit for Approval" button
- Approval status indicator

**4.5 Investor Settings** (`/investor/settings`)
- Investment criteria (property types, budget, markets)
- Notification preferences
- Payment method for earnest money

### 5. ADMIN SCREENS (3 screens - if admin user type)

**5.1 Admin Dashboard** (`/admin/dashboard`)
- Platform stats:
  - Total users (agents, investors)
  - Active subscriptions
  - Deals closed (platform-wide)
- User management link
- Subscription management link

**5.2 User Management** (`/admin/users`)
- User list (agents, investors, admins)
- Approve/reject investor applications
- Suspend/activate users
- View user activity

**5.3 Admin Analytics** (`/admin/analytics`)
- Platform-wide metrics
- Revenue tracking
- User growth charts
- Feature usage stats

## NAVIGATION STRUCTURE

### Bottom Tab Navigation

```
┌──────────────────────────────────────────────────────┐
│ [Dashboard] [Scanner] [Leads] [Deals] [Profile] │
└──────────────────────────────────────────────────────┘
```

1. **Dashboard** - Overview, quick actions, recent activity
2. **Scanner** - Property scanner (camera or manual)
3. **Leads** - Lead pipeline management
4. **Deals** - Active deals and closed deals
5. **Profile** - User profile, settings, subscription

## FLIPFORCE-SPECIFIC FEATURES

### Property Scanner

**Scanning Methods:**
- **Camera scan**: Point camera at property address sign (OCR)
- **Manual input**: Enter address manually
- **Map selection**: Tap any property on map

**Data Retrieved:**
- Property details (beds, baths, sq ft, year built)
- Owner information (name, contact if available)
- Valuation estimates (market value, tax assessed)
- Distressed indicators (foreclosure, liens, absentee owner)
- Comparable sales (nearby sold properties)

**Actions:**
- Add to Leads
- Run Rehabinator (repair calculator)
- Run Offernator (offer calculator)
- Call owner (if phone available)

### Lead Management

**Lead Pipeline Stages:**
1. New
2. Contacted
3. Qualified
4. Offer Made
5. Under Contract
6. Closed
7. Dead

**Lead Sources:**
- Driving for dollars
- Direct mail
- Cold calling
- Referrals
- Online ads
- Property scanner

**Lead Actions:**
- Call, text, email
- Schedule follow-up
- Add notes
- Attach documents
- Move to Deals

### Deal Management

**Deal Types:**
- Wholesale
- Fix-and-Flip
- Buy-and-Hold (rental)
- Subject-to
- Lease option

**Deal Tracking:**
- Purchase price
- ARV
- Repair costs
- Wholesale fee / Profit
- Timeline (offer → closing)
- Documents (contracts, inspections, photos)
- Buyer assignment (if wholesale)

### Calculators

**Rehabinator (Repair Calculator):**
- Itemized repair checklist
- Cost per item (customizable)
- Total repair estimate
- Scope of work generator
- Save to deal

**Offernator (Offer Calculator):**
- ARV input
- Repair costs (from Rehabinator)
- Desired profit
- Closing costs
- Holding costs
- Calculates max offer (70% rule or custom formula)
- Generates offer letter

**Comp Analyzer:**
- Pulls comparable sales
- Filters by sold date, distance, property type
- Calculates average price per sq ft
- Estimates ARV

### Rapid Dialer (Premium)

**Features:**
- Import lead list
- Auto-dial next lead
- Call scripts (customizable)
- Quick disposition buttons
- Call logging
- Daily call tracking
- Conversion stats

### Flip AI (Premium)

**AI Assistant:**
- Natural language queries
- Property analysis
- Market research
- Contract drafting assistance
- Deal calculations
- Investment recommendations

## MOBILE-SPECIFIC FEATURES

### Gestures
- Swipe lead cards left/right: Move between pipeline stages
- Long press property: Quick actions menu
- Pull to refresh: Update leads, deals, scanner results
- Pinch to zoom: Property images, maps

### Animations
- Pipeline stage transitions (smooth slide)
- Calculator result animations (numbers count up)
- Deal closed celebration (confetti)
- Map pin drops

### Camera Integration
- Scan property addresses (OCR)
- Take photos of properties
- Document upload (contracts, inspections)

### Location Services
- Current location for property scanning
- Nearby distressed properties
- Driving for dollars mode (log properties as you drive)

### Push Notifications

**Types:**
- Lead follow-up reminder
- Deal status change
- New investor inquiry
- New wholesale deal available (investors)
- Offer accepted/rejected
- Closing scheduled
- Payment received

### Offline Mode

**Cached Data:**
- Recent leads
- Recent deals
- Saved properties
- Calculator inputs

**Offline Actions:**
- Browse cached data
- Add notes to leads
- Use calculators
- Queue actions (sync when online)

## COMPONENT REQUIREMENTS

### FlipForce-Specific Components

**1. Property Card**
- Image
- Address
- ARV
- Status badge (new, under contract, etc.)
- Quick actions (call, view, add to leads)

**2. Lead Card**
- Property address
- Owner name
- Status badge
- Follow-up date
- Contact buttons (call, text, email)
- Drag handle (for pipeline movement)

**3. Deal Card**
- Property image
- Address
- Deal type badge
- ARV, profit, ROI
- Status indicator
- "View Details" button

**4. Calculator Input**
- Label
- Number input
- Unit ($ or sq ft)
- Helper text
- Auto-calculate on change

**5. Profit Indicator**
- Large profit amount
- Color-coded (green if profitable, red if not)
- ROI percentage
- Breakdown tooltip

**6. Pipeline Stage Column**
- Stage name
- Lead count
- Draggable lead cards
- Drop zone indicator

**7. Comp Card**
- Property image
- Sold price
- Sold date
- Distance from subject
- Beds/baths, sq ft

## EXPO CONFIGURATION

### app.json

```json
{
  "expo": {
    "name": "FlipForce",
    "slug": "flipforce-mobile",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#1E3A8A"
    },
    "ios": {
      "bundleIdentifier": "com.flipforce.app",
      "infoPlist": {
        "NSCameraUsageDescription": "Scan property addresses and take photos",
        "NSLocationWhenInUseUsageDescription": "Find properties near you"
      }
    },
    "android": {
      "package": "com.flipforce.app",
      "permissions": [
        "CAMERA",
        "ACCESS_FINE_LOCATION",
        "CALL_PHONE"
      ],
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#1E3A8A"
      }
    },
    "plugins": [
      "expo-router",
      "expo-camera",
      "expo-location",
      "expo-notifications"
    ],
    "scheme": "flipforce"
  }
}
```

## MOCK DATA

### Properties (200+ properties)
- Realistic addresses
- Various property types (SFR, multifamily, commercial)
- ARV estimates ($100k - $500k)
- Distressed indicators (30% have foreclosure/lien flags)
- Owner information

### Leads (100 leads)
- Various pipeline stages
- Different lead sources
- Follow-up dates
- Notes and activity history

### Deals (50 deals)
- Mix of wholesale, fix-and-flip, rental
- Various statuses (under contract, pending, closed)
- Realistic financials (ARV, repairs, profit)

### Users
- 20 agents
- 10 investors
- 2 admins

## TECHNICAL REQUIREMENTS

- **Expo SDK 51+**
- **React Native**
- **TypeScript** (strict mode)
- **Expo Router** (file-based routing)
- **Zustand** (global state: auth, leads, deals)
- **TanStack Query** (API data fetching)
- **Expo Camera** (property scanning)
- **Expo Location** (property search)
- **React Native Maps** (property locations, comps)
- **AsyncStorage** (offline caching)
- **Expo Notifications** (push notifications)

## CODE QUALITY

- TypeScript strict mode
- Component composition
- Custom hooks (useAuth, useLeads, useDeals, useProperty)
- Error boundaries
- Loading states (skeleton screens)
- Accessibility (screen readers, touch targets ≥44px)

## FINAL DELIVERABLE

A production-ready FlipForce mobile app that:
- ✅ Includes all 40+ screens
- ✅ Has professional real estate design
- ✅ Implements property scanner (camera + manual)
- ✅ Has lead pipeline management (drag & drop)
- ✅ Includes deal tracking
- ✅ Has Rehabinator and Offernator calculators
- ✅ Supports Rapid Dialer (premium)
- ✅ Has Flip AI assistant (premium)
- ✅ Includes comp analyzer
- ✅ Supports agents and investors (different flows)
- ✅ Works offline with caching
- ✅ Has push notifications for follow-ups
- ✅ Is accessible and performant

Build this FlipForce mobile app now.
```

---

**This prompt gives Replit everything to build a polished real estate wholesale platform with property scanning, deal management, calculators, and all the FlipForce features.**
