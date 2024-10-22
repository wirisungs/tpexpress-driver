//Desc: Entry point of the app
import React from 'react';
import AuthStack from './src/navigation/AuthStack';
import RouteManager from './src/routes/RouteManager';
import OrderTracking from './src/components/OrderTracking/OrderTracking';
import { View } from 'react-native';
const App = () => {
  return <RouteManager />;
  // <View>
  //   <OrderTracking/>
  // </View>
};

export default App;

// import { View, Text } from 'react-native'
// import React from 'react'
// import OrderCard from './src/components/OrderCard/OrderCard'

// const App = () => {
//   return (
//     <View>
//       <OrderCard/>
//     </View>
//   )
// }
