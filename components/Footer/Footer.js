import React from "react";
import {View, Text, Linking} from "react-native";
import style from './style';
import {SocialIcon} from 'react-native-elements';
const Footer = () => {
return (
	<View style={style.footer}>
	<View style={style.footerContext}>
		<aboutlist/> 

		<Text style={style.text}>
			Find a store 
		</Text>
		<Text style={style.text}>
			Become a member  
		</Text>
		<Text style={style.text}>
			Sign Up for Email 
		</Text>
		<Text style={style.text}>
			Send us feedback 
		</Text>
		<View
              style={{
                borderBottomColor: "white",
                borderBottomWidth: "1px",
                alignSelf: 'stretch'
              }}
            />
			<View style={{flexDirection: 'row'}}>
                <SocialIcon
                  type="facebook"
                  onPress={() => Linking.openURL('https://www.facebook.com/Ninja-In-PyJamas-102421947783975')}></SocialIcon>
                     <Text style={{textAlign: 'center'}}>facebook</Text>	 
                <SocialIcon
                  type="instagram"
                  onPress={() => Linking.openURL('https://www.instagram.com/nike/')}></SocialIcon>
                <Text style={{textAlign: 'center'}}>
                  instagram
                </Text>
				<SocialIcon
                  type="youtube"
                  onPress={() => Linking.openURL('https://www.youtube.com/user/nike')}></SocialIcon>
                <Text style={{textAlign: 'center'}}>
                  youtube
                </Text>
              </View>
			  <Text style={style.text}>
			@2021 Nike,Inc. All Right Reserved.
		</Text>
			  
              </View>
		</View>

	
);
};
export default Footer;
