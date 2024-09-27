//Desc: Entry point of the app
import React from 'react';
import AuthStack from './src/navigation/AuthStack';
import RouteManager from './src/routes/RouteManager';

const App = () => {
  return <RouteManager />;
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
