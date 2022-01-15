import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  Linking,
  TouchableOpacity,
  Image
} from "react-native";
 
import Communications from "react-native-communications";
 
export default class chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bodayText: ""
    };
  }
  openEmail = () => {
    Communications.email(
      ["playeroneenter@gmail.com"],
      null,
      null,
      "Phản Hồi ",
      "Cảm ơn bạn đã phản hồi cho chúng tôi !!"
    );
  };
 
  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{ textAlign: "center", fontSize: 20, paddingVertical: 30, color:"#3E9CFF" }}
        >
          Hãy phản hồi cho chúng tôi.
        </Text>
        <TextInput
          value={this.state.bodayText}
          onChangeText={bodayText => this.setState({ bodayText })}
          placeholder={"Nội dung"}
          style={styles.input}
        />
        <View style={{ marginTop: 20 }}>
          <Button onPress={this.openEmail} title="Gửi" />
        </View>
        <TouchableOpacity onPress={()=>Linking.openURL('https://www.facebook.com/Ninja-In-PyJamas-102421947783975')}>
        <Text style={{color:"#3E9CFF"}}> Click vào đây để liên hệ trực tiếp tới chung tôi </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 25,
  },
  input: {
    width: 255,
    height: 44,
    padding: 10,
    margin: 10,
    backgroundColor: "#FFF",
    borderColor: "#000",
    borderRadius: 2,
    borderWidth: 2
  }
});