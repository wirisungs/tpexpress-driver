import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';

// Define the types for the navigation and button props
interface ButtonProps {
  placeholder: string;
  screenName: string;
}

const Button: React.FC<ButtonProps> = ({ placeholder, screenName }) => {
  const navigation = useNavigation<NavigationProp<any>>(); // Use a typed navigation prop

  const handlePress = () => {
    navigation.navigate(screenName as never); // Ensuring the screen name is passed correctly
  };

  return (
    <View>
      <TouchableOpacity
        onPress={handlePress}
        className="flex h-[50px] py-[6px] px-[24px] justify-center items-center gap-[0px] flex-[1_0_0] bg-[#EB455F] w-[236px] rounded-xl mt-4"
      >
        <Text className="text-white text-lg font-bold">{placeholder}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;import { FC } from 'react';
