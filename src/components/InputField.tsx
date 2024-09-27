import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'

interface InputFieldProps {
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({ placeholder = "Số điện thoại" }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  return (
    <View>
      <TextInput
      className="border border-gray-300 rounded-xl p-4 text-lg flex justify-center items-center gap-0 self-stretch w-[318px]"
      placeholder={placeholder}
      keyboardType={placeholder === "Số điện thoại" ? "phone-pad" : "default"}
      value={phoneNumber}
      onChangeText={setPhoneNumber}
      secureTextEntry={placeholder === "Mật khẩu"}
      />
    </View>
  )
}

export default InputField