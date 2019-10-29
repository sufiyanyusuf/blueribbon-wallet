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
    KeyboardAvoidingView,
    ActivityIndicator
  } from 'react-native';

import DateTimePicker from "react-native-modal-datetime-picker";
import CountryPicker from 'react-native-country-picker-modal'
import axios from 'axios';
import Auth0 from 'react-native-auth0';
import SInfo from 'react-native-sensitive-info';

import { CountryCode, Country } from './types';

var credentials = require('./auth0-credentials');
const auth0 = new Auth0(credentials);

const UserInfoView = ({navigation}) => {

    const [chosenDate,setChosenDate] = useState(new Date());
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

    const [loading,setLoading] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [formattedDate,setFormattedDate] = useState('Date Of Birth')
    const [mobileNumber, setMobileNumber] = useState('')



    const switchVisible = () => setVisible(!visible)

    const getUserId = async (token) => {
        return new Promise ((resolve, reject) => {
         
            auth0.auth
                .userInfo({ token: token })
                .then(data => {
                    if (data.sub){
                        resolve(data.sub)
                    }else{
                        reject('error')
                    }
                })
                .catch(err => {
                    reject(err)
                })
                
        })
    }

    const getToken = new Promise (async (resolve, reject) => {

        SInfo.getItem("accessToken", {}).then(accessToken => {
            if (accessToken) {
              auth0.auth
                .userInfo({ token: accessToken })
                .then(data => {
                    resolve(token.accessToken)
                })
                .catch(err => {
                  SInfo.getItem("refreshToken", {}).then(refreshToken => {
                    auth0.auth
                        .refreshToken({ refreshToken: refreshToken })
                        .then(newAccessToken => {
                            SInfo.setItem("accessToken", newAccessToken.accessToken, {});
                            resolve(newAccessToken.accessToken)
                        })
                        .catch(err2 => {
                            reject(err2)
                        });
                    });
                });
            } else {
              setAccessToken(false)
              reject('No token')
            }
        });

    })
    
    const updateProfile = async (id) => {
        return new Promise ((resolve, reject) => {
            axios.post('https://2d9ab7a4.ngrok.io/api/user/updateInfo',{
                'user_id':id,
                'first_name':firstName,
                'last_name':lastName,
                'birthday':formattedDate,
                'phone_number':callingCode + mobileNumber
            }).then(response => {
                resolve(response)
            }).catch(err => {
                reject(err)
            })
        })
    }

    const onSelect = (country: Country) => {
        setCountryCode(country.cca2)
        setCountry(country)
        setCallingCode(country.callingCode[0])
    }


    const next = () => {

        setLoading(true)

        getToken.then(token => {
            return getUserId(token)
        }).then(id => {
            return updateProfile(id)
        }).then(response => {
            //show toast
            setLoading(false)
            navigation.navigate('AddLocationView');
        }).catch(e=>{
            setLoading(false)
            //show error message in UI
        })

        //send request , then navigate on success
        // navigation.navigate('AddLocationView');
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
        
            <SafeAreaView style={styles.container}>
     
                <ScrollView 
                    style={styles.scrollView}
                    onScroll = {Keyboard.dismiss}
                >

                    <KeyboardAvoidingView style={styles.subContainer} behavior="position" enabled>


                        <Text style={styles.title}>Welcome To BlueRibbon</Text> 
                        <Text style={styles.subTitle}>Let's set you up for an amazing experience</Text> 

                        <View style = {styles.subContainer}>
                            <TextInput
                                style={styles.textInput}
                                placeholder='First Name'
                                editable = {!loading}
                                onChangeText={(value) => {
                                    setFirstName(value)
                                }}
                            />
                            <TextInput
                                style={styles.textInput}
                                placeholder='Last Name'
                                editable = {!loading}
                                onChangeText={(value) => {
                                    setLastName(value)
                                }}
                            />
                            
                            <TouchableOpacity
                                style={styles.textInput}
                                value={formattedDate}
                                onPress = {showDatePicker}
                                disabled = {loading}
                            >
                                <Text style={(formattedDate == 'Date Of Birth') ? styles.placeHolderDateText:styles.activeDateText}> {formattedDate} </Text>
                            </TouchableOpacity>

                            <View style={styles.phoneField}>

                                <TouchableOpacity
                                    style={styles.countryCodeButton}
                                    onPress = {()=>switchVisible()}
                                    disabled = {loading}
                                >

                                    <Text
                                        style={styles.countryCodeText}
                                    >
                                        {'+'+callingCode}
                                    </Text>

                                </TouchableOpacity>

                                <TextInput
                                    style={styles.phoneTextInput}
                                    placeholder={ 'Mobile Number'}
                                    keyboardType = 'phone-pad'
                                    editable = {!loading}
                                    onChangeText={(value) => {
                                        setMobileNumber(value)
                                    }}
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
                    </KeyboardAvoidingView>

                </ScrollView>


                <DateTimePicker
                    isVisible={shouldShowDatePicker}
                    onConfirm={handleDatePicked}
                    onCancel={hideDateTimePicker}
                />

                <View styles = {styles.ctaContainer}>
                    <TouchableOpacity style={styles.cta} onPress={next}>
                            {!loading && <Text style={styles.ctaText}>Create Account</Text>}
                            {loading && <ActivityIndicator size="large" color="#ffffff" />}
                    </TouchableOpacity>
                </View>

            </SafeAreaView>

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
        marginLeft:40,
        marginRight:40,
        paddingTop:5,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#0A71F2",
        color: "#4a4a4a",
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"center",
        marginTop:20,
        marginBottom:20
    },
    ctaText:{
        fontFamily:"TTCommons-Bold",
        fontSize: 20,
        textAlign: "center",
        color: "#ffffff",
    },
    ctaContainer:{
        justifyContent:'center'
    }

})

export default UserInfoView;