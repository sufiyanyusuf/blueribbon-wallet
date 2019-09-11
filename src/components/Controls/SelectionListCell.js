import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export default class SelectionListItem extends Component {
	constructor(props){
		super(props);
		this.state =  ({
            checked:this.props.selected,
        });
    }
    
	toggleCheckbox=()=>{
		if (this.props.selected == false){
            this.props.onSelection(this.props.index);
        }
    }

	render() {
        console.log("index:",this.props.index,this.props.selected);
		return (
            <View style={styles.container}>
                <View style={styles.container_checkBox}>
                    <TouchableOpacity onPress={this.toggleCheckbox}>
                        <View style={[styles.checkbox,this.props.selected&&styles.checkbox_checked]}>
                            <Icon name="md-checkmark" size={25} color="#ffffff"/>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.container_text}>
                    <TouchableOpacity onPress={this.toggleCheckbox}>
                        <Text style={[styles.item_title, this.props.selected&&styles.item_title_checked]}>
                                {this.props.title}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
		);
	}

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginRight:10,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 5,
        elevation: 2,
    },
    item_title: {
        fontFamily: "TTCommons-Regular",
        fontSize: 24,
        letterSpacing: 0,
        color: "#4a4a4a",
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 4,
        justifyContent: 'center',
    },
    container_checkBox: {
        flex: 0.15,
        justifyContent: 'flex-start',
    },
    checkbox: {
        flexDirection: 'column',
        alignItems:"center",
        width: 30,
        height: 30,
        borderRadius: 10,
        borderStyle: "solid",
        borderWidth: 3,
        borderColor: "#0A71F2",
        backgroundColor: "#ffffff",
    },
    checkbox_checked:{
        backgroundColor: "#0A71F2",
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
});