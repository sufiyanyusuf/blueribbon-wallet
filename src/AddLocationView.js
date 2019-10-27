import React, {useState,useEffect} from 'react';
import {
    View,
    Button,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Image
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
      
    }
    navigation.navigate('AddLocationView');
  }
   

  const renderHeader = () => {
    return (
      <View style={styles.content}>
        <Text style={styles.subTitle}>Add An Address</Text>
        
        <TextInput
          style={styles.textInput}
          value={address}
          editable = {false}
        />

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
        snapPoints = {[locationSaved ? 445:270, 50]}
        renderHeader = {renderHeader}
      />

    <MapView
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={styles.map}
      onRegionChangeComplete={onRegionChange}
      showsUserLocation={true}
      showsMyLocationButton = {true}
      showsBuildings = {true}
      loadingEnabled = {true}
     >
    
        <View pointerEvents="none" style={styles.markerFixed}>
          <Image pointerEvents="none" source={marker}/>
        </View>

      {/* <Marker draggable
        coordinate={region}
        // onDragEnd={(e) => setRegion(e.nativeEvent.coordinate)}
      /> */}
  
     </MapView>

    </View>
  )


}


const styles = StyleSheet.create({
 
  markerFixed: {
    position: 'absolute', 
    top: -50, 
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
  subTitle:{
      fontFamily: "TTCommons-Regular",
      fontSize: 24,
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
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    shadowRadius:10,
    shadowOpacity:0.2,
    padding:30
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    flex:1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
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