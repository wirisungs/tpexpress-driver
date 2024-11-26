// types.ts
import { NavigatorScreenParams } from '@react-navigation/native';

export type HomeNavigatorParamList = {
  Home: undefined;
  OrderScreen: undefined;
  SettingsScreen: undefined;
  RevenueScreen: undefined;
  // Add other screens here if necessary
};

export type AuthNavigatorParamList = {
  SSO: undefined;
  LoginScreen: undefined;
  PassLogScreen: undefined;
  RegisterScreen: undefined;
  VerifyScreen: undefined;
  OTPScreen: undefined;
  Verify: { value: any };
};

export type OrderNavigatorParamList = {
  OrderScreen: undefined;
  OrderDetailScreen: undefined;
};

export type ProfileStackParamList = {
  ProfileScreen: undefined;
  HistoryScreen: undefined;
  SecurityScreen: undefined;
  HelpScreen: undefined;
  TermsScreen: undefined;
  InfoScreen: undefined;
  GuidesScreen: undefined;
};

export type RootStackParamList = {
  Home: NavigatorScreenParams<HomeNavigatorParamList>;
  Auth: NavigatorScreenParams<AuthNavigatorParamList>;
  Order: NavigatorScreenParams<OrderNavigatorParamList>;
  SSO: NavigatorScreenParams<AuthNavigatorParamList>;
  // Verify: { value: string }; // Add this line
};
