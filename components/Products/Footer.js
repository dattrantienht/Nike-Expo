import React from "react";
import { View, Text, Linking } from "react-native";
import style from './styles';
import { SocialIcon } from 'react-native-elements';
export default function Footer() {
    return (
        <>
            <View style={style.footer}>
                <View style={style.footerContext}>


                    <Text style={style.footertext}>
                        Find a store
                    </Text>
                    <Text style={style.footertext}>
                        Become a member
                    </Text>
                    <Text style={style.footertext}>
                        Sign Up for Email
                    </Text>
                    <Text style={style.footertext}>
                        Send us feedback
                    </Text>
                    <View
                        style={style.hr}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <SocialIcon
                            type="facebook"
                            onPress={() => Linking.openURL('https://www.facebook.com/Ninja-In-PyJamas-102421947783975')}></SocialIcon>
                        <Text style={{ textAlign: 'center' }}>facebook</Text>
                        <SocialIcon
                            type="instagram"
                            onPress={() => Linking.openURL('https://www.instagram.com/nike/')}></SocialIcon>
                        <Text style={{ textAlign: 'center' }}>
                            instagram
                        </Text>
                        <SocialIcon
                            type="youtube"
                            onPress={() => Linking.openURL('https://www.youtube.com/user/nike')}></SocialIcon>
                        <Text style={{ textAlign: 'center' }}>
                            youtube
                        </Text>
                    </View>
                    <Text style={style.footertext}>
                        @2021 Nike,Inc. All Right Reserved.
                    </Text>
                </View>


            </View>

        </>


    );
};
