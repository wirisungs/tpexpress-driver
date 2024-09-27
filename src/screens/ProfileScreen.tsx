import { View, Text } from 'react-native'
import React from 'react'
import HeaderProfile from '../components/Profile/HeaderProfile'
import MyComponent from '../components/Profile/MyComponent'
import { ScrollView } from 'react-native-gesture-handler'

const ProfileScreen = () => {
  return (

    <View>
      <HeaderProfile title="Profile"/>
      <ScrollView>
        <MyComponent/>
      </ScrollView>
    </View>
  )
}

export default ProfileScreen