# CLEANREP VALIDATION RULES

**Purpose**: Quality checks and agent coordination for React → Shopify Liquid conversions

---

## VALIDATION PHASES

CleanRep performs validation in **4 sequential phases**:

1. **Pre-Flight** → Before conversion starts
2. **Conversion** → During React → Liquid transformation
3. **Post-Conversion** → After Liquid files created
4. **Agent Handoff** → Coordination with other FORGE agents

---

## PHASE 1: PRE-FLIGHT VALIDATION

### 1.1 React App Structure Check

**Must verify BEFORE starting conversion:**

```bash
# Check for React app
[ -f "package.json" ] && echo "✅ Package.json found" || echo "❌ Not a Node project"

# Check for React dependencies
grep -q "\"react\":" package.json && echo "✅ React detected" || echo "❌ Not a React app"

# Check for Vite (or CRA, Next.js, etc.)
grep -q "\"vite\":" package.json && echo "✅ Vite detected"

# Identify component structure
[ -d "src/components" ] && echo "✅ Components directory found"
[ -d "src/pages" ] && echo "✅ Pages directory found"
```

**HALT if:**
- ❌ Not a JavaScript/TypeScript project
- ❌ No React dependencies
- ❌ No clear component structure

### 1.2 User Confirmation Checklist

**ASK user to confirm:**

```markdown
## Pre-Flight Confirmation

Before I convert your React app to Shopify Liquid, please confirm:

1. **Preserve Design**: Should I preserve your current design exactly?
2. **Custom Features**: Any custom functionality I should know about?
3. **Metafields**: Do you have custom product data? (size, color, custom fields)
4. **Collections**: How are products categorized?
5. **Cart**: Is there custom cart logic I should preserve?
6. **Images**: Where are product images stored?

Please review and confirm before I proceed.
```

### 1.3 Dependency Audit

**Check for problematic dependencies:**

```bash
# Check for framework-specific features
grep -r "next/\|gatsby\|@remix" package.json && echo "⚠ Framework-specific features detected"

# Check for state management
grep -r "redux\|mobx\|zustand\|jotai" package.json && echo "⚠ State management detected"

# Check for CSS-in-JS
grep -r "styled-components\|@emotion\|linaria" package.json && echo "⚠ CSS-in-JS detected"
```

**DOCUMENT conversion strategy for each dependency.**

---

## PHASE 2: CONVERSION VALIDATION

### 2.1 Component Mapping Validation

**For each React component, verify correct Liquid mapping:**

| React Component Type | Liquid Destination | Validation Check |
|---------------------|-------------------|------------------|
| Layout component (Header, Footer) | `sections/` | Has `{% schema %}` |
| Page component (Home, Shop) | `templates/` | Uses sections or JSON template |
| Reusable small component (ProductCard) | `snippets/` | Accepts parameters |
| Page section (Hero, Featured) | `sections/` | Has settings schema |

**Validation script:**
```bash
# Check that all React components are accounted for
REACT_COMPONENTS=$(find src/components src/pages -name "*.tsx" -o -name "*.jsx" | wc -l)
LIQUID_FILES=$(find theme/sections theme/snippets theme/templates -name "*.liquid" | wc -l)

echo "React components: $REACT_COMPONENTS"
echo "Liquid files created: $LIQUID_FILES"
```

### 2.2 Liquid Syntax Validation

**Run Shopify theme check after each file:**

```bash
cd theme/
shopify theme check [filename]

# Example:
shopify theme check sections/header.liquid
```

**Common Liquid errors to catch:**

```liquid
❌ {{ product,title }}        # Comma instead of dot
✅ {{ product.title }}

❌ {% if product %}           # Missing endif
✅ {% if product %}...{% endif %}

❌ {% for p in products %}    # Missing endfor
✅ {% for p in products %}...{% endfor %}

❌ {{ image_url }}            # Missing filter pipe
✅ {{ image | image_url }}

❌ {%- section 'header' %}    # Wrong tag
✅ {% section 'header' %}
```

### 2.3 JavaScript Conversion Validation

**Verify React → Vanilla JS conversions:**

```javascript
// ❌ React pattern remains
const [isOpen, setIsOpen] = useState(false);

// ✅ Converted to vanilla JS
class CartDrawer {
  constructor() {
    this.isOpen = false;
  }
  toggle() {
    this.isOpen = !this.isOpen;
  }
}
```

**Check for remaining React artifacts:**

```bash
# Search theme/ for React-specific code
grep -r "useState\|useEffect\|useContext\|React\|jsx" theme/

# Should return NO results
```

