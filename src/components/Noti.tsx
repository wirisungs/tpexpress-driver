import React from 'react';
import { View, Image, Text } from 'react-native';
import Order from '../svg/Order';

type OrderNotificationProps = {
  orderNumber: string;
  date: string;
  message: string;
};

const OrderNotification: React.FC<OrderNotificationProps> = ({ orderNumber, date, message }) => {
  return (
    <View className="flex-row gap-3 px-6 max-w-1 bg-white shadow-md">
      <View className="px-2 py-3 w-[32px] h-[32px]">
        <Order fill="#e91e63"/>
      </View>
      <View className="flex flex-col flex-1 shrink py-3 pr-3 basis-0 min-w-[240px]">
        <View className="flex items-center w-full text-xs leading-loose">
          <View className="self-stretch my-auto">
            <Text>Đơn hàng</Text>
          </View>
          <View className="flex-1 shrink self-stretch my-auto text-right text-indigo-700 basis-0">
            <Text>{date}</Text>
          </View>
        </View>
        <View className="flex flex-col flex-1 w-full">
          <View className="text-lg font-bold leading-none text-ellipsis text-neutral-900">
            <Text className="text-base font-bold">Đã nhận đơn hàng {orderNumber}</Text>
          </View>
          <View className="flex-1 text-xs leading-5 whitespace-nowrap text-ellipsis text-neutral-500">
            <Text>{message}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OrderNotification;