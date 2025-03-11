import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import VerifyEmailScreen from "../screens/VerifyEmailScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="register" component={RegisterScreen} />
      <Stack.Screen name="forgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="verifyEmail" component={VerifyEmailScreen} />
      <Stack.Screen name="resetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  )
}

export default AuthNavigator