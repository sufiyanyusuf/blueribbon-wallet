import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
  } from 'react-native';
import React, {useState,useEffect} from 'react';
import globalStyles from './assets/GlobalStyles';
import UpcomingCard from './components/UpcomingCard';
import Carousel from 'react-native-snap-carousel';

const ExploreView = ({ navigation }) => {

    const [currentIndex,setCurrentIndex] = useState(0)
    
    // center items on screen

    const { width } = Dimensions.get('window');
    const contentOffset = (width - UpcomingCard.WIDTH) / 2;

    const data = [{ key: 1, value: '1' }, { key: 2, value: '2' }, { key: 3, value: '3' }, { key: 4, value: '4' }, { key: 5, value: '4' }, { key: 6, value: '4' }]
    
    const _renderItem = ({item, index}) => {
        return (
            <View style={styles.slide}>
                <Text style={styles.h1}>{ item.value }</Text>
            </View>
        );
    }

    return (
        <View style = {styles.container}>
            <View style = {globalStyles.spacer80}></View>
            <Carousel
                data={data}
                renderItem={_renderItem}
                sliderWidth={380}
                itemWidth={330}
                layout={'stack'}
                layoutCardOffset={0}
            />
                
         
        </View>
       
        
    );
        
}

const styles = StyleSheet.create({
    slide: {
        marginTop:150,
        backgroundColor: 'white',
        height: 460,
        shadowRadius:50,
        shadowOpacity: 0.06,
        borderRadius: 25,
        shadowOffset: {
          width: 0,
          height: -5
        },
        elevation: 5,

    },

    h1:{
        fontFamily:"TTCommons-Bold",
        fontSize: 36,
        fontStyle: "normal",
        letterSpacing: 0,
        color: "#4a4a4a"
      },
    container: {
        flex: 1,
        justifyContent: "center",
        alignContent:'space-around'
    },
})

export default ExploreView