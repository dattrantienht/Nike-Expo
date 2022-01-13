import React,  {useEffect, useState} from 'react';
import axios from 'axios';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import {useTheme, useNavigation} from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';

let listCategory;
async function getListCategory() {
    try {
        const response = await axios.get('https://api.keyboardslinger.club/api/ProductCategories');
        listCategory = response.data.data;
    } catch (error) {
        console.error(error);
    }
}

async function addNewProduct(productName, productCategory, productPrice, productImage){
    
    if(productName != null && productCategory !=null && productPrice != null && productImage != null){
        console.log(
            productName + "\n" + 
            productCategory + "\n" + 
            productPrice + "\n" + 
            productImage
        )
        await axios.post('https://api.keyboardslinger.club/api/Products',{
            name: productName,
            image: productImage,
            price: productPrice,
            productCategoryId: productCategory
        })
        .then(function (response) {
            console.log(response.data);
            if(response.data.succeeded){
              alert('New product added')
            } else {
              alert('Add product failed')
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}


const ProductInput = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const [categories, setCategories] = useState([]);
    useEffect( async ()=>{
      await getListCategory();
      if(listCategory.length>0){
          let options = []
          for(let i = 0; i < listCategory.length; i++){
              options.push({
                  label: listCategory[i].name,
                  value: listCategory[i].id
              })
          }
          setCategories(options);
      }
    },[]);
    const [productName, onChangeProductName] = React.useState(null);
    const [productPrice, onChangeProductPrice] = React.useState(null);
    const [productImage, onChangeProductImage] = React.useState(null);
    const [productCategory, onChangeProductCategory] = React.useState(null);

    return(
        <SafeAreaView style={styles.container}>
            <Text style={[styles.text,{color:colors.text}]}>ADD PRODUCT</Text>
            <TextInput 
                style={[styles.input,{borderColor:colors.border, color:colors.text}]} 
                onChangeText={text => onChangeProductName(text)} 
                value={productName}
                placeholder="Product name"
                placeholderTextColor={colors.text} 
            />
            <RNPickerSelect
                onValueChange={(value) => {
                    console.log(value);
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
                    onPress={()=>addNewProduct(productName,productCategory,productPrice,productImage)}
                    title="Add Product"
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
        
    )
}

export default function AddProduct() {
  const { colors } = useTheme();

    return (
        <View style={[styles.container,{backgroundColor:colors.background}]}>
            <ProductInput/>
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