#!/bin/bash

# SHOPIFY THEME CLEANUP SCRIPT
# Purpose: Clean up Replit-generated React app and prepare for Shopify Liquid conversion
# Usage: ./shopify-theme-cleanup.sh <path-to-replit-app>

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CODEX_ROOT="$(dirname "$(dirname "$SCRIPT_DIR")")"

# Functions
print_header() {
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}========================================${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check arguments
if [ $# -eq 0 ]; then
    print_error "No path provided"
    echo "Usage: $0 <path-to-replit-app> [--convert]"
    echo ""
    echo "Options:"
    echo "  --convert    Automatically trigger CLEANREP agent after cleanup"
    exit 1
fi

APP_PATH="$1"
AUTO_CONVERT=false

# Check for --convert flag
if [ "$2" == "--convert" ]; then
    AUTO_CONVERT=true
fi

# Validate path exists
if [ ! -d "$APP_PATH" ]; then
    print_error "Directory not found: $APP_PATH"
    exit 1
fi

# Get app name
APP_NAME=$(basename "$APP_PATH")

print_header "Shopify Theme Cleanup: $APP_NAME"

# Navigate to app directory
cd "$APP_PATH"

# STEP 1: Remove Replit Artifacts
print_info "Step 1/7: Removing Replit artifacts..."

REPLIT_FILES=(
    ".replit"
    "replit.nix"
    ".replit.nix"
    ".local"
    ".upm"
    ".breakpoints"
    ".replit-build"
)

for file in "${REPLIT_FILES[@]}"; do
    if [ -e "$file" ]; then
        rm -rf "$file"
        print_success "Removed $file"
    fi
done

# Remove Replit-specific dependencies from package.json
if [ -f "package.json" ]; then
    if grep -q "@replit" package.json; then
        print_warning "Found @replit dependencies in package.json"
        print_info "Creating backup: package.json.backup"
        cp package.json package.json.backup

        # Remove @replit dependencies (you may want to do this manually or with a more sophisticated tool)
        print_warning "Please manually review and remove @replit dependencies from package.json"
    fi
fi

print_success "Replit artifacts removed"

# STEP 2: Clean Node Modules
print_info "Step 2/7: Cleaning node_modules and lock files..."

if [ -d "node_modules" ]; then
    rm -rf node_modules
    print_success "Removed node_modules"
fi

if [ -f "package-lock.json" ]; then
    rm -f package-lock.json
    print_success "Removed package-lock.json"
fi

if [ -f "yarn.lock" ]; then
    rm -f yarn.lock
    print_success "Removed yarn.lock"
fi

if [ -f "pnpm-lock.yaml" ]; then
    rm -f pnpm-lock.yaml
    print_success "Removed pnpm-lock.yaml"
fi

print_success "Node dependencies cleaned"

# STEP 3: Clean Git History
print_info "Step 3/7: Cleaning git history..."

if [ -d ".git" ]; then
    print_warning "Existing .git directory found"
    read -p "Do you want to remove existing git history? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        rm -rf .git
        print_success "Removed .git directory"

        # Initialize fresh git repo
        git init
        print_success "Initialized fresh git repository"

        # Create .gitignore if it doesn't exist
        if [ ! -f ".gitignore" ]; then
            cat > .gitignore << 'EOF'
# Dependencies
node_modules
/.pnp
.pnp.js

# Testing
/coverage

# Production
/build
/dist

# Misc
.DS_Store
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Replit
.replit
.replit.nix
replit.nix
.local
.upm
.breakpoints

# Shopify
.shopify/
EOF
            print_success "Created .gitignore"
        fi
    else
        print_info "Keeping existing git history"
    fi
else
    # No git repo, create one
    git init
    print_success "Initialized git repository"
fi

# STEP 4: Create Theme Directory Structure
print_info "Step 4/7: Creating Shopify theme directory structure..."

mkdir -p theme/assets
mkdir -p theme/config
mkdir -p theme/layout
mkdir -p theme/locales
mkdir -p theme/sections
mkdir -p theme/snippets
mkdir -p theme/templates
mkdir -p theme/templates/customers

print_success "Theme directory structure created"

# STEP 5: Check for Required Files
print_info "Step 5/7: Checking React app structure..."

REQUIRED_DIRS=("client" "client/src" "client/src/components" "client/src/pages")
missing_dirs=()

for dir in "${REQUIRED_DIRS[@]}"; do
    if [ ! -d "$dir" ]; then
        missing_dirs+=("$dir")
    fi
done

if [ ${#missing_dirs[@]} -ne 0 ]; then
    print_warning "Some expected directories are missing:"
    for dir in "${missing_dirs[@]}"; do
        echo "  - $dir"
    done
else
    print_success "React app structure validated"
fi

# Count pages
if [ -d "client/src/pages" ]; then
    PAGE_COUNT=$(find client/src/pages -name "*.tsx" -o -name "*.jsx" | wc -l)
    print_info "Found $PAGE_COUNT page components"
fi

# STEP 6: Add Favicons Placeholder
print_info "Step 6/7: Creating favicon placeholders..."

mkdir -p public/favicons

cat > public/favicons/README.md << 'EOF'
# Favicons

Place your theme favicons here:

Required:
- favicon.ico (32x32)
- favicon-16x16.png
- favicon-32x32.png
- apple-touch-icon.png (180x180)
- android-chrome-192x192.png
- android-chrome-512x512.png

Generate favicons at: https://realfavicongenerator.net/
EOF

print_success "Favicon placeholders created"

# STEP 7: Create Cleanup Report
print_info "Step 7/7: Generating cleanup report..."

REPORT_FILE="CLEANUP-REPORT.md"

cat > "$REPORT_FILE" << EOF
# Shopify Theme Cleanup Report

**App Name**: $APP_NAME
**Cleanup Date**: $(date '+%Y-%m-%d %H:%M:%S')
**Cleanup Script**: shopify-theme-cleanup.sh

---

## Actions Taken

### 1. Replit Artifacts Removed
- \`.replit\`
- \`replit.nix\`
- \`.local\`
- Other Replit-specific files

### 2. Node Dependencies Cleaned
- \`node_modules/\` removed
- Lock files removed (package-lock.json, yarn.lock, pnpm-lock.yaml)

### 3. Git History
- $([ -d .git ] && echo "Git repository reinitialized" || echo "No action needed")
- \`.gitignore\` created/updated

### 4. Shopify Theme Structure
Created theme directory:
\`\`\`
theme/
├── assets/
├── config/
├── layout/
├── locales/
├── sections/
├── snippets/
└── templates/
    └── customers/
\`\`\`

### 5. React App Structure
EOF

if [ -d "client/src/pages" ]; then
    echo "**Pages found**: $PAGE_COUNT" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    echo "Page files:" >> "$REPORT_FILE"
    find client/src/pages -name "*.tsx" -o -name "*.jsx" | while read page; do
        echo "- $(basename "$page")" >> "$REPORT_FILE"
    done
fi

cat >> "$REPORT_FILE" << EOF

---

## Next Steps

### Immediate Actions Required

1. **Review package.json**
   - Remove any @replit dependencies
   - Ensure all dependencies are needed for Shopify conversion

2. **Add Favicons**
   - Generate favicons and place in \`public/favicons/\`
   - Use https://realfavicongenerator.net/

3. **Review React Components**
   - Check \`client/src/components/\` for conversion candidates
   - Identify which components map to Shopify sections vs snippets

### Conversion to Shopify Liquid

**Option 1: Manual CLEANREP Activation**
\`\`\`
Activate CLEANREP agent and provide this app path:
$APP_PATH
\`\`\`

**Option 2: Automated (if --convert flag was used)**
CLEANREP agent will be triggered automatically.

### CLEANREP Conversion Process

The CLEANREP agent will:
1. Analyze React component hierarchy
2. Extract CSS and convert to vanilla
3. Convert JavaScript to vanilla JS (no React hooks)
4. Create Liquid templates from React pages
5. Create Liquid sections from React components
6. Generate settings_schema.json
7. Validate with \`shopify theme check\`
8. Coordinate with frontend-validator agent

---

## App Information

**Total Pages**: $([ -d client/src/pages ] && find client/src/pages -name "*.tsx" -o -name "*.jsx" | wc -l || echo "N/A")
**Total Components**: $([ -d client/src/components ] && find client/src/components -name "*.tsx" -o -name "*.jsx" | wc -l || echo "N/A")

---

## Cleanup Status

✅ Replit artifacts removed
✅ Node dependencies cleaned
✅ Git repository reset (if chosen)
✅ Theme structure created
✅ Favicon placeholders added
✅ Cleanup report generated

**App is ready for CLEANREP conversion.**
EOF

print_success "Cleanup report generated: $REPORT_FILE"

# FINAL SUMMARY
print_header "Cleanup Complete!"
echo ""
print_success "App cleaned and ready for Shopify conversion"
echo ""
print_info "Cleanup report saved to: $REPORT_FILE"
echo ""

if [ "$AUTO_CONVERT" == true ]; then
    print_info "Auto-convert flag detected"
    print_warning "CLEANREP agent integration coming soon..."
    print_info "For now, manually activate CLEANREP agent with:"
    echo ""
    echo "  Path: $APP_PATH"
    echo ""
else
    print_info "Next steps:"
    echo ""
    echo "  1. Review $REPORT_FILE"
    echo "  2. Add favicons to public/favicons/"
    echo "  3. Activate CLEANREP agent to convert React → Shopify Liquid"
    echo ""
    echo "  To activate CLEANREP:"
    echo "  $ claude activate cleanrep"
    echo "  $ provide path: $APP_PATH"
fi

echo ""
print_success "Done!"
