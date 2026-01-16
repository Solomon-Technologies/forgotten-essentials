# FRAMEWORK: EXPRESS.JS SECURITY

## Critical Security Checks for Express.js

---

## 1. Middleware Order

### The Correct Order

```javascript
// 1. SECURITY HEADERS (first!)
const helmet = require('helmet');
app.use(helmet());

// 2. LOGGING
const morgan = require('morgan');
app.use(morgan('combined'));

// 3. CORS
const cors = require('cors');
app.use(cors(corsOptions));

// 4. BODY PARSING (with limits!)
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// 5. RATE LIMITING
const rateLimit = require('express-rate-limit');
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
}));

// 6. AUTHENTICATION
app.use(authMiddleware);

// 7. ROUTES
app.use('/api', apiRoutes);

// 8. 404 HANDLER
app.use(notFoundHandler);

// 9. ERROR HANDLER (last!)
app.use(errorHandler);
```

### Check middleware order
```bash
# List all middleware in order
grep -n "app.use" app.js server.js index.js 2>/dev/null | head -30
```

---

## 2. Authentication Middleware

### Every protected route needs auth
```javascript
// VULNERABLE: Inline auth, easy to forget
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', updateProfile);  // NO AUTH!

// SECURE: Router-level auth
const protectedRouter = express.Router();
protectedRouter.use(authMiddleware);
protectedRouter.get('/profile', getProfile);
protectedRouter.put('/profile', updateProfile);
```

### Check all routes for auth
```bash
# Find route handlers
grep -rn "router\.\(get\|post\|put\|delete\|patch\)" --include="*.js" --include="*.ts"

# Find routes without auth middleware
grep -rn "router\.\(get\|post\|put\|delete\|patch\)" --include="*.js" | grep -v "auth\|Auth"
```

---

## 3. Rate Limiting

### Global rate limiter
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: 'Too many requests',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
```

### Strict limiter for auth endpoints
```javascript
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 attempts
  message: 'Too many login attempts',
});

app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
app.use('/api/auth/forgot-password', authLimiter);
```

---

## 4. Input Validation

### Use validation middleware
```javascript
const { body, validationResult } = require('express-validator');

const validateUser = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  body('name').trim().escape().isLength({ min: 1, max: 100 }),
];

router.post('/register', validateUser, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Handle request
});
```

### Check for validation
```bash
# Find routes without validation
grep -rn "router\.\(post\|put\|patch\)" --include="*.js" | grep -v "validate\|body\|param\|query"
```

---

## 5. Error Handling

### Production error handler
```javascript
// Error handler - MUST be last middleware
app.use((err, req, res, next) => {
  // Log error internally
  console.error(err.stack);

  // Don't leak error details in production!
  if (process.env.NODE_ENV === 'production') {
    res.status(500).json({ error: 'Internal server error' });
  } else {
    res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
});
```

### 404 handler
```javascript
// 404 handler - before error handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});
```

---

## 6. Security Headers (Helmet)

### Full helmet configuration
```javascript
const helmet = require('helmet');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: true,
  crossOriginOpenerPolicy: true,
  crossOriginResourcePolicy: { policy: "same-site" },
  dnsPrefetchControl: { allow: false },
  frameguard: { action: "deny" },
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
  ieNoOpen: true,
  noSniff: true,
  originAgentCluster: true,
  permittedCrossDomainPolicies: { permittedPolicies: "none" },
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  xssFilter: true,
}));
```

### Check if helmet is used
```bash
# Check for helmet
grep -rn "helmet" --include="*.js" --include="*.ts"
```

---

## 7. CORS Configuration

### Strict CORS
```javascript
const cors = require('cors');

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'https://myapp.com',
      'https://www.myapp.com',
    ];

    // Allow requests with no origin (mobile apps, curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400, // 24 hours
};

app.use(cors(corsOptions));
```

### Check CORS configuration
```bash
# Find CORS config
grep -rn "cors\|origin" --include="*.js" --include="*.ts" | grep -v node_modules
```

---

## 8. Session Security

### Secure session configuration
```javascript
const session = require('express-session');
const RedisStore = require('connect-redis').default;

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET, // Strong secret from env
  resave: false,
  saveUninitialized: false,
  name: 'sessionId', // Change from default 'connect.sid'
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // HTTPS only in prod
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24, // 24 hours
  },
}));
```

---

## 9. SQL Injection Prevention

### Use parameterized queries
```javascript
// VULNERABLE: String concatenation
const query = `SELECT * FROM users WHERE id = ${userId}`;

// SECURE: Parameterized query
const query = 'SELECT * FROM users WHERE id = $1';
const result = await pool.query(query, [userId]);

// SECURE: With ORM (Sequelize)
const user = await User.findOne({ where: { id: userId } });

// SECURE: With Knex
const user = await knex('users').where('id', userId).first();
```

### Check for SQL injection
```bash
# Find string concatenation in queries
grep -rn "SELECT.*\${" --include="*.js" --include="*.ts"
grep -rn "INSERT.*\${" --include="*.js" --include="*.ts"
grep -rn "UPDATE.*\${" --include="*.js" --include="*.ts"
grep -rn "DELETE.*\${" --include="*.js" --include="*.ts"
```

---

## 10. File Upload Security

### Secure file upload
```javascript
const multer = require('multer');

const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
    files: 5, // Max 5 files
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  },
  storage: multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      // Generate safe filename
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  }),
});
```

---

## Security Checklist

```bash
EXPRESS_SECURITY=(
  # Middleware
  "[ ] helmet() is first middleware"
  "[ ] Middleware order is correct"
  "[ ] Body parser has limits"
  "[ ] Rate limiter present"

  # Auth
  "[ ] Auth middleware on protected routes"
  "[ ] Auth is router-level, not route-level"
  "[ ] Session configured securely"

  # Error Handling
  "[ ] Custom 404 handler"
  "[ ] Error handler doesn't leak details"
  "[ ] No stack traces in production"

  # Input
  "[ ] All inputs validated"
  "[ ] SQL queries parameterized"
  "[ ] File uploads validated"

  # Headers
  "[ ] CORS configured properly"
  "[ ] Security headers set (helmet)"
  "[ ] Cookies are httpOnly/secure"
)
```

---

## Commands

```bash
# Express-specific audit
/sec-express

# Check middleware order
/sec-express --middleware

# Check route protection
/sec-express --routes

# Check error handling
/sec-express --errors
```
