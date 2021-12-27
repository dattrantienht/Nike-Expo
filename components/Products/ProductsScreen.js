import React, { useEffect, useState } from "react";
import { FlatList, Text, View, Image, TouchableHighlight } from "react-native";
import styles from "./styles";


// import { categories } from "../../data/dataArrays";
// import { getNumberOfRecipes } from "../../data/MockDataAPI";
// import MenuImage from "../../components/MenuImage/MenuImage";

import axios from 'axios';
import { ScrollView } from "react-native-gesture-handler";
import NumberFormat from 'react-number-format';

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
export default function ProductsScreen(props) {
  const { navigation } = props;
  const [datas, setDatas] = useState([]);
  useEffect(async() => {
    setDatas(await getProduct());

    navigation.setOptions({
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center",
        alignSelf: "center",
        flex: 1,
      },
      headerLeft: () => (
        // <MenuImage
        //   onPress={() => {
        //     navigation.openDrawer();
        //   }}
        // />
        <Text>headerLeft</Text>
      ),
      headerRight: () => <View />,
    });
    return []
  }, []);

  const onPressProduct = (item) => {
    // const title = item.name;
    // const category = item;
    // navigation.navigate("RecipesList", { category, title });

    console.log(item);
  };

  const renderProducts = ({ item }) => (
   

    <TouchableHighlight  underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressProduct(item)}>
      <View style={styles.productsItemContainer}>
        <Image style={styles.productsPhoto} source={require(`../${item.image}`)} />
        <Text style={styles.productsName}>{item.name}</Text>
        <NumberFormat 
        //  style={styles.productsPrice}>{item.price} 
        thousandsGroupStyle="thousand"
        value={item.price}
        prefix="VND "
        decimalSeparator="."
        displayType="text"
        type="text"
        thousandSeparator={true}
        allowNegative={true} 
           />
        {/* <Text style={styles.productsInfo}>{getNumberOfRecipes(item.id)} recipes</Text> */}
      </View>
    </TouchableHighlight>
    
  );
  
  return (
    
    <ScrollView showsHorizontalScrollIndicator={false} >
      <FlatList data={datas} renderItem={renderProducts} keyExtractor={(item) => item.id}
      horizontal={false}
      scrollEnabled={false}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  );
}
