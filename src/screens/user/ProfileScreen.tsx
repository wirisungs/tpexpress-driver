import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Logout from '../../svg/Logout';
import Back from '../../svg/Back';

interface User {
  driverName: string;
  driverPhone: string;
  driverLicenseType: string; // Updated to match the API response
  vehiclePlate: string; // Updated to match the API response
  driverLocation: string;
}

const UserProfile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState<User | null>(null); // State to hold user profile data

  const handleSettings = () => {
    navigation.navigate('SettingsScreen' as never);
  }

  const fetchUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken'); // Get token from storage
      if (!token) {
        throw new Error('No token found');
      }
      console.log('Token:', token); // Debugging log
      const response = await fetch('http://10.0.2.2:3000/user/profile', { // Ensure HTTP protocol
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Attach token to Authorization header
          'Content-Type': 'application/json',
        },
      });
      console.log('Response status:', response.status); // Debugging log
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
      const userProfile = await response.json();
      setUser(userProfile); // Set the fetched user profile data directly
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

  useFocusEffect(
    useCallback(() => {
      fetchUserProfile();
    }, [])
  );

  return (
    <View className="flex-1">
      <ScrollView className="bg-white flex-1">
        <TouchableOpacity className="mt-12" onPress={handleSettings}>
          <Back />
        </TouchableOpacity>

        <View className="items-center mt-8">
          <Image
            source={{ uri: 'http://your_image_url_here.jpg' }} // Replace with actual image URL
            className="w-40 h-40 rounded-full"
          />
        </View>

        <Text className="text-2xl font-bold text-center mt-4">
          {user?.driverName || 'User Name'}
        </Text>

        <TouchableOpacity className="absolute top-24 right-5 p-3 bg-[#EB455F] rounded-full">
          <Text className="text-white">✎</Text>
        </TouchableOpacity>

        <View className="mt-6 px-6">
          <View className="mb-4">
            <Text className="text-gray-500">Số điện thoại</Text>
            <Text className="text-xl mt-2">{user?.driverPhone || 'N/A'}</Text>
          </View>

          <View className="mb-4">
            <Text className="text-gray-500">Biển số xe</Text>
            <Text className="text-xl mt-2">{user?.vehiclePlate || 'N/A'}</Text>
          </View>

          <View className="mb-4">
            <Text className="text-gray-500">Địa chỉ</Text>
            <Text className="text-xl mt-2">{user?.driverLocation || 'N/A'}</Text>
          </View>
        </View>
      </ScrollView>
      <View className="px-6 mb-6">
        <TouchableOpacity className="bg-[#EB455F] p-4 rounded-[10px] justify-center items-center flex-row" onPress={handleLogout}>
          <View className="items-start mr-2">
            <Logout />
          </View>
          <Text className="text-white text-xl font-bold">Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserProfile;
