import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Logo from "../../svg/Logo";
import InputField from "../../components/InputField";
import Button from '../../components/Button/Button';
import FingerprintButton from '../../components/Button/FingerprintButton';
import PasswordChange from '../../svg/PasswordChange';



interface Props {
  navigation: NavigationProp<any>;
}

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();

  const handlePassLogin = () => {
    navigation.navigate('PassLogScreen' as never);
  };

  const handleRegister = () => {
    navigation.navigate('RegisterScreen' as never);
  }

  return (
    <SafeAreaView className="flex-1 bg-white justify-center items-center">
      <View className="flex-1 justify-center items-center">
        {/* Logo Placeholder */}
        <View className="mb-8">
          <Text className="text-5xl font-bold text-pink-500">LOGO</Text>
        </View>

        {/* App Name */}
        <Text className="text-2xl font-bold text-black">THIEN PHUC DRIVER</Text>
        <Text className="text-base text-gray-500 mb-6">Giao hàng bằng cả tính mạng</Text>

        {/* Phone Number Input */}
        <View className="flex p-3 justify-center items-center gap-0 self-stretch w-[318px]">
          <InputField />
        </View>

        {/* Login Button */}
        <View className="flex-row">
          <Button placeholder="Đăng nhập"/>
          <FingerprintButton />
        </View>

        {/* Password Login Option */}
        <TouchableOpacity className="mt-4 flex-col justify-center items-center" onPress={handlePassLogin}>
          <PasswordChange />
          <Text className="text-sm text-gray-500">Đăng nhập bằng mật khẩu</Text>
        </TouchableOpacity>

        <TouchableOpacity className="mt-4 flex-col justify-center items-center" onPress={handleRegister}>
          <Text className="tẽt-sm text-gray-500">Chưa có tài khoản? Đăng ký ngay</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
