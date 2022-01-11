import React from 'react';
import { StyleSheet, Text, View , Image} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Team from './Teammember/Teammember';
import images from './Teammember/teammember.png'

export default function team() {
  const { colors } = useTheme();
    return (
      <View style={[styles.container,{backgroundColor:colors.background}]}>
        <Text style={[styles.text,{color:colors.text},]}></Text>
        <Image source={images} style={{ width: 400, height: 300, marginBottom: 20 }} />
        <Team/>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {flex: 1, alignItems: 'center', justifyContent: 'flex-start'},
    text:{ textAlign: 'center', paddingLeft: 15, fontSize:20, },
    button: { Align: 'right', paddingLeft: 15,},
    Color: { backgroundColor:'red',}
  });