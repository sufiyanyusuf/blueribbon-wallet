import React, { useEffect, useState, useRef } from 'react';
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
    ActivityIndicator,
    Animated
} from 'react-native';
import * as api from './utils/Api'

import MessageIcon from './assets/icons/subscriptionOptions/message.png';
import PauseIcon from './assets/icons/subscriptionOptions/pause.png';
import RenewIcon from './assets/icons/subscriptionOptions/renew.png';
import PaymentIcon from './assets/icons/subscriptionOptions/payment.png';
import ResumeIcon from './assets/icons/subscriptionOptions/resume.png';
import RenewNowIcon from './assets/icons/subscriptionOptions/renewNow.png';
import CloseIcon from './assets/icons/subscriptionOptions/close.png';
import { Easing } from 'react-native-reanimated';



const SubscriptionOptionsView = ({ navigation,subscriptionId,metaData,dismiss,subscription }) => { 
    
   

    // const metaData = navigation.getParam('metaData')
    const [active,setActive] = useState(metaData.active)
    const [paused,setPaused] = useState(metaData.paused)
    const [autoRenew,setAutorenew] = useState(metaData.autoRenew)
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState("")

    useEffect(() => {
        console.log(subscription)

        setTitle(subscription.title)

        if (subscription.currentState.subscription_state == "inactive") {
            setActive(false)
        }
        if (subscription.currentState.subscription_state == "active") {
            setActive(true)
        }
        if (subscription.currentState.subscription_state == "paused") {
            setPaused(true)
        }

   
    }, [subscription])
    
    const pauseSubscription = async () => {
        try {
            if (loading == false) {
                setLoading(true)
                setPaused(true)
                animateHighlight()
                const paused = await api.pauseSubscription(subscriptionId)
                console.log(paused)
                if (paused == false) {
                    setPaused(false)
                }
                setLoading(false)
            }
        } catch (e) {
            console.log(e)
            setPaused(false)
            setLoading(false)
        }
    }

    const resumeSubscription = async () => {
        try {
            if (loading == false) {
                setLoading(true)
                setPaused(false)
                animateUnHighlight()
                const resumed = await api.resumeSubscription(subscriptionId)
                if (resumed == false) {
                    setPaused(true)
                }
                setLoading(false)
            }
        } catch (e) {
            console.log(e)
            setPaused(true)
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

    const animateHighlight = () => {
        Animated.timing(pausedShadowAnim, {
            toValue: 0.10,
            duration: 500,
        }).start();
    }

    const animateUnHighlight = () => {
        Animated.timing(pausedShadowAnim, {
            toValue: 0,
            duration: 500,
        }).start();

    }

    const [fadeAnim] = useState(new Animated.Value(0))
    const [scaleXAnim] = useState(new Animated.Value(0.85))
    const [scaleYAnim] = useState(new Animated.Value(0.75))

    const [pausedShadowAnim] = useState(new Animated.Value(0))

    const Cta = ({ title, subtitle, highlighted, action, icon, ctaKey }) => {
        
        
        useEffect(() => { 

            if (highlighted == true) {
                console.log(highlighted)    
                    Animated.spring(pausedShadowAnim,{
                        toValue: 0.12,
                        velocity: 2,
                        friction: 5,
                        tension: 5,
                    }).start()
            }

            let sequence = Animated.sequence([
              
                Animated.parallel([
                    Animated.spring(fadeAnim,{
                        toValue: 1,
                        tension: ctaKey*1,
                        friction:ctaKey*80,
                        delay:15*ctaKey
                    }),
                    Animated.spring(scaleXAnim, {
                        delay:15*ctaKey,
                        tension: ctaKey*1,
                        friction:ctaKey*50,
                        toValue: 1, 
                    }),
                    Animated.spring(scaleYAnim, {
                        delay:15*ctaKey,
                        tension: ctaKey*1,
                        friction:ctaKey*50,
                        toValue: 1, 
                    }) 
                ]),
            ])
           
            sequence.start()

        }, [])

    
        return (

            <Animated.View 
                style={{
                    opacity: fadeAnim, 
                    transform: [{scaleX: scaleXAnim},{scaleY: scaleYAnim}]
                }}
            >
                
               
                <TouchableOpacity onPress={action} activeOpacity = {0.8}>
                    
                    <Animated.View style={[styles.cta, {
                         shadowRadius: 25,
                         shadowOffset: {
                             width: 0,
                             height: 3
                         },
                         shadowOpacity: ctaKey == 1 ? pausedShadowAnim:0
                    }]}>
                    
                        <Image source={icon} />
                        <View style={styles.textContainer}>
                            <Text style={styles.ctaTitle}> {title} </Text>
                            <Text style={styles.ctaSubtitle}> {subtitle} </Text>
                        </View>
                        
                    </Animated.View>

                </TouchableOpacity>
               

          
            
            </Animated.View>
            
        )
    }

    return (

        <View style={styles.container}>
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
                            ctaKey={1}
                        />
                        ):(
                        <Cta
                            title="Pause Deliveries"
                            subtitle="You can resume anytime you want"
                            highlighted={false}
                            action={pauseSubscription}
                            icon={PauseIcon}
                            ctaKey={1}
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
                            ctaKey={3}
                        />
                    ): (
                        <Cta
                            title="Enable Auto Renew"
                                subtitle={"Renews on " + metaData.expiry}
                            highlighted={true}
                            action={enableAutoRenew}
                            icon={RenewIcon}
                            ctaKey={3}
                        />
                    )
                
                ) : (
                    <Cta
                        title="Renew Now"
                        subtitle={"Expired on " + metaData.expiry}
                        highlighted={true}
                        action={renewSubscription}
                        icon={RenewNowIcon}
                        ctaKey={3}
                    />   
                )

            }
            
            <Cta
                title="Payment Receipt"
                subtitle={"Last payment on " + metaData.lastPayment}
                highlighted={false}
                action={showReceipt}
                icon={PaymentIcon}
                ctaKey={6}
            /> 
            <Cta
                title="Got A Problem ?"
                subtitle={"Message " + metaData.brandName}
                highlighted={false}
                action={showChat}
                icon={MessageIcon}
                ctaKey={9}
            /> 

            
            
            <Text style = {styles.subscriptionDate}> Subscribed on Nov 21, 2019</Text>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    closeCta: {
        marginTop: 0,
        marginLeft: 0,
        paddingTop: 30,
        paddingLeft: 25,
        paddingRight: 25,
        paddingBottom:30
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
        fontSize: 20,
        color:"#717585"
    },
    ctaSubtitle: {
        fontFamily:"TTCommons-Regular",
        fontSize: 18,
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