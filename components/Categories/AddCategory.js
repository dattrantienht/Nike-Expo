
import React, { useEffect, useState } from 'react';
import {SafeAreaView ,StyleSheet,TextInput, Text, View, TouchableHighlight, Button } from 'react-native';
import {useTheme} from '@react-navigation/native';
import axios from 'axios';

async function AddData(nameCategory){
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

const DataInput = () => {
    const { color } = useTheme();
    const [nameCategory, setNameCategory] = React.useState(null);

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={[styles.input]}
                onChangeText={text => setNameCategory(text)}
                value={nameCategory}
                placeholder="Nhập tên danh mục"
            />
            <Text>{'\n'}</Text>
            <Button
                onPress={() => AddData(nameCategory)}
                title="Thêm"
                color="#406882" 
            />
        </SafeAreaView>
    );
};

export default function AddCategory(){
    const { colors } = useTheme();
        return(
            <View>
                <DataInput
                />
            </View>
        );
}

const styles = StyleSheet.create({
    container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
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


  });

