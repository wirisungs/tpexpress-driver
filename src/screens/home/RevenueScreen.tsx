import React from "react";
import { View, Text, ScrollView } from "react-native";

const RevenueScreen = () => {
  const transactions = [
    { date: "23/11/2024", name: "Trần Hữu Minh Trí", amount: "+50.000vnđ", type: "income" },
    { date: "23/11/2024", name: "Trần Hữu Minh Trí", amount: "-20.000vnđ", type: "expense" },
    { date: "23/11/2024", name: "Trần Hữu Minh Trí", amount: "-20.000vnđ", type: "expense" },
  ];

  return (
    <ScrollView className="flex-1 bg-white px-4 py-6">
      {/* Summary Cards */}
      <View className="flex-row justify-between mb-6">
        <View className="w-1/2 p-4 rounded-lg" style={{ backgroundColor: '#FFE0E0' }}>
          <Text className="text-lg font-bold text-gray-800">Tổng đơn đã giao</Text>
          <Text className="text-2xl font-extrabold text-gray-900 mt-2">200</Text>
        </View>
        <View className="w-1/2 p-4 rounded-lg ml-2" style={{ backgroundColor: '#FFE0E0' }}>
          <Text className="text-lg font-bold text-gray-800">Tổng doanh thu</Text>
          <Text className="text-2xl font-extrabold text-gray-900 mt-2">220K</Text>
        </View>
      </View>
      <View className="flex-row justify-between mb-6">
        <View className="w-1/2 p-4 rounded-lg" style={{ backgroundColor: '#FFE0E0' }}>
          <Text className="text-lg font-bold text-gray-800">Doanh thu hôm nay</Text>
          <Text className="text-2xl font-extrabold text-gray-900 mt-2">20K</Text>
        </View>
        <View className="w-1/2 p-4 rounded-lg ml-2" style={{ backgroundColor: '#FFE0E0' }}>
          <Text className="text-lg font-bold text-gray-800">Tổng đơn thất bại</Text>
          <Text className="text-2xl font-extrabold text-gray-900 mt-2">199</Text>
        </View>
      </View>

      {/* Transaction History */}
      <Text className="text-xl font-bold text-gray-800 mb-4">Lịch sử</Text>
      {transactions.map((transaction, index) => (
        <View
          key={index}
          className="flex-row justify-between items-center bg-gray-100 rounded-lg p-4 mb-2"
        >
          <View>
            <Text className="text-base font-bold text-gray-800">{transaction.date}</Text>
            <Text className="text-sm text-gray-600">{transaction.name}</Text>
          </View>
          <Text
            className={`text-base font-bold ${
              transaction.type === "income" ? "text-green-600" : "text-red-600"
            }`}
          >
            {transaction.amount}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default RevenueScreen;
