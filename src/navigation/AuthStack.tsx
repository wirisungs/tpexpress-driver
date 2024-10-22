import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/auth/LoginScreen';
import PassLogScreen from '../screens/auth/PassLogScreen';
import HomeScreen from '../screens/HomeScreen';
import OrdersScreen from '../screens/OrderScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import VerifyScreen from '../screens/auth/VerifyScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const homeName = "Home";
const orderName = "Orders";
const profileName = "Profile";
const notiName = "Thông báo";

const AuthStack = () => {
  const MainTabs = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === homeName) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === orderName) {
            iconName = focused ? 'cube' : 'cube-outline';
          } else if (route.name === profileName) {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Icon name={iconName ?? 'default-icon'} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "black",
        tabBarStyle: {
          paddingHorizontal: 6,
          paddingTop: 16,
          height: "10%",
          paddingBottom: 12,
        }
      })}
    >
      <Tab.Screen name={homeName} component={HomeScreen} />
      <Tab.Screen name={orderName} component={OrdersScreen} />
      <Tab.Screen name={profileName} component={SettingsScreen} />
    </Tab.Navigator>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="PassLogScreen" component={PassLogScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="VerifyScreen" component={VerifyScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;