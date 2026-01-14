---
description: Commit changes, push, and create PR in one command
allowed-tools: Bash(git:*), Bash(gh:*)
argument-hint: [optional commit message]
---

# Git Status
!`git status --short`

# Current Branch  
!`git branch --show-current`

# Recent Commits
!`git log -3 --oneline`

Based on git status above:

1. **Stage** all relevant changes (ignore node_modules, .env, etc)
2. **Commit** using conventional commit format:
   - feat: new feature
   - fix: bug fix
   - docs: documentation
   - refactor: code restructure
   - test: adding tests
   - chore: maintenance
3. **Push** to remote
4. **Create PR** with `gh pr create --fill` or detailed description

If $ARGUMENTS provided, use that as commit message.
Otherwise, generate descriptive message from changes.