### 2.4 CSS Conversion Validation

**Verify styling preservation:**

```bash
# Check that CSS was extracted
[ -f "theme/assets/base.css" ] && echo "✅ Base CSS created"
[ -f "theme/assets/theme.css" ] && echo "✅ Theme CSS created"

# Check for forbidden Sass
find theme/ -name "*.scss" -o -name "*.sass"
# Should return NO results

# Check for CSS-in-JS artifacts
grep -r "styled\.\|css\`" theme/
# Should return NO results
```

**Verify CSS variables:**

```css
/* In theme/assets/base.css or theme.liquid <style> */

/* ✅ Should use CSS variables */
:root {
  --color-text: {{ settings.color_text }};
  --color-background: {{ settings.color_background }};
}

.button {
  background: var(--color-text);
  color: var(--color-background);
}

/* ❌ Hardcoded values */
.button {
  background: #000000;
  color: #ffffff;
}
```

---

## PHASE 3: POST-CONVERSION VALIDATION

### 3.1 Required Files Checklist

**After conversion complete, verify all required files exist:**

```bash
#!/bin/bash
# Theme structure validation

errors=0

# Required files
required_files=(
  "config/settings_schema.json"
  "config/settings_data.json"
  "layout/theme.liquid"
  "locales/en.default.json"
)

for file in "${required_files[@]}"; do
  if [ -f "theme/$file" ]; then
    echo "✅ $file"
  else
    echo "❌ MISSING: $file"
    ((errors++))
  fi
done

# Required templates
required_templates=(
  "templates/index.liquid"
  "templates/product.liquid"
  "templates/collection.liquid"
)

for template in "${required_templates[@]}"; do
  # Check for .liquid or .json variant
  if [ -f "theme/$template" ] || [ -f "theme/${template%.liquid}.json" ]; then
    echo "✅ $template (or JSON variant)"
  else
    echo "❌ MISSING: $template"
    ((errors++))
  fi
done

# Required sections
if [ -d "theme/sections" ]; then
  section_count=$(ls -1 theme/sections/*.liquid 2>/dev/null | wc -l)
  if [ "$section_count" -gt 0 ]; then
    echo "✅ Sections directory with $section_count files"
  else
    echo "❌ MISSING: No section files"
    ((errors++))
  fi
else
  echo "❌ MISSING: sections/ directory"
  ((errors++))
fi

if [ $errors -eq 0 ]; then
  echo ""
  echo "✅ All required files present"
  exit 0
else
  echo ""
  echo "❌ $errors missing required files"
  exit 1
fi
```

### 3.2 Shopify Theme Check

**Run full theme validation:**

```bash
cd theme/
shopify theme check

# Should return:
# ✅ 0 errors
# ⚠ Warnings are acceptable but should be reviewed
```

**If errors found:**
1. Review error messages
2. Fix Liquid syntax errors
3. Fix missing required files
4. Fix accessibility issues
5. Re-run `shopify theme check`

### 3.3 Settings Schema Validation

**Verify settings_schema.json structure:**

```bash
# Validate JSON syntax
cat theme/config/settings_schema.json | jq . > /dev/null && echo "✅ Valid JSON"

# Check for required theme_info
jq '.[0].name == "theme_info"' theme/config/settings_schema.json && echo "✅ theme_info present"

# Check for color settings
jq 'map(select(.name == "Colors")) | length > 0' theme/config/settings_schema.json && echo "✅ Color settings present"
```

### 3.4 Design Preservation Verification

**Compare React design with Liquid output:**

```markdown
## Design Verification Checklist

Visual comparison between React app and Shopify theme:

### Typography
- [ ] Font family matches
- [ ] Font sizes match
- [ ] Font weights match
- [ ] Line heights match
- [ ] Letter spacing matches

### Colors
- [ ] Text color matches
- [ ] Background color matches
- [ ] Accent colors match
- [ ] Link colors match
- [ ] Hover states match

### Layout
- [ ] Grid columns match
- [ ] Spacing/padding matches
- [ ] Container widths match
- [ ] Responsive breakpoints match

### Components
- [ ] Buttons look identical
- [ ] Cards look identical
- [ ] Forms look identical
- [ ] Navigation looks identical

### Interactive Elements
- [ ] Hover effects match
- [ ] Focus states match
- [ ] Active states match
- [ ] Transitions match
```

**Automated color extraction comparison:**

```bash
# Extract colors from React CSS
grep -roh "#[0-9a-fA-F]\{6\}" src/ | sort -u > react-colors.txt

# Extract colors from Liquid CSS
grep -roh "#[0-9a-fA-F]\{6\}" theme/assets/ | sort -u > liquid-colors.txt

# Compare
diff react-colors.txt liquid-colors.txt
```

