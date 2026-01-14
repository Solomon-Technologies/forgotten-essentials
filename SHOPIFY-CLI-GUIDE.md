# Shopify CLI Integration Guide

**Project**: Forgotten Essentials Theme
**Shopify CLI Version**: 3.88.1
**Setup Date**: January 13, 2026

---

## 🚀 Quick Start - Your New Slash Commands

You now have three custom Claude Code slash commands for Shopify:

### `/shopifypush` - Push Changes to Shopify
Uploads your local theme changes to Shopify.

**Usage:**
```
/shopifypush              # Push to development theme
/shopifypush --prod       # Push to production (live) theme
```

**What it does:**
- Navigates to `/theme` directory
- Runs `shopify theme push`
- Shows preview URL
- Syncs all local changes to Shopify

---

### `/shopifydev` - Start Development Server
Starts a live development server with hot reload.

**Usage:**
```
/shopifydev
```

**What it does:**
- Creates a development theme in Shopify
- Starts local server with file watching
- Opens preview URL in browser
- Auto-syncs changes as you edit files
- **Perfect for testing!**

---

### `/shopifypull` - Pull Changes from Shopify
Downloads theme changes from Shopify to your local machine.

**Usage:**
```
/shopifypull              # Pull from development theme
/shopifypull --live       # Pull from live (production) theme
```

**What it does:**
- Downloads latest theme files from Shopify
- Shows what changed
- Useful after owner makes changes in Theme Editor

---

## 🔐 First-Time Setup (One-Time Authentication)

The **first time** you use any Shopify command, you'll need to authenticate:

### Step 1: Run Your First Command
```
/shopifydev
```
or
```
/shopifypush
```

### Step 2: CLI Will Prompt You
You'll see something like:
```
? Which store would you like to use?
  > Log in to a store
    Create a new store
```

Select **"Log in to a store"**

### Step 3: Browser Opens
- Shopify CLI will open your browser
- Log into your Shopify admin
- Grant permission to Shopify CLI
- Browser will say "Success! Return to terminal"

### Step 4: Select Your Store
Back in the terminal:
```
? Which store?
  > yourstore.myshopify.com
```

**Done!** Shopify CLI is now authenticated and will remember your store.

---

## 📋 Common Workflows

### Workflow 1: Testing Changes Locally (Recommended)

1. **Make changes** to theme files
2. **Start dev server:**
   ```
   /shopifydev
   ```
3. **Preview changes** at the URL provided
4. **Make more edits** - they auto-sync!
5. **When happy, commit:**
   ```
   /commit-push-pr "Add new feature"
   ```

**Tip:** Press `Ctrl+C` to stop the dev server when done.

---

### Workflow 2: Quick Push to Development Theme

1. **Make changes** to theme files
2. **Push to dev theme:**
   ```
   /shopifypush
   ```
3. **Get preview URL** - test your changes
4. **Iterate** as needed

---

### Workflow 3: Deploy to Production

1. **Test thoroughly** using `/shopifydev` or `/shopifypush`
2. **Commit your changes:**
   ```
   /commit-push-pr "Ready for production"
   ```
3. **Push to production:**
   ```
   /shopifypush --prod
   ```
4. **Confirm** when prompted (this affects live site!)

---

### Workflow 4: Sync After Owner Makes Changes

If the store owner makes changes in Shopify Theme Editor:

1. **Pull their changes:**
   ```
   /shopifypull --live
   ```
2. **Review what changed:**
   ```
   git diff
   ```
3. **Commit if good:**
   ```
   /commit-push-pr "Sync owner changes from Shopify"
   ```

---

## 🛠️ Manual Shopify CLI Commands

If you prefer using CLI directly without slash commands:

### Navigate to theme folder first:
```bash
cd theme
```

### List all themes in your store:
```bash
shopify theme list
```

### Push to development theme:
```bash
shopify theme push
```

