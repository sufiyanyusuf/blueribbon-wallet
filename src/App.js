
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
import CoreStack from './CoreNavigator';
import SignInView from './SigninView';
import Subs from './SubscriptionPage';
export default createAppContainer(
  createSwitchNavigator(
    {
      App: {
        screen: CoreStack,
        path: 'subscribe',
      },
      Auth: {screen:SignInView},
      Checkout: Subs
    },
    {
      initialRouteName: 'Checkout',
    }
  )
);