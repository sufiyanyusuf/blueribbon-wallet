import React, { Component,useState,useEffect } from 'react';
import { Text, View , Button, Alert} from 'react-native';
import Auth0 from 'react-native-auth0';
import SInfo from 'react-native-sensitive-info';
import RNRestart from "react-native-restart";

var credentials = require('./auth0-credentials');
const auth0 = new Auth0(credentials);

const SettingsView = ({navigation}) => {

  const [accessToken,setAccessToken] = useState(null)


    useEffect (() => {
      const checkToken = async () => {
        SInfo.getItem("accessToken", {}).then(accessToken => {
          if (accessToken) {
            auth0.auth
              .userInfo({ token: accessToken })
              .then(data => {
                setAccessToken(true)
              })
              .catch(err => {
                
                SInfo.getItem("refreshToken", {}).then(refreshToken => {
                  auth0.auth
                    .refreshToken({ refreshToken: refreshToken })
                    .then(newAccessToken => {
                      SInfo.setItem("accessToken", JSON.stringify(newAccessToken), {});
                      setAccessToken(true)
                      // RNRestart.Restart();
                    })
                    .catch(err2 => {
                      console.log("err getting new access token");
                      console.log(err2);
                    });
                });
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
                scope: 'offline_access profile token',
                audience: 'https://' + credentials.domain + '/userinfo'
            })
            .then(credentials => {
                SInfo.setItem("accessToken", credentials.accessToken, {});
                SInfo.setItem("refreshToken", credentials.refreshToken, {});
                setAccessToken(true)
            })
            .catch(error => console.log(error));
    };

    _onLogoutPress = () => {
        auth0.webAuth
            .clearSession({})
            .then(success => {
                SInfo.deleteItem("accessToken", {});
                SInfo.deleteItem("refreshToken", {});
                setAccessToken(null)
            navigation.navigate('Auth');
            })
            .catch(error => {
                console.log("Log out cancelled");
            });
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