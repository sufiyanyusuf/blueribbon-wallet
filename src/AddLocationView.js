import React, {useState,useEffect} from 'react';
import {
    View,
    Button,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Image,
    KeyboardAvoidingView,
    Keyboard,
    Dimensions,
    ActivityIndicator
  } from 'react-native';

import axios from 'axios'
import BottomSheet from 'reanimated-bottom-sheet'
import MapView, {PROVIDER_GOOGLE, Marker, Overlay} from 'react-native-maps';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import marker from './assets/pin.png'
import Auth0 from 'react-native-auth0';
import SInfo from 'react-native-sensitive-info';


const AddLocationView = ({navigation}) => {
  var credentials = require('./auth0-credentials');
  const auth0 = new Auth0(credentials);

  const googleApiKey = 'AIzaSyBe12m5Dr_Nl4Npazinei3sQoJKr3MbuuY'

  const [region,setRegion] = useState({
      latitude: 25.27652914015569,
      longitude: 55.29358830302954,
      latitudeDelta: 1.1126353632416794,
      longitudeDelta: 0.56854248046875, 
  });

  const [address,setAddress] = useState('')
  const [locationSaved,setLocationSaved] = useState(false)
  const [BottomSheetHeight,setBottomSheetHeight] = useState(0)
  const [coordinates,setCoordinates] = useState({})
  const [loading,setLoading] = useState(false)
  const [tag,setTag] = useState ('')
  const [completeAddress,setCompleteAddress] = useState ('')



const getToken = new Promise (async (resolve, reject) => {

    SInfo.getItem("accessToken", {}).then(accessToken => {
        if (accessToken) {
          resolve(accessToken)
        } else {
          setAccessToken(false)
          reject('No token')
        }
    });

})

  const onRegionChange = (region) => {

    setRegion(region)
    
    try{
      axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + region.latitude + ',' + region.longitude + '&key=' + googleApiKey)
      .then((responseJson) => {
        if (responseJson.data != null ){
          if (responseJson.data.results != null ){
            if (responseJson.data.results.length > 0 ){
              if (responseJson.data.results[0] != null ){
                const result = responseJson.data.results[0];
                setAddress(result.formatted_address);
                setCoordinates(result.geometry.location);
              }
            }
          }
        }
      })
    }catch (e){
      console.log(e);
    }

  }



  const addUserLocation = async (token) => {

    var config = {
      headers: {'Authorization': "bearer " + token}
    };

    var bodyParameters = {
      'complete_address':completeAddress,
      'tag':tag,
      'latitude':coordinates.lat,
      'longitude':coordinates.lng,
      'base_address':address
   }

    return new Promise ((resolve, reject) => {
        axios.post('https://2d9ab7a4.ngrok.io/api/user/addLocation',bodyParameters,config).then(response => {
            resolve(response)
        }).catch(err => {
            reject(err)
        })
    })
}

  const renderContent = () => {
    return (
      <View style={styles.header}>
        <Text>content</Text>
      </View>
    )
  }

  const next = () => {
    console.log(locationSaved)

    if (locationSaved == false){
      setLocationSaved(true)
    }else{
      setLoading(true)

      getToken.then(token =>{
        console.log(token)
        return addUserLocation(token)
      })
      .then(response => {
          //show toast
          console.log(response)
          setLoading(false)
          setLocationSaved(true)
     
          if ( navigation.state.params){
            if (navigation.state.params.lastScreen){
              if (navigation.state.params.lastScreen.routeName){
                if (navigation.state.params.lastScreen.routeName == 'LandingPage'){
                  navigation.pop();
                }
              }
            }
          }else{
            navigation.navigate('App');
          }

      }).catch(e=>{
          console.log(e)
          setLoading(false)
          //show error message in UI
      })
      
    }

  }
  
  const renderHeader = () => {
    return (
      <ScrollView
        onScroll = {Keyboard.dismiss}
      >
        
        <View 
          style={styles.content}
          onLayout={(event) => {
            var {x, y, width, height} = event.nativeEvent.layout;
            setBottomSheetHeight(height)
          }}
        >
          <Text style={styles.title}>Select Your Address</Text>
          <Text style={styles.subTitle}>{address}</Text>

          { locationSaved == true &&
            <TextInput
              style={styles.textInput}
              placeholder = 'Your Complete Address - Building/Villa Name, Unit Number, etc'
              blurOnSubmit={true}
              onChangeText={(value) => {
                  setCompleteAddress(value)
              }}
              multiline
            />
          }

          { locationSaved == true &&
            <TextInput
              style={styles.textInput}
              placeholder = 'Home/Office/Other'
              onChangeText={(value) => {
                  setTag(value)
              }}
            />
          }

          <TouchableOpacity style={styles.cta} onPress={next}>
            {!loading && <Text style={styles.ctaText}>Continue</Text>}
            {loading && <ActivityIndicator size="large" color="#ffffff" />}
          </TouchableOpacity>

        </View>
    
      </ScrollView>
     )
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>

        <BottomSheet
          snapPoints = {[BottomSheetHeight]}
          renderContent = {renderHeader}
        />
        
      <MapView
            provider={PROVIDER_GOOGLE} 
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: BottomSheetHeight
            }}
            onRegionChangeComplete={onRegionChange}
            showsUserLocation={true}
            showsMyLocationButton = {true}
            showsBuildings = {true}
            loadingEnabled = {true}
          >
        
            <View pointerEvents="none" style={styles.markerFixed}>
              <Image pointerEvents="none" source={marker}/>
            </View>
      
        </MapView>

 
    </KeyboardAvoidingView> 
  )


}


const styles = StyleSheet.create({

  bottomSheetContainer:{
    flex:1,
  },

  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 500
  },

  container: {
    flex:1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  markerFixed: {
    position: 'absolute', 
    top: 0, 
    bottom: 0, 
    left: 0, 
    right: 0, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: 'transparent'
  },
  marker: {
    height: 48,
    width: 48
  },
  textInput:{
    borderWidth: 1 ,
    backgroundColor:"#F2F2F2",
    borderColor:"#E7E7E7",
    borderRadius: 30,
    paddingLeft:20,
    paddingRight:20,
    paddingTop:20,
    paddingBottom:12,
    fontFamily: "TTCommons-Bold",
    fontSize: 20,
    color: "#000000",
    marginBottom:20
  },
  title:{
    fontFamily: "TTCommons-Bold",
    fontSize: 24,
    paddingBottom:20,
    color: "#000000"
  },
  subTitle:{
      fontFamily: "TTCommons-Regular",
      fontSize: 20,
      paddingBottom:25,
      color: "#000000"
  },
  header:{
    backgroundColor:'white',
    borderTopLeftRadius:40,
    borderTopRightRadius:40,
    shadowRadius:20,
    shadowOpacity:0.2
  },
  content:{
    backgroundColor:'white',
    shadowRadius:10,
    shadowOpacity:0.0,
    padding:30
  },
  cta:{
      marginTop:20,
      marginBottom:20,
      paddingTop:5,
      borderRadius: 30,
      backgroundColor: "#0A71F2",
      color: "#4a4a4a",
      flexDirection:'row',
      alignItems:'center',
      justifyContent:"center",
      paddingLeft:20,
      paddingRight:20,
      paddingTop:22,
      paddingBottom:15,
  },
  ctaText:{
      fontFamily:"TTCommons-Bold",
      fontSize: 20,
      textAlign: "center",
      color: "#ffffff",
  },

})



export default AddLocationView;