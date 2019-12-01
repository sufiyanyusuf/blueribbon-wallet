import {AppRegistry,Platform,AppState} from 'react-native';
import AppContainer from './src/AppContainer';
import {name as appName} from './app.json';
import React, { useState,useEffect } from 'react';
import { StateContext, DispatchContext } from './src/redux/contexts';

import reducers from './src/redux/reducers';
import Actions from './src/redux/action';
import globalState from './src/redux/state';
import useCombinedReducers from 'use-combined-reducers';
import NotificationsIOS, { NotificationsAndroid } from 'react-native-notifications';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import * as api from './src/utils/Api'
import axios from 'axios';

const App = () => {

    const [appState,setAppState] = useState(AppState.currentState)
    const [registered,setRegistered] = useState(false)
    const isIOS = Platform.OS === 'ios';
    const isAndroid = Platform.OS === 'android';
    const [state, dispatch] = useCombinedReducers({
        currentOrder: React.useReducer(reducers.orderReducer, globalState.currentOrder),
        currentOrderSemantics: React.useReducer(reducers.orderSemanticsReducer, globalState.currentOrderSemantics),
        pricing: React.useReducer(reducers.pricingReducer, globalState.currentPricing),
        user: React.useReducer(reducers.userReducer, globalState.user),
    });

    const shouldListenForNotifications = state.user.listenForNotifications;
    
    useEffect(() => {

        console.log('listen for notif',shouldListenForNotifications)

        NotificationsIOS.addEventListener('remoteNotificationsRegistered', onPushRegistered);
        NotificationsIOS.addEventListener('remoteNotificationsRegistrationFailed', onPushRegistrationFailed);

        if (shouldListenForNotifications) {
            
            console.log('adding')
            setRegistered(true)
            AppState.addEventListener('change', _handleAppStateChange);

            if (isIOS) {
                NotificationsIOS.requestPermissions();
                console.log('req registration')
            }
            if (isAndroid) {
                NotificationsAndroid.setRegistrationTokenUpdateListener(onPushRegistered);
            } 
        } 
        
    }, [shouldListenForNotifications])

    /*
        REGISTRATION
    */


    const onPushRegistered = async (deviceToken) => {

        console.log(deviceToken);

        const savedDeviceToken = await api.getDeviceToken()
        console.log(savedDeviceToken)

        if (!savedDeviceToken) {
            // update notification token on server
                const deviceTokenUploaded = await api.uploadDeviceToken(deviceToken)
                api.setDeviceToken(deviceToken)  
        } else {
            if (savedDeviceToken != deviceToken) {
                //update on server and keychain
                const deviceTokenUploaded = await api.uploadDeviceToken(deviceToken)
                api.setDeviceToken(deviceToken)
            } 
        }
        
        // addNotificationsEventListeners();

    };
    
    const onPushRegistrationFailed = error => {
        console.log(error);
    };
    

    /*
        APP STATE CHANGE
    */
    

    const _handleAppStateChange = async nextAppState => {

        console.log(nextAppState)

        if (appState.match(/inactive|background/) && nextAppState === 'active' && registered) {
          addNotificationsEventListeners();
          if (isIOS) {
            const notification = await PushNotificationIOS.getInitialNotification();
            if (notification) {
              onNotificationReceivedBackground(notification);
            }
          }
          if (isAndroid) {
            const notification = await PendingNotifications.getInitialNotification()
            if (notification) {
              onAndroidNotificationReceived(notification);
            }
          }
        }
        setAppState(nextAppState)
    };

    /*
        LISTENERS SETUP / REMOVAL
    */

    const addNotificationsEventListeners = () => {
        console.log('adding')
        if (isIOS) {
          NotificationsIOS.addEventListener('notificationReceivedForeground', onNotificationReceivedForeground);
          NotificationsIOS.addEventListener('notificationOpened', onNotificationOpened);
          PushNotificationIOS.addEventListener('notification', onNotificationReceivedBackground);
        }
        if (isAndroid) {
          NotificationsAndroid.setNotificationReceivedListener(onAndroidNotificationReceived);
          NotificationsAndroid.setNotificationReceivedInForegroundListener(onAndroidNotificationReceived);
          NotificationsAndroid.setNotificationOpenedListener(onAndroidNotificationReceived);
        }
    };
  

    useEffect(() => {
        return () => {
            AppState.removeEventListener('change', _handleAppStateChange);
            if (isIOS) {
                NotificationsIOS.removeEventListener('remoteNotificationsRegistered', onPushRegistered);
                NotificationsIOS.removeEventListener('remoteNotificationsRegistrationFailed', onPushRegistrationFailed);
                NotificationsIOS.removeEventListener('notificationReceivedForeground', onNotificationReceivedForeground);
                NotificationsIOS.removeEventListener('notificationOpened', onNotificationOpened);
            }
        }
    },[])

    /*
        LISTENERS HANDLERS
    */

    const onAndroidNotificationReceived = notification => {
        console.log('Notification Received - Android ', notification);
    };

    const onNotificationReceivedForeground = (notification, completion) => {
        if (completion) {
        // completion({alert: true, sound: false, badge: false});
        }
        console.log('Notification Received - Foreground', notification);
        // PushNotificationIOS.removeAllDeliveredNotifications();
    };

    const onNotificationReceivedBackground = (notification, completion) => {
        if (completion) {
        // completion({alert: true, sound: false, badge: false});
        }
        console.log('Notification Received - Background', notification);
        // PushNotificationIOS.removeAllDeliveredNotifications();
    };

    const onNotificationOpened = (notification, completion, action) => {
        console.log('Notification opened by device user', notification);
        console.log(`Notification opened with an action identifier: ${action.identifier} and response text: ${action.text}`, notification,);
        completion();
    };


    return(
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>
                <AppContainer />
            </StateContext.Provider>
        </DispatchContext.Provider>
    )

  

}


AppRegistry.registerComponent(appName, () => App);
