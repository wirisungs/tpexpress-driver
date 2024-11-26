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
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [acceptedOrdersCount, setAcceptedOrdersCount] = useState(0); // Đếm số lượng đơn hàng đã nhận
  const [driverId, setDriverId] = useState<string | null>(null); // Lưu driverId

  // Lấy driverId từ AsyncStorage
  useEffect(() => {
    const fetchDriverId = async () => {
      const storedDriverId = await AsyncStorage.getItem('driverId');
      if (storedDriverId) {
        setDriverId(storedDriverId);
      } else {
        showAlert('Lỗi', 'Không tìm thấy Driver ID');
        setLoading(false);  // Set loading = false ngay khi không có driverId
      }
    };
    fetchDriverId();
  }, []);

  const showAlert = (title: string, message: string) => {
    Alert.alert(title, message);
  };

  const fetchOrderOngoing = async () => {
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
        setOrders(data);
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
    }, [driverId]) // Cập nhật khi driverId thay đổi
  );

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
        body: JSON.stringify({ statusId: 'ST003' }),
      });

      const data = await response.json();

      if (!response.ok) {
        showAlert('Lỗi', data.message || 'Hoàn thành đơn hàng thất bại');
      } else {
        showAlert('Thành công', 'Đơn hàng đã hoàn thành');
        fetchOrderOngoing(); // Lấy lại danh sách đơn hàng sau khi hoàn thành
      }
    } catch (error) {
      console.error('Lỗi khi hoàn thành đơn hàng:', error);
      showAlert('Lỗi', 'Hoàn thành đơn hàng thất bại');
    }
  };

  const handleDeclinedOrder = async (orderId: string) => {
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
        body: JSON.stringify({ statusId: 'ST003' }),
      });

      const data = await response.json();

      if (!response.ok) {
        showAlert('Lỗi', data.message || 'Huỷ đơn hàng thất bại');
      } else {
        showAlert('Thành công', 'Đơn hàng đã bị huỷ');
        fetchOrderOngoing(); // Lấy lại danh sách đơn hàng sau khi huỷ
      }
    } catch (error) {
      console.error('Lỗi khi huỷ đơn hàng:', error);
      showAlert('Lỗi', 'Huỷ đơn hàng thất bại');
    }
  };

  useEffect(() => {
    if (acceptedOrdersCount > 1) {
      // Cập nhật đơn hàng
      fetchOrderOngoing();
    } else if (acceptedOrdersCount === 0) {
      // Cập nhật đơn hàng nếu không có đơn nào
      fetchOrderOngoing();
    }
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
