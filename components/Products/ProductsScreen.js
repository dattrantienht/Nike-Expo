import React, { useEffect, useState } from "react";
import { useTheme } from '@react-navigation/native';
import { Modal, FlatList, Text, View, Image, TouchableHighlight, Button, Pressable } from "react-native";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';


import styles from "./styles";


// import { categories } from "../../data/dataArrays";
// import { getNumberOfRecipes } from "../../data/MockDataAPI";
// import MenuImage from "../../components/MenuImage/MenuImage";

import axios from 'axios';
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import NumberFormat from 'react-number-format';
import { Ionicons } from '@expo/vector-icons';


let products;


const imgLink = 'https://dictionary.cambridge.org/images/thumb/tree_noun_001_18152.jpg?version=5.0.203';

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
  const { colors } = useTheme();
  const [datas, setDatas] = useState([]);
  useEffect(async () => {
    setDatas(await getProduct());
    return []
  }, []);

  const [modalVisible, setModalVisible] = useState(false);



  const onPressProduct = (item) => {
    // const title = item.name;
    // const category = item;
    // navigation.navigate("RecipesList", { category, title });

    console.log(item);
  };

  const renderProducts = ({ item }) => (


    <TouchableHighlight underlayColor="rgba(100, 149, 237, 1 )" onPress={() => onPressProduct(item)}>
      <View style={styles.productsItemContainer}>
        <Image style={styles.productsPhoto}
          source={
            require('../' + item.image)
          } />

        {/* <Image style={styles.productsPhoto} 
        source={{uri:imgLink }}
         />  */}
        <Text style={[styles.productsName, { color: colors.text }]}>{item.name}</Text>
        <NumberFormat
          //  style={styles.productsPrice}>{item.price}
          style={{ color: colors.text }}
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
  var radio_props = [
    { label: 'Price: High-Low', value: 0 },
    { label: 'Price: Low-High', value: 1 }
  ];
  const [checked, setChecked] = useState();
  return (

    <ScrollView showsHorizontalScrollIndicator={false}
      stickyHeaderIndices={[1]} >
      <Text style={styles.banner} >Banner</Text>
      <View style={styles.headerCategory}>
        <Text style={styles.productCategory}>ProductCategory</Text>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Filter <Ionicons style={{ paddingLeft: "5px" }} name="filter-outline" size={20} color="black" /></Text>

        </Pressable>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.headerModal}>Filter</Text>
            <View style={styles.bodyModal}>
              <Text>Sort By</Text>
              <RadioForm
                radio_props={radio_props}
                initial={0}
                onPress={(checked) => { setChecked(checked) }}
              />
            </View>
            <View
              style={{
                borderBottomColor: "#000000",
                borderBottomWidth: "1px",
                alignSelf: 'stretch'
              }}
            />

            <View style={styles.bodyModal}>
              <Text>ProductCategory</Text>
              <RadioForm
                radio_props={radio_props}
                initial={0}
                onPress={(checked) => { setChecked(checked) }}
              />
            </View>

           

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close X</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

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
