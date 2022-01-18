import React,  {useEffect, useState} from 'react';
import axios from 'axios';
import { SafeAreaView, StyleSheet, Text, View, Button, Image } from 'react-native';
import {useTheme, useNavigation, useIsFocused} from '@react-navigation/native';

let productData;

async function getProductData(id) {
    try {
        const response = await axios.get('https://api.keyboardslinger.club/api/Products/'+id);
        productData = response.data.data;
    } catch (error) {
        console.error(error);
    }
  }

  const format = amount => {
    return Number(amount)
      .toFixed(1)
      .replace(/\d(?=(\d{3})+\.)/g, '$&.');
  };

export default function ViewProduct({route}) {
  const { colors } = useTheme();
  const navigation = useNavigation();
  
  const isFocused = useIsFocused();
  const {id} = route.params;
  const [product,setProductToEdit] = useState([]);
  
  const [productName, onChangeProductName] = React.useState(null);
  const [productPrice, onChangeProductPrice] = React.useState(null);
  const [productImage, onChangeProductImage] = React.useState(null);
  const [productCategory, onChangeProductCategory] = React.useState(null);

  useEffect(async()=>{
    if(isFocused){
      await getProductData(id);
      setProductToEdit({
        id: productData.id,
        name: productData.name,
        productCategoryId: productData.productCategoryId,
        price: productData.price.toString(),
        image: productData.image, 
      });
      
    }
  },[isFocused]);

  useEffect(()=>{
    onChangeProductName(product.name);
    onChangeProductCategory(product.productCategoryId);
    onChangeProductPrice(product.price);
    onChangeProductImage(product.image);
  },[product])

    return (
      <View style={[styles.container,{backgroundColor:colors.background}]}>
        <SafeAreaView style={[styles.container,{backgroundColor:colors.background}]}>
            <Text style={[styles.text,{borderColor:colors.border, color:colors.text}]}>Name: {productName}</Text>
            <Text></Text>
            <Image
                style={styles.productImage}
                source={{uri: productImage}}/>
            <Text style={[styles.text,{borderColor:colors.border, color:colors.text}]}>Price: {format(productPrice)}  VND</Text>
            <Text></Text>
            <View style={styles.buttonRow}>
                <Button
                    style={styles.button}
                    onPress={()=> alert('This function is not available yet')}
                    title="Add to Card"
                    color={colors.primary}
                />
                <Text>     </Text>
                <Button
                    onPress={() => navigation.goBack()}
                    title="Go Back"
                    color="#7B241C"
                />
            </View>
        </SafeAreaView>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {flex: 1,  alignItems: 'center', justifyContent: 'center'},
    h1:{ fontSize: 40 },
    text:{
      fontSize:30,
    },
    productImage: {
        width: 300,
        height: 310,
      },
    buttonRow:{
        flexDirection:"row"
    },
    button:{
        marginRight:10
    },
  });