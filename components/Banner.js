import React from 'react';
import Carousel from 'react-native-banner-carousel';
import { StyleSheet, Image, View, Dimensions } from 'react-native';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 260;

const images = [
    "https://cdn.elly.vn/uplhttps://i.pinimg.com/originals/fa/45/96/fa4596ad9a9d39901eeb455ed4f74e44.jpgoads/2021/04/16154143/tong-quan-thuong-hieu-giay-nike.2.jpg",
    "http://xxx.com/https://nikechinhhang.net/wp-content/uploads/2021/02/giay-nike-chay-bo-tot-nhat.jpg2.png",
    "http://xxx.com/3.pnghttps://i.ytimg.com/vi/KjqrPEtyDUQ/maxresdefault.jpg"
];

export default class Banner extends React.Component {
    renderPage(image, index) {
        return (
            <View key={index}>
                <Image style={{ width: BannerWidth, height: BannerHeight }} source={{ uri: image }} />
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Carousel
                    autoplay
                    autoplayTimeout={5000}
                    loop
                    index={0}
                    pageSize={BannerWidth}
                >
                    {images.map((image, index) => this.renderPage(image, index))}
                </Carousel>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
});