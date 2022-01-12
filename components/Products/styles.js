import { StyleSheet, Dimensions, ImageBackground } from 'react-native';


const { width } = Dimensions.get('window');
const productWidth = (width - 50) / 2;

const styles = StyleSheet.create({
  productsItemContainer: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 215,
    width: productWidth,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 20,

  },
  productsPhoto: {
    width: '90%',
    height: 155,
    borderRadius: 20,
    // borderBottomLeftRadius: 0,
    // borderBottomRightRadius: 0,
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
    fontSize: 20,
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
  productCategory: {

  },
  headerCategory: {
    alignItems:'center',
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    fontSize: 20,
    flexDirection: "row",
    textAlign: 'center',
    alignContent:"stretch"
  },
  filterButton: {
    marginLeft:"100px",
    elevation: 8,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    alignItems:'center',
    
    paddingVertical: 2,
    paddingHorizontal: 3,
    fontSize: 15,
    color: "#000000",
    fontWeight: "normal",
   
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 20,
   
  },
  banner: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 20,
  },
//modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 2,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#205AA7",
  },
  buttonClose: {
    backgroundColor: "#000000",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  headerModal:{
    fontWeight: "bold",
    fontSize:20,
    marginBottom:"20px"
  },
  bodyModal:{
    marginTop:"20px"
  }
});

export default styles;
