import React, { Component } from 'react';
import { Text, View , Button, Alert} from 'react-native';
import Auth0 from 'react-native-auth0';
import SInfo from 'react-native-sensitive-info';
import RNRestart from "react-native-restart";

var credentials = require('./auth0-credentials');
const auth0 = new Auth0(credentials);

export default class SettingsView extends Component {
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
              })
              .catch(err => {
                
                SInfo.getItem("refreshToken", {}).then(refreshToken => {
                  auth0.auth
                    .refreshToken({ refreshToken: refreshToken })
                    .then(newAccessToken => {
                      console.log(JSON.stringify(newAccessToken))
                      SInfo.setItem("accessToken", JSON.stringify(newAccessToken), {});
                      this.setState({
                        accessToken: true
                      })
                      // RNRestart.Restart();
                    })
                    .catch(err2 => {
                      console.log("err getting new access token");
                      console.log(err2);
                    });
                });
              });
          } else {
            this.setState({
              accessToken:false
            });
            console.log("no access token");
            this.props.navigation.navigate('Auth');
          }
        });
      }

    _onLoginPress = () => {
        auth0.webAuth
            .authorize({
                scope: 'offline_access profile token',
                audience: 'https://' + credentials.domain + '/userinfo'
            })
            .then(credentials => {
                SInfo.setItem("accessToken", credentials.accessToken, {});
                SInfo.setItem("refreshToken", credentials.refreshToken, {});
                this.setState({ accessToken: true });
            })
            .catch(error => console.log(error));
    };

    _onLogoutPress = () => {
        auth0.webAuth
            .clearSession({})
            .then(success => {
                SInfo.deleteItem("accessToken", {});
                SInfo.deleteItem("refreshToken", {});
                this.setState({ accessToken: null });
            this.props.navigation.navigate('Auth');
            })
            .catch(error => {
                console.log("Log out cancelled");
            });
    };

    
    render() {
        let loggedIn = this.state.accessToken === null ? false : true;
        return ( 
        <View >
            <Text > Auth0Sample - Login </Text>    
            <Text>
                You are { loggedIn ? '' : 'not ' } logged in . </Text>    
                <Button onPress = { loggedIn ? this._onLogoutPress : this._onLoginPress }
                title = { loggedIn ? 'Log Out' : 'Log In' }/>   
        </View >
        );
    }

}