import React, { useState } from "react";
import { View, Text, Modal } from "react-native";
import ModalButton from "../Button/ModalButton";
import DeclinedBox from "../../svg/DeclinedBox";
import ReasonSelector from "../ReasonSelector";

interface ConfirmationScreenProps {
  isVisible: boolean;
  onConfirm: (reasonFailed: string) => void; // Send reasonFailed as a parameter
  onCancel: () => void;
}

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  isVisible,
  onConfirm,
  onCancel,
}) => {
  const [selectedReason, setSelectedReason] = useState<string>("");

  const handleReasonChange = (reason: string) => {
    setSelectedReason(reason);
  };

  const handleConfirm = () => {
    if (selectedReason) {
      onConfirm(selectedReason); // Pass the selected reasonFailed to onConfirm
    } else {
      alert("Vui lòng chọn lý do huỷ đơn!");
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true} // Make the modal background transparent
      visible={isVisible}
      onRequestClose={onCancel}
    >
      {/* Dark background overlay */}
      <View className="flex-1 justify-center items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        {/* Modal content */}
        <View className="flex overflow-hidden flex-col items-center px-6 py-8 rounded-xl bg-zinc-50 max-w-[344px]">
          <DeclinedBox />
          <View className="self-stretch mt-5 text-3xl font-bold leading-none text-center text-neutral-900">
            <Text className="text-center font-bold text-base">Lý do huỷ đơn</Text>
          </View>
          <View>
            <ReasonSelector
              reason={selectedReason}
              onReasonChange={handleReasonChange} // Update the selected reason
            />
          </View>
          <View className="inline-flex flex-row justify-center mt-5 max-w-full text-xl font-semibold text-center rounded-none w-[260px] space-x-4" role="group">
            <ModalButton onPress={onCancel} variant="outline">
              Trở về
            </ModalButton>
            <ModalButton onPress={handleConfirm} variant="solid">
              Xác nhận
            </ModalButton>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationScreen;
