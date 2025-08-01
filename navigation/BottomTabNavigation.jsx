import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import Home from '../page/HomePage/Home';
import ExploreAndOfferPage from '../page/ExploreAndOfferPage/ExploreAndOfferPage';
import MatchPage from '../page/MatchPage';
import ChatPage from '../page/ChatPage';
import ProfilePage from '../page/ProfilePage';
import { Colors } from '../color/color';
import ConnectPage from '../page/ConnectPage';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabel: ({ focused, color }) => (
          <View style={{ alignItems: 'center' }}>
            <Text style={{ color, fontSize: 12, fontWeight: focused ? 'bold' : 'normal' }}>
              {route.name}
            </Text>
          
          </View>
        ),
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Explore') iconName = focused ? 'search' : 'search-outline';
          else if (route.name === 'Matches') iconName = focused ? 'heart' : 'heart-outline';
          else if (route.name === 'Connect') iconName = focused ? 'people' : 'people-outline';

          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';

          return <Ionicons name={iconName} size={22} color={color} />;
        },
        tabBarActiveTintColor: Colors.white,
        tabBarInactiveTintColor: Colors.silver,
        tabBarStyle: {
          height: 70,
          position: 'absolute',
          bottom: 10,
          left: 10,
          right: 10,
          backgroundColor: Colors.primary,
          borderRadius: 20,
          paddingBottom: 10,
          paddingTop: 5,
          elevation: 10,
          borderWidth: 1,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          marginLeft:10,
          marginRight:10
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Connect" component={ConnectPage} />

      <Tab.Screen name="Matches" component={MatchPage} />
      <Tab.Screen name="Profile" component={ProfilePage} />
    </Tab.Navigator>
  );
}
