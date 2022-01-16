import React, { Component } from 'react';
import { StyleSheet, Text, View, Linking, TouchableOpacity } from 'react-native';
import {SocialIcon} from 'react-native-elements';
class Footer extends Component{
	render (){
		return (
			<View>
				<TouchableOpacity onPress={()=>Linking.openURL('https://www.facebook.com/Ninja-In-PyJamas-102421947783975')}>
          			<Text style={{ fontSize:17,color:'#3E9CFF' }}>                   Find a Store </Text>
 				</TouchableOpacity>
              
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

export default Footer