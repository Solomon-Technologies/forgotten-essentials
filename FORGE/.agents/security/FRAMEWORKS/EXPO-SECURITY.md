# FRAMEWORK: EXPO SECURITY

## Critical Security Checks for Expo Apps

---

## 1. Secure Store (Use It!)

### Expo SecureStore is your friend
```javascript
import * as SecureStore from 'expo-secure-store';

// SECURE: Store sensitive data
await SecureStore.setItemAsync('authToken', token);  // ✅ Encrypted

// Retrieve securely
const token = await SecureStore.getItemAsync('authToken');

// Delete when done
await SecureStore.deleteItemAsync('authToken');
```

### Check for insecure storage
```bash
# Find AsyncStorage with sensitive data (should use SecureStore)
grep -rn "AsyncStorage" --include="*.js" --include="*.ts" --include="*.tsx" | grep -i "token\|password\|secret\|key"
```

### SecureStore limitations
```javascript
// SecureStore has a 2KB limit per item
// For larger data, encrypt with a key stored in SecureStore

import * as Crypto from 'expo-crypto';

const encryptLargeData = async (data) => {
  // Store encryption key in SecureStore
  let key = await SecureStore.getItemAsync('encryptionKey');
  if (!key) {
    key = await Crypto.getRandomBytesAsync(32);
    await SecureStore.setItemAsync('encryptionKey', key.toString());
  }

  // Encrypt data with the key
  // Store encrypted data in AsyncStorage (it's now safe)
};
```

---

## 2. Environment Variables

### Use expo-constants properly
```javascript
// app.config.js
export default {
  expo: {
    extra: {
      apiUrl: process.env.API_URL,
      // NEVER put secrets here - they're embedded in the app!
    },
  },
};

// Access in app
import Constants from 'expo-constants';
const apiUrl = Constants.expoConfig?.extra?.apiUrl;
```

### NEVER expose secrets in extra
```javascript
// VULNERABLE: Secret in app.config.js extra
extra: {
  apiKey: process.env.API_KEY,  // ❌ Embedded in app bundle!
}

// SECURE: Fetch secrets from server at runtime
const getConfig = async () => {
  const response = await fetch(`${API_URL}/config`);
  return response.json();  // ✅ Secrets stay on server
};
```

### Check for exposed secrets
```bash
# Find sensitive data in config
grep -rn "extra:" -A 20 app.config.js app.json | grep -i "key\|secret\|password\|token"
```

---

## 3. EAS Build Security

### Secure your build secrets
```bash
# Set secrets via EAS CLI (not in code!)
eas secret:create --scope project --name API_KEY --value "your-key"

# List current secrets
eas secret:list

# Secrets are injected at build time, not in app bundle
```

### eas.json best practices
```json
{
  "build": {
    "production": {
      "env": {
        "API_URL": "https://api.production.com"
      }
    },
    "preview": {
      "env": {
        "API_URL": "https://api.staging.com"
      }
    }
  }
}
```

---

## 4. Deep Linking Security

### Configure linking securely
```javascript
// app.json
{
  "expo": {
    "scheme": "myapp",
    "android": {
      "intentFilters": [
        {
          "action": "VIEW",
          "autoVerify": true,  // Enable app links verification
          "data": [
            {
              "scheme": "https",
              "host": "myapp.com",
              "pathPrefix": "/app"
            }
          ],
          "category": ["BROWSABLE", "DEFAULT"]
        }
      ]
    }
  }
}
```

### Validate deep link parameters
```javascript
import * as Linking from 'expo-linking';

const handleDeepLink = (url) => {
  const { path, queryParams } = Linking.parse(url);

  // VALIDATE before acting
  const allowedPaths = ['/profile', '/settings', '/item'];
  if (!allowedPaths.includes(path)) {
    console.warn('Invalid deep link path');
    return;
  }

  // Sanitize parameters
  const safeParams = sanitizeParams(queryParams);

  // Handle the link
  navigation.navigate(path, safeParams);
};

// Listen for links
useEffect(() => {
  const subscription = Linking.addEventListener('url', ({ url }) => {
    handleDeepLink(url);
  });

  // Handle initial URL
  Linking.getInitialURL().then((url) => {
    if (url) handleDeepLink(url);
  });

  return () => subscription.remove();
}, []);
```

---

## 5. Authentication

### Use expo-auth-session properly
```javascript
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: 'https://auth.example.com/authorize',
  tokenEndpoint: 'https://auth.example.com/token',
};

const [request, response, promptAsync] = AuthSession.useAuthRequest(
  {
    clientId: 'your-client-id',
    scopes: ['openid', 'profile'],
    redirectUri: AuthSession.makeRedirectUri({
      scheme: 'myapp',
      path: 'auth',
    }),
    usePKCE: true,  // ✅ Always use PKCE
  },
  discovery
);
```

