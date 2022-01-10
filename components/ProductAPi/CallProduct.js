import React, { useEffect, useState } from "react";
import { useTheme } from '@react-navigation/native';
import { FlatList, Text, View, Image, TouchableHighlight, Button } from "react-native";
import styles from "./ProductStyle";
import axios from 'axios';
import { ScrollView } from "react-native-gesture-handler";
import NumberFormat from 'react-number-format';

let products;

async function getProduct() {
  try {
    await axios.get('https://api.keyboardslinger.club/api/Products',
      {

      }).then(response => {
        products = response.data.data;
        console.log('SUCCESS');
        console.log(products);
      })
    return products;
  } catch (error) {
    console.error(error);

  }

}
export default function CallProduct(props) {
  const { colors } = useTheme();
  const [datas, setDatas] = useState([]);
  useEffect(async() => {
    setDatas(await getProduct());
    return []
  }, []);
  const onPressProduct = (item) => {
    console.log(item);
  };

  const renderProducts = ({ item }) => (
   

    <TouchableHighlight  underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressProduct(item)}>
      <View style={styles.productsItemContainer}>
        <Image style={styles.productsPhoto} 
        source={
          require('../' + item.image) 
        } /> 
        <Text style={[styles.productsName,{color:colors.text}]}>{item.name}</Text>
        <NumberFormat 
        style={{color:colors.text}}
        thousandsGroupStyle="thousand"
        value={item.price}
        prefix="Giá "
        decimalSeparator="."
        displayType="text"
        type="text"
        thousandSeparator={true}
        allowNegative={true} 
           />
      </View>
      </TouchableHighlight>
    
  );
  return (
    
    <ScrollView showsHorizontalScrollIndicator={false} >
      <FlatList data={datas} renderItem={renderProducts} keyExtractor={(item) => item.id}
      horizontal={false}
      scrollEnabled={true}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  );
}
