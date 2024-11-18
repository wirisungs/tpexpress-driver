import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
// import Logo from "../../svg/Logo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../types/types';
import TPExpress from '../../assets/TPExpress.png';
// Adjust this import

type LoginScreenNavigationProp = NavigationProp<RootStackParamList, 'Auth'>;

const LoginScreen = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation<LoginScreenNavigationProp>();

    const handlePassLogin = () => {
        navigation.navigate('PassLogScreen' as never);
    };

    const handleRegister = () => {
        navigation.navigate('RegisterScreen' as never);
    };

    const handleLogin = async () => {
        const userData = {
            phone,
            password,
        };

        try {
            const response = await fetch('http://10.0.2.2:3000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            if (response.ok) {
                // Login successful, store the token
                await AsyncStorage.setItem('userToken', data.token);
                console.log('Token:', data.token);
                // console.log('User ID:', data.userId);
                // Navigate to OrderScreen within HomeNavigator
                navigation.navigate('Home' as never);
            } else {
                Alert.alert('Lỗi', data.message);
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred during login.');
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white justify-center items-center">
            <View className="flex-1 justify-center items-center">
                {/* Logo Placeholder */}
                <View className="mb-8">
                    {/* <Text className="text-5xl font-bold text-pink-500">LOGO</Text> */}
                    <Image source={TPExpress} style={{ width: 220, height: 96 }} />
                </View>

                {/* App Name */}
                <Text className="text-2xl font-bold text-black">THIEN PHUC DRIVER</Text>
                <Text className="text-base text-gray-500 mb-6">Giao hàng bằng cả tính mạng</Text>

                {/* Login Button */}
                <View className="flex-row space-x-2">
                    <TouchableOpacity
                        onPress={handleLogin}
                        className="h-[50px] py-[6px] px-[24px] justify-center items-center bg-[#EB455F] w-[235px] rounded-xl mt-4"
                    >
                        <Text className="text-white text-lg font-bold">Đăng nhập bằng SSO</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;
