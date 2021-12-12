import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { StyleSheet, Text, View } from 'react-native';
import {useTheme} from '@react-navigation/native';

let catFact;

async function getCatFact() {
    try {
        const response = await axios.get('https://catfact.ninja/fact');
        catFact = response.data.fact;
        console.log(catFact);
    } catch (error) {
        console.error(error);
    }
}

export default function cat() {
    const { colors } = useTheme();
    const [fact, setFact] = useState('loading');
    useEffect( async ()=>{
        await getCatFact();
        console.log('cat fact in cat component:'+catFact);
        setFact(catFact);
    },[]);

    return (
      <View style={[styles.container,{backgroundColor:colors.background}]}>
        <Text style={[styles.text,{color:colors.text}]}>Ramdom Cat Fact:</Text>
        <Text style={[styles.text,{color:colors.text}]}>{fact}</Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    text:{
      fontSize:18,
    }
  });