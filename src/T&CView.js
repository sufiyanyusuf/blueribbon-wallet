import React, {useState,useEffect} from 'react';
import {
    View,
    Button,
    Text,
    SafeAreaView, 
    ScrollView,
    StyleSheet,
    TouchableOpacity,
  } from 'react-native';

const TermsView = ({navigation}) => {

    const next = () => {
        navigation.navigate('UserInfoPage');
    }

    return ( 
        <View>
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.title}>Our Terms & Conditions </Text> 
                    <Text style={styles.text}>

        Welcome to Website Name!

        These terms and conditions outline the rules and regulations for the use of Company Name's Website, located at Website.com.

        By accessing this website we assume you accept these terms and conditions. Do not continue to use Website Name if you do not agree to take all of the terms and conditions stated on this page.

        The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: “Client”, “You” and “Your” refers to you, the person log on this website and compliant to the Company's terms and conditions. “The Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our Company. “Party”, “Parties”, or “Us”, refers to both the Client and ourselves. 

     
                    </Text>    
                   
                    <View style = {styles.subContainer}>
                    <TouchableOpacity style={styles.cta} onPress={next}>
                        <Text style={styles.ctaText}> Agree & Continue</Text>
                    </TouchableOpacity>

                </View>

                </ScrollView>
            </SafeAreaView>
        </View >
      );

}

const styles = StyleSheet.create({
    container: {
        // flex: 1
    },
    subContainer:{
        marginBottom:60
    },
    scrollView: {
        padding: 40,
    },
    text: {
        fontFamily: "TTCommons-Regular",
        fontSize: 18,
        color: "#000000",
        lineHeight:22,
    },
    title:{
        fontFamily: "TTCommons-Bold",
        fontSize: 36,
        paddingBottom:20,
        color: "#000000"
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

})

export default TermsView;