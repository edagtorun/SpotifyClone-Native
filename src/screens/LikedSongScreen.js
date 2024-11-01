import Modal from 'react-native-modal';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import SongItem from '../components/SongItem';
import axios from 'axios';
import TrackPlayer, {useProgress} from 'react-native-track-player';

export default function LikedSongScreen() {
  const navigation = useNavigation();

  const progress = useProgress();

  const [searchText, setSearchText] = useState('');
  const [searchedTracks, setSearchedTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    const options = {
      method: 'GET',
      url: 'https://shazam.p.rapidapi.com/search',
      params: {
        term: searchText,
        locale: 'tr-TR',
        offset: '0',
        limit: '5',
      },
      headers: {
        'x-rapidapi-key': '3a018899a3msh42c01566c4542b3p13caa0jsnbc374e087ca6',
        'x-rapidapi-host': 'shazam.p.rapidapi.com',
      },
    };
    try {
      const response = await axios.request(options);
      setSearchedTracks(response.data.tracks.hits);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handlePlay = async track => {
    const trackData = {
      id: track.track.key,
      url: track.track.hub.actions.find(action => action.type === 'uri').uri,
      title: track.track.title,
      artist: track.track.subtitle,
      artwork: track.track.images.coverart,
    };
    try {
      await TrackPlayer.reset();
      await TrackPlayer.add(trackData);
      await TrackPlayer.play();
      setSelectedTrack(track.track);
      setModalVisible(true);
      setIsPlaying(true);
    } catch (error) {
      console.log(error);
    }
  };
  const setupPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      TrackPlayer.updateOptions({
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_STOP,
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
          TrackPlayer.CAPABILITY_SEEK_TO,
        ],
        compactCapabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        ],
      });
    } catch (error) {
      console.log('Error setting up player:', error);
    }
  };

  useEffect(() => {
    setSearchText("Liked Songs");  // İlk olarak searchText'i ayarla
    handleSearch();  // Şarkı aramasını başlat
    setupPlayer();
  }, []);

  const formatTime = seconds => {
    // toplam saniyeyi dakikaya cevir
    const mins = Math.floor(seconds / 60);
    // toplam saniye sayisindan geriye kalan saniyeyi hesaplar.
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const TogglePlayback = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Oynatilan muzigi 110 saniye positiona o=gore geri aldik
  const seekBackward = async () => {
    const position = progress.position;  // useProgress'ten gelen position değeri
    await TrackPlayer.seekTo(Math.max(0, position - 10));
  };
  
  const seekForward = async () => {
    const position = progress.position;
    await TrackPlayer.seekTo(Math.min(progress.duration, position + 10));
  };
  

  return (
    <>
      <LinearGradient colors={['#614385', '#516395']} style={{flex: 1}}>
        <ScrollView style={{flex: 1, marginTop: 50}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={{marginHorizontal: 10}}>
              <Ionicons name="arrow-back" color="white" size={24} />
            </Pressable>

            <Pressable
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'center',
                marginHorizontal: 10,
                marginTop: 9,
              }}>
              <Pressable
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  padding: 9,
                  // flex: 1,
                  height: 38,
                  backgroundColor: '#42275a',
                  borderRadius: 3,
                }}>
                <AntDesign name="search1" color="white" size={20} />
                <TextInput
                  placeholderTextColor={'white'}
                  placeholder="Find in Liked Songs"
                  style={{fontWeight: '500', color: 'white', width: '85%'}}
                  onChangeText={setSearchText}
                  onSubmitEditing={handleSearch}
                />
              </Pressable>
            </Pressable>
          </View>

          <View style={{marginHorizontal: 10, marginVertical: 10}}>
            <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
              Liked Songs
            </Text>
            <Text style={{fontSize: 13, color: 'white', marginTop: 5}}>
              {searchedTracks.length} Songs
            </Text>
          </View>

          {loading ? (
            <ActivityIndicator size={'large'} color={'gray'} />
          ) : (
            <FlatList
              style={{marginTop: 10}}
              keyExtractor={item => item.track.key}
              data={searchedTracks}
              renderItem={({item}) => (
                <Pressable onPress={() => handlePlay(item)}>
                  <View style={styles.trackContainer}>
                    <Image
                      source={{uri: item?.track?.images?.coverart}}
                      style={styles.albumCover}
                    />
                    <View style={styles.trackInfo}>
                      <Text style={styles.trackName}>{item.track.title}</Text>
                      <Text style={styles.albumName}>
                        {item.track.subtitle}
                      </Text>
                    </View>
                    <Entypo name="controller-play" size={24} color="white" />
                  </View>
                </Pressable>
              )}
            />
          )}
        </ScrollView>
      </LinearGradient>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        swipeDirection="down" //modalin hangi yone kaydirilacagini belirler
        onSwipeComplete={() => setModalVisible(false)}
        style={{margin: 0}}>
        <View
          style={{
            backgroundColor: '#5072a7',
            width: '100%',
            height: '100%',
            paddingTop: 60,
            paddingHorizontal: 10,
          }}>
          <Pressable
            onPress={() => setModalVisible(false)}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <AntDesign name="down" size={24} color="white" />
            <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>
              {' '}
              song name
            </Text>
            <Entypo name="dots-three-vertical" size={24} color="white" />
          </Pressable>

          <View style={{padding: 10, marginTop: 20}}>
            <Image
              source={{
                uri: selectedTrack?.images.coverart,
              }}
              style={{width: '100%', height: 330, borderRadius: 4}}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <View>
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
                  {selectedTrack?.title}
                </Text>
                <Text style={{color: '#d3d3d3', marginTop: 4}}>
                  {selectedTrack?.subtitle}
                </Text>
              </View>
              <AntDesign name="heart" size={24} color="#1db954" />
            </View>
            <View style={{marginTop: 10}}>
              <View
                style={{
                  width: '100%',
                  marginTop: 10,
                  height: 3,
                  backgroundColor: 'gray',
                  borderRadius: 5,
                }}>
                <View
                  style={[
                    styles.ProgressBar,
                    {
                      width: `${
                        (progress.position / progress.duration) * 100
                      }%`,
                    },
                  ]}
                />
                <View
                  style={{
                    position: 'absolute',
                    top: -5,
                    width: 10,
                    height: 10,
                    backgroundColor: 'white',
                    borderRadius: 5,
                    left: `${(progress.position / progress.duration) * 100}%`,
                  }}
                />
              </View>

              <View
                style={{
                  marginTop: 12,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white', fontSize: 15}}>
                  {formatTime(progress.position)}
                </Text>
                <Text style={{color: 'white', fontSize: 15}}>
                  {formatTime(progress.duration)}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 17,
                  alignItems: 'center',
                }}>
                <Pressable onPress={seekBackward}>
                  <Entypo
                    name="controller-fast-backward"
                    color="white"
                    size={30}
                  />
                </Pressable>
                <Pressable>
                  <Ionicons name="play-skip-back" size={30} color="white" />
                </Pressable>
                <Pressable onPress={TogglePlayback}>
                  {isPlaying ? (
                    <AntDesign name="pausecircle" size={60} color="white" />
                  ) : (
                    <Entypo name="controller-play" size={60} color="white" />
                  )}
                </Pressable>

                <Pressable>
                  <Ionicons name="play-skip-forward" size={30} color="white" />
                </Pressable>

                <Pressable onPress={seekForward}>
                  <Entypo
                    name="controller-fast-forward"
                    color="white"
                    size={30}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  ProgressBar: {
    height: '100%',
    backgroundColor: 'white',
  },
  trackContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  albumCover: {
    width: 60,
    height: 60,
  },
  trackInfo: {
    flex: 1,
    marginLeft: 10,
  },
  trackName: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  albumName: {
    fontSize: 14,
    color: 'gray',
  },
});
