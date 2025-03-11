import { Alert } from 'react-native';

# 📌 Supabase Authentication & Database Integration with React Native

## 📌 1. Install Dependencies

```sh
npm install @supabase/supabase-js @react-native-async-storage/async-storage
```

## 📌 2. Configure Supabase

Create a new file:

```txt
📂 src/lib/supabase.js
```

```js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Get these from your Supabase Dashboard (Settings → API)
const supabaseUrl = 'https://YOUR_SUPABASE_PROJECT_ID.supabase.co';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
```

## 📌 3. Authentication

### 🔹 GitHub OAuth Login

```js
import { supabase } from '../lib/supabase';

const signInWithGitHub = async () => {
  const { error } = await supabase.auth.signInWithOAuth({ provider: 'github' });
  if (error) Alert.alert('GitHub Sign-In Error', error.message);
};
```

**ℹ️ Note:** OAuth authentication may not work in Expo Go due to missing deep linking.

### 🔹 Email & Password Authentication

#### 🔹 Sign Up

```js
const signUp = async (email, password) => {
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) Alert.alert('Sign-Up Error', error.message);
};
```

#### 🔹 Sign In

```js
const signIn = async (email, password) => {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) Alert.alert('Sign-In Error', error.message);
};
```

#### 🔹 Sign Out

```js
const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) Alert.alert('Sign-Out Error', error.message);
};
```

#### 🔹 Check Auth State

```js
const checkAuthState = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  console.log(user ? 'User is logged in' : 'No user logged in');
};
```

## 📌 4. Reset Password

```js
const resetPassword = async (email) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) Alert.alert('Reset Password Error', error.message);
  else Alert.alert('✅ Success', 'Password reset email sent');
};
```

## 📌 5. Enable Deep Linking for OAuth (Expo)

### 🔹 1. Configure Supabase Redirect URL

Go to **Supabase → Authentication → URL Configuration** and add:

```bash
exp://localhost:19000/--/
```

_ℹ️ For a real app, replace `localhost:19000` with your published Expo URL._

### 🔹 2. Add to `app.json`

```json
{
  "scheme": "myapp",
  "extra": {
    "supabaseRedirectUrl": "exp://localhost:19000/--/"
  }
}
```

## 📌 6. Query Supabase Database

### 🔹 Fetch Users

```js
const fetchUsers = async () => {
  let { data, error } = await supabase.from('users').select('*');
  if (error) console.error(error);
  else console.log('Users:', data);
};
```

## 📌 Next Steps

- 🔹 Secure environment variables using `.env`
- 🔹 Deploy to a real device to test OAuth login
- 🔹 Add a Login Screen in React Native UI
- 🔹 Implement protected routes based on user state
- 🔹 Style forms with `react-native-paper` or `react-native-elements`

✅ Now you have a complete Supabase authentication setup for your React Native app! 🚀

## Securely Store Supabase API Keys in Expo React Native Project

In a React Native Expo project, you should never hardcode your **Supabase ANON_KEY** directly in the source code. Instead, store it securely in environment variables. Follow these steps:

### 📌 1. Install `expo-constants`

Expo provides a way to manage environment variables using `expo-constants`.

```sh
npm install expo-constants
```

### 📌 2. Store the API Keys in `app.json` or `app.config.js`

Modify your `app.json` (or `app.config.js` if you're using JavaScript-based configuration):

#### `app.json`

```json
{
  "expo": {
    "extra": {
      "SUPABASE_URL": "https://YOUR_SUPABASE_PROJECT_ID.supabase.co",
      "SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1..."
    }
  }
}
```

#### `app.config.js` (alternative)

```js
export default {
  expo: {
    extra: {
      SUPABASE_URL: "https://YOUR_SUPABASE_PROJECT_ID.supabase.co",
      SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1..."
    }
  }
};
```

### 📌 3. Access Environment Variables in Your Code

Modify your `src/lib/supabase.js` file to use `expo-constants`:

```js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const supabaseUrl = Constants.expoConfig.extra.SUPABASE_URL;
const supabaseAnonKey = Constants.expoConfig.extra.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
```

### 📌 4. Restart Your Expo Project

Run the following command to apply changes:

```sh
npx expo start -c
```

✅ **Now your Supabase API keys are securely managed in Expo's configuration!** 🚀

## Navigation

1. Install React Navigation Core Packages

```bash
npm install @react-navigation/native
```

2. Then, install the required dependencies:

```bash
npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-vector-icons react-native-pager-view
```

This installs the core dependencies needed for navigation.

3. Install Stack Navigator

```bash
npm install @react-navigation/stack
```

This enables screen-to-screen navigation using a stack.

4. Wrap Your App with NavigationContainer

```jsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/navigation/MainNavigator';
import { AuthProvider } from './src/context/AuthProvider'; // ✅ AuthProvider for authentication

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
```

5. Create a MainNavigator.js File
Now, create a file MainNavigator.js inside src/navigation/:

```jsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';

const Stack = createStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
    </Stack.Navigator>
  );
}
```

6. Restart Expo

```bash
npm run start
```
