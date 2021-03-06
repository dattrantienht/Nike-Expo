import React from 'react';
import axios from 'axios';
import {SafeAreaView, StyleSheet, View, TextInput, Button, Alert, Image } from 'react-native';
import {useTheme} from '@react-navigation/native';

import nikeColor from '../assets/nikeColor.png'

let userData = {}

async function requestLogin(username, password) {
  if(username != null && password != null){

    await axios.post('https://api.keyboardslinger.club/api/Login', {
      userName: username,
      password: password
    })
    .then(function (response) {
      console.log(response.data);
      if(response.data.succeeded){
        userData = response.data.data;
        console.log(userData.user.name + ' ' + userData.user.lastName + ' login succeeded')
        alert(userData.user.name + ' ' + userData.user.lastName + ' login succeeded')
      } else {
        console.log('login failed')
        alert('Tên đăng nhập hoặc mật khẩu sai')
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

const LoginInput = () => {
  const { colors } = useTheme();

  const [username, onChangeUsername] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={nikeColor} style={{ width: 250, height: 125, marginBottom: 20 }} /> 
      <TextInput 
        style={[styles.input,{borderColor:colors.border, color:colors.text}]} 
        onChangeText={text => onChangeUsername(text)} 
        value={username}
        placeholder="Username"
        placeholderTextColor={colors.text} 
      />
      <TextInput
        style={[styles.input,{borderColor:colors.border, color:colors.text}]}
        onChangeText={text => onChangePassword(text)}
        value={password}
        placeholder="Password"
        placeholderTextColor={colors.text}
        secureTextEntry={true}
      />
      <Button
        onPress={()=>requestLogin(username,password)}
        title="Login"
        color={colors.primary}
      />
    </SafeAreaView>
  );
};

export default function login() {
  const { colors } = useTheme();
    return (
      <View style={[styles.container,{backgroundColor:colors.background}]}>
        <LoginInput/>
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