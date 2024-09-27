import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

interface ButtonProps {
  placeholder: string;
}

import { useNavigation } from '@react-navigation/native';

const Button: React.FC<ButtonProps> = ({ placeholder }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('HomeScreen' as never);
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

export default Button