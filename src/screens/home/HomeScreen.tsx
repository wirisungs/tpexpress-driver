import { View, Text, Switch, ScrollView, Alert, AppState } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OrderCard from '../../components/OrderCard/OrderCard';

interface Order {
  orderId: string;
  // ... other order properties
}

const HomeScreen = () => {
  const [isWorking, setIsWorking] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [driverId, setDriverId] = useState<string | null>(null);

  // Fetch driverId when the component mounts
  useEffect(() => {
    const fetchDriverId = async () => {
      const storedDriverId = await AsyncStorage.getItem('driverId');
      if (storedDriverId) {
        setDriverId(storedDriverId);
      } else {
        console.error('Driver ID not found in AsyncStorage');
      }
    };
    fetchDriverId();

    // Listen to app state changes
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, []);

  const handleAppStateChange = async (nextAppState: string) => {
    if (nextAppState === 'background' || nextAppState === 'inactive') {
      await updateDriverStatus(false); // Set status to false when app goes to background
    }
  };

  // Toggle driver status
  const toggleDriverStatus = async () => {
    if (!driverId) return;

    const newStatus = !isWorking;
    console.log('Toggling status, new status:', newStatus);  // Thêm log để kiểm tra trạng thái mới

    setIsWorking(newStatus);
    await updateDriverStatus(newStatus);
    if (newStatus) fetchOrders(); // Re-fetch orders when turning on
  };

  // Update driver status in backend
  const updateDriverStatus = async (status: boolean) => {
    try {
      if (!driverId) {
        console.error('Driver ID is missing');
        return;
      }

      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        console.error('User token not found');
        return;
      }

      const response = await fetch(`http://10.0.2.2:3000/driver/toggle-status/${driverId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),  // Gửi status từ client
      });

      const data = await response.json();
      console.log('Driver status response:', data);

      if (response.ok) {
        console.log(`Driver status updated: ${data.message}`);
      } else {
        console.error('Failed to update driver status:', data.message);
      }
    } catch (error) {
      console.error('Error updating driver status:', error);
    }
  };

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Error', 'No authentication token found');
        return;
      }

      const response = await fetch('http://10.0.2.2:3000/order/pending', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        console.error('Failed to fetch orders:', await response.text());
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // Handle order acceptance
  const handleOrderAcceptance = (orderId: string) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.orderId !== orderId));
    // Alert.alert('Success', `Order ${orderId} accepted`);
  };

  // Handle toggle state change
  const handleToggleChange = () => {
    toggleDriverStatus();
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <View className="flex-col mb-4 items-start">
        <Text className="text-base font-bold mr-2">Trạng thái hoạt động</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isWorking ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={handleToggleChange}
          value={isWorking}
        />
        <Text className="text-sm" style={{ color: isWorking ? 'green' : 'red' }}>
          {isWorking ? 'Đang hoạt động' : 'Không hoạt động'}
        </Text>
      </View>

      <ScrollView className="flex-1">
        {isWorking ? (
          orders.length > 0 ? (
            orders.map((order) => (
              <OrderCard key={order.orderId} order={order} onAcceptOrder={handleOrderAcceptance} />
            ))
          ) : (
            <Text>Không có đơn hàng</Text>
          )
        ) : (
          <View className="flex-col items-center">
            <Text className="text-center p-7 text-xl">Chuyển đổi trạng thái hoạt động để xem đơn hàng</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
