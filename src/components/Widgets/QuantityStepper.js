import React, { useState,useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
  } from 'react-native';
import globalStyles from '../../assets/GlobalStyles';

const QuantityStepper = ({id,min_value,max_value,title,updateOrderState}) => {

    const [quantity,setQuantity] = useState(1);

    useEffect (()=>{
        updateOrderState(id,quantity)
    },[])

    const incrementCount = () => {
        var _quantity = quantity;
        if (_quantity < max_value) {
            _quantity = _quantity + 1;
            setQuantity(_quantity);

            updateOrderState(id,_quantity)
        }
    }

    const decrementCount = () => {
        var _quantity = quantity;
        if (_quantity > min_value) {
            _quantity = _quantity - 1;
            setQuantity(_quantity);

            updateOrderState(id,_quantity)
        }
    }

    return (
        <View style = {styles.container}>

        <View style = {styles.subContainer}>

            <View style = {globalStyles.spacer20}></View>
            <Text style = {styles.title}>{title ?? "Stepper"}</Text>
            <View style = {globalStyles.spacer30}></View>
            <View style = {styles.row}>
                <TouchableOpacity style={styles.cta} onPress={decrementCount}>
                    <Text style={styles.ctaText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.h1}> {quantity} </Text>
                <TouchableOpacity style={styles.cta} onPress={incrementCount}>
                    <Text style={styles.ctaText}>+</Text>
                </TouchableOpacity>
            </View>

            <View style = {globalStyles.spacer40}></View>

        </View>
        
        <View style = {globalStyles.divider}></View>
        <View style = {globalStyles.spacer40}></View>
        

        </View>
    );
    

}

const styles = StyleSheet.create({
    subContainer:{
        marginLeft:40,
        marginRight:40,
    },
    container:{
        flex:1,
    },
    h1:{
        fontFamily:"TTCommons-Bold",
        fontSize: 48,
        fontStyle: "normal",
        textAlign: "left",
        color: "#000000"
    },
    title:{
        fontFamily:"TTCommons-Bold",
        fontSize: 24,
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: "#000000"
    },
    cta:{
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: "#2C43A3",
        color: "#4a4a4a",
        alignItems:'center',
        justifyContent:'space-around'
    },
    ctaText:{
        fontFamily:"TTCommons-Bold",
        fontSize: 32,
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: "#ffffff",
        paddingTop:5
    },
    row:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
});

export default QuantityStepper;