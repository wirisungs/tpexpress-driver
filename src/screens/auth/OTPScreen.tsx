import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';

const Container = styled(View);
const Title = styled(Text);
const Subtitle = styled(Text);
const OTPInput = styled(TextInput);
const Button = styled(TouchableOpacity);
const ButtonText = styled(Text);

const OTPScreen = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleOTPChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const renderOTPInputs = () =>
    otp.map((_, index) => (
      <OTPInput
        key={index}
        className="w-12 h-12 border-b-2 border-gray-400 text-center text-xl"
        maxLength={1}
        keyboardType="number-pad"
        onChangeText={(text) => handleOTPChange(text, index)}
        value={otp[index]}
      />
    ));

  return (
    <Container className="flex-1 items-center justify-center bg-white px-4">
      <View className="mb-8">
        <Title className="text-2xl font-semibold text-black text-center">
          Nhập mã xác nhận
        </Title>
        <Subtitle className="text-sm text-gray-500 text-center mt-2">
          Hãy nhập mã OTP đã được gửi cho ********78
        </Subtitle>
        <Text className="text-gray-400 text-center mt-1">Gửi lại OTP (60s)</Text>
      </View>
      <View className="flex-row justify-between mb-8">{renderOTPInputs()}</View>
      <Button className="w-full py-3 bg-red-500 rounded-md">
        <ButtonText className="text-white text-center font-semibold">Xác thực</ButtonText>
      </Button>
      <Text className="text-sm text-gray-500 mt-4">
        Không nhận được mã? <Text className="text-red-500">Gửi lại</Text>
      </Text>
    </Container>
  );
};

export default OTPScreen;
