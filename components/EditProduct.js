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

const ProductInput = (props) => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [categories, setCategories] = useState([]);

    const [productName, onChangeProductName] = React.useState(null);
    const [productPrice, onChangeProductPrice] = React.useState(null);
    const [productImage, onChangeProductImage] = React.useState(null);
    const [productCategory, onChangeProductCategory] = React.useState(null);

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
          if(isFocused){
            setCategories(options);
          }
      }
      
    },[isFocused]);

    return(
        <SafeAreaView style={styles.container}>
            <Text style={[styles.text,{color:colors.text}]}>EDIT PRODUCT</Text>
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
                    onPress={()=>console.log("update product")}
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
        
    )
}


export default function EditProduct({route}) {
  const { colors } = useTheme();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const {id} = route.params;
  console.log("id passed to: "+id);

  const[product,setProductToEdit] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productName, onChangeProductName] = React.useState(null);
  const [productPrice, onChangeProductPrice] = React.useState(null);
  const [productImage, onChangeProductImage] = React.useState(null);
  const [productCategory, onChangeProductCategory] = React.useState(null);

  useEffect(async()=>{
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
    if(isFocused){
      await getProductToEdit(id);
      setProductToEdit({
        id: productToEdit.id,
        name: productToEdit.name,
        productCategoryId: productToEdit.productCategoryId,
        price: productToEdit.price,
        image: productToEdit.image, 
      });
      
    }
  },[isFocused]);

  if(isFocused){
  console.log(product.name);
}

    return (
      <View style={[styles.container,{backgroundColor:colors.background}]}>
        <SafeAreaView style={styles.container}>
            <Text style={[styles.text,{color:colors.text}]}>EDIT PRODUCT</Text>
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
                    onPress={()=>console.log("update product")}
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