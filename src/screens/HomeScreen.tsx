import { View, Text } from 'react-native'
import React from 'react'
import OrderCard from '../components/OrderCard/OrderCard'
import { ScrollView } from 'react-native-gesture-handler'


const HomeScreen = () => {
  return (
    <ScrollView>
      <OrderCard/>
    </ScrollView>
  )
}

export default HomeScreen