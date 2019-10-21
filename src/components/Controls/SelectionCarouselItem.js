import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import globalStyles from '../../assets/GlobalStyles';
import FitImage from 'react-native-fit-image';
import { SvgUri } from 'react-native-svg';

const SelectionCarouselItem = ({selected,icon,onSelection,index,title}) => {
	
    
	const toggleSelection=()=>{

        if (selected == false){
            onSelection(index);
        }

	}

    const displayIcon = () => {

        if (icon && icon.substr(icon.length-3) === 'svg'){
            return <SvgUri
                        width="40px"
                        height="40px"
                        uri={icon}
                    />
        }else{
            return  <FitImage
                        resizeMode="contain"
                        source={{ uri: icon}}
                        style={styles.fitImage}
                    />  
        }
    }
    
    return (
        <TouchableOpacity onPress={toggleSelection} activeOpacity={.7} >
            <View style = {styles.rootContainer}>
                <View style={[styles.containerUnselected, selected&&styles.containerSelected]}>
                        <View style={styles.container_text}>
                            <Text numberOfLines={2} style={[styles.item_title, selected&&styles.item_title_checked]}>
                                {title}
                            </Text>
                        </View>
                        <View style={styles.container_image}>
                            {displayIcon()}
                        </View>
                </View>
            </View>
        </TouchableOpacity>
    );
	
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
        paddingBottom:15
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
        fontSize: 20,
        letterSpacing: 0,
        color: "#4a4a4a",
    },
    container_text: {
        width:120,
        padding:15,
        paddingTop:20,
        paddingBottom:5,
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

export default SelectionCarouselItem;