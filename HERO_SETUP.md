# Hero Section Setup Guide

This guide explains how to set up and manage the hero section of your Forgotten Essentials store through Shopify Admin.

## Overview

The hero section is the large banner at the top of your homepage. You can customize:
- Hero image
- Title text
- Description text
- Label text (e.g., "New Arrivals")
- Button text and links

## One-Time Setup in Shopify Admin

### Step 1: Create the Metaobject Definition

1. Log in to your Shopify Admin
2. Go to **Settings** → **Custom data**
3. Click **Metaobjects** in the sidebar
4. Click **Add definition**
5. Set the following:
   - **Name**: `Hero Section`
   - **Type**: `hero_section` (this will be auto-generated)

### Step 2: Add Fields to the Definition

Add the following fields to your hero_section metaobject:

| Field Name | Key | Type | Required | Description |
|------------|-----|------|----------|-------------|
| Image | `image` | File | Yes | The main hero image |
| Title | `title` | Single line text | Yes | Main headline (e.g., "Shop by Style") |
| Description | `description` | Multi-line text | Yes | Supporting text below the title |
| Label | `label` | Single line text | No | Small label above title (e.g., "New Arrivals") |
| Primary Button Text | `primary_button_text` | Single line text | No | Text for main button (e.g., "Shop Now") |
| Primary Button Link | `primary_button_link` | Single line text | No | URL for main button (e.g., "/shop") |
| Secondary Button Text | `secondary_button_text` | Single line text | No | Text for second button (e.g., "Collections") |
| Secondary Button Link | `secondary_button_link` | Single line text | No | URL for second button (e.g., "/collections") |

### Step 3: Create Your Hero Content

1. After saving the definition, click **Add entry** on the hero_section page
2. Fill in all the fields:
   - **Image**: Upload your hero image (recommended size: 1920x1080px or larger)
   - **Title**: Your main headline
   - **Description**: Your supporting text
   - **Label**: Small text above title (optional)
   - **Primary Button Text**: e.g., "Shop Now"
   - **Primary Button Link**: e.g., "/shop"
   - **Secondary Button Text**: e.g., "Collections"
   - **Secondary Button Link**: e.g., "/collections"
3. Click **Save**

**Important**: Only create ONE hero section entry. The system will use the first entry it finds.

## Managing Your Hero Section

### To Update the Hero Content

1. Go to **Settings** → **Custom data** → **Metaobjects**
2. Click **Hero Section**
3. Click on your existing hero entry
4. Update any fields you want to change
5. Click **Save**
6. Changes will appear on your website immediately

### Image Guidelines

- **Recommended size**: 1920x1080px or larger for best quality
- **Format**: JPG, PNG, or WebP
- **Orientation**: Landscape (horizontal)
- **Subject placement**: Keep important elements centered or on the left side (text appears on the left)

### Button Links

Button links can be:
- Internal paths: `/shop`, `/collections`, `/about`
- External URLs: `https://example.com`
- Collection pages: `/shop?category=jackets`

## Troubleshooting

### Hero section not appearing
- Make sure you've created exactly ONE hero_section entry
- Verify all required fields are filled in
- Check that the metaobject type is exactly `hero_section` (no spaces)

### Image not displaying
- Ensure the image uploaded successfully in Shopify
- Try uploading a different image format (JPG or PNG)
- Check that the image file isn't corrupted

### Changes not showing
- Hard refresh your browser (Ctrl+Shift+R on Windows, Cmd+Shift+R on Mac)
- Clear your browser cache
- Wait 1-2 minutes for changes to propagate

## Preview Mode

If you haven't set up the hero section yet, the site will display default content in preview mode. Once you create your hero_section metaobject in Shopify, it will automatically replace the preview content.

## Need Help?

If you're having trouble setting up your hero section:
1. Double-check that field keys match exactly (they're case-sensitive)
2. Ensure you only have ONE hero_section entry
3. Verify your Shopify Storefront API credentials are configured
4. Check the browser console for any error messages
