# CODE SECURITY: BUSINESS LOGIC AUDIT

## Purpose

Detect logic flaws that allow bypassing business rules, even when technical security is correct.

**Business logic vulnerabilities are often MORE dangerous than technical bugs because:**
- They're harder to detect with automated tools
- They don't trigger error messages
- They allow "legitimate" looking exploits
- RLS and auth won't stop them

---

## Categories of Business Logic Flaws

### 1. Price Manipulation

**What to Check:**
```markdown
□ Prices are validated SERVER-SIDE, not just client
□ Cart totals are recalculated server-side
□ Discounts are validated server-side
□ Currency conversions are server-controlled
□ No negative quantities allowed
□ No negative prices in requests
```

**Common Vulnerabilities:**
```javascript
// VULNERABLE: Trusting client-side price
const { price, quantity } = req.body;
const total = price * quantity; // Client controls price!

// SECURE: Look up price server-side
const product = await getProduct(productId);
const total = product.price * quantity; // Server controls price
```

**Attack Patterns:**
- Modify price in request body
- Change currency after price calculation
- Apply multiple discounts
- Use negative quantities
- Race condition on flash sales

### 2. Privilege Escalation

**What to Check:**
```markdown
□ Role checks are server-side
□ Admin endpoints verify admin role
□ User can't modify their own role
□ JWT role claim can't be manipulated
□ Org-level permissions enforced
□ Can't access other users' data by ID guessing
```

**Common Vulnerabilities:**
```javascript
// VULNERABLE: Client-controlled role
const { userId, role } = req.body;
await updateUser(userId, { role }); // User sets own role!

// SECURE: Role from authenticated session
const user = await getAuthUser(req);
if (!user.isAdmin) throw new Error('Unauthorized');
```

**Attack Patterns:**
- Change `role` field in profile update
- Modify JWT payload (if not validated)
- Access admin routes without check
- IDOR (Insecure Direct Object Reference)

### 3. Rate Limit & Quota Bypasses

**What to Check:**
```markdown
□ Rate limits on sensitive endpoints
□ Limits per user, not just IP
□ Limits can't be reset by logout/login
□ Quotas enforced server-side
□ Trial limits actually enforced
□ API rate limits can't be bypassed
```

**Common Vulnerabilities:**
```javascript
// VULNERABLE: Rate limit by IP only
const rateLimit = rateLimit({ windowMs: 60000, max: 100 });
// Attacker uses multiple IPs

// SECURE: Rate limit by user ID
const rateLimit = rateLimit({
  windowMs: 60000,
  max: 100,
  keyGenerator: (req) => req.user.id // Per user
});
```

**Attack Patterns:**
- Rotate IPs to bypass limit
- Logout/login to reset
- Use multiple accounts
- Hit endpoint before auth check

### 4. State Machine Bypasses

**What to Check:**
```markdown
□ Order status transitions are validated
□ Can't skip payment step
□ Can't go backwards in flow
□ Subscription states enforced
□ Trial-to-paid conversion required
□ Cancellation flow complete
```

**Common Vulnerabilities:**
```javascript
// VULNERABLE: Any status accepted
const { orderId, status } = req.body;
await updateOrder(orderId, { status });
// Can set to "completed" without paying!

// SECURE: State machine validation
const validTransitions = {
  'pending': ['paid', 'cancelled'],
  'paid': ['shipped'],
  'shipped': ['delivered'],
};
if (!validTransitions[currentStatus].includes(newStatus)) {
  throw new Error('Invalid status transition');
}
```

**Attack Patterns:**
- Skip payment step
- Mark order as shipped manually
- Bypass approval workflow
- Change subscription tier without payment

### 5. Referral & Reward Abuse

**What to Check:**
```markdown
□ Can't refer yourself
□ Referral limits enforced
□ Rewards tied to real actions
□ Can't stack unlimited rewards
□ Points can't go negative (steal points)
□ Promo codes single-use when intended
```

**Common Vulnerabilities:**
```javascript
// VULNERABLE: No self-referral check
const { referrerId, newUserId } = req.body;
await addReferral(referrerId, newUserId);
// Create fake accounts, refer self!

// SECURE: Multiple checks
if (referrerId === newUserId) throw new Error('Cannot refer yourself');
if (await isSameDevice(referrerId, newUserId)) throw new Error('Same device');
if (await isSameIP(referrerId, newUserId)) throw new Error('Same IP');
```

**Attack Patterns:**
- Self-referral with multiple accounts
- Fake signups for rewards
- Stacking promo codes
- Infinite point generation
- Referring then cancelling

