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
    ActivityIndicator,
  } from 'react-native';

constAddressChecker = ({showLocations,address,eligibility,loading}) => {

  var message = 'We deliver to ' + address.base_address
  if (eligibility == false){
    message = 'Delivery unavailable for ' + address.base_address
  }
  if (loading == true){
    message = 'Hold on, checking if we deliver to your address'
  }

  return (
    <View style = {[styles.container, 
      (!eligibility && styles.containerInEligible),
      ((loading==true) && styles.containerLoading),
    ]}>
      <Text numberOfLines={3} style = {styles.textContainer}>{message}</Text>
        {!loading && 
          <TouchableOpacity style={styles.cta} onPress = {showLocations}>
            <Text style={styles.ctaText}> Change </Text>
          </TouchableOpacity>
        }
        {loading && <ActivityIndicator size="large" color="#000000" style = {styles.loader}/>}
    </View>
  );

}

const styles = StyleSheet.create({
  loader:{
    marginRight:20
  },
  container:{
    backgroundColor:"#CAFF00",
    color:"#000000",
    flex:3,
    flexDirection:"row",
    justifyContent:"space-between",
    borderRadius:30,
    paddingLeft:10,
  },
  containerInEligible:{
    backgroundColor:"#FF6774",
  },
  containerLoading:{
    backgroundColor:"#B4B4B4",
  },
  cta:{
    paddingTop:5,
    paddingLeft:10,
    paddingRight:15,
    borderBottomLeftRadius:0,
    borderTopLeftRadius:0,
    borderRadius: 30,
    backgroundColor: "#000000",
    flexDirection:'row',
    alignItems:'center',
    justifyContent:"center",
    backgroundColor: "rgba(0,0,0,0.1)",
    flex:1.2
  },
  ctaText:{
      fontFamily:"TTCommons-Bold",
      fontSize: 14,
      textAlign: "center",
      color: "#000000",
  },
  textContainer:{ paddingRight:20,
    paddingTop:20,
    paddingBottom:15,
    paddingLeft:10,
    fontFamily:"TTCommons-Regular",
    fontSize: 14,
    flex:4
  }
});

export default constAddressChecker;