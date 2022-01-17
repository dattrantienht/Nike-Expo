import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList,  TextInput, Modal, TouchableHighlight  } from 'react-native';
const Data = [
  {id: 1, text: 'Trần Tiến Đạt', color: '#E0C097'},
  {id: 2, text: 'Trương Mỹ Phương', color: '#E0C097'},
  {id: 3, text: 'Nguyễn Văn Dương', color: '#E0C097'},
  {id: 4, text: 'Ngô Nguyễn Bảo Lâm', color: '#E0C097'},
  {id: 5, text: 'Phạm Kiên Định', color: '#E0C097'},
  {id: 6, text: 'Nhon Nhon', color: '#E0C097'}
] 

export default class List extends Component {
    constructor(props) {
        super(props);
        this.initData = Data
        this.state = {
            data: this.initData,
      isModalVisible: false,
            inputText: '',
            editedItem: 0, 
        };
    }

    setModalVisible = (bool) => {
        this.setState({ isModalVisible: bool })
    }

    setInputText = (text) => {
        this.setState({ inputText: text })
    }

    setEditedItem = (id) => {
        this.setState({ editedItem: id })
    }

    handleEditItem = (editedItem) => {
        const newData = this.state.data.map( item => {
            if (item.id === editedItem ) {
                item.text = this.state.inputText
                return item
            }
            return item
        })
        this.setState({ data: newData })
    }

    renderItem = ({item}) => (
        <TouchableHighlight onPress={() => {this.setModalVisible(true); this.setInputText(item.text), this.setEditedItem(item.id)}}
            underlayColor={'#FFEBC9'}> 
            <View style={styles.item} >
                <View style={styles.marginLeft}>
                    <View style={[styles.menu, { backgroundColor: item.color }]}></View>
                    <View style={[styles.menu, { backgroundColor: item.color }]}></View>
                    <View style={[styles.menu, { backgroundColor: item.color }]}></View>
                </View>
                <Text style={styles.text}> {item.text} </Text>
            </View>
        </TouchableHighlight>
    )
    
    render() {
        return (
            <View style={styles.contentContainer}>
                <View style={styles.header}>
                    <Text style={styles.headerText}> THÀNH VIÊN </Text>
                </View>
                <FlatList 
                    data={this.state.data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={this.renderItem}
                />
                <Modal animationType="fade" visible={this.state.isModalVisible} 
                    onRequestClose={() => this.setModalVisible(false)}>
                    <View style={styles.modalView}>
                        <Text style={styles.text}>TÊN</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(text) => {this.setState({inputText: text}); console.log('state ', this.state.inputText)}}
                            defaultValue={this.state.inputText}
                            editable = {true}
                            multiline = {false}
                            maxLength = {200}
                        /> 
                        <TouchableHighlight onPress={() => {this.handleEditItem(this.state.editedItem); this.setModalVisible(false)}} 
                            style={[styles.touchableHighlight, {backgroundColor: '#5C3D2E'}]}  underlayColor={'#FFEBC9'}>
                            <Text style={styles.text}>Lưu thay đổi</Text>
                        </TouchableHighlight>  
                    </View>           
                </Modal> 
            </View>
        )
    }
};

const styles = StyleSheet.create({
    header: {
        height: 70,
        backgroundColor: "#5C3D2E",
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#E0C097',
    },
    contentContainer: {
        backgroundColor: '#2D2424',
    },
    item: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        alignItems: 'center',
    },
    marginLeft: {
        marginLeft: 20,
    },
    menu: {
        width: 20,
        height: 2,
        backgroundColor: '#111',
        margin: 2,
        borderRadius: 3,
    },
    text: {
        marginVertical: 30,
        fontSize: 17,
        fontWeight: 'bold',
        marginLeft: 10,
        color: 'white',
        
    },

    textInput: {
        width: '90%',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 30,
        borderColor: 'gray', 
        borderBottomWidth: 2,
        fontSize: 20,
        color:"white"
    },
    modalView: {
        flex: 1, 
        backgroundColor: "#2D2424",
        alignItems: 'center',
        justifyContent: 'center',
    },
    touchableHighlight: {
        backgroundColor: 'white', 
        marginVertical: 50,
        width: 200,
        alignItems: 'center',
    } 
})
