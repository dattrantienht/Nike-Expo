import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Product from './Product';

export default function shop() {
  const { colors } = useTheme();
  return (
    <View style={[styles.container]}>
      <StatusBar/>
      {/* <View style={styles.titleContainer}>
        <Text style={styles.text} >Shop Screen</Text>
      </View> */}

      <Product />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: {
    fontSize: 18,
    
  },
  
  titleContainer:{
    
    
    height:30
  },
 
});