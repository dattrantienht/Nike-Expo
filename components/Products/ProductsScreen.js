import React, { useEffect, useState } from "react";
import { useTheme } from '@react-navigation/native';
import { Modal, FlatList, Text, View, Image, TouchableHighlight, Button, Pressable } from "react-native";
import RadioForm from 'react-native-simple-radio-button';
import { RadioButton } from 'react-native-paper';
import styles from "./styles";
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
    await axios.get('https://api.keyboardslinger.club/api/Products')
      .then(response => {
        products = response.data.data;
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
        <NumberFormat
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
  return (
    <ScrollView showsHorizontalScrollIndicator={false}
      stickyHeaderIndices={[1]} >
      <Text style={styles.banner} >Banner</Text>
      <View style={styles.headerCategory}>
        <Text style={styles.productCategory}>{CategoryName} ({numberProducts})  {currentSort}</Text>
        <Pressable
          style={[styles.button, styles.buttonOpen, { marginLeft: "auto" }]}
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
            <View style={styles.headerModal}
            >
              <Text style={styles.headerText}>Filter</Text>
              <Pressable
                style={[styles.button, styles.buttonSubmit]}
                onPress={() => (handleSubmit(), setModalVisible(!modalVisible))}
              >
                <Text style={[styles.textStyle]}>Submit</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close X</Text>
              </Pressable>
            </View>

            <View style={styles.bodyModal}>
              {isFilter &&
                <Pressable
                  style={[styles.button, styles.buttonSubmit]}
                  onPress={() => { resetFilter() }}
                >
                  <Text style={styles.textStyle}>Reset filter</Text>
                </Pressable>
              }
              <Text>Sort By</Text>
              {
                radio_props.map((obj, { i = obj.value }) => (
                  <View key={i} style={{ marginTop: 20, flexDirection: "row", }}>
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
                      onPress={e => { setcheckedCategory(obj.id), setIsFilter(true) }}
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
