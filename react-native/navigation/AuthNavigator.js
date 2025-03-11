import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import VerifyEmailScreen from "../screens/VerifyEmailScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Hides headers for better UI
      }}
    >
      <Stack.Screen name="LOGIN_SCREEN" component={LoginScreen} />
      <Stack.Screen name="REGISTER_SCREEN" component={RegisterScreen} />
      <Stack.Screen name="FORGOT_PASSWORD_SCREEN" component={ForgotPasswordScreen} />
      <Stack.Screen name="VERIFY_EMAIL_SCREEN" component={VerifyEmailScreen} />
      <Stack.Screen name="RESET_PASSWORD_SCREEN" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
