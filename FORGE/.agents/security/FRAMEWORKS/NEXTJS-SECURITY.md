# FRAMEWORK: NEXT.JS SECURITY

## Critical Security Checks for Next.js

---

## 1. Middleware Authentication

### Check middleware.ts exists
```bash
ls middleware.ts
```

### Verify protected routes covered
```typescript
// middleware.ts
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/protected/:path*',
    '/admin/:path*',
  ],
};
```

### Auth check pattern
```typescript
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const token = await getToken({ req: request });

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
```

---

## 2. API Route Security

### Every API route needs auth check
```typescript
// app/api/protected/route.ts
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Handle request
}
```

### Check all API routes
```bash
# Find all route handlers
find app/api -name "route.ts" -exec grep -L "getServerSession\|getToken\|auth" {} \;
# This shows routes MISSING auth - should be empty for protected routes
```

---

## 3. Environment Variables

### Server-only vs Client-exposed
```bash
# NEXT_PUBLIC_ prefix exposes to client!

# BAD: Exposed to client
NEXT_PUBLIC_API_KEY=secret  # ❌ Client can see this!

# GOOD: Server-only
DATABASE_URL=secret         # ✅ Only server can access
API_KEY=secret             # ✅ Only server can access
```

### Check for leaked secrets
```bash
# Find client-exposed env vars
grep -r "NEXT_PUBLIC_" .env* --include=".env*"

# Ensure no secrets use NEXT_PUBLIC_
```

---

## 4. not-found.tsx / error.tsx

### Custom 404 page required
```typescript
// app/not-found.tsx
export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
    </div>
  );
}
```

### Custom error page
```typescript
// app/error.tsx
'use client';

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong</h2>
      {/* Don't show error.message in production! */}
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

---

## 5. Server Actions Security

### Validate input in Server Actions
```typescript
'use server';

import { z } from 'zod';
import { getServerSession } from 'next-auth';

const schema = z.object({
  title: z.string().min(1).max(100),
});

export async function createItem(formData: FormData) {
  // 1. Auth check
  const session = await getServerSession();
  if (!session) throw new Error('Unauthorized');

  // 2. Input validation
  const result = schema.safeParse({
    title: formData.get('title'),
  });

  if (!result.success) {
    throw new Error('Invalid input');
  }

  // 3. Process
}
```

---

## 6. Security Headers

### next.config.js headers
```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
];

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

---

## 7. CORS for API Routes

```typescript
// app/api/public/route.ts
export async function GET(request: Request) {
  const origin = request.headers.get('origin');

  // Validate origin
  const allowedOrigins = ['https://myapp.com', 'https://www.myapp.com'];
  if (origin && !allowedOrigins.includes(origin)) {
    return new Response('Forbidden', { status: 403 });
  }

  const response = Response.json({ data: 'public' });

  // Add CORS headers
  response.headers.set('Access-Control-Allow-Origin', origin || '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  return response;
}
```

---

## Security Checklist

```bash
NEXTJS_SECURITY=(
  # Auth
  "[ ] middleware.ts exists"
  "[ ] middleware covers all protected routes"
  "[ ] API routes check auth"
  "[ ] Server Actions check auth"

  # Environment
  "[ ] No secrets in NEXT_PUBLIC_*"
  "[ ] .env.local not committed"
  "[ ] Production env vars set"

  # Error Handling
  "[ ] Custom not-found.tsx"
  "[ ] Custom error.tsx"
  "[ ] No stack traces in production"

  # Headers
  "[ ] Security headers in next.config.js"
  "[ ] CORS configured"
  "[ ] CSP if needed"

  # Input
  "[ ] All inputs validated (Zod)"
  "[ ] File uploads validated"
  "[ ] Size limits on requests"
)
```

---

## Commands

```bash
# Next.js specific audit
/sec-nextjs

# Check middleware coverage
/sec-nextjs --middleware

# Check API routes
/sec-nextjs --api-routes

# Check env vars
/sec-nextjs --env
```
