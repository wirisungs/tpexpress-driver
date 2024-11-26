import React, { useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Alert, Image, Linking } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../types/types';
import TPExpress from '../../assets/TPExpress.png';
import { sso } from '../../config/sso'

type SSOScreenNavigationProp = NavigationProp<RootStackParamList, 'Auth'>;

const SSOScreen = () => {
  const navigation = useNavigation<SSOScreenNavigationProp>();

  // Function to handle the URL and extract the token
  const handleUrl = (url: string | null) => {
    if (url) {
      const urlObj = new URL(url);
      const token = urlObj.searchParams.get('Token');
      if (token) {
        // Store the token and navigate to the home screen
        AsyncStorage.setItem('userToken', token);
        Alert.alert('Login Success', 'You have successfully logged in!');
        navigation.navigate('Home' as never); // Navigate to your home screen
      } else {
        Alert.alert('Error', 'Token is missing in the URL.');
      }
    }
  };

  useEffect(() => {
    // Listener for deep links
    const urlListener = ({ url }: { url: string }) => {
      handleUrl(url);
    };

    // Add the event listener to handle deep links
    Linking.addEventListener('url', urlListener);

    // Check for an initial URL if the app was opened via deep link
    const getInitialUrl = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) handleUrl(initialUrl);
    };

    getInitialUrl();

    return () => {
      Linking.removeAllListeners('url'); // Clean up the listener
    };
  }, [navigation]);

  // Function to initiate SSO login
  const handleSSOLogin = async () => {
    try {
      const ssoLoginUrl = 'https://sso.htilssu.id.vn/sign-in';
      const callbackUrl = 'tpexpress-driver://callback'; // Your callback URL scheme
      const loginUrl = `${ssoLoginUrl}?redirect_uri=${encodeURIComponent(callbackUrl)}`;

      // Call the redirectToLogin method of SSO library to open the login page
      sso.redirectToLogin(loginUrl);
    } catch (error) {
      Alert.alert('Error', 'An error occurred during login.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white justify-center items-center">
      <View className="flex-1 justify-center items-center">
        {/* Logo Placeholder */}
        <View className="mb-8">
          <Image source={TPExpress} style={{ width: 220, height: 96 }} />
        </View>

        {/* App Name */}
        <Text className="text-2xl font-bold text-black">THIEN PHUC DRIVER</Text>
        <Text className="text-base text-gray-500 mb-6">Giao hàng bằng cả tính mạng</Text>

        {/* Login Button */}
        <View className="flex-row space-x-2">
          <TouchableOpacity
            onPress={handleSSOLogin}
            className="h-[50px] py-[6px] px-[24px] justify-center items-center bg-[#EB455F] w-[235px] rounded-xl mt-4"
          >
            <Text className="text-white text-lg font-bold">Đăng nhập bằng SSO</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SSOScreen;
