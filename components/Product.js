import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {useTheme} from '@react-navigation/native';


export default function product() {
  const { colors } = useTheme();
    return (
      <View style={[styles.container,{backgroundColor:colors.background}]}>
        <Text style={[styles.text,{color:colors.text}]}>Product Screen</Text>
        <Image
          style={styles.productImage}
          source={require("../assets/"+"img/air-jordan-xxxvi-older-basketball-shoes-5rlrTs.jpg")} 
          />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    text:{
      fontSize:18,
    },
    productImage: { width:150, height:160}
  });