
//npm install react-native-communications --save


import React, { Component } from "react";
import {View, StyleSheet, Text, TextInput, Button, Image,ScrollView,SafeAreaView} from "react-native";

import Communications from "react-native-communications";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

 
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
      '0855910311',
      ''
    );

  }

 
  render() {
    return (
    <ScrollView >
    <SafeAreaView style={styles.container}>
    <Image source={{uri: 'https://essenceofemail.com/wp-content/uploads/GIFs-in-email.gif'}} style={{width: 280, height: 110}} />

      <Text
        style={styles.TextStyle}>
        {"\n"}Chúng tôi luôn tiếp nhận mọi phản hồi từ bạn.{"\n"}
      </Text>

      <TextInput
        style={styles.input}
        value={this.state.bodyText}
        onChangeText={bodyText => this.setState({ bodyText })}
        placeholder={"Nhập nội dung"}
        multiline
      />
        
      <View style={{ marginTop: 20 }}>
        <Button
              onPress={this.openEmail}
              title="Send Email"
              color="#F0A500" />   
      </View>
      
      <Text>{"\n"}</Text>

      <Text style={styles.TextStyle}>
        Hoặc liên hệ với chúng tôi qua số điện thoại{"\n\n"}
      </Text>
      <View style={styles.buttonRow}>
      <MaterialCommunityIcons name="phone-in-talk" size={35} color="black"  onPress={this.dialCall} />
      <Text>                  </Text>
      <MaterialCommunityIcons name="message-draw" size={35} color="black"  onPress={this.sendSMS} />

      <Text>{"\n\n\n\n\n"}</Text>
      </View>
    </SafeAreaView>
    </ScrollView>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 15,
    backgroundColor: "#E6DDC4"
  },
  input: {
    width: 280,
    height: 100,
    padding: 10,
    backgroundColor: "#FFFDDE",
    borderColor: "#FC9918",
    borderRadius: 0.5,
    borderWidth: 1,
  },
  TextStyle: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: 15
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
    flexDirection:"row",

},

});