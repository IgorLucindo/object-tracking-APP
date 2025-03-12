/*import { StatusBar } from 'expo-status-bar';*/
import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Login, Rastreio, QrCodeReader, QrCodeRegister, QrCodeRegister2 } from './views/index';
import AreaRestrita from './views/arearestrita/AreaRestrita';

export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
        <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
        <Stack.Screen name="Rastreio" component={Rastreio} />
        <Stack.Screen name="QrCodeReader" options={{ headerShown: false }} component={QrCodeReader} />
        <Stack.Screen name="QrCodeRegister" options={{ headerShown: false }} component={QrCodeRegister} />
        <Stack.Screen name="QrCodeRegister2" options={{ headerShown: false }} component={QrCodeRegister2} />
        <Stack.Screen name="AreaRestrita" options={{ headerShown: false }} component={AreaRestrita} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}