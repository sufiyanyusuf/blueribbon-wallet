import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import globalStyles from '../../assets/GlobalStyles';
import FitImage from 'react-native-fit-image';

export default class SelectionCarouselItem extends Component {
	constructor(props){
		super(props);
        this.state =  ({
            checked:this.props.selected,
        });
    }
    
	toggleSelection=()=>{
        if (this.props.selected == false){
            this.props.onSelection(this.props.index);
        }
	}

	render() {
		return (
            <TouchableOpacity onPress={this.toggleSelection} activeOpacity={.7} >
                <View style = {styles.rootContainer}>
                    <View style={[styles.containerUnselected, this.props.selected&&styles.containerSelected]}>
                            <View style={styles.container_text}>
                                <Text numberOfLines={2} style={[styles.item_title, this.props.selected&&styles.item_title_checked]}>
                                    {this.props.title}
                                </Text>
                            </View>
                            <View style={styles.container_image}>
                                <FitImage
                                    resizeMode="contain"
                                    source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
                                    style={styles.fitImage}
                                />
                            </View>
                    </View>
                </View>
            </TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
    rootContainer:{
        flex:1,
        paddingTop:20,
        paddingRight:20,
        paddingBottom:10,
    },
    container_image:{
        flex:1,
        paddingRight:40,
        paddingLeft:20,
        paddingBottom:20
    },
    containerUnselected: {
        flex: 1,
        borderWidth:3,
        borderRadius: 25,
        backgroundColor:"#ffffff",
        borderColor:"#ffffff",
        elevation: 0,
        shadowRadius: 6,
        shadowOpacity: 0.10,
    },
    containerSelected:{
        flex: 1,
        borderWidth:3,
        borderRadius: 25,
        borderColor:"#0A71F2",
        shadowRadius: 6,
        shadowOpacity: 0.20,
        shadowOffset: {
          width: 0,
          height: 2
        },
        elevation: 4,
    },
    item_title: {
        fontFamily: "TTCommons-Bold",
        fontSize: 16,
        letterSpacing: 0,
        color: "#4a4a4a",
    },
    container_text: {
        width:120,
        padding:15,
        paddingBottom:25,
        flex: 1,
        flexDirection: 'column',
        marginLeft: 4,
        alignContent:'flex-start'
    },
    item_title_checked:{
        fontFamily: "TTCommons-Bold",
        color: "#0A71F2",
    },
    title:{
        fontFamily:"TTCommons-Bold",
        fontSize: 24,
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: "#000000"
    },
    fitImage: {
        width:40,
        height:40
    },
});