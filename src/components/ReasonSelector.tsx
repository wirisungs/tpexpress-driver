import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import ArrowDown from "../svg/ArrowDown"

type ReasonSelectorProps = {
  reason: string;
  onReasonChange: (reason: string) => void;
};

const ReasonSelector: React.FC<ReasonSelectorProps> = ({ reason, onReasonChange }) => {
  return (
    <TouchableOpacity
      onPress={() => onReasonChange(reason)}
      accessibilityLabel="Select reason"
      accessibilityHint="Opens a list of reasons to choose from"
      className="flex gap-1.5 justify-center items-center px-3 py-3.5 mt-6 w-full text-base leading-none rounded-xl border border-solid bg-zinc-50 border-neutral-300 min-h-[50px] text-neutral-500"
    >
      <View className="flex-row">
        <Text>{reason || "Khách không nghe máy"}</Text>
        <ArrowDown />
      </View>
    </TouchableOpacity>
  );
};

export default ReasonSelector;import { FC } from "react";
