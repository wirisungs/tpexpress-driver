import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'

// Screens
import OrderScreen from '../screens/OrderScreen'
import ProfileScreen from '../screens/ProfileScreen'
import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/auth/LoginScreen'
import PassLogScreen from '../screens/auth/PassLogScreen'
import RegisterScreen from '../screens/auth/RegisterScreen'
import VerifyScreen from '../screens/auth/VerifyScreen'
import NotificationScreen from '../screens/NotificationScreen'

// Component
import QRScanner from '../components/QRScanner'

// SVG
import Home from '../svg/Home'
import OrderFill from '../svg/OrderFill'
import Notification from '../svg/Notification'
import ProfileFill from '../svg/ProfileFill'

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
      tabBarInactiveTintColor: '#000',
      tabBarIcon: ({ focused }) => {
        let iconColor = focused ? '#e91e63' : '#000';
        let icon;
        if (route.name === "Trang chủ") {
          icon = <Home fill={iconColor} />;
        } else if (route.name === "Đơn hàng") {
          icon = <OrderFill fill={iconColor} />;
        } else if (route.name === "Thông báo") {
          icon = <Notification fill={iconColor} />;
        } else if (route.name === "Tài khoản") {
          icon = <ProfileFill fill={iconColor} />;
        }
        return (
          <View style={{ alignItems: 'center' }}>
            {icon}
            <Text style={{ marginTop: 6, color: focused ? '#e91e63' : '#000' }}>{route.name}</Text>
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
      headerRight: () => <QRScanner/>
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
        <RootStack.Screen name="Auth" component={AuthNavigator} />
        <RootStack.Screen name="Home" component={HomeNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RouteManager