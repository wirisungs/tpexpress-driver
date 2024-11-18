import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Order {
  orderId: string;
  cusId?: string;
  senderAddress?: string;
  receiverPhone?: string;
  receiverName?: string;
  receiverAddress?: string;
  orderType?: string;
  orderIsFragile?: boolean;
  orderNote?: string | null;
  orderCOD?: number;
  dservicesId?: string;
  totalPrice?: number;
  paymentId?: string | null;
  orderStatusId?: string;
  driverId?: string | null;
  createdDate?: Date;
  deliverPrice?: number;
  proofSuccess?: string | null;
  reasonFailed?: string | null;
}

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);

const CompletedOrdersScreen: React.FC = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchCompletedOrders = async () => {
    // Fetch completed orders
    try {
      // Retrieve the token if needed for authorization
      const token = await AsyncStorage.getItem('userToken');

      // Fetch orders from the backend
      const response = await fetch('http://10.0.2.2:3000/order/canceled', {
        headers: {
          'Authorization': `Bearer ${token}`, // Include token if the API requires authorization
          'Content-Type': 'application/json',
        },
      });

      // Check if the response is okay
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to fetch orders:', errorData);
        throw new Error(`Error fetching orders: ${errorData.message || 'Unknown error'}`);
      }

      // Parse the JSON data
      const data = await response.json();
      setOrders(data); // Update the state with fetched orders
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching orders:', error.message);
      } else {
        console.error('Error fetching orders:', error);
      }
    }
  };

  useEffect(() => {
    fetchCompletedOrders();
  }, []);

  return (
    <StyledView className="flex-1 bg-white">
      {/* Orders List */}
      <StyledScrollView contentContainerStyle={{ padding: 16 }}>
        {orders.map((order, index) => (
          <StyledView key={index} className="bg-white mb-4 p-4 rounded-lg border border-gray-200">
            <StyledView className="flex-row justify-between">
              <StyledText className="text-lg font-semibold">{order.orderId}</StyledText>
              <StyledTouchableOpacity>
                <StyledText className="text-blue-500 font-semibold">Chi tiết</StyledText>
              </StyledTouchableOpacity>
            </StyledView>
            <StyledText className="text-gray-500 mt-1">{order.receiverName}</StyledText>
            <StyledView className="flex-row justify-between items-center mt-2">
              <StyledText className="text-gray-500">Tổng:</StyledText>
              <StyledText className="text-orange-500 text-lg font-bold">
                {order.totalPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
              </StyledText>
            </StyledView>
          </StyledView>
        ))}
      </StyledScrollView>

      {/* Bottom Navigation */}
      <StyledView className="flex-row justify-around py-4">
        <StyledTouchableOpacity
          className="flex-1 justify-center items-center px-2 py-1"
          onPress={() => navigation.navigate('FailedOrdersScreen' as never)}
        >
          <StyledText className="text-orange-500 font-semibold text-base">Đơn giao thất bại</StyledText>
        </StyledTouchableOpacity>
        <StyledTouchableOpacity
          className="flex-1 justify-center items-center px-2 py-1"
          onPress={() => navigation.navigate('CompletedOrdersScreen' as never)}
        >
          <StyledText className="text-gray-500 font-semibold text-base">Đơn đã hoàn thành</StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  );
};

export default CompletedOrdersScreen;
