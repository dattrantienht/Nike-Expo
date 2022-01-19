import React, { useEffect, useState } from "react";
import { useTheme } from '@react-navigation/native';
import { Modal, FlatList, Text, View, Image, TouchableHighlight, Pressable, LogBox } from "react-native";

import {  RadioButton } from 'react-native-paper';
import styles from "./styles";
import axios from 'axios';
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import { Ionicons } from '@expo/vector-icons';
import Footer from "./Footer";
import Banner from "./Banner";
let products;
let allProducts = [];
let datasFilter;

async function getProduct() {
  try {
    await axios.get('https://api.keyboardslinger.club/api/Products')
      .then(response => {
        products = response.data.data;
        allProducts = products;
        console.log(allProducts);
      })
    return products;
  } catch (error) {
    console.error(error);
  }
}
export default function ProductsScreen() {
  const { colors } = useTheme();
  const [datas, setDatas] = useState([]);
  const [listProductCategories, setListProductCategories] = useState([]);
  useEffect(async () => {
    setDatas(await getProduct());
    setNumberProducts(allProducts.length);
    return []
  }, []);
  const [modalVisible, setModalVisible] = useState(false);
  const onPressProduct = (item) => {
    console.log(item);
  };
  const renderProducts = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(100, 149, 237, 1 )" onPress={() => onPressProduct(item)}>
      <View style={styles.productsItemContainer}>
        <Image style={styles.productsPhoto}
          source={
            { uri: item.image }
          } />
        <Text style={[styles.productsName, { color: colors.text }]}>{item.name}</Text>
        <Text style={[styles.productsName, { color: colors.text }]}>
        
        
          {item.price} VND
        </Text>
      </View>
    </TouchableHighlight>
  );
  var radio_props = [
    { label: 'Price: High-Low', value: 0 },
    { label: 'Price: Low-High', value: 1 }
  ];
  const [checked, setChecked] = useState();
  let productCategory = [];
  async function ProductCategories() {
    try {
      await axios.get('https://api.keyboardslinger.club/api/ProductCategories',
        {
        }).then(response => {
          productCategory = response.data.data;
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
    return []
  }, []);
  const [checkedCategory, setcheckedCategory] = useState();
  const [CategoryName, setCategoryName] = useState("AllProductCategory");
  const [numberProducts, setNumberProducts] = useState();
  const [numberSort, setNumberSort] = useState();
  const [currentSort, setCurrentSort] = useState("");
  const [isFilter, setIsFilter] = useState(false);
  const handleSubmit = () => {
    datasFilter = allProducts;
    if (checkedCategory) {
      let CategoryNameFilter = listProductCategories.filter(x => x.id == checkedCategory)[0];
      setCategoryName(CategoryNameFilter.name)
      setNumberProducts(CategoryNameFilter.products.length);
      datasFilter = allProducts.filter(x => x.productCategoryId == checkedCategory);
    }
    if (numberSort == 0) {
      datasFilter = datasFilter.sort(function (a, b) { return b.price - a.price });
      setCurrentSort(radio_props[0].label)
    }
    else if (numberSort == 1) {
      datasFilter = datasFilter.sort(function (a, b) { return a.price - b.price });
      setCurrentSort(radio_props[1].label)
    }
    setDatas(datasFilter);
  }
  const resetFilter = () => {
    setNumberSort(-1);
    setCurrentSort("");
    setNumberProducts(allProducts.length);
    setChecked();
    setcheckedCategory();
    setCategoryName("AllProductCategory");
    setIsFilter(false)
  }
  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, [])
  return (
    <>
      <ScrollView showsHorizontalScrollIndicator={false}
        stickyHeaderIndices={[1]} >
 
        <View style={styles.banner} >
          <Banner />
        </View>
        <View style={styles.headerCategory}>
          <Text style={styles.productCategory}>{CategoryName} ({numberProducts})  {currentSort}</Text>
          <Pressable
            style={[styles.button, styles.buttonOpen,
            { marginLeft: "auto" }
            ]}
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

            setModalVisible(!modalVisible);
          }}
        >

          <View style={styles.modalView}>
            <View style={styles.headerModal}
            >
              <Text style={styles.headerText}>Filter</Text>
              {isFilter &&
              <Pressable
              style={[styles.button, styles.buttonSubmit]}
              onPress={() => (resetFilter())}
            >
              <Text style={[styles.textStyle]}>Reset filter</Text>
            </Pressable>}
              
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close X</Text>
              </Pressable>
            </View>

            <View style={styles.bodyModal}>
              
                <Pressable
                  style={[styles.button, styles.buttonSubmit]}
                  onPress={() => { handleSubmit(), setModalVisible(!modalVisible) }}
                >
                  <Text style={styles.textStyle}>Submit</Text>
                </Pressable>
              
              <Text>Sort By</Text>
              {
                radio_props.map((obj, { i = obj.value }) => (
                  <View key={i} style={{ marginTop: 20, flexDirection: "row",alignItems:'center' }}>
                    <RadioButton
                      value={i}
                      status={checked === i ? 'checked' : 'unchecked'}
                      onPress={() => { setChecked(obj.value), setNumberSort(obj.value), setIsFilter(true) }}
                    /><Text>{obj.label}</Text>
                  </View>
                ))
              }
            </View>
            <View
              style={styles.hr}
            />
            <View style={styles.bodyModal}>
              <Text>ProductCategory</Text>
              {
                listProductCategories.map((obj, { i = obj.id }) => (
                  <View key={i} style={{ marginTop: 20, flexDirection: "row",alignItems:'center' }}>
                    <RadioButton
                      value={i}
                      status={checkedCategory === i ? 'checked' : 'unchecked'}
                      onPress={e => { setcheckedCategory(obj.id), setIsFilter(true) }}
                    /><Text>{obj.name}</Text>
                    <View
                      style={styles.hr}
                    />
                  </View>
                ))
              }
            </View>
          </View>

        </Modal>
        {
          datas.length > 0 ? <View>

            <FlatList data={datas} renderItem={renderProducts} keyExtractor={(item) => item.id}
            scrollEnabled={false}
              horizontal={false}
              scrollEnabled={false}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          </View>
            :
            <View>
              <Image style={styles.productsPhoto}
                source={
                  { uri: "https://kellysearch.co.in/assets/images/pnf.jpg" }
                } />
            </View>}
        <Footer />
      </ScrollView>
    </>
  );
}
