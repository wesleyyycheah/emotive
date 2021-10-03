import * as React from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  useFonts,
  Comfortaa_300Light,
  Comfortaa_500Medium,
} from '@expo-google-fonts/comfortaa';
import { Satisfy_400Regular } from '@expo-google-fonts/satisfy';
import AppLoading from 'expo-app-loading';
import AvatarCreator from './components/screens/AvatarCreator';
import NavBar from './components/NavBar';
import Login from './components/screens/Login';
import Home from './components/screens/Home';
import People from './components/screens/People';
import LogEmotion from './components/screens/LogEmotion';
import Goals from './components/screens/Goals';
import Calendar from './components/screens/Calendar';
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
      },
      head: {
        color: '#e6c9a1',
        type: 4,
        size: 100,
        top: 0,
        left: 0,
        rot: 0,
      },
      ear: {
        color: '#e6c9a1',
        type: 2,
        size: 30,
        top: 35,
        left: 60,
        rot: 0,
      },
      eyeL: {
        color: '#fff',
        type: 0,
        size: 20,
        top: 35,
        left: 15,
        rot: 0,
      },
      eyeR: {
        color: '#fff',
        type: 0,
        size: 20,
        top: 35,
        left: 37,
        rot: 0,
      },
      nose: {
        color: '#e6c9a1',
        type: 3,
        size: 20,
        top: 50,
        left: 25,
        rot: 0,
      },
      mouth: {
        color: '#e6c9a1',
        type: 0,
        size: 20,
        top: 65,
        left: 30,
        rot: 0,
      },
      browL: {
        color: '#291600',
        type: 0,
        size: 20,
        top: 50,
        left: 25,
        rot: 0,
      },
      browR: {
        color: '#291600',
        type: 0,
        size: 20,
        top: 65,
        left: 30,
        rot: 0,
      },
    },
    emailVerification: false,
  };
  const [user, setUser] = useState(blankUser);
  const [nav, setNav] = useState(false);

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
              {(props) => (
                <AvatarCreator
                  {...props}
                  userID={user._id}
                  avatar={user.avatar}
                  setNav={setNav}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Home">
              {(props) => <LogEmotion userID={user._id} avatar={user.avatar} />}
            </Stack.Screen>
            <Stack.Screen name="Calendar">
              {(props) => <Calendar />}
            </Stack.Screen>
            <Stack.Screen name="Goals">{(props) => <Goals />}</Stack.Screen>
            <Stack.Screen name="LogEmotion">
              {(props) => <LogEmotion avatar={user.avatar} userID={user._id} />}
            </Stack.Screen>
            <Stack.Screen name="People">{(props) => <People />}</Stack.Screen>
          </Stack.Navigator>
          {nav ? <NavBar setNav={setNav} /> : <></>}
        </NavigationContainer>
      </>
    );
  }
}
