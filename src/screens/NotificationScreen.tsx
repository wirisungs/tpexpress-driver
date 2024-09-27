import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Noti from '../components/Noti'

const NotificationScreen = () => {
  return (
    <ScrollView>
      <Noti
        orderNumber="J9DNJWA320D"
        date="10/03/2024"
        message="Đơn hàng J9DNJWA32OD của bạn đã được giao thành công"
      />
    </ScrollView>
  )
}

export default NotificationScreen