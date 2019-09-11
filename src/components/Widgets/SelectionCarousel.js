import React, { Component } from 'react';
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

export default class SelectionCarousel extends Component {

    constructor(props) {
      super(props);
        this.state = ({
            data:this.props.data,
            selectedIndex:0,
            multiSelect:false
        });
    }

    cellSelected=(index)=>{
        this.setState({
            selectedIndex:index,
            data:this.props.data
        });
        console.log("selected cell" + index);
    }
    
    render() {
        return (
          <View style = {styles.container}>
            <Text style = {styles.title}>List selection prompt</Text>
            <View style = {globalStyles.spacer20}></View>
            <FlatList
                horizontal = {true}
                extraData={this.state.selectedIndex}
                showsHorizontalScrollIndicator={false}
                data={this.state.data}
                keyExtractor = {(item, index) => index.toString()}
                renderItem={({ item, index }) => 
                 <SelectionCarouselItem title={item} index={index} onSelection={this.cellSelected} selected={this.state.selectedIndex==index}/>
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

}

const styles = StyleSheet.create({

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
        marginLeft:40,
        fontFamily:"TTCommons-Bold",
        fontSize: 24,
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: "#000000"
    },
})
