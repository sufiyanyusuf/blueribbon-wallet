import React, { useEffect, useState } from 'react';
import { 
    Text, 
    Button, 
    View,
    StyleSheet,
    ScrollView,
    RefreshControl,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Dimensions,
    Modal
} from 'react-native';
import SInfo from 'react-native-sensitive-info';
import WalletCard from './components/WalletCard';
import axios from 'axios';
import { firebase } from '@react-native-firebase/dynamic-links';
import * as api from './utils/Api'
import {StateContext,DispatchContext} from './redux/contexts';
import Actions from './redux/action';
import SubscriptionOptionsView from "./SubscriptionOptionsView";

const WalletView = ({ navigation }) => {
    
    const state = React.useContext(StateContext);
    const dispatch = React.useContext(DispatchContext);
    const [subscriptions,setSubscriptions] = useState([])
    const [refreshing, setRefreshing] = React.useState(false);
    const [selectedId, setSelectedId] = React.useState();
    const [optionsVisible, setOptionsVisible] = useState(false)

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
        //move this to api
        console.log('fetching')
        SInfo.getItem("accessToken", {}).then(accessToken => {
        
            var config = {
                headers: {'Authorization': "bearer " + accessToken}
            };
            try{
                axios.get('https://3458a3ef.ngrok.io/api/subscriptions/',config)
                    .then(response => {
                        var _subscriptions = response.data
                        console.log(_subscriptions)
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


    const showOptions = (id) => {
        setSelectedId(id)
        setOptionsVisible(true)
    }

    const closeSheet = () => {
        fetchSubscriptions()
        setSelectedId(null)
    }

    const dismissSubscriptionOptions = () => {
        console.log('dismiss')
        setOptionsVisible(false)
        fetchSubscriptions()
        setSelectedId(null)
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={subscriptions}
                keyExtractor={subscription => (subscription.id).toString()}
                renderItem={({ item }) => <WalletCard 
                    id = {item.id}
                    productTitle = {item.title}
                    brandName = {item.brand_name}
                    logoUrl = {item.brand_logo}
                    remainingValue={item.value}
                    showOptions = {showOptions}
                />}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />    
           
            <Modal
                animationType="slide"
                transparent={false}
                visible={optionsVisible}
                presentationStyle="overFullScreen"
            >
                <SubscriptionOptionsView
                    subscription = {(subscriptions.filter(sub => sub.id == selectedId))}    
                    metaData={{ active: true, autoRenew: true, paused: false, expiry: 'Jan 19, 2020', lastPayment: 'Nov 19, 2020', brandName: 'Masafi' }}
                    dismiss={dismissSubscriptionOptions}
                    subscriptionId={selectedId}
                />
            </Modal>

        </SafeAreaView>
    )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },

});




export default WalletView;