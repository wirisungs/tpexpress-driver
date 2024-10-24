/**
 * This code was generated by Builder.io.
 */
import React from "react";
import { View, Text } from "react-native";

interface InvoiceItem {
  name: string;
  quantity: number;
}

interface InvoiceSummary {
  label: string;
  amount: string;
}

const invoiceItems: InvoiceItem[] = [
  { name: "Móc khóa", quantity: 1 },
  { name: "Đồ Chơi Lắp Ráp Rồng Con Riyu LEGO NINJAGO 71810", quantity: 1 },
  { name: "Ốp điện thoại", quantity: 1 },
];

const invoiceSummary: InvoiceSummary[] = [
  { label: "Phí thu hộ (COD):", amount: "1.797.000đ" },
  { label: "Phí vận:", amount: "30.000đ" },
  { label: "Tổng:", amount: "1.827.000đ" },
];

const Invoice: React.FC = () => {
  return (
    <View className="flex flex-col mt-6 w-full rounded-3xl bg-zinc-50">
      <View className="flex items-center py-1.5 w-full">
        <View className="flex-1 shrink self-stretch my-auto text-xl font-bold leading-snug basis-0 text-neutral-900">
          <Text>Hóa đơn</Text>
        </View>
        <View className="flex-1 shrink self-stretch my-auto text-base leading-6 text-center whitespace-nowrap bg-teal-600 rounded-2xl min-h-[30px] text-zinc-50 w-[115px]">
          <Text>12/12/2025</Text>
        </View>
      </View>
      <View className="mt-3 w-full border border-solid border-stone-300 min-h-[1px]" />
      <View className="flex flex-col mt-3 w-full text-base leading-none text-neutral-900">
        {invoiceItems.map((item, index) => (
          <View
            key={index}
            className={`flex gap-1.5 items-center ${
              index > 0 ? "mt-2" : ""
            } w-full`}
          >
            <View className="flex-1 shrink self-stretch my-auto basis-0">
              <Text>{item.name}</Text>
            </View>
            <View className="self-stretch my-auto text-right w-[30px]">
              <Text>x{item.quantity}</Text>
            </View>
          </View>
        ))}
      </View>
      <View className="mt-3 w-full border border-solid border-stone-300 min-h-[1px]" />
      <View className="flex flex-col mt-3 w-full text-lg font-medium leading-none text-neutral-900">
        {invoiceSummary.map((item, index) => (
          <View
            key={index}
            className={`flex justify-center items-start ${
              index > 0 ? "mt-2" : ""
            } w-full ${item.label === "Tổng:" ? "whitespace-nowrap" : ""}`}
          >
            <View className="flex-1 shrink basis-0">
              <Text>{item.label}</Text>
            </View>
            <View className="flex-1 shrink text-right basis-0">
              <Text>{item.amount}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Invoice;
