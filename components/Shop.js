import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { StatusBar, StyleSheet, Image, Text, View, FlatList, TouchableHighlight, TextInput } from 'react-native';
import { useTheme, useIsFocused, useNavigation } from '@react-navigation/native';
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

export default function Shop() {
  const { colors } = useTheme();
  const isFocused = useIsFocused();
  const [items, setItems] = useState([]);
  const renderItem = ({ item }) => (
    <Product colors={colors} id={item.id} name={item.name} price={item.price} image={item.image} />
  );
  const slide =(
    <Image  source={{uri: 'https://cdn.dribbble.com/users/1960903/screenshots/7229988/nike_banner.gif'}} style={{width: 350, height: 200}}/>
  )
  
  const navigation = useNavigation();

  const [search, setSearch] = useState('');
  const [masterDataSource, setMasterDataSource] = useState([]);

const viewProduct = (id) => {
  navigation.navigate('View Product',{id: id});
}

const Product = ({colors, id, name, price, image }) => (
  <TouchableHighlight onPress={()=> viewProduct(id)}>
    <View style={[styles.item,{backgroundColor:colors.background}]}>
      <Text style={[styles.productName,{color:colors.text}]}>{name}</Text>
      <Image
        style={styles.productImage}
        source={{uri: image}}/>
      <Text style={[styles.productPrice,{color:colors.text}]}>₫ {format(price)}</Text>
    </View>
  </TouchableHighlight>
);

  useEffect( async ()=>{
    await getListProduct();
    setItems(listProduct);
    setMasterDataSource(listProduct);
  },[isFocused]);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.name
          ? item.name
          : '';
        const textData = text;
        return itemData.indexOf(textData) > -1;
      });
      setItems(newData);
      setSearch(text);
    } else {
      setItems(masterDataSource);
      setSearch(text);
    }
  };

  return (
    <SafeAreaView style ={[styles.container,{backgroundColor:colors.background}]}>
      <StatusBar/>

      <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Product Here"
        />
      <FlatList
        ListHeaderComponent={() => (<Slide/>)}
        ListFooterComponent={() => (<Footer/>)}
        slide={slide}
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
      />

    </SafeAreaView>
  );
}
  
  const styles = StyleSheet.create({
    container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    text:{ fontSize:18, },
    productName:{ fontSize: 18 },
    productImage: {
      width: 120,
      height: 130,
    },
    productPrice:{ fontSize: 18 },
    item: {
      width: 160,
      height: 200,
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
      alignItems: 'center', 
      justifyContent: 'center'
    },
    itemStyle: { padding: 10, },
    textInputStyle: {
      height: 40,
      width: 320,
      borderWidth: 1,
      paddingLeft: 20,
      margin: 5,
      borderColor: '#009688',
      backgroundColor: '#FFFFFF',
    },
  });