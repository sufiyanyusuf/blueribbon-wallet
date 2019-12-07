import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
  } from 'react-native';
import FitImage from 'react-native-fit-image';
import RightArrowIcon from '../assets/icons/general/rightArrow.png';

const UpcomingCard = ({id,status,date,message }) => {

  const showOptions = () => {
    console.log("showoptions");
  }

  const StatusBadge = ({ status }) => {
    return (
      <View>

        {(status == "initiated" || status == "pending") &&
          <View style={[badgeStyles.container,badgeStyles.due]}>
            <Text style={[badgeStyles.text,badgeStyles.dueText]}>DUE</Text>
          </View>
        }

        {status == "shipped" &&
          <View style={[badgeStyles.container,badgeStyles.shipped]}>
            <Text style={[badgeStyles.text,badgeStyles.shippedText]}>SHIPPED</Text>
          </View>
        }

        {status == "successful" &&
          <View style={[badgeStyles.container,badgeStyles.success]}>
            <Text style={[badgeStyles.text,badgeStyles.successText]}>SUCCESS</Text>
          </View>
        }

        {status == "failure" &&
          <View style={[badgeStyles.container,badgeStyles.failed]}>
            <Text style={[badgeStyles.text,badgeStyles.failedText]}>FAILED</Text>
          </View>
        }
        
      </View>
    )
  }

  return (
    <View style={styles.CardContainer}>
      <View style={styles.contentContainer}>

          <View style={styles.cardHeader}>
            <StatusBadge status={status} />
            <Text style = {styles.date}>{date}</Text>
          </View>
          
          <View>
              <Text style={styles.message}>{message}</Text>
          </View>
      </View>

      <View style={styles.cardFooter}>    
        <TouchableOpacity style={styles.cta}>
              <Text style={styles.ctaText}>View Options</Text>
              <Image style={styles.ctaIcon}source={RightArrowIcon}/>
        </TouchableOpacity>
      </View>

    </View>
  );
    
}

export default UpcomingCard;

const badgeStyles = StyleSheet.create({
  container: {
    paddingLeft: 12,
    paddingRight: 10,
    paddingTop: 8,
    paddingBottom: 3,
    borderRadius:12
  },
  text: {
    fontFamily: "TTCommons-Bold",
    fontSize: 12,
    letterSpacing: 1.5,
  },
  due: {
    backgroundColor: "#FDEFA1", 
  },
  dueText: {
    color:"#CA7C00"
  },
  shipped: {
    backgroundColor: "#CEE4FF",
  },
  shippedText: {
    color:"#4B68CF"
  },
  success: {
    backgroundColor: "#BAF8D6",
  },
  successText: {
    color:"#13936C"
  },
  failed: {
    backgroundColor: "#FDC9B3",
  },
  failedText: {
    color:"#EB3B4E"
  },

})
const styles = StyleSheet.create({
  CardContainer: {
    flex: 1,
    margin:20,
    marginTop:0,
    backgroundColor: '#FAFAFA',
    borderRadius: 20,
    alignItems: 'stretch'
  },
  contentContainer:{
    marginTop:15,
    marginLeft:15,
    marginRight:15,
    marginBottom:15,
    flex:1
  },
  date: {
    marginTop: 5,
    marginRight:10,
    fontFamily:"TTCommons-Bold",
    fontSize: 16,
    color: "#717585",
    textAlign:"right"
  },
  message:{
    fontFamily:"TTCommons-Regular",
    fontSize: 16,
    color: "#383B46",
    marginRight:80
  },
 
  cardHeader:{
    flexDirection:"row",
    marginBottom: 20,
    justifyContent:'space-between'
  },

  cardFooter: {
      flexDirection: "column",
      justifyContent: 'space-between'
  },
  cta: {
    borderRadius: 25,
    borderTopLeftRadius: 0,
    borderTopRightRadius:0,
    backgroundColor: "#F6F6F6",
    color: "#383B46",
    flexDirection:'row',
    paddingTop: 18,
    paddingBottom: 14,
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
    color: "#383B46",
},
ctaIcon: {
    marginTop: -4,
    marginBottom:0
},
  });