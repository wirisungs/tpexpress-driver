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
  const [acceptedOrdersCount, setAcceptedOrdersCount] = useState(0); // State to track the number of accepted orders

  const fetchOrderOngoing = async () => {
    try {
      // Get the auth token from AsyncStorage
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        // If no token is found, show an error message
        Alert.alert('Error', 'No authentication token found');
        return;
      }

      // Make the request to fetch orders, attaching the token in the Authorization header
      const response = await fetch('http://10.0.2.2:3000/order/ongoing', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle error response from the server
        Alert.alert('Error', data.message || 'Failed to fetch orders');
      } else {
        // Set the fetched orders to state
        setOrders(data);
        // Update the accepted orders count
        setAcceptedOrdersCount(data.filter((order: Order) => order.status === 'Accepted').length);
      }
    } catch (error) {
      console.error('Error fetching ongoing orders:', error);
    } finally {
      // Set loading to false after fetching is complete
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      // Refresh logic here
      fetchOrderOngoing();
      console.log('OrderScreen is focused');

      return () => {
        // Cleanup if needed
      };
    }, [])
  );

  const handleCompleteOrder = async (orderId: string) => {
    try {
      // Get the auth token from AsyncStorage
      const token = await AsyncStorage.getItem('userToken');

      if (!token) {
        // If no token is found, show an error message
        Alert.alert('Error', 'No authentication token found');
        return;
      }

      // Make the request to complete the order, attaching the token in the Authorization header
      const response = await fetch(`http://10.0.2.2:3000/order/complete/${orderId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ statusId: 'ST003' })
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle error response from the server
        Alert.alert('Error', data.message || 'Failed to complete order');
      } else {
        Alert.alert('Success', 'Order completed successfully');
        // Re-fetch the orders after completing an order
        fetchOrderOngoing();
      }
    } catch (error) {
      console.error('Error completing order:', error);
      Alert.alert('Error', 'Failed to complete order');
    }
  };

  const handleDeclinedOrder = async (orderId: string) => {
    try {
      // Get the auth token from AsyncStorage
      const token = await AsyncStorage.getItem('userToken');

      if (!token) {
        // If no token is found, show an error message
        Alert.alert('Error', 'No authentication token found');
        return;
      }

      // Make the request to cancel the order, attaching the token in the Authorization header
      const response = await fetch(`http://10.0.2.2:3000/order/cancel/${orderId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ statusId: 'ST003' })
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle error response from the server
        Alert.alert('Error', data.message || 'Failed to cancel order');
      } else {
        Alert.alert('Success', 'Order cancelled successfully');
        // Re-fetch the orders after declining an order
        fetchOrderOngoing();
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      Alert.alert('Error', 'Failed to cancel order');
    }
  };

  useEffect(() => {
    if (acceptedOrdersCount > 1) {
      //Alert.alert('Warning', 'You have more than one accepted order');
      fetchOrderOngoing(); // Refresh orders
    } else if (acceptedOrdersCount === 0) {
      //Alert.alert('Warning', 'You have no accepted orders');
      fetchOrderOngoing(); // Refresh orders
    }
  }, [acceptedOrdersCount]);

  return (
    <View className="flex-1">
      <View className="items-center my-5">
        <Text className="font-bold text-2xl">Đơn hàng đã nhận</Text>
      </View>

      {loading ? (
        // Show loading indicator while fetching orders
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView>
          {orders.length > 0 ? (
            // Display the orders using the AcceptOrderCard component
            <AcceptOrderCard
              orders={orders}
              onCompleteOrder={handleCompleteOrder}
              onDeclinedOrder={handleDeclinedOrder}
            />
          ) : (
            // Show message if no orders are found
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
