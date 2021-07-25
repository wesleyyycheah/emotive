import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import Avatar from './components/Avatar';
import styled from 'styled-components';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Avatar />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
