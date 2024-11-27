import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ArrowDown from "../svg/ArrowDown";

type ReasonSelectorProps = {
  reason: string;
  onReasonChange: (reason: string) => void;
  defaultReason?: string;  // Optional: default reason for fallback
};

const reasons = [
  "Khách không nghe máy",
  "Khách không muốn nhận hàng",
  "Địa chỉ giao hàng không chính xác",
  "Sản phẩm không còn sẵn hàng",
  "Khách đổi ý và huỷ đơn",
];

const ReasonSelector: React.FC<ReasonSelectorProps> = ({ reason, onReasonChange, defaultReason = "Khách không nghe máy" }) => {
  const displayedReason = reason || defaultReason;

  return (
    <TouchableOpacity
      onPress={() => onReasonChange(displayedReason)}
      accessibilityLabel={`Select reason: ${displayedReason}`}
      accessibilityHint="Opens a list of reasons to choose from"
      className="flex gap-1.5 justify-center items-center px-3 py-3.5 mt-6 w-full text-base leading-none rounded-xl border border-solid bg-zinc-50 border-neutral-300 min-h-[50px] text-neutral-500"
    >
      <View className="flex-row items-center">
        <Text className="mr-2">{displayedReason}</Text>
        <ArrowDown />
      </View>
    </TouchableOpacity>
  );
};

export default ReasonSelector;
