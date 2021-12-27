import React, { useState, useEffect } from 'react';
import { ListViewBase, StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import axios from 'axios';



let products;


async function getProduct() {
  try {


    await axios.get('https://api.keyboardslinger.club/api/Products',
      {

      }).then(response => {
        /* eslint-disable */
        products = response.data.data;
        console.log('SUCCESS');
        console.log(products);
      })
    return products;
  } catch (error) {
    console.error(error);

  }

}


export default function Product() {
  console.log(datas);
  const { colors } = useTheme();
  const [datas, setDatas] = useState([]);
  useEffect(async () => {

    setDatas(await getProduct());

  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Product Screen</Text>
      </View>
      <View style={styles.body}>

        {datas.map((data) => (
          <View style={styles.productContainer}
            key={data.id}>
            <Image style={[styles.productImage]} 
             source={require(`./${data.image}`)}
              />
            <Text>{data.name}</Text>
          </View>

        ))}
      </View>


    </View>
  );
}

const { width } = Dimensions.get('window');
const productWidth = (width - 50) / 2;

const productHeight = (productHeight / 864) * 1080
console.log(productWidth,productWidth);


const styles = StyleSheet.create({
  container: {
    backgroundColor:'#fff',
    margin:10
  },
  titleContainer: {
    height:50,
    justifyContent:'center',
    paddingLeft:10
  },
  
  title: {
   color:'#D3D3CF'
  },
  body: {
    
  },
  productContainer: {
    width:productWidth
  },
  productImage: {
    width:productWidth,
    height:productHeight
  },
});