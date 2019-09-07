import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
  } from 'react-native';
import SelectionListItem from '../Controls/SelectionListCell';
import globalStyles from '../../assets/GlobalStyles';

export default class SelectionList extends Component {

    constructor(props) {
      super(props);
        this.state = ({
            data:this.props.data,
            multiSelect:false
        });
    }

    cellSelected=(index)=>{
        console.log("selected cell" + index);
    }
    
    render() {
        return (
          <View style = {styles.container}>
            <View style = {globalStyles.spacer40}></View>
            <Text style = {styles.title}>List selection prompt</Text>
            <View style = {globalStyles.spacer20}></View>
            <FlatList
                data={this.state.data}
                keyExtractor = {(item, index) => index.toString()}
                renderItem={({ item, index }) => 
                 <SelectionListItem title={item} index={index} onSelection={this.cellSelected}/>
                }
            />
            <View style = {globalStyles.spacer40}></View>
            <View style = {globalStyles.divider}></View>
            <View style = {globalStyles.spacer40}></View>
          </View>
        );
    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1
    },
    item: {
        fontSize: 18,
    },
    cta:{
        height: 60,
        borderRadius: 12,
        backgroundColor: "#ff4141",
        color: "#4a4a4a",
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginBottom:35,
        marginLeft:30,
        marginRight:30,
        marginTop:20,
    },
    ctaText:{
        fontFamily: "AvenirNext-Bold",
        fontSize: 20,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "justify",
        color: "#000000"
    },
    title:{
        fontFamily:"TTCommons-Bold",
        fontSize: 24,
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: "#000000"
    },
})
