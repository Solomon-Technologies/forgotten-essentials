#!/bin/bash

# SHOPIFY THEME DEPLOY SCRIPT
# Purpose: Deploy converted Shopify theme to shopify-templates repository
# Usage: ./shopify-theme-deploy.sh <path-to-theme> <theme-name>

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
SHOPIFY_TEMPLATES_REPO="$HOME/Documents/Shopify-Themes"

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
if [ $# -lt 2 ]; then
    print_error "Missing required arguments"
    echo "Usage: $0 <path-to-theme> <theme-name>"
    echo ""
    echo "Example: $0 ~/Desktop/street-canvas/theme street-canvas"
    exit 1
fi

THEME_PATH="$1"
THEME_NAME="$2"

# Normalize theme name (lowercase, hyphens)
THEME_NAME=$(echo "$THEME_NAME" | tr '[:upper:]' '[:lower:]' | tr '_' '-' | tr ' ' '-')

# Validate theme path exists
if [ ! -d "$THEME_PATH" ]; then
    print_error "Theme directory not found: $THEME_PATH"
    exit 1
fi

# Check if this is a valid Shopify theme
if [ ! -d "$THEME_PATH/layout" ] || [ ! -f "$THEME_PATH/layout/theme.liquid" ]; then
    print_error "Invalid Shopify theme: missing layout/theme.liquid"
    echo "Provided path: $THEME_PATH"
    exit 1
fi

print_header "Shopify Theme Deployment: $THEME_NAME"

# Check if shopify-templates repo exists
if [ ! -d "$SHOPIFY_TEMPLATES_REPO" ]; then
    print_warning "Shopify-Themes repository not found at: $SHOPIFY_TEMPLATES_REPO"
    read -p "Create repository at this location? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        mkdir -p "$SHOPIFY_TEMPLATES_REPO"
        cd "$SHOPIFY_TEMPLATES_REPO"
        git init
        print_success "Created Shopify-Themes repository"
    else
        print_error "Cannot proceed without shopify-templates repository"
        exit 1
    fi
fi

DEPLOY_TARGET="$SHOPIFY_TEMPLATES_REPO/$THEME_NAME"

# STEP 1: Validate Theme Structure
print_info "Step 1/8: Validating theme structure..."

REQUIRED_DIRS=(
    "assets"
    "config"
    "layout"
    "locales"
    "sections"
    "snippets"
    "templates"
)

REQUIRED_FILES=(
    "config/settings_schema.json"
    "config/settings_data.json"
    "layout/theme.liquid"
    "locales/en.default.json"
)

validation_errors=0

for dir in "${REQUIRED_DIRS[@]}"; do
    if [ ! -d "$THEME_PATH/$dir" ]; then
        print_error "Missing required directory: $dir"
        ((validation_errors++))
    fi
done

for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$THEME_PATH/$file" ]; then
        print_error "Missing required file: $file"
        ((validation_errors++))
    fi
done

if [ $validation_errors -gt 0 ]; then
    print_error "Theme validation failed with $validation_errors errors"
    exit 1
fi

print_success "Theme structure validated"

# STEP 2: Run Shopify Theme Check
print_info "Step 2/8: Running Shopify theme check..."

if command -v shopify &> /dev/null; then
    cd "$THEME_PATH"
    if shopify theme check --fail-level error; then
        print_success "Shopify theme check passed"
    else
        print_error "Shopify theme check failed"
        read -p "Continue anyway? (y/n) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
else
    print_warning "Shopify CLI not installed - skipping theme check"
    print_info "Install with: npm install -g @shopify/cli"
fi

# STEP 3: Check if Theme Already Exists
print_info "Step 3/8: Checking if theme already exists..."

if [ -d "$DEPLOY_TARGET" ]; then
    print_warning "Theme already exists at: $DEPLOY_TARGET"
    read -p "Overwrite existing theme? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        # Backup existing theme
        BACKUP_DIR="$DEPLOY_TARGET.backup.$(date +%Y%m%d-%H%M%S)"
        mv "$DEPLOY_TARGET" "$BACKUP_DIR"
        print_success "Backed up existing theme to: $BACKUP_DIR"
    else
        print_error "Deployment cancelled"
        exit 1
    fi
fi

# STEP 4: Copy Theme to Shopify-Themes Repo
print_info "Step 4/8: Copying theme to repository..."

mkdir -p "$DEPLOY_TARGET"
cp -r "$THEME_PATH"/* "$DEPLOY_TARGET/"

print_success "Theme copied to: $DEPLOY_TARGET"

# STEP 5: Create Documentation
print_info "Step 5/8: Creating theme documentation..."

mkdir -p "$DEPLOY_TARGET/docs"

# Create theme README
cat > "$DEPLOY_TARGET/README.md" << EOF
# $THEME_NAME

**Shopify Liquid Theme**

## Overview

[Add theme description here]

## Features

- Responsive design (mobile, tablet, desktop)
- Product pages with variants
- Collection pages with filtering
- Cart drawer
- Blog support
- Customer accounts
- SEO optimized
- Accessibility compliant

## Installation

### Option 1: Shopify CLI

\`\`\`bash
# Navigate to theme directory
cd theme/

# Connect to your Shopify store
shopify theme dev --store your-store.myshopify.com

# Or upload directly
shopify theme push --store your-store.myshopify.com
\`\`\`

### Option 2: ZIP Upload

1. Zip the \`theme/\` folder
2. Go to Shopify Admin → Online Store → Themes
3. Click "Add theme" → "Upload ZIP file"
4. Select the zipped theme
5. Preview and publish

## Customization

### Theme Settings

Customize via Shopify Admin → Online Store → Themes → Customize:

- Colors
- Typography
- Layout options
- Section settings

### Sections

Available sections:
- Header
- Footer
- Hero
- Featured Collections
- Featured Products
- Newsletter
- [Add others]

## Pages

This theme includes templates for:
- Home
- Product
- Collection
- Cart
- Search
- Blog
- About
- Contact
- FAQ
- Shipping
- Privacy
- Terms
- [Add others]

## Requirements

- Shopify Plan: Any
- Shopify CLI: 3.0+ (for development)

## Support

For issues or questions, please contact [your email/support link].

## Credits

Designed and developed by [Your Name/Company]

## License

[Specify license]

---

**Generated**: $(date '+%Y-%m-%d')
**Version**: 1.0.0
EOF

print_success "Theme README created"

# Create installation guide
cat > "$DEPLOY_TARGET/docs/INSTALLATION.md" << EOF
# $THEME_NAME - Installation Guide

## Prerequisites

- Shopify store (any plan)
- Shopify CLI installed (optional, for development)

## Installation Steps

### Method 1: Shopify CLI (Recommended)

**Step 1: Install Shopify CLI**
\`\`\`bash
npm install -g @shopify/cli
\`\`\`

**Step 2: Navigate to Theme Directory**
\`\`\`bash
cd theme/
\`\`\`

**Step 3: Connect to Your Store**
\`\`\`bash
shopify theme dev --store your-store.myshopify.com
\`\`\`

This opens a preview at \`http://localhost:9292\`.

**Step 4: Deploy to Shopify**
\`\`\`bash
shopify theme push --store your-store.myshopify.com
\`\`\`

### Method 2: ZIP Upload

**Step 1: Create ZIP File**
\`\`\`bash
cd theme/
zip -r ../$THEME_NAME.zip .
\`\`\`

**Step 2: Upload to Shopify**
1. Log in to Shopify Admin
2. Go to **Online Store** → **Themes**
3. Click **Add theme** → **Upload ZIP file**
4. Select \`$THEME_NAME.zip\`
5. Wait for upload to complete

**Step 3: Preview and Publish**
1. Click **Customize** to preview
2. Make any adjustments
3. Click **Publish** when ready

## Post-Installation Setup

### 1. Configure Theme Settings

Go to **Online Store** → **Themes** → **Customize**:
- Set colors
- Upload logo
- Configure fonts
- Set layout options

### 2. Create Navigation Menus

Go to **Online Store** → **Navigation**:
- Create main menu
- Create footer menu
- Add links to pages

### 3. Create Pages

Go to **Online Store** → **Pages**:
- About
- Contact
- FAQ
- Shipping
- Privacy Policy
- Terms of Service

### 4. Add Products

Go to **Products** → **Add product**:
- Upload product images
- Set pricing
- Add descriptions
- Configure variants (size, color, etc.)

### 5. Create Collections

Go to **Products** → **Collections**:
- Create collections (e.g., "New Arrivals", "Sale", "Tops", "Bottoms")
- Assign products to collections

### 6. Configure Metafields (Optional)

If this theme uses custom metafields:

Go to **Settings** → **Custom data** → **Products**:
- Add required metafield definitions
- Examples: size, color, material, condition, era

### 7. Test Checkout Flow

1. Add product to cart
2. Proceed to checkout
3. Complete test order (use Shopify's test mode)

## Troubleshooting

### Theme Not Appearing
- Ensure ZIP file contains theme files at root level (not nested in folder)
- Check Shopify theme check for errors: \`shopify theme check\`

### Styles Not Loading
- Clear browser cache
- Check that CSS files are in \`assets/\` directory
- Verify \`theme.liquid\` loads stylesheets correctly

### Sections Not Showing
- Check that section files are in \`sections/\` directory
- Ensure \`{% schema %}\` block is present in section files

## Support

For installation issues, contact [support email/link].

---

**Last Updated**: $(date '+%Y-%m-%d')
EOF

print_success "Installation guide created"

# STEP 6: Generate Screenshots Placeholder
print_info "Step 6/8: Creating screenshots placeholder..."

mkdir -p "$DEPLOY_TARGET/screenshots"

cat > "$DEPLOY_TARGET/screenshots/README.md" << EOF
# Theme Screenshots

Add theme screenshots here for the gallery.

Recommended screenshots:
1. \`homepage.png\` - Homepage view
2. \`collection.png\` - Collection page
3. \`product.png\` - Product page
4. \`cart.png\` - Cart drawer/page
5. \`mobile.png\` - Mobile view

Recommended size: 1200x800px
EOF

print_success "Screenshots placeholder created"

# STEP 7: Update Main Repository README
print_info "Step 7/8: Updating repository README..."

# Check if main README exists
if [ ! -f "$SHOPIFY_TEMPLATES_REPO/README.md" ]; then
    # Create new README with gallery
    cat > "$SHOPIFY_TEMPLATES_REPO/README.md" << 'EOF'
# Shopify Theme Templates

Collection of custom Shopify themes.

## Themes

EOF
fi

# Check if theme already in README
if ! grep -q "$THEME_NAME" "$SHOPIFY_TEMPLATES_REPO/README.md"; then
    # Add theme to README
    cat >> "$SHOPIFY_TEMPLATES_REPO/README.md" << EOF

### $THEME_NAME

[Add description]

**Features:**
- [Feature 1]
- [Feature 2]
- [Feature 3]

**[View Theme](./$THEME_NAME/)** | **[Documentation](./$THEME_NAME/README.md)**

---
EOF
    print_success "Added theme to repository README"
else
    print_info "Theme already exists in README"
fi

# STEP 8: Commit to Git
print_info "Step 8/8: Committing to git..."

cd "$SHOPIFY_TEMPLATES_REPO"

# Check if git repo
if [ ! -d ".git" ]; then
    git init
    print_success "Initialized git repository"
fi

# Stage changes
git add .

# Create commit
git commit -m "Add $THEME_NAME theme

- Shopify Liquid theme
- Includes all required templates
- Documentation and installation guide
- Deployed on $(date '+%Y-%m-%d')
" || print_warning "No changes to commit (theme may already be committed)"

print_success "Changes committed to git"

# DEPLOYMENT SUMMARY
print_header "Deployment Complete!"
echo ""
print_success "Theme deployed successfully"
echo ""
print_info "Deployment Summary:"
echo "  Theme Name: $THEME_NAME"
echo "  Location: $DEPLOY_TARGET"
echo "  Repository: $SHOPIFY_TEMPLATES_REPO"
echo ""
print_info "Next Steps:"
echo "  1. Add screenshots to: $DEPLOY_TARGET/screenshots/"
echo "  2. Update README with theme description"
echo "  3. Test theme installation (ZIP or CLI)"
echo "  4. Update repository README gallery"
echo ""
print_info "To upload theme to Shopify:"
echo "  $ cd $DEPLOY_TARGET"
echo "  $ shopify theme push --store your-store.myshopify.com"
echo ""
print_success "Done!"
