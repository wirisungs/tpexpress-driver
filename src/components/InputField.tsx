import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'

interface InputFieldProps {
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps & { value: string, onChange: (text: string) => void }> = ({ placeholder, value, onChange }) => {
  const handleChange = (text: string) => {
    onChange(text);
  };

  return (
    <View>
      <TextInput
        className="border border-gray-300 rounded-xl p-4 text-lg flex justify-center items-center gap-0 self-stretch w-[318px]"
        placeholder={placeholder}
        keyboardType={placeholder === "Số điện thoại" ? "phone-pad" : "default"}
        value={value}
        onChangeText={handleChange}
        secureTextEntry={placeholder === "Mật khẩu"}
      />
    </View>
  )
}

export default InputField