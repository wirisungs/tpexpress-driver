/**
 * This code was generated by Builder.io.
 */
import React from "react";
import { View, Text } from "react-native";

interface OrderDetailProps {
  label: string;
  value: string;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ label, value }) => (
  <View className="mt-2">
    <Text>
      {label}: {value}
    </Text>
  </View>
);

export default OrderDetail;
