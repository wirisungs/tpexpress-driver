import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker"; // Correct import for Expo
import Plus from "../../svg/Plus";

const ImageUploader: React.FC = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  // Request permissions on component mount
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "Sorry, we need camera roll permissions to make this work!"
        );
      }
    })();
  }, []);

  const handleUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (result.canceled) {
        console.log("User canceled image picker");
      } else if (result.assets && result.assets.length > 0) {
        // Set the selected image URI
        setImageUri(result.assets[0].uri);
      } else {
        console.error("Image URI is undefined");
        Alert.alert("Error", "Selected image URI is undefined.");
      }
    } catch (error) {
      console.error("Unexpected error: ", error);
      Alert.alert("Error", "An unexpected error occurred.");
    }
  };

  return (
    <TouchableOpacity onPress={handleUpload}>
      <View className="flex flex-col justify-center items-center mt-5 max-w-full rounded-xl border-2 border-green-400 border-dashed min-h-[100px] w-[100px]">
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={{ width: 100, height: 100, borderRadius: 10 }}
          />
        ) : (
          <Plus />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ImageUploader;