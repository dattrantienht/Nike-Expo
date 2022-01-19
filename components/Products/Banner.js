import React from "react";
import { View, Image, Text, Dimensions, Animated } from "react-native";
import Carousel from 'react-native-banner-carousel';
const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 200;
const images = [
    "https://f10.photo.talk.zdn.vn/8609086829680158919/77fd5cfc83cb4e9517da.jpg",
    "https://f23-zpc.zdn.vn/264293571274024237/05c79fc346f48baad2e5.jpg",
    "https://f12.photo.talk.zdn.vn/8152262603383149629/1f24742cad1b6045390a.jpg"
];

export default function Banner() {
    return (
        <View >
            <Carousel
                autoplay
                autoplayTimeout={1500}
                loop
                index={0}
                pageSize={BannerWidth}

                animation={(animate, toValue) => {
                    return Animated.timing(animate, {
                        toValue: toValue,
                        friction: 10,
                        tension: 50,
                        useNativeDriver: false
                    })
                }
                }
            >
                {images.map((image, index) => (
                    <Image key={index} style={{ height: BannerHeight, alignItems: "center" }}
                        source={
                            { uri: image }

                        } />
                ))}
            </Carousel>
        </View>
    );

}