### Push to specific theme by ID:
```bash
shopify theme push --theme=123456789
```

### Start development server:
```bash
shopify theme dev
```

### Pull from live theme:
```bash
shopify theme pull --live
```

### Pull specific theme by ID:
```bash
shopify theme pull --theme=123456789
```

### Publish a theme (make it live):
```bash
shopify theme publish --theme=123456789
```

---

## 🎯 Pro Tips

### 1. Always Use Development Themes for Testing
- Never test directly on the live theme
- Development themes are sandboxed
- Get a unique preview URL for each dev theme

### 2. Commit Before Pulling
Before running `/shopifypull`, commit your local changes:
```bash
git add .
git commit -m "Save local work before pull"
```
This prevents losing work if pull overwrites files.

### 3. Use Theme IDs for Precision
Get theme IDs with:
```bash
cd theme && shopify theme list
```

Then target specific themes:
```bash
shopify theme push --theme=123456789
```

### 4. Preview URLs Don't Expire
Development theme preview URLs work until you delete the theme.
Share them with clients for feedback!

### 5. File Watching is Selective
The dev server watches:
- `.liquid` files
- `.css` files
- `.js` files
- `.json` files

It ignores:
- `node_modules/`
- `.git/`
- Hidden files

---

## ⚠️ Important Notes

### Development vs Production
- **Development themes**: Safe to experiment, not visible to customers
- **Production/Live theme**: What customers see - be careful!

### File Deletions
By default, `shopify theme push` can delete files.
To prevent deletions:
```bash
shopify theme push --nodelete
```

### Theme Editor Changes
If owner makes changes via Shopify Theme Editor:
- Those changes exist in Shopify, not locally
- Use `/shopifypull --live` to sync them down
- Always review and commit pulled changes

### Multiple Developers
If multiple people work on the theme:
1. Always pull before starting work
2. Push frequently to avoid conflicts
3. Use development themes (not live) during development
4. Coordinate production deployments

---

## 🔍 Troubleshooting

### "Command not found: shopify"
Shopify CLI isn't installed. Run:
```bash
npm install -g @shopify/cli @shopify/theme
```

### "Not logged in to Shopify"
Run any Shopify command and it will prompt authentication:
```
/shopifydev
```
Follow the browser login flow.

### "Theme not found"
Make sure you're in the `/theme` directory:
```bash
cd theme
```
Or use slash commands which auto-navigate.

### "Permission denied"
You need Theme Access permissions in Shopify.
Ask the store owner to:
1. Go to Shopify Admin → Apps
2. Install "Theme Access" app
3. Generate a password
4. Share it with you

Alternatively, they can add you as a staff member with theme permissions.

### Changes Not Appearing
1. **Clear cache** - Hard refresh browser (Ctrl+Shift+R)
2. **Check dev server is running** - Should see file watch output
3. **Verify file saved** - CLI only syncs saved files
4. **Check syntax errors** - Liquid errors prevent upload

---

## 📚 Additional Resources

### Shopify CLI Documentation:
- Official docs: https://shopify.dev/docs/themes/tools/cli
- Command reference: https://shopify.dev/docs/api/shopify-cli/theme

### Theme Development:
- Liquid reference: https://shopify.dev/docs/api/liquid
- Theme architecture: https://shopify.dev/docs/themes/architecture
- Best practices: https://shopify.dev/docs/themes/best-practices

---

## 📝 Your Custom Commands Reference

All three slash commands are in `.claude/commands/`:

- **shopifypush.md** - Push to Shopify
- **shopifydev.md** - Start dev server
- **shopifypull.md** - Pull from Shopify

You can edit these files to customize behavior!

---

## 🎉 You're All Set!

Try your first command:
```
/shopifydev
```

This will:
1. Authenticate (first time only)
2. Upload your theme as a dev theme
3. Give you a preview URL
4. Start watching for changes

**Happy developing!** 🚀
