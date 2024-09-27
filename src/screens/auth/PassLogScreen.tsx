import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Logo from "../../svg/Logo"
import InputField from "../../components/InputField"
import Button from '../../components/Button/Button';
import FingerprintButton from '../../components/Button/FingerprintButton';
import OTPChange from '../../svg/OTPChange';
import LoginScreen from './LoginScreen';

interface Props {
  navigation: NavigationProp<any>;
}

const PassLogScreen: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();
  const handleLogin = () => navigation.navigate('LoginScreen' as never);

  return (
    <SafeAreaView className="flex-1 bg-white justify-center items-center">
      <View className="flex-1 justify-center items-center">
        {/* Logo Placeholder */}
        {/* <View className="mb-8">
          <Logo/>
        </View> */}
        <View className="mb-8">
          <Text className="text-5xl font-bold text-pink-500">LOGO</Text>
        </View>

        {/* App Name */}
        <Text className="text-2xl font-bold text-black">THIEN PHUC DRIVER</Text>
        <Text className="text-base text-gray-500 mb-6">Giao hàng bằng cả tính mạng</Text>

        {/* Phone Number Input */}
        <View className="flex p-3 justify-center items-center self-stretch w-[318px] space-y-3" style={{ gap: 12}}>
          <InputField placeholder="Số điện thoại"/>
          <InputField placeholder="Mật khẩu"/>
        </View>

        {/* Login Button */}
        {/* <View className="flex-row" style={{ gap: 8}}>
          <Button placeholder="Đăng nhập" />
          <FingerprintButton />
        </View> */}
        <View className="flex-row space-x-2" style={{ gap: 8 }}>
          <Button placeholder="Đăng nhập" />
          <FingerprintButton />
        </View>

        {/* Password Login Option */}
        <TouchableOpacity
          className="mt-4 flex-col justify-center items-center"
          onPress={handleLogin}
        >
          <OTPChange />
          <Text className="text-sm text-gray-500">Đăng nhập bằng mật khẩu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PassLogScreen;
