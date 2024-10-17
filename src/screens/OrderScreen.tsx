import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import AcceptOrderCard from '../components/OrderCard/AcceptOrderCard';

interface Order {
  orderId: string;
  customerId: string;
  item: string;
  dropoffLocation: string;
  pickupLocation: string;
  note: string;
  price: string;
}

const OrderScreen = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true); // Loading state

  const fetchOrderOngoing = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/order/ongoing');
      const data = await response.json();
      setOrders(data); // Set the fetched orders
    } catch (error) {
      console.error('Error fetching ongoing orders:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchOrderOngoing();
  }, []);

  const handleCompleteOrder = (code: string) => {
    console.log(`Order completed: ${code}`);
    // Additional logic for completing the order can be implemented here
  };

  const handleDeclinedOrder = (code: string) => {
    console.log(`Order declined: ${code}`);
    // Additional logic for declining the order can be implemented here
  };

  return (
    <View className="flex-1">
      <View className="items-center my-5">
        <Text className="font-bold text-2xl">Đơn hàng đã nhận</Text>
      </View>
      {loading ? ( // Show loading indicator while fetching
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView>
          {orders.length > 0 ? (
            <AcceptOrderCard
              orders={orders} // Pass the entire orders array
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