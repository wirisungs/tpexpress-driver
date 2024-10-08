import { View, Text } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import AcceptOrderCard from '../components/OrderCard/AcceptOrderCard'

const OrderScreen = () => {
  return (
    <ScrollView>
      <View className="items-center my-5">
        <Text className="font-bold text-2xl">Đơn hàng đã nhận</Text>
      </View>
      <AcceptOrderCard/>
    </ScrollView>
  )
}

export default OrderScreen