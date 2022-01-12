import React, { useEffect, useState } from "react";
import { useTheme } from '@react-navigation/native';
import { Modal, FlatList, Text, View, Image, TouchableHighlight, Button, Pressable } from "react-native";
import RadioForm from 'react-native-simple-radio-button';
import { RadioButton } from 'react-native-paper';

import styles from "./styles";


// import { categories } from "../../data/dataArrays";
// import { getNumberOfRecipes } from "../../data/MockDataAPI";
// import MenuImage from "../../components/MenuImage/MenuImage";

import axios from 'axios';
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import NumberFormat from 'react-number-format';
import { Ionicons } from '@expo/vector-icons';
import Footer from "../Footer";


let products;

let allProducts = [];
let datasFilter;
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
        allProducts = products;
      })
    return products;
  } catch (error) {
    console.error(error);

  }

}
export default function ProductsScreen(props) {
  const { colors } = useTheme();
  const [datas, setDatas] = useState([]);
  const [listProductCategories, setListProductCategories] = useState([]);
  useEffect(async () => {
    setDatas(await getProduct());
    // setDatas(setListProductCategories());
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
            //require('../' + item.image)
            {uri:item.image}
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

  //productCategory
  let productCategory = [];
  async function ProductCategories() {
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
  const handleFilter = () => {
    setModalVisible(true);

  }
  useEffect(async () => {
    setListProductCategories(await ProductCategories());
    // setDatas(setListProductCategories());
    return []
  }, []);

  const [checkedCategory, setcheckedCategory] = useState();
  const [CategoryName, setCategoryName] = useState("AllProductCategory");
  const [numberProducts, setNumberProducts] = useState(10);
  const [numberSort, setNumberSort] = useState(radio_props[0].value);
  const [currentSort, setCurrentSort] = useState("");
  const handleSubmit = () => {
    if (checkedCategory) {
      // ||numberSort!=null
      console.log(numberSort);
      let CategoryNameFilter = listProductCategories.filter(x => x.id == checkedCategory)[0];

      setCategoryName(CategoryNameFilter.name)
      setNumberProducts(CategoryNameFilter.products.length);

      datasFilter = allProducts.filter(x => x.productCategoryId == checkedCategory);
      if (numberSort == 0){
        datasFilter = datasFilter.sort(function (a, b) { return b.price - a.price });
        setCurrentSort(radio_props[0].label)
      }
        
      else {
        datasFilter = datasFilter.sort(function (a, b) { return a.price - b.price });
        setCurrentSort(radio_props[1].label)
      }
        
      setDatas(datasFilter);


    }


  }
  return (

    <ScrollView showsHorizontalScrollIndicator={false}
      stickyHeaderIndices={[1]} >
      <Text style={styles.banner} >Banner</Text>
      <View style={styles.headerCategory}>
        <Text style={styles.productCategory}>{CategoryName}({numberProducts})  {currentSort}</Text>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => handleFilter()}
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
        <ScrollView >
          <View style={styles.modalView}>
            <View style={{ flexDirection: "row", }}>
              <Text style={styles.headerModal}>Filter</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => (handleSubmit(), setModalVisible(!modalVisible))}
              >
                <Text style={styles.textStyle}>Submit</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose, { marginLeft: "100px" }]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close X</Text>
              </Pressable>
            </View>

            <View style={styles.bodyModal}>
              <Text>Sort By</Text>
              {/* <RadioForm
                radio_props={radio_props}

                animation={true}
                onPress={(checked, { value = radio_props.values }) => { setChecked(checked), setNumberSort(value) }}
              /> */}

              {
                radio_props.map((obj, { i = obj.value }) => (
                  <View key={i} style={{ marginTop: 20, flexDirection: "row", }}>
                    <RadioButton

                      value={i}

                      status={checked === i ? 'checked' : 'unchecked'}
                      onPress={() => { setChecked(obj.value),setNumberSort(obj.value) }}
                    /><Text>{obj.label}</Text>
                  </View>
                ))
              }
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


              {
                listProductCategories.map((obj, { i = obj.id }) => (
                  <View key={i} style={{ marginTop: 20, flexDirection: "row", }}>
                    <RadioButton

                      value={i}

                      status={checkedCategory === i ? 'checked' : 'unchecked'}
                      onPress={e => { setcheckedCategory(obj.id) }}
                    /><Text>{obj.name}</Text>
                    <View
                      style={{
                        borderBottomColor: "#000000",
                        borderBottomWidth: "1px",
                        alignSelf: 'stretch'
                      }}
                    />

                  </View>
                ))
              }


            </View>
          </View>
        </ScrollView>
      </Modal>
      {
        datas.length > 0 ?

          <FlatList data={datas} renderItem={renderProducts} keyExtractor={(item) => item.id}
            horizontal={false}
            scrollEnabled={true}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          /> :
          <View>
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>No Products</Text>
          </View>}

      <Footer />
    </ScrollView>
  );
}
