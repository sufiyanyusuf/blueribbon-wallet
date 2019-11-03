import React, {useState,useEffect} from 'react';
import {
    View,
    Button,
    Text
  } from 'react-native';

import Auth0 from 'react-native-auth0';
var credentials = require('./auth0-credentials');
import SInfo from 'react-native-sensitive-info';

const auth0 = new Auth0(credentials);

const SignInView = ({navigation}) => {

  const [accessToken, setAccessToken] = useState(null);

  useEffect (()=>{

    const checkToken = async() => {

      SInfo.getItem("accessToken", {}).then(accessToken => {
        console.log(accessToken);

        if (accessToken) {
          auth0.auth
            .userInfo({ token: accessToken })
            .then(data => {
              setAccessToken(true)

              //check for new user & profile setup flow here

              navigation.navigate('App');
              
            })
            .catch(err => {
              console.log(err)
              // SInfo.getItem("refreshToken", {}).then(refreshToken => {
              //   auth0.auth
              //     .refreshToken({ refreshToken: refreshToken })
              //     .then(newAccessToken => {
              //       SInfo.setItem("accessToken", JSON.stringify(newAccessToken), {});
              //       setAccessToken(true)
              //       navigation.navigate('App');
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
        }
      });
    }

    checkToken();
    
  },[])


  const _onLogin = () => {
    auth0.webAuth
        .authorize({
            scope: 'offline_access email openid profile token',
            audience: 'https://' + credentials.domain + '/userinfo',
            audience: 'https://blueribbon.io/api/user'
        })
        .then(credentials => {
            console.log(credentials, credentials.accessToken)


            SInfo.setItem("accessToken", credentials.accessToken, {});
            setAccessToken(true)
            navigation.navigate('App')

            auth0.auth
            .userInfo({ token: credentials.accessToken })
            .then(data => {
              console.log(data)
            })


        })
        .catch(error => console.log(error));
  };

  return ( 
    <View>
        <Text> Auth0Sample - Login </Text>    
        <Text>
            You are { accessToken ? '' : 'not ' } logged in . </Text>    
            <Button onPress = { _onLogin }
            title = { 'Log In' }/>   
    </View >
  );
    


}

export default SignInView;