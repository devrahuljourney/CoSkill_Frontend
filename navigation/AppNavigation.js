import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from '../page/Auth/LoginPage';
import SignUpPage from '../page/Auth/SignUpPage';
import OnBoarding from '../page/OnBoardingPage/OnBoarding';
import OTPVerifications from '../page/Auth/OTPVerifications';


import { ActivityIndicator, View } from 'react-native';
import useProtector from '../utils/useProtector';
import Home from '../page/HomePage/Home';
import ExploreAndOfferPage from '../page/ExploreAndOfferPage/ExploreAndOfferPage';
import BottomTabNavigator from './BottomTabNavigation';
import Search from '../page/Search';

const Stack = createNativeStackNavigator();

export default function AppNavigation({ initialRouteName }) {
  const { loading, isAuthenticated, role } = useProtector();

  useEffect(() => {
    console.log("IsAuthenticated", isAuthenticated)
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator 
      screenOptions={{ headerShown: false }}
    >
      {isAuthenticated ? (
        <>
        <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
        <Stack.Screen name = "Search" component={Search} />
        </>
      ) : (
        <>
          <Stack.Screen name="OnBoarding" component={OnBoarding} />
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="SignUp" component={SignUpPage} />
          <Stack.Screen name="OTP" component={OTPVerifications} />
          <Stack.Screen name ="ExploreAndOffer" component={ExploreAndOfferPage} />

        </>
      )}
    </Stack.Navigator>
  );
}
