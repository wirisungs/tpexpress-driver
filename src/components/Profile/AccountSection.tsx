/**
 * This code was generated by Builder.io.
 */
import React from "react";
import { View, Text } from "react-native";
import SectionItem, { SectionItemProps } from "./SectionItem";

interface AccountSectionProps {
  items: SectionItemProps[];
}

const AccountSection: React.FC<AccountSectionProps> = ({ items }) => (
  <View className="flex flex-col justify-center w-full">
    <View className="text-3xl font-bold leading-none text-neutral-900">
      <Text>Tài khoản</Text>
    </View>
    <View className="flex flex-col justify-center mt-3 w-full text-xs leading-5 text-neutral-500">
      {items.map((item, index) => (
        <SectionItem key={index} {...item} />
      ))}
    </View>
  </View>
);

export default AccountSection;