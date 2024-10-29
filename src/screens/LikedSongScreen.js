import {ModalContent, ModalButton} from 'react-native-modals';
import { View, Text, ScrollView, Pressable, TextInput, ActivityIndicator, FlatList, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';
import  AntDesign  from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import SongItem from '../components/SongItem';


export default function LikedSongScreen() {

const navigation = useNavigation();

const [searchedTracks, setSearchedTracks] = useState([]);
const [isPlaying, setIsPlaying]= useState(false);
const [modalVisible, setModalVisible] = useState(false);

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
      
      <View style={{height:50}}/>
          <View style={{marginHorizontal:10}}>
            <Text style={{fontSize:18, color:"white", fontWeight:'bold'}}>Liked Songs</Text>
            <Text style={{fontSize:13, color:"white", marginTop:5}}>420 Songs</Text>
          </View>

          <Pressable style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center", marginHorizontal:10}}>
            <Pressable style={{backgroundColor:"#1db954", width:30, height:30, justifyContent:'center', alignItems:"center", borderRadius:15}}>
              <AntDesign name="arrowdown" color="white" size={20}/>
            </Pressable>
            <View style={{flexDirection:'row', alignItems:'center', gap:10}}>
              <MaterialCommunityIcons name="cross-bolnisi" color="#1db954" size={24}/>
              <Pressable style={{width:60, height:60, backgroundColor:"#1db954", borderRadius:30, justifyContent:"center", alignItems:"center"}}>
              <Entypo name="controller-play" size={24} color="white"/>
              </Pressable>
            </View>
          </Pressable>

          {/* {searchedTracks.length === 0 ? (
            <ActivityIndicator size={"large"} color={'gray'}/>
          ) : (
           <FlatList data={searchedTracks} renderItem={({item}) => <SongItem/>}/>
          )} */}

    </ScrollView>
   </LinearGradient>

   <Pressable style={{
    backgroundColor:"#5072a7",
    padding:10,
    marginLeft:"auto",
    marginRight:'auto',
    position:"absolute",
    left:20,
    bottom:10,
    borderRadius:6,
    marginBottom:15,
    flexDirection:"row",
    justifyContent:'space-between',
    alignItems:'center',
    gap1:10,
   }}>
    <View style={{flexDirection:'row', alignItems:'center', gap:10}}>
      <Image  source={{
          uri: 'https://www.teachhub.com/wp-content/uploads/2019/10/Our-Top-10-Songs-About-School.png',
        }}
        style={{width: 50, height: 50}}/>
        <Text style={{fontSize:13, width:220, color:'white', fontWeight:'bold'}}> name </Text>
    </View>
    <View style={{flexDirection:'row', alignItems:"center", gap:8}}>
        <AntDesign name="heart" size={24} color="#1bd954"/>
        <Pressable>
          <AntDesign name="pausecircle" size={24} color="white"/>
        </Pressable>
    </View>
   </Pressable>


  {/* <ModalContent style={{backgroundColor:'#5072a7', width:"100%", height:'100%'}}>
    <View style={{marginTop:40}}>
      <Pressable style={{flexDirection:'row', justifyContent:"space-between", alignItems:'center'}}>
        <AntDesign name='down' size={24} color="white"/>
        <Text style={{fontSize:14, fontWeight:"bold", color:"white"}}> song name</Text>
        <Entypo name="dots-three-vertical" size={24} color="white"/>
      </Pressable>

        <View style={{padding:10, marginTop:20}}>
          <Image source={{
          uri: 'https://www.google.com/imgres?q=horse%20wallpaper&imgurl=https%3A%2F%2Fimg.freepik.com%2Ffree-photo%2Fstallion-mane-waves-sunset-nature-beauty-unleashed-generated-by-artificial-intelligence_25030-67695.jpg&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Fphotos%2Fhorse-wallpaper-hd%2F2&docid=FVySP2dfFwH2PM&tbnid=jPNAzCUL39Y34M&vet=12ahUKEwiy0siFhJWHAxVQB9sEHcfVDx8QM3oECH0QAA..i&w=626&h=358&hcb=2&ved=2ahUKEwiy0siFhJWHAxVQB9sEHcfVDx8QM3oECH0QAA',
        }}
        style={{width: "100%", height: 330, borderRadius:4}}/>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:20, }}>
          <View>
            <Text style={{fontSize:18, fontWeight:'bold', color:'white'}}>name</Text>
            <Text style={{color:'#d3d3d3', marginTop:4}}>name</Text>
          </View>
          <AntDesign name="heart" size={24} color="#1db954"/>
        </View>
        <View style={{marginTop:10}}>
          <View style={{
            width:'100%',
             marginTop:10,
              height:3,
               backgroundColor:'gray',
               borderRadius:5,
               }}>
            <View style={[styles.ProgressBar, {width: 1 * 100}]}/>
            <View style={{
              position:'absolute',
              top:-5,
              width:10,
              height:10,
              backgroundColor:"white",
              borderRadius:5,
              left:100,
            }}/>
              </View>

              <View 
              style={{
              marginTop:12, 
              flexDirection:'row', 
              justifyContent:'space-between',
               alignItems:'center'}}>
                <Text style={{color:'white', fontSize:15}}>00:00</Text>
                <Text style={{color:'white', fontSize:15}}>00:00</Text>
              </View>

              <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:'17', alignItems:'center'}}>
                <Pressable>
                  <FontAwesome name="arrows" size={30} color="#03c03c"/>
                </Pressable>
                <Pressable>
                  <Ionicons name="play-skip-back" size={30} color="white"/>
                </Pressable>
                <Pressable>
                  {isPlaying ? 
                  ( <AntDesign name="pausecircle" size={60} color="white"/> 
                ):( 
                <Pressable style={{
                  backgroundColor:'white',
                   width:60, 
                   height:60, 
                   justifyContent:'center', 
                   alignItems:'center', 
                   borderRadius:30}}>
                    <Entypo name="controller-play" size={26} color="black"/>
                  </Pressable>)}
                  
                  
                </Pressable>

                <Pressable>
                  <Ionicons name="play-skip-forward" size={30} color="white"/>
                </Pressable>

                <Pressable>
                  <Feather name="repeat" size={30} color="#03c03c"/>
                </Pressable>
              </View>
          </View>
        </View>
    </View>
  </ModalContent> */}
   </>
  )
}

const styles = StyleSheet.create({
  ProgressBar:{
    height:'100%',
    backgroundColor:'white',
  },
})