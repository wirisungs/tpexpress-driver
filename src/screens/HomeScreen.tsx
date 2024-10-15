import { View, Text, Switch, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import OrderCard from '../components/OrderCard/OrderCard';

interface Order {
  orderId: string;
  customerId: string;
  item: string;
  dropoffLocation: string;
  pickupLocation: string;
  note: string;
  price: string;
}

const HomeScreen = () => {
  const [isWorking, setIsWorking] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);

  // Fetch orders from the back-end
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://10.0.2.2:3000/order');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <View className="flex-1 p-4 bg-white">
      <View className="flex-row mb-4">
        <Text className="text-base">Trạng thái hoạt động</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isWorking ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setIsWorking((prev) => !prev)}
          value={isWorking}
        />
        <Text>
          {isWorking ? "Đang hoạt động" : "Không hoạt động"}
        </Text>
      </View>
      <ScrollView className="flex-1">
        {orders.length > 0 ? (
          orders.map((order) => (
            <OrderCard key={order.orderId} order={order} onAcceptOrder={(id) => console.log(`Order accepted: ${id}`)} />
          ))
        ) : (
          <Text>No orders available</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;