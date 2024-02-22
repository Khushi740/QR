import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import Scan from './screens/Scan';
import HistoryScreen from './screens/HistoryScreen';
import { QRCodeProvider } from './QRCodeContext'; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <QRCodeProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: '#f0e68c' },
          headerTintColor: 'white',
          contentStyle: { backgroundColor: '#3f2f24' }
        }} initialRouteName="Home" >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="QRScanner" component={Scan} />
          <Stack.Screen name="QRCodeHistory" component={HistoryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </QRCodeProvider>
  );
}
