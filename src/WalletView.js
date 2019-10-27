import React, { Component } from 'react';
import { Text, 
    Button, 
    AsyncStorage, 
    View,
    StyleSheet,
    ScrollView
} from 'react-native';

import WalletCard from './components/WalletCard';

import { firebase } from '@react-native-firebase/dynamic-links';
import dynamicLinks from '@react-native-firebase/dynamic-links';

const WalletView = ({navigation}) => {
    firebase.dynamicLinks()
    .getInitialLink()
    .then((url) => {
        if (url) {
            console.log('dynamic link ',url)
            // app opened from a dynamic link URL
        } else {
           // use deep link to handle the URL.
          if (Platform.OS === 'android') {
            Linking.getInitialURL()
              .then((url) => {
                 // do something with the URL
              })
              .catch(err => err);
          } else {
              console.log('deep link ',url)
            // handle case for iOS 
          }
        }
    });

    const storeId = navigation.getParam('id');
    console.log("from wallet: "+storeId);

    return (
        <ScrollView>
            <View style={styles.container}>
                <WalletCard/>
                <WalletCard/>
            </View>
        </ScrollView>
    )
    
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:80,
      marginBottom:40,
      justifyContent: 'center',
      alignItems: 'stretch',
    }
});

export default WalletView;