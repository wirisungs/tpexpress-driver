import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface RouteParams {
    currentPage: string;
    setCurrentPage: (page: string) => void;
}

const NavOrder: React.FC<RouteParams> = ({ currentPage, setCurrentPage }) => {
  return (
    <View className="flex-row justify-around py-4">

      <TouchableOpacity
        className="flex-1 justify-center items-center px-2 py-1"
        onPress={() => setCurrentPage("ST003")}
      >
        <Text className={`text-base ${currentPage === "ST003" ? "text-red-500" : "text-black"} font-medium text-center`}>
          Đơn đã hoàn thành
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="flex-1 justify-center items-center px-2 py-1"
        onPress={() => setCurrentPage("ST004")}
      >
        <Text className={`text-base ${currentPage === "ST004" ? "text-red-500" : "text-black"} font-medium text-center`}>
          Đơn giao đã huỷ
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NavOrder;
