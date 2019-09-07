import React, { Component } from 'react';
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

export default class SubscriptionPage extends Component {

    viewOrder(){
        this.props.navigation.navigate('OrderSummary');
    }

    render() {
        const { navigation } = this.props;
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
                    <Text style={styles.title}>Subscription Title</Text>
                    <Text style={styles.subTitle}>Company Name {storeId}</Text>
                    <View style = {globalStyles.spacer20}></View>
                    </View>
                    <FitImage
                        resizeMode="contain"
                        source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
                    />

                    <View style={styles.addressBadge}>
                        <AddressBadge/>
                    </View>
                    
                    <View style = {styles.subContainer}>
                        <View style = {globalStyles.spacer20}></View>
                        <Text>Product Description</Text>
                        <View style = {globalStyles.spacer40}></View>
                        <SelectionCarousel data = {["Option 1","Option 2","Option 3"]}/>
                        <QuantityStepper/>
                        <Selectionlist data = {["Option 1","Option 2","Option 3"]}/>
                        <SelectionCarousel/>
                        <TouchableOpacity style={styles.cta} onPress={()=>this.viewOrder()}>
                            <Text style={styles.ctaText}> View Order </Text>
                        </TouchableOpacity>
                    </View>

                    <View style = {globalStyles.spacer40}></View>

                </View>
            </ScrollView>
        )
    }
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