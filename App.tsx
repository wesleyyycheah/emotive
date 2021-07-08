import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const logo = require('./assets/adaptive-icon.png');
  return (
    <View style={styles.container}>
      <img src={logo} height={'10%'} />
      <Text>Emotive will be available within the next year!</Text>
      <Text>Stay tuned for our open beta program</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
