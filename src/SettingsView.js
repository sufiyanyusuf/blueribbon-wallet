import React, { Component } from 'react';
import { Text, View , Button, AsyncStorage} from 'react-native';
import Auth0 from 'react-native-auth0';

var credentials = require('./auth0-credentials');
const auth0 = new Auth0(credentials);

export default class SettingsView extends Component {
    constructor(props) {
        super(props);
        this.state = { accessToken: null };
    }

    _onLogin = () => {
        auth0.webAuth
            .authorize({
                scope: 'openid profile',
                audience: 'https://' + credentials.domain + '/userinfo'
            })
            .then(credentials => {
                Alert.alert(
                    'Success',
                    'AccessToken: ' + credentials.accessToken, [{
                        text: 'OK',
                        onPress: () => console.log('OK Pressed')
                    }], { cancelable: false }
                );
                this.setState({ accessToken: credentials.accessToken });
            })
            .catch(error => console.log(error));
    };

    _onLogout = () => {
        auth0.webAuth
            .clearSession({})
            .then(success => {
                Alert.alert(
                    'Logged out!'
                );
                this.setState({ accessToken: null });
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
                <Button onPress = { loggedIn ? this._onLogout : this._onLogin }
                title = { loggedIn ? 'Log Out' : 'Log In' }/>   
        </View >
        );
    }

}