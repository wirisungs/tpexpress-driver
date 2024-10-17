import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Logout from '../svg/Logout';
import Back from '../svg/Back';

interface User {
  name: string;
  phone: string;
  location: string;
  details: {
    vehicle: string;
    vehiclePlate: string;
    licensePlate: string;
    dob: string;
    CCCD: string;
    bankName: string;
    bankAccount: string;
    bankNumber: string;
  }
}

const UserProfile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState<User | null>(null); // State to hold user profile data

  const fetchUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken'); // Get token from storage

      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch('http://10.0.2.2:3000/user/profile/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Attach token to Authorization header
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }

      const userProfile = await response.json();
      setUser(userProfile); // Set the fetched user profile data
      console.log('User profile fetched successfully', userProfile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      navigation.navigate('LoginScreen' as never);
      console.log('Logout successful');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <ScrollView className="bg-white flex-1">
      <View className="items-start p-4">
        <Back />
      </View>

      <View className="items-center mt-8">
        <Image
          source={{ uri: 'http://10.0.2.2:3000/assets/z5904438362766_91a95aa04deb0a81c882531ca5ad32df.jpg' }}
          className="w-40 h-40 rounded-full"
        />
      </View>

      <Text className="text-2xl font-bold text-center mt-4">
        {user?.name || 'User Name'}
      </Text>

      <TouchableOpacity className="absolute top-24 right-5 p-3 bg-[#EB455F] rounded-full">
        <Text className="text-white">✎</Text>
      </TouchableOpacity>

      <View className="mt-6 px-6">
        <View className="mb-4">
          <Text className="text-gray-500">Số điện thoại</Text>
          <Text className="text-xl mt-2">{user?.phone || 'N/A'}</Text>
        </View>

        <View className="mb-4">
          <Text className="text-gray-500">Phương tiện sử dụng</Text>
          <Text className="text-xl mt-2">{user?.details.vehicle || 'N/A'}</Text>
        </View>

        <View className="mb-4">
          <Text className="text-gray-500">Địa chỉ</Text>
          <Text className="text-xl mt-2">{user?.location || 'N/A'}</Text>
        </View>
      </View>

      <View className="px-6">
        <TouchableOpacity className="bg-[#EB455F] p-4 rounded-[10px] justify-center items-center flex-row" onPress={handleLogout}>
          <View className="items-start mr-2">
            <Logout />
          </View>
          <Text className="text-white text-xl font-bold">Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UserProfile;