import React, { Component } from 'react';
import {
    Alert,
    AppRegistry,
    Button,
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
  } from 'react-native';
import globalStyles from '../../assets/GlobalStyles';

export default class QuantityStepper extends Component {

    constructor(props) {
      super(props);
      this.state = ({
          quantity : 1,
      });
    }

    incrementCount(){
        var _quantity = this.state.quantity;
        _quantity = _quantity + 1;
        this.setState({
            quantity: _quantity
        });
    }
    decrementCount(){
        var _quantity = this.state.quantity;
        if (_quantity > 1) {
            _quantity = _quantity - 1;
            this.setState({
                quantity: _quantity
            });
        }
    }
    render() {
        return (
          <View style = {styles.container}>
            <Text style = {styles.title}>Stepper Prompt</Text>
            <View style = {globalStyles.spacer30}></View>
            <View style = {styles.row}>
                <TouchableOpacity style={styles.cta} onPress={()=>this.decrementCount()}>
                    <Text style={styles.ctaText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.h1}> {this.state.quantity} </Text>
                <TouchableOpacity style={styles.cta} onPress={()=>this.incrementCount()}>
                    <Text style={styles.ctaText}>+</Text>
                </TouchableOpacity>
            </View>
            <View style = {globalStyles.spacer40}></View>
            <View style = {globalStyles.divider}></View>

          </View>
        );
    }

}

const styles = StyleSheet.create({
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
        backgroundColor: "#0A71F2",
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