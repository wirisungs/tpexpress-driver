import React from "react";
import { View, Text, Modal } from "react-native";
import ConfirmationButton from "../Button/ConfirmationButton";
import ImageUploader from "../ImageUploader/ImageUploader";
import BeautifulBox from "../../svg/BeautifulBox";

interface ConfirmationScreenProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  isVisible,
  onConfirm,
  onCancel,
}) => {
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
          <BeautifulBox />
          <View className="self-stretch mt-5 text-3xl font-bold leading-none text-center text-neutral-900">
            <Text className="text-center font-bold text-base">Ảnh xác nhận đơn</Text>
          </View>
          <ImageUploader />
            <View className="flex flex-row justify-center mt-5 max-w-full text-xl font-semibold text-center rounded-none w-[260px] space-x-4">
            <ConfirmationButton onPress={onCancel} variant="outline">
              Trở về
            </ConfirmationButton>
            <ConfirmationButton onPress={onConfirm} variant="solid">
              Xác nhận
            </ConfirmationButton>
            </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationScreen;