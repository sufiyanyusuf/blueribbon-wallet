import React, { useEffect, useState } from 'react';
import { 
    Text, 
    Button,
    Dimensions,
    View,
    StyleSheet,
    ScrollView,
    RefreshControl,
    FlatList,
    SafeAreaView,
    TouchableOpacity,
    Image,
} from 'react-native';
import * as api from './utils/Api'

import MessageIcon from './assets/icons/subscriptionOptions/message.png';
import PauseIcon from './assets/icons/subscriptionOptions/pause.png';
import RenewIcon from './assets/icons/subscriptionOptions/renew.png';
import PaymentIcon from './assets/icons/subscriptionOptions/payment.png';
import ResumeIcon from './assets/icons/subscriptionOptions/resume.png';
import RenewNowIcon from './assets/icons/subscriptionOptions/renewNow.png';
import CloseIcon from './assets/icons/subscriptionOptions/close.png';



const SubscriptionOptionsView = ({ navigation,subscriptionId,metaData,dismiss,subscription }) => { 

    // const metaData = navigation.getParam('metaData')
    const [active,setActive] = useState(metaData.active)
    const [paused,setPaused] = useState(metaData.paused)
    const [autoRenew,setAutorenew] = useState(metaData.autoRenew)
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState("")

    console.log(subscription)
    useEffect(() => {
        if (subscription.length > 0) {
            setTitle(subscription[0].title)
            if (subscription[0].currentState == "inactive") {
                setActive(false)
            }
            if (subscription[0].currentState == "active") {
                setActive(true)
            }
            if (subscription[0].currentState == "paused") {
                setPaused(true)
            }
        }
    }, [subscription])
    
    const pauseSubscription = async () => {
        try {
            setLoading(true)
            const paused = await api.pauseSubscription(subscriptionId)
            setPaused (paused)
        } catch (e) {
            console.log(e)
            setLoading(false)
        }
    }

    const resumeSubscription = async () => {
        try {
            setLoading(true)
            const resumed = await api.resumeSubscription(subscriptionId)
            setPaused(!resumed)
            setLoading(false)
        } catch (e) {
            console.log(e)
            setLoading(false)
        }
    }

    const cancelAutoRenew = async () => {

    }

    const enableAutoRenew = async () => {
        
    }

    const renewSubscription = async () => {
        
    }

    const showReceipt = async () => {
        
    }

    const showChat = async () => {
        
    }


    const Cta = ({ title, subtitle, highlighted, action, icon }) => {
        return (
            <TouchableOpacity
                style={[styles.cta, (highlighted == true) ? styles.ctaHighlighted : null]}
                onPress={action}
                disabled = {loading}
            >
                <Image source={icon} />
                <View style={styles.textContainer}>
                    <Text style={styles.ctaTitle}> {title} </Text>
                    <Text style={styles.ctaSubtitle}> {subtitle} </Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (

        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.closeCta}
                onPress={dismiss}
            >
                <Image source={CloseIcon} />
            </TouchableOpacity>
        <View style={styles.container}>
                <Text style={styles.title}> {title} </Text>
            <Text style = {styles.status}> STATUS</Text>
                {active ? (
                    (active && paused == true) ? (
                        <Cta
                            title="Deliveries Are Paused"
                            subtitle="Tap to resume now"
                            highlighted={true}
                            action={resumeSubscription}
                            icon={ResumeIcon}
                        />
                        ):(
                        <Cta
                            title="Pause Deliveries"
                            subtitle="You can resume anytime you want"
                            highlighted={false}
                            action={pauseSubscription}
                            icon={PauseIcon}
                        />     
                    ) 
                ):(null)
            }
            {
                active ? (
                    (autoRenew == true) ? (
                        <Cta
                            title="Cancel Auto Renew"
                            subtitle={"Renews on " + metaData.expiry}
                            highlighted={false}
                            action={cancelAutoRenew}
                            icon={RenewIcon}
                        />
                    ): (
                        <Cta
                            title="Enable Auto Renew"
                                subtitle={"Renews on " + metaData.expiry}
                            highlighted={true}
                            action={enableAutoRenew}
                            icon={RenewIcon}
                        />
                    )
                
                ) : (
                    <Cta
                        title="Renew Now"
                        subtitle={"Expired on " + metaData.expiry}
                        highlighted={true}
                        action={renewSubscription}
                        icon={RenewNowIcon}
                    />   
                )

            }
            
            <Cta
                title="Payment Receipt"
                subtitle={"Last payment on " + metaData.lastPayment}
                highlighted={false}
                action={showReceipt}
                icon={PaymentIcon}
            /> 
            <Cta
                title="Got A Problem ?"
                subtitle={"Message " + metaData.brandName}
                highlighted={false}
                action={showChat}
                icon={MessageIcon}
            /> 

            
            
            <Text style = {styles.subscriptionDate}> Subscribed on Nov 21, 2019</Text>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    closeCta: {
        marginTop: 10,
        marginLeft:20
    },
    textContainer: {
        flexDirection: "column",
        alignItems: "baseline",
        justifyContent:"center",
        paddingLeft: 10,
        paddingTop: 10,
    },
    container: {
        flex: 1,
        justifyContent:'flex-end',
        flexDirection: 'column'
    },
    title: {
        fontFamily:"TTCommons-Bold",
        fontSize: 36,
        color: "#383B46",
        letterSpacing: -1,
        textAlign: "center",
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 10,
        paddingTop:60
    },
    status: {
        fontFamily:"TTCommons-Bold",
        fontSize: 14,
        color: "#FF0000",
        letterSpacing: 2,
        textAlign: "center",
        paddingBottom:50
    },
    subscriptionDate: {
        paddingTop: 40,
        paddingBottom: 20,
        fontFamily: 'TTCommons-Regular',
        fontSize: 14,
        color: "#717585",
        textAlign: 'center',
        marginTop:60
    },
    ctaHighlighted: {
        backgroundColor: '#FAFAFA',
        shadowRadius: 25,
        shadowOpacity: 0.10,
        shadowOffset: {
            width: 0,
            height: 3
        },
     
    },
    ctaTitle: {
        fontFamily:"TTCommons-Bold",
        fontSize: 18,
        color:"#717585"
    },
    ctaSubtitle: {
        fontFamily:"TTCommons-Regular",
        fontSize: 16,
        color:"#717585"
    },
    cta: {
        padding:15,
        marginTop: 12,
        marginLeft: 15,
        marginRight:15,
        paddingRight: 15,
        paddingLeft: 15,
        borderRadius:20,
        backgroundColor: "#FAFAFA",
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:"flex-start",
        color: "#717585",
    },
    cta_: {
      marginTop:40,
      paddingRight: 20,
      paddingLeft: 20,
      borderRadius:35,
      backgroundColor: "#0A71F2",
      color: "#4a4a4a",
      flexDirection:'row',
      alignItems:'center',
      justifyContent:"space-between"
    },
    ctaText:{
      fontFamily:"TTCommons-Bold",
      fontSize: 20,
      fontStyle: "normal",
      letterSpacing: 0,
      textAlign: "justify",
      paddingTop: 24,
      paddingBottom: 20,
      color: "#ffffff",
    },
    
  })

export default SubscriptionOptionsView;