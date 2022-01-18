
//npm install react-native-communications --save


import React, { Component } from "react";
import {View, StyleSheet, Text, TextInput, Button, Image,TouchableOpacity} from "react-native";

import Communications from "react-native-communications";

 
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bodyText: ""
    };
  }
 
  
  openEmail = () => {
    Communications.email(
      ["tmphuong.th113@kgc.edu.vn"], //mặc định gui den dia chi nay
      null,
      null,
      //tieu dề
      "Phản hồi từ khách hàng đến NIKE",
      //nội dung phản hồi
      this.state.bodyText
      
    );
  }

  /////GOI TRUC TIEP
  dialCall = () => {

    Communications.phonecall('0855910311', true);

  }

  /////gui sms
  sendSMS = () => {

    Communications.text(
      '0855910311'
      
    );

  }

 
  render() {
    return (
      <View style={styles.container}>

        <Image source={{uri: 'https://essenceofemail.com/wp-content/uploads/GIFs-in-email.gif'}} style={{width: 280, height: 110}} />

        <Text
          style={{ textAlign: "center", fontSize: 16, paddingVertical: 15 }}>
        Chúng tôi luôn tiếp nhận mọi phản hồi từ bạn.
        </Text>

        <TextInput
        style={styles.input}
          value={this.state.bodyText}
          onChangeText={bodyText => this.setState({ bodyText })}
          placeholder={"Nhập nội dung"}
          multiline
        />
        <Text>{"\n"}</Text>

        <Image source={{uri: 'https://raduga.nsk.socinfo.ru/media/2020/03/23/1253619752/preview_b002f4096591960da82de832890370c6.gif'}} style={{width: 30, height:50}}  />

        <View style={{ marginTop: 20 }}>
          <Button
              onPress={this.openEmail}
              title="Send Email"
              color="#F0A500" />   
        </View>
      <Text>{"\n"}</Text>

      <View style={styles.buttonRow}>
          <Button
              onPress={this.dialCall}
              title="     Call     "
              color="#FFC85C" />   
          <Text>     </Text>
          <Button
              onPress={this.sendSMS}
              title="     SMS     "
              color="#FFC85C" />   
      </View>

      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 15,
    backgroundColor: "#F0ECE3"
  },
  input: {
    width: 280,
    height: 100,
    padding: 10,
    backgroundColor: "#FFF",
    borderColor: "#781C68",
    borderRadius: 0.5,
    borderWidth: 1
  },
  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  button: {

    width: '80%',
    paddingTop: 7,
    paddingBottom: 7,
    backgroundColor: '#00B8D4',
    borderRadius: 5,
    marginTop: 10
  },

  buttonRow:{
    flexDirection:"row"
},

});