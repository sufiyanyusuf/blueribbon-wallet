import React, { Component } from 'react';
import {
    Alert,
    AppRegistry,
    Button,
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
  } from 'react-native';
import FitImage from 'react-native-fit-image';

export default class AddressChecker extends Component {

    constructor(props) {
      super(props);
    }

    render() {
        return (
          <View style = {styles.container}>
            <Text numberOfLines={2} style = {styles.textContainer}>We deliver to 531, Prescott St, Pasadena, CA 91104</Text>
            <TouchableOpacity style={styles.cta} >
                <Text style={styles.ctaText}> Change </Text>
            </TouchableOpacity>
          </View>
        );
    }

}

const styles = StyleSheet.create({

  container:{
    backgroundColor:"#CAFF00",
    color:"#000000",
    paddingLeft:20,
    paddingRight:20,
    paddingTop:20,
    paddingBottom:15,
    flex:3,
    flexDirection:"row",
    justifyContent:"space-between",
    borderRadius:40
  },
  cta:{
    paddingTop:5,
    paddingLeft:10,
    paddingRight:12,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#000000",
    flexDirection:'row',
    alignItems:'center',
    justifyContent:"center",
    backgroundColor: "rgba(0,0,0,0.1)",
    marginLeft:25,
    flex:1
  },
  ctaText:{
      fontFamily:"TTCommons-Bold",
      fontSize: 14,
      textAlign: "center",
      color: "#000000",
  },
  textContainer:{
    fontFamily:"TTCommons-Regular",
    fontSize: 16,
    flex:4
  }
});