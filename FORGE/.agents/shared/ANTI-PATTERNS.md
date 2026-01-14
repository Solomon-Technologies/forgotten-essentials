# UNIVERSAL ANTI-PATTERNS

**Version**: 2.0
**Source**: Extracted from `.diablo/ANTI-PATTERNS-ENFORCER.md` across all projects
**Purpose**: Shared anti-patterns that ALL agents must prevent

---

## How Agents Use This Document

Before EVERY action, check:

1. **Which anti-pattern could I trigger?**
2. **What pre-flight check prevents it?**
3. **Have I run that check?**

If NO to #3 → **HALT** → Run check → Then proceed

---

## Core Limitations (Acknowledge These)

1. **Cannot see rendered output** - Trust user observations about visual bugs
2. **Don't know the codebase initially** - Always search before creating
3. **Training data is outdated** - Check what's actually installed
4. **Pattern-match, not understand** - Verify assumptions

---

## 🚨 MANDATORY PRE-FLIGHT CHECKS

### 1. Search Before Create

```bash
# Does this functionality already exist?
SEARCH_COMMANDS=(
  "grep -r 'functionName' . --include='*.ts' --include='*.tsx'"
  "ls -la shared/utils/ lib/ components/"
  "find . -name '*Component*' -type f"
)

# If found: USE IT
# If not found: Proceed to create
```

**❌ NEVER:**
- Create new utility without searching
- Build new component without checking library
- Implement feature that might exist

**✅ ALWAYS:**
- Search codebase first
- Check package.json for dependencies
- Look for existing patterns

---

### 2. Verify Database Schema

```bash
# Before ANY database operation:
CHECK_SCHEMA=(
  "Check actual column names in table"
  "Verify foreign key references"
  "Check constraint definitions"
  "Confirm data types match"
)

# Methods:
# - Read migration files
# - Query information_schema
# - Check ORM/schema definitions
```

**❌ NEVER:**
- Assume column names
- Guess foreign key targets
- Use wrong data type
- Ignore check constraints

**✅ ALWAYS:**
- Read schema before writing SQL
- Verify column names exist
- Check constraint rules
- Use correct data types

---

### 3. Check Configuration Expectations

```bash
# Before creating config objects:
FIND_CONFIG_USAGE=(
  "Where is this config consumed?"
  "What field names does code expect?"
  "What data structure is required?"
  "Are there nested objects?"
)

# Search for usage:
grep -r "config\\.fieldName" app/
```

**❌ NEVER:**
- Invent config field names
- Assume flat vs nested structure
- Create config without checking consumer
- Use camelCase when snake_case expected

**✅ ALWAYS:**
- Find where config is read
- Match exact field names
- Match exact structure
- Verify with actual code

---

### 4. Understand Table Relationships

```bash
# For multi-table queries:
IDENTIFY_STRUCTURE=(
  "Which tables are involved?"
  "Where is the JOIN table?"
  "Which table has which field?"
  "What's the relationship type?"
)

# Common pattern:
# CMS Table → JOIN Table → Profile Table
# Don't assume data is in CMS table!
```

**❌ NEVER:**
- Assume all data is in one table
- Look for IDs in wrong table
- Skip JOIN tables
- Guess relationship structure

**✅ ALWAYS:**
- Identify JOIN tables first
- Query JOIN table for IDs
- Then query main table
- Understand relationship flow

---

## 🎯 THE 10 UNIVERSAL ANTI-PATTERNS

### Anti-Pattern #1: Hardcoded Default Values

```typescript
// ❌ WRONG: Hardcoded default
const [data, setData] = useState({
  calculatedValue: 12345  // Hardcoded!
});

// ✅ CORRECT: Calculate dynamically
useEffect(() => {
  const calculated = performCalculation(inputs);
  setData(prev => ({ ...prev, calculatedValue: calculated }));
}, [inputs]);
```

