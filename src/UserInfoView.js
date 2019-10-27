import React, {useState,useEffect} from 'react';
import {
    View,
    TextInput,
    Text,
    SafeAreaView, 
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Keyboard,
    Platform,
    DatePickerIOS
    
  } from 'react-native';

import DateTimePicker from "react-native-modal-datetime-picker";
import CountryPicker from 'react-native-country-picker-modal'
import { CountryCode, Country } from './types';

const UserInfoView = ({navigation}) => {

    const [chosenDate,setChosenDate] = useState(new Date());
    const [formattedDate,setFormattedDate]=useState('Your Date Of Birth');
    const [shouldShowDatePicker,setShowDatePicker]=useState(false);
 
    const [countryCode, setCountryCode] = useState('AE')
    const [country, setCountry] = useState(null)
    const [callingCode, setCallingCode] = useState('971')

    const [withCountryNameButton, setWithCountryNameButton] = useState(false)
    const [withFlag, setWithFlag] = useState(true)
    const [withEmoji, setWithEmoji] = useState(true)
    const [withFilter, setWithFilter] = useState(true)
    const [withAlphaFilter, setWithAlphaFilter] = useState(true)
    const [withCallingCode, setWithCallingCode] = useState(true)
    const [visible, setVisible] = useState(false)

    const switchVisible = () => setVisible(!visible)

    const onSelect = (country: Country) => {
        setCountryCode(country.cca2)
        setCountry(country)
        setCallingCode(country.callingCode[0])
    }


    const next = () => {
        navigation.navigate('AddLocationView');
    }

    const updateDate = (newDate) => {

        const options = {year: 'numeric', month: 'short', day: 'numeric' };
        const formattedDate = newDate.toLocaleDateString("en-US", options);
        setFormattedDate (formattedDate)
        setChosenDate(newDate)
    }

    const showDatePicker = () => {
        setShowDatePicker(true);
    }


    const hideDateTimePicker = () => {
        setShowDatePicker(false);
    };

    const handleDatePicked = date => {
        updateDate(date)
        hideDateTimePicker();
    };



    return ( 
        <View style={styles.container}>
            <SafeAreaView >

                <ScrollView 
                    style={styles.scrollView}
                    onScroll = {Keyboard.dismiss}
                >

                    <Text style={styles.title}>Welcome To BlueRibbon</Text> 
                    <Text style={styles.subTitle}>Let's set you up for an amazing experience</Text> 

                    <View style = {styles.subContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Your First Name'
                        />
                         <TextInput
                            style={styles.textInput}
                            placeholder='Your Last Name'
                        />
                        
                        <TouchableOpacity
                            style={styles.textInput}
                            value={formattedDate}
                            onPress = {showDatePicker}
                        >
                            <Text style={(formattedDate == 'Your Date Of Birth') ? styles.placeHolderDateText:styles.activeDateText}> {formattedDate} </Text>
                        </TouchableOpacity>

                        <View style={styles.phoneField}>

                            <TouchableOpacity
                                style={styles.countryCodeButton}
                                onPress = {()=>switchVisible()}
                            >

                                <Text
                                    style={styles.countryCodeText}
                                >
                                    {'+'+callingCode}
                                </Text>

                            </TouchableOpacity>

                            <TextInput
                                style={styles.phoneTextInput}
                                placeholder={ '  Your Mobile Number'}
                                keyboardType = 'phone-pad'
                            />
                        </View>

                        <CountryPicker
                                {...{
                                countryCode,
                                withFilter,
                                withFlag,
                                withCountryNameButton,
                                withAlphaFilter,
                                withCallingCode,
                                withEmoji,
                                onSelect,
                                modalProps:{
                                    visible
                                },
                                onOpen: ()=>setVisible(true),
                                onClose: ()=>setVisible(false)
                                }}
                                withFlagButton = {false}
                            />
                        
                    </View>

                </ScrollView>

            </SafeAreaView>

            <SafeAreaView >
               
                <DateTimePicker
                    isVisible={shouldShowDatePicker}
                    onConfirm={handleDatePicked}
                    onCancel={hideDateTimePicker}
                />
                
                <TouchableOpacity style={styles.cta} onPress={()=>switchVisible()}>
                        <Text style={styles.ctaText}>Create Account</Text>
                </TouchableOpacity>

            </SafeAreaView>

        </View >
      );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    activeDateText: {
        paddingTop:15,
        fontFamily: "TTCommons-Bold",
        fontSize: 20,
        color: "#000000",
    },
    placeHolderDateText: {
        paddingTop:15,
        fontFamily: "TTCommons-Bold",
        fontSize: 20,
        opacity:0.25,
        color: "#000000",
    },
    countryPicker:{
        paddingRight:5,
        paddingTop:10,
        flex:1
    },
    countryCodeField:{
        height: 60,
        borderRadius: 30,
        paddingTop:5,
        paddingLeft:20,
        fontFamily: "TTCommons-Bold",
        fontSize: 20,
        color: "#000000",
        flex:1.5
    },
    phoneField:{
        height: 60,
        borderWidth: 1 ,
        backgroundColor:"#F2F2F2",
        borderColor:"#E7E7E7",
        borderRadius: 30,
        paddingRight:0,
        flexDirection:'row',
        justifyContent:'space-between',
        flex:1
    },
    countryCodeButton:{
        height: 59,
        backgroundColor:"#E7E7E7",
        borderColor:"#E7E7E7",
        borderTopLeftRadius:30,
        borderBottomLeftRadius:30,
        flex:2,
        alignItems:'center',
        marginRight:10,
        marginLeft:0,
        paddingTop:15,
        paddingLeft:10
    },
    countryCodeText:{
        height: 60,
        borderRadius: 30,
        paddingRight:10,
        paddingTop:5,
        fontFamily: "TTCommons-Bold",
        fontSize: 20,
        color: "#000000",
        flex:6
    },
    phoneTextInput:{
        height: 60,
        borderRadius: 30,
        paddingRight:10,
        paddingTop:5,
        paddingLeft:10,
        fontFamily: "TTCommons-Bold",
        fontSize: 20,
        color: "#000000",
        flex:6
    },
    textInput:{
        height: 60,
        borderWidth: 1 ,
        backgroundColor:"#F2F2F2",
        borderColor:"#E7E7E7",
        borderRadius: 30,
        paddingLeft:20,
        paddingRight:20,
        paddingTop:5,
        fontFamily: "TTCommons-Bold",
        fontSize: 20,
        color: "#000000",
        marginBottom:20
    },
    subContainer:{
        marginTop:40,
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
        color: "#0A71F2"
    },
    subTitle:{
        fontFamily: "TTCommons-Regular",
        fontSize: 24,
        paddingBottom:20,
        color: "#000000"
    },
    cta:{
        marginTop:40,
        marginLeft:40,
        marginRight:40,
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

export default UserInfoView;