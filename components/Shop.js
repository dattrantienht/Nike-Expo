import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { StatusBar, StyleSheet, Image, Text, View, FlatList, ScrollView, SafeAreaView } from 'react-native';
import { useTheme, useIsFocused } from '@react-navigation/native';
import Footer from './Footer';
import Slide from './Slide';

let listProduct;

async function getListProduct() {
  try {
      const response = await axios.get('https://api.keyboardslinger.club/api/Products');
      listProduct = response.data.data;
  } catch (error) {
      console.error(error);
  }
}

const format = amount => {
  return Number(amount)
    .toFixed(1)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

const Product = ({colors, name, price, image }) => (
  <View style={[styles.item,{backgroundColor:colors.background}]}>
    <Text style={[styles.productName,{color:colors.text}]}>{name}</Text>
    <Image
      style={styles.productImage}
      source={{uri: image}}/>
    <Text style={[styles.productPrice,{color:colors.text}]}>₫ {format(price)}</Text>
  </View>
);



export default function Shop() {
  const { colors } = useTheme();
  const isFocused = useIsFocused();
  const [items, setItems] = useState([]);
  const renderItem = ({ item }) => (
    <Product colors={colors} name={item.name} price={item.price} image={item.image} />
  );
  const slide =(
    <Image  source={{uri: 'https://cdn.dribbble.com/users/1960903/screenshots/7229988/nike_banner.gif'}} style={{width: 350, height: 200}}/>
  )
  
  useEffect( async ()=>{
    await getListProduct();
    setItems(listProduct)
  },[isFocused]);

  return (
    <ScrollView>
      <SafeAreaView style ={[styles.container,{backgroundColor:colors.background}]}>
      <StatusBar/>
      <Slide/>

      <FlatList
        slide={slide}
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
      />
      
     <View> 
      <Footer/>
    </View>
      </SafeAreaView>
    </ScrollView> 
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
      alignItems: 'center', 
      justifyContent: 'center'
    },
  });