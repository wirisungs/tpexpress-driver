import { View, Text, Switch, ScrollView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import OrderCard from '../components/OrderCard/OrderCard';
import ActivityState from '../assets/ActivityState.png'; // Ensure this path is correct

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
      <View className="flex-col mb-4 items-start">
        <Text className="text-base font-bold mr-2">Trạng thái hoạt động</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isWorking ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setIsWorking((prev) => !prev)}
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
            <Text>No orders available</Text>
          )
        ) : (
          <View className="flex-col items-center">
            <Text className="text-center p-7 text-xl">Chuyển đổi trạng thái hoạt động để xem đơn hàng</Text>
            <Image source={ActivityState} style={{ width: 300, height: 300 }} />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;