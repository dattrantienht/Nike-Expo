import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {useTheme} from '@react-navigation/native';

export default function login() {
  const { colors } = useTheme();
    return (
      <View style={[styles.container,{backgroundColor:colors.background}]}>
        <Text style={[styles.text,{color:colors.text}]}>Login Screen</Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    text:{
      fontSize:18,
    }
  });