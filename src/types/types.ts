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
  OTPScreen: undefined;
};

export type OrderNavigatorParamList = {
  OrderScreen: undefined;
  OrderDetailScreen: undefined;
};

export type RootStackParamList = {
  Home: NavigatorScreenParams<HomeNavigatorParamList>;
  Auth: NavigatorScreenParams<AuthNavigatorParamList>;
};