**Rule**: Never hardcode values that should be calculated.

---

### Anti-Pattern #2: Defending Code When User Reports Issue

```
❌ WRONG Response:
User: "The button is invisible"
Agent: "The CSS looks correct to me. It should work."

✅ CORRECT Response:
User: "The button is invisible"
Agent: "I can't see rendered output, so I trust your observation.
       Let me check parent elements, CSS specificity, and z-index."
```

**Rule**: User can see, you can't. User is always right about observations.

---

### Anti-Pattern #3: Field Name Mismatch

```typescript
// ❌ WRONG: Assumed field names
frontend sends: { downPayment: 1000 }
backend expects: { down_payment_amount: 1000 }
database column: down_payment_amount

// ✅ CORRECT: Consistent naming or explicit mapping
// Option 1: Use same names everywhere
{ down_payment_amount: 1000 }

// Option 2: Explicit mapper
function frontendToAPI(data) {
  return {
    down_payment_amount: data.downPayment
  };
}
```

**Rule**: Field names must match OR have explicit mapping.

---

### Anti-Pattern #4: Wrong Package/Tool

```typescript
// ❌ WRONG: Using outdated package
import { old } from '@old/deprecated-package';

// ✅ CORRECT: Check what's installed
// 1. Check package.json
// 2. Search for existing usage
grep -r "import.*from '@supabase" app/

// 3. Use project's pattern
import { createClient } from '@/lib/supabase-client';
```

**Rule**: Use what the project uses, not what you remember.

---

### Anti-Pattern #5: Not Reading Error Messages

```bash
# ❌ WRONG:
Error: Cannot find module '@/components/Button'
Agent: "Let's install the button package"

# ✅ CORRECT:
Error: Cannot find module '@/components/Button'
Agent: "This is an import path error, not a missing package.
       Let me check if Button exists elsewhere."

ls -la app/shared/components/Button.tsx
# Found! Fix import path.
```

**Rule**: Read FULL error message. Identify error type correctly.

---

### Anti-Pattern #5b: "generate is not a function" Build Error

```bash
# ❌ WRONG:
Error: Build error occurred [TypeError: generate is not a function]
Agent: Tries different build commands, clears cache, investigates code

# ✅ CORRECT:
Error: Build error occurred [TypeError: generate is not a function]
Agent: STOP immediately. Clear terminal. Wait for user.
       User can run build themselves - error doesn't reproduce for them.
```

**Rule**: When "generate is not a function" appears during npm run build, HALT ALL BUILD ATTEMPTS.

**Enforcement**:
- NEVER attempt to debug this error
- NEVER run additional build commands
- NEVER clear caches or investigate
- IMMEDIATELY stop and wait for user
- User will provide real build errors if any exist

**Detection Pattern**: Any build error containing "generate is not a function" triggers immediate halt.

---

### Anti-Pattern #6: Creating New Themes

```tsx
// ❌ WRONG: New styling for each page
<div style={{
  backgroundColor: '#3b82f6',
  padding: '32px',
  borderRadius: '12px'
}}>

// ✅ CORRECT: Search for existing design system
grep -r "HeroSection\|Card\|Button" app/shared/components/

// Then use it:
import { HeroSection } from '@/shared/components/HeroSection';
<HeroSection className="bg-gradient-to-br from-blue-600 to-blue-800" />
```

**Rule**: Search for design system components before creating.

**UI Work Pre-Flight**:
```bash
THEME_CHECK=(
  "[ ] Does /components/theme/ exist?"
  "[ ] Does /app/theme/ exist?"
  "[ ] Are there custom colors in tailwind.config.js?"
  "[ ] What colors are used in existing pages?"
  "[ ] What card/button styles exist?"
)
```

**If theme exists:**
- EXTRACT: Header colors, subheader colors, card designs, spacing, borders, shadows
- DOCUMENT in session file
- USE verbatim - NO deviations

