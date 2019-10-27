import React, {useState,useEffect} from 'react';
import {
    View,
    Button,
    Text
  } from 'react-native';

const AddLocationView = ({navigation}) => {

    return ( 
        <View>
            <Text> Add Location </Text>    
            <Text>
                You are logged in . </Text>    
                <Button title = { 'Add Location' }/>   
        </View >
      );

}

export default AddLocationView;