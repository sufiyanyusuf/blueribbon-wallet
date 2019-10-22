import React, { useState, useEffect } from 'react';
import {
    Button,
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView
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



const SubscriptionPage = ({navigation}) => {

    const state = React.useContext(StateContext);
    const dispatch = React.useContext(DispatchContext);

    const { currentOrder,pricing } = state; 

    const createListingModel = ({
        title= '',
        imageUrl= 'https://facebook.github.io/react-native/docs/assets/favicon.png',
        description = '',
        modifiers = [],
        currency = ''
    }={})=>({
        title,
        imageUrl,
        description,
        modifiers,
        currency
    });

    const [listing,setListing] = useState(createListingModel({}))
    const [modifiers,setModifiers] = useState([])
   
    const calculatePricing = () => {
        dispatch({type:Actions.orders.calculatePricing,currentOrder:currentOrder,modifiers:listing.modifiers})
        //check and dispatch listing data, selection to reducer
    }

    const updateOrderState =  (id,val) => {
        const order = {'id':id,'val':val}
        dispatch({type:Actions.orders.updateCurrentOrder,order:order});
    }
    
    calculatePricing()

    useEffect (()=>{
        const fetchListing = async () => {
            try{
                // https://f2b86c98.ngrok.io/api/listing/4/
                axios.get('https://f2b86c98.ngrok.io/api/listing/4/')
                .then(res => {
                    const listingModel =  createListingModel({
                        title:res.data.productInfo.title,
                        imageUrl:res.data.productInfo.image_url,
                        description:res.data.productInfo.description,
                        modifiers:res.data.modifier,
                        currency:res.data.productInfo.currency
                    })
                    setListing(listingModel)
                    // console.log(listingModel.modifiers);
                    
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

        fetchListing();

    },[])

    const viewOrder = () => {
        navigation.navigate('OrderSummary');
    }

    const storeId = navigation.getParam('id');

    return (
        <ScrollView>
            <View>
                <View style = {styles.subContainer}>
                    <View style = {globalStyles.spacer60}></View>
                    <FitImage
                        resizeMode="contain"
                        source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
                        style={styles.avatar}
                    />
                    <View style = {globalStyles.spacer20}></View>
                    <Text style={styles.title}>{listing.title}</Text>
                    <Text style={styles.subTitle}>Company Name {storeId}</Text>
                    <View style = {globalStyles.spacer20}></View>
                </View>
                <FitImage
                    resizeMode="cover"
                    source={{ uri: listing.imageUrl }}
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

                {/* <SelectionCarousel data = {["Option 1","Option 2","Option 3"]}/>
                <QuantityStepper/>
                <Selectionlist data = {["Option 1","Option 2","Option 3"]}/> */}


                <View style = {styles.subContainer}>
                    <TouchableOpacity style={styles.cta} onPress={()=>viewOrder()}>
                        <Text style={styles.ctaText}> Checkout - {listing.currency} {pricing}</Text>
                    </TouchableOpacity>
                </View>

                <View style = {globalStyles.spacer40}></View>

            </View>
        </ScrollView>
    )
    
}

const styles = StyleSheet.create({
    rootContainer: {
        flex:1,
    },
    avatar:{
        width:40,
        height:40,
        borderRadius: 20,
        overflow: 'hidden',
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