---

## PHASE 4: AGENT HANDOFF VALIDATION

### 4.1 Frontend Validator Handoff

**When to trigger: After all Liquid files created**

**Handoff checklist:**

```markdown
## Frontend Validator Scope

Trigger `frontend-validator` agent to check:

1. **UI Completeness**
   - [ ] All pages render
   - [ ] No broken layouts
   - [ ] Images load

2. **User Flows**
   - [ ] Homepage → Collection → Product → Cart → Checkout
   - [ ] Search functionality
   - [ ] Filter/sort on collection pages

3. **State Handling**
   - [ ] Loading states present
   - [ ] Error states present
   - [ ] Empty states present

4. **Forms**
   - [ ] Newsletter signup
   - [ ] Search
   - [ ] Add to cart
   - [ ] Quantity selectors

5. **Responsive Design**
   - [ ] Mobile breakpoints work
   - [ ] Tablet breakpoints work
   - [ ] Desktop layout correct
```

**Trigger command:**
```
Launch frontend-validator agent with scope: theme/
```

**Expected output from frontend-validator:**
- ✅ All user flows complete
- ✅ No dead ends
- ✅ All states handled
- ⚠ Any blockers or missing states

### 4.2 Security Sentinel Handoff (Conditional)

**When to trigger: If theme has custom forms or user input**

**Handoff checklist:**

```markdown
## Security Sentinel Scope

Trigger `security-sentinel` agent if theme includes:

- [ ] Custom contact forms
- [ ] Newsletter signups with custom validation
- [ ] Search with custom query handling
- [ ] Any custom Liquid that processes user input

**Security checks needed:**
- [ ] Input sanitization
- [ ] XSS prevention
- [ ] CSRF protection (Shopify handles this)
- [ ] No exposed API keys
```

**Trigger command:**
```
Launch security-sentinel agent for theme security audit
```

### 4.3 Diablo Handoff (If Additional Features Needed)

**When to trigger: User requests additional features beyond conversion**

**Example scenarios:**
- User wants to add new sections
- User wants custom metafield displays
- User wants advanced filtering

**Handoff note:**
```markdown
## Diablo Agent Scope

CLEANREP has completed React → Liquid conversion.

User now requests: [feature description]

Theme structure is in place at: theme/

Diablo should:
- Use existing theme structure
- Follow established design aesthetic
- Coordinate with frontend-validator after new features
```

---

## VALIDATION FAILURE PROTOCOLS

### Critical Failures (HALT IMMEDIATELY)

**STOP conversion if:**

1. **Shopify theme check fails with errors**
   - Do not proceed until fixed
   - Review error messages
   - Fix syntax/structure issues

2. **Required files missing**
   - settings_schema.json
   - settings_data.json
   - theme.liquid
   - en.default.json

3. **Design aesthetic not preserved**
   - Colors don't match
   - Fonts don't match
   - Layout broken

4. **User flow blockers identified**
   - Can't add to cart
   - Can't navigate to checkout
   - Search broken

**Resolution:**
- Document specific failure
- Fix immediately
- Re-run validation
- Don't proceed to next phase until resolved

### Warnings (DOCUMENT AND CONTINUE)

**Acceptable to continue with warnings:**

1. **Performance warnings**
   - Large images (can optimize later)
   - Unused CSS (can clean up later)

2. **Accessibility warnings**
   - Alt text suggestions
   - Contrast recommendations (if already ≥4.5:1)

3. **Code quality warnings**
   - Unused Liquid variables
   - Redundant code

**Action:**
- Document warnings
- Create follow-up tasks
- Inform user

---

## QUALITY GATES

### Gate 1: Pre-Conversion

**Cannot start conversion until:**
- ✅ React app structure validated
- ✅ User confirms design preservation
- ✅ Conversion strategy documented

### Gate 2: Mid-Conversion

**Cannot proceed to next file until:**
- ✅ Current file passes `shopify theme check`
- ✅ Liquid syntax validated
- ✅ React artifacts removed

### Gate 3: Post-Conversion

**Cannot handoff to other agents until:**
- ✅ All required files present
- ✅ Shopify theme check passes (0 errors)
- ✅ Design visually verified

### Gate 4: Deployment Ready

**Cannot recommend deployment until:**
- ✅ Frontend validator approves
- ✅ User flows tested
- ✅ Responsive design verified
- ✅ Shopify theme uploads successfully

---

