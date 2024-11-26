import React, { useEffect, useState } from 'react';
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
  const [driverId, setDriverId] = useState<string | null>(null);

  useEffect(() => {
    const fetchDriverId = async () => {
      const storedDriverId = await AsyncStorage.getItem('driverId');
      setDriverId(storedDriverId);
    };
    fetchDriverId();
  }, []);

  const handleAcceptOrder = async () => {
    try {
      // Retrieve the token and driverId from AsyncStorage
      const token = await AsyncStorage.getItem('userToken');
      const storedDriverId = await AsyncStorage.getItem('driverId');

      if (!token || !storedDriverId) {
        throw new Error('Không tìm thấy token hoặc driverId');
      }

      // Send PUT request to accept the order
      const response = await fetch(`http://10.0.2.2:3000/order/accept/${order.orderId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          statusId: 'ST002',  // Status for accepted orders
          driverId: storedDriverId  // Gửi driverId từ AsyncStorage
        }),
      });

      // Check if the response is not ok (non-2xx status)
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Lỗi nhận đơn từ hệ thống');
      }

      // Parse the response data
      const data = await response.json();

      // Handle any backend-specific errors, such as validation errors
      if (data && data.error) {
        throw new Error(data.error || 'Lỗi không xác định');
      }

      // Show success alert
      Alert.alert('Thành công', 'Đã nhận đơn thành công');

      // Update the parent component state
      onAcceptOrder(order.orderId);  // This can be used to update the UI or remove the accepted order from the list

    } catch (error) {
      if (error instanceof Error) {
        // Handle known errors such as missing token or response issues
        Alert.alert('Lỗi', error.message);
      } else if ((error as Error).message === 'Network request failed') {
        // Handle network errors
        Alert.alert('Lỗi mạng', 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối internet của bạn.');
      } else {
        // Catch-all for unexpected errors
        Alert.alert('Lỗi', 'Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau.');
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
      <StyledText className="text-lg mb-1">Ghi chú: {order.orderNote || 'Không có ghi chú'}</StyledText>
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
