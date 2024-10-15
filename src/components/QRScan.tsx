import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import React, { useState } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { styled } from 'nativewind';

type CameraFacing = 'front' | 'back';

// Styled components with nativewind
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function ScanQR() {
  const [facing, setFacing] = useState<CameraFacing>('back'); // Camera facing state
  const [permission, requestPermission] = useCameraPermissions(); // Camera permissions

  if (permission === null) {
    // Camera permissions are still loading.
    return <StyledView />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <StyledView className="flex-1 justify-center items-center">
        <StyledText className="text-center pb-2">Chúng tôi cần quyền truy cập để hiển thị camera</StyledText>
        <Button onPress={requestPermission} title="Cấp quyền" />
      </StyledView>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <StyledView className="flex-1 justify-center">
      <CameraView style={{ flex: 1 }} facing={facing}>
        <StyledView className="flex-1 flex-row bg-transparent m-16">
          <StyledTouchableOpacity className="flex-1 self-end items-center" onPress={toggleCameraFacing}>
            <StyledText className="text-2xl font-bold text-white">Lật camera</StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </CameraView>
    </StyledView>
  );
}