# Shopify Theme Configuration - Forgotten Essentials

## Configuration Overview

This document describes the configuration files and structure for the Forgotten Essentials Shopify theme. All configuration work has been completed by the CONFIG AGENT.

## Directory Structure

```
theme/
├── assets/              # Static assets (CSS, JS, images)
│   ├── base.css        # Base styles and resets
│   ├── theme.css       # Component-specific styles
│   ├── constants.js    # JavaScript constants and product forms
│   ├── global.js       # Global JavaScript utilities
│   └── pubsub.js       # Publish/Subscribe pattern for cart
├── config/             # Theme configuration
│   ├── settings_schema.json  # Theme customization UI
│   └── settings_data.json    # Default theme settings
├── layout/             # Main layout files
│   └── theme.liquid    # Primary theme layout
├── locales/            # Translation files
│   └── en.default.json # English translations
├── sections/           # Reusable page sections
├── snippets/           # Reusable code snippets
│   └── meta-tags.liquid # SEO meta tags
└── templates/          # Page templates
    └── customers/      # Customer account templates
```

## Core Configuration Files

### 1. layout/theme.liquid

**Purpose**: Main layout wrapper for all pages

**Features**:
- Standard HTML5 document structure
- Dynamic CSS variables from theme settings
- Meta tags for SEO and social media
- Favicon support
- Font loading (supports Shopify CDN fonts)
- Asset references (CSS and JavaScript)
- Sections rendering with header-group and footer-group
- Cart drawer support
- JavaScript constants for cart functionality
- Accessibility features

**Key Liquid Tags**:
- `{{ content_for_header }}` - Shopify required scripts
- `{{ content_for_layout }}` - Page content injection
- `{% sections 'header-group' %}` - Header section group
- `{% sections 'footer-group' %}` - Footer section group
- `{% render 'meta-tags' %}` - SEO meta tags

### 2. config/settings_schema.json

**Purpose**: Defines the theme customization interface in Shopify admin

**Settings Groups**:

#### Colors
- Text color (default: #000000 - black)
- Background 1 (default: #FFFFFF - white)
- Background 2 (default: #F5F5F5 - cream)
- Solid button labels (default: #FFFFFF)
- Outline button labels (default: #000000)
- Accent 1 (default: #000000 - primary accent)
- Accent 2 (default: #D20000 - red accent)

#### Typography
- Header font picker
- Body font picker
- Body font scale (90-120%)
- Heading font scale (100-150%)

#### Layout
- Page width (1000-1600px, default: 1200px)
- Section spacing (0-100px, default: 60px)
- Grid horizontal spacing (4-40px, default: 16px)
- Grid vertical spacing (4-40px, default: 16px)

#### Borders & Corners
- Border thickness (0-5px, default: 2px)
- Border style (solid/dashed/dotted, default: solid)
- Corner radius (0-20px, default: 0px)

#### Product Cards
- Text alignment (left/center/right)
- Corner radius (0-40px, default: 0px)
- Border thickness (0-5px, default: 2px)
- Border opacity (0-100%, default: 100%)
- Image padding (0-20px, default: 0px)
- Shadow controls (all default: 0 for no shadows)

#### Buttons
- Corner radius (0-40px, default: 0px)
- Border thickness (0-5px, default: 2px)
- Border opacity (0-100%, default: 100%)
- Shadow controls (all default: 0)

#### Form Inputs
- Corner radius (0-40px, default: 0px)
- Border thickness (0-5px, default: 2px)
- Border opacity (0-100%, default: 100%)
- Shadow controls (all default: 0)

#### Variant Pills
- Corner radius (0-40px, default: 0px)
- Border thickness (0-5px, default: 2px)
- Border opacity (0-100%, default: 100%)
- Shadow controls (all default: 0)

#### Text Boxes
- Border thickness (0-5px, default: 2px)
- Border opacity (0-100%, default: 100%)
- Corner radius (0-40px, default: 0px)
- Shadow controls (all default: 0)

#### Animations
- Hover effects (none/fade/underline/scale, default: none)

#### Cart
- Cart type (drawer/page/notification, default: drawer)

#### Search
- Predictive search enabled (default: true)
- Show vendor (default: false)
- Show price (default: true)

#### Social Media
- Facebook link
- Instagram link
- Twitter/X link
- TikTok link
- Pinterest link
- YouTube link

#### Favicon
- Favicon image picker (recommended: 32x32px .png)

### 3. config/settings_data.json

**Purpose**: Stores the actual theme setting values

**Grungy Aesthetic Defaults**:
- **Colors**: Black/white/red color scheme
- **Borders**: 2px solid borders everywhere
- **Corners**: 0px radius (sharp, angular)
- **Shadows**: None (0 opacity on all shadows)
- **Fonts**: Arial/Helvetica sans-serif
- **Cart**: Drawer type
- **Layout**: 1200px max width

**Key Settings**:
```json
{
  "colors_text": "#000000",
  "colors_background_1": "#ffffff",
  "colors_background_2": "#f5f5f5",
  "colors_accent_2": "#d20000",
  "border_thickness": 2,
  "border_radius": 0,
  "buttons_radius": 0,
  "card_shadow_opacity": 0
}
```

### 4. locales/en.default.json

**Purpose**: English translation strings for all theme text

**Sections**:
- `general` - Common UI text, accessibility, pagination
- `sections` - Section-specific text (header, cart, footer)
- `products` - Product page text, facets, pricing
- `templates` - Template-specific text (404, search, contact)
- `customer` - Customer account text
- `gift_cards` - Gift card text
- `date_formats` - Date formatting

**Usage in Liquid**:
```liquid
{{ 'products.product.add_to_cart' | t }}
{{ 'sections.cart.title' | t }}
```

## JavaScript Assets

### assets/constants.js

**Purpose**: Core JavaScript constants and product form handling

**Features**:
- Debounce timer constant
- PubSub event definitions
- Product form custom element
- Add to cart functionality
- Error message handling
- Fetch configuration helper

**Key Functions**:
- `fetchConfig(type)` - Returns fetch configuration object
- Product form submit handling
- Cart integration

### assets/pubsub.js

**Purpose**: Publish/Subscribe pattern implementation

**Features**:
- Event subscription
- Event publishing
- Unsubscribe functionality

**Usage**:
```javascript
// Subscribe to cart updates
subscribe('cart-update', (data) => {
  // Handle cart update
});

// Publish cart update event
publish('cart-update', cartData);
```

### assets/global.js

**Purpose**: Global utilities and custom elements

**Features**:
- Focus management (`trapFocus`, `removeTrapFocus`)
- Focus-visible polyfill
- Keyboard navigation helpers
- Quantity input component
- Menu drawer component
- Header drawer component
- Modal dialog component
- Deferred media loading
- Media pause utilities

**Custom Elements**:
- `<quantity-input>` - Quantity selector with +/- buttons
- `<menu-drawer>` - Mobile menu drawer
- `<header-drawer>` - Header-specific drawer
- `<modal-dialog>` - Modal/popup dialog
- `<modal-opener>` - Button to open modals
- `<deferred-media>` - Lazy-load videos/media

## CSS Assets

### assets/base.css

**Purpose**: Base styles, resets, and foundational CSS

**Features**:
- CSS custom properties (CSS variables)
- Box model reset
- Typography base styles
- Layout utilities (`.page-width`, `.section-spacing`)
- Button base styles
- Form element styles
- Image defaults
- Accessibility helpers (`.visually-hidden`)
- Focus states
- Selection styles
- Scrollbar styling
- Loading states and spinners
- Grid system (2, 3, 4 column grids)
- Responsive utilities
- Text alignment utilities

**CSS Variables Set**:
```css
--font-body-family
--font-heading-family
--color-base-text
--color-base-background-1
--color-base-background-2
--color-base-accent-1
--color-base-accent-2
--border-width
--border-style
--border-radius
--page-width
```

**Key Classes**:
- `.button` - Primary button style
- `.button--secondary` - Secondary button style
- `.page-width` - Max width content container
- `.section-spacing` - Section vertical padding
- `.grid` - CSS Grid container
- `.visually-hidden` - Screen reader only text
- `.loading` - Loading state

### assets/theme.css

**Purpose**: Component-specific theme styles

**Current Content**:
- CSS variables for colors
- Button variants (`.btn-primary`, `.btn-secondary`)
- Section headers (`.section-header`)
- Product grid layout (`.products-grid`)

**To Be Added by CSS Agent**:
- Header component styles
- Footer component styles
- Product card styles
- Cart drawer styles
- Hero section styles
- About page styles

## Snippets

### snippets/meta-tags.liquid

**Purpose**: SEO and social media meta tags

**Features**:
- Open Graph (Facebook) meta tags
- Twitter Card meta tags
- Dynamic page title and description
- Page image support
- Canonical URL

**Usage in theme.liquid**:
```liquid
{% render 'meta-tags' %}
```

## Theme Settings Access in Liquid

**Accessing Color Settings**:
```liquid
{{ settings.colors_text }}
{{ settings.colors_accent_2 }}
```

**Accessing Typography Settings**:
```liquid
{{ settings.type_body_font }}
{{ settings.body_scale }}
```

**Accessing Layout Settings**:
```liquid
{{ settings.page_width }}
{{ settings.border_thickness }}
```

**Example Usage**:
```liquid
<div style="border: {{ settings.border_thickness }}px solid {{ settings.colors_text }}">
  Content
</div>
```

## CSS Custom Properties in Liquid

Theme.liquid dynamically generates CSS variables from settings:

```liquid
{% style %}
  :root {
    --color-base-text: {{ settings.colors_text.red }}, {{ settings.colors_text.green }}, {{ settings.colors_text.blue }};
    --border-width: {{ settings.border_thickness }}px;
    --border-radius: {{ settings.border_radius }}px;
  }
{% endstyle %}
```

**Usage in CSS**:
```css
.element {
  color: rgb(var(--color-base-text));
  border-width: var(--border-width);
  border-radius: var(--border-radius);
}
```

## Grungy Aesthetic Design Tokens

**Core Design Principles**:
1. **Bold Borders**: 2px solid black borders on everything
2. **Sharp Corners**: 0px border-radius for angular look
3. **High Contrast**: Black text on white background
4. **No Shadows**: Flat design, no box shadows
5. **Simple Fonts**: Arial/Helvetica sans-serif
6. **Red Accent**: #D20000 for emphasis and calls-to-action
7. **Minimal Animation**: No hover effects by default

**Design Token Values**:
```
Border Thickness: 2px
Border Style: solid
Border Radius: 0px
Text Color: #000000
Background: #FFFFFF
Secondary BG: #F5F5F5
Accent: #D20000
Font Family: Arial, Helvetica, sans-serif
Shadow Opacity: 0
```

## Development Workflow

### Local Development

1. **Install Shopify CLI**:
```bash
npm install -g @shopify/cli @shopify/theme
```

2. **Connect to Store**:
```bash
shopify theme dev --store your-store.myshopify.com
```

3. **Live Preview**:
The CLI provides a local development URL with live reload.

### Theme Deployment

1. **Push to Shopify**:
```bash
shopify theme push --store your-store.myshopify.com
```

2. **Publish Theme**:
Go to Shopify admin > Online Store > Themes > Publish

### Theme Validation

```bash
shopify theme check
```

Checks for:
- Liquid syntax errors
- Performance issues
- Accessibility problems
- Best practice violations

## Configuration Best Practices

1. **Always use theme settings** for colors, fonts, and layout values
2. **Use CSS variables** for dynamic styling
3. **Keep settings_schema.json organized** with clear labels and info text
4. **Provide sensible defaults** in settings_data.json
5. **Document all custom properties** with comments
6. **Test theme settings** in Shopify admin customizer
7. **Validate Liquid syntax** before deployment

## Troubleshooting

### Theme Not Loading
- Check that `layout/theme.liquid` exists
- Verify all asset references use `{{ 'file.css' | asset_url }}`
- Ensure `{{ content_for_header }}` is present

### Settings Not Appearing
- Validate JSON syntax in `settings_schema.json`
- Check that setting IDs are unique
- Verify setting types are valid

### CSS Not Applying
- Ensure CSS files are in `assets/` directory
- Check stylesheet_tag is in theme.liquid
- Verify CSS variable names match between Liquid and CSS

### JavaScript Errors
- Check browser console for errors
- Verify all script tags use `defer="defer"`
- Ensure custom elements are defined before use

## Additional Resources

- [Shopify Theme Documentation](https://shopify.dev/docs/themes)
- [Liquid Language Reference](https://shopify.dev/docs/api/liquid)
- [Theme Settings Schema](https://shopify.dev/docs/themes/architecture/config/settings-schema-json)
- [Shopify CLI](https://shopify.dev/docs/themes/tools/cli)

## Configuration Checklist

- [x] Create theme folder structure
- [x] Create layout/theme.liquid
- [x] Create config/settings_schema.json with grungy aesthetic defaults
- [x] Create config/settings_data.json with default values
- [x] Create locales/en.default.json with translation strings
- [x] Create assets/constants.js for product forms
- [x] Create assets/pubsub.js for event handling
- [x] Create assets/global.js for utilities
- [x] Create assets/base.css with base styles
- [x] Create snippets/meta-tags.liquid for SEO
- [x] Document configuration in README files

## Next Steps for Other Agents

The configuration foundation is complete. Other agents should now:

1. **TEMPLATE AGENT**: Create all template files in `templates/`
2. **SECTION AGENT**: Create section files in `sections/`
3. **SNIPPET AGENT**: Create snippet files in `snippets/`
4. **CSS AGENT**: Populate `assets/theme.css` with component styles from React

All agents should reference this configuration documentation and follow the established design tokens for the grungy aesthetic.
