---
description: Run tests, analyze failures, and fix them
allowed-tools: Bash(npm:*), Bash(yarn:*), Read, Edit
---

# Run Test Suite
!`npm test 2>&1 || true`

Analyze the test output above:

1. **Identify failing tests** - list each failure with file and reason
2. **Read the failing test files** to understand expected behavior
3. **Read the source files** being tested
4. **Fix the issues** - either in test or source depending on what's wrong
5. **Re-run tests** to verify fixes

If all tests pass, report success.
If tests still fail after 3 attempts, report remaining issues and ask for guidance.
