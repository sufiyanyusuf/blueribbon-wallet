import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    FlatList,
    SafeAreaView
  } from 'react-native';




const SavedLocationsSheet = ({toggle,addLocation,updateHeight,addresses,selection,navigation}) => {

    const LocationListItem = ({item,selection}) => {

        return(
            <View style = {styles.listItem}>
                <TouchableOpacity onPress = {() => selection(item)}>
                    <Text style={styles.subTitle}>{item.tag}</Text>
                    <Text style={styles.body}>{item.base_address}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style = {styles.locationSheetContainer}>  
            <ScrollView>
                <View 
                    onLayout={(event) => {
                        var {x, y, width, height} = event.nativeEvent.layout;
                        updateHeight(height)
                    }}
                    style = {styles.locationSheetContainer}
                >

                    <Text style={styles.title}>Your Places</Text>

                    <FlatList
                        data={addresses}
                        renderItem = { ({ item }) => (<LocationListItem item = {item} selection = {selection}/>) }
                        keyExtractor={item => (item.id).toString() }>
                    </FlatList>

                    <TouchableOpacity style={styles.cta} onPress={addLocation}>
                    <Text style={styles.ctaText}>Add A Place</Text>
                    </TouchableOpacity>
        
                </View>
            
            </ScrollView> 
        
        </SafeAreaView>   

     )
}

const styles = StyleSheet.create({
    bg:{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#000000'
    },
    listItem:{
        flex:1,
        paddingTop:15,
        paddingBottom:15,
    },
    cta:{
        marginTop:40,
        paddingTop:5,
        marginBottom:10,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#2C43A3",
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
        fontSize: 24,
        color: "#000000",
        paddingBottom:20,
    },
    subTitle:{
        fontFamily: "TTCommons-Bold",
        fontSize: 18,
        color: "#2E2E2E",
        paddingBottom:5
    },
    body:{
        fontFamily: "TTCommons-Regular",
        fontSize: 14,
        color: "#2E2E2E"
    },
    locationSheetContainer:{
        backgroundColor:'white',
        shadowRadius:10,
        shadowOpacity:0.0,
        borderRadius:15,
        padding:30
      },
});

export default SavedLocationsSheet;;