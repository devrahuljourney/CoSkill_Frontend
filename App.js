import React, { useEffect, useState, useRef } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './navigation/AppNavigation';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import rootReducer from './reducer';
import GlobalLoader from './component/common/GlobalLoader';
import { useInitializer } from './utils/Initializer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';

const store = configureStore({ reducer: rootReducer });

const InitTrigger = () => {
  useInitializer(); 
  return null;
};

export default function App() {
  const notificationListener = useRef();
  const responseListener = useRef();
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkFirstTime = async () => {
      const hasLaunched = await AsyncStorage.getItem('hasLaunched');
      if (hasLaunched === null) {
        await AsyncStorage.setItem('hasLaunched', 'true');
        setInitialRoute('OnBoarding');
      } else {
        setInitialRoute('Login');
      }
    };
    checkFirstTime();
  }, []);

  // ✅ Notification Listeners
  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Foreground notification received:', notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification tapped:', response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <InitTrigger />
        <NavigationContainer>
          <AppNavigation initialRouteName={initialRoute} />
          <GlobalLoader />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
