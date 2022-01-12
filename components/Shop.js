import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Product from './Product';

export default function Shop() {
  const { colors } = useTheme();
    return (
      <View style={[styles.container,{backgroundColor:colors.background}]}>
        <Text style={[styles.text,{color:colors.text}]}>Shop Screen</Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    text:{
      fontSize:18,
    }
  });