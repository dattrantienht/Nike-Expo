import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { StatusBar, StyleSheet, Image, Text, View, FlatList } from 'react-native';
import { useTheme } from '@react-navigation/native';

let listProduct;
let imageUriTest = 'https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/f0c6bdc2-b8fe-45f7-a76d-ae1bbf30e156/air-jordan-4-crimson-ct8527-016-release-date.jpg';


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
    <Image
      style={styles.productImage}
      source={{uri: image}}/>
    <Text>{price}</Text>
  </View>
);

export default function Shop() {
  const { colors } = useTheme();
  const [items, setItems] = useState([]);
  const renderItem = ({ item }) => (
    <Product name={item.name} price={item.price} image={item.image} />
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
      height: 200,
      backgroundColor: 'white',
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    productImage: {
      width: 120,
      height: 130,
    },
  });