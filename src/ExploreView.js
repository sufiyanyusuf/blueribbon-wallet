import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
  } from 'react-native';
import React, {useState,useEffect} from 'react';
import globalStyles from './assets/GlobalStyles';
import UpcomingCard from './components/UpcomingCard';
import Carousel from 'react-native-snap-carousel';
import ExploreCard from './components/ExploreCard'
const ExploreView = ({ navigation }) => {

    const [currentIndex,setCurrentIndex] = useState(0)
    
    // center items on screen
    const { width } = Dimensions.get('window');
    const cardWidth = width-50
    const contentOffset = (width - cardWidth);

    const data = [{ key: 1, value: '1' }, { key: 2, value: '2' }, { key: 3, value: '3' }, { key: 4, value: '4' }, { key: 5, value: '4' }, { key: 6, value: '4' }]
    
    const _renderItem = ({item, index}, parallaxProps) => {
        return (
            <View style={styles.carouselCardContainer}>
                <ExploreCard
                    goToListing={goToListing}
                    parallaxProps = {parallaxProps}
                />
            </View>
        );
    }

    const goToListing = (id = 4) => {
        navigation.navigate('LandingPage',{id:4})
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.carouselContainer}>
                <Carousel
                    data={data}
                    renderItem={_renderItem}
                    sliderWidth={width}
                    itemWidth={cardWidth}
                    layout={"default"}
                    layoutCardOffset={contentOffset}
                    activeAnimationType="spring"
                    slideStyle = "animated"
                    enableMomentum={true}
                    enableSnap={false}
                    hasParallaxImages = {true}
                    removeClippedSubviews={true}
                    inactiveSlideScale = {0.95}
                    decelerationRate = "normal"
                />
            </View> 
                    
        </SafeAreaView>
        
    );
        
}

const styles = StyleSheet.create({

    h1:{
        fontFamily:"TTCommons-Bold",
        fontSize: 36,
        fontStyle: "normal",
        letterSpacing: 0,
        color: "#4a4a4a"
      },
    container: {
        flex:1,
        flexDirection: "column",
    },
    carouselContainer: {
        flex:1,
        justifyContent: 'center',
        alignContent:'center',
    },
    carouselCardContainer: {
        flex:1,
        justifyContent: 'center',
        alignContent:'center',
    },
})

export default ExploreView