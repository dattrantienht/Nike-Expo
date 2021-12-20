import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {useTheme} from '@react-navigation/native';

export default function product() {
  const { colors } = useTheme();
    return (
      <View style={[styles.container,{backgroundColor:colors.background}]}>
        <Text style={[styles.text,{color:colors.text}]}>Product Screen</Text>
        <Image source={{uri:'img/air-jordan-1-mid-se-shoes-hHltxp.jpg'}} style={{height:30 , width: 70}} />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    text:{
      fontSize:18,
    }
  });