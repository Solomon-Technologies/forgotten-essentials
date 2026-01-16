# WEB SECURITY: MIDDLEWARE CHAIN CHECK

## Why Middleware Order Matters

Middleware runs in ORDER. Wrong order = security bypass.

```
WRONG ORDER:
Request → Log → Handle Route → Auth Check
(Route handles request BEFORE auth!)

CORRECT ORDER:
Request → Log → Auth Check → Handle Route
(Auth checked BEFORE route access)
```

---

## Critical Middleware Order

### The Secure Order

```javascript
// 1. SECURITY HEADERS (first!)
app.use(helmet());

// 2. LOGGING
app.use(morgan('combined'));

// 3. CORS
app.use(cors(corsOptions));

// 4. BODY PARSING
app.use(express.json({ limit: '10kb' }));

// 5. RATE LIMITING
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// 6. AUTHENTICATION
app.use(authMiddleware);

// 7. ROUTES
app.use('/api', apiRoutes);

// 8. 404 HANDLER
app.use(notFoundHandler);

// 9. ERROR HANDLER (last!)
app.use(errorHandler);
```

---

## What to Check

### 1. Auth Middleware Present

```markdown
□ Auth middleware exists
□ Auth runs BEFORE routes
□ All protected routes use auth
□ Auth check is server-side
□ Auth failures return 401
```

### 2. Auth on EVERY Protected Route

```javascript
// VULNERABLE: Auth missing on one route
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', updateProfile);  // NO AUTH!

// SECURE: Auth on all protected routes
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);

// EVEN BETTER: Auth at router level
const protectedRouter = express.Router();
protectedRouter.use(authMiddleware);
protectedRouter.get('/profile', getProfile);
protectedRouter.put('/profile', updateProfile);
```

### 3. Rate Limiting Present

```markdown
□ Rate limiter middleware exists
□ Rate limits on auth endpoints (login, signup)
□ Rate limits on sensitive endpoints
□ Limits are per-user, not just IP
```

### 4. Input Validation

```markdown
□ Body parsing has limits
□ Input validation middleware present
□ Validation runs BEFORE route handler
□ Invalid input rejected with 400
```

### 5. CORS Configuration

```markdown
□ CORS middleware present
□ Origin whitelist configured
□ Credentials handling correct
□ Methods restricted appropriately
```

### 6. Security Headers

```markdown
□ helmet() or equivalent used
□ X-Powered-By removed
□ Content-Security-Policy set
□ X-Content-Type-Options: nosniff
□ X-Frame-Options set
```

---

## Framework-Specific Checks

### Next.js (App Router)

```typescript
// middleware.ts at root
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Auth check
  const token = request.cookies.get('auth-token');

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/protected/:path*'],
};
```

**Check for:**
```bash
# middleware.ts should exist
ls middleware.ts

# Check matcher config covers protected routes
grep -A 5 "matcher" middleware.ts
```

### Next.js API Routes

```typescript
// Each API route must check auth
export async function GET(request: Request) {
  // Check auth FIRST
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Then handle request
  // ...
}
```

### Express

```javascript
// Check order of app.use() calls
// Should be: security → parsing → auth → routes → errors

// Grep for middleware order
grep -n "app.use" app.js | head -20
```

---

## Audit Process

### Step 1: List All Middleware

```bash
# For Express, grep app.use
grep -rn "app.use\|router.use" --include="*.js" --include="*.ts"

# For Next.js, check middleware.ts
cat middleware.ts

# Check route files for inline middleware
grep -rn "async function\|export " app/api --include="*.ts"
```

### Step 2: Map Protected Routes

```markdown
## Protected Routes Inventory:
| Route | Method | Auth Required? | Auth Present? |
|-------|--------|----------------|---------------|
| /api/users | GET | YES | ? |
| /api/users | POST | NO (signup) | N/A |
| /api/profile | GET | YES | ? |
| /api/profile | PUT | YES | ? |
| /api/admin | ALL | YES (admin) | ? |
```

### Step 3: Verify Auth on Each

```bash
# For each protected route, verify:

# 1. Auth middleware is applied
grep -A 10 "'/api/profile'" routes/api.js

# 2. Test without auth
curl -X GET http://localhost:3000/api/profile
# Should return 401

# 3. Test with invalid auth
curl -X GET http://localhost:3000/api/profile \
  -H "Authorization: Bearer invalid-token"
# Should return 401
```

### Step 4: Check Middleware Order

```javascript
// List middleware in order
// Should see:
// 1. helmet/security headers
// 2. cors
// 3. body parser
// 4. rate limiter
// 5. auth
// 6. routes
// 7. error handlers

// WRONG ORDER EXAMPLE:
app.use('/api', apiRoutes);     // Routes first!
app.use(authMiddleware);        // Auth after! (Too late)

// CORRECT ORDER:
app.use(authMiddleware);        // Auth first
app.use('/api', apiRoutes);     // Then routes
```

---

## Output Format

```markdown
# MIDDLEWARE AUDIT REPORT

## Summary
- **Middleware Found**: X
- **Protected Routes**: X
- **Routes Missing Auth**: X
- **Order Issues**: X

## Middleware Chain Order

| Order | Middleware | Correct Position? |
|-------|------------|-------------------|
| 1 | helmet | ✅ |
| 2 | cors | ✅ |
| 3 | bodyParser | ✅ |
| 4 | **ROUTES** | ❌ (should be after auth) |
| 5 | authMiddleware | ❌ (too late!) |

## Protected Route Coverage

| Route | Method | Auth Required | Auth Applied | Status |
|-------|--------|---------------|--------------|--------|
| /api/profile | GET | YES | YES | ✅ |
| /api/profile | PUT | YES | NO | ❌ |
| /api/admin | ALL | YES (admin) | YES | ✅ |

## Critical Issues

### 🔴 Route Missing Auth
- **Route**: PUT /api/profile
- **Issue**: No auth middleware
- **Risk**: Anyone can update profiles
- **Fix**: Add authMiddleware

### 🔴 Wrong Middleware Order
- **Issue**: Routes before auth
- **Risk**: Auth bypass possible
- **Fix**: Move auth before routes

## Recommendations
1. [Fix 1]
2. [Fix 2]
```

---

## Commands

```bash
# Full middleware audit
/sec-middleware

# Check specific route
/sec-middleware --route /api/profile

# List middleware order
/sec-middleware --list-order

# Check auth coverage
/sec-middleware --auth-coverage
```

---

## Common Vulnerabilities

### 1. Auth After Routes
```javascript
// VULNERABLE
app.use('/api', apiRoutes);  // Runs first, no auth!
app.use(authMiddleware);     // Never runs for /api

// FIX
app.use(authMiddleware);     // Auth first
app.use('/api', apiRoutes);  // Then routes
```

### 2. Selective Auth Missing
```javascript
// VULNERABLE: One route unprotected
router.get('/users', auth, getUsers);
router.post('/users', createUser);      // No auth!
router.delete('/users/:id', auth, deleteUser);

// FIX: Protect at router level
const router = express.Router();
router.use(auth);  // All routes protected
router.get('/users', getUsers);
router.post('/users', createUser);
router.delete('/users/:id', deleteUser);
```

### 3. Next.js Middleware Matcher Too Narrow
```typescript
// VULNERABLE: Only checks /dashboard
export const config = {
  matcher: ['/dashboard/:path*'],
};
// /api/protected routes are NOT checked!

// FIX: Include all protected paths
export const config = {
  matcher: ['/dashboard/:path*', '/api/protected/:path*', '/admin/:path*'],
};
```
