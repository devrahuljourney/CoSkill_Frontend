import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from '../page/Auth/LoginPage';
import SignUpPage from '../page/Auth/SignUpPage';
import OnBoarding from '../page/OnBoardingPage/OnBoarding';
import OTPVerifications from '../page/Auth/OTPVerifications';

const Stack = createNativeStackNavigator();

export default function AppNavigation({ initialRouteName }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRouteName}>
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="SignUp" component={SignUpPage} />
      <Stack.Screen name = "OTP" component={OTPVerifications} />
    </Stack.Navigator>
  );
}