**NEVER:**
- Use base Tailwind colors without theme verification
- Add emojis (unless explicitly requested)
- "Improve" or "simplify" user's theme
- Suggest "more modern" alternatives
- Build inconsistent UI across pages

---

### Anti-Pattern #7: Conditional Data Sent Unconditionally

```typescript
// ❌ WRONG: Send all fields always
const data = {
  loanPurpose: 'refinance',
  downPayment: 0,  // ❌ Meaningless for refinance
};

// ✅ CORRECT: Conditional field submission
const data: any = {
  loanPurpose: formData.loanPurpose,
};

if (formData.loanPurpose === 'purchase') {
  data.downPayment = formData.downPayment;
}

if (formData.loanPurpose === 'refinance') {
  data.remainingBalance = formData.remainingBalance;
  data.cashOut = formData.cashOut;
}
```

**Rule**: Only send fields relevant to the context/type.

---

### Anti-Pattern #8: Missing Server-Side Validation

```typescript
// ❌ WRONG: Trust client data
const result = await db.insert(requestData);

// ✅ CORRECT: Validate on server
const errors = validateData(requestData);
if (errors.length > 0) {
  return { error: 'Validation failed', details: errors };
}

// Recalculate critical values
const calculatedAmount = recalculate(requestData);
if (Math.abs(calculatedAmount - requestData.amount) > 100) {
  requestData.amount = calculatedAmount; // Use server calculation
}

const result = await db.insert(requestData);
```

**Rule**: Never trust client calculations. Always validate and recalculate on server.

---

### Anti-Pattern #9: Wrong Column/Table References

```typescript
// ❌ WRONG: Assumed structure
const user = await db.query('SELECT profile_id FROM team_members WHERE id = ?');
// ❌ profile_id doesn't exist in team_members!

// ✅ CORRECT: Check schema first
// team_members has: id, name, email
// team_profile_links has: team_member_id, profile_id
// profiles has: id, user_id, etc.

const link = await db.query(
  'SELECT profile_id FROM team_profile_links WHERE team_member_id = ?'
);
const profile = await db.query(
  'SELECT * FROM profiles WHERE id = ?',
  link.profile_id
);
```

**Rule**: Verify table structure before querying.

---

### Anti-Pattern #10: Configuration Fetched But Not Applied

```typescript
// ❌ WRONG: Fetch config but don't use it
const config = await fetchConfig();
console.log('Config:', config);  // ✅ Logged

const rules = await fetchRules();
return rules;  // ❌ Config never used!

// ✅ CORRECT: Transform and apply config
const config = await fetchConfig();
const configRule = transformConfigToRule(config);  // ✅ Convert

const rules = await fetchRules();
rules.unshift(configRule);  // ✅ Apply with highest priority
return rules;
```

**Rule**: If you fetch config, make sure it's actually used.

---

## 🛡️ FRAMEWORK-AGNOSTIC SAFETY CHECKS

### Database Operations

```bash
PRE_DATABASE_CHECKLIST=(
  "[ ] Checked actual table schema"
  "[ ] Verified column names exist"
  "[ ] Checked data types match"
  "[ ] Verified foreign key targets"
  "[ ] Checked constraint rules"
  "[ ] Used NULL not empty string"
  "[ ] Normalized enum values (lowercase)"
)
```

### API/Backend Work

```bash
PRE_API_CHECKLIST=(
  "[ ] Validated input data"
  "[ ] Recalculated critical values"
  "[ ] Checked authentication"
  "[ ] Verified permissions"
  "[ ] Added error handling"
  "[ ] Returned proper HTTP codes"
  "[ ] Logged important operations"
)
```

### Frontend/UI Work

```bash
PRE_UI_CHECKLIST=(
  "[ ] Searched for existing components"
  "[ ] Checked design system docs"
  "[ ] Used existing theme colors"
  "[ ] Followed naming convention"
  "[ ] Removed debug styles"
  "[ ] Won't argue if user reports visual bug"
  "[ ] NO EMOJIS unless requested"
)
```

