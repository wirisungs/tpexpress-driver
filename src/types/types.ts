// types.ts
import { NavigatorScreenParams } from '@react-navigation/native';

export type HomeNavigatorParamList = {
  Home: undefined;
  OrderScreen: undefined;
  // Add other screens here if necessary
};

export type AuthNavigatorParamList = {
  LoginScreen: undefined;
  PassLogScreen: undefined;
  RegisterScreen: undefined;
  VerifyScreen: undefined;
};

export type RootStackParamList = {
  Home: NavigatorScreenParams<HomeNavigatorParamList>;
  Auth: NavigatorScreenParams<AuthNavigatorParamList>;
};

// You can import and use this in your LoginScreenimport LoginScreen from '../screens/auth/LoginScreen';
import PassLogScreen from '../screens/auth/PassLogScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import VerifyScreen from '../screens/auth/VerifyScreen';
import OrderScreen from '../screens/OrderScreen';
import Home from '../svg/Home';
