import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './context/AuthProvider';
import MainNavigator from './navigation/MainNavigator';
import AuthNavigator from './navigation/AuthNavigator';

export default function App() {

  return (
    <AuthProvider>
      <NavigationContainer>
        {!true ?
          <MainNavigator />
          :
          <AuthNavigator />
        }
      </NavigationContainer>
    </AuthProvider >
  );
}