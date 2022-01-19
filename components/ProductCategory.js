import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import axios from 'axios';

export let productCategory;
async function getProduct() {
  try {


    await axios.get('https://api.keyboardslinger.club/api/ProductCategories',
      {

      }).then(response => {
        /* eslint-disable */
        productCategory = response.data.data;
        console.log('SUCCESS');
        console.log(productCategory);
      })
    return productCategory;
  } catch (error) {
    console.error(error);

  }

}

const renderProducts = ({ item }) => (
  <View >

    <Text >{item.name}</Text>

  </View>
);
export default function ProductCategory() {
  const { colors } = useTheme();
  const [datas, setDatas] = useState([]);
  useEffect(async () => {
    setDatas(await getProduct());
    return []
  }, []);

  return (
    productCategory
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: {
    fontSize: 18,
  }
});