### Configuration Systems

```bash
PRE_CONFIG_CHECKLIST=(
  "[ ] Found where config is consumed"
  "[ ] Verified expected field names"
  "[ ] Matched structure (flat vs nested)"
  "[ ] Ensured config is actually applied"
  "[ ] Added transformation if needed"
)
```

---

## 🚀 UNIVERSAL CODING WORKFLOW

### Every Coding Task Follows This Order:

```
1. UNDERSTAND
   ├─ Read user request carefully
   ├─ Identify what needs to change
   └─ Check if this is similar to known anti-pattern

2. SEARCH
   ├─ Does this already exist?
   ├─ What's the existing pattern?
   └─ What packages/tools does project use?

3. VERIFY
   ├─ Check schema/structure
   ├─ Verify field names
   └─ Confirm relationships

4. PLAN
   ├─ List files to change
   ├─ Identify potential issues
   └─ Choose correct approach

5. IMPLEMENT
   ├─ Write code following patterns
   ├─ Add validation
   └─ Handle errors

6. VALIDATE
   ├─ Re-check against anti-patterns
   ├─ Verify field names match
   └─ Confirm logic is sound

7. TEST MENTALLY
   ├─ Walk through the flow
   ├─ Check edge cases
   └─ Verify calculations
```

---

## 📋 QUICK REFERENCE CARD

**Check this before EVERY task:**

```
┌─────────────────────────────────────────────┐
│  BEFORE YOU CODE - CHECK THESE:            │
├─────────────────────────────────────────────┤
│  ✓ Search for existing code                │
│  ✓ Verify database schema                  │
│  ✓ Check config field names                │
│  ✓ Identify table relationships            │
│  ✓ No hardcoded defaults                   │
│  ✓ Trust user's observations               │
│  ✓ Match field names everywhere            │
│  ✓ Use project's packages                  │
│  ✓ Read full error messages                │
│  ✓ Check for existing theme (UI work)      │
│  ✓ Conditional field submission            │
│  ✓ Server-side validation                  │
│  ✓ Correct column references               │
│  ✓ Apply fetched config                    │
└─────────────────────────────────────────────┘
```

---

## 🎯 SUCCESS METRICS

**Agent is successful when:**

- ✅ Code works first time without debugging session
- ✅ No hardcoded values that should be calculated
- ✅ No field name mismatches
- ✅ No "Cannot find column" errors
- ✅ No configuration ignored
- ✅ No user saying "but I can see it's broken"
- ✅ No duplicate code created
- ✅ No wrong package imports
- ✅ Theme respected verbatim
- ✅ No emojis unless requested

**Agent has failed when:**

- ❌ User has to point out wrong field name
- ❌ Database query fails on column not found
- ❌ Config exists but isn't applied
- ❌ User says "it looks broken" and agent said "looks fine"
- ❌ Created new component that already exists
- ❌ Used deprecated package
- ❌ Theme ignored or "improved"
- ❌ Emojis added without request

---

## 🔄 CONTINUOUS IMPROVEMENT

After each task:

1. **Did I check before creating?** → If no, note this failure
2. **Did I verify schema?** → If no, note this failure
3. **Did I match field names?** → If no, note this failure
4. **Did I trust user's observation?** → If no, note this failure
5. **Did I check theme before UI work?** → If no, note this failure

Build a mental list of mistakes. Never repeat them.

---

**This document represents anti-patterns extracted from ALL projects and generalized for universal use.**

**NO agent will proceed with any coding task until relevant pre-flight checks from this document are run.**

---

**Version**: 2.0
**Updated**: 2026-01-08
**Source**: `.diablo/ANTI-PATTERNS-ENFORCER.md` (generalized)
**Authority**: FORGE Framework
