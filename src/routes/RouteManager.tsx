import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'


//Screen
import OrderScreen from '../screens/OrderScreen'
import ProfileScreen from '../screens/ProfileScreen'
import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/auth/LoginScreen'
import PassLogScreen from '../screens/auth/PassLogScreen'
import RegisterScreen from '../screens/auth/RegisterScreen'
import VerifyScreen from '../screens/auth/VerifyScreen'


//SVG
import Home from '../svg/Home'
import Order from '../svg/Order'
import Notification from '../svg/Notification'
import Profile from '../svg/Profile'

import React, { useState, useEffect } from 'react'
import NotificationScreen from '../screens/NotificationScreen'

const AuthStack = createStackNavigator();
const HomeTab = createBottomTabNavigator();
const RootStack = createStackNavigator();


const AuthNavigator = () => (
  <AuthStack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
    <AuthStack.Screen name="PassLogScreen" component={PassLogScreen} />
    <AuthStack.Screen name="RegisterScreen" component={RegisterScreen} />
    <AuthStack.Screen name="VerifyScreen" component={VerifyScreen} />
  </AuthStack.Navigator>
);

const BgTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white'
  },
}

const HomeNavigator = () => (
  <HomeTab.Navigator initialRouteName="HomeScreen"
    screenOptions={({ route }) => ({
      tabBarActiveTintColor: '#e91e63',
      tabBarInactiveTintColor: '#000', // Set inactive color to black
      tabBarIcon: ({ focused }) => {
        let iconColor = focused ? '#e91e63' : '#000';
        if (route.name === "Trang chủ") {
          return <Home fill={iconColor} />;
        }
        if (route.name === "Đơn hàng") {
          return <Order fill={iconColor} />;
        }
        if (route.name === "Thông báo") {
          return <Notification fill={iconColor} />;
        }
        if (route.name === "Tài khoản") {
          return <Profile fill={iconColor} />;
        }
      },
      headerTintColor: '#e91e63', // Set color of text and icons
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24,
      },
      headerStyle: {
        shadowColor: '#000', // Add shadow color
        shadowOffset: { width: 0, height: 2 }, // Add shadow offset
        shadowOpacity: 0.25, // Add shadow opacity
        shadowRadius: 3.84, // Add shadow radius
        elevation: 5, // Add elevation for Android shadow
        height: 100, // Add more height to header
      },
    })}
    >
    <HomeTab.Screen name="Trang chủ" component={HomeScreen} />
    <HomeTab.Screen name="Đơn hàng" component={OrderScreen} />
    <HomeTab.Screen name="Thông báo" component={NotificationScreen} />
    <HomeTab.Screen name="Tài khoản" component={ProfileScreen} options={{ headerShown: false }} />
  </HomeTab.Navigator>
);

const RouteManager = () => {
  return (
    <NavigationContainer theme={BgTheme}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="Home" component={HomeNavigator} />
          <RootStack.Screen name="Auth" component={AuthNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RouteManager