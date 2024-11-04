import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Order from "../../svg/Order";
import Wallet from "../../svg/Wallet";
import History from "../../svg/History";
import Security from "../../svg/Security";
import Help from "../../svg/Help";
import Terms from "../../svg/Terms";
import Info from "../../svg/Info";
import Guides from "../../svg/Guides";
import Settings from "../../svg/Settings";
import Profile from "../../svg/Profile";

interface SectionItemProps {
  imageUri: JSX.Element;
  text: string;
  screen: string;
}

const accountItems: SectionItemProps[] = [
  {
    imageUri: <Profile />,
    text: "Thông tin cá nhân & Bảo mật",
    screen: "ProfileScreen",
  },
  {
    imageUri: <Order />,
    text: "Đơn hàng của bạn",
    screen: "OrderDoneNavigator",
  },
  {
    imageUri: <Wallet />,
    text: "Ví của bạn",
    screen: "WalletScreen",
  },
];
const utilitiesItems: SectionItemProps[] = [
  {
    imageUri: <History />,
    text: "Lịch sử",
    screen: "HistoryScreen",
  },
  {
    imageUri: <Security />,
    text: "Bảo mật",
    screen: "SecurityScreen",
  },
];
const aboutUsItems: SectionItemProps[] = [
  {
    imageUri: <Help />,
    text: "Trợ giúp",
    screen: "HelpScreen",
  },
  {
    imageUri: <Terms />,
    text: "Điều khoản",
    screen: "TermsScreen",
  },
  {
    imageUri: <Info />,
    text: "Thông tin",
    screen: "InfoScreen",
  },
  {
    imageUri: <Guides />,
    text: "Hướng dẫn",
    screen: "GuidesScreen",
  },
  {
    imageUri: <Settings />,
    text: "Cài đặt",
    screen: "SettingsScreen",
  },
];

const ProfileMenu: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View className="p-4">
      {accountItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          className="flex-row items-center p-4 mb-2 bg-white rounded-lg shadow"
          onPress={() => navigation.navigate(item.screen as never)}
        >
          <View className="mr-4">{item.imageUri}</View>
          <Text className="text-lg">{item.text}</Text>
        </TouchableOpacity>
      ))}
      {utilitiesItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          className="flex-row items-center p-4 mb-2 bg-white rounded-lg shadow"
          onPress={() => navigation.navigate(item.screen as never)}
        >
          <View className="mr-4">{item.imageUri}</View>
          <Text className="text-lg">{item.text}</Text>
        </TouchableOpacity>
      ))}
      {aboutUsItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          className="flex-row items-center p-4 mb-2 bg-white rounded-lg shadow"
          onPress={() => navigation.navigate(item.screen as never)}
        >
          <View className="mr-4">{item.imageUri}</View>
          <Text className="text-lg">{item.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ProfileMenu;
