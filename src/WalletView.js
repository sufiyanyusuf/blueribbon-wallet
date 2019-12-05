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
    Modal,
    Image
} from 'react-native';
import FitImage from 'react-native-fit-image';
import SInfo from 'react-native-sensitive-info';
import WalletCard from './components/WalletCard';
import axios from 'axios';
import { firebase } from '@react-native-firebase/dynamic-links';
import * as api from './utils/Api'
import {StateContext,DispatchContext} from './redux/contexts';
import Actions from './redux/action';
import SubscriptionOptionsView from "./SubscriptionOptionsView";
import RightArrowIcon from './assets/icons/general/rightArrow.png';

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

    const Cta = ({ brand, title, id, logoUrl, paused }) => {
    
        const styles = StyleSheet.create({
            ctaTitle: {
                fontFamily: "TTCommons-Bold",
                fontSize: 20,
                color: "#717585"
            },
            ctaSubtitle: {
                fontFamily: "TTCommons-Regular",
                fontSize: 18,
                color: "#717585"
            },
            textContainer: {
                flexDirection: "column",
                alignItems: "baseline",
                justifyContent:"center",
            },
            cta: {
                flex:1,
                borderRadius:20,
                backgroundColor: "#FAFAFA",
                flexDirection:'row',
                alignItems:"center",
                justifyContent:"space-between",
                color: "#717585",
                padding: 15,
                paddingRight:20,
            },
            container: {
                flex: 1,
                marginTop: 0,
                margin:15
            },
            logo: {
                height: 60,
                width: 60,
                borderRadius: 30,
                overflow: 'hidden',
                marginRight:15
            },
            pausedBadge: {
                fontFamily: "TTCommons-Bold",
                fontSize: 14,
                color: "#EB3B4E",
                letterSpacing:1
            },
            redDot: {
                height:10,
                width: 10,
                borderRadius: 5,
                backgroundColor: "#EB3B4E",
                marginRight: 2,
                marginLeft: 80
            }
        });

        return (

            <View style = {styles.container}>
               
                <TouchableOpacity onPress = {()=>showOptions(id)}>
                    <View style={{ flexDirection: "row", flex:1}}>
                            
                        <View style={styles.cta}>
                               
                            <View style={{ flex:1, flexDirection:"column"}}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent:"space-between" }}>
                                    
                                    <View style={{ flexDirection: "row", justifyContent:"flex-start" }}>

                                        <Image
                                            resizeMode="contain"
                                            source={{ uri: logoUrl }}
                                            style={styles.logo}
                                        />
                                        
                                        <View style={styles.textContainer}>
                                            <Text style={styles.ctaTitle}> {brand} </Text>
                                            <Text style={styles.ctaSubtitle}> {title} </Text>
                                            
                                        </View>

                                    </View>
                            
                                    <Image source={RightArrowIcon} />
                                </View>

                                <View>
                                    {paused &&
                                        <View style={{ flexDirection: "row" }}>
                                            <View style={styles.redDot} />
                                            <Text style={styles.pausedBadge}> PAUSED </Text> 
                                        </View>
                                        
                                    }
                                </View>
                            </View>
                            

                            
                        </View>

                    </View>
                </TouchableOpacity>
            </View>
            
        )

     
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={subscriptions}
                ListHeaderComponent = {<Text style={styles.title}> Your Subscriptions </Text>}
                keyExtractor={subscription => (subscription.id).toString()}
                // renderItem={({ item }) => <WalletCard 
                //     id = {item.id}
                //     productTitle = {item.title}
                //     brandName = {item.brand_name}
                //     logoUrl = {item.brand_logo}
                //     remainingValue={item.value}
                //     showOptions = {showOptions}
                // />}
                renderItem = {({ item }) => <Cta 
                    brand={item.brand_name}
                    title={item.title}
                    id={item.id}
                    logoUrl={item.brand_logo}
                    paused = {item.currentState.subscription_state === 'paused'}
                />}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />    
           
            <Modal
                animationType="slide"
                transparent={false}
                visible={optionsVisible}
                presentationStyle="fullScreen"
            >
                <SubscriptionOptionsView
                    subscription = {(subscriptions.filter(sub => sub.id == selectedId)[0])}    
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
        
        fontFamily:"TTCommons-Bold",
        fontSize: 36,
        color: "#383B46",
        letterSpacing: -1,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 25,
        paddingTop:60
    },

});




export default WalletView;