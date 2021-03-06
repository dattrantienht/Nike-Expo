import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { 
  StyleSheet, 
  Image, 
  Text, 
  View, 
  TouchableOpacity, 
  TouchableHighlight, 
  Dimensions,
  Alert,
} from 'react-native';
import {useTheme, useNavigation, useIsFocused} from '@react-navigation/native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Toast from 'react-native-toast-message';

import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import catPeak from '../assets/catPeak.png'

var {height, width} = Dimensions.get('window');
let listProductCategory;

async function getListProductCategory() {
  try {
      const response = await axios.get('https://api.keyboardslinger.club/api/ProductCategories');
      listProductCategory = response.data.data;
  } catch (error) {
      console.error(error);
  }
}

export default function ProductCategory() {
  const { colors } = useTheme();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [mounted, setMounted] = useState(true);
  const toggle = () => setMounted(!mounted);
  const [items, setItems] = useState([]);
  
  useEffect( async ()=>{
    if(isFocused){
      await getListProductCategory();
      setItems(listProductCategory);
    }
  },[isFocused, mounted]);

  const showSuccessToast = (name) => {
    Toast.show({
      type: 'success',
      text1: 'Product category ' + name + ' deleted.'
    });
  }

  async function requestDeleteProductCategory(id,name) {
    try {
        const response = await axios.delete('https://api.keyboardslinger.club/api/ProductCategories/'+id);
        console.log(response.data.data.name + " deleted")
        toggle();
        showSuccessToast(name)
    } catch (error) {
        console.error(error);
    }
  }

  const deleteAlert = (name,id) =>
  Alert.alert(
    "Confirm",
    "Are you sure you want to delete category " + name + " and all of it's products?",
    [
      {
        text: "No",
        style: "cancel"
      },
      { text: "Yes", onPress: () => {
        requestDeleteProductCategory(id,name);
      }}
    ],
    {
      cancelable: true,
    }
  );

  const editProductCategory = (rowMap, rowKey) => {
    console.log("edit " + rowKey);
    navigation.navigate('Edit Product Category',{
      id: rowKey
    });
  };
  const deleteProductCategory = (rowMap, name, rowKey) => {
    console.log("delete " + rowKey);
    deleteAlert(name,rowKey);
  };
  const onRowDidOpen = rowKey => {
    //console.log('This row opened', rowKey);
  };
  const renderItem = data => (
    <TouchableHighlight
        onPress={() => console.log('You touched ' + data.item.id)}
        style={[styles.rowFront,{
          backgroundColor:colors.background,
          borderBottomColor: colors.border
        }]}
        underlayColor={'#9B59B6'}
    >
        <View style={[styles.productRow,]}>
          <Text style={[styles.productName,{color:colors.text}]}> {data.item.name} </Text>
        </View>
    </TouchableHighlight>
  );
  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
        <Image style={styles.backLeftImage} source={catPeak} /> 
        <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnLeft]}
            onPress={() => editProductCategory(rowMap, data.item.id)}
        >
            
            <MaterialCommunityIcons name="database-edit" size={35} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnRight]}
            onPress={() => {deleteProductCategory(rowMap, data.item.name, data.item.id)}}
        >
            
            <MaterialCommunityIcons name="delete-circle" size={35} color="black" />
        </TouchableOpacity>
    </View>
  );
    return (
      <View style={[styles.container,{backgroundColor:colors.background}]}>
        <SwipeListView
          keyExtractor={(rowData)=>{
            return rowData.id;
          }}
          data={items}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={75}
          rightOpenValue={-150}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onRowDidOpen={onRowDidOpen}
        />
      </View>
    );

}
  
  const styles = StyleSheet.create({
    container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    text:{
      fontSize:18,
    },
    backTextWhite: {
      color: '#FFF',
    },
    productRow:{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    productImage: {
      width: 60,
      height: 70,
      position: 'absolute',
      left:10
    },
    productName:{
      fontSize:15,
    },
    rowFront: {
      alignItems: 'center',
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      flex: 1,
      flexDirection: 'row',
      width:width,
      height: 80
    },
    rowBack: {
      alignItems: 'center',
      backgroundColor: '#DDD',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 15,
      height: 80,
    },
    backLeftImage:{
      width: 60, 
      height: 70,
      position: 'absolute',
    },
    backRightBtn: {
      alignItems: 'center',
      bottom: 0,
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      width: 75,
      height: 80
    },
    backRightBtnLeft: {
      backgroundColor: '#58D68D',
      right: 75,
    },
    backRightBtnRight: {
      backgroundColor: '#EC7063',
      right: 0,
    },
  });