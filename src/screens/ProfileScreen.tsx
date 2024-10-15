import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.navigate('LoginScreen' as never);
    console.log('Logout successful');
  };

  return (
    <SafeAreaView className="flex-1 bg-white justify-center items-center">
      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl font-bold text-black">Profile Screen</Text>
        <TouchableOpacity onPress={handleLogout} className="mt-4">
          <Text className="text-lg text-red-500">Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;