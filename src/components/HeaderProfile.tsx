import { View, Text } from 'react-native';
import React from 'react';
import { styled } from 'nativewind';

interface HeaderBlankProps {
  title: string;

}

const StyledView = styled(View);
const StyledText = styled(Text);

const HeaderBlank: React.FC<HeaderBlankProps> = ({ title }) => {
  return (
    <StyledView className="flex-1 bg-white">
      <View
        className="pt-16 pb-6 px-6 z-50 flex justify-between items-center rounded-b-2xl"
        style={{ backgroundColor: '#EB455F' }}
      >
        <StyledText className="text-white text-2xl font-bold">{title}</StyledText>
      </View>
    </StyledView>
  );
};

export default HeaderBlank;