import { View, Text, Switch, ScrollView, Alert, Image } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import OrderCard from '../../components/OrderCard/OrderCard';
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

const HomeScreen = () => {
  const [isWorking, setIsWorking] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [driverId, setDriverId] = useState<string | null>(null);

  // Fetch driverId when the component mounts
  useEffect(() => {
    const fetchDriverId = async () => {
      const storedDriverId = await AsyncStorage.getItem('driverId');
      setDriverId(storedDriverId);
    };
    fetchDriverId();
  }, []);

  // Toggle driver status
  const toggleDriverStatus = async () => {
    if (!driverId) return;

    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`http://10.0.2.2:3000/driver/toggle-status/${driverId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const text = await response.text();
      console.log('Response text:', text);

      if (response.ok) {
        const data = JSON.parse(text);
        console.log(`Driver status updated: ${data.message}`);
        setIsWorking(data.driverStatus); // Update the status based on response
        fetchOrders(); // Re-fetch orders when status changes
      } else {
        console.error('Failed to update driver status:', text);
      }
    } catch (error) {
      console.error('Error toggling driver status:', error);
    }
  };

  // Fetch orders from the back-end
  const fetchOrders = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Error', 'No authentication token found');
        return;
      }

      const response = await fetch('http://10.0.2.2:3000/order/pending', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to fetch orders:', errorData);
        throw new Error(`Error fetching orders: ${errorData.message || 'Unknown error'}`);
      }

      const data = await response.json();
      setOrders(data); // Update the state with fetched orders
    } catch (error) {
      console.error('Error fetching orders:', error instanceof Error ? error.message : error);
    }
  };

  // useFocusEffect to refresh orders when the screen is focused
  useFocusEffect(
    useCallback(() => {
      if (isWorking) {
        fetchOrders();
      }
    }, [isWorking])
  );

  // Handle toggle state change
  const handleToggleChange = () => {
    setIsWorking((prev) => !prev);
    toggleDriverStatus();
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <View className="flex-col mb-4 items-start">
        <Text className="text-base font-bold mr-2">Trạng thái hoạt động</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isWorking ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={handleToggleChange}
          value={isWorking}
        />
        <Text className="text-sm" style={{ color: isWorking ? 'green' : 'red' }}>
          {isWorking ? "Đang hoạt động" : "Không hoạt động"}
        </Text>
      </View>

      <ScrollView className="flex-1">
        {isWorking ? (
          orders.length > 0 ? (
            orders.map((order) => (
              <OrderCard key={order.orderId} order={order} onAcceptOrder={(id) => console.log(`Order accepted: ${id}`)} />
            ))
          ) : (
            <Text>Không có đơn hàng</Text>
          )
        ) : (
          <View className="flex-col items-center">
            <Text className="text-center p-7 text-xl">Chuyển đổi trạng thái hoạt động để xem đơn hàng</Text>
            {/* <Image source={ActivityState} style={{ width: 300, height: 300 }} /> */}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
