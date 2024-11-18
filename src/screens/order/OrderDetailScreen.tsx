import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import OrderStatus from "../../components/OrderTracking/OrderStatus";
import DeliveryInfo from "../../components/OrderTracking/DeliveryInfo";
import Invoice from "../../components/OrderTracking/Invoice";
import CancelButton from "../../components/OrderTracking/CancelButton";
import Copy from '../../svg/Copy'

const OrderDetailScreen: React.FC = () => {
  return (
    <ScrollView>
      <View className="flex flex-col p-6 max-w-[390px]">
        <View className="flex flex-col w-full rounded-3xl">
          <View className="flex w-full">
            <View className="text-2xl font-bold leading-none text-neutral-900 w-[165px]">
              <Text>DBAHX8QJXD</Text>
            </View>
            <View className="object-contain shrink-0 my-auto aspect-square w-[23px]">
              <Copy/>
            </View>
            <View className="flex-1 shrink text-sm font-medium leading-5 text-right basis-0 text-neutral-500">
              <Text>Xem thêm</Text>
            </View>
          </View>
          <OrderStatus />
        </View>
        <DeliveryInfo />
        <Invoice />
        <CancelButton />
      </View>
    </ScrollView>
  );
};

export default OrderDetailScreen;
