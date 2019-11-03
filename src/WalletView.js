import React, { useEffect, useState } from 'react';
import { 
    Text, 
    Button, 
    AsyncStorage, 
    View,
    StyleSheet,
    ScrollView
} from 'react-native';

import WalletCard from './components/WalletCard';
import axios from 'axios';
import SInfo from 'react-native-sensitive-info';
import { firebase } from '@react-native-firebase/dynamic-links';
import dynamicLinks from '@react-native-firebase/dynamic-links';

const WalletView = ({navigation}) => {
    // firebase.dynamicLinks()
    // .getInitialLink()
    // .then((url) => {
    //     if (url) {
    //         console.log('dynamic link ',url)
    //         // app opened from a dynamic link URL
    //     } else {
    //        // use deep link to handle the URL.
    //       if (Platform.OS === 'android') {
    //         Linking.getInitialURL()
    //           .then((url) => {
    //              // do something with the URL
    //           })
    //           .catch(err => err);
    //       } else {
    //           console.log('deep link ',url)
    //         // handle case for iOS 
    //       }
    //     }
    // });

    useEffect (()=>{
        

        const fetchSubscriptions = async () => {

            SInfo.getItem("accessToken", {}).then(accessToken => {
            
                console.log('fetching')
                console.log(accessToken)
    
                var config = {
                    headers: {'Authorization': "bearer " + accessToken}
                };
                try{
                    axios.get('https://2d9ab7a4.ngrok.io/api/subscriptions/',config)
                        .then(subscriptions => {
                            console.log(subscriptions)
                        }
    
                    )
                }catch(e){
                    console.log(e)
                }

            })
        }

        fetchSubscriptions()
        // const getToken = async () => {
        //     SInfo.getItem("accessToken", {}).then(accessToken => {
        //         setAccessToken(accessToken)
        //     })
        // } 
        
        //fetch data and update state for subscriptions
    },[])

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