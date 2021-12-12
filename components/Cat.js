import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions} from 'react-native';
import {useTheme} from '@react-navigation/native';

var {height, width} = Dimensions.get('window');
let catFact;
let catImageUri;

async function getCatFact() {
    try {
        const response = await axios.get('https://catfact.ninja/fact');
        catFact = response.data.fact;
        console.log(catFact);
    } catch (error) {
        console.error(error);
    }
}

async function getCatImage() {
    try {
        const response = await axios.get('https://api.thecatapi.com/v1/images/search');
        catImageUri = response.data[0].url;
        console.log(catImageUri);
    } catch (error) {
        console.error(error);
    }
}

export default function cat() {
    const { colors } = useTheme();
    const [fact, setFact] = useState('loading');
    const [image, setImage] = useState(' ');
    const [mounted, setMounted] = useState(true);
    const toggle = () => setMounted(!mounted);

    useEffect( async ()=>{
        await getCatFact();
        setFact(catFact);
        await getCatImage();
        setImage(catImageUri);
    },[mounted]);

    return (
      <View style={[styles.container,{backgroundColor:colors.background}]}>
        <Image source={{
          uri: image
        }} style={{marginBottom:10 , width: width *0.9, height: height*0.5, resizeMode: 'cover', overflow: 'visible' }} /> 
        <Text style={{color:colors.text,fontSize:15,fontWeight:"bold"}}>Ramdom Cat Fact:</Text>
        <Text style={[styles.text,{color:colors.text,margin:10}]}>{fact}</Text>
        <TouchableOpacity
            onPress={toggle}
            style={{ backgroundColor: colors.primary, padding:5 }}>
            <Text style={{ fontSize: 20, color: colors.text }}>Get more cats</Text>
        </TouchableOpacity>
    </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    text:{
      fontSize:18,
    }
  });