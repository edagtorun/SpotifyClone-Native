import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import React, {useContext} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import ArtistCard from '../components/ArtistCard';
import {stagger} from '../../node_modules/react-native/Libraries/Animated/Animated.d';

import {AlbumsContext} from '../context/AlbumsContext';
import AlbumCard from '../components/AlbumCard';
import Loader from '../components/Loader';
import Error from '../components/Error';
import {ArtistsContext} from '../context/ArtistContext';

export default function HomeScreen() {
  const navigation = useNavigation();
  const {
    albums,
    loading: albumsLoading,
    error: albumsError,
  } = useContext(AlbumsContext);
  const {artists, loading, error} = useContext(ArtistsContext);

  return (
    <LinearGradient colors={['#040306', '#131624']} style={{flex: 1}}>
      {albumsLoading ? (
        <Loader />
      ) : albumsError ? (
        <Error error={albumsError} />
      ) : (
        <ScrollView
          style={{marginTop: 50}}
          contentContainerStyle={{paddingBottom: 100}}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Image
                source={{
                  uri: 'https://w7.pngwing.com/pngs/184/113/png-transparent-user-profile-computer-icons-profile-heroes-black-silhouette-thumbnail.png',
                }}
                style={styles.headerImage}
              />
              <Text style={styles.headerText}>messages</Text>
            </View>
            <MaterialCommunityIcons
              name="lightning-bolt-outline"
              color="white"
              size={24}
            />
          </View>

          <View style={styles.tabButtons}>
            <Pressable style={styles.tabButton}>
              <Text style={styles.tabButtonText}>Music</Text>
            </Pressable>
            <Pressable style={styles.tabButton}>
              <Text style={styles.tabButtonText}>Podcast & Shows</Text>
            </Pressable>
          </View>

          <View>
            <Pressable
              onPress={() => navigation.navigate('Liked')}
              style={styles.likedSongs}>
              <LinearGradient colors={['#33006f', '#ffffff']}>
                <Pressable
                  style={{
                    width: 55,
                    height: 55,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <AntDesign name="heart" size={24} color="white" />
                </Pressable>
              </LinearGradient>

              <Text style={styles.likedSongsText}>
                {' '}
                Liked Songs
              </Text>
            </Pressable>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                flex: 1,
                marginHorizontal: 10,
                marginVertical: 8,
                backgroundColor: '#202020',
                borderRadius: 4,
              }}>
              <Image
                source={{uri: 'https://picsum.photos/100/100'}}
                style={{width: 55, height: 55}}
              />
              <View style={{}}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 13}}>
                  Hit
                </Text>
              </View>
            </View>

            {/* flatlist renderItem*/}

            <Pressable
              style={{
                marginVertical: 8,
                marginHorizontal: 10,
                backgroundColor: '#282828',
                flexDirection: 'row',
                borderRadius: 4,
              }}>
              <Image
                source={{uri: 'https://picsum.photos/200/300'}}
                style={{width: 55, height: 55}}
              />
              <View
                style={{
                  flex: 1,
                  marginHorizontal: 8,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{color: 'white', fontSize: 13, fontWeight: 'bold'}}>
                  name
                </Text>
              </View>
            </Pressable>

            <Text
              style={styles.sectionTitle}>
              Your Top Artists
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {artists?.map((artist, index) => (
                <ArtistCard key={index} artist={artist} />
              ))}
            </ScrollView>

            <View style={{height: 10}} />

            <Text
              style={styles.sectionTitle}>
              Popular Albums
            </Text>

            {/* flatlist renderItem*/}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {albums?.map((album, index) => (
                <AlbumCard album={album} key={index} />
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },

  headerImage: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
    borderRadius: 20,
  },

  headerText: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
    borderRadius: 20,
  },

  tabButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 12,
    marginVertical: 5,
  },
  tabButton: {
    backgroundColor: '#282828',
    padding: 10,
    borderRadius: 30,
  },
  tabButtonText: {
    fontSize: 15,
    color: 'white',
  },
  likedSongs: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 8,
    backgroundColor: '#202020',
    borderRadius: 4,
  },
  likedSongsText:{
    color: 'white',
     fontSize: 13, 
     fontWeight: 'bold'},
   sectionTitle:{
      color: 'white',
      fontSize: 19,
      fontWeight: 'bold',
      marginHorizontal: 10,
      marginTop: 10,
    },
});
