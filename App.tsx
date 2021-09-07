import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Comfortaa_300Light,
  Comfortaa_500Medium,
} from '@expo-google-fonts/comfortaa';
import { Satisfy_400Regular } from '@expo-google-fonts/satisfy';
import AppLoading from 'expo-app-loading';
import AvatarCreator from './components/AvatarCreator';

export default function App() {
  let [fontsLoaded] = useFonts({
    Comfortaa_300Light,
    Comfortaa_500Medium,
    Satisfy_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <AvatarCreator />
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
