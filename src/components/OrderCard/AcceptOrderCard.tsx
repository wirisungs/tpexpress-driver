import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import Divider from './Divider';
import ConfirmationPopup from '../Popup/ConfirmationPopup';
import DeclinedPopup from '../Popup/DeclinedPopup';

interface Order {
  orderId: string;
  customerId: string;
  item: string;
  dropoffLocation: string;
  pickupLocation: string;
  note: string;
  price: string;
}

interface AcceptOrderCardProps {
  orders: Order[];
  onCompleteOrder: (code: string) => void;
  onDeclinedOrder: (code: string) => void;
}

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const AcceptOrderCard: React.FC<AcceptOrderCardProps> = ({ orders, onCompleteOrder, onDeclinedOrder }) => {
  const [selectedOrderCode, setSelectedOrderCode] = useState<string | null>(null);
  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);
  const [isDeclineModalVisible, setDeclineModalVisible] = useState(false);

  // Show confirmation modal
  const handleShowConfirmModal = (code: string) => {
    setSelectedOrderCode(code);
    setConfirmModalVisible(true);
  };

  // Show decline modal
  const handleShowDeclinedModal = (code: string) => {
    setSelectedOrderCode(code);
    setDeclineModalVisible(true);
  };

  // Handle confirmation
  const handleConfirm = () => {
    if (selectedOrderCode) {
      onCompleteOrder(selectedOrderCode);
    }
    handleCancel(); // Close modal and reset selected order
  };

  // Handle decline
  const handleDecline = () => {
    if (selectedOrderCode) {
      onDeclinedOrder(selectedOrderCode);
    }
    handleCancel(); // Close modal and reset selected order
  };

  // Cancel modal for both confirmation and decline
  const handleCancel = () => {
    setConfirmModalVisible(false);
    setDeclineModalVisible(false);
    setSelectedOrderCode(null);
  };

  return (
    <StyledView>
      {orders.map((item) => (
        <StyledView key={item.orderId} className="bg-white rounded-lg p-4 my-2 mx-3 shadow">
          <StyledText className="font-bold text-xl mb-2">{item.orderId}</StyledText>
          <Divider />
          <StyledText className="text-lg mb-1 mt-1">Người nhận: {item.customerId}</StyledText>
          <StyledText className="text-lg mb-1">Mặt hàng: {item.item}</StyledText>
          <StyledText className="text-lg mb-1">Địa chỉ: {item.dropoffLocation}</StyledText>
          <StyledText className="text-lg mb-1">Note: {item.note}</StyledText>
          <StyledView className="flex-col justify-between items-center mt-2">
            <Divider />
            <StyledView className="flex-row justify-between w-full gap-2 mt-2">
              <StyledText className="font-bold text-xl">Tổng: </StyledText>
              <StyledText className="font-bold text-xl text-red-500">{item.price}</StyledText>
            </StyledView>
            <StyledView className="flex-row space-x-1">
              <StyledTouchableOpacity
                className="w-1/2 h-12 rounded-xl mt-4"
                onPress={() => handleShowDeclinedModal(item.orderId)}
                style={{ borderRadius: 12 }}
              >
                <StyledView className="py-2 items-center" style={{ backgroundColor: '#EB455F', borderRadius: 12 }}>
                  <StyledText className="text-white font-bold text-lg">Huỷ</StyledText>
                </StyledView>
              </StyledTouchableOpacity>
              <StyledTouchableOpacity
                className="w-1/2 h-12 rounded-xl mt-4"
                onPress={() => handleShowConfirmModal(item.orderId)}
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

      {/* Render the ConfirmationPopup modal */}
      <ConfirmationPopup
        isVisible={isConfirmModalVisible}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />

      {/* Render the DeclinedPopup modal */}
      <DeclinedPopup
        isVisible={isDeclineModalVisible}
        onConfirm={handleDecline}
        onCancel={handleCancel}
      />
    </StyledView>
  );
};

export default AcceptOrderCard;import { FC } from 'react';
