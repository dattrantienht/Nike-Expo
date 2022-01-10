import styleCategory from "./StyleCategory";
import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableHighlight, Button } from 'react-native';
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

export default function GetCategory(props) {
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
        <Text style={[styleCategory.categoriesName]}>{item.name} {'      '}
          <Button title='Thêm ' onPress={() => alert.alert('Surprise its no function :))')}/>
          <Button title='Xóa' color="#ff0000"/>
        </Text>
      </View>
    </TouchableHighlight>
  );

    return (
      <ScrollView>
        <FlatList style={[styleCategory.categoriesName]} data={dataCategory} renderItem={renderCategory} keyExtractor={(item) => item.id}
        horizontal={false}
        scrollEnabled={true}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    );
  }