import React, { useEffect, useState } from 'react';
import { 
    Text, 
    Button, 
    View,
    StyleSheet,
    ScrollView,
    RefreshControl,
    SafeAreaView
} from 'react-native';
import SInfo from 'react-native-sensitive-info';
import WalletCard from './components/WalletCard';
import axios from 'axios';
import { firebase } from '@react-native-firebase/dynamic-links';
import * as api from './utils/Api'
import {StateContext,DispatchContext} from './redux/contexts';
import Actions from './redux/action';

const WalletView = ({ navigation }) => {
    
    const state = React.useContext(StateContext);
    const dispatch = React.useContext(DispatchContext);
    
    firebase.dynamicLinks().getInitialLink()
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

    const handleDynamicLink = (link) => {
        // Handle dynamic link inside your own application
      
        if (link.url.includes('https://links.blueribbon.io/listing/')) {
            const id = link.url.replace('https://links.blueribbon.io/listing/','');
            return navigation.navigate('LandingPage',{id:id})
        }
    };


    const [subscriptions,setSubscriptions] = useState([])
    const [refreshing, setRefreshing] = React.useState(false);

    function wait(timeout) {
        return new Promise(resolve => {
            fetchSubscriptions()
            setTimeout(resolve, timeout);
        });
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);

    
    const fetchSubscriptions = async () => {

        SInfo.getItem("accessToken", {}).then(accessToken => {
        
            var config = {
                headers: {'Authorization': "bearer " + accessToken}
            };
            try{
                axios.get('https://3458a3ef.ngrok.io/api/subscriptions/',config)
                    .then(response => {
                        console.log(response.data)

                        var _subscriptions = []

                        response.data.map ((subscription,index) => {

                            _subscriptions = (_subscriptions.concat([<WalletCard 
                                id = {subscription.id}
                                key = {index.toString()} 
                                productTitle = {subscription.title}
                                brandName = {subscription.brand_name}
                                logoUrl = {subscription.brand_logo}
                                remainingValue = {subscription.value}
                            />]))
                            
                        })

                        setSubscriptions(_subscriptions)

                    }

                )
            }catch(e){
                console.log(e)
            }

        })
    }  

    const onReceived = (notification) => {
        console.log("Notification received: ", notification);
    }

    onOpened = (openResult) => {
        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);
    }

    onIds = (device) => {
        console.log('Device info: ', device);
    }
      
    useEffect (()=>{
        fetchSubscriptions()
        const unsubscribe = firebase.dynamicLinks().onLink(handleDynamicLink);  
        return unsubscribe;

    }, [])
    
    useEffect(() => {

        const checkNewUser = async () => {

            try {

                const token = await api.getToken()
                var config = {
                    headers: {'Authorization': "bearer " + token}
                };

                axios.get('https://3458a3ef.ngrok.io/api/user/isNew', config).then(response => {

                    const newUser = response.data
                    if (newUser == true) {
                      return navigation.navigate('ProfileSetup')
                    }

                })
      
            } catch (e) {
                
            }
        }

        checkNewUser()
    
    },[])

    
    return (
        <SafeAreaView>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View style={styles.container}>
                    {subscriptions}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
    
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:60,
      marginBottom:40,
      justifyContent: 'center',
      alignItems: 'stretch',
    }
});

export default WalletView;