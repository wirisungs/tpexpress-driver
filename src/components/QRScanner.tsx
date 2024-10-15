import { View, Text } from 'react-native'
import React from 'react'
import Camera from './Camera'
import QRScan from '../svg/QRScan'
import { TouchableOpacity } from 'react-native-gesture-handler'

const QRScanner = () => {
  const handleOpenCamera = () => {
    //console.log('Opening camera')
    <Camera/>
  }
  return (
    <View>
      <TouchableOpacity onPress={handleOpenCamera} className="mr-4" >
        <QRScan />
      </TouchableOpacity>
    </View>
  )
}

export default QRScanner