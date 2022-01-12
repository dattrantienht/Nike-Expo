import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { StatusBar, StyleSheet, Text, View, FlatList } from 'react-native';
import { useTheme } from '@react-navigation/native';

let listProduct;

async function getListProduct() {
  try {
      const response = await axios.get('https://api.keyboardslinger.club/api/Products');
      listProduct = response.data.data;
      //console.log(listProduct);
  } catch (error) {
      console.error(error);
  }
}

const Product = ({ name }) => (
  <View style={styles.item}>
    <Text>{name}</Text>
  </View>
);

export default function Shop() {

  useEffect( async ()=>{
    await getListProduct();
    console.log(listProduct);
  },[]);

  const renderItem = ({ item }) => (
    <Product name={item.name} />
  );



  
  const { colors } = useTheme();
    return (
      <View style={[styles.container,{backgroundColor:colors.background}]}>
        <StatusBar/>
        <Text style={[styles.text,{color:colors.text}]}>Shop Screen</Text>
        <FlatList
          data={listProduct}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    text:{
      fontSize:18,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
  });