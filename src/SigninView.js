import React, {useState,useEffect} from 'react';
import {
    View,
    Button,
    Text,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator
  } from 'react-native';

import Auth0 from 'react-native-auth0';
var credentials = require('./auth0-credentials');
import SInfo from 'react-native-sensitive-info';
import SafeAreaView from 'react-native-safe-area-view';
import globalStyles from './assets/GlobalStyles';
import axios from 'axios';
import Actions from './redux/action';
import {StateContext,DispatchContext} from './redux/contexts';
import * as api from './utils/Api'

const auth0 = new Auth0(credentials);


const SignInView = ({ navigation }) => {
  
  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);
  

  const [accessToken, setAccessToken] = useState(null);

  useEffect (()=>{

    const checkToken = async() => {

      SInfo.getItem("accessToken", {}).then(accessToken => {

        if (accessToken) {
          //change this shitty stuff later on
          auth0.auth
            .userInfo({ token: accessToken })
            .then(data => {
              
              dispatch({ type: Actions.user.setListenForNotifications, listenForNotifications: true })
              setAccessToken(true)
              navigation.navigate('App');

            })
            .catch(err => {
              console.log(err)
              setAccessToken(false)
            });
        } else {
          setAccessToken(false)
          console.log("no access token");
        }
      });
    }

    checkToken();
    
  },[])


  const _onLogin = async () => {

    auth0.webAuth
      .authorize({
          scope: 'email openid profile token',
          audience: 'https://' + credentials.domain + '/userinfo',
          audience: 'https://blueribbon.io/api/user'
      })
      .then(async(credentials) => {

        SInfo.setItem("accessToken", credentials.accessToken, {});
        setAccessToken(true)
        navigation.navigate('App')
        dispatch({ type: Actions.user.setListenForNotifications, listenForNotifications: true })
        
        const deviceToken = await api.getDeviceToken()
        if (deviceToken) {
          await api.uploadDeviceToken()  
        }

      })
      .catch(error => console.log(error));
    
  };

  return ( 
    <SafeAreaView style = {styles.RootContainer}>

      {(accessToken==null) && <ActivityIndicator size="large" color="#000000" style = {styles.loader}/>}

      {(accessToken != null) && 
        <View style = {styles.Container}>

          <View style = {globalStyles.spacer60}></View>
          <Text style = {styles.title}>Login To Blueribbon </Text>    
          <View style = {globalStyles.spacer20}></View>
          <Text> You are { accessToken ? '' : 'not' } logged in . </Text>   
          <View style = {globalStyles.spacer20}></View>

          <View>
            <TouchableOpacity style={styles.cta} onPress={_onLogin}>
                <Text style={styles.ctaText}> Log In</Text>
            </TouchableOpacity>
          </View>

          <View style = {globalStyles.spacer40}></View>
        </View>
      }
   
    </SafeAreaView>
  );


}


export default SignInView;


const styles = StyleSheet.create({
  loader:{
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  RootContainer:{
    flex:1
  },
  Container:{
    marginLeft:40,
    marginRight:40,
  },
  title:{
    fontFamily: "TTCommons-Bold",
    fontSize: 36,
    color: "#000000"
  },
  subTitle:{
      fontFamily: "TTCommons-Regular",
      fontSize: 24,
      color: "#000000"
  },
  cta:{
    marginTop:40,
    paddingTop:5,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#2C43A3",
    color: "#4a4a4a",
    flexDirection:'row',
    alignItems:'center',
    justifyContent:"center"
  },
  ctaText:{
      fontFamily:"TTCommons-Bold",
      fontSize: 20,
      textAlign: "center",
      color: "#ffffff",
  }

})