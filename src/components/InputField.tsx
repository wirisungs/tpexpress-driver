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
    <TextInput
      className="border border-gray-300 rounded-xl p-4 text-lg justify-center items-center w-[318px] mt-3"
      placeholder={placeholder}
      keyboardType={placeholder === "Số điện thoại" ? "phone-pad" : "default"}
      value={value}
      onChangeText={handleChange}
      secureTextEntry={placeholder === "Mật khẩu"}
      maxLength={placeholder === "Số điện thoại" ? 10 : placeholder === "Mật khẩu" ? 50 : undefined}
    />
  )
}

export default InputField