import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

export default function ProfileScreen() {
  return (
   <LinearGradient colors={['#040306', '#131624']} style={{flex:1}}>
      <ScrollView style={{marginTop:50}}>
        <View style={{padding:12}}>
          <View style={{flexDirection:'row', alignItems:'center', gap:10}}>
            <Image source={{uri:'https://picsum.photos/200/300'}}
            style={{width:40, height:40, borderRadius:20, resizeMode:'cover'}}
            />
           <View>
           <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>name</Text>
           <Text style={{color:'gray', fontSize:16, fontWeight:'bold'}}>email</Text>
           </View>
          </View>
        </View>
        <Text style={{color:'white', fontSize:20, fontWeight:'500'}}>Your Playlists</Text>
        <View style={{padding:15}}>
          <View style={{marginVertical:10, flexDirection:'row', alignItems:'center', gap:8}}>
            <Image source={{uri:'https://picsum.photos/200/300'}} style={{width:50, height:50, borderRadius:4}}/>
          <View>
            <Text style={{color:'white'}}>name</Text>
            <Text style={{color:'white', marginTop:7}}>0 followers</Text>
          </View>
          </View>
        </View>
      </ScrollView>
   </LinearGradient>
  )
}