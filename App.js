import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './navigation/AppNavigation';
import { StatusBar } from 'expo-status-bar';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import rootReducer from './reducer';
import GlobalLoader from './component/common/GlobalLoader';

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);
  const store = configureStore({

    reducer:rootReducer,
  });

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

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
      <AppNavigation initialRouteName={initialRoute} />
      <GlobalLoader/>
      
    </NavigationContainer>
    </Provider>
  );
}
