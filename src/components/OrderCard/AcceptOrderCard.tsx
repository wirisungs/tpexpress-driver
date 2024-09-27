import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import tempOrders from '../../data/tempOrders'; // Added import
import Divider from './Divider';
import ConfirmationPopup from '../Popup/ConfirmationPopup'; // Import the custom ConfirmationScreen

interface Order {
  Code: string;
  ReceiverName: string;
  SDT: string;
  Address: string;
  Note: string;
  Price: string;
}

interface OrderCardProps {
  orders: Order[];
  onAcceptOrder: (code: string) => void;
  onCompleteOrder: (code: string) => void;
  onDeclinedOrder: (code: string) => void;
}

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const AcceptOrderCard: React.FC<OrderCardProps> = ({ orders, onCompleteOrder, onDeclinedOrder }) => {
  const [selectedOrderCode, setSelectedOrderCode] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  // Show confirmation modal
  const handleShowModal = (code: string) => {
    setSelectedOrderCode(code);
    setModalVisible(true);
  };

  // Handle confirmation
  const handleConfirm = () => {
    if (selectedOrderCode) {
      onCompleteOrder(selectedOrderCode);
    }
    setModalVisible(false);
    setSelectedOrderCode(null);
  };

  // Handle cancel
  const handleCancel = () => {
    setModalVisible(false);
    setSelectedOrderCode(null);
  };

  return (
    <StyledView>
      {orders.map((item) => (
        <StyledView key={item.Code} className="bg-white rounded-lg p-4 my-2 mx-3 shadow">
          <StyledText className="font-bold text-xl mb-2">{item.Code}</StyledText>
          <Divider />
          <StyledText className="text-lg mb-1 mt-1">Người nhận: {item.ReceiverName}</StyledText>
          <StyledText className="text-lg mb-1">Số điện thoại: {item.SDT}</StyledText>
          <StyledText className="text-lg mb-1">Địa chỉ: {item.Address}</StyledText>
          <StyledText className="text-lg mb-1">Note: {item.Note}</StyledText>
          <StyledView className="flex-col justify-between items-center mt-2">
            <Divider />
            <StyledView className="flex-row justify-between w-full gap-25 mt-2">
              <StyledText className="font-bold text-xl">Tổng: </StyledText>
              <StyledText className="font-bold text-xl text-red-500">{item.Price}</StyledText>
            </StyledView>
            <StyledView className="flex-row space-x-1">
              <StyledTouchableOpacity
                className="w-1/2 h-12 rounded-xl mt-4"
                onPress={() => onDeclinedOrder(item.Code)}
                style={{ borderRadius: 12 }}
              >
                <StyledView className="py-2 items-center" style={{ backgroundColor: '#EB455F', borderRadius: 12 }}>
                  <StyledText className="text-white font-bold text-lg">Huỷ</StyledText>
                </StyledView>
              </StyledTouchableOpacity>
              <StyledTouchableOpacity
                className="w-1/2 h-12 rounded-xl mt-4"
                onPress={() => handleShowModal(item.Code)} // Trigger the modal on press
                style={{ borderRadius: 12 }}
              >
                <StyledView className="py-2 items-center" style={{ backgroundColor: '#5DC061', borderRadius: 12 }}>
                  <StyledText className="text-white font-bold text-lg">Hoàn tất</StyledText>
                </StyledView>
              </StyledTouchableOpacity>
            </StyledView>
          </StyledView>
        </StyledView>
      ))}

      {/* Render the ConfirmationScreen modal */}
      <ConfirmationPopup
        isVisible={isModalVisible}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </StyledView>
  );
};

// Example usage of OrderCard with tempOrders
const ExampleUsage = () => {
  const handleAcceptOrder = (code: string) => {
    console.log(`Order accepted: ${code}`);
  };

  const handleCompleteOrder = (code: string) => {
    console.log(`Order completed: ${code}`);
  };

  const handleDeclinedOrder = (code: string) => {
    console.log(`Order declined: ${code}`);
  }

  return <AcceptOrderCard orders={tempOrders} onAcceptOrder={handleAcceptOrder} onCompleteOrder={handleCompleteOrder} onDeclinedOrder={handleDeclinedOrder} />;
};

export default ExampleUsage;