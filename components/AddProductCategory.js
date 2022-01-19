import React,  {useEffect, useState} from 'react';
import axios from 'axios';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import {useTheme, useNavigation, useIsFocused} from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import Toast from 'react-native-toast-message';


const ProductCategoryInput = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [productCategoryName, onChangeProductCategoryName] = React.useState(null);

    const addNewProductCategory = async (productCategoryName) => {
        const showSuccessToast = () => {
            Toast.show({
              type: 'success',
              text1: 'New product category added 😊👌.'
            });
        }
    
        const showWarningToast = () => {
            Toast.show({
              type: 'info',
              text1: 'Please fill out the form below 😑👇.'
            });
        }
    
        const showErrorToast = () => {
            Toast.show({
              type: 'error',
              text1: 'Add product category failed 😨.'
            });
        }

        if(productCategoryName != null){
            console.log(productCategoryName);
            await axios.post('https://api.keyboardslinger.club/api/ProductCategories',{
                name: productCategoryName,
            })
            .then(function (response) {
                console.log(response.data);
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

    return(
        <SafeAreaView style={styles.container}>
            <Text style={[styles.text,{color:colors.text}]}>ADD PRODUCT CATEGORY</Text>
            <TextInput 
                style={[styles.input,{borderColor:colors.border, color:colors.text}]} 
                onChangeText={text => onChangeProductCategoryName(text)} 
                value={productCategoryName}
                placeholder="Product category name"
                placeholderTextColor={colors.text} 
            />
            <View style={styles.buttonRow}>
                <Button
                    style={styles.button}
                    onPress={()=>addNewProductCategory(productCategoryName)}
                    title="Add Category"
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

export default function AddProductCategory() {
    const { colors } = useTheme();

      return (
          <View style={[styles.container,{backgroundColor:colors.background}]}>
              <ProductCategoryInput/>
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