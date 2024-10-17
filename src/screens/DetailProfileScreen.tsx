import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons'; // Icon for the back button
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

// Styled components using nativewind
const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);


const UserProfile = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.navigate('LoginScreen' as never);
    console.log('Logout successful');
  };

  return (
    <StyledSafeAreaView className="flex-1 bg-indigo-900">
      {/* Back button */}
      <StyledView className="flex-row items-center px-4 mt-4">
        <Feather name="arrow-left" size={24} color="white" />
        <StyledText className="text-white text-lg ml-2">Driver - User Info</StyledText>
      </StyledView>

      {/* Profile Section */}
      <StyledView className="flex-1 justify-start items-center mt-8 px-4">
        <StyledView className="relative">
          <Image
            source={{ uri: 'https://your-profile-picture-url.com' }} // Replace with the actual image URL
            className="w-36 h-36 rounded-full"
          />
          <StyledTouchableOpacity className="absolute bottom-0 right-0 p-2 bg-pink-500 rounded-full">
            <Feather name="edit-3" size={18} color="white" />
          </StyledTouchableOpacity>
        </StyledView>

        {/* User Information */}
        <StyledText className="text-white text-2xl font-bold mt-4">Rutricha Phapakithi</StyledText>

        <StyledView className="w-full mt-8 px-4">
          <StyledText className="text-gray-400 text-lg mb-2">Số điện thoại</StyledText>
          <StyledText className="text-white text-lg font-semibold">0394 xxx xxx</StyledText>

          <StyledText className="text-gray-400 text-lg mt-4 mb-2">Email</StyledText>
          <StyledText className="text-white text-lg font-semibold">e********e@gmail.com</StyledText>

          <StyledText className="text-gray-400 text-lg mt-4 mb-2">Địa chỉ</StyledText>
          <StyledText className="text-white text-lg font-semibold">25/3, Hóc Môn, Hồ Chí Minh</StyledText>
        </StyledView>
      </StyledView>

      {/* Logout Button */}
      <StyledView className="px-4 mb-10">
        <StyledTouchableOpacity
          className="w-full py-4 bg-pink-500 rounded-full flex-row justify-center items-center"
          onPress={handleLogout}
        >
          <Feather name="log-out" size={24} color="white" />
          <StyledText className="text-white text-lg font-bold ml-2">Đăng xuất</StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </StyledSafeAreaView>
  );
};

export default UserProfile;