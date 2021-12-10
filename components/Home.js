import React from 'react';
import { FontAwesome } from '@expo/vector-icons'; 
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Home() {
    return (
      <View style={styles.container}>
        <FontAwesome name="home" size={24} color="black" />
        <Text >Home Screen</Text>
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