### Biometric authentication
```javascript
import * as LocalAuthentication from 'expo-local-authentication';

const authenticate = async () => {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const enrolled = await LocalAuthentication.isEnrolledAsync();

  if (!hasHardware || !enrolled) {
    return { success: false, error: 'Biometrics not available' };
  }

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Authenticate to continue',
    disableDeviceFallback: false,
  });

  if (result.success) {
    // ALSO verify with server
    await verifySessionServer();
  }

  return result;
};
```

---

## 6. Network Security

### expo-network checks
```javascript
import * as Network from 'expo-network';

const checkNetworkSecurity = async () => {
  const networkState = await Network.getNetworkStateAsync();

  if (!networkState.isConnected) {
    throw new Error('No network connection');
  }

  // Warn on untrusted networks
  if (networkState.type === Network.NetworkStateType.CELLULAR) {
    // May want stricter security on cellular
  }
};
```

### Always use HTTPS
```javascript
// app.json - iOS App Transport Security
{
  "expo": {
    "ios": {
      "infoPlist": {
        "NSAppTransportSecurity": {
          "NSAllowsArbitraryLoads": false
        }
      }
    }
  }
}
```

---

## 7. Expo Updates Security

### Configure update security
```javascript
// app.json
{
  "expo": {
    "updates": {
      "enabled": true,
      "fallbackToCacheTimeout": 0,
      "url": "https://u.expo.dev/your-project-id",
      "codeSigningCertificate": "./keys/certificate.pem",
      "codeSigningMetadata": {
        "alg": "rsa-v1_5-sha256",
        "keyid": "main"
      }
    }
  }
}
```

### Check update integrity
```javascript
import * as Updates from 'expo-updates';

const checkForUpdates = async () => {
  try {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      // Restart to apply
    }
  } catch (error) {
    // Update failed - could be tampering
    console.error('Update check failed:', error);
  }
};
```

---

## 8. Image/Media Security

### Validate image sources
```javascript
import { Image } from 'expo-image';

// VULNERABLE: User-provided URL without validation
<Image source={{ uri: userProvidedUrl }} />  // ❌

// SECURE: Validate URL before loading
const validateImageUrl = (url) => {
  try {
    const parsed = new URL(url);
    const allowedHosts = ['cdn.myapp.com', 'images.myapp.com'];
    return allowedHosts.includes(parsed.host);
  } catch {
    return false;
  }
};

{validateImageUrl(url) && <Image source={{ uri: url }} />}  // ✅
```

### Image picker permissions
```javascript
import * as ImagePicker from 'expo-image-picker';

const pickImage = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (status !== 'granted') {
    alert('Permission required');
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    quality: 0.8,
    // Limit file size
    base64: false,
  });

  if (!result.canceled) {
    // Validate file before upload
    const asset = result.assets[0];
    if (asset.fileSize > 5 * 1024 * 1024) {
      throw new Error('File too large');
    }
  }
};
```

---

## 9. Logging in Production

### Disable dev logs in production
```javascript
// app.config.js
export default ({ config }) => ({
  ...config,
  extra: {
    ...config.extra,
    isProduction: process.env.APP_ENV === 'production',
  },
});

// In your app
import Constants from 'expo-constants';

if (Constants.expoConfig?.extra?.isProduction) {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
}
```

### Use Sentry for production errors
```javascript
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'your-sentry-dsn',
  enableInExpoDevelopment: false,
  debug: false,
  beforeSend(event) {
    // Scrub sensitive data
    delete event.extra?.token;
    delete event.extra?.password;
    return event;
  },
});
```

---

## 10. Permissions

### Request minimum permissions
```javascript
// Only request what you need, when you need it
import * as Location from 'expo-location';

const getLocation = async () => {
  // Request at time of use, not at startup
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    return null;
  }

  // Use coarse location if fine isn't needed
  return Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,  // Not .Highest unless needed
  });
};
```

---

## Security Checklist

```bash
EXPO_SECURITY=(
  # Storage
  "[ ] Using SecureStore for tokens/secrets"
  "[ ] No sensitive data in AsyncStorage"
  "[ ] No secrets in app.config.js extra"

  # Network
  "[ ] HTTPS only"
  "[ ] NSAppTransportSecurity configured"
  "[ ] API URLs validated"

  # Auth
  "[ ] PKCE enabled for OAuth"
  "[ ] Biometric auth implemented"
  "[ ] Sessions validated server-side"

  # Updates
  "[ ] Code signing enabled"
  "[ ] Update integrity checked"

  # Deep Links
  "[ ] Deep link paths validated"
  "[ ] Parameters sanitized"
  "[ ] App Links verified (Android)"

  # Build
  "[ ] Secrets via EAS, not in code"
  "[ ] Production builds obfuscated"
  "[ ] Console logs disabled in prod"

  # Permissions
  "[ ] Minimum permissions requested"
  "[ ] Requested at time of use"
)
```

---

## Commands

```bash
# Expo security audit
/sec-expo

# Check secure storage usage
/sec-expo --storage

# Check for exposed secrets
/sec-expo --secrets

# Check permissions
/sec-expo --permissions
```
