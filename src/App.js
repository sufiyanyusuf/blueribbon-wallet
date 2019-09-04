
import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  AsyncStorage,
  Button
} from 'react-native';

import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import TabNavigator from './tabNavigator';
import SignInView from './SigninView';

export default createAppContainer(
  createSwitchNavigator(
    {
      App: TabNavigator,
      Auth: SignInView,
    },
    {
      initialRouteName: 'Auth',
    }
  )
);