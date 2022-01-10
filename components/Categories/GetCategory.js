
import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableHighlight, Button } from 'react-native';
import {useTheme} from '@react-navigation/native';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';



let productCategories;

async function getProductCategory(){
  try {
    await axios.get('https://api.keyboardslinger.club/api/ProductCategories',{ })
    .then(response => {
        productCategories = response.data.data;
        console.log('SUCCESS');
        console.log(productCategories);
      })
    return productCategories;
  } catch (error) {
    console.error(error);
  }
}

async function DeleteProductCategory(id){
  let url = 'https://api.keyboardslinger.club/api/ProductCategories/'+id;
  try{
    await axios.delete(url,{ })
    .then(response => {
        console.log('Delete Success');
    })
  }catch(error){
    console.log('error');
  }
}

export default function GetCategory(_props) {
  const { colors } = useTheme();
  const [dataCategory, setDataCategory] = useState([]);

  useEffect(async() => {
    setDataCategory(await getProductCategory());
    return []
  }, []);

  const onPressCategory = (item) => {
    console.log(item);
  };

  const renderCategory = ({ item }) => (
    <TouchableHighlight onPress={() => onPressCategory(item)}>
      <View>
        <Text>{item.id+'  '+item.name} {'      '}
          <Button  title='Sửa' color="#96CEB4"/>
          <Button  title='Xóa' color="#D9534F" onPress={() => DeleteProductCategory(item.id)}/>
        </Text>
        <Text>____________________________________________________________</Text>
      </View>
    </TouchableHighlight>
  );

    return (
      <ScrollView>
        <FlatList  data={dataCategory} renderItem={renderCategory} keyExtractor={(item) => item.id}
        horizontal={false}
        scrollEnabled={true}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    );
  }

