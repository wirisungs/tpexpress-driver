import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import InputField from '../../components/InputField';
import Button from '../../components/Button/Button';
import PasswordChange from '../../svg/PasswordChange';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handlePassLogin = () => {
    navigation.navigate('LoginScreen' as never);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,30}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = async () => {
    if (!validatePassword(password)) {
      Alert.alert('Error', 'Password must be 8-30 characters long, contain at least one uppercase letter, and one special character.');
      return;
    }

    const userData = {
      name,
      phone,
      email,
      password,
    };

    try {
      const response = await fetch('http://tpexpress-driver.ddns.net:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        // Registration successful, navigate to HomeScreen
        navigation.navigate('Home' as never);
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during registration.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white justify-center items-center">
      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl font-bold text-black">THIEN PHUC DRIVER</Text>
        <Text className="text-base text-gray-500 mb-6">Giao hàng bằng cả tính mạng</Text>

        <View className="flex p-3 justify-center items-center w-[318px]">
          <InputField placeholder="Họ và tên" value={name} onChange={setName} />
          <InputField placeholder="Số điện thoại" value={phone} onChange={setPhone} />
          <InputField placeholder="Email" value={email} onChange={setEmail} />
          <InputField placeholder="Mật khẩu" value={password} onChange={setPassword} />
        </View>

        <View className="flex-row">
          <TouchableOpacity
            onPress={handleRegister}
            className="flex h-[50px] py-[6px] px-[24px] justify-center items-center bg-[#EB455F] w-[294px] rounded-xl mt-4"
          >
            <Text className="text-white text-lg font-bold">Đăng ký</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="mt-4 flex-col justify-center items-center" onPress={handlePassLogin}>
          <PasswordChange />
          <Text className="text-sm text-gray-500">Đăng nhập bằng mật khẩu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
