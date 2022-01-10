import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {useTheme} from '@react-navigation/native'; 
import CallProduct from './ProductAPi/CallProduct';
export default function product() {
  const { colors } = useTheme();
    return (
      <View style={[styles.container,{backgroundColor:colors.background}]}>
        <Text style={[styles.text,{color:colors.text}]}> Sản Phẩm </Text>
        <Image
          style={styles.productImage}/>
          <CallProduct/>

      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0000FF' },
    text:{
      fontSize:50,
      
    },
  });