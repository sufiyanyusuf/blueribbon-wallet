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
import BottomSheet from 'reanimated-bottom-sheet'
import SelectionCarousel from './components/Widgets/SelectionCarousel';
import QuantityStepper from './components/Widgets/QuantityStepper';
import Selectionlist from './components/Widgets/SelectionList';
import AddressBadge from './components/Widgets/AddressBadge';
import SavedLocationsSheet from './components/Widgets/SavedLocationsSheet';
import globalStyles from './assets/GlobalStyles';
import axios from 'axios';
import Actions from './redux/action';
import {StateContext,DispatchContext} from './redux/contexts';
import stripe from 'tipsi-stripe'
import SInfo from 'react-native-sensitive-info';
import * as api from './utils/Api'

const screenWidth = Math.round(Dimensions.get('window').width);

const SubscriptionPage = ({navigation}) => {
    
    stripe.setOptions({
        publishableKey: 'pk_test_3Rc7Jw1dt02Cb7vee5lllMah00R7mTNCCm',
        merchantId: 'merchant.com.blueribbon', // Optional
        androidPayMode: 'test', // Android only
    })
      
    const state = React.useContext(StateContext);
    const dispatch = React.useContext(DispatchContext);

    const { currentOrder,pricing,currentOrderSemantics } = state; 

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
    const [locationEligibility,setLocationEligibility] = useState(false)
    const [selectedLocation,setSelectedLocation] = useState({})
    const [userAddresses,setUserAddresses] = useState([])
    const [locationsSheetVisible,setLocationsSheetVisible] = useState(false)
    const [SavedLocationsSheetHeight,setSavedLocationsSheetHeight] = useState(0)
    const [showLocationLoader,setLocationLoader] = useState(false)


    const calculatePricing = () => {
        dispatch({type:Actions.orders.calculatePricing,currentOrder:currentOrder,modifiers:listing.modifiers})
        
        //check and dispatch listing data, selection to reducer
    }

    const extractOrder = () => {
    
        const extractSemantics = (order,modifiers) => {
            if (modifiers && modifiers.length > 0){
                const semantics = modifiers.map (modifier => {
                    // get order from modifier
                    const _order = order.filter (order => order.id == modifier.id)[0]
            
                    if (_order && _order.val != null){
            
                        const selection = _order.val
                    
                        if (modifier.stepper){

                            if (modifier.type === "Product"){
                                params = {[modifier.title]:selection}
                                const obj = {[type]:params}
                                return obj
                            }else{
                                const type = modifier.type
                                const value = selection
                                const obj = {[type]:value}
                                return obj
                            }

                        }

                        else if (modifier.choice){

                            const choice = modifier.choice[selection]
                            const type = modifier.type

                            if (type === "Product"){
                                const unit = choice.unit
                                params = {[unit]:choice.title}
                                const obj = {[type]:params}
                                return obj
                            }else{
                                const value = choice.value
                                const unit = choice.unit
                                const params = {'unit':unit,'value':value}
                                const obj = {[type]:params} 
                                return obj
                            }
                    
                        }
            
                    }
                
                })
                if (! semantics.includes(undefined)){
                    // console.log(semantics)
                    return semantics
                }
            }
        }

        const getOrderValue = (semantics) => {
            if (semantics){

                var value = {}
                console.log(semantics)
                semantics.map(detail => {
                    if (detail.Quantity){
                        value = {...value, quantity:detail.Quantity}
                    }
                    if (detail.Length){
                        value = {...value, length:{unit:detail.Length.unit,value:detail.Length.value}}
                    }
                    if (detail.Frequency){
                        value = {...value, frequency:{unit:detail.Frequency.unit,value:detail.Frequency.value}}
                    }
                })
                return value
            }
        }

        const semantics = extractSemantics (currentOrder,listing.modifiers)
        

        if (JSON.stringify(currentOrderSemantics) != JSON.stringify(semantics)){

            console.log(getOrderValue(semantics))
            dispatch({type:Actions.orders.updateCurrentOrderSemantics,semantics:semantics})
        }
        //check and dispatch listing data, selection to reducer
    }

    const updateOrderState =  (id,val) => {
        const order = {'id':id,'val':val}
        dispatch({type:Actions.orders.updateCurrentOrder,order:order});

        // dispatch({type:Actions.orders.updateCurrentOrderSemantics,order:order});
    }
    extractOrder()
    calculatePricing()

    const listingId = navigation.getParam('id');
    const storeId = navigation.getParam('store');

    const fetchListing = async () => {
        
        try{
            axios.get('https://3458a3ef.ngrok.io/api/listing/'+listingId)
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


    updateLocationEligibility = async(location) => {
        try {
            setLocationLoader(true)
            const token = await api.getToken()
            if (location){
                setSelectedLocation(location)
                const coordinate = [location.coordinates.x,location.coordinates.y]
                const eligible = await api.checkLocationEligibility(coordinate,token,listingId)
                setLocationEligibility(eligible)
                setLocationLoader(false)
                console.log('eligibility',eligible)
            }else{
                const locations = await api.getUserLocations(token)
                setUserAddresses(locations)
                setSelectedLocation(locations[0])
                const coordinate = [locations[0].coordinates.x,locations[0].coordinates.y]
                const eligible = await api.checkLocationEligibility(coordinate,token,listingId)
                setLocationEligibility(eligible)
                setLocationLoader(false)
            }

        }catch(e){
            setLocationLoader(false)
        }

    }
    
    useEffect (()=>{
        fetchListing();
        updateLocationEligibility();
    },[])

    const viewOrder = () => {
        // navigation.navigate('OrderSummary');
        requestApplePay()
       
    }

    const getOrderDetailsJSON = (orderDetails) => {
        var json = {}
        orderDetails.map (detail => {
            json = [...json, detail]
        })
        return json
    }

    const requestApplePay = async() => {

        const getOrderValue = (semantics) => {
            if (semantics){
                var value = {}
                console.log(semantics)
                semantics.map(detail => {
                    if (detail.Quantity){
                        value = {...value, quantity:detail.Quantity}
                    }
                    if (detail.Length){
                        value = {...value, length:{unit:detail.Length.unit,value:detail.Length.value}}
                    }
                    if (detail.Frequency){
                        value = {...value, frequency:{unit:detail.Frequency.unit,value:detail.Frequency.value}}
                    }
                })
                return value
            }
        }


        const token = await api.getToken()

        if (token){

            var config = {
                headers: {'Authorization': "bearer " + token}
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
            .then(async (stripeTokenInfo) => {

            const value = getOrderValue(currentOrderSemantics) 

            const bodyParams = {
                amount:(pricing*100),
                tokenId:stripeTokenInfo.tokenId,
                listingId:listingId,
                orderDetails:JSON.stringify(currentOrderSemantics),//{...currentOrderSemantics},
                deliveryAddress:selectedLocation.base_address,
                quantity:value.quantity,
                length:value.length,
                frequency:value.frequency
            }
            try{
                
                const res = await axios.post('https://3458a3ef.ngrok.io/api/payment/new/applePay',bodyParams,config)
                console.log(res)
                stripe.completeNativePayRequest()
                navigation.navigate('Home');
                
            }catch(e){
                console.log(e)
                stripe.cancelNativePayRequest()
            }

            // this.props.navigation.navigate('Confirmation');
            })
            .catch(error => {
                console.warn('Payment failed', { error });
            stripe.cancelNativePayRequest()
            // this.props.navigation.navigate('Confirmation');
            });

        }else{
            console.log('no access token')
        }

    };

    const toggleLocationsSheet = () => {

        if (locationsSheetVisible){
            setLocationsSheetVisible(false)
        }else{
            setLocationsSheetVisible(true)
        }
    }

    const updateSavedLocationsSheetHeight = (height) => {
        setSavedLocationsSheetHeight(height)
    }

    const setLocation = (location) => {
        setSelectedLocation(location)
        toggleLocationsSheet()
        updateLocationEligibility(location)
    }

    const addLocation = () => {
        toggleLocationsSheet()
        navigation.navigate('AddLocation',{
            lastScreen: navigation.state 
        })
        
    }
    const renderSavedLocations = () => {

        return (
            <SavedLocationsSheet 
                toggle = {toggleLocationsSheet} 
                addLocation = {addLocation}
                updateHeight = {updateSavedLocationsSheetHeight}
                addresses = {userAddresses}
                selection = {setLocation}
                navigation = {navigation}
            />
         )
    }


    return (
        <View style = {styles.rootContainer}>
        <View style = {[styles.container,(locationsSheetVisible && styles.containerDimmed)]}>
               
        <SafeAreaView>
            <ScrollView>
                <View>
                    <View style = {styles.subContainer}>
                        <View style = {globalStyles.spacer40}></View>
                        <FitImage
                            resizeMode="contain"
                            indicator = {true}
                            source={{ uri: listing.brandLogo }}
                            style={styles.avatar}
                        />
                        <View style = {globalStyles.spacer40}></View>
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
                        <AddressBadge 
                            showLocations = {toggleLocationsSheet}
                            address = {selectedLocation}
                            eligibility = {locationEligibility}
                            loading = {showLocationLoader}
                        />
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

        </View>


        { locationsSheetVisible &&
            <BottomSheet
                snapPoints = {[SavedLocationsSheetHeight]}
                renderContent = {renderSavedLocations}
            />
        }

        </View>
     
    )
    
}

const styles = StyleSheet.create({
    rootContainer: {
        flex:1,
        backgroundColor:'#000000'
        
    },
    container:{
        backgroundColor:'#ffffff',
        opacity:1
    },
    containerDimmed:{
        opacity:0.2
    },
    avatar:{
        width:80,
        height:80,
        borderRadius: 40,
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
        backgroundColor: "#2C43A3",
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
        marginBottom:20,
        marginLeft:20,
        marginRight:20
    },
    locationSheetContainer:{
        backgroundColor:'white',
        shadowRadius:10,
        shadowOpacity:0.0,
        opacity:1,
        padding:30
    },
});

export default SubscriptionPage;