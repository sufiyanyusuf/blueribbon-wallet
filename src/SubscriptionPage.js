import React, { useState, useEffect } from 'react';
import {
    Button,
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    SafeAreaView
  } from 'react-native';

import FitImage from 'react-native-fit-image';
import SelectionCarousel from './components/Widgets/SelectionCarousel';
import QuantityStepper from './components/Widgets/QuantityStepper';
import Selectionlist from './components/Widgets/SelectionList';
import AddressBadge from './components/Widgets/AddressBadge';
import globalStyles from './assets/GlobalStyles';
import axios from 'axios';
import Actions from './redux/action';
import {StateContext,DispatchContext} from './redux/contexts';
import stripe from 'tipsi-stripe'
import SInfo from 'react-native-sensitive-info';

const screenWidth = Math.round(Dimensions.get('window').width);

const SubscriptionPage = ({navigation}) => {
    
    stripe.setOptions({
        publishableKey: 'pk_test_3Rc7Jw1dt02Cb7vee5lllMah00R7mTNCCm',
        merchantId: 'merchant.com.blueribbon', // Optional
        androidPayMode: 'test', // Android only
    })
      
    const state = React.useContext(StateContext);
    const dispatch = React.useContext(DispatchContext);

    const { currentOrder,pricing } = state; 

    const createListingModel = ({
        title= '',
        brandName = '',
        brandLogo = null,
        imageUrl= null,
        description = '',
        modifiers = [],
        currency = ''
    }={})=>({
        title,
        brandName,
        brandLogo,
        imageUrl,
        description,
        modifiers,
        currency
    });

    const [listing,setListing] = useState(createListingModel({}))
    const [modifiers,setModifiers] = useState([])
    const [accessToken,setAccessToken] = useState('')
    const [locationEligibility,setLocationEligibility] = useState('')
   
    const calculatePricing = () => {
        dispatch({type:Actions.orders.calculatePricing,currentOrder:currentOrder,modifiers:listing.modifiers})
        //check and dispatch listing data, selection to reducer
    }

    const updateOrderState =  (id,val) => {
        const order = {'id':id,'val':val}
        dispatch({type:Actions.orders.updateCurrentOrder,order:order});
    }
    
    calculatePricing()

    const listingId = navigation.getParam('id');
    const storeId = navigation.getParam('store');

    const fetchListing = async () => {
            
        try{
            axios.get('https://2d9ab7a4.ngrok.io/api/listing/'+listingId)
            .then(res => {
                const listingModel =  createListingModel({
                    title:res.data.productInfo.title,
                    imageUrl:decodeURI(res.data.productInfo.image_url),
                    description:res.data.productInfo.description,
                    modifiers:res.data.modifier,
                    currency:res.data.productInfo.currency,
                    brandLogo:decodeURI(res.data.organization.logo),
                    brandName:res.data.organization.title,
                })
                setListing(listingModel)
                
                
                var _modifiers = []

                listingModel.modifiers.map ((modifier,index) => {

                    if (modifier.stepper){
                        _modifiers = (_modifiers.concat([<QuantityStepper 
                            id = {modifier.id}
                            key = {index.toString()} 
                            title = {modifier.title}
                            min_value = {modifier.stepper.min_value}
                            max_value = {modifier.stepper.max_value}
                            updateOrderState = {updateOrderState}
                            />]))
                    }else if(modifier.multiOption){

                        const choices = modifier.choice.map(choice =>{
                            return choice.title
                        })

                        if (modifier.element_type == "Carousel"){
                            const icons = modifier.choice.map (choice => {
                                return choice.icon
                            })
                            _modifiers = (_modifiers.concat([ <SelectionCarousel 
                                id = {modifier.id}
                                key = {index.toString()} 
                                data = {choices} 
                                icons = {icons}
                                title = {modifier.title}
                                updateOrderState = {updateOrderState}
                            />]))
                        }else{
                            _modifiers = (_modifiers.concat([<Selectionlist 
                                id = {modifier.id}
                                key = {index.toString()} 
                                data = {choices}
                                title = {modifier.title}
                                updateOrderState = {updateOrderState}
                            />]))
                        }
                      
                    }else if(modifier.textField){

                    }

                })
              
                setModifiers(_modifiers)

            });
        }catch(e){
            console.log(e);
        }
    }

     
    const getToken = async () => {
        return new Promise ((resolve, reject) => {
            try {
                SInfo.getItem("accessToken", {}).then(accessToken => {
                    setAccessToken(accessToken)
                    resolve(accessToken)
                })
            }catch(e){
                reject(e)
            }
        })
    }

    const getUserLocations = async (token) => {
        
        return new Promise ((resolve, reject) => {

            try{
                var config = {
                    headers: {'Authorization': "bearer " + token}
                  };
    
                axios.get('https://2d9ab7a4.ngrok.io/api/user/savedLocations',config)
                .then(res => {
                    console.log(res)
                    resolve(res.data)
                })
            }catch(e){
                reject(e)
            }
        })
    }

    const checkLocationEligibility = async (location,token) => {

    
        return new Promise ((resolve, reject) => {

            try{
                var config = {
                    headers: {'Authorization': "bearer " + token}
                  };

                var bodyParams = {
                 
                        'listingId':listingId,
                        'coordinate':location
                    
                }
                
                axios.post('https://2d9ab7a4.ngrok.io/api/user/checkLocationEligibility',bodyParams,config)
                .then(res => {
                    console.log(res)
                    resolve(res.data)
                })
            }catch(e){
                reject(e)
            }
        })
    }

    updateLocationEligibility = async() => {

        const token = await getToken()
        const locations = await getUserLocations(token)
        const coordinate = [locations[0].coordinates.x,locations[0].coordinates.y]
        const eligible = await checkLocationEligibility(coordinate,token)
        console.log('eligibility',eligible)

    }
    

    useEffect (()=>{
     
        fetchListing();
        updateLocationEligibility();

    },[])

    const viewOrder = () => {
        // navigation.navigate('OrderSummary');
        requestApplePay()
       
    }


    const requestApplePay = () => {

        if (accessToken){

            var config = {
                headers: {'Authorization': "bearer " + accessToken}
            };



            return stripe
                .paymentRequestWithNativePay({
                    shippingMethods: [],
                    currencyCode: listing.currency,
                },
                [{
                    label: listing.title,
                    amount: pricing.toString(),
                }])
            .then(stripeTokenInfo => {

            try{
                axios.post('https://2d9ab7a4.ngrok.io/api/payment/new/applePay',{
                    amount:(pricing*100),
                    tokenId:stripeTokenInfo.tokenId,
                    listingId:listingId
                },config)
                .then(res => {
                    console.log(res)
                    stripe.completeNativePayRequest()
                    navigation.navigate('Home');
                })
            }catch(e){
                console.log(e)
                stripe.cancelNativePayRequest()
            }

            // this.props.navigation.navigate('Confirmation');
            })
            .catch(error => {
            // console.warn('Payment failed', { error });
            stripe.cancelNativePayRequest()
            // this.props.navigation.navigate('Confirmation');
            });


        }

    };

    return (
        <SafeAreaView>
            <ScrollView>
            <View>
                <View style = {styles.subContainer}>
                    <View style = {globalStyles.spacer60}></View>
                    <FitImage
                        resizeMode="contain"
                        indicator = {true}
                        source={{ uri: listing.brandLogo }}
                        style={styles.avatar}
                    />
                    <View style = {globalStyles.spacer20}></View>
                    <Text style={styles.title}>{listing.title}</Text>
                    <Text style={styles.subTitle}>{listing.brandName}{storeId}</Text>
                    <View style = {globalStyles.spacer20}></View>
                </View>
                <FitImage
                    resizeMode="cover"
                    indicator = {true}
                    source={{ uri: listing.imageUrl }}
                    style={styles.productImage}
                />

                <View style={styles.addressBadge}>
                    <AddressBadge/>
                </View>
                
                <View style = {styles.subContainer}>
                    <View style = {globalStyles.spacer20}></View>
                    <Text>{listing.description}</Text>
                    <View style = {globalStyles.spacer40}></View>
                </View>

                <View>{modifiers}</View>

                <View style = {styles.subContainer}>
                    <TouchableOpacity style={styles.cta} onPress={()=>viewOrder()}>
                        <Text style={styles.ctaText}> Checkout - {listing.currency} {pricing}</Text>
                    </TouchableOpacity>
                </View>

                <View style = {globalStyles.spacer40}></View>

            </View>
        </ScrollView>
        </SafeAreaView>
    )
    
}

const styles = StyleSheet.create({
    rootContainer: {
        flex:1,
    },
    avatar:{
        width:60,
        height:60,
        borderRadius: 30,
        overflow: 'hidden',
    },
    productImage:{
        height:300,
        width:screenWidth
    },
    cta:{
        marginTop:40,
        paddingTop:5,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#0A71F2",
        color: "#4a4a4a",
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"center"
    },
    ctaText:{
        fontFamily:"TTCommons-Bold",
        fontSize: 20,
        textAlign: "center",
        color: "#ffffff",
    },
    subContainer:{
        marginLeft:40,
        marginRight:40,
    },
    title:{
        fontFamily: "TTCommons-Bold",
        fontSize: 36,
        color: "#000000"
    },
    subTitle:{
        fontFamily: "TTCommons-Regular",
        fontSize: 24,
        color: "#000000"
    },
    addressBadge:{
        marginTop:-30,
        marginLeft:20,
        marginRight:20
    }
});

export default SubscriptionPage;