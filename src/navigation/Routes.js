import { View, Text } from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import LikedSongScreen from '../screens/LikedSongScreen';
import SongInfoScreen from '../screens/SongInfoScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator()
const BottomTabs = () =>{
  return(
    <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen}/>
    <Tab.Screen name="Profile" component={ProfileScreen}/>
  </Tab.Navigator>
  )
};

export default function Routes() {
  return (
   <NavigationContainer>
    <Stack.Navigator screenOptions={{
      headerShown:false,
    }}>
      <Stack.Screen name="Liked" component={LikedSongScreen}/>
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name="Info" component={SongInfoScreen}/>
    </Stack.Navigator>
   </NavigationContainer>
  )
}