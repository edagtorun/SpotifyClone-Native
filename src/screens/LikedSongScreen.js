import { View, Text, ScrollView, Pressable, TextInput } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';
import  AntDesign  from 'react-native-vector-icons/AntDesign';
export default function LikedSongScreen() {

const navigation = useNavigation()

  return (
   <>
   <LinearGradient colors={["#614385", "#516395"]} style={{flex:1}}>
    <ScrollView style={{flex:1, marginTop:50}}>
      <Pressable 
      onPress={()=> navigation.goBack()}
      style={{marginHorizontal:10}}>
        <Ionicons name="arrow-back" color="white" size={24}/>
      </Pressable>

      <Pressable style={{
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignContent:'center', 
        marginHorizontal:10, 
        marginTop:9,}}>
        <Pressable style={{
          flexDirection:'row',
          alignItems:'center',
          gap:10,
          padding:9,
          flex:1,
          height:38,
          backgroundColor:"#42275a", 
          borderRadius:3,
          }}>
          <AntDesign name="search1" color="white" size={20}/>
          <TextInput 
          placeholderTextColor={"white"}
          placeholder='Find in Liked Songs' 
          style={{fontWeight:"500", color:"white"}}/>
        </Pressable>
        <Pressable style={{
        marginHorizontal:10,
         backgroundColor:"#42275a", 
         padding:10, 
         borderRadius:3,
          height:38,}}>
        <Text style={{color:"white"}}>Sort</Text>
      </Pressable>
      </Pressable>
      
    </ScrollView>
   </LinearGradient>
   </>
  )
}