import { View, Text } from 'react-native'
import React from 'react'
import HeaderProfile from '../components/HeaderProfile'

const ProfileScreen = () => {
  return (

    <View>
      <View>
        <HeaderProfile title="rat la test"/>
      </View>
      <View>
        <Text>Profile Screen</Text>
      </View>
    </View>
  )
}

export default ProfileScreen