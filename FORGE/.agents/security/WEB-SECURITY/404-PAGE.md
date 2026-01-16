# WEB SECURITY: 404 PAGE CHECK

## Why Missing 404 Pages Are a Security Issue

### 1. Information Disclosure
Without a custom 404, frameworks often expose:
- Server technology (Next.js, Express, etc.)
- Framework version
- Debug information
- Stack traces
- File paths

### 2. Enumeration Attacks
Attackers can determine valid vs invalid routes:
- Different response for valid path vs 404
- Timing differences
- Body content differences

### 3. User Experience Security
Users landing on broken 404s may:
- Think site is broken/insecure
- Fall for phishing (redirect to fake site)
- Lose trust in security

---

## What to Check

### For Next.js

```markdown
□ Custom 404.tsx exists in app/ or pages/
□ 404 page doesn't leak debug info
□ 404 has consistent branding
□ 404 redirects make sense
```

**Check for:**
```
app/not-found.tsx       # App Router
pages/404.tsx           # Pages Router
```

### For Express

```markdown
□ Catch-all error handler exists
□ 404 response is generic
□ No stack traces in production
□ Error handler doesn't leak info
```

**Check for:**
```javascript
// Should have catch-all middleware
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
});

// Should have error handler
app.use((err, req, res, next) => {
  // Should NOT expose stack in production
  res.status(500).json({ error: 'Internal error' });
});
```

### For React (SPA)

```markdown
□ Router has catch-all route
□ 404 component exists
□ No console errors on 404
□ Proper client-side handling
```

**Check for:**
```jsx
<Route path="*" element={<NotFound />} />
```

---

## Audit Process

### Step 1: Test for 404 Response

```bash
# Hit a definitely-nonexistent route
curl -v https://your-app.com/this-path-definitely-does-not-exist-12345

# Check:
# - Status code is 404
# - Response body is custom (not framework default)
# - No stack traces
# - No version numbers
# - No file paths
```

### Step 2: Check Response Headers

```bash
# Look for info-leaking headers
curl -I https://your-app.com/nonexistent

# Should NOT see:
# X-Powered-By: Express
# Server: nginx/1.x.x
# X-AspNet-Version
```

### Step 3: Check Error Format

```markdown
## Bad 404 Response (Leaks Info):
{
  "error": "Cannot GET /nonexistent",
  "stack": "Error: Cannot GET /nonexistent\n    at Layer.handle...",
  "path": "/home/user/myapp/routes/index.js"
}

## Good 404 Response:
{
  "error": "Page not found"
}

## Even Better:
Returns custom HTML 404 page with:
- Site branding
- Navigation back to home
- Search function
- No technical details
```

### Step 4: Check Various Paths

```bash
# Test different path patterns
/nonexistent
/api/nonexistent
/admin/nonexistent
/.git/config         # Should also 404, not expose git
/wp-admin            # Should 404 if not WordPress
/phpinfo.php         # Should 404
```

---

## Framework-Specific Checks

### Next.js

```typescript
// app/not-found.tsx (App Router)
export default function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <a href="/">Go Home</a>
    </div>
  );
}
```

```typescript
// pages/404.tsx (Pages Router)
export default function Custom404() {
  return <h1>404 - Page Not Found</h1>
}
```

**Verify:**
```bash
# Check file exists
ls app/not-found.tsx || ls pages/404.tsx

# Test response
curl -s https://app.com/nonexistent | grep -i "not found"
```

### Express

```javascript
// Catch-all MUST come AFTER all routes
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Not found',
    path: undefined  // Don't leak the path
  });
});

// Error handler (catches thrown errors)
app.use((err, req, res, next) => {
  console.error(err);  // Log server-side
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message
  });
});
```

### React Native (Expo/Navigation)

Check that unknown deep links are handled:
```typescript
// linking config
const linking = {
  config: {
    screens: {
      NotFound: '*', // Catch-all
    },
  },
};
```

---

## Output Format

```markdown
# 404 PAGE AUDIT

## Status: PASS / FAIL / WARNING

## Findings

### Framework Detection
- **404 Page Exists**: YES/NO
- **Custom Handler**: YES/NO
- **Framework Exposed**: YES/NO
- **Stack Traces**: YES/NO

### Responses Tested

| Path | Status | Custom 404? | Info Leaked? |
|------|--------|-------------|--------------|
| /nonexistent | 404 | YES | NO |
| /api/fake | 404 | YES | NO |
| /.git/config | 404 | YES | NO |

### Issues Found

🔴 **No custom 404 page**
- Framework default 404 exposed
- Reveals: Next.js version
- Fix: Create app/not-found.tsx

🟠 **Stack trace in API 404**
- Path: /api/nonexistent
- Reveals: File paths
- Fix: Add production error handling

## Recommendations
1. Create custom 404 page
2. Remove X-Powered-By header
3. Add generic error handler
```

---

## Commands

```bash
# Check for 404 page
/sec-404

# Test specific paths
/sec-404 --paths /api /admin /.env

# Include headers check
/sec-404 --include-headers
```

---

## Quick Fix Templates

### Next.js App Router
```typescript
// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="mt-2 text-gray-600">Page not found</p>
        <Link href="/" className="mt-4 text-blue-600">
          Go home
        </Link>
      </div>
    </div>
  );
}
```

### Express
```javascript
// Add at END of routes
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});
```

### Remove X-Powered-By
```javascript
app.disable('x-powered-by');
// Or use helmet
const helmet = require('helmet');
app.use(helmet());
```
