import { StyleSheet,Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
const productWidth = (width - 50) / 2;
const ProductStyle = StyleSheet.create({
  productsItemContainer: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 215,
    width:productWidth,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 50,
  },
  productsPhoto: {
    width: '30%',
    height: 300,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 3
  },
  productsName: {
    flex: 1,
    fontSize: 30,
    fontWeight: 'normal',
    textAlign: 'center',
    color: '#333333',
    marginTop: 8
  },
  productsPrice: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
    marginTop: 8
  },
  productsInfo: {
    marginTop: 3,
    marginBottom: 5
  },
  
});
export default ProductStyle;
