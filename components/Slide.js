//npm i react-native-image-slider-box
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SliderBox } from "react-native-image-slider-box";


export default class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        images: [
          "https://cdn.dribbble.com/users/1960903/screenshots/7229988/nike_banner.gif",
          "https://cdn.dribbble.com/users/1538430/screenshots/3921226/nike_run_v2.gif",
          "https://i.pinimg.com/originals/e7/cb/fd/e7cbfd64edbfa8e69f497f333461075b.gif",
          "https://i.pinimg.com/originals/46/a2/7a/46a27ae5934fc70638a5ae267fe0028b.gif",
        ]
      };
    }
    render() {
        return (
          <View style={styles.container}>
         <SliderBox
         
  images={this.state.images}
  sliderBoxHeight={180}
  onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
  dotColor="#FFCE45"
  inactiveDotColor="#90A4AE"
  dotStyle={{
    width: 10,
    height: 5,
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 0,
    margin: 0
  }}
/>
          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1, 
        alignItems: "center",
        justifyContent: 'center'
      }
    });
  