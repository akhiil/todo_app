

import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AccountIcon from 'react-native-vector-icons/MaterialCommunityIcons'


import LoginScreen from './src/screens/loginScreen';
import HomeScreen from './src/screens/homeScreen';
import AccountScreen from './src/screens/accountScreen';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();


const App = () => {
  return (
    <Tab.Navigator activeColor="white"
      inactiveColor="#a6a6a6"
      labeled={false}
      barStyle={{ backgroundColor: 'black', }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          size = 28
          if (route.name === 'HomeScreen') {
            return <Ionicons name="ios-home" size={size} color={color} />;
          } else if (route.name === 'Account') {
            return <AccountIcon name="account" size={size} color={color} />;
          }

          // You can return any component that you like here!


        },
      })}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  )
}

const mainApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        {/* <Stack.Screen name="AccountScreen" component={Accountscreen} /> */}
        <Stack.Screen name="App" component={App} options={{
          headerShown: false
        }} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}

export default mainApp;