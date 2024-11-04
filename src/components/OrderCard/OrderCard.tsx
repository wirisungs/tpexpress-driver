import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { styled } from 'nativewind';
import Divider from './Divider';
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

interface OrderCardProps {
  order: Order;
  onAcceptOrder: (orderId: string) => void;
}

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const OrderCard: React.FC<OrderCardProps> = ({ order, onAcceptOrder }) => {
  const handleAcceptOrder = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`http://10.0.2.2:3000/order/accept/${order.orderId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Order accepted successfully');
        onAcceptOrder(order.orderId);
      } else {
        Alert.alert('Error', data.message || 'Failed to accept order');
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'An unexpected error occurred');
      }
    }
  };

  return (
    <StyledView className="bg-white rounded-lg p-4 my-2 mx-3 shadow-xl">
      <StyledText className="font-bold text-xl mb-2">{order.orderId}</StyledText>
      <Divider />
      <StyledText className="text-lg mb-1 mt-1">Người nhận: {order.receiverName || 'N/A'}</StyledText>
      <StyledText className="text-lg mb-1">SDT Người nhận: {order.receiverPhone || 'N/A'}</StyledText>
      <StyledText className="text-lg mb-1">Địa chỉ giao: {order.receiverAddress || 'N/A'}</StyledText>
      <StyledText className="text-lg mb-1">Note: {order.orderNote || 'Không có ghi chú'}</StyledText>
      <StyledView className="flex-col justify-between items-center mt-2">
        <Divider />
        <StyledView className="flex-row justify-between w-full mt-2">
          <StyledText className="font-bold text-xl">Tổng: </StyledText>
          <StyledText className="font-bold text-xl text-red-500">
            {(order.totalPrice ?? 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
          </StyledText>
        </StyledView>
        <StyledTouchableOpacity
          className="w-1/2 h-12 rounded-xl mt-4"
          onPress={handleAcceptOrder}
          style={{ borderRadius: 12 }}
        >
          <StyledView className="py-2 items-center" style={{ backgroundColor: '#EB455F', borderRadius: 12 }}>
            <StyledText className="text-white font-bold text-lg">Nhận</StyledText>
          </StyledView>
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  );
};

export default OrderCard;