### 6. Time-Based Exploits

**What to Check:**
```markdown
□ Flash sale times validated server-side
□ Coupon expiration server-checked
□ Session timeout enforced
□ Subscription dates can't be modified
□ Trial end dates server-controlled
□ Timezone manipulation prevented
```

**Common Vulnerabilities:**
```javascript
// VULNERABLE: Client-controlled timestamps
const { couponCode, appliedAt } = req.body;
// Client can backdate to when coupon was valid!

// SECURE: Server timestamp
const coupon = await getCoupon(couponCode);
if (new Date() > coupon.expiresAt) {
  throw new Error('Coupon expired');
}
```

---

## Audit Process

### Step 1: Map Business Rules

```markdown
## Questions to Answer:
1. What are the key business flows? (signup, purchase, etc.)
2. What rules govern each flow?
3. What are users NOT supposed to do?
4. What resources do users pay for?
5. What limits exist?
```

### Step 2: Find Rule Enforcement Points

```markdown
## For Each Business Rule:
1. Where is it checked?
2. Is it client-side or server-side?
3. Can it be bypassed?
4. What happens if bypassed?
```

### Step 3: Test Bypasses

```markdown
## For Each Enforcement Point:
1. What if I send wrong data?
2. What if I send nothing?
3. What if I send extra fields?
4. What if I skip this step?
5. What if I go out of order?
```

---

## Output Format

```markdown
# BUSINESS LOGIC AUDIT

## Summary
- **Flows Audited**: X
- **Rules Checked**: X
- **Bypasses Found**: X
- **Critical Logic Flaws**: X

## Critical Findings

### 🔴 Price Manipulation Possible
- **Location**: `/api/checkout`
- **Issue**: Price comes from client, not recalculated
- **Exploit**: Modify price in request body
- **Fix**: Look up price server-side

### 🔴 Role Escalation Possible
- **Location**: `/api/users/update`
- **Issue**: Role field not protected
- **Exploit**: Set `role: 'admin'` in request
- **Fix**: Remove role from allowed update fields

## State Machine Issues

### 🟠 Order Status Bypass
- **Location**: `/api/orders/update`
- **Issue**: No state transition validation
- **Exploit**: Set status to 'shipped' without payment
- **Fix**: Implement state machine validation

## Recommendations
1. [Priority action]
2. [Secondary action]
3. [Long-term fix]
```

---

## Commands

```bash
# Full business logic audit
/sec-logic

# Focus on specific flow
/sec-logic --flow checkout
/sec-logic --flow signup
/sec-logic --flow subscription

# Check specific rule
/sec-logic --check price-validation
/sec-logic --check role-escalation
```

---

## Business Logic Checklist

```bash
BUSINESS_LOGIC_CHECKS=(
  # MONEY
  "[ ] Prices validated server-side"
  "[ ] Cart totals recalculated server-side"
  "[ ] Discounts validated server-side"
  "[ ] No negative quantities"
  "[ ] Currency conversion server-controlled"

  # ACCESS
  "[ ] Role checks server-side"
  "[ ] Admin endpoints protected"
  "[ ] User can't change own role"
  "[ ] IDOR prevention (can't access other's data)"

  # LIMITS
  "[ ] Rate limits per user (not just IP)"
  "[ ] Quotas enforced server-side"
  "[ ] Trial limits actually enforced"
  "[ ] Can't reset limits by logout"

  # STATE
  "[ ] State transitions validated"
  "[ ] Can't skip required steps"
  "[ ] Can't go backwards inappropriately"
  "[ ] Subscription states enforced"

  # REWARDS
  "[ ] Can't self-refer"
  "[ ] Referral limits enforced"
  "[ ] Promo codes properly limited"
  "[ ] Points can't go negative"
)
```

---

## Real-World Examples

### Example 1: E-commerce Price Change
```
Attacker discovers `/api/cart/checkout` accepts:
{ items: [{ id: 123, price: 0.01 }] }

Instead of looking up the price, server uses provided price.
$1000 laptop purchased for $0.01.
```

### Example 2: SaaS Tier Bypass
```
Free tier allows 100 API calls/month.
Attacker discovers limit checked at login.
Logout and login resets the counter.
Infinite API calls on free tier.
```

### Example 3: Subscription State
```
Premium feature checks: user.subscription === 'premium'
Attacker finds `/api/profile/update` allows any field.
Sets subscription: 'premium' without payment.
Full premium access for free.
```
