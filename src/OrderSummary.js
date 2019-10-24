import React, { PureComponent } from 'react';
import {
    Alert,
    AppRegistry,
    Button,
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView
  } from 'react-native';

  import globalStyles from './assets/GlobalStyles';
  import stripe from 'tipsi-stripe'
  import FitImage from 'react-native-fit-image';

stripe.setOptions({
  publishableKey: 'pk_test_zmWZFds3VDBBUWaCm4wntYDs00XUrNAIIJ',
  merchantId: 'merchant.com.blueribbon', // Optional
  androidPayMode: 'test', // Android only
})

export default class OrderSummary extends PureComponent {
  
  state = {
    // loading: false,
    allowed: false,
    complete: true,
    status: null,
    token: null,
    amexAvailable: false,
    discoverAvailable: false,
    masterCardAvailable: false,
    visaAvailable: false,
  }

  async componentDidMount() {
    const allowed = await stripe.deviceSupportsNativePay()
    const amexAvailable = await stripe.canMakeNativePayPayments({
      networks: ['american_express'],
    })
    const discoverAvailable = await stripe.canMakeNativePayPayments({
      networks: ['discover'],
    })
    const masterCardAvailable = await stripe.canMakeNativePayPayments({
      networks: ['master_card'],
    })
    const visaAvailable = await stripe.canMakeNativePayPayments({
      networks: ['visa'],
    })
    this.setState({
      allowed,
      amexAvailable,
      discoverAvailable,
      masterCardAvailable,
      visaAvailable,
    })
  }

  handleSetupApplePayPress = () => (
    stripe.openNativePaySetup()
  )

  handleCompleteChange = (complete) => {
   
    this.setState({ complete });
    if (this.state.complete) {
      stripe.completeNativePayRequest();
      this.setState({ status: 'Apple Pay payment completed' });
      console.log("payment done");
      this.props.navigation.navigate('Confirmation');
    } else {
      stripe.cancelNativePayRequest()
      this.setState({ status: 'Apple Pay payment cenceled' })
    }
  }

  requestPayment = () => {
    return stripe
      .paymentRequestWithCardForm()
      .then(stripeTokenInfo => {
        console.warn('Token created', { stripeTokenInfo });
      })
      .catch(error => {
        // console.warn('Payment failed', { error });
      });
  };

  requestApplePay = () => {
    return stripe
      .paymentRequestWithNativePay({
        shippingMethods: [],
      },
      [{
        label: 'Subscription Title',
        amount: '0.50',
      }])
      .then(stripeTokenInfo => {
        console.warn('Token created', { stripeTokenInfo });
        this.props.navigation.navigate('Confirmation');
      })
      .catch(error => {
        console.warn('Payment failed', { error });
        this.props.navigation.navigate('Confirmation');
      });
  };

  handleApplePayPress = async () => {
    console.log("start");
    try {
      // this.setState({
      //   loading: true,
      //   status: null,
      //   token: null,
      // })

      const token = await stripe.paymentRequestWithNativePay({
        shippingMethods: [],
      },

      [{
        label: 'Subscription Title',
        amount: '120.00',
      }]);
      
      console.log(token);
      stripe.completeApplePayRequest()
      // this.setState({ loading: false, token });

    } catch (error) {
      this.setState({ status: `Error: ${error.message}` })
    }

    this.handleCompleteChange();
    // // stripe.completeNativePayRequest();
    // this.props.navigation.navigate('Confirmation');

  }

  render() {
    const {
      // loading,
      allowed,
      complete,
      status,
      token,
      amexAvailable,
      discoverAvailable,
      masterCardAvailable,
      visaAvailable,
    } = this.state

    const cards = {
      americanExpressAvailabilityStatus: { name: 'American Express', isAvailable: amexAvailable },
      discoverAvailabilityStatus: { name: 'Discover', isAvailable: discoverAvailable },
      masterCardAvailabilityStatus: { name: 'Master Card', isAvailable: masterCardAvailable },
      visaAvailabilityStatus: { name: 'Visa', isAvailable: visaAvailable },
    }

    return (

      <View style = {styles.rootView}>

        <ScrollView>
          <View style={styles.container}>
            <Button
              title = "back"
              onPress={() => this.props.navigation.goBack()}
            />
            <View style={globalStyles.spacer40}></View>
            <FitImage
              resizeMode="contain"
              source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
              style={styles.avatar}
            />
            <View style={globalStyles.spacer20}></View>
            <View style={globalStyles.spacer20}></View>
            <Text style = {styles.subtitle}>Title of subscription</Text>
            <View style={globalStyles.spacer20}></View>

            <Text style = {styles.groupTitle}>Subscription Details</Text>
            <View style={globalStyles.spacer10}></View>
            <Text style = {styles.groupBody}>Detail 1</Text>
            <Text style = {styles.groupBody}>Detail 1</Text>
            <Text style = {styles.groupBody}>Detail 1</Text>

            <View style={globalStyles.spacer40}></View>


            <Text style = {styles.groupTitle}>Delivery Details</Text>
            <View style={globalStyles.spacer10}></View>
            <Text style = {styles.groupBody}>Detail 1</Text>

            <View style={globalStyles.spacer40}></View>
          </View>

        </ScrollView>

        <View style = {styles.ctaContainer}>
          <View style = {styles.row}>
            <TouchableOpacity 
              style={styles.cta} 
              disabledText="Not supported"
              disabled={!allowed}
              onPress={this.requestPayment}
            >
              <Text style={styles.ctaText}>$ 120 - Pay with Pay </Text>
            </TouchableOpacity>
          </View>

          <View style={globalStyles.spacer60}></View>
        </View>

      </View>

    )
  }
}

styles = StyleSheet.create({
  rootView:{
    flex:1,
  },
  ctaContainer:{
    margin:40
  },
  cta:{
    paddingTop:5,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#000000",
    flexDirection:'row',
    alignItems:'center',
    justifyContent:"center",
    flex:1,
  },
  ctaText:{
      fontFamily:"TTCommons-Bold",
      fontSize: 20,
      textAlign: "center",
      color: "#ffffff",
  },
  container: {
    flex:1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    margin:40,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  switch: {
    marginBottom: 10,
  },
  hintContainer: {
    marginTop: 10,
  },
  hint: {
    fontSize: 12,
    textAlign: 'center',
  },
  statusContainer: {
    margin: 20,
    alignSelf: 'stretch',
  },
  status: {
    fontWeight: '300',
    color: 'gray',
  },
  title:{
    fontFamily: "TTCommons-Bold",
    fontSize: 36,
    color: "#0A71F2"
  },
  subtitle:{
    fontFamily: "TTCommons-Bold",
    fontSize: 24,
    color: "#000000"
  },
  row:{
    flexDirection:"row",
    flex:1
  },
  groupTitle:{
    fontFamily: "TTCommons-Bold",
    fontSize: 18,
    color: "#888888"
  },
  groupBody:{

    fontFamily: "TTCommons-Regular",
    fontSize: 24,
    color: "#000000"
  },
  avatar:{
      width:50,
      height:50,
      borderRadius: 25,
      overflow: 'hidden',
  },
});