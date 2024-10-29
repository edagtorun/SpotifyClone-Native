import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import Navigation from './src/navigation/Routes';
import { ModalPortal } from 'react-native-modals';
import { SongsProvider } from './src/context/SongContext';
import {AlbumsProvider} from './src/context/AlbumsContext'
import { ArtistsProvider } from './src/context/ArtistContext';
export default function App() {
  return (
    <>
    <ArtistsProvider>
      <AlbumsProvider>
      <Navigation />
      </AlbumsProvider>
      </ArtistsProvider>
    </>
  );
}
