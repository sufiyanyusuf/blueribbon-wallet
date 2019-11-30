import React, { Component,useState,useEffect } from 'react';
import { Text, View , Button, Alert} from 'react-native';
import Auth0 from 'react-native-auth0';
import SInfo from 'react-native-sensitive-info';
import RNRestart from "react-native-restart";

import * as api from './utils/Api'
import Actions from './redux/action';
import { StateContext, DispatchContext } from './redux/contexts';

var credentials = require('./auth0-credentials');
const auth0 = new Auth0(credentials);

const SettingsView = ({navigation}) => {

  const [accessToken,setAccessToken] = useState(null)
  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);
    
  useEffect (() => {

    const checkToken = async () => {

      SInfo.getItem("accessToken", {}).then(accessToken => {
        console.log('accesstoken ', accessToken)
        if (accessToken) {
          auth0.auth
            .userInfo({ token: accessToken })
            .then(data => {
              setAccessToken(true)
            })
            .catch(err => {
              console.log(err)
              // SInfo.getItem("refreshToken", {}).then(refreshToken => {
              //   auth0.auth
              //     .refreshToken({ refreshToken: refreshToken })
              //     .then(newAccessToken => {
              //       SInfo.setItem("accessToken", newAccessToken.accessToken, {});
              //       setAccessToken(true)

              //       // auth0.auth
              //       //   .userInfo({token: newAccessToken})
              //       //   .then(console.log)
              //       //   .catch(console.error);

              //       // RNRestart.Restart();
              //     })
              //     .catch(err2 => {
              //       console.log("err getting new access token");
              //       console.log(err2);
              //     });
              // });
            });
        } else {
          setAccessToken(false)
          console.log("no access token");
          navigation.navigate('Auth');
        }
      });
    }
    checkToken();
  },[]);

  _onLoginPress = () => {
      auth0.webAuth
          .authorize({
              scope: 'email profile token',
              audience: 'https://' + credentials.domain + '/userinfo'
          })
          .then(credentials => {
              SInfo.setItem("accessToken", credentials.accessToken, {});
              setAccessToken(true)
          })
          .catch(error => console.log(error));
  };

  _onLogoutPress = async() => {
      
    //remove notification token
    
    api.removeDeviceToken().then(res => {

      auth0.webAuth
      .clearSession()
        .then(async (success) => {
        
          SInfo.deleteItem("accessToken", {});
          SInfo.deleteItem("fcmToken", {});
          SInfo.deleteItem("deviceToken", {});
         
          setAccessToken(null)

        dispatch({ type: Actions.user.setListenForNotifications, listenForNotifications: false })
          
        navigation.navigate('Auth');

      })
      .catch(async (error) => {
        console.log("Log out cancelled",state.user.notificationToken);
        const deviceToken = await api.getDeviceToken()
        api.uploadDeviceToken(deviceToken)
          
      });
      
    }).catch(e => {

    })
  
  };

    

    let loggedIn = accessToken === null ? false : true;
    return ( 
    <View >
        <Text > Auth0Sample - Login </Text>    
        <Text>
            You are { loggedIn ? '' : 'not ' } logged in . </Text>    
            <Button onPress = { loggedIn ? _onLogoutPress : _onLoginPress }
            title = { loggedIn ? 'Log Out' : 'Log In' }/>   
    </View >
    );
    

}

export default SettingsView;