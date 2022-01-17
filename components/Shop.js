import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { StatusBar, StyleSheet, Image, Text, View, FlatList, TouchableHighlight, Touchable } from 'react-native';
import { NavigationContainer, useNavigation, useTheme } from '@react-navigation/native';
import ViewProduct from './ViewProduct';

let listProduct;
let imageUriTest = 'https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/f0c6bdc2-b8fe-45f7-a76d-ae1bbf30e156/air-jordan-4-crimson-ct8527-016-release-date.jpg';


async function getListProduct() {
  try {
      const response = await axios.get('https://api.keyboardslinger.club/api/Products');
      listProduct = response.data.data;
  } catch (error) {
      console.error(error);
  }
}


export default function Shop() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const renderItem = ({ item }) => (
    <Product colors={colors} id={item.id} name={item.name} price={item.price} image={item.image} />
  );

  useEffect( async ()=>{
    await getListProduct();
    setItems(listProduct)
    console.log(listProduct);
  },[]);

const viewProduct = (id) => {
  navigation.navigate('View Product',{id: id});
};

const Product = ({colors, id, name, price, image }) => (
  <TouchableHighlight onPress={()=>viewProduct(id)}>
    <View style={[styles.item,{backgroundColor:colors.background}]}>
      <Text style={[styles.productName,{color:colors.text}]}>{name}</Text>
      <Image
        style={styles.productImage}
        source={{uri: image}}/>
      <Text style={[styles.productPrice,{color:colors.text}]}>{price}</Text>
    </View>
  </TouchableHighlight>
);

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
    productName:{
      fontSize: 18
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
    productImage: {
      width: 120,
      height: 130,
    },
  });