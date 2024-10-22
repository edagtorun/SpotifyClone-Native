import { View, Text, SafeAreaView, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function LoginScreen() {
  return (
   <LinearGradient colors={["#040306", "#131624"]} style={{flex:1}}>
      <SafeAreaView>
      <View style={{height:80}}/>
        <Entypo name="spotify" color={'white'} size={80} style={{textAlign:"center"}}/>
        <Text style={styles.LoginTitle}>Millions of Songs Free on Spotify!</Text>
        <View style={{height:80}}/>
        <Pressable style={styles.LoginButton}>
          <Text>
            Sign In With Spotify
          </Text>
        </Pressable>

        <Pressable style={styles.phoneButton}>
        <MaterialIcons name="phone-android" color="white" size={24}/>
        <Text style={styles.phoneButtonText}>Continue with phone number</Text>
        </Pressable>
        
        <Pressable style={styles.phoneButton}>
          <AntDesign name="google" color="white" size={24}/>
          <Text style={styles.phoneButtonText}>
          Continue with Google
          </Text>
        </Pressable>

        <Pressable style={styles.phoneButton}>
          <Entypo name="facebook" color="white" size={24}/>
          <Text style={styles.phoneButtonText}>
          Continue with Facebook
          </Text>
        </Pressable>
      </SafeAreaView>
   </LinearGradient>
  );
}

const styles = StyleSheet.create({
  LoginTitle:{
    color:'white', 
    fontSize:40, 
    fontWeight:'bold', 
    textAlign:'center',
    marginTop:40,
  },
  LoginButton:{
    backgroundColor:"#1db954",
    padding:10,
    marginLeft:'auto',
    marginRight:'auto',
    width:300,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    marginVertical:10,
  },
  phoneButton:{
   backgroundColor:"#131624",
   padding:10,
   marginLeft:"auto",
   marginRight:'auto',
   flexDirection:'row',
   marginVertical:10,
   borderWidth:0.8,
   borderColor:"#c0c0c0",
   width:300,
   borderRadius:25,
   alignItems:'center',
  },
  phoneButtonText:{
    color:'white',
    textAlign:'center',
    flex:1,
  },
})