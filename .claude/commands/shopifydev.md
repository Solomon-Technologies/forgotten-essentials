---
description: Start Shopify theme development server with hot reload
allowed-tools: Bash(shopify:*), Bash(cd:*)
argument-hint: none
---

# Shopify Theme Dev Server

Start a local development server with hot reload for your Shopify theme.

## Current Directory
!`pwd`

---

## Instructions

1. **Navigate to theme directory**
   ```bash
   cd theme
   ```

2. **Start development server**
   ```bash
   shopify theme dev
   ```

3. **What this does**
   - Uploads theme to Shopify as a development theme
   - Starts local server with hot reload
   - Opens preview URL in browser
   - Watches for file changes and auto-uploads

4. **Authentication**
   - If first time, will prompt for Shopify login
   - Follow browser authentication flow

5. **Development workflow**
   - Server runs in foreground
   - Make changes to files in `/theme` directory
   - Changes automatically sync to Shopify
   - Refresh browser to see updates

## Preview URL
Once started, you'll get a preview URL like:
`https://yourstore.myshopify.com/?preview_theme_id=XXXXX`

## To Stop
Press `Ctrl+C` in the terminal

## Notes
- This creates a temporary development theme
- Changes are live but not published to customers
- Perfect for testing before pushing to production
