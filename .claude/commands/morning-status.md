---
description: Get project status for morning standup
allowed-tools: Bash(git:*), Read
---

# Recent Commits (Last 3 Days)
!`git log --since="3 days ago" --oneline --author="$(git config user.name)" | head -20`

# Open Branches
!`git branch -a | grep -v HEAD | head -10`

# Uncommitted Work
!`git status --short`

# TODO Items
!`grep -r "TODO\|FIXME\|HACK" --include="*.ts" --include="*.tsx" --include="*.js" . 2>/dev/null | head -10 || echo "No TODOs found"`

Generate a standup summary:
1. **Yesterday**: What was shipped (from git log)
2. **Today**: What's in progress (from branches and uncommitted)
3. **Blockers**: Any TODOs or issues flagged