// npm install react-native-elements --save
import React, { Component } from 'react';
import { StyleSheet,Text, Image, View, Linking, TouchableOpacity } from 'react-native';
import {SocialIcon} from 'react-native-elements';
class shop extends Component{
	render (){
		return (
			<View style={StyleSheet.footer}>
				<TouchableOpacity onPress={()=>Linking.openURL('https://www.facebook.com/Ninja-In-PyJamas-102421947783975')}>
          <Text style={{ fontSize:17 }}>                   Find a Store </Text>
 </TouchableOpacity>
              <Text style={{ fontSize:17 }}>             Become a Member </Text>
			  <View style={{flexDirection: 'row'}}>
                <SocialIcon
                  type="facebook"
                  onPress={() => Linking.openURL('https://www.facebook.com/Ninja-In-PyJamas-102421947783975')}>
				  </SocialIcon>
				  <SocialIcon
                  type="instagram"
                  onPress={() => Linking.openURL('https://www.instagram.com/nike/')}></SocialIcon>
				  <SocialIcon
                  type="youtube"
                  onPress={() => Linking.openURL('https://www.youtube.com/user/nike')}></SocialIcon>
				  <SocialIcon
                  type="twitter"
                  onPress={() => Linking.openURL('https://twitter.com/Nike')}></SocialIcon>
					 </View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	
	footer:{
		backgroundColor:'white',
		justifyContent:'center',
		alignItems:'center',
		height:30,

	}
})
export default shop