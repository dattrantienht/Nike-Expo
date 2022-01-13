import React,{ useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Button, TouchableHighlight, SafeAreaView, TextInput } from 'react-native';
import {useTheme} from '@react-navigation/native';
import axios from 'axios';

let categories;
async function getCategory(){
  try {
    await axios.get('https://api.keyboardslinger.club/api/ProductCategories',{ })
    .then(response => {
        categories = response.data.data;
        console.log('GET DATA SUCCESS');
      })
    return categories;
  } catch (error) {
    console.error(error);
  }
}

async function DeleteCategory(id){
  let url = 'https://api.keyboardslinger.club/api/ProductCategories/'+id;
  try{
    await axios.delete(url,{ })
    .then(response => {
        console.log('Delete Success');
    })
  }catch(error){
    console.log('error');
  }
}

async function AddCategory(nameCategory){
  if(nameCategory != null){ 
      try {
              const response = await axios.post('https://api.keyboardslinger.club/api/ProductCategories',{
                  name: nameCategory
              });
              console.log(response.data);
          }catch (error) {
              console.error(error);
          }
      }
  }
  
  const InputCategory = () => {
      const { color } = useTheme();
      const [nameCategory, setNameCategory] = React.useState(null);
  
      return (
          <SafeAreaView style={{flexDirection:'row'}}>
              <TextInput
                  style={[styles.input]}
                  onChangeText={text => setNameCategory(text)}
                  value={nameCategory}
                  placeholder="Name Category"
              />
              <Button
                  onPress={() => AddCategory(nameCategory)}
                  title="Add new"
              />
          </SafeAreaView>
      );
  };

export default function ProductCategory(props) {
  const { colors } = useTheme();
  const [dataCategory, setDataCategory] = useState([]);
  const [checked, setChecked] = useState(true);
  const toggle = () => setChecked(!checked);

  useEffect(async()=>{
    setDataCategory(await getCategory());
    return []
  }, [checked]);
  
  const renderCategory = ({ item }) => (
    <TouchableHighlight onPress={() => toggle()}>
      <View style={{flexDirection:'row'}}>
        <Text style={{color: '#ffffff',width: 250}}>{item.name}</Text>
        <Button title='Edit' />
        <Button title='Delete' color="#ff0000" onPress={() => DeleteCategory(item.id)}/>
      </View>
    </TouchableHighlight>
  );
    return (
      <View style={[styles.container,{backgroundColor:colors.background}]}>
        <Text style={[styles.text,{color:colors.text}]}>Product Category Screen</Text>
        <InputCategory/>
        <FlatList data={dataCategory} 
                  renderItem={renderCategory} 
                  keyExtractor={(item) => item.id}
                  horizontal={false}
                  scrollEnabled={true}
                  numColumns={1}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    text:{
      fontSize:18,
    },
    input:{
      fontSize:15, fontWeight:'bold', color:'#000000',backgroundColor:'#ffffff',
      width: 300,
    }
  });