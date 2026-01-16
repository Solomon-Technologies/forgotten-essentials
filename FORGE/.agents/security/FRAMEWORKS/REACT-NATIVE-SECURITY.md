# FRAMEWORK: REACT NATIVE SECURITY

## Critical Security Checks for React Native Apps

---

## 1. Secure Storage

### NEVER use AsyncStorage for sensitive data

```javascript
// VULNERABLE: Secrets in AsyncStorage (unencrypted!)
import AsyncStorage from '@react-native-async-storage/async-storage';
await AsyncStorage.setItem('authToken', token);  // ❌ INSECURE

// SECURE: Use encrypted storage
import EncryptedStorage from 'react-native-encrypted-storage';
await EncryptedStorage.setItem('authToken', token);  // ✅ Encrypted

// SECURE: Use Keychain/Keystore
import * as Keychain from 'react-native-keychain';
await Keychain.setGenericPassword('user', token);  // ✅ System secure storage
```

### Check for insecure storage
```bash
# Find AsyncStorage usage with sensitive data
grep -rn "AsyncStorage" --include="*.js" --include="*.ts" --include="*.tsx" | grep -i "token\|password\|secret\|key\|auth"
```

---

## 2. API Security

### HTTPS Only
```javascript
// In Info.plist (iOS) - App Transport Security
<key>NSAppTransportSecurity</key>
<dict>
  <key>NSAllowsArbitraryLoads</key>
  <false/>  <!-- Block HTTP -->
</dict>

// In network_security_config.xml (Android)
<network-security-config>
  <base-config cleartextTrafficPermitted="false">
    <trust-anchors>
      <certificates src="system"/>
    </trust-anchors>
  </base-config>
</network-security-config>
```

### Certificate Pinning
```javascript
import { fetch } from 'react-native-ssl-pinning';

const response = await fetch('https://api.example.com/data', {
  method: 'GET',
  sslPinning: {
    certs: ['cert1', 'cert2'], // Your certificate names
  },
});
```

### Check for HTTP usage
```bash
# Find HTTP URLs
grep -rn "http://" --include="*.js" --include="*.ts" --include="*.tsx" | grep -v "https://"
```

---

## 3. Hardcoded Secrets

### NEVER hardcode secrets
```javascript
// VULNERABLE: Hardcoded API key
const API_KEY = 'sk_live_1234567890';  // ❌

// VULNERABLE: In config file checked into git
export const config = {
  apiKey: 'sk_live_1234567890',  // ❌
};

// SECURE: Use environment variables (build time)
import Config from 'react-native-config';
const API_KEY = Config.API_KEY;  // ✅

// SECURE: Fetch from secure backend
const getApiKey = async () => {
  const response = await secureApi.get('/config');
  return response.data.apiKey;
};
```

### Check for hardcoded secrets
```bash
# Find potential hardcoded secrets
grep -rn "api_key\|apiKey\|API_KEY\|secret\|password" --include="*.js" --include="*.ts" --include="*.tsx" | grep -v "process.env\|Config\."

# Find hardcoded URLs with keys
grep -rn "key=" --include="*.js" --include="*.ts" --include="*.tsx"
```

---

## 4. Deep Link Security

### Validate deep link parameters
```javascript
// In app.json or app.config.js
{
  "expo": {
    "scheme": "myapp"
  }
}

// Handling deep links securely
import { useURL } from 'expo-linking';

function DeepLinkHandler() {
  const url = useURL();

  useEffect(() => {
    if (url) {
      const { hostname, pathname, queryParams } = Linking.parse(url);

      // VALIDATE the deep link!
      if (!isValidDeepLink(hostname, pathname)) {
        console.warn('Invalid deep link');
        return;
      }

      // Sanitize parameters before use
      const sanitizedParams = sanitizeParams(queryParams);
      handleDeepLink(sanitizedParams);
    }
  }, [url]);
}
```

### Check deep link handling
```bash
# Find deep link handlers
grep -rn "Linking\|useURL\|deep.*link" --include="*.js" --include="*.ts" --include="*.tsx"
```

---

## 5. Biometric Authentication

