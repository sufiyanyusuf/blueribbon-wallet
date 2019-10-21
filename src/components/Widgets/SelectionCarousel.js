import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
  } from 'react-native';
import SelectionListItem from '../Controls/SelectionListCell';
import SelectionCarouselItem from '../Controls/SelectionCarouselItem';
import globalStyles from '../../assets/GlobalStyles';

const SelectionCarousel = ({icons,data,title,pricing}) => {

    const [selectedIndex,setIndex] = useState(0);
    const [price,setPrice] = useState(pricing[0]);

    cellSelected=(index)=>{
        setIndex(index)
        setPrice(pricing[index])
        console.log(pricing[index])
    }
    
 
    return (
        <View style = {styles.container}>

        <View style = {styles.subContainer}>
            <View style = {globalStyles.spacer20}></View>
            <Text style = {styles.title}>{title ?? 'List selection prompt'}</Text>
            <View style = {globalStyles.spacer20}></View>
            
        </View>
        <FlatList
                horizontal = {true}
                extraData={selectedIndex}
                showsHorizontalScrollIndicator={false}
                data={data}
                keyExtractor = {(item, index) => index.toString()}
                renderItem={({ item, index }) => 
                    <SelectionCarouselItem title={item} index={index} icon={icons[index]} onSelection={cellSelected} selected={selectedIndex==index}/>
                }
                ListFooterComponent={<View style={{width:35}}></View>}
                ListHeaderComponent={<View style={{width:35}}></View>}
            />
        <View style = {globalStyles.spacer40}></View>
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
        flex: 1,
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

export default SelectionCarousel;