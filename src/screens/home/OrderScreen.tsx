import { View, Text, ActivityIndicator, Alert } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AcceptOrderCard from '../../components/OrderCard/AcceptOrderCard';

interface Order {
  orderId: string;
  customerId: string;
  item: string;
  driverId: string;
  dropoffLocation: string;
  pickupLocation: string;
  note: string;
  price: string;
  status: string;
}

const OrderScreen = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [acceptedOrdersCount, setAcceptedOrdersCount] = useState(0); // Count accepted orders
  const [driverId, setDriverId] = useState<string | null>(null); // Store driverId

  // Fetch driverId from AsyncStorage
  useEffect(() => {
    const fetchDriverId = async () => {
      const storedDriverId = await AsyncStorage.getItem('driverId');
      if (storedDriverId) {
        setDriverId(storedDriverId);
      } else {
        showAlert('Lỗi', 'Không tìm thấy Driver ID');
        setLoading(false);  // Set loading to false if no driverId
      }
    };
    fetchDriverId();
  }, []);

  const showAlert = (title: string, message: string) => {
    Alert.alert(title, message);
  };

  // Fetch ongoing orders for the driver
  const fetchOrderOngoing = async () => {
    if (!driverId) return;

    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        showAlert('Lỗi', 'Không tìm thấy token xác thực');
        return;
      }

      const response = await fetch(`http://10.0.2.2:3000/order/ongoing/${driverId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        showAlert('Lỗi', data.message || 'Lấy đơn hàng thất bại');
      } else {
        // Update orders with only ongoing ones
        setOrders(data.filter((order: Order) => order.status !== 'ST003')); // Exclude completed or canceled orders
        setAcceptedOrdersCount(data.filter((order: Order) => order.status === 'Accepted').length);
      }
    } catch (error) {
      console.error('Lỗi khi lấy đơn hàng:', error);
      showAlert('Lỗi', 'Không thể lấy danh sách đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (driverId) {
        fetchOrderOngoing();
        console.log('Màn hình đơn hàng đã được focus');
      }
    }, [driverId]) // Re-fetch orders when driverId changes
  );

  // Complete the order (mark as completed)
  const handleCompleteOrder = async (orderId: string) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        showAlert('Lỗi', 'Không tìm thấy token xác thực');
        return;
      }

      const response = await fetch(`http://10.0.2.2:3000/order/complete/${orderId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ statusId: 'ST003' }), // Set status to completed (ST003)
      });

      const data = await response.json();

      if (!response.ok) {
        showAlert('Lỗi', data.message || 'Hoàn thành đơn hàng thất bại');
      } else {
        showAlert('Thành công', 'Đơn hàng đã hoàn thành');
        // Update orders state after completing the order
        setOrders((prevOrders) => prevOrders.filter((order) => order.orderId !== orderId));
      }
    } catch (error) {
      console.error('Lỗi khi hoàn thành đơn hàng:', error);
      showAlert('Lỗi', 'Hoàn thành đơn hàng thất bại');
    }
  };

  // Decline the order (mark as cancelled with a reason)
  const handleDeclinedOrder = async (orderId: string, reasonFailed: string) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        showAlert('Lỗi', 'Không tìm thấy token xác thực');
        return;
      }

      const response = await fetch(`http://10.0.2.2:3000/order/cancel/${orderId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          statusId: 'ST003', // Set status to cancelled (ST003)
          reasonFailed: reasonFailed, // Pass the reason for cancellation
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        showAlert('Lỗi', data.message || 'Huỷ đơn hàng thất bại');
      } else {
        showAlert('Thành công', 'Đơn hàng đã bị huỷ');
        // Update orders state after cancelling the order
        setOrders((prevOrders) => prevOrders.filter((order) => order.orderId !== orderId));
      }
    } catch (error) {
      console.error('Lỗi khi huỷ đơn hàng:', error);
      showAlert('Lỗi', 'Huỷ đơn hàng thất bại');
    }
  };

  useEffect(() => {
    // Fetch orders when the count of accepted orders changes
    fetchOrderOngoing();
  }, [acceptedOrdersCount]);

  return (
    <View className="flex-1">
      <View className="items-center my-5">
        <Text className="font-bold text-2xl">Đơn hàng đã nhận</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView>
          {orders.length > 0 ? (
            <AcceptOrderCard
              orders={orders}
              onCompleteOrder={handleCompleteOrder}
              onDeclinedOrder={handleDeclinedOrder}
            />
          ) : (
            <View className="items-center p-5">
              <Text className="text-lg">Không có đơn hàng nào.</Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default OrderScreen;
