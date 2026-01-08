# Shopify Theme Setup - Forgotten Essentials

## Overview
This document describes the Shopify theme structure and asset compilation workflow for converting the React-based Forgotten Essentials website into a Shopify Liquid theme.

## Theme Structure

The Shopify theme has been organized in the `theme/` directory with the following structure:

```
theme/
├── assets/           # CSS, JS, images, fonts
├── config/           # Theme settings configuration
├── layout/           # Main theme layout files
├── locales/          # Translation files
├── sections/         # Reusable page sections
├── snippets/         # Reusable code snippets
└── templates/        # Page templates
    └── customers/    # Customer account templates
```

## Core Configuration Files

### 1. layout/theme.liquid
The main layout file that wraps all pages. It includes:
- HTML document structure
- Meta tags and SEO
- CSS and JavaScript asset loading
- Header and footer section groups
- Cart drawer integration
- Shopify required scripts and variables

### 2. config/settings_schema.json
Defines the theme customization interface in the Shopify admin. Includes settings for:
- **Colors**: Text, backgrounds, accents (black/white/red palette)
- **Typography**: Font selection and sizing
- **Layout**: Page width and spacing
- **Borders & Corners**: 2px solid borders, 0px radius for grungy aesthetic
- **Product Cards**: Card styling and appearance
- **Buttons**: Sharp, angular button styling
- **Form Inputs**: Input field styling
- **Animations**: Hover effects
- **Cart**: Cart type (drawer/page/notification)
- **Search**: Predictive search settings
- **Social Media**: Social media links

### 3. config/settings_data.json
Contains the default theme settings values:
- Black text (#000000)
- White background (#FFFFFF)
- Cream secondary background (#F5F5F5)
- Red accent (#D20000)
- 2px borders everywhere (no border radius for sharp edges)
- No shadows or rounded corners
- Drawer cart enabled

### 4. locales/en.default.json
Translation strings for all theme text, including:
- General accessibility and UI text
- Product and cart strings
- Customer account text
- Form labels and messages
- Error messages

## Required Assets

The following JavaScript files are essential for theme functionality:

### assets/constants.js
- Defines product form handling
- Cart add-to-cart functionality
- Error message handling
- Fetch configuration utilities

### assets/pubsub.js
- Publish/Subscribe pattern for cart updates
- Event management system

### assets/global.js
- Focus management utilities
- Menu drawer functionality
- Modal dialog handling
- Quantity input component
- Deferred media loading
- Keyboard navigation helpers

### CSS Files (To Be Created)
- `assets/base.css` - Base styles and resets
- `assets/theme.css` - Main theme styles converted from React components

## Asset Compilation Workflow

### Current Setup (React + Vite)
- Source: `src/` directory with React components
- Build tool: Vite
- Output: Bundled JavaScript and CSS

### Target Shopify Setup

#### Option 1: Manual CSS Conversion (Recommended for this project)
Since the design is complete, convert React CSS to static Shopify CSS:

1. **Extract CSS from React components**
   - Combine all CSS files from `src/components/` and `src/pages/`
   - Remove React-specific class naming
   - Convert to standard CSS that works with Liquid

2. **Create theme CSS files**
   - `theme/assets/base.css` - Global styles from `App.css`
   - `theme/assets/theme.css` - Component styles combined

3. **Image assets**
   - Copy images from `public/` to `theme/assets/`
   - Update image references in Liquid files

#### Option 2: Automated Build Pipeline
For ongoing development:

1. **Install Shopify CLI**
   ```bash
   npm install -g @shopify/cli @shopify/theme
   ```

2. **Use Shopify Theme CLI**
   ```bash
   shopify theme dev
   ```

3. **Asset compilation with Vite (optional)**
   - Configure Vite to output to `theme/assets/`
   - Use Shopify CLI to watch and upload changes

## Design Requirements (Grungy Aesthetic)

### Key Design Principles
- **Font**: Arial/Helvetica sans-serif only
- **Borders**: 2px solid black borders everywhere
- **Corners**: 0px border-radius (sharp, angular)
- **Colors**:
  - Black (#000000) for text and borders
  - White (#FFFFFF) for backgrounds
  - Cream (#F5F5F5) for alternate backgrounds
  - Red (#D20000) for accents
- **Shadows**: None (no box shadows)
- **Transitions**: Minimal to none

### CSS Variables in theme.liquid
The theme.liquid file automatically generates CSS custom properties from theme settings:
- `--font-body-family`
- `--color-base-text`
- `--border-width` (set to 2px)
- `--border-radius` (set to 0px)
- And many more...

## Next Steps for Other Agents

### TEMPLATE AGENT
Create template files in `theme/templates/`:
- `index.liquid` - Homepage
- `collection.liquid` - Shop/collection page
- `product.liquid` - Product detail page
- `page.about.liquid` - About page
- `cart.liquid` - Cart page
- `404.liquid` - Error page

### SECTION AGENT
Create section files in `theme/sections/`:
- `header.liquid` - Site header with logo and navigation
- `footer.liquid` - Site footer
- `hero.liquid` - Homepage hero section
- `featured-collection.liquid` - Product grid
- `product-main.liquid` - Product details
- `cart-drawer.liquid` - Drawer cart

### SNIPPET AGENT
Create snippet files in `theme/snippets/`:
- `product-card.liquid` - Product card component
- `cart-drawer.liquid` - Cart drawer UI
- `icon-cart.liquid` - SVG icons
- `price.liquid` - Price formatting

### CSS AGENT
Create CSS files in `theme/assets/`:
1. Extract and combine all CSS from React components
2. Create `base.css` with global styles
3. Create `theme.css` with component styles
4. Ensure all styles match the grungy aesthetic:
   - 2px borders
   - No border-radius
   - Black/white/red color scheme
   - Arial font family

## Testing the Theme

### Local Development
```bash
# Navigate to theme directory
cd theme

# Start Shopify CLI
shopify theme dev --store your-store.myshopify.com
```

### Upload to Shopify
```bash
# Upload theme to Shopify
shopify theme push --store your-store.myshopify.com
```

### Theme Validation
```bash
# Check for theme issues
shopify theme check
```

## Important Notes

1. **Liquid Template Language**: All HTML must use Liquid syntax for dynamic content
2. **Asset URLs**: Use `{{ 'filename' | asset_url }}` for all asset references
3. **Image URLs**: Use `{{ image | image_url: width: 800 }}` for responsive images
4. **Settings Access**: Use `{{ settings.setting_name }}` to access theme settings
5. **Section Rendering**: Use `{% section 'section-name' %}` to render sections
6. **Cart Integration**: Shopify handles cart functionality - use their AJAX API

## File Naming Conventions

- **Liquid files**: Use kebab-case (e.g., `product-card.liquid`)
- **CSS files**: Use kebab-case (e.g., `product-card.css`)
- **JavaScript files**: Use kebab-case (e.g., `cart-drawer.js`)
- **Images**: Use descriptive names (e.g., `logo-forgotten-essentials.jpg`)

## Additional Resources

- [Shopify Theme Documentation](https://shopify.dev/docs/themes)
- [Liquid Template Language](https://shopify.dev/docs/api/liquid)
- [Theme Settings](https://shopify.dev/docs/themes/architecture/config/settings-schema-json)
- [Shopify CLI](https://shopify.dev/docs/themes/tools/cli)
