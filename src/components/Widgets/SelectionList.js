import React, { Component,useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
  } from 'react-native';
import SelectionListItem from '../Controls/SelectionListCell';
import globalStyles from '../../assets/GlobalStyles';

const SelectionList = ({id,title,data,pricing}) => {

    const [selectedIndex,setSelectedIndex] = useState(0)
    const [price,setPrice] = useState(pricing[0]);

    const cellSelected=(index)=>{
        setSelectedIndex(index)
        setPrice(pricing[index])
        console.log(pricing[index])
    }
    
    return (
        <View style = {styles.container}>
        <View style = {styles.subContainer}>
            <View style = {globalStyles.spacer20}></View>
            <Text style = {styles.title}>{title ?? "Title"}</Text>
            <View style = {globalStyles.spacer20}></View>
            <FlatList
                data={data}
                extraData={selectedIndex}
                keyExtractor = {(item, index) => index.toString()}
                renderItem={({ item, index }) => 
                <SelectionListItem title={item} index={index} onSelection={cellSelected} selected={selectedIndex==index}/>
                }
            />
            <View style = {globalStyles.spacer40}></View>
        </View>
        <View style = {globalStyles.divider}></View>
        <View style = {globalStyles.spacer40}></View>
        </View>
    );
    

}

const styles = StyleSheet.create({
    subContainer:{
        marginLeft:40,
        marginRight:40,
    },
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

export default SelectionList;