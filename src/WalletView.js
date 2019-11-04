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
        console.log(link)
        console.log(navigation)
        if (link.url.includes('https://links.blueribbon.io/listing/')) {
            const id = link.url.replace('https://links.blueribbon.io/listing/','');
            return navigation.push('LandingPage',{id:id})
        }
      };

    console.log(navigation.getParam('id'));

    const [subscriptions,setSubscriptions] = useState([])

    useEffect (()=>{
       
        const fetchSubscriptions = async () => {

            SInfo.getItem("accessToken", {}).then(accessToken => {
            
    
                var config = {
                    headers: {'Authorization': "bearer " + accessToken}
                };
                try{
                    axios.get('https://2d9ab7a4.ngrok.io/api/subscriptions/',config)
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

        fetchSubscriptions()
         
        const unsubscribe = firebase.dynamicLinks().onLink(handleDynamicLink);
        // When the component unmounts, remove the listener
        return unsubscribe;

    },[])

    return (
        <ScrollView>
            <View style={styles.container}>
                {subscriptions}
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