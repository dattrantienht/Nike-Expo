//npm install react-native-table-component
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
 
export default class ExampleOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['ID', 'TÊN', 'VAI TRÒ'],
      tableData: [
        ['1', 'Trần Tiến Đạt', 'Software Engineer'],
        ['2', 'Nguyễn Văn Dương', 'Technical Architect'],
        ['3', 'Trương Mỹ Phương', 'Frontend Developer'],
        ['4', 'Ngô Nguyễn Bảo Lâm', 'UI/UX Designer'],
        ['5', 'Phạm Kiên Định', 'Cybersecurity specialists']
      ]
    }
  }
 
  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
          <Text style={[styles.title]}>THÀNH VIÊN{'\n'}</Text>
        <Table borderStyle={{borderWidth: 2, borderColor: '#F5E8C7' }}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={state.tableData} style={styles.data} textStyle={styles.text}/>
        </Table>
      </View>
    )
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    paddingTop: 50,
    backgroundColor: '#1F1D36'
  },
  head: {
    height: 40 ,
    backgroundColor: '#876445'
  },
  text: { margin: 6, color:"#ffff"},

  title:{
   textAlign:'center',
    color:'#ffff',
    fontSize: 20
  },

data:{
  height:70,
}
})