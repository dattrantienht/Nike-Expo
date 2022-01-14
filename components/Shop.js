import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { StatusBar, StyleSheet, Image, Text, View, FlatList } from 'react-native';
import { useTheme, useIsFocused } from '@react-navigation/native';

let listProduct;

async function getListProduct() {
  try {
      const response = await axios.get('https://api.keyboardslinger.club/api/Products');
      listProduct = response.data.data;
  } catch (error) {
      console.error(error);
  }
}

const Product = ({colors, name, price, image }) => (
  <View style={[styles.item,{backgroundColor:colors.background}]}>
    <Text style={[styles.productName,{color:colors.text}]}>{name}</Text>
    <Image
      style={styles.productImage}
      source={{uri: image}}/>
    <Text style={[styles.productPrice,{color:colors.text}]}>{price}</Text>
  </View>
);

export default function Shop() {
  const { colors } = useTheme();
  const isFocused = useIsFocused();
  const [items, setItems] = useState([]);
  const renderItem = ({ item }) => (
    <Product colors={colors} name={item.name} price={item.price} image={item.image} />
  );

  useEffect( async ()=>{
    console.log("useEffect shop fire")
    await getListProduct();
    setItems(listProduct)
  },[isFocused]);

  return (
    <View style={[styles.container,{backgroundColor:colors.background}]}>
      <StatusBar/>
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
    productName:{
      fontSize: 18
    },
    productImage: {
      width: 120,
      height: 130,
    },
    productPrice:{
      fontSize: 18
    },
    item: {
      width: 160,
      height: 200,
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
    },
  });