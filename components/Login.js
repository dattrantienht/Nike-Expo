import React from 'react';
import { AntDesign } from '@expo/vector-icons'; 
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Login() {
    return (
      <View style={styles.container}>
        <AntDesign name="login" size={24} color="black" />
        <Text >Login Screen</Text>
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