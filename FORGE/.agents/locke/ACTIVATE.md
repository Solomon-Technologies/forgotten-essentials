# LOCKE AGENT - DEPRECATED

---

## STATUS: ARCHIVED

**This agent has been DEPRECATED as of 2026-01-15.**

All functionality has been merged into the enhanced **Security Sentinel Agent**.

---

## MIGRATION NOTICE

The Locke agent's capabilities have been incorporated into:

```
.agents/security/
```

### What Was Merged:
- RLS policy enforcement → `security/DATABASE/`
- Authentication verification → `security/AUTH/`
- Input validation → `security/WEB-SECURITY/INPUT-SANITIZATION.md`
- SQL injection prevention → `security/CODE-SECURITY/`
- XSS prevention → `security/WEB-SECURITY/`
- CORS configuration → `security/WEB-SECURITY/CORS-VERIFY.md`
- Rate limiting → `security/WEB-SECURITY/RATE-LIMITING.md`

### What's NEW in Security Sentinel:
- Package/dependency vulnerability scanning
- Fake/malicious package detection
- Business logic flaw auditing
- Missing 404 page detection
- Middleware chain verification
- Framework-specific security (Next.js, Express, React Native, Expo)

---

## USE INSTEAD

```bash
# Activate the enhanced Security agent
/sec-full         # Comprehensive security audit

# Specific audits
/sec-rls          # RLS policy audit (was Locke's specialty)
/sec-auth         # Authentication flow audit
/sec-packages     # NEW: Package vulnerability scan
/sec-deps         # NEW: Outdated dependency check
/sec-logic        # NEW: Business logic audit
/sec-middleware   # NEW: Middleware chain check
/sec-404          # NEW: Missing 404 detection
```

---

## HISTORICAL REFERENCE

The original Locke agent (v1.0) was created 2026-01-08 and focused on:
- RLS enforcement
- Auth verification
- Input validation
- SQL injection prevention

This narrow focus has been expanded in the Security Sentinel agent to cover
the full spectrum of application security.

---

**DO NOT USE THIS AGENT. USE `.agents/security/` INSTEAD.**
