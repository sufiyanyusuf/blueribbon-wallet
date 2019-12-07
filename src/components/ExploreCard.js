import React,{useRef,useState, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
  } from 'react-native';
import FitImage from 'react-native-fit-image';
import * as api from '.././utils/Api'
import { ParallaxImage } from 'react-native-snap-carousel';

import RightArrowIcon from '../assets/icons/general/rightArrow.png';

const ExploreCard = ({ listing, goToListing, parallaxProps }) => {
    
    const logoUrl = "https://storage.googleapis.com/blueribbon/Copy%20of%20mnslogo-1.jpg"
    const prodUrl = "https://storage.googleapis.com/blueribbon/71.2_d0b4c0d1-0b20-44a9-9d83-9a245715f16c_2048x.jpg"


  return (
      <View style={styles.CardContainer}>
          
          <View style={styles.cardHeader}>
            <FitImage
                resizeMode="contain"
                source={{ uri: listing.organization.logo }}
                style={styles.fitImageWithSize}
            />
            <Text style={styles.title}>{listing.title}</Text>
            <Text style={styles.caption}>By {listing.organization.title}</Text>   
          </View>
   
          <ParallaxImage
              source={{ uri: listing.productInfo.image_url }}
              containerStyle={styles.imageContainer}
              style={styles.productImage}
              parallaxFactor = {0.15}
              {...parallaxProps}
            >
          </ParallaxImage>

        <View style={styles.cardFooter}>    
            <TouchableOpacity style={styles.cta} onPress={()=>goToListing(listing.id)}>
                  <Text style={styles.ctaText}>View Details</Text>
                  <Image style={styles.ctaIcon}source={RightArrowIcon}/>
            </TouchableOpacity>
        </View>
      </View>
      
  );
}

const styles = StyleSheet.create({

    imageContainer: {
        height:250,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
    },
    productImage: {
        
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
    CardContainer: {
        backgroundColor: '#FFFFFF',
        shadowRadius: 15,
        shadowOpacity: 0.06,
        borderRadius: 20,
        shadowOffset: {
            width: 0,
            height: 3
        },
        elevation: 5,
        marginLeft: 5,
        marginRight:5
    },
    contentContainer:{
        backgroundColor: '#FFFFFF',
        justifyContent:"flex-start",
        marginTop:30,
        marginLeft:30,
        marginRight:30,
        marginBottom:25
    },
    cardFooter: {
        flexDirection: "column",
        justifyContent: 'space-between'
    },
    title: {
        fontFamily:"TTCommons-Bold",
        fontSize: 28,
        color: "#383B46",
        letterSpacing: -0.8,
        marginTop:20,
    },
    cardHeader: {
        marginTop: 25,
        marginLeft: 20,
        marginRight: 30,
        marginBottom:15,
    },
    caption: {
        marginTop:2,
        fontFamily:"TTCommons-Regular",
        fontSize: 14,
        color: "#888888",
    },
    cta:{
        borderRadius: 25,
        backgroundColor: "#FFFFFF",
        color: "#383B46",
        flexDirection:'row',
        paddingTop: 22,
        paddingBottom: 18,
        paddingLeft:20,
        paddingRight: 20,
        justifyContent:'space-between'
    },
    ctaText:{
        fontFamily:"TTCommons-Bold",
        fontSize: 18,
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "justify",
        color: "#717585",
    },
    ctaIcon: {
        marginTop: -4,
        marginBottom:0
    },
    logoImage: {
        borderRadius: 30,
        overflow: 'hidden',
    },
    fitImageWithSize: {
        overflow:"hidden",
        borderRadius: 25,
        height: 50,
        width: 50
    },
  });

export default ExploreCard;