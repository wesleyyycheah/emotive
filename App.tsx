import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  useFonts,
  Comfortaa_300Light,
  Comfortaa_500Medium,
} from '@expo-google-fonts/comfortaa';
import { Satisfy_400Regular } from '@expo-google-fonts/satisfy';
import AppLoading from 'expo-app-loading';
import AvatarCreator from './components/AvatarCreator';
import NavBar from './components/NavBar';
import Login from './components/Login';
const Stack = createNativeStackNavigator();
export default function App() {
  let [fontsLoaded] = useFonts({
    Comfortaa_300Light,
    Comfortaa_500Medium,
    Satisfy_400Regular,
  });
  const blankUser = {
    _id: '',
    name: '',
    email: '',
    passwordHash: '',
    avatar: {
      hair: {
        color: '#291600',
        type: 0,
        size: 85,
        top: -17,
        left: 5,
        rot: 0,
        mode: 0,
      },
      head: {
        color: '#e6c9a1',
        type: 4,
        size: 100,
        top: 0,
        left: 0,
        rot: 0,
        mode: 0,
      },
      ear: {
        color: '#e6c9a1',
        type: 2,
        size: 30,
        top: 35,
        left: 60,
        rot: 0,
        mode: 0,
      },
      eyeL: {
        color: '#fff',
        type: 0,
        size: 20,
        top: 35,
        left: 15,
        rot: 0,
        mode: 0,
      },
      eyeR: {
        color: '#fff',
        type: 0,
        size: 20,
        top: 35,
        left: 37,
        rot: 0,
        mode: 0,
      },
      nose: {
        color: '#e6c9a1',
        type: 3,
        size: 20,
        top: 50,
        left: 25,
        rot: 0,
        mode: 0,
      },
      mouth: {
        color: '#e6c9a1',
        type: 7,
        size: 20,
        top: 65,
        left: 30,
        rot: 0,
        mode: 0,
      },
    },
    emailVerification: false,
  };
  const [user, setUser] = useState(blankUser);
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Login">
              {(props) => <Login {...props} setUser={setUser} />}
            </Stack.Screen>
            <Stack.Screen name="AvatarCreator">
              {() => <AvatarCreator userID={user._id} avatar={user.avatar} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
        <NavBar />
      </>
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
