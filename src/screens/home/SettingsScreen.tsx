import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import HeaderProfile from '../../components/Profile/HeaderProfile'
import ProfileMenu from '../../components/Profile/ProfileMenu'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';


interface User {
  driverName: string;
}

const SettingsScreen = () => {
  const [user, setUser] = useState<User | null>(null);
  const fetchUserProfile = async () => {
    try {
      const driverId = await AsyncStorage.getItem('driverId');
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        throw new Error('No token found');
      }
      console.log('Token:', token); // Debugging log
      const response = await fetch(`http://10.0.2.2:3000/user/profile/${driverId}`, { // Ensure HTTP protocol
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

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchUserProfile();
    }, [])
  );

  return (
    <View>
      <HeaderProfile title={user?.driverName || 'User Name'}/>
      <View>
        <ProfileMenu/>
      </View>
    </View>
  )
}

export default SettingsScreen
