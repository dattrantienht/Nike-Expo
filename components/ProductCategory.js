import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight, Button } from 'react-native';
import {useTheme} from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import GetCategory from './Categories/GetCategory';
import Footer from './Footer/Footer';
export default function productCategory(props) {
  const { colors } = useTheme();

    return (
      <ScrollView >

        <Text style={[styles.text,{color:colors.text}, styles.container]}>Danh mục sản phẩm </Text>
        <GetCategory />
        <Footer/>
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    text:{ textAlign: 'Center', paddingLeft: 15, fontSize:30, },
    button: { Align: 'right', paddingLeft: 15,},
    Color: { backgroundColor:'red',}
  });