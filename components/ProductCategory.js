import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight, Button } from 'react-native';
import {useTheme} from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import GetCategory from './Categories/GetCategory';

export default function productCategory(props) {
  const { colors } = useTheme();

    return (
      <ScrollView >
        <Text style={[styles.text,{color:colors.text}, styles.container]}>Product Category Screen</Text>
        <GetCategory />
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    text:{ textAlign: 'left', paddingLeft: 15, fontSize:20, },
    button: { Align: 'right', paddingLeft: 15,},
    Color: { backgroundColor:'red',}
  });