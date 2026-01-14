---
description: Review all uncommitted changes before shipping
allowed-tools: Bash(git:*), Read
---

# Uncommitted Changes
!`git diff --stat`

# Detailed Diff
!`git diff`

Review the changes above:

1. **Code Quality**
   - Any obvious bugs?
   - Missing error handling?
   - Console.logs left in?
   
2. **Security**
   - API keys or secrets exposed?
   - SQL injection risks?
   - XSS vulnerabilities?

3. **Performance**
   - N+1 queries?
   - Missing indexes?
   - Unnecessary re-renders?

4. **Style**
   - Consistent formatting?
   - Proper naming?
   - TypeScript types correct?

Provide a summary with:
- ✅ Good to ship
- ⚠️ Minor issues (list them)
- ❌ Needs fixes before shipping (list blockers)