import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, ALert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Logout from '../../svg/Logout';
import Back from '../../svg/Back';
import Pencil from '../../svg/Pencil';

interface User {
  driverName: string;
  driverPhone: string;
  driverEmail: string;
  driverGender: number;
  driverVehicleBSX?: string;
  driverAddress?: string;
  driverAvatar?: string;
}

const UserProfile: React.FC = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleSettings = () => navigation.navigate('SettingsScreen' as never);

  const fetchUserProfile = async () => {
    setLoading(true);

    try {
      const driverId = await AsyncStorage.getItem('driverId');
      const token = await AsyncStorage.getItem('userToken');

      if (!driverId || !token) {
        setError('Missing driverId or token');
        return;
      }

      const response = await fetch(`http://10.0.2.2:3000/user/profile/${driverId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch user profile');

      const userProfile = await response.json();
      setUser(userProfile);
      AsyncStorage.setItem('driverId', userProfile.driverId);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const driverId = await AsyncStorage.getItem('driverId');
      const token = await AsyncStorage.getItem('userToken');

      if (!driverId || !token) {
        throw new Error('Driver ID hoặc token không tồn tại');
      }

      // Gọi API để cập nhật trạng thái về false
      const response = await fetch(`http://10.0.2.2:3000/driver/toggle-status/${driverId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Lỗi khi cập nhật trạng thái');
      }

      console.log('Trạng thái đã được cập nhật về false.');

      // Xóa token và chuyển hướng đến màn hình đăng nhập
      await AsyncStorage.removeItem('userToken');
      navigation.navigate('Auth', { screen: 'SSO' });

    } catch (error) {
      console.error('Error during logout:', error instanceof Error ? error.message : error);
      Alert.alert('Lỗi', 'Không thể đăng xuất. Vui lòng thử lại sau.');
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

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#EB455F" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <ScrollView className="bg-white flex-1">
        <View className="relative">
          <TouchableOpacity className="absolute top-12 left-4 z-10" onPress={handleSettings}>
            <Back />
          </TouchableOpacity>
          <Image
            source={{
              uri: user?.driverAvatar || 'https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg',
            }}
            style={{ width: '100%', height: 300 }}
            resizeMode="cover"
          />
        </View>

        <Text className="text-2xl font-bold text-center mt-4">
          {user?.driverName || 'User Name'}
        </Text>

        <TouchableOpacity className="absolute top-24 right-5 w-10 h-10 bg-[#EB455F] rounded-full items-center justify-center">
          <Pencil width={16} height={16} color="white" />
        </TouchableOpacity>

        <View className="mt-6 px-6">
          <ProfileDetail label="Số điện thoại" value={user?.driverPhone} />
          <ProfileDetail label="Biển số xe" value={user?.driverVehicleBSX} />
          <ProfileDetail label="Địa chỉ" value={user?.driverAddress} />
        </View>
      </ScrollView>

      <View className="px-6 mb-6">
        <TouchableOpacity
          className="bg-[#EB455F] p-4 rounded-[10px] justify-center items-center flex-row"
          onPress={handleLogout}
        >
          <View className="items-start mr-2">
            <Logout />
          </View>
          <Text className="text-white text-xl font-bold">Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ProfileDetail: React.FC<{ label: string; value?: string }> = ({ label, value }) => (
  <View className="mb-4">
    <Text className="text-gray-500">{label}</Text>
    <Text className="text-xl mt-2">{value || 'N/A'}</Text>
  </View>
);

export default UserProfile;
