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
    ScrollView
  } from 'react-native';

  import globalStyles from './assets/GlobalStyles';
  import FitImage from 'react-native-fit-image';


export default class PaymentConfirmation extends Component {

  render() {


    return (

      <View style = {styles.rootView}>

        <ScrollView>
          <View style={styles.container}>
            <Button
              title = "back"
              onPress={() => this.props.navigation.goBack()}
            />
            <View style={globalStyles.spacer60}></View>
            <FitImage
              resizeMode="contain"
              source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
              style={styles.avatar}
            />
            <View style={globalStyles.spacer20}></View>
            <View style={globalStyles.spacer20}></View>
            <Text style = {styles.subtitle}>Payment Successful</Text>
            <View style={globalStyles.spacer20}></View>

            <Text style = {styles.groupBody}>Thanks for your order, we look forward to serving you. A copy of your receipt is saved in your wallet. </Text>

            <View style={globalStyles.spacer40}></View>

            <View style={globalStyles.spacer40}></View>
          </View>
        </ScrollView>

        <View style = {styles.ctaContainer}>
          <View style = {styles.row}>
            <TouchableOpacity 
              style={styles.cta} 
              onPress={() => this.props.navigation.popToTop()}
            >
              <Text style={styles.ctaText}>Close</Text>
            </TouchableOpacity>
          </View>

          <View style={globalStyles.spacer60}></View>
        </View>

      </View>

    )
  }
}

styles = StyleSheet.create({
  rootView:{
    flex:1,
  },
  ctaContainer:{
    margin:40
  },
  cta:{
    paddingTop:5,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#0A71F2",
    flexDirection:'row',
    alignItems:'center',
    justifyContent:"center",
    flex:1,
  },
  ctaText:{
      fontFamily:"TTCommons-Bold",
      fontSize: 20,
      textAlign: "center",
      color: "#ffffff",
  },
  container: {
    flex:1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    margin:40,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  switch: {
    marginBottom: 10,
  },
  hintContainer: {
    marginTop: 10,
  },
  hint: {
    fontSize: 12,
    textAlign: 'center',
  },
  statusContainer: {
    margin: 20,
    alignSelf: 'stretch',
  },
  status: {
    fontWeight: '300',
    color: 'gray',
  },
  title:{
    fontFamily: "TTCommons-Bold",
    fontSize: 36,
    color: "#0A71F2"
  },
  subtitle:{
    fontFamily: "TTCommons-Bold",
    fontSize: 24,
    color: "#000000"
  },
  row:{
    flexDirection:"row",
    flex:1
  },
  groupTitle:{
    fontFamily: "TTCommons-Bold",
    fontSize: 18,
    color: "#888888"
  },
  groupBody:{

    fontFamily: "TTCommons-Regular",
    fontSize: 24,
    color: "#000000"
  },
  avatar:{
      width:50,
      height:50,
      borderRadius: 25,
      overflow: 'hidden',
  },
});