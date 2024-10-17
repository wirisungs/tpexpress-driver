import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Fingerprint from "../../svg/Fingerprint"

const FingerprintButton = () => {
  return (
    <TouchableOpacity className="flex ml-2 justify-center items-center w-12 h-12 p-1.5 px-2.5 mt-4 rounded-xl border-2 border-rose-500 border-solid">
      <Fingerprint/>
    </TouchableOpacity>
  )
}

export default FingerprintButton