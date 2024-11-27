import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import { useFocusEffect } from '@react-navigation/native';

const RevenueScreen = () => {
  const [data, setData] = useState<{
    completedOrders: number;
    totalRevenue: number;
    todayRevenue: number;
    failedOrders: number;
    driverRevenue: number;
    companyRevenue: number;
    transactions?: Array<{ date: string; name: string; amount: string; type: string }>;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Format tiền tệ theo chuẩn VND
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  // Reset data when the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      setData(null); // Clear previous data
      setLoading(true); // Set loading to true
      setError(null); // Clear any previous error

      // Fetch revenue data after resetting
      const fetchRevenueData = async () => {
        try {
          const driverId = await AsyncStorage.getItem('driverId'); // Lấy driverId từ storage
          if (!driverId) throw new Error("Driver ID không tồn tại!");

          const response = await fetch(`http://10.0.2.2:3000/order/revenue/${driverId}`);
          if (!response.ok) throw new Error("Không thể lấy dữ liệu doanh thu!");

          const result = await response.json();
          setData(result);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Đã xảy ra lỗi không xác định");
        } finally {
          setLoading(false);
        }
      };

      fetchRevenueData();
    }, [])
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#000" />
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500 font-bold">Lỗi: {error}</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-600">Không có dữ liệu để hiển thị</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white px-4 py-6">
      {/* Summary Cards */}
      <View className="flex-row justify-between mb-6">
        <View className="w-1/2 p-4 rounded-lg" style={{ backgroundColor: '#FFE0E0' }}>
          <Text className="text-lg font-bold text-gray-800">Tổng đơn đã giao</Text>
          <Text className="text-2xl font-extrabold text-gray-900 mt-2">{data.completedOrders}</Text>
        </View>
        <View className="w-1/2 p-4 rounded-lg ml-2" style={{ backgroundColor: '#FFE0E0' }}>
          <Text className="text-lg font-bold text-gray-800">Tổng doanh thu</Text>
          <Text className="text-2xl font-extrabold text-gray-900 mt-2">{formatCurrency(data.totalRevenue)}</Text>
        </View>
      </View>
      <View className="flex-row justify-between mb-6">
        <View className="w-1/2 p-4 rounded-lg" style={{ backgroundColor: '#FFE0E0' }}>
          <Text className="text-lg font-bold text-gray-800">Doanh thu hôm nay</Text>
          <Text className="text-2xl font-extrabold text-gray-900 mt-2">{formatCurrency(data.todayRevenue)}</Text>
        </View>
        <View className="w-1/2 p-4 rounded-lg ml-2" style={{ backgroundColor: '#FFE0E0' }}>
          <Text className="text-lg font-bold text-gray-800">Tổng đơn thất bại</Text>
          <Text className="text-2xl font-extrabold text-gray-900 mt-2">{data.failedOrders}</Text>
        </View>
      </View>

      {/* Transaction History */}
      <Text className="text-xl font-bold text-gray-800 mb-4">Lịch sử</Text>
      {data.transactions && data.transactions.length > 0 ? (
        data.transactions.map((transaction, index) => {
          const isValidDate = !isNaN(new Date(transaction.date).getTime());
          return (
            <View
              key={index}
              className="flex-row justify-between items-center bg-gray-100 rounded-lg p-4 mb-2"
            >
              <View>
                <Text className="text-base font-bold text-gray-800">
                  {isValidDate ? format(new Date(transaction.date), 'dd/MM/yyyy') : 'Invalid Date'}
                </Text>
                <Text className="text-sm text-gray-600">
                  {transaction.name || 'Khách hàng không xác định'}
                </Text>
              </View>
              <Text
                className={`text-base font-bold ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {transaction.amount}
              </Text>
            </View>
          );
        })
      ) : (
        <Text className="text-gray-600">Không có giao dịch nào để hiển thị</Text>
      )}
    </ScrollView>
  );
};

export default RevenueScreen;
