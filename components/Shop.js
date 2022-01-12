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

const Product = ({ name, price, image }) => (
  <View style={styles.item}>
    <Text>{name}</Text>
    <Text>{price}</Text>
  </View>
);

export default function Shop() {
  const { colors } = useTheme();

  const [items, setItems] = useState([]);
  const renderItem = ({ item }) => (
    <Product name={item.name} price={item.price} />
  );

  useEffect( async ()=>{
    await getListProduct();
    setItems(listProduct)
    console.log(listProduct);
  },[]);

  return (
    <View style={[styles.container,{backgroundColor:colors.background}]}>
      <StatusBar/>
      <Text style={[styles.text,{color:colors.text}]}>Shop Screen</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
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
      width: 160,
      height: 180,
      backgroundColor: 'white',
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
    },
  });