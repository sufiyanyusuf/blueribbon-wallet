import React from 'react';
import {
    AsyncStorage,
    View,
    Button,
    Text,
    Alert
  } from 'react-native';

import Auth0 from 'react-native-auth0';
var credentials = require('./auth0-credentials');
import SInfo from 'react-native-sensitive-info';

const auth0 = new Auth0(credentials);

  export default class SignInView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { accessToken: null };
    }

    componentDidMount() {
        SInfo.getItem("accessToken", {}).then(accessToken => {
          if (accessToken) {
            auth0.auth
              .userInfo({ token: accessToken })
              .then(data => {
                this.setState({
                    accessToken: true
                })
                this.props.navigation.navigate('App');
              })
              .catch(err => {
                SInfo.getItem("refreshToken", {}).then(refreshToken => {
                  auth0.auth
                    .refreshToken({ refreshToken: refreshToken })
                    .then(newAccessToken => {
                      SInfo.setItem("accessToken", newAccessToken, {});
                      this.setState({
                        accessToken: true
                      })
                      this.props.navigation.navigate('App');
                    })
                    .catch(err2 => {
                      console.log("err getting new access token");
                      console.log(err2);
                    });
                });
              });
          } else {
            this.setState({
              hasInitialized: true,
              accessToken:false
            });
            console.log("no access token");
          }
        });
      }

    _onLogin = () => {
        auth0.webAuth
            .authorize({
                scope: 'offline_access profile token',
                audience: 'https://' + credentials.domain + '/userinfo'
            })
            .then(credentials => {
                SInfo.setItem("accessToken", credentials.accessToken, {});
                SInfo.setItem("refreshToken", credentials.refreshToken, {});
                this.setState({ accessToken: true });
                this.props.navigation.navigate('App')
            })
            .catch(error => console.log(error));
    };

    render() {
        let loggedIn = this.state.accessToken === null ? false : true;
        return ( 
        <View>
            <Text> Auth0Sample - Login </Text>    
            <Text>
                You are { this.state.accessToken ? '' : 'not ' } logged in . </Text>    
                <Button onPress = { this._onLogin }
                title = { 'Log In' }/>   
        </View >
        );
    }


}