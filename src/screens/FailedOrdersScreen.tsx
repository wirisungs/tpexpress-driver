import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';

const orders = [
  { id: 'DBAHX8QJXD', name: 'Hỗn hợp đồ chơi', total: 1827000 },
  { id: 'DBAHX8QJXD', name: 'Hỗn hợp đồ chơi', total: 1827000 },
  { id: 'DBAHX8QJXD', name: 'Hỗn hợp đồ chơi', total: 1827000 },
  { id: 'DBAHX8QJXD', name: 'Hỗn hợp đồ chơi', total: 1827000 },
];

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

const FailedOrdersScreen: React.FC = () => {
  const navigation = useNavigation();
  return (
    <StyledView className="flex-1 bg-white">

      {/* Orders List */}
      <StyledScrollView contentContainerStyle={{ padding: 16 }}>
        {orders.map((order, index) => (
          <StyledView key={index} className="bg-white mb-4 p-4 rounded-lg border border-gray-200">
            <StyledView className="flex-row justify-between">
              <StyledText className="text-lg font-semibold">{order.id}</StyledText>
              <StyledTouchableOpacity>
                <StyledText className="text-blue-500 font-semibold">Chi tiết</StyledText>
              </StyledTouchableOpacity>
            </StyledView>
            <StyledText className="text-gray-500 mt-1">{order.name}</StyledText>
            <StyledView className="flex-row justify-between items-center mt-2">
              <StyledText className="text-gray-500">Tổng:</StyledText>
              <StyledText className="text-orange-500 text-lg font-bold">
                {order.total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
              </StyledText>
            </StyledView>
          </StyledView>
        ))}
      </StyledScrollView>

      {/* Bottom Navigation */}
      <StyledView className="flex-row justify-around py-4">
      <StyledTouchableOpacity className="flex-1 justify-center items-center px-2 py-1" onPress={() => navigation.navigate('FailedOrdersScreen' as never)}>
          <StyledText className="text-orange-500 font-semibold text-base">Đơn giao thất bại</StyledText>
        </StyledTouchableOpacity>
        <StyledTouchableOpacity className="flex-1 justify-center items-center px-2 py-1" onPress={() => navigation.navigate('CompletedOrdersScreen' as never)}>
          <StyledText className="text-gray-500 font-semibold text-base">Đơn đã hoàn thành</StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  );
};

export default FailedOrdersScreen;
