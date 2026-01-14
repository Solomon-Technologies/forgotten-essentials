---
description: Push theme changes to Shopify store (development or production)
allowed-tools: Bash(shopify:*), Bash(cd:*), Bash(git:*)
argument-hint: [optional: --prod for production, default is dev]
---

# Shopify Theme Push Command

Push your local theme changes to Shopify.

## Current Working Directory
!`pwd`

## Git Status
!`git status --short`

## Last Commit
!`git log -1 --oneline`

---

## Instructions

1. **Check if in theme directory**
   - If not in `/theme` folder, navigate there first

2. **Determine push target**
   - If `$ARGUMENTS` contains `--prod` or `production`: Push to production theme
   - Otherwise: Push to development theme (default)

3. **Run Shopify CLI push**
   ```bash
   cd theme
   shopify theme push
   ```

   For production:
   ```bash
   cd theme
   shopify theme push --theme=<theme-id>
   ```

4. **Authentication**
   - If first time, Shopify CLI will prompt to authenticate
   - Follow the browser login flow
   - Store will be saved for future pushes

5. **Show result**
   - Display push summary
   - Show preview URL
   - Confirm what was pushed

## Notes
- Development pushes are non-destructive (creates dev theme)
- Production pushes require confirmation
- Use `--nodelete` flag to prevent file deletions
- Theme files must be in `/theme` directory
