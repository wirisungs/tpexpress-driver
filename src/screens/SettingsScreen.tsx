import { View, Text } from 'react-native'
import React from 'react'
import HeaderProfile from '../components/Profile/HeaderProfile'
import ProfileMenu from '../components/Profile/ProfileMenu'

const SettingsScreen = () => {
  return (
    <View>
      <HeaderProfile title="TEST"/>
      <View>
        <ProfileMenu/>
      </View>
    </View>
  )
}

export default SettingsScreen