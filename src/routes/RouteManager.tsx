import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text } from 'react-native';

// Screens
import SSO from '../screens/auth/SSO';
import Verify from '../screens/auth/verify';
import OrderScreen from '../screens/home/OrderScreen';
import ProfileScreen from '../screens/user/ProfileScreen';
import HomeScreen from '../screens/home/HomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import NotificationScreen from '../screens/home/NotificationScreen';
import SettingsScreen from '../screens/home/SettingsScreen';
import OrderDetailScreen from '../screens/order/OrderDetailScreen';
import WalletScreen from '../screens/wallet/WalletScreen';
import HistoryScreen from '../screens/user/HistoryScreen';
import SecurityScreen from '../screens/user/SecurityScreen';
import HelpScreen from '../screens/user/HelpScreen';
import TermsScreen from '../screens/user/TermsScreen';
import InfoScreen from '../screens/user/InfoScreen';
import GuidesScreen from '../screens/user/GuidesScreen';
import RevenueScreen from '../screens/home/RevenueScreen';
import CompletedOrdersScreen from '../screens/order/CompletedOrdersScreen';
import FailedOrdersScreen from '../screens/order/FailedOrdersScreen';
import OTPScreen from '../screens/auth/OTPScreen';

// Component
import QRScanner from '../components/QRScanner';

// SVG
import Home from '../svg/Home';
import OrderFill from '../svg/OrderFill';
import Notification from '../svg/Notification';
import ProfileFill from '../svg/ProfileFill';
import Bank from '../svg/Bank';


const AuthStack = createStackNavigator();
const HomeTab = createBottomTabNavigator();
const RootStack = createStackNavigator();
const OrderStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const OrderDoneStack = createStackNavigator();
const WalletStack = createStackNavigator();
const ProfileTab = createBottomTabNavigator();

const AuthNavigator = () => (
  <AuthStack.Navigator initialRouteName="SSO" screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="SSO" component={SSO} />
    <AuthStack.Screen name="Verify" component={Verify} />
    <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
    <AuthStack.Screen name="RegisterScreen" component={RegisterScreen} />
    <AuthStack.Screen name="OTPScreen" component={OTPScreen} />
  </AuthStack.Navigator>
);

const BgTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white'
  },
};

const OrderDoneNavigator = () => (
  <OrderDoneStack.Navigator initialRouteName="CompletedOrdersScreen" screenOptions={{
    headerTintColor: '#e91e63',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 25,
      textAlign: 'center',
    },
    headerStyle: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      height: 130,
    },
  }}>
    <OrderDoneStack.Screen
      name="CompletedOrdersScreen"
      component={CompletedOrdersScreen}
      options={{ title: 'Đơn hàng của bạn', animationEnabled: false }}
    />
    <OrderDoneStack.Screen
      name="FailedOrdersScreen"
      component={FailedOrdersScreen}
      options={{ title: 'Đơn hàng của bạn', animationEnabled: false }}
    />
  </OrderDoneStack.Navigator>
);

const OrderNavigator = () => (
  <OrderStack.Navigator initialRouteName="OrderScreen">
    <OrderStack.Screen name="OrderScreen" component={OrderScreen} options={{ headerShown: false }} />
    <OrderStack.Screen name="OrderDetailScreen" component={OrderDetailScreen} options={{ title: 'Order Details' }} />
  </OrderStack.Navigator>
);

const WalletNavigator = () => (
    <WalletStack.Navigator initialRouteName="WalletScreen">
        <WalletStack.Screen name="WalletScreen" component={WalletScreen} options={{ headerShown: false }} />
    </WalletStack.Navigator>
);

const ProfileNavigator = () => (
  <ProfileStack.Navigator initialRouteName="SettingsScreen">
    <ProfileStack.Screen
      name="ProfileScreen"
      component={ProfileScreen}
      options={{
        headerShown: false
      }}
    />
    <ProfileStack.Screen name="WalletScreen" component={WalletScreen} options={{ title: 'Ví của bạn' }} />
    <ProfileStack.Screen name="HistoryScreen" component={HistoryScreen} options={{ title: 'Lịch sử' }} />
    <ProfileStack.Screen name="SecurityScreen" component={SecurityScreen} options={{ title: 'Bảo mật' }} />
    <ProfileStack.Screen name="HelpScreen" component={HelpScreen} options={{ title: 'Trợ giúp' }} />
    <ProfileStack.Screen name="TermsScreen" component={TermsScreen} options={{ title: 'Điều khoản' }} />
    <ProfileStack.Screen name="InfoScreen" component={InfoScreen} options={{ title: 'Thông tin' }} />
    <ProfileStack.Screen name="GuidesScreen" component={GuidesScreen} options={{ title: 'Hướng dẫn' }} />
    <ProfileStack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false }} />
    <ProfileStack.Screen name="OrderDoneNavigator" component={OrderDoneNavigator} options={{ headerShown: false }} />
  </ProfileStack.Navigator>
);

const HomeNavigator = () => (
  <HomeTab.Navigator initialRouteName="HomeScreen"
    screenOptions={({ route }) => ({
      tabBarActiveTintColor: '#e91e63',
      tabBarInactiveTintColor: '#000',
      tabBarIcon: ({ focused }) => {
        let iconColor = focused ? '#2FA087' : '#000';
        let icon;
        if (route.name === "Trang chủ") {
          icon = <Home fill={iconColor} />;
        } else if (route.name === "Đơn hàng") {
          icon = <OrderFill fill={iconColor} />;
        } else if (route.name === "Thông báo") {
          icon = <Notification fill={iconColor} />;
        } else if (route.name === "Tài khoản") {
          icon = <ProfileFill fill={iconColor} />;
        } else if (route.name === "Doanh thu") {
          icon = <Bank fill={iconColor} />;
        }
        return (
          <View style={{ alignItems: 'center' }}>
            {icon}
            <Text style={{ marginTop: 6, color: focused ? '#2FA087' : '#000' }}>{route.name}</Text>
          </View>
        );
      },
      headerTintColor: '#e91e63',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 30,
      },
      tabBarStyle: {
        height: 100,
      },
      headerStyle: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        height: 130,
      },
      tabBarLabel: () => null,
      headerRight: () => <QRScanner />
    })}
  >
    <HomeTab.Screen name="Trang chủ" component={HomeScreen} />
    <HomeTab.Screen name="Đơn hàng" component={OrderNavigator} />
    <HomeTab.Screen name="Thông báo" component={NotificationScreen} />
    <HomeTab.Screen name="Doanh thu" component={RevenueScreen} />
    <HomeTab.Screen
      name="Tài khoản"
      component={ProfileNavigator}
      options={{
        headerShown: false,
      }}
    />
  </HomeTab.Navigator>
);

const RouteManager = () => {
  return (
    <NavigationContainer theme={BgTheme}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Auth" component={AuthNavigator} />
        <RootStack.Screen name="Home" component={HomeNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RouteManager;
