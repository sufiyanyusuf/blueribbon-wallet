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
    Dimensions
  } from 'react-native';

import axios from 'axios'
import BottomSheet from 'reanimated-bottom-sheet'
import MapView, {PROVIDER_GOOGLE, Marker, Overlay} from 'react-native-maps';
import { TextInput } from 'react-native-gesture-handler';
import marker from './assets/pin.png'

const AddLocationView = ({navigation}) => {
 
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
              }
            }
          }
        }
      })
    }catch (e){

    }

  }

  const renderContent = () => {
    return (
      <View style={styles.header}>
        <Text>content</Text>
      </View>
    )
  }

  const next = () => {
    if (locationSaved == false){
      setLocationSaved(true)
    }else{
      navigation.navigate('App');
    }
  }
   

  const renderHeader = () => {
    return (
      
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
            multiline
          />
        }

        { locationSaved == true &&
          <TextInput
            style={styles.textInput}
            placeholder = 'Home/Office/Other'
          />
        }

        <TouchableOpacity style={styles.cta} onPress={next}>
          <Text style={styles.ctaText}>Continue</Text>
        </TouchableOpacity>

      </View>
    )
  }

  return (
  
    <View style={styles.container}>
      

      <BottomSheet
            snapPoints = {[BottomSheetHeight]}
            renderHeader = {renderHeader}
        />

        {/* <View style = {{height:1000}}> */}
        <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
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


      <View style = {StyleSheet.bottomSheetContainer}></View>
    
     </View>
    // </View>
  )


}


const styles = StyleSheet.create({

  bottomSheetContainer:{
    flex:1,
    backgroundColor:'black'
  },

  map: {
    // ...StyleSheet.absoluteFillObject
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