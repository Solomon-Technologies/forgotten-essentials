---
description: Pull theme changes from Shopify store to local
allowed-tools: Bash(shopify:*), Bash(cd:*), Bash(git:*)
argument-hint: [optional: --live for live theme, default is dev]
---

# Shopify Theme Pull Command

Pull theme changes from Shopify to your local machine.

## Current Directory
!`pwd`

## Git Status (Before Pull)
!`git status --short`

---

## Instructions

1. **Navigate to theme directory**
   ```bash
   cd theme
   ```

2. **Determine pull source**
   - If `$ARGUMENTS` contains `--live` or `production`: Pull from live theme
   - Otherwise: Pull from development theme (default)

3. **Run Shopify CLI pull**

   For development theme:
   ```bash
   shopify theme pull
   ```

   For live/production theme:
   ```bash
   shopify theme pull --live
   ```

4. **Review changes**
   - Show what files were updated
   - Display git diff if files changed

5. **Recommend next steps**
   - Suggest reviewing changes with `git status`
   - Recommend committing if changes look good

## Use Cases
- Pull changes made in Shopify Theme Editor
- Sync after owner customizes theme
- Download live theme for backup
- Get latest changes from development theme

## Notes
- This will overwrite local files
- Commit your local changes first!
- Use `--nodelete` to prevent local file deletions
