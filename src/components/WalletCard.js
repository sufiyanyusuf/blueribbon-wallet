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

export default class WalletCard extends Component {
    constructor(props) {
      super(props);
    }

    showOptions(){
        console.log("showoptions");
    }

    render() {
        return (
          <View style={styles.CardContainer}>
            <View style={styles.contentContainer}>
                <View style={styles.cardHeader}>
                    <View>
                        <Text style={styles.h3}>Brand Name</Text>
                        <Text style={styles.caption}>Product Name</Text>
                    </View>
                    <View>
                        <FitImage style={styles.graphic} resizeMode={'contain'} source={require('../assets/logo_sample.png')}/>
                    </View>
                </View>
              <Text style={styles.h1}>Remaining Value</Text>
            </View>
              <TouchableOpacity style={styles.cta} onPress={()=>this.showOptions()}>
               <Text style={styles.ctaText}> Manage Subscription </Text>
             </TouchableOpacity>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    CardContainer: {
      flex: 1,
      margin:20,
      backgroundColor: '#FFFFFF',
      shadowRadius: 8,
      shadowOpacity: 0.15,
      borderRadius: 20,
      shadowOffset: {
        width: 0,
        height: 3
      },
      elevation: 5,

    },
    contentContainer:{
      backgroundColor: '#FFFFFF',
      justifyContent:'space-around',
      marginTop:30,
      marginLeft:30,
      marginRight:30,
      marginBottom:25
    },
    graphic: {
      marginTop:10,
      flexGrow:0.5,
    },
    h1:{
      fontFamily:"TTCommons-Bold",
      fontSize: 36,
      fontStyle: "normal",
      letterSpacing: 0,
      color: "#4a4a4a"
    },
    h3:{
        fontFamily:"TTCommons-Bold",
        fontSize: 24,
        color: "#888888"
    },
    cardHeader:{
        flexDirection:"row",
        marginBottom:40
    },
    caption:{
        fontFamily:"TTCommons-Regular",
        fontSize: 18,
        color: "#888888"
    },
    bodyText:{
      fontFamily: "TTCommons-Regular",
      fontSize: 20,
      fontStyle: "normal",
      letterSpacing: 0,
      color: "#4a4a4a",
      color: "#4a4a4a",
      marginBottom:40
    },
    cta:{
      height: 60,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      backgroundColor: "#0A71F2",
      color: "#4a4a4a",
      flexDirection:'row',
      alignItems:'center',
      justifyContent:"flex-start"
    },
    ctaText:{
      fontFamily:"TTCommons-Bold",
      fontSize: 20,
      fontStyle: "normal",
      letterSpacing: 0,
      textAlign: "justify",
      color: "#ffffff",
      marginLeft: 30
    }
  });