import React from 'react';
import {StatusBar, StyleSheet, Text, View } from 'react-native';
import {useTheme} from '@react-navigation/native';

export default function shop() {
  const { colors } = useTheme();
    return (
      <View style={[styles.container,{backgroundColor:colors.background}]}>
        <StatusBar/>
        <Text style={[styles.text,{color:colors.text}]}>Shop Monitor</Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    text:{
      fontSize:18,
    }
  });