### Implement properly
```javascript
import * as LocalAuthentication from 'expo-local-authentication';

const authenticateWithBiometrics = async () => {
  // Check if biometrics is available
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();

  if (!hasHardware || !isEnrolled) {
    // Fallback to PIN/password
    return authenticateWithPIN();
  }

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Verify your identity',
    disableDeviceFallback: false,
    cancelLabel: 'Cancel',
  });

  if (result.success) {
    // Also verify session server-side!
    await verifySessionWithServer();
  }

  return result.success;
};
```

---

## 6. Jailbreak/Root Detection

### Detect compromised devices
```javascript
import JailMonkey from 'jail-monkey';

const checkDeviceSecurity = () => {
  const issues = [];

  if (JailMonkey.isJailBroken()) {
    issues.push('Device is jailbroken/rooted');
  }

  if (JailMonkey.isDebuggedMode()) {
    issues.push('App is being debugged');
  }

  if (JailMonkey.hookDetected()) {
    issues.push('Hooking framework detected');
  }

  if (issues.length > 0) {
    // Log and potentially restrict functionality
    logSecurityEvent('device_compromised', issues);

    // For high-security apps:
    // showSecurityWarning();
    // restrictSensitiveFeatures();
  }

  return issues;
};
```

---

## 7. Code Obfuscation

### Enable ProGuard (Android)
```gradle
// android/app/build.gradle
def enableProguardInReleaseBuilds = true

android {
  buildTypes {
    release {
      minifyEnabled enableProguardInReleaseBuilds
      shrinkResources enableProguardInReleaseBuilds
      proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
    }
  }
}
```

### Use Hermes (enabled by default in newer RN)
```javascript
// Check if Hermes is enabled
const isHermes = () => !!global.HermesInternal;
```

---

## 8. Secure Communication

### WebSocket security
```javascript
// SECURE: WSS only
const ws = new WebSocket('wss://api.example.com/ws');  // ✅

// VULNERABLE: WS (unencrypted)
const ws = new WebSocket('ws://api.example.com/ws');  // ❌

// Add authentication to WebSocket
const ws = new WebSocket('wss://api.example.com/ws', null, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

---

## 9. Input Validation

### Validate all user inputs
```javascript
import * as yup from 'yup';

const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

const handleLogin = async (data) => {
  try {
    // Validate on client
    const validated = await loginSchema.validate(data);

    // Server ALSO validates
    const response = await api.post('/login', validated);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      showError(error.message);
    }
  }
};
```

### Prevent injection in WebViews
```javascript
// If you MUST use WebView
import { WebView } from 'react-native-webview';

<WebView
  source={{ uri: 'https://trusted-domain.com' }}
  javaScriptEnabled={false}  // Disable if not needed
  domStorageEnabled={false}  // Disable if not needed
  onShouldStartLoadWithRequest={(request) => {
    // Validate URLs before loading
    return isAllowedDomain(request.url);
  }}
/>
```

---

## 10. Logging & Error Handling

### Don't log sensitive data
```javascript
// VULNERABLE: Logging sensitive info
console.log('User login:', { email, password });  // ❌
console.log('API Response:', response);  // ❌ May contain tokens

// SECURE: Sanitize logs
console.log('User login:', { email: maskEmail(email) });  // ✅
console.log('API Response:', { status: response.status });  // ✅

// In production, disable console
if (!__DEV__) {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
}
```

---

## Security Checklist

```bash
REACT_NATIVE_SECURITY=(
  # Storage
  "[ ] No sensitive data in AsyncStorage"
  "[ ] Using EncryptedStorage or Keychain"
  "[ ] Tokens stored securely"

  # Network
  "[ ] HTTPS only (no HTTP)"
  "[ ] Certificate pinning for sensitive APIs"
  "[ ] Network security config set"

  # Secrets
  "[ ] No hardcoded API keys"
  "[ ] Using react-native-config or similar"
  "[ ] .env files in .gitignore"

  # Device Security
  "[ ] Jailbreak/root detection"
  "[ ] Debug mode detection"
  "[ ] Biometric auth implemented properly"

  # Code
  "[ ] ProGuard/R8 enabled for Android"
  "[ ] Hermes enabled"
  "[ ] No sensitive data in logs"

  # Input
  "[ ] All inputs validated"
  "[ ] Deep links validated"
  "[ ] WebView restricted (if used)"
)
```

---

## Commands

```bash
# React Native security audit
/sec-react-native

# Check storage security
/sec-react-native --storage

# Check for hardcoded secrets
/sec-react-native --secrets

# Check network security
/sec-react-native --network
```
