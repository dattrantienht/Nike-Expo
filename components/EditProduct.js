import React,  {useEffect, useState} from 'react';
import axios from 'axios';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import {useTheme, useNavigation, useIsFocused} from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import Toast from 'react-native-toast-message';

let listCategory;
let productToEdit;
async function getListCategory() {
    try {
        const response = await axios.get('https://api.keyboardslinger.club/api/ProductCategories');
        listCategory = response.data.data;
    } catch (error) {
        console.error(error);
    }
}
async function getProductToEdit(id) {
  try {
      const response = await axios.get('https://api.keyboardslinger.club/api/Products/'+id);
      productToEdit = response.data.data;
  } catch (error) {
      console.error(error);
  }
}

export default function EditProduct({route}) {
  const { colors } = useTheme();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const {id} = route.params;

  const [product,setProductToEdit] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productName, onChangeProductName] = React.useState(null);
  const [productPrice, onChangeProductPrice] = React.useState(null);
  const [productImage, onChangeProductImage] = React.useState(null);
  const [productCategory, onChangeProductCategory] = React.useState(null);

  useEffect(async()=>{
    if(isFocused){
      await getListCategory();
      if(listCategory.length>0){
        let options = []
        for(let i = 0; i < listCategory.length; i++){
          options.push({
              label: listCategory[i].name,
              value: listCategory[i].id
          })
        }
        if(isFocused){
          setCategories(options);
        }
      }

      await getProductToEdit(id);
      setProductToEdit({
        id: productToEdit.id,
        name: productToEdit.name,
        productCategoryId: productToEdit.productCategoryId,
        price: productToEdit.price.toString(),
        image: productToEdit.image, 
      });
      
    }
  },[isFocused]);

  useEffect(()=>{
    onChangeProductName(product.name);
    onChangeProductCategory(product.productCategoryId);
    onChangeProductPrice(product.price);
    onChangeProductImage(product.image);
  },[product])

  const updateProduct = async (productName, productCategory, productPrice, productImage) => {
    const showSuccessToast = () => {
        Toast.show({
          type: 'success',
          text1: 'Product updated ????????.'
        });
    }

    const showWarningToast = () => {
        Toast.show({
          type: 'info',
          text1: 'Please fill out the form below ????????.'
        });
    }

    const showErrorToast = () => {
        Toast.show({
          type: 'error',
          text1: 'Update product failed ????.'
        });
    }

    if(productName != null && productCategory !=null && productPrice != null && productImage != null){
        console.log(
            productName + "\n" + 
            productCategory + "\n" + 
            productPrice + "\n" + 
            productImage
        )
        await axios.put('https://api.keyboardslinger.club/api/Products',{
            id: product.id,
            name: productName,
            image: productImage,
            price: productPrice,
            productCategoryId: productCategory
        })
        .then(function (response) {
            if(response.data.succeeded){
              showSuccessToast();
              navigation.goBack()
            } else {
              showErrorToast();
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    } else{
        showWarningToast();
    }
}

    return (
      <View style={[styles.container,{backgroundColor:colors.background}]}>
        <SafeAreaView style={[styles.container,{backgroundColor:colors.background}]}>
            <Text style={[styles.text,{color:colors.text}]}>EDIT PRODUCT</Text>
            <TextInput
                style={[styles.input,{borderColor:colors.border, color:colors.text}]} 
                onChangeText={text => onChangeProductName(text)} 
                value={productName}
                placeholder="Product name"
                placeholderTextColor={colors.text} 
            />
            <RNPickerSelect
                value={productCategory}
                onValueChange={(value) => {
                    onChangeProductCategory(value);
                }}
                placeholder={{
                    label: 'Select category',
                    value: null,
                    color: colors.text
                  }}
                items={categories}
                style={{
                    inputAndroid: {
                      backgroundColor: 'transparent',
                      color:colors.text
                    }
                  }}
            />
            <TextInput 
                style={[styles.input,{borderColor:colors.border, color:colors.text}]} 
                onChangeText={text => onChangeProductPrice(text)} 
                value={productPrice}
                placeholder="Price"
                placeholderTextColor={colors.text}
                keyboardType='numeric'
            />
            <TextInput 
                style={[styles.input,{borderColor:colors.border, color:colors.text}]} 
                onChangeText={text => onChangeProductImage(text)} 
                value={productImage}
                placeholder="Image URI"
                placeholderTextColor={colors.text} 
            />
            <View style={styles.buttonRow}>
                <Button
                    style={styles.button}
                    onPress={()=>updateProduct(productName,productCategory,productPrice,productImage)}
                    title="Update Product"
                    color={colors.primary}
                />
                <Text>     </Text>
                <Button
                    onPress={() => navigation.goBack()}
                    title="Cancel"
                    color="#7B241C"
                />
            </View>
        </SafeAreaView>
      </View>
    );
}
  
  const styles = StyleSheet.create({
    container: {flex: 1,  alignItems: 'center', justifyContent: 'center'},
    text:{
      fontSize:18,
    },
    input: {
      height: 40,
      width: 200,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    buttonRow:{
        flexDirection:"row"
    },
    button:{
        marginRight:10
    },
    
  });