## AUTOMATED VALIDATION SCRIPT

**Use this script after conversion:**

```bash
#!/bin/bash
# CleanRep Validation Script

echo "🔍 CLEANREP VALIDATION"
echo "======================"
echo ""

# Navigate to theme directory
cd theme/ 2>/dev/null || { echo "❌ theme/ directory not found"; exit 1; }

# 1. Required Files
echo "1️⃣ Checking Required Files..."
required=("config/settings_schema.json" "config/settings_data.json" "layout/theme.liquid" "locales/en.default.json")
missing=0
for file in "${required[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✅ $file"
  else
    echo "  ❌ MISSING: $file"
    ((missing++))
  fi
done
echo ""

# 2. Shopify Theme Check
echo "2️⃣ Running Shopify Theme Check..."
if command -v shopify &> /dev/null; then
  shopify theme check --fail-level error
  if [ $? -eq 0 ]; then
    echo "  ✅ Theme check passed"
  else
    echo "  ❌ Theme check failed"
    exit 1
  fi
else
  echo "  ⚠ Shopify CLI not installed (skipping)"
fi
echo ""

# 3. Check for React Artifacts
echo "3️⃣ Checking for React Artifacts..."
react_artifacts=$(grep -r "useState\|useEffect\|React\|jsx" . 2>/dev/null | wc -l)
if [ "$react_artifacts" -eq 0 ]; then
  echo "  ✅ No React artifacts found"
else
  echo "  ❌ Found $react_artifacts React artifacts"
  grep -r "useState\|useEffect\|React\|jsx" .
fi
echo ""

# 4. Check for Forbidden Files
echo "4️⃣ Checking for Forbidden Files..."
sass_files=$(find . -name "*.scss" -o -name "*.sass" | wc -l)
if [ "$sass_files" -eq 0 ]; then
  echo "  ✅ No Sass files found"
else
  echo "  ❌ Found $sass_files Sass files (not allowed)"
  find . -name "*.scss" -o -name "*.sass"
fi
echo ""

# 5. Summary
echo "📊 VALIDATION SUMMARY"
echo "====================="
if [ $missing -eq 0 ] && [ "$react_artifacts" -eq 0 ] && [ "$sass_files" -eq 0 ]; then
  echo "✅ All validations passed"
  echo ""
  echo "Next steps:"
  echo "1. Launch frontend-validator agent"
  echo "2. Test user flows manually"
  echo "3. Upload to Shopify for final testing"
  exit 0
else
  echo "❌ Validation failed"
  echo ""
  echo "Issues found:"
  [ $missing -gt 0 ] && echo "  - $missing missing required files"
  [ "$react_artifacts" -gt 0 ] && echo "  - React artifacts remain"
  [ "$sass_files" -gt 0 ] && echo "  - Forbidden Sass files present"
  exit 1
fi
```

---

## SUCCESS CRITERIA

**CleanRep conversion is COMPLETE when:**

✅ **All validation phases passed**
✅ **Quality gates cleared**
✅ **Shopify theme check: 0 errors**
✅ **No React artifacts remain**
✅ **Design aesthetic preserved**
✅ **Frontend validator approves**
✅ **User flows tested and working**
✅ **Theme uploads to Shopify successfully**

---

## VALIDATION DOCUMENTATION

**Create validation report:**

```markdown
# CleanRep Validation Report - [Project Name]

**Date**: YYYY-MM-DD
**React App**: [source path]
**Shopify Theme**: [destination path]

## Pre-Flight Validation
- [x] React structure validated
- [x] User confirmed design preservation
- [x] Conversion strategy documented

## Conversion Validation
- [x] Component mapping complete
- [x] Liquid syntax validated
- [x] JavaScript converted to vanilla
- [x] CSS extracted successfully

## Post-Conversion Validation
- [x] Required files present
- [x] Shopify theme check passed (0 errors)
- [x] Settings schema valid
- [x] Design visually verified

## Agent Handoff Validation
- [x] Frontend validator: APPROVED
- [ ] Security sentinel: N/A (no custom forms)
- [ ] Additional features: N/A

## Quality Gates
- [x] Gate 1: Pre-conversion ✅
- [x] Gate 2: Mid-conversion ✅
- [x] Gate 3: Post-conversion ✅
- [x] Gate 4: Deployment ready ✅

## Deployment Status
- [x] Theme uploaded to Shopify
- [x] Preview tested
- [ ] Published to production

**Conversion Status**: ✅ COMPLETE
```

---

**These validation rules ensure high-quality React → Shopify Liquid conversions that meet all Shopify theme requirements.**
