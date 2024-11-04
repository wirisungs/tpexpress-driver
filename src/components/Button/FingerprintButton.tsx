import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import React from 'react'
import Fingerprint from "../../svg/Fingerprint"
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../types/types'
import * as LocalAuthentication from 'expo-local-authentication'

const FingerprintButton = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const autheticate = async () => {
    const isHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (isHardware && isEnrolled) {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Xác thực bằng vân tay",
      });
      if (result.success) {
        navigation.navigate("HomeScreen" as never);
      } else {
        ToastAndroid.show("Đăng nhập thất bại", ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show(
        "Thiết bị không hỗ trợ hoặc chưa đăng ký sinh trắc học.",
        ToastAndroid.SHORT
      );
    }
  }

  return (
    <TouchableOpacity className="flex ml-2 justify-center items-center w-12 h-12 p-1.5 px-2.5 mt-4 rounded-xl border-2 border-rose-500 border-solid" onPress={autheticate}>
      <Fingerprint/>
    </TouchableOpacity>
  )
}

export default FingerprintButton
