# PRE-FLIGHT CHECKLISTS

**Version**: 1.0
**Purpose**: Phase-specific validation checks before any work begins

---

## PHASE 1: DATABASE

### Before ANY Schema Change

```bash
DATABASE_PRE_FLIGHT=(
  "[ ] Snapshot current state exists"
  "[ ] Checked existing tables/columns"
  "[ ] Verified FK targets exist"
  "[ ] Confirmed data types match"
  "[ ] Checked constraint definitions"
  "[ ] Migration is reversible (UP/DOWN)"
  "[ ] No DROP TABLE without backup"
  "[ ] No ALTER on >1000 rows without review"
)
```

### Snapshot Command
```bash
# Create before ANY change
mkdir -p forge-state/db-snapshots/$(date +%Y%m%d_%H%M%S)
supabase db dump --schema-only > forge-state/db-snapshots/LATEST/schema.sql
```

---

## PHASE 2: THEME VERIFICATION

### Before ANY UI Work

```bash
THEME_PRE_FLIGHT=(
  "[ ] Checked tailwind.config.js for custom colors"
  "[ ] Checked app/globals.css for theme styles"
  "[ ] Found existing components in app/components/"
  "[ ] Documented header colors"
  "[ ] Documented card styles"
  "[ ] Documented button styles"
  "[ ] Documented spacing patterns"
  "[ ] IF NO THEME: HALT and ask user"
)
```

### Theme Search Commands
```bash
# Check for custom theme
grep -r "colors:" tailwind.config.js
grep -r "theme\|--color" app/globals.css
ls app/components/
```

---

## PHASE 3: UI COMPONENTS

### Before Building Components

```bash
UI_COMPONENT_PRE_FLIGHT=(
  "[ ] Theme verified in Phase 2"
  "[ ] Searched for existing similar component"
  "[ ] Using theme colors verbatim"
  "[ ] No base Tailwind when theme exists"
  "[ ] No emojis unless requested"
  "[ ] Proper icon library (lucide-react)"
  "[ ] TypeScript interfaces defined"
)
```

### Component Search Commands
```bash
# Find existing components
find app -name "*.tsx" | xargs grep -l "Button\|Card\|Modal"
ls app/components/
```

---

## PHASE 4: PAGES

### Before Creating Pages

```bash
PAGE_PRE_FLIGHT=(
  "[ ] Components from Phase 3 complete"
  "[ ] Route structure confirmed"
  "[ ] Layout file exists or needed"
  "[ ] Loading/error states planned"
  "[ ] Data fetching strategy chosen"
  "[ ] SEO metadata considered"
)
```

---

## PHASE 5: API ROUTES

### Before Creating Routes

```bash
API_ROUTE_PRE_FLIGHT=(
  "[ ] Auth middleware present"
  "[ ] Input validation added"
  "[ ] Server-side recalculation"
  "[ ] Error handling complete"
  "[ ] Proper HTTP status codes"
  "[ ] CORS headers if needed"
  "[ ] Rate limiting considered"
)
```

### Auth Check Pattern
```typescript
// Every protected route needs this
const supabase = await createServerClient()
const { data: { user } } = await supabase.auth.getUser()
if (!user) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
```

---

## PHASE 6: SECURITY AUDIT

### Before Marking Complete

```bash
SECURITY_PRE_FLIGHT=(
  "[ ] RLS policies on all user tables"
  "[ ] No sensitive data in logs"
  "[ ] No exposed API keys"
  "[ ] Auth checks on all protected routes"
  "[ ] Input sanitization complete"
  "[ ] SQL injection prevented"
  "[ ] XSS prevention in place"
  "[ ] security.md updated"
)
```

### RLS Check Commands
```sql
-- Find tables without RLS
SELECT tablename FROM pg_tables
WHERE schemaname = 'public'
AND tablename NOT IN (
  SELECT tablename FROM pg_policies
);
```

---

## EMERGENCY CHECKLIST

### When Something Breaks

```bash
EMERGENCY_CHECKLIST=(
  "[ ] STOP making changes"
  "[ ] Read full error message"
  "[ ] Check recent changes"
  "[ ] Verify database state"
  "[ ] Check auth/session"
  "[ ] Review API responses"
  "[ ] Document in patchlog.md"
)
```

---

## COMPLETION VERIFICATION

### Before Marking Phase Complete

```bash
COMPLETION_CHECK=(
  "[ ] All pre-flight items checked"
  "[ ] Code written and tested"
  "[ ] No console errors"
  "[ ] Build passes (if applicable)"
  "[ ] Session file updated"
  "[ ] No partial implementations"
)
```

**RULE**: If ANY check fails, phase is NOT complete.

---

**Document Version**: 1.0
**Created**: 2026-01-08
**Authority**: DIABLO Phase Execution Protocol
