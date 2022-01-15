import React,  {useEffect, useState} from 'react';
import axios from 'axios';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import {useTheme, useNavigation, useIsFocused} from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import Toast from 'react-native-toast-message';

let productCategoryToEdit;

async function getProductCategoryToEdit(id) {
    try {
        const response = await axios.get('https://api.keyboardslinger.club/api/ProductCategories/'+id);
        productCategoryToEdit = response.data.data;
    } catch (error) {
        console.error(error);
    }
}

export default function EditProductCategory({route}) {
    const { colors } = useTheme();
    const isFocused = useIsFocused();
    const navigation = useNavigation();

    const {id} = route.params;

    const [productCategory,setProductCategoryToEdit] = useState([]);
    const [productCategoryName, onChangeProductCategoryName] = React.useState(null);

    useEffect(async()=>{
        if(isFocused){
          await getProductCategoryToEdit(id);
          setProductCategoryToEdit({
            id: productCategoryToEdit.id,           
            name: productCategoryToEdit.name,
          });
          
        }
      },[isFocused]);

    useEffect(()=>{
        onChangeProductCategoryName(productCategory.name);
    },[productCategory])

    const updateProductCategory = async (productCategoryName) => {
        const showSuccessToast = () => {
            Toast.show({
              type: 'success',
              text1: 'Product category updated 😺👌.'
            });
        }
    
        const showWarningToast = () => {
            Toast.show({
              type: 'info',
              text1: 'Please fill out the form below 😾👇.'
            });
        }
    
        const showErrorToast = () => {
            Toast.show({
              type: 'error',
              text1: 'Update product category failed 🙀.'
            });
        }
    
        if(productCategoryName != null){
            console.log(productCategoryName);
            await axios.put('https://api.keyboardslinger.club/api/ProductCategories',{
                id: productCategory.id,
                name: productCategoryName
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

    return(
        <View style={[styles.container,{backgroundColor:colors.background}]}>
             <SafeAreaView style={styles.container}>
                <Text style={[styles.text,{color:colors.text}]}>EDIT PRODUCT CATEGORY</Text>
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
                        onPress={()=>updateProductCategory(productCategoryName)}
                        title="Update Category"
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